import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { TrainFront } from "lucide-react";
import { RouteSearchPanel } from "@/components/krl/RouteSearchPanel";
import { KRLMapPanel } from "@/components/krl/KRLMapPanel";
import { RouteResultPanel } from "@/components/krl/RouteResultPanel";
import { AlgorithmComparisonPanel } from "@/components/krl/AlgorithmComparisonPanel";
import { PerformanceChart } from "@/components/krl/PerformanceChart";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "KRL Navigation System" },
      { name: "description", content: "Railway route planning system for Jakarta KRL Commuter Line — Algorithms Design and Analysis project." },
      { property: "og:title", content: "KRL Navigation System" },
      { property: "og:description", content: "Plan KRL Commuter Line routes with Dijkstra and Bellman-Ford algorithms." },
    ],
  }),
  component: Index,
});

function Index() {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [algorithm, setAlgorithm] = useState("dijkstra");
  const [optimization, setOptimization] = useState("fastest");
  const [showResult, setShowResult] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/40 to-slate-50">
      <header className="sticky top-0 z-30 backdrop-blur bg-white/80 border-b border-border/60 shadow-sm">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-blue-500 flex items-center justify-center shadow-md">
              <TrainFront className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-base sm:text-lg font-bold text-foreground leading-tight">KRL Navigation System</h1>
              <p className="text-[11px] sm:text-xs text-muted-foreground">Algorithms Design and Analysis Project</p>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-xs text-muted-foreground">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            System Online
          </div>
        </div>
      </header>

      <main className="max-w-[1600px] mx-auto px-4 sm:px-6 py-6 space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-3 animate-fade-in">
            <RouteSearchPanel
              origin={origin}
              destination={destination}
              algorithm={algorithm}
              optimization={optimization}
              onOriginChange={setOrigin}
              onDestinationChange={setDestination}
              onAlgorithmChange={setAlgorithm}
              onOptimizationChange={setOptimization}
              onFindRoute={() => setShowResult(true)}
            />
          </div>

          <div className="lg:col-span-6 animate-fade-in">
            <KRLMapPanel />
          </div>

          <div className="lg:col-span-3 space-y-6 animate-fade-in">
            <RouteResultPanel showResult={showResult} />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <AlgorithmComparisonPanel />
          <PerformanceChart />
        </div>
      </main>

      <footer className="border-t border-border/60 bg-white/60 backdrop-blur mt-10">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 py-6 text-center space-y-2">
          <p className="text-sm font-medium text-foreground">Developed for COMP6049001 Algorithms Design and Analysis</p>
          <p className="text-xs text-muted-foreground">
            Team Members: Raphael Harloverin Gunarso · Jovan Nikholas · Manjakamanana Mamy Jean
          </p>
        </div>
      </footer>
    </div>
  );
}
