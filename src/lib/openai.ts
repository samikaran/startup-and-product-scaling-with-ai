import OpenAI from "openai";

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  organization: process.env.OPENAI_ORG_ID, // Optional
});

interface SentimentAnalysisResult {
  sentiment: "positive" | "negative" | "neutral";
  score: number;
  highlights: string[];
}

interface TextAnalysisResult {
  categories: string[];
  keywords: string[];
  summary: string;
  urgency: number;
  suggestions: string[];
}

interface FeatureAnalysisResult {
  impact: number;
  effort: number;
  priority: number;
  risks: string[];
  recommendations: string[];
}

export async function analyzeSentiment(
  text: string
): Promise<SentimentAnalysisResult> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content:
            "You are a sentiment analysis expert. Analyze the following text and provide sentiment details in JSON format including sentiment (positive/negative/neutral), score (0-1), and key highlights.",
        },
        {
          role: "user",
          content: text,
        },
      ],
      response_format: { type: "json_object" },
    });

    return JSON.parse(
      response.choices[0].message.content
    ) as SentimentAnalysisResult;
  } catch (error) {
    console.error("OpenAI Sentiment Analysis Error:", error);
    throw error;
  }
}

export async function analyzeFeatureRequest(
  text: string
): Promise<FeatureAnalysisResult> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `Analyze the following feature request and provide a structured analysis in JSON format including:
            - impact (0-10)
            - effort (0-10)
            - priority (0-10)
            - risks (array of potential risks)
            - recommendations (array of suggestions)`,
        },
        {
          role: "user",
          content: text,
        },
      ],
      response_format: { type: "json_object" },
    });

    return JSON.parse(
      response.choices[0].message.content
    ) as FeatureAnalysisResult;
  } catch (error) {
    console.error("OpenAI Feature Analysis Error:", error);
    throw error;
  }
}

export async function analyzeFeedbackTrends(
  feedbackArray: string[]
): Promise<TextAnalysisResult> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `Analyze the following collection of feedback and identify:
            - Common themes/categories
            - Key keywords
            - Summary of main points
            - Urgency level (0-10)
            - Actionable suggestions`,
        },
        {
          role: "user",
          content: JSON.stringify(feedbackArray),
        },
      ],
      response_format: { type: "json_object" },
    });

    return JSON.parse(
      response.choices[0].message.content
    ) as TextAnalysisResult;
  } catch (error) {
    console.error("OpenAI Feedback Analysis Error:", error);
    throw error;
  }
}
