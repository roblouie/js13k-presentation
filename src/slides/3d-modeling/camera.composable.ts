import {FirstPersonPlayer} from "../../core/first-person-player.ts";
import {Camera} from "../../engine/renderer/camera.ts";
import {gl} from "../../engine/renderer/lil-gl.ts";


const freeLookCamera = new FirstPersonPlayer(new Camera(Math.PI / 6, gl.canvas.width / gl.canvas.height, 1, 400));

export function useCamera() {
  return {
    freeLookCamera
  };
}
