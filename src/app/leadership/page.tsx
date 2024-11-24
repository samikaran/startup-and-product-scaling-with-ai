import { Suspense } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TeamPerformance from "@/components/leadership/team-performance";
import DecisionSupport from "@/components/leadership/decision-support";
import StrategyPlanning from "@/components/leadership/strategy-planning";

export default function LeadershipPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Startup Leadership Dashboard</h1>

      <Tabs defaultValue="team">
        <TabsList>
          <TabsTrigger value="team">Team Performance</TabsTrigger>
          <TabsTrigger value="decisions">Decision Support</TabsTrigger>
          <TabsTrigger value="strategy">Strategy Planning</TabsTrigger>
        </TabsList>

        <Suspense fallback={<div>Loading...</div>}>
          <TabsContent value="team">
            <TeamPerformance />
          </TabsContent>
          <TabsContent value="decisions">
            <DecisionSupport />
          </TabsContent>
          <TabsContent value="strategy">
            <StrategyPlanning />
          </TabsContent>
        </Suspense>
      </Tabs>
    </div>
  );
}
