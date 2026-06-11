import {
  EDGES,
  LINES,
  STATIONS,
} from "./krl-data";

function getLine(
  from: number,
  to: number
): string {
  for (const line of LINES) {
    for (const [a, b] of line.edges) {
      if (
        (a === from && b === to) ||
        (a === to && b === from)
      ) {
        return line.name;
      }
    }
  }

  return "Unknown";
}

export function bellmanFordTransfers(
  start: number,
  end: number
) {
  const stationCount = 94;

  const dist = Array(stationCount).fill(
    Infinity
  );

  const prev = Array(stationCount).fill(
    null
  );

  const prevLine = Array(
    stationCount
  ).fill(null);

  dist[start] = 0;

  for (
    let i = 0;
    i < stationCount - 1;
    i++
  ) {
    for (const [u, v] of EDGES) {

      const lineUV =
        getLine(u, v);

      const penaltyUV =
        prevLine[u] &&
        prevLine[u] !== lineUV
          ? 100
          : 0;

      const costUV =
        dist[u] +
        penaltyUV +
        0.01;

      if (costUV < dist[v]) {
        dist[v] = costUV;

        prev[v] = u;

        prevLine[v] = lineUV;
      }

      const penaltyVU =
        prevLine[v] &&
        prevLine[v] !== lineUV
          ? 100
          : 0;

      const costVU =
        dist[v] +
        penaltyVU +
        0.01;

      if (costVU < dist[u]) {
        dist[u] = costVU;

        prev[u] = v;

        prevLine[u] = lineUV;
      }
    }
  }

  const path: number[] = [];

  let current: number | null =
    end;

  while (current !== null) {
    path.unshift(current);
    current = prev[current];
  }

  const transferStations: string[] = [];

  let currentLine: string | null =
    null;

  for (
    let i = 0;
    i < path.length - 1;
    i++
  ) {
    const line = getLine(
      path[i],
      path[i + 1]
    );

    if (
      currentLine &&
      currentLine !== line
    ) {
      transferStations.push(
        STATIONS[path[i]]
      );
    }

    currentLine = line;
  }

  return {
    path,

    totalTime: null,

    transfers:
      transferStations.length,

    transferStations,
  };
}