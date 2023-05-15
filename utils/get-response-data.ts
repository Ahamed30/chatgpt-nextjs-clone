import axios from "axios";

export const getResponseData = async (prompt: string, userId: string) => {
  try {
    const response = await axios.post(
      "/api/generate-answer",
      {
        prompt: prompt,
        userId: userId,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status !== 200) {
      throw new Error(`Failed to fetch answer: ${response.status}`);
    }

    return response.data?.text;
  } catch (error: any) {
    throw new Error(`Failed to fetch answer: ${error.message}`);
  }
};
