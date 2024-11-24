import { Suspense } from "react";
import FeaturesList from "@/components/product/feature-list";
import FeedbackAnalysis from "@/components/product/feedback-analysis";
import UserBehavior from "@/components/product/user-behaviour";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FeedbackAnalysisAI from "@/components/product/feedback-analysis-ai";

export default function ProductPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Product Management</h1>

      <Tabs defaultValue="features">
        <TabsList>
          <TabsTrigger value="features">Features</TabsTrigger>
          <TabsTrigger value="feedback">Feedback</TabsTrigger>
          <TabsTrigger value="behavior">User Behavior</TabsTrigger>
        </TabsList>

        <Suspense fallback={<div>Loading...</div>}>
          <TabsContent value="features">
            <FeaturesList />
          </TabsContent>
          <TabsContent value="feedback">
            <FeedbackAnalysis />
            {/* <FeedbackAnalysisAI /> */}
          </TabsContent>
          <TabsContent value="behavior">
            <UserBehavior />
          </TabsContent>
        </Suspense>
      </Tabs>
    </div>
  );
}
