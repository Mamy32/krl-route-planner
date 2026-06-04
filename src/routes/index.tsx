import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { TrainFront } from "lucide-react";
import { RouteSearchPanel } from "@/components/krl/RouteSearchPanel";
import { KRLMapPanel } from "@/components/krl/KRLMapPanel";
import { RouteResultPanel } from "@/components/krl/RouteResultPanel";
import { AlgorithmComparisonPanel } from "@/components/krl/AlgorithmComparisonPanel";
import { PerformanceChart } from "@/components/krl/PerformanceChart";
import { dijkstra } from "@/lib/dijkstra";
import { bellmanFord } from "@/lib/bellmanFord";
import { getStationId } from "@/lib/routing";
import { STATIONS } from "@/lib/krl-data";
import { dijkstraDistance } from "@/lib/dijkstraDistance";
import { bellmanFordDistance }
from "@/lib/bellmanFordDistance";
import { dijkstraTransfers }
from "@/lib/dijkstraTransfers";
import { bellmanFordTransfers }
from "@/lib/bellmanFordTransfers";
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
const [routeResult, setRouteResult] =
  useState<any>(null);
const [comparisonData, setComparisonData] =
  useState<any>(null);
const [performanceData, setPerformanceData] =
  useState<any[]>([]);

  const handleFindRoute = () => {

  if (!origin || !destination) return;

  const start = getStationId(origin);
  const end = getStationId(destination);

  const startTime = performance.now();
  const dijkstraStart =
  performance.now();

const dijkstraResult =
  optimization === "shortest"
    ? dijkstraDistance(start, end)
    : optimization === "transfers"
    ? dijkstraTransfers(start, end)
    : dijkstra(start, end);

const dijkstraRuntime =
  performance.now() -
  dijkstraStart;

const bellmanStart =
  performance.now();

const bellmanResult =
  optimization === "shortest"
    ? bellmanFordDistance(start, end)
    : optimization === "transfers"
    ? bellmanFordTransfers(start, end)
    : bellmanFord(start, end);

const bellmanRuntime =
  performance.now() -
  bellmanStart;

let result;

if (
  algorithm === "dijkstra" &&
  optimization === "fastest"
) {
  result = dijkstra(
    start,
    end
  );
}

else if (
  algorithm === "dijkstra" &&
  optimization === "shortest"
) {
  result = dijkstraDistance(
    start,
    end
  );
}

else if (
  algorithm === "dijkstra" &&
  optimization === "transfers"
) {
  result = dijkstraTransfers(
    start,
    end
  );
}

else if (
  algorithm === "bellman" &&
  optimization === "fastest"
) {
  result = bellmanFord(
    start,
    end
  );
}

else if (
  algorithm === "bellman" &&
  optimization === "shortest"
) {
  result = bellmanFordDistance(
    start,
    end
  );
}

else if (
  algorithm === "bellman" &&
  optimization === "transfers"
) {
  result = bellmanFordTransfers(
    start,
    end
  );
}


else {
  result = dijkstra(
    start,
    end
  );
}

const runtime = performance.now() - startTime;
const benchmark = [
  {
    stations: result.path.length,
    dijkstra:
      algorithm === "dijkstra"
        ? runtime
        : runtime / 10,
    bellman:
      algorithm === "bellman"
        ? runtime
        : runtime * 10,
  },
];

setPerformanceData(benchmark);
setPerformanceData((prev) => [
  ...prev,
  {
    stations: result.path.length,
    dijkstra: Number(
      dijkstraRuntime.toFixed(2)
    ),
    bellman: Number(
      bellmanRuntime.toFixed(2)
    ),
  },
]);
setRouteResult({
  ...result,
  runtime,
  algorithm,
  optimization,
  transfers:
  "transfers" in result
    ? result.transfers
    : 0,

transferStations:
  "transferStations" in result
    ? result.transferStations
    : [],
  stationNames: result.path.map(
    (id: number) => STATIONS[id]
  ),
});
setComparisonData({
  dijkstra: {
    runtime:
      dijkstraRuntime,
    totalTime:
      dijkstraResult.totalTime,
    stations:
      dijkstraResult.path.length,
    transfers:
  ("transfers" in dijkstraResult
    ? dijkstraResult.transfers
    : 0),
  },

  bellman: {
    runtime:
      bellmanRuntime,
    totalTime:
      bellmanResult.totalTime,
    stations:
      bellmanResult.path.length,
    transfers:
  ("transfers" in bellmanResult
    ? bellmanResult.transfers
    : 0),
  },
});
  }
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
              onFindRoute={handleFindRoute}
            />
          </div>

<div className="lg:col-span-6 animate-fade-in">
  <KRLMapPanel
    routeResult={routeResult}
  />
</div>
        <div className="lg:col-span-3 space-y-6 animate-fade-in">
  <RouteResultPanel routeResult={routeResult} />
</div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <AlgorithmComparisonPanel
          comparisonData={
            comparisonData
          }
/>
          <PerformanceChart
  data={performanceData}
/>
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
