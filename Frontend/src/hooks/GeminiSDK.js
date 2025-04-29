import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";
const key = import.meta.env.VITE_API_KEY;
import { systemInstructions, schema } from "./../data/geminiConfig";

class Gemini {
  constructor(useCase, prompt, autoFetch = false) {
    this.instructions = systemInstructions;
    this.useCase = useCase;

    this.prompt = prompt;

    this.autoFetch = autoFetch;
    this.model = new GoogleGenerativeAI(key).getGenerativeModel({
      model: "gemini-2.0-flash-001",

      systemInstruction: this.instructions,
      generationConfig: {
        responseMimeType: "application/json",

        responseSchema: schema,
        temperature: 0.2,
      },
    });
  }

  componentDidMount() {
    if (this.autoFetch) this.fetch(this.prompt);
  }

  fetch = async () => {
    const { response } = await this.model.generateContent({
      contents: [
        {
          parts: [
            {
              text: this.prompt,
            },
          ],
        },
      ],
    });
    const res = JSON.parse(await response.text());
    return res;
  };
}

export default Gemini;
