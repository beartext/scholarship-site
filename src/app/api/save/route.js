// src/app/api/save/route.js
import { supabase } from '../../../lib/supabase'; // <- relative path to your lib
import { nanoid } from 'nanoid';

export async function POST(req) {
  try {
    // Parse incoming JSON
    const body = await req.json();
    const { topic, summary, sources } = body;

    if (!topic || !summary) {
      return new Response(
        JSON.stringify({ error: 'Topic and summary are required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Generate a unique ID for this entry
    const id = nanoid();

    // Insert into Supabase table 'results' (adjust table name if needed)
    const { data, error } = await supabase
      .from('results') // make sure this matches your Supabase table name
      .insert([
        { id, topic, summary, sources }
      ]);

    if (error) {
      throw new Error(error.message);
    }

    // Construct the URL for the details page
    const url = `http://localhost:3000/details/${id}`;

    console.log('Saved entry:', { topic, summary, sources, url });

    return new Response(JSON.stringify({ url, data }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('Error in /api/save:', err.message);
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}