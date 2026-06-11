import { buildGraph } from "./graph";

export function dijkstra(
  start: number,
  end: number
) {
  const graph = buildGraph();

  const distances: Record<number, number> = {};
  const previous: Record<number, number | null> = {};
  const visited = new Set<number>();

  Object.keys(graph).forEach((node) => {
    distances[Number(node)] = Infinity;
    previous[Number(node)] = null;
  });

  distances[start] = 0;

  while (visited.size < Object.keys(graph).length) {
    let current = -1;
    let minDistance = Infinity;

    for (const node in distances) {
      const n = Number(node);

      if (
        !visited.has(n) &&
        distances[n] < minDistance
      ) {
        minDistance = distances[n];
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