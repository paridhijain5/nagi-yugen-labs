import { lazy, Suspense } from "react";

const Inner = lazy(() => import("./calm-map-inner"));

export type MapPoint = {
  id: string;
  pos: [number, number];
  intensity: number; // 0-100 calm
  label: string;
  type: string;
};

export function CalmMap(props: {
  center: [number, number];
  zoom: number;
  points: MapPoint[];
  className?: string;
  route?: [number, number][];
  routeColor?: string;
}) {
  return (
    <div className={props.className}>
      <Suspense fallback={<div className="w-full h-full rounded-3xl bg-gradient-to-br from-accent/30 to-secondary/30 animate-pulse" />}>
        <Inner {...props} />
      </Suspense>
    </div>
  );
}
