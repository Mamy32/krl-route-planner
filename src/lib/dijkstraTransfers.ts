import { EDGES, LINES } from "./krl-data";
import { STATIONS } from "./krl-data";
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

export function dijkstraTransfers(

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

  const visited = new Set<number>();

  while (
    visited.size < stationCount
  ) {
    let current = -1;

    let minDist = Infinity;

    for (
      let i = 0;
      i < stationCount;
      i++
    ) {
      if (
        !visited.has(i) &&
        dist[i] < minDist
      ) {
        minDist = dist[i];
        current = i;
      }
    }

    if (
      current === -1 ||
      current === end
    )
      break;

    visited.add(current);

    for (const [u, v] of EDGES) {
      let neighbor = -1;

      if (u === current)
        neighbor = v;

      if (v === current)
        neighbor = u;

      if (neighbor === -1)
        continue;

      const edgeLine =
        getLine(current, neighbor);

      const transferPenalty =
        prevLine[current] &&
        prevLine[current] !== edgeLine
          ? 100
          : 0;

      const alt =
        dist[current] +
        1 +
        transferPenalty;

      if (alt < dist[neighbor]) {
        dist[neighbor] = alt;

        prev[neighbor] = current;

        prevLine[neighbor] =
          edgeLine;
      }
    }
  }

const path: number[] = [];

let current: number | null = end;

while (current !== null) {
  path.unshift(current);
  current = prev[current];
}

// Count transfers and record stations
const transferStations: string[] = [];

let currentLine: string | null = null;

for (let i = 0; i < path.length - 1; i++) {
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
  totalTime: path.length - 1,
  transfers: transferStations.length,
  transferStations,
};
}