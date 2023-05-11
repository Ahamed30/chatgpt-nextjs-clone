import type { NextApiRequest, NextApiResponse } from "next";
import { Configuration, OpenAIApi } from "openai";
import { getApiKey } from "@/config/firebase-api-key";

type ResponseData = {
  text: string;
};

interface GenerateNextApiRequest extends NextApiRequest {
  body: {
    prompt: string;
    userId: string;
  };
}

export default async function handler(
  req: GenerateNextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const { prompt, userId } = req?.body;

  if (!userId || !prompt || prompt === "") {
    return res.status(204).end();
  }

  const openAIApiKey = await getApiKey(userId);
  const configuration = new Configuration({
    apiKey: openAIApiKey,
  });
  const openai = new OpenAIApi(configuration);

  const aiResult = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `${prompt}`,
    temperature: 0.9,
    max_tokens: 2048,
    frequency_penalty: 0.5,
    presence_penalty: 0,
  });

  const response =
    aiResult?.data?.choices[0]?.text?.trim() ||
    "Sorry, unable to process the request!";

  res.status(200).json({ text: response });
}
