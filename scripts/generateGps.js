import fs from "fs";
import csv from "csv-parser";

const stations = {};

fs.createReadStream(
  "krl_stations_jakarta.csv"
)
  .pipe(csv())
  .on("data", (row) => {
    stations[row.No] = {
      lat: Number(row.Latitude),
      lng: Number(row.Longitude),
    };
  })
  .on("end", () => {
    const output =
`export const STATION_GPS = ${JSON.stringify(
  stations,
  null,
  2
)} as const;`;

    fs.writeFileSync(
      "src/lib/krl-gps.ts",
      output
    );

    console.log(
      "krl-gps.ts generated!"
    );
  });