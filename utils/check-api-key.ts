import axios from "axios";

const openaiApiUrl = `https://api.openai.com/v1/engines`;

export const checkApiKey = async (apiKey: string) => {
  try {
    const response = await axios.get(openaiApiUrl, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    });

    if (response.status === 200) {
      return true;
    }
  } catch (error) {
    console.error("heyyy", error);
  }

  return false;
};
