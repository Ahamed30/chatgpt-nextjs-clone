export const getResponseData = async (prompt: string, userId: string) => {
  const response = await fetch("/api/generate-answer", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      prompt: prompt,
      userId: userId,
    }),
  });
  if (!response.ok) {
    throw new Error(`Failed to fetch answer: ${response.status}`);
  }
  const data = await response.json();
  return data?.text;
};
