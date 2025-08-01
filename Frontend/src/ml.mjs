import { OpenAI } from "openai";

const client = new OpenAI();

try {
  let res = await client.responses.create({
    model: "gpt-3.5-turbo",
    input: "Hey",
  });

  console.log(res.output_text);
} catch (ex) {
  console.log(ex);
}
