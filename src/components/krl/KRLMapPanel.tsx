import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Plus,
  Minus,
  Maximize2,
  Map as MapIcon,
} from "lucide-react";

import { useState } from "react";

import {
  LINES,
  COORDS,
  STATIONS,
  TRANSIT_STATIONS,
} from "@/lib/krl-data";

type Props = {
  routeResult?: {
    path?: number[];
  } | null;
};

export function KRLMapPanel({
  routeResult,
}: Props) {
  const [zoom, setZoom] =
    useState(1);
  const [position, setPosition] =
  useState({ x: 0, y: 0 });

const [dragging, setDragging] =
  useState(false);

const [startDrag, setStartDrag] =
  useState({ x: 0, y: 0 });

  const highlightedEdges =
    new Set<string>();

  const routeStations =
    new Set<number>(
      routeResult?.path ?? []
    );

  if (routeResult?.path) {
    for (
      let i = 0;
      i <
      routeResult.path.length - 1;
      i++
    ) {
      const a =
        routeResult.path[i];

      const b =
        routeResult.path[i + 1];

      highlightedEdges.add(
        `${a}-${b}`
      );

      highlightedEdges.add(
        `${b}-${a}`
      );
    }
  }
  const handleMouseDown = (
  e: React.MouseEvent
) => {
  setDragging(true);

  setStartDrag({
    x: e.clientX - position.x,
    y: e.clientY - position.y,
  });
};

const handleMouseMove = (
  e: React.MouseEvent
) => {
  if (!dragging) return;

  setPosition({
    x: e.clientX - startDrag.x,
    y: e.clientY - startDrag.y,
  });
};

const handleMouseUp = () => {
  setDragging(false);
};

  const startStation =
    routeResult?.path?.[0];

  const endStation =
    routeResult?.path?.[
      (routeResult.path?.length ?? 1) -
        1
    ];

  return (
    <Card className="shadow-md border-border/60">
      <CardHeader className="pb-3 flex flex-row items-center justify-between space-y-0">
        <CardTitle className="flex items-center gap-2 text-lg">
          <MapIcon className="w-5 h-5 text-primary" />
          KRL Network Map
        </CardTitle>

        <div className="flex items-center gap-1">
          <Button
            size="icon"
            variant="outline"
            className="h-8 w-8"
            onClick={() =>
              setZoom((z) =>
                Math.min(
                  z + 0.2,
                  2.5
                )
              )
            }
          >
            <Plus className="w-4 h-4" />
          </Button>

          <Button
            size="icon"
            variant="outline"
            className="h-8 w-8"
            onClick={() =>
              setZoom((z) =>
                Math.max(
                  z - 0.2,
                  0.6
                )
              )
            }
          >
            <Minus className="w-4 h-4" />
          </Button>

          <Button
            size="icon"
            variant="outline"
            className="h-8 w-8"
            onClick={() =>
              setZoom(1)
            }
          >
            <Maximize2 className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        <div
          className="relative w-full rounded-lg bg-gradient-to-br from-sky-50 to-blue-50/60 border border-border/60 overflow-hidden"
          style={{ height: 520 }}
        >
          <div
  className="absolute inset-0 overflow-hidden cursor-grab active:cursor-grabbing"
  onMouseDown={handleMouseDown}
  onMouseMove={handleMouseMove}
  onMouseUp={handleMouseUp}
  onMouseLeave={handleMouseUp}
>
                <svg
                  viewBox="0 0 820 560"
                  className="w-full h-full"
                  style={{
                    transform: `
                      translate(${position.x}px, ${position.y}px)
                      scale(${zoom})
                    `,
                    transformOrigin: "center",
                    minHeight: 520,
                  }}
                >
              <defs>
                <pattern
                  id="grid"
                  width="40"
                  height="40"
                  patternUnits="userSpaceOnUse"
                >
                  <path
                    d="M 40 0 L 0 0 0 40"
                    fill="none"
                    stroke="#cbd5e1"
                    strokeOpacity="0.35"
                    strokeWidth="0.5"
                  />
                </pattern>
              </defs>

              <rect
                width="820"
                height="560"
                fill="url(#grid)"
              />

              {/* Lines */}
              {LINES.map((line) =>
                line.edges.map(
                  ([u, v], i) => {
                    const a =
                      COORDS[u];

                    const b =
                      COORDS[v];

                    if (
                      !a ||
                      !b
                    )
                      return null;

                    const isHighlighted =
                      highlightedEdges.has(
                        `${u}-${v}`
                      );

                    return (
                      <line
                        key={`${line.name}-${i}`}
                        x1={a.x}
                        y1={a.y}
                        x2={b.x}
                        y2={b.y}
                        stroke={
                          routeResult?.path
                            ? isHighlighted
                              ? line.color
                              : "#cbd5e1"
                            : line.color
                        }
                        strokeWidth={
                          isHighlighted
                            ? 6
                            : 3
                        }
                        opacity={
                          routeResult?.path
                            ? isHighlighted
                              ? 1
                              : 0.25
                            : 0.9
                        }
                        strokeLinecap="round"
                      />
                    );
                  }
                )
              )}

              {/* Stations */}
              {Object.entries(
                COORDS
              ).map(
                ([idStr, c]) => {
                  const id =
                    Number(idStr);

                  const isTransit =
                    TRANSIT_STATIONS.has(
                      id
                    );

                  const isRouteStation =
                    routeStations.has(
                      id
                    );

                  const name =
                    STATIONS[id];

                  return (
                    <g key={id}>
                      <circle
                        cx={c.x}
                        cy={c.y}
                        r={
                          isRouteStation
                            ? 6
                            : isTransit
                            ? 6
                            : 3
                        }
                        fill={
                          id ===
                          startStation
                            ? "#16a34a"
                            : id ===
                              endStation
                            ? "#dc2626"
                            : isRouteStation
                            ? "#2563eb"
                            : "white"
                        }
                        stroke={
                          isRouteStation
                            ? "#1d4ed8"
                            : isTransit
                            ? "#1e3a8a"
                            : "#475569"
                        }
                        strokeWidth={
                          isRouteStation
                            ? 2.5
                            : isTransit
                            ? 2
                            : 1.2
                        }
                      />

                      {(isTransit ||
                        isRouteStation) && (
                        <text
                          x={c.x}
                          y={c.y - 10}
                          textAnchor="middle"
                          style={{
                            fontSize: 8,
                            fontWeight: 700,
                            fill: "#1e293b",
                          }}
                        >
                          {name}
                        </text>
                      )}
                    </g>
                  );
                }
              )}
            </svg>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-2">
          {LINES.map((l) => (
            <div
              key={l.name}
              className="flex items-center gap-2 px-2 py-1.5 rounded-md bg-muted/40"
            >
              <span
                className="w-4 h-1.5 rounded-full"
                style={{
                  background:
                    l.color,
                }}
              />

              <span className="text-xs text-muted-foreground">
                {l.name}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}