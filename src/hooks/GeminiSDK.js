import { GoogleGenerativeAI } from "@google/generative-ai";
import key from "../apiKey";

const schema = {
  type: "array",
  items: {
    type: "object",
    properties: {
      message: { type: "string" },
      alignmentWithCurrentGoals: { type: "string" },
      benefits: { type: "string" },
      status: { type: "string", enum: ["New", "Highly Beneficial"] },
      resources: {
        type: "object",
        properties: {
          videos: { type: "string" },
          books: { type: "string" },
          Github_repositories: { type: "string" },
        },
      },
    },
    required: ["message", "alignmentWithCurrentGoals", "benefits", "resources"],
  },
};

class Gemini {
  constructor(instructions, prompt, autoFetch = false) {
    this.prompt = prompt;
    this.autoFetch = autoFetch;
    this.model = new GoogleGenerativeAI(key).getGenerativeModel({
      model: "gemini-2.0-flash-001",
      systemInstruction: instructions,
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: schema,
        temperature: 0.25,
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

    return await response.text();
  };
}

export default Gemini;
