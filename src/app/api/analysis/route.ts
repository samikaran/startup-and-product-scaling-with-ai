import { NextResponse } from 'next/server';
import { analyzeSentiment, analyzeFeatureRequest, analyzeFeedbackTrends } from '@/lib/openai';
import prisma from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const { type, content } = await request.json();

    switch (type) {
      case 'sentiment': {
        const result = await analyzeSentiment(content);
        
        // Store the analysis result
        await prisma.feedback.create({
          data: {
            text: content,
            sentiment: result.sentiment,
            source: 'user_feedback',
          }
        });

        return NextResponse.json(result);
      }

      case 'feature': {
        const result = await analyzeFeatureRequest(content);
        
        // Store the analyzed feature
        await prisma.feature.create({
          data: {
            name: content.slice(0, 50), // First 50 chars as name
            description: content,
            priority: result.priority,
            impact: result.impact,
            effort: result.effort,
            status: 'proposed'
          }
        });

        return NextResponse.json(result);
      }

      case 'trends': {
        // Expect content to be an array of feedback strings
        const result = await analyzeFeedbackTrends(content);
        return NextResponse.json(result);
      }

      default:
        return NextResponse.json(
          { error: 'Invalid analysis type' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Analysis API Error:', error);
    return NextResponse.json(
      { error: 'Analysis failed' },
      { status: 500 }
    );
  }
}