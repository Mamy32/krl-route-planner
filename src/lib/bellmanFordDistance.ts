import { DISTANCE_EDGES } from "./generateDistances";

export function bellmanFordDistance(
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
    for (const [u, v, distance] of DISTANCE_EDGES) {

      const weight = distance;

      if (
        dist[u] !== Infinity &&
        dist[u] + weight < dist[v]
      ) {
        dist[v] =
          dist[u] + weight;

        prev[v] = u;
      }

      if (
        dist[v] !== Infinity &&
        dist[v] + weight < dist[u]
      ) {
        dist[u] =
          dist[v] + weight;

        prev[u] = v;
      }
    }
  }

  const path: number[] = [];

  let current:
    | number
    | null = end;

  while (current !== null) {
    path.unshift(current);
    current = prev[current];
  }

 return {
  path,
  totalDistance: Number(
    dist[end].toFixed(2)
  ),
  totalTime: 0,
  transfers: 0,
  transferStations: [],
};
}