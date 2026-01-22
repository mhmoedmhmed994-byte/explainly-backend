export default async function handler(req) {
  try {
    if (req.method !== "POST") {
      return new Response("Method Not Allowed", { status: 405 });
    }

    const { text } = JSON.parse(req.body);

    if (!text) {
      return new Response(
        JSON.stringify({ error: "No text provided" }),
        { status: 400 }
      );
    }

    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4.1-mini",
        input: `لخص النص التالي في نقاط واضحة وبالعربية:\n\n${text}`,
        max_output_tokens: 300
      })
    });

    const data = await response.json();

    const output =
      data.output_text ||
      data.output?.[0]?.content?.[0]?.text ||
      "لم يتم إنشاء ملخص";

    return new Response(
      JSON.stringify({ result: output }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500 }
    );
  }
}
