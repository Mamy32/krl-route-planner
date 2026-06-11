import { EDGES } from "./krl-data";
import { STATION_GPS } from "./krl-gps";
import { haversine } from "./distance";

export const DISTANCE_EDGES =
  EDGES.map(
    ([from, to]) => {

const a = STATION_GPS[from];
const b = STATION_GPS[to];

      if (!a || !b) {
        return [
          from,
          to,
          1,
        ] as [
          number,
          number,
          number
        ];
      }

      const km =
        haversine(
          a.lat,
          a.lng,
          b.lat,
          b.lng
        );

      return [
        from,
        to,
        Number(
          km.toFixed(2)
        ),
      ] as [
        number,
        number,
        number
      ];
    }
  );