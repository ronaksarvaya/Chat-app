import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';
import { createClient } from '@supabase/supabase-js';

export const runtime = 'edge';

export async function POST(req: Request) {
  const { messages } = await req.json();

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing Supabase environment variables');
  }

  const supabase = createClient(supabaseUrl, supabaseAnonKey);

  const result = streamText({
    model: openai('gpt-4-turbo'),
    messages,
    onChunk: async (chunk) => {
      if (chunk.type === 'text-delta') {
        await supabase.from('messages').insert({
          content: chunk.textDelta,
          user_id: 'ai',
        });
      }
    },
  });

  return result.toDataStreamResponse();
}

