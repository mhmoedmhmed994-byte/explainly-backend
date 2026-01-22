export default async (req) => {
  try {
    const { goal } = JSON.parse(req.body);

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
            content: "أنت مساعد عربي. اعطي مهمة يومية قصيرة جدًا (5 دقائق) في مجال الهدف المحدد."
          },
          {
            role: "user",
            content: `اعطني مهمة يومية قصيرة جدًا (5 دقائق) في مجال: ${goal}`
          }
        ],
        max_tokens: 60
      })
    });

    const data = await response.json();
    const task = data.choices[0].message.content;

    return new Response(JSON.stringify({ task }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: "حصل خطأ" }), { status: 500 });
  }
};
