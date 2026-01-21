import express from "express";
import cors from "cors";
import OpenAI from "openai";

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.post("/explain", async (req, res) => {
  try {
    const { text } = req.body;

    const prompt = `
Explain the following content in 4 ways:
1. Very simple explanation
2. Smart summary
3. Action points
4. Ready-to-use content

Text:
${text}
    `;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }]
    });

    res.json({ result: completion.choices[0].message.content });
  } catch (err) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.listen(3000, () => {
  console.log("Explainly backend running");
});
