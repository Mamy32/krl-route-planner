import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Activity } from "lucide-react";
import { PERFORMANCE_DATA } from "@/lib/krl-data";

export function PerformanceChart() {
  return (
    <Card className="shadow-md border-border/60">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Activity className="w-5 h-5 text-primary" />
          Algorithm Performance
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="w-full" style={{ height: 300 }}>
          <ResponsiveContainer>
            <LineChart data={PERFORMANCE_DATA} margin={{ top: 10, right: 20, left: 0, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.5} />
              <XAxis dataKey="stations" label={{ value: "Number of Stations", position: "insideBottom", offset: -5, fontSize: 12 }} tick={{ fontSize: 12 }} />
              <YAxis label={{ value: "Execution Time (ms)", angle: -90, position: "insideLeft", fontSize: 12 }} tick={{ fontSize: 12 }} />
              <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid hsl(var(--border))", fontSize: 12 }} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Line type="monotone" dataKey="dijkstra" name="Dijkstra" stroke="#2563eb" strokeWidth={2.5} dot={{ r: 4 }} activeDot={{ r: 6 }} />
              <Line type="monotone" dataKey="bellman" name="Bellman-Ford" stroke="#0891b2" strokeWidth={2.5} dot={{ r: 4 }} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
