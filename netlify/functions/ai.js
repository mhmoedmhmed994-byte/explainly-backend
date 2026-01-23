export default async (req) => {
  const { animal, age, problem } = JSON.parse(req.body);

  const prompt = `
أنا طبيب بيطري افتراضي.
الحيوان: ${animal}
العمر: ${age}
المشكلة: ${problem}

اعطِ:
- تفسير مبسط
- نصائح
- متى يجب زيارة الطبيب
باللغة العربية.
`;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 400
    })
  });

  const data = await response.json();

  return new Response(JSON.stringify({
    reply: data.choices[0].message.content
  }), { status: 200 });
};
