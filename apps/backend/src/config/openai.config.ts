export type OpenaiConfig = {
  apiKey: string;
};

export default (): OpenaiConfig => ({
  apiKey: process.env.OPENAI_API_KEY || '',
});
