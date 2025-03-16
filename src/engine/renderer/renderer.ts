import { gl, lilgl } from "@/engine/renderer/lil-gl.ts";
import { Camera } from "@/engine/renderer/camera.ts";

import { Scene } from '@/engine/renderer/scene';
import { Mesh } from '@/engine/renderer/mesh';
import {
  color,
  emissive,
  modelviewProjection,
  normalMatrix,
  textureRepeat, u_skybox, u_viewDirectionProjectionInverse, viewProjection
} from '@/engine/shaders/shaders';

// IMPORTANT! The index of a given buffer in the buffer array must match it's respective data location in the shader.
// This allows us to use the index while looping through buffers to bind the attributes. So setting a buffer
// happens by placing
export const enum AttributeLocation {
  Positions,
  Normals,
  TextureCoords,
  TextureDepth,
  LocalMatrix,
  NormalMatrix = 8,
}

gl.enable(gl.CULL_FACE);
gl.enable(gl.DEPTH_TEST);
gl.enable(gl.BLEND);
gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
const modelviewProjectionLocation = gl.getUniformLocation(lilgl.program, modelviewProjection)!;
const normalMatrixLocation =  gl.getUniformLocation(lilgl.program, normalMatrix)!;
const colorLocation =  gl.getUniformLocation(lilgl.program, color)!;
const emissiveLocation = gl.getUniformLocation(lilgl.program, emissive)!;
const textureRepeatLocation = gl.getUniformLocation(lilgl.program, textureRepeat)!;
const skyboxLocation = gl.getUniformLocation(lilgl.skyboxProgram, u_skybox)!;
const viewDirectionProjectionInverseLocation = gl.getUniformLocation(lilgl.skyboxProgram, u_viewDirectionProjectionInverse)!;
const viewProjectionLocation = gl.getUniformLocation(lilgl.instancedProgram, viewProjection)!;
const instancedColorLocation = gl.getUniformLocation(lilgl.instancedProgram, color)!;
const instancedEmissiveLocation = gl.getUniformLocation(lilgl.instancedProgram, emissive)!;
const instancedTextureRepeatLocation = gl.getUniformLocation(lilgl.instancedProgram, textureRepeat);

export function render(camera: Camera, scene: Scene, isWireframe = false) {
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  const viewMatrix = camera.worldMatrix.inverse();
  const viewProjectionMatrix = camera.projection.multiply(viewMatrix);



  const renderMesh = (mesh: Mesh) => {
    // @ts-ignore
    const isInstancedMesh = mesh.count !== undefined;
    gl.useProgram(isInstancedMesh ? lilgl.instancedProgram : lilgl.program);
    gl.texParameteri(gl.TEXTURE_2D_ARRAY, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
    const modelViewProjectionMatrix = viewProjectionMatrix.multiply(mesh.worldMatrix);

    gl.uniform4fv(isInstancedMesh ? instancedColorLocation : colorLocation, mesh.material.color);
    gl.uniform4fv(isInstancedMesh ? instancedEmissiveLocation : emissiveLocation, mesh.material.emissive);
    gl.vertexAttrib1f(AttributeLocation.TextureDepth, mesh.material.texture?.id ?? -1.0);
    const textureRepeat = [mesh.material.texture?.textureRepeat.x ?? 1, mesh.material.texture?.textureRepeat.y ?? 1];
    gl.uniform2fv(isInstancedMesh ? instancedTextureRepeatLocation : textureRepeatLocation, textureRepeat);

    gl.bindVertexArray(mesh.geometry.vao!);

    if (isInstancedMesh) {
      gl.uniformMatrix4fv(viewProjectionLocation, false, viewProjectionMatrix.toFloat32Array());
      // @ts-ignore
      gl.drawElementsInstanced(gl.TRIANGLES, mesh.geometry.getIndices()!.length, gl.UNSIGNED_SHORT, 0, mesh.count);
    } else {
      // @ts-ignore
      gl.uniformMatrix4fv(normalMatrixLocation, true, mesh.color ? mesh.cachedMatrixData : mesh.worldMatrix.inverse().toFloat32Array());
      gl.uniformMatrix4fv(modelviewProjectionLocation, false, modelViewProjectionMatrix.toFloat32Array());
      gl.drawElements(isWireframe ? gl.LINES : gl.TRIANGLES, mesh.geometry.getIndices()!.length, gl.UNSIGNED_SHORT, 0);
    }
  }

  // Render solid meshes first
  scene.solidMeshes.forEach(renderMesh);

  // Set the depthFunc to less than or equal so the skybox can be drawn at the absolute farthest depth. Without
  // this the skybox will be at the draw distance and so not drawn. After drawing set this back.
  if (scene.skybox) {
    gl.depthFunc(gl.LEQUAL);
    gl.depthFunc(gl.LESS);
  }

  // Now render transparent items. For transparent items, stop writing to the depth mask. If we don't do this
  // the transparent portion of a transparent mesh will hide other transparent items. After rendering the
  // transparent items, set the depth mask back to writable.
  gl.depthMask(false);
  scene.transparentMeshes.forEach(renderMesh);
  gl.depthMask(true);

  // Unbinding the vertex array being used to make sure the last item drawn isn't still bound on the next draw call.
  // In theory this isn't necessary but avoids bugs.
  // gl.bindVertexArray(null);
}
