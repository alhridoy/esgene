import { createOpenAI } from '@ai-sdk/openai';
import { streamText } from 'ai';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

/**
 * Queries vector store for related contexts.
 * @param query
 * @param indexName
 */
const getContext = async (
  query: string,
  indexName: string,
): Promise<{
  text: string;
  status: string;
}> => {
  try {
    const res = await fetch(
      `${process.env.RAG_API_URL}/query?query=${query}&index_name=${indexName}`,
      {
        method: 'GET',
      },
    );

    const response = await res.json();
    return response;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export async function POST(req: Request) {
  try {
    const groq = createOpenAI({
      baseURL: 'https://api.groq.com/openai/v1',
      apiKey: process.env.GROQ_API_KEY,
    });
    const { input } = await req.json();
    const { text: context } = await getContext(input, 'esgeneindex');

    console.log(context);

    const result = await streamText({
      model: groq('llama3-8b-8192'),
      prompt: `You are an expert analyst specializing in sustainability, assisting financial analysts and investors in addressing claims related to sustainability practices and metrics.

      Instructions:
      
      Use the provided context to generate your answers. Keep replies casual and friendly. Do include based on this context in your replies.
      If the provided context does not contain the necessary information to answer the query, respond with "I do not know."
      User Input: ${input}
      Context: ${context}
      `,
    });

    return result.toAIStreamResponse();
  } catch (error) {
    console.error('Error occurred:', error);
  }
}
