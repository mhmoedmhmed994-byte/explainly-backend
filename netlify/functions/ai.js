export default async (req) => {
  const { text } = JSON.parse(req.body);

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "Summarize the text and give clear bullet points in Arabic."
        },
        {
          role: "user",
          content: text
        }
      ],
      max_tokens: 300
    })
  });

  const data = await response.json();
  const lines = data.choices[0].message.content.split("\n").filter(Boolean);

  return new Response(JSON.stringify({
    summary: lines[0],
    points: lines.slice(1, 5)
  }), { status: 200 });
};
