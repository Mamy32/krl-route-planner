import { STATIONS } from "./krl-data";

export function getStationId(
  stationName: string
) {
  return Number(
    Object.entries(STATIONS).find(
      ([_, name]) => name === stationName
    )?.[0]
  );
}