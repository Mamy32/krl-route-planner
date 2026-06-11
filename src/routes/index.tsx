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
  const [optimization, setOptimization] = useState("fastest");
  const [pickupStation, setPickupStation] = useState("");
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
  const pickup = pickupStation
  ? getStationId(pickupStation)
  : null;
function combineRoute(
  algo: (from:number,to:number)=>any
) {

  if (
    pickup !== null &&
    pickup !== start &&
    pickup !== end
  ) {

    const first: any =
      algo(start, pickup);

    const second: any =
      algo(pickup, end);

    return {
      path: [
        ...first.path,
        ...second.path.slice(1),
      ],

      totalTime:
        (first.totalTime || 0) +
        (second.totalTime || 0),

      totalDistance:
        (first.totalDistance || 0) +
        (second.totalDistance || 0),

      transfers:
        (first.transfers || 0) +
        (second.transfers || 0),

      transferStations: [
        ...(first.transferStations || []),
        ...(second.transferStations || []),
      ],

      pickupStation,
    };
  }

  return algo(start, end);
}
function runSelectedAlgorithm(
  from: number,
  to: number
) {
  if (optimization === "shortest") {
    return dijkstraDistance(
      from,
      to
    );
  }

  if (optimization === "transfers") {
    return dijkstraTransfers(
      from,
      to
    );
  }

  return dijkstra(
    from,
    to
  );
}
  const startTime = performance.now();
  const dijkstraStart =
  performance.now();

const dijkstraResult = combineRoute(
  optimization === "shortest"
    ? dijkstraDistance
    : optimization === "transfers"
    ? dijkstraTransfers
    : dijkstra
);

const dijkstraRuntime =
  performance.now() -
  dijkstraStart;

const bellmanStart =
  performance.now();

const bellmanResult = combineRoute(
  optimization === "shortest"
    ? bellmanFordDistance
    : optimization === "transfers"
    ? bellmanFordTransfers
    : bellmanFord
);

const bellmanRuntime =
  performance.now() -
  bellmanStart;

const result = combineRoute(
  runSelectedAlgorithm
);


const runtime = performance.now() - startTime;

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

  pickupStation:
    pickupStation || null,

  totalDistance:
    "totalDistance" in result
      ? result.totalDistance
      : undefined,

  runtime,
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
  optimization,

  dijkstra: {
    runtime: dijkstraRuntime,

    totalTime:
      "totalTime" in dijkstraResult
        ? dijkstraResult.totalTime
        : 0,

    totalDistance:
      "totalDistance" in dijkstraResult
        ? dijkstraResult.totalDistance
        : 0,

    stations:
      dijkstraResult.path.length,

    transfers:
      "transfers" in dijkstraResult
        ? dijkstraResult.transfers
        : 0,
  },

  bellman: {
    runtime: bellmanRuntime,

    totalTime:
      "totalTime" in bellmanResult
        ? bellmanResult.totalTime
        : 0,

    totalDistance:
      "totalDistance" in bellmanResult
        ? bellmanResult.totalDistance
        : 0,

    stations:
      bellmanResult.path.length,

    transfers:
      "transfers" in bellmanResult
        ? bellmanResult.transfers
        : 0,
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
            pickupStation={pickupStation}
            optimization={optimization}
            onOriginChange={setOrigin}
            onDestinationChange={setDestination}
            onPickupStationChange={setPickupStation}
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
