"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { AlertCircle, CheckCircle, Clock } from "lucide-react";

interface AnalysisResult {
  sentiment?: {
    sentiment: "positive" | "negative" | "neutral";
    score: number;
    highlights: string[];
  };
  feature?: {
    impact: number;
    effort: number;
    priority: number;
    risks: string[];
    recommendations: string[];
  };
}

export default function FeedbackAnalysisAI() {
  const [feedback, setFeedback] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  async function analyzeFeedback(type: "sentiment" | "feature") {
    try {
      setIsAnalyzing(true);

      const response = await fetch("/api/analysis", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type,
          content: feedback,
        }),
      });

      if (!response.ok) {
        throw new Error("Analysis failed");
      }

      const analysisResult = await response.json();

      setResult((prev) => ({
        ...prev,
        [type]: analysisResult,
      }));
    } catch (error) {
      console.error("Analysis error:", error);
    } finally {
      setIsAnalyzing(false);
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>AI-Powered Feedback Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Textarea
              placeholder="Enter feedback or feature request to analyze..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="h-32"
            />

            <div className="flex space-x-4">
              <Button
                onClick={() => analyzeFeedback("sentiment")}
                disabled={isAnalyzing || !feedback}
              >
                Analyze Sentiment
              </Button>
              <Button
                onClick={() => analyzeFeedback("feature")}
                disabled={isAnalyzing || !feedback}
              >
                Analyze as Feature Request
              </Button>
            </div>

            {isAnalyzing && (
              <div className="flex items-center text-blue-600">
                <Clock className="mr-2 h-4 w-4 animate-spin" />
                Analyzing...
              </div>
            )}

            {result?.sentiment && (
              <Card>
                <CardHeader>
                  <CardTitle>Sentiment Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <span className="font-medium">Sentiment:</span>
                      <span
                        className={`ml-2 px-2 py-1 rounded-full text-sm ${
                          result.sentiment.sentiment === "positive"
                            ? "bg-green-100 text-green-800"
                            : result.sentiment.sentiment === "negative"
                            ? "bg-red-100 text-red-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {result.sentiment.sentiment.toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <span className="font-medium">Score:</span>
                      <span className="ml-2">
                        {(result.sentiment.score * 100).toFixed(1)}%
                      </span>
                    </div>
                    <div>
                      <span className="font-medium">Key Highlights:</span>
                      <ul className="list-disc list-inside mt-1">
                        {result.sentiment.highlights.map((highlight, index) => (
                          <li key={index} className="text-sm text-gray-600">
                            {highlight}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {result?.feature && (
              <Card>
                <CardHeader>
                  <CardTitle>Feature Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center">
                        <p className="text-sm text-gray-500">Impact</p>
                        <p className="text-2xl font-bold">
                          {result.feature.impact}/10
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-gray-500">Effort</p>
                        <p className="text-2xl font-bold">
                          {result.feature.effort}/10
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-gray-500">Priority</p>
                        <p className="text-2xl font-bold">
                          {result.feature.priority}/10
                        </p>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Potential Risks:</h4>
                      <ul className="list-disc list-inside space-y-1">
                        {result.feature.risks.map((risk, index) => (
                          <li key={index} className="text-sm text-gray-600">
                            {risk}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Recommendations:</h4>
                      <ul className="list-disc list-inside space-y-1">
                        {result.feature.recommendations.map((rec, index) => (
                          <li key={index} className="text-sm text-gray-600">
                            {rec}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
