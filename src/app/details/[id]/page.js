// src/app/details/[id]/page.js

import { supabase } from "../../../lib/supabase"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import "./article.css"

export default async function DetailsPage({ params }) {

  const { id } = await params

  const { data, error } = await supabase
    .from("results")
    .select("*")
    .eq("id", id)
    .single()

  if (error || !data) {
    return (
      <main className="page">
        <article className="article">
          <h1>Result not found</h1>
          <p>This article may have been removed or the link is incorrect.</p>
        </article>
      </main>
    )
  }

  return (
    <main className="page">

      <article className="article">

        <h1 className="title">{data.topic}</h1>

        <div className="markdown">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {data.summary}
          </ReactMarkdown>
        </div>

      </article>

    </main>
  )
}