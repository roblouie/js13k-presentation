<script setup lang="ts">
import {useCamera} from "./camera.composable.ts";
import {computed, onMounted, onUnmounted, ref, watch} from "vue";
import {MoldableCube} from "../../engine/moldable-cube.ts";
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
import {highlight, languages} from "prismjs";
import {PrismEditor} from "vue-prism-editor";
import {PlaneGeometry} from "@/engine/plane-geometry.ts";
import {newNoiseLandscape} from "@/engine/texture-creation/new-new-noise.ts";
import {NoiseType} from "@/engine/svg-maker/base.ts";
import {toHeightmap} from "@/engine/svg-maker/converters.ts";
import {useDebounce} from "@/utils.ts";

const cameraCanvas = ref<HTMLCanvasElement>(null);
const isWireframe = ref(false);

let scene = new Scene();

let cube;
let item;

let animationFrameId = -1;

gl.canvas.width = 1024;
gl.canvas.height = 1024;
gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

const code = ref(`<svg width="256" height="256">

</svg>`);

const [debounce] = useDebounce();

watch(code, () => {
  debounce(async () => {
    try {
      cancelAnimationFrame(animationFrameId);
      const headerAdded = code.value.replace('<svg width="256" height="256">', '<svg width="256" height="256" xmlns="http://www.w3.org/2000/svg">')
      const heightMap = await toHeightmap(headerAdded, 100);
      cube = new PlaneGeometry(1024, 1024, 255, 255, heightMap).done_();
      scene = new Scene();
      item = new Mesh(cube, materials.solidGray);
      scene.add_(item);
      renderViews();
    } catch (e) {
      debugger;
    }
  }, 300);
});

let camera;



let cameraContext;

onMounted(async () => {

  camera = new FirstPersonPlayer(
    new Camera(Math.PI / 6, gl.canvas.width / gl.canvas.height, 1, 3000),
    new Controls(cameraCanvas.value!)
  );

  camera.speed = 0.8;

  camera.feetCenter = new EnhancedDOMPoint(-766, 461, 798);
  camera.cameraRotation.y = -0.78;
  camera.cameraRotation.x = -0.43;


  document.addEventListener('keydown', key => {
    if (key.code === 'Enter') {
      console.log(camera.cameraRotation);
      console.log(camera.feetCenter);
    }
  });

  const heightMap = await toHeightmap(`<svg width="256" height="256" xmlns="http://www.w3.org/2000/svg">


</svg>`, 100);
  cube = new PlaneGeometry(1024, 1024, 255, 255, heightMap).done_();

  // cube = runCodeComputed.value(MoldableCube);

  item = new Mesh(cube, materials.solidGray);

  cameraCanvas.value.addEventListener('click', () => {
    cameraCanvas.value.requestPointerLock();
  });

  scene.add_(item);

  cameraContext = cameraCanvas.value.getContext('2d')!;


  renderViews();
});

function renderViews() {
  camera.controls.queryController();
  scene.updateWorldMatrix();
  camera.update([]);

  render(camera.camera, scene, isWireframe.value);
  cameraContext.clearRect(0, 0, cameraCanvas.value.width, cameraCanvas.value.height);
  cameraContext.drawImage(gl.canvas, 0, 0);

  animationFrameId = requestAnimationFrame(renderViews);
}


onUnmounted(() => cancelAnimationFrame(animationFrameId));
</script>

<template>

  <div class="is-flex is-align-items-center" style="height: 100vh; padding: 3em 2em 3em 2em">
    <div>
    <label class="checkbox">
      <input type="checkbox" v-model="isWireframe" />
      Wireframe
    </label>
    <canvas
      tabindex="0"
      width="1024"
      height="1024"
      ref="cameraCanvas"
      @mousemove="onCameraMouseMove"
      oncontextmenu="return false;"
    ></canvas>
    </div>
    <PrismEditor class="my-editor" v-model="code" :highlight="code => highlight(code, languages.xml, 'xml')" />
  </div>
</template>
<style scoped>
canvas {
  border: 1px solid gray;
  height: 25em;
  outline: none;
}

.my-editor {
  height: 25em;
  margin-left: 2em;
  margin-top: 1em;
  font-size: 0.8em;
}
</style>