import { EnhancedDOMPoint } from '@/engine/enhanced-dom-point';
const canvas = document.createElement('canvas');
const context = canvas.getContext('2d')!;

// DO NOT USE FOR REAL TIME COLOR CHANGES
// This is a very small way to convert color but not a fast one obviously
export function hexToRgba(hex: string): number[] {
  context.clearRect(0, 0, 1, 1);
  context.fillStyle = hex;
  context.fillRect(0, 0, 1, 1);
  return [...context.getImageData(0, 0, 1, 1).data];
}

// DO NOT USE FOR REAL TIME COLOR CHANGES
// This is a very small way to convert color but not a fast one obviously
export function hexToWebgl(hex: string): number[] {
  return hexToRgba(hex).map(val => val / 255);
}

export function doTimes<T>(times: number, callback: (index: number) => T): T[] {
  const result: T[] = [];
  for (let i = 0; i < times; i++) {
    result.push(callback(i));
  }
  return result;
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}


export function radsToDegrees(radians: number): number {
  return radians * (180 / Math.PI);
}

function unormalizedNormal(points: EnhancedDOMPoint[]): EnhancedDOMPoint {
  const u = points[2].clone_().subtract(points[1]);
  const v = points[0].clone_().subtract(points[1]);
  return new EnhancedDOMPoint().crossVectors(u, v);
}

export function calculateFaceNormal(points: EnhancedDOMPoint[]): EnhancedDOMPoint {
  return unormalizedNormal(points).normalize_();
}

export function calculateVertexNormals(points: EnhancedDOMPoint[], indices: number[] | Uint16Array): EnhancedDOMPoint[] {
  const vertexNormals = points.map(_ => new EnhancedDOMPoint());
  for (let i = 0; i < indices.length; i+= 3) {
    const faceNormal = unormalizedNormal([points[indices[i]], points[indices[i + 1]], points[indices[i + 2]]]);
    vertexNormals[indices[i]].add_(faceNormal);
    vertexNormals[indices[i + 1]].add_(faceNormal);
    vertexNormals[indices[i + 2]].add_(faceNormal);
  }

  return vertexNormals.map(vector => vector.normalize_());
}
