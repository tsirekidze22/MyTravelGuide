export async function fetchGroqResponse(prompt: string): Promise<string> {
  const response = await fetch("/api/groq", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ prompt }),
  });

  if (!response.ok) {
    throw new Error("Groq API request failed");
  }

  const data = await response.json();
  return data.result;
}
