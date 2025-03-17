<script setup lang="ts">
import BaseSlideTemplate from "../../BaseSlideTemplate.vue";
import {highlight, languages} from "prismjs";
import {PrismEditor} from "vue-prism-editor";

const code = `export class EnhancedDOMPoint extends DOMPoint {
  add(otherVector: VectorLike) {
    this.addVectors(this, otherVector);
    return this;
  }

  addVectors(v1: VectorLike, v2: VectorLike) {
    this.x = v1.x + v2.x;
    this.y = v1.y + v2.y;
    this.z = v1.z + v2.z;
    return this;
  }

  set(x?: number | VectorLike, y?: number, z?: number): EnhancedDOMPoint {
    if (x && typeof x === 'object') {
      y = x.y;
      z = x.z;
      x = x.x;
    }
    this.x = x ?? this.x;
    this.y = y ?? this.y;
    this.z = z ?? this.z;
    return this;
  }

  clone() {
    return new EnhancedDOMPoint(this.x, this.y, this.z, this.w);
  }

  scale(scaleBy: number) {
    this.x *= scaleBy;
    this.y *= scaleBy;
    this.z *= scaleBy;
    return this;
  }

  subtract(otherVector: VectorLike) {
   this.subtractVectors(this, otherVector);
    return this;
  }

  subtractVectors(v1: VectorLike, v2: VectorLike) {
    this.x = v1.x - v2.x;
    this.y = v1.y - v2.y;
    this.z = v1.z - v2.z;
    return this;
  }

  crossVectors(v1: EnhancedDOMPoint, v2: EnhancedDOMPoint) {
    const x = v1.y * v2.z - v1.z * v2.y;
    const y = v1.z * v2.x - v1.x * v2.z;
    const z = v1.x * v2.y - v1.y * v2.x;
    this.x = x
    this.y = y
    this.z = z
    return this;
  }

  dot(otherVector: VectorLike): number {
    return this.x * otherVector.x + this.y * otherVector.y + this.z * otherVector.z;
  }

  toArray(): [x: number, y: number, z: number] {
    return [this.x, this.y, this.z];
  }

  get magnitude() {
    return Math.hypot(...this.toArray());
  }

  normalize() {
    const magnitude = this.magnitude;
    if (magnitude === 0) {
      return this.set(0, 0, 0);
    }
    this.x /= magnitude;
    this.y /= magnitude;
    this.z /= magnitude;
    return this;
  }

  lerp(otherVector: VectorLike, alpha: number) {
    this.x += ( otherVector.x - this.x ) * alpha;
    this.y += ( otherVector.y - this.y ) * alpha;
    this.z += ( otherVector.z - this.z ) * alpha;
    return this;
  }

  isEqualTo(otherVector: VectorLike): boolean {
    return this.x === otherVector.x && this.y === otherVector.y && this.z === otherVector.z;
  }
}`;
</script>

<template>
  <BaseSlideTemplate>

    <template v-slot:header>
      DOMPoint
    </template>

    <template v-slot:default>

      <PrismEditor class="my-editor" v-model="code" :highlight="code => highlight(code, languages.ts, 'ts')" />

    </template>
  </BaseSlideTemplate>
</template>

<style scoped>
.my-editor {
  font-size: 0.8em;
  height: 30em;
}
</style>