import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Train,
  Clock,
  MapPin,
  ArrowDownUp,
  Wallet,
  ChevronDown,
  Cpu,
} from "lucide-react";

type RouteResult = {
  stationNames: string[];
  totalTime: number;
  runtime: number;
  optimization: string;
  algorithm: string;
  transfers: number;
  transferStations: string[];
};


type Props = {
  routeResult: RouteResult | null;
};

export function RouteResultPanel({ routeResult }: Props) {
  return (
    <Card className="shadow-md border-border/60">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Train className="w-5 h-5 text-primary" />
          Route Result
        </CardTitle>
      </CardHeader>

      <CardContent>
  {!routeResult ? (
    <div className="flex flex-col items-center justify-center text-center py-10 text-muted-foreground">
      <div className="text-4xl mb-3">🚆</div>

      <p className="text-sm">
        Select origin and destination stations to find the best route.
      </p>
    </div>
  ) : (
    <div className="space-y-5 animate-fade-in">

      <div className="rounded-md bg-blue-50 border border-blue-200 px-3 py-2 text-sm">
        Optimization:
        <span className="font-semibold ml-1 capitalize">
          {routeResult.optimization}
        </span>
      </div>
      <div className="rounded-md bg-green-50 border border-green-200 px-3 py-2 text-sm">
        Algorithm:
        <span className="font-semibold ml-1 capitalize">
          {routeResult.algorithm}
        </span>
      </div>
      {routeResult.transferStations?.length > 0 && (
  <div className="rounded-md border border-amber-200 bg-amber-50 p-3">
    <p className="text-sm font-semibold text-amber-800 mb-2">
      Transfer Stations
    </p>

<div className="space-y-2">
  {routeResult.transferStations.map(
    (station, index) => (
      <div
        key={index}
        className="flex items-center gap-2 rounded-md bg-amber-100 border border-amber-200 px-3 py-2"
      >
        <span className="text-lg">
          🔄
        </span>

        <div>
          <p className="text-sm font-semibold text-amber-800">
            {station}
          </p>

          <p className="text-xs text-amber-600">
            Change train line here
          </p>
        </div>
      </div>
    )
  )}
</div>
  </div>
)}

      <div className="space-y-1 max-h-[280px] overflow-y-auto pr-1">
        {routeResult.stationNames.map(
          (station: string, index: number) => (
            <div key={`${station}-${index}`}>
              <div className="flex items-center gap-2 rounded-md bg-primary/5 border border-primary/10 px-3 py-2">
                <div className="w-2 h-2 rounded-full bg-primary" />

                <div className="flex items-center w-full">
  <span className="text-sm font-medium">
    {station}
  </span>

  {routeResult.transferStations?.includes(
    station
  ) && (
    <span className="ml-auto rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-semibold text-amber-700">
      🔄 Transfer
    </span>
  )}
</div>
              </div>

              {index <
                routeResult.stationNames.length - 1 && (
                <div className="flex justify-center py-0.5">
                  <ChevronDown className="w-4 h-4 text-primary/60" />
                </div>
              )}
            </div>
          )
        )}
      </div>

      <div className="grid grid-cols-2 gap-2">
      <Stat
        icon={<Clock className="w-4 h-4" />}
        label={
          routeResult.optimization === "shortest"
            ? "Route Length"
            : "Travel Time"
        }
        value={
          routeResult.optimization === "shortest"
            ? `${routeResult.totalTime} stations`
            : `${routeResult.totalTime} min`
        }
      />

        <Stat
          icon={<MapPin className="w-4 h-4" />}
          label="Stations"
          value={String(routeResult.stationNames.length)}
        />

        <Stat
          icon={<ArrowDownUp className="w-4 h-4" />}
          label="Transfers"
          value={String(routeResult.transfers)}
        />

        <Stat
          icon={<Wallet className="w-4 h-4" />}
          label="Fare"
          value="Rp 5,000"
        />

        <Stat
          icon={<Cpu className="w-4 h-4" />}
          label="Runtime"
          value={`${routeResult.runtime.toFixed(4)} ms`}
        />
      </div>
    </div>
  )}
</CardContent>
    </Card>
  );
}

function Stat({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-md border border-border/60 bg-card p-3">
      <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1">
        {icon}
        {label}
      </div>

      <div className="text-base font-semibold text-foreground">
        {value}
      </div>
    </div>
  );
}