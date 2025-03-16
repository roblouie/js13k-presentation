<script setup lang="ts">
import {useCamera} from "./camera.composable.ts";
import {computed, onMounted, onUnmounted, ref, watch} from "vue";
import {MoldableCubeGeometry} from "../../engine/moldable-cube-geometry.ts";
import {Scene} from "../../engine/renderer/scene.ts";
import {Controls} from "@/core/controls.ts";
import {render} from "@/engine/renderer/renderer.ts";
import {Object3d} from "@/engine/renderer/object-3d.ts";
import {Mesh} from "@/engine/renderer/mesh.ts";
import {materials} from "@/textures.ts";
import {gl} from "@/engine/renderer/lil-gl.ts";
import {EnhancedDOMPoint} from "@/engine/enhanced-dom-point.ts";
import {FirstPersonPlayer} from "@/core/first-person-player.ts";
import {Camera} from "@/engine/renderer/camera.ts";

const cameraCanvas = ref<HTMLCanvasElement>(null);

const scene = new Scene();

let object3d;

let animationFrameId = -1;

gl.canvas.width = 1024;
gl.canvas.height = 1024;
gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

onMounted(async () => {
  const camera = new FirstPersonPlayer(
    new Camera(Math.PI / 6, gl.canvas.width / gl.canvas.height, 1, 400),
    new Controls(cameraCanvas.value!)
  );

  camera.feetCenter = new EnhancedDOMPoint(30.5, 4.8, 23.3);
  camera.cameraRotation.y = 0.9311853071796024;
  camera.cameraRotation.x = -0.23120367320510415;

  document.addEventListener('keydown', key => {
    if (key.code === 'Enter') {
      console.log(camera.cameraRotation);
      console.log(camera.feetCenter);
    }
  })


  const item = new Mesh(new MoldableCubeGeometry(10, 10, 10, 4, 1, 1, 6)
    .spreadTextureCoords()
    .done_(), materials.silver);

  object3d = new Object3d(item);

  cameraCanvas.value.addEventListener('click', () => {
    cameraCanvas.value.requestPointerLock();
  });

  scene.add_(object3d);

  camera.camera.lookAt(object3d);

  const cameraContext = cameraCanvas.value.getContext('2d')!;




  renderViews();

  function renderViews() {
    camera.controls.queryController();
    scene.updateWorldMatrix();
    camera.update([]);


    render(camera.camera, scene, true);
    cameraContext.clearRect(0, 0, cameraCanvas.value.width, cameraCanvas.value.height);
    cameraContext.drawImage(gl.canvas, 0, 0);

    requestAnimationFrame(renderViews);
  }
});

onUnmounted(() => cancelAnimationFrame(animationFrameId));
</script>

<template>
  <div class="is-flex is-align-items-center" style="height: 100vh; padding: 3em;">
    <canvas
      tabindex="0"
      width="1024"
      height="1024"
      ref="cameraCanvas"
      @mousemove="onCameraMouseMove"
      oncontextmenu="return false;"
    ></canvas>
  </div>
</template>
<style scoped>
canvas {
  border: 1px solid gray;
  height: 25em;
  outline: none;
}
</style>