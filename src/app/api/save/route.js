import { supabase } from "../../../lib/supabase"

export async function POST(req) {

  try {

    const { text } = await req.json()

    const prompt = `
Analyze the following claim using scholarly sources:

"${text}"

Provide a research summary and validity assessment in markdown.
`

    const openai = await fetch(
      "https://api.openai.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [{ role: "user", content: prompt }],
          temperature: 0.2
        })
      }
    )

    const openaiData = await openai.json()

    const summary = openaiData.choices[0].message.content

    const id = crypto.randomUUID()

    await supabase.from("results").insert({
      id,
      topic: text.slice(0, 120),
      summary
    })

    return Response.json({
      url: `https://scholar-shipai.vercel.ai/details/${id}`
    })

  } catch (error) {

    console.error(error)

    return Response.json({
      error: error.message
    }, { status: 500 })

  }

}