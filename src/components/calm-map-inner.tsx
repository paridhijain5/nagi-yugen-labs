import { MapContainer, TileLayer, CircleMarker, Tooltip, Polyline, useMap } from "react-leaflet";
import { useEffect } from "react";
import type { MapPoint } from "./calm-map";

function Recenter({ center, zoom }: { center: [number, number]; zoom: number }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo(center, zoom, { duration: 1.2 });
  }, [center, zoom, map]);
  return null;
}

function calmColor(c: number) {
  // 0 (stressful) -> red, 100 (calm) -> aqua/mint
  if (c > 75) return "#7BB6A4";
  if (c > 55) return "#A7DADC";
  if (c > 40) return "#447A9C";
  if (c > 25) return "#E29A3F";
  return "#E63746";
}

export default function CalmMapInner({
  center,
  zoom,
  points,
  route,
  routeColor = "#E63746",
}: {
  center: [number, number];
  zoom: number;
  points: MapPoint[];
  route?: [number, number][];
  routeColor?: string;
}) {
  return (
    <MapContainer
      center={center}
      zoom={zoom}
      scrollWheelZoom
      className="w-full h-full rounded-3xl overflow-hidden"
      style={{ minHeight: 300 }}
    >
      <Recenter center={center} zoom={zoom} />
      <TileLayer
        attribution='&copy; OpenStreetMap'
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
      />
      {points.map((p) => {
        const calm = 100 - p.intensity;
        const color = calmColor(calm);
        const radius = 10 + (p.intensity / 100) * 18;
        return (
          <CircleMarker
            key={p.id}
            center={p.pos}
            radius={radius}
            pathOptions={{ color, fillColor: color, fillOpacity: 0.22, weight: 1.5 }}
          >
            <Tooltip direction="top" offset={[0, -8]} opacity={1}>
              <div className="text-xs">
                <div className="font-semibold">{p.label}</div>
                <div className="text-[10px] opacity-70">{p.type} · calm {calm}</div>
              </div>
            </Tooltip>
          </CircleMarker>
        );
      })}
      {route && route.length > 1 && (
        <Polyline positions={route} pathOptions={{ color: routeColor, weight: 5, opacity: 0.85, dashArray: "8 10" }} />
      )}
    </MapContainer>
  );
}
