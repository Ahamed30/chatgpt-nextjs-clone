import { checkApiKey } from "@/utils/check-api-key";

describe("Check Api key", () => {
  it("should return false if API key is invalid", async () => {
    const apiKey = "invalidApiKey";

    const result = await checkApiKey(apiKey);

    expect(result).toBe(false);
  });
});
