import { useRef } from "react";
import * as THREE from "three";
import sichuanMap from "@/assets/sichuan.json";
import * as d3 from "d3";

export default function Three3DMapView() {
  const divRef = useRef<HTMLDivElement>(null);

  return <div ref={divRef} />;
}
