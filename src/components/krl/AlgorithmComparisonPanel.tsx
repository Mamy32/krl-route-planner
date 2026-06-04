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
    dijkstra: {
      runtime: number;
      totalTime: number;
      stations: number;
      transfers: number;
    };
    bellman: {
      runtime: number;
      totalTime: number;
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
              Faster Algorithm:
              {" "}
              {winner}
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
                Travel Time
              </TableCell>

              <TableCell>
                {comparisonData.dijkstra.totalTime}
              </TableCell>

              <TableCell>
                {comparisonData.bellman.totalTime}
              </TableCell>
            </TableRow>

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