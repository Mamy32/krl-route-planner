import { EDGES } from "./krl-data";

export type Neighbor = {
  to: number;
  weight: number;
};

export function buildGraph() {
  const graph: Record<number, Neighbor[]> = {};

  for (const [u, v, w] of EDGES) {
    if (!graph[u]) graph[u] = [];
    if (!graph[v]) graph[v] = [];

    graph[u].push({
      to: v,
      weight: w,
    });

    graph[v].push({
      to: u,
      weight: w,
    });
  }

  return graph;
}