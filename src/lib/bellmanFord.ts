import { EDGES } from "./krl-data";

export function bellmanFord(
  start: number,
  end: number
) {
  const stationCount = 94;

  const dist: number[] =
    Array(stationCount).fill(Infinity);

  const prev: (number | null)[] =
    Array(stationCount).fill(null);

  dist[start] = 0;

  for (
    let i = 0;
    i < stationCount - 1;
    i++
  ) {
    for (const [u, v, w] of EDGES) {
      if (
        dist[u] !== Infinity &&
        dist[u] + w < dist[v]
      ) {
        dist[v] = dist[u] + w;
        prev[v] = u;
      }

      if (
        dist[v] !== Infinity &&
        dist[v] + w < dist[u]
      ) {
        dist[u] = dist[v] + w;
        prev[u] = v;
      }
    }
  }

  const path: number[] = [];

  let current: number | null = end;

  while (current !== null) {
    path.unshift(current);
    current = prev[current];
  }

  return {
    path,
    totalTime: dist[end],
  };
}