const API_ENDPOINT = process.env.CORE_API_URL;

export async function GET(req: Request) {
  try {
    const response = await fetch(`${API_ENDPOINT}/documents`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return Response.json({ data });
  } catch (error) {
    console.error('Error occurred:', error);
  }
}
