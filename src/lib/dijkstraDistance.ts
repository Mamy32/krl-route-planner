import { EDGES } from "./krl-data";

export function dijkstraDistance(
  start: number,
  end: number
) {
  const graph: Record<number, any[]> = {};

  for (const [u, v] of EDGES) {
    if (!graph[u]) graph[u] = [];
    if (!graph[v]) graph[v] = [];

    graph[u].push({
      to: v,
      weight: 1,
    });

    graph[v].push({
      to: u,
      weight: 1,
    });
  }

  const distances: Record<number, number> = {};
  const previous: Record<number, number | null> = {};
  const visited = new Set<number>();

  Object.keys(graph).forEach((node) => {
    distances[+node] = Infinity;
    previous[+node] = null;
  });

  distances[start] = 0;

  while (true) {
    let current = -1;
    let best = Infinity;

    for (const node in distances) {
      const n = Number(node);

      if (
        !visited.has(n) &&
        distances[n] < best
      ) {
        best = distances[n];
        current = n;
      }
    }

    if (current === -1) break;

    visited.add(current);

    for (const neighbor of graph[current]) {
      const alt =
        distances[current] +
        neighbor.weight;

      if (alt < distances[neighbor.to]) {
        distances[neighbor.to] = alt;
        previous[neighbor.to] = current;
      }
    }
  }

  const path: number[] = [];

  let curr: number | null = end;

  while (curr !== null) {
    path.unshift(curr);
    curr = previous[curr];
  }

  return {
    path,
    totalTime: distances[end],
  };
}