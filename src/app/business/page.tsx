import { Suspense } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FinancialMetrics from "@/components/business/financial-metrics";
import ResourceOptimization from "@/components/business/resource-optimization";
import MarketAnalysis from "@/components/business/market-analysis";

export default function BusinessPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Business Scaling</h1>

      <Tabs defaultValue="financial">
        <TabsList>
          <TabsTrigger value="financial">Financial Metrics</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
          <TabsTrigger value="market">Market Analysis</TabsTrigger>
        </TabsList>

        <Suspense fallback={<div>Loading...</div>}>
          <TabsContent value="financial">
            <FinancialMetrics />
          </TabsContent>
          <TabsContent value="resources">
            <ResourceOptimization />
          </TabsContent>
          <TabsContent value="market">
            <MarketAnalysis />
          </TabsContent>
        </Suspense>
      </Tabs>
    </div>
  );
}
