import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  GitCompare,
  Info,
  Trophy,
} from "lucide-react";

type Props = {
  comparisonData: {
    optimization: string;

    dijkstra: {
      runtime: number;
      totalTime: number;
      totalDistance?: number;
      stations: number;
      transfers: number;
    };

    bellman: {
      runtime: number;
      totalTime: number;
      totalDistance?: number;
      stations: number;
      transfers: number;
    };
  } | null;
};

export function AlgorithmComparisonPanel({
  comparisonData,
}: Props) {
  if (!comparisonData) {
    return (
      <Card className="shadow-md border-border/60">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <GitCompare className="w-5 h-5 text-primary" />
            Algorithm Comparison
          </CardTitle>
        </CardHeader>

        <CardContent>
          <p className="text-sm text-muted-foreground">
            Find a route to compare algorithms.
          </p>
        </CardContent>
      </Card>
    );
  }

const winner =
  comparisonData.dijkstra.runtime <
  comparisonData.bellman.runtime
    ? "Dijkstra"
    : "Bellman-Ford";

const runtimeDifference = Math.abs(
  comparisonData.dijkstra.runtime -
  comparisonData.bellman.runtime
).toFixed(2);

const isShortest =
  comparisonData.optimization ===
  "shortest";

const sameDistance =
  comparisonData.dijkstra.totalDistance ===
  comparisonData.bellman.totalDistance;

const sameStations =
  comparisonData.dijkstra.stations ===
  comparisonData.bellman.stations;

  return (
    <Card className="shadow-md border-border/60">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <GitCompare className="w-5 h-5 text-primary" />
          Algorithm Comparison
        </CardTitle>
      </CardHeader>

      <CardContent>

<div className="mb-4 rounded-md border border-yellow-200 bg-yellow-50 p-3">
  <div className="flex items-center gap-2">
    <Trophy className="w-4 h-4 text-yellow-600" />

    <span className="text-sm font-semibold text-yellow-800">
      {isShortest
        ? sameDistance && sameStations
          ? `${winner} was faster, but both algorithms found the same shortest route`
          : `${winner} found a different shortest route`
        : `Faster Algorithm: ${winner}`}
    </span>
  </div>
</div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                Metric
              </TableHead>

              <TableHead>
                Dijkstra
              </TableHead>

              <TableHead>
                Bellman-Ford
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>

            <TableRow>
              <TableCell className="font-medium">
                Runtime
              </TableCell>

              <TableCell>
                {comparisonData.dijkstra.runtime.toFixed(
                  4
                )} ms
              </TableCell>

              <TableCell>
                {comparisonData.bellman.runtime.toFixed(
                  4
                )} ms
              </TableCell>
            </TableRow>
            <TableRow>
  <TableCell className="font-medium">
    Faster By
  </TableCell>

  <TableCell colSpan={2}>
    {winner} is faster by {runtimeDifference} ms
  </TableCell>
</TableRow>

{isShortest ? (
  <TableRow>
    <TableCell className="font-medium">
      Distance
    </TableCell>

    <TableCell>
      {comparisonData.dijkstra.totalDistance?.toFixed(
        2
      )} km
    </TableCell>

    <TableCell>
      {comparisonData.bellman.totalDistance?.toFixed(
        2
      )} km
    </TableCell>
  </TableRow>
) : (
  <TableRow>
    <TableCell className="font-medium">
      Travel Time
    </TableCell>

    <TableCell>
      {comparisonData.dijkstra.totalTime} min
    </TableCell>

    <TableCell>
      {comparisonData.bellman.totalTime} min
    </TableCell>
  </TableRow>
)}

            <TableRow>
              <TableCell className="font-medium">
                Stations
              </TableCell>

              <TableCell>
                {comparisonData.dijkstra.stations}
              </TableCell>

              <TableCell>
                {comparisonData.bellman.stations}
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="font-medium">
                Transfers
              </TableCell>

              <TableCell>
                {comparisonData.dijkstra.transfers}
              </TableCell>

              <TableCell>
                {comparisonData.bellman.transfers}
              </TableCell>
            </TableRow>

          </TableBody>
        </Table>

        <div className="mt-4 flex items-start gap-2 rounded-md bg-primary/5 border border-primary/10 p-3">
          <Info className="w-4 h-4 text-primary mt-0.5 shrink-0" />

          <p className="text-xs text-muted-foreground">
            Dijkstra is usually faster on positive-weight railway networks,
            while Bellman-Ford is more flexible because it supports negative edge weights.
          </p>
        </div>

      </CardContent>
    </Card>
  );
}