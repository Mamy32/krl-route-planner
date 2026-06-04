import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { GitCompare, Info } from "lucide-react";
import { ALGO_COMPARISON } from "@/lib/krl-data";

export function AlgorithmComparisonPanel() {
  return (
    <Card className="shadow-md border-border/60">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <GitCompare className="w-5 h-5 text-primary" />
          Algorithm Comparison
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Metric</TableHead>
              <TableHead>Dijkstra</TableHead>
              <TableHead>Bellman-Ford</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {ALGO_COMPARISON.map((r) => (
              <TableRow key={r.metric}>
                <TableCell className="font-medium">{r.metric}</TableCell>
                <TableCell>{r.dijkstra}</TableCell>
                <TableCell>{r.bellman}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="mt-4 flex items-start gap-2 rounded-md bg-primary/5 border border-primary/10 p-3">
          <Info className="w-4 h-4 text-primary mt-0.5 shrink-0" />
          <p className="text-xs text-muted-foreground">Dijkstra performs better on positive-weight railway networks.</p>
        </div>
      </CardContent>
    </Card>
  );
}
