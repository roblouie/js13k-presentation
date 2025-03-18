// Boilerplate code for creating a WebGL program


export class EnhancedDOMPoint extends DOMPoint {
  add_(otherVector) {
    this.addVectors(this, otherVector);
    return this;
  }

  addVectors(v1, v2) {
    this.x = v1.x + v2.x;
    this.y = v1.y + v2.y;
    this.z = v1.z + v2.z;
    return this;
  }

  set(x, y, z) {
    if (x && typeof x === 'object') {
      y = x.y;
      z = x.z;
      x = x.x;
    }
    this.x = x != null ? x : this.x;
    this.y = y != null ? y : this.y;
    this.z = z != null ? z : this.z;
    return this;
  }

  clone_() {
    return new EnhancedDOMPoint(this.x, this.y, this.z, this.w);
  }

  scale_(scaleBy) {
    this.x *= scaleBy;
    this.y *= scaleBy;
    this.z *= scaleBy;
    return this;
  }

  subtract(otherVector) {
    this.subtractVectors(this, otherVector);
    return this;
  }

  subtractVectors(v1, v2) {
    this.x = v1.x - v2.x;
    this.y = v1.y - v2.y;
    this.z = v1.z - v2.z;
    return this;
  }

  crossVectors(v1, v2) {
    const x = v1.y * v2.z - v1.z * v2.y;
    const y = v1.z * v2.x - v1.x * v2.z;
    const z = v1.x * v2.y - v1.y * v2.x;
    this.x = x
    this.y = y
    this.z = z
    return this;
  }

  dot(otherVector) {
    return this.x * otherVector.x + this.y * otherVector.y + this.z * otherVector.z;
  }

  toArray() {
    return [this.x, this.y, this.z];
  }

  get magnitude() {
    return Math.hypot(...this.toArray());
  }

  normalize_() {
    const magnitude = this.magnitude;
    if (magnitude === 0) {
      return new EnhancedDOMPoint();
    }
    this.x /= magnitude;
    this.y /= magnitude;
    this.z /= magnitude;
    return this;
  }

  lerp(otherVector, alpha) {
    this.x += ( otherVector.x - this.x ) * alpha;
    this.y += ( otherVector.y - this.y ) * alpha;
    this.z += ( otherVector.z - this.z ) * alpha;
    return this;
  }

  modifyComponents(callback) {
    this.x = callback(this.x);
    this.y = callback(this.y);
    this.z = callback(this.z);
    return this;
  }

  isEqualTo(otherVector) {
    return this.x === otherVector.x && this.y === otherVector.y && this.z === otherVector.z;
  }
}

export function createProgram(gl, vertexShaderText, fragmentShaderText) {
  const program = gl.createProgram();

  const vertexShader = gl.createShader(gl.VERTEX_SHADER);
  gl.shaderSource(vertexShader, vertexShaderText);
  gl.compileShader(vertexShader);
  gl.attachShader(program, vertexShader);

  const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
  gl.shaderSource(fragmentShader, fragmentShaderText);
  gl.compileShader(fragmentShader);
  gl.attachShader(program, fragmentShader);

  gl.linkProgram(program);


  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.log(gl.getShaderInfoLog(vertexShader));
    console.log(gl.getShaderInfoLog(fragmentShader));
  }

  return program;
}

// Matrix creation helpers
export function createOrtho(bottom, top, left, right, near, far) {
  return new DOMMatrix([
    2 / (right - left), 0, 0, 0,
    0, 2 / (top - bottom), 0, 0,
    0, 0, -2 / (far - near), 0,
    -(right + left) / (right - left), -(top + bottom) / (top - bottom), -(far + near) / (far - near), 1,
  ]);
}

export function createPerspective(fov, aspect, near, far) {
  const f = Math.tan(Math.PI * 0.5 - 0.5 * fov);
  const rangeInv = 1.0 / (near - far);

  return new DOMMatrix([
    f / aspect, 0, 0, 0,
    0, f, 0, 0,
    0, 0, (near + far) * rangeInv, -1,
    0, 0, near * far * rangeInv * 2, 0
  ]);
}

export function createLookAt(position, target, up = { x: 0, y: 1, z: 0}) {
  const zAxis = normalize(subtractVectors(target, position));
  const xAxis = normalize(crossVectors(zAxis, up));
  const yAxis = crossVectors(xAxis, zAxis);

  const invertedZ = new DOMPoint(zAxis.x * -1, zAxis.y * -1, zAxis.z * -1);

  return new DOMMatrix([
    xAxis.x, yAxis.x, invertedZ.x, 0,
    xAxis.y, yAxis.y, invertedZ.y, 0,
    xAxis.z, yAxis.z, invertedZ.z, 0,
    -dotVectors(xAxis, position), -dotVectors(yAxis, position), -dotVectors(invertedZ, position), 1,
  ]);
}

export function createLookAt2(position, target, up = { x: 0, y: 1, z: 0}) {
  const forward = new EnhancedDOMPoint().subtractVectors(target, position).normalize_();
  const right = new EnhancedDOMPoint().crossVectors(forward, up).normalize_();
  const lookAtUp = new EnhancedDOMPoint().crossVectors(right, forward);

  const invertedZ = new EnhancedDOMPoint(forward.x * -1, forward.y * -1, forward.z * -1);

  return new DOMMatrix([
    right.x, lookAtUp.x, invertedZ.x, 0,
    right.y, lookAtUp.y, invertedZ.y, 0,
    right.z, lookAtUp.z, invertedZ.z, 0,
    -right.dot(position), -lookAtUp.dot(position), -invertedZ.dot(position), 1,
  ]);
}

// Vector math helpers
export function subtractVectors(v1, v2) {
  return new DOMPoint(v1.x - v2.x, v1.y - v2.y, v1.z - v2.z);
}

export function crossVectors(v1, v2) {
  const x = v1.y * v2.z - v1.z * v2.y;
  const y = v1.z * v2.x - v1.x * v2.z;
  const z = v1.x * v2.y - v1.y * v2.x;
  return new DOMPoint(x, y, z);
}

export function dotVectors(v1, v2) {
  return v1.x * v2.x + v1.y * v2.y + v1.z * v2.z;
}

export function normalize(v1) {
  const magnitude = getMagnitudeVector(v1);
  if (magnitude === 0) {
    return new DOMPoint();
  }

  return new DOMPoint(v1.x / magnitude, v1.y / magnitude, v1.z / magnitude);
}

export function getMagnitudeVector(v1) {
  return Math.hypot(v1.x, v1.y, v1.z);
}

// Non elegant but very simple way of drawing a multi colored cube at a given size and position
export function createMultiColorCube(width, height, depth, x, y, z) {
  return new Float32Array([
    //    X           Y          Z         R G B
    -width + x,-height + y,-depth + z,   0,1,1,
    -width + x, height + y, depth + z,   0,1,1,
    -width + x, height + y,-depth + z,   0,1,1,
    -width + x, -height + y, depth + z,   0,1,1,
    -width + x, height + y, depth + z,   0,1,1,
    -width + x,-height + y,-depth + z,   0,1,1,

    width + x ,-height + y,-depth + z,   1,0,1,
    width + x , height + y,-depth + z,   1,0,1,
    width + x , height + y, depth + z,   1,0,1,
    width + x , height + y, depth + z,   1,0,1,
    width + x ,-height + y, depth + z,   1,0,1,
    width + x ,-height + y,-depth + z,   1,0,1,

    -width + x,-height + y,-depth + z,   0,1,0,
    width + x,-height + y,-depth + z,   0,1,0,
    width + x,-height + y, depth + z,   0,1,0,
    width + x,-height + y, depth + z,   0,1,0,
    -width + x,-height + y, depth + z,   0,1,0,
    -width + x,-height + y,-depth + z,   0,1,0,

    -width + x, height + y,-depth + z,   1,1,0,
    width + x, height + y, depth + z,   1,1,0,
    width + x, height + y,-depth + z,   1,1,0,
    -width + x, height + y, depth + z,   1,1,0,
    width + x, height + y, depth + z,   1,1,0,
    -width + x, height + y,-depth + z,   1,1,0,

    width + x,-height + y,-depth + z,   0,0,1,
    -width + x,-height + y,-depth + z,   0,0,1,
    width + x, height + y,-depth + z,   0,0,1,
    -width + x, height + y,-depth + z,   0,0,1,
    width + x, height + y,-depth + z,   0,0,1,
    -width + x,-height + y,-depth + z,   0,0,1,

    -width + x,-height + y, depth + z,   1,0,0,
    width + x,-height + y, depth + z,   1,0,0,
    width + x, height + y, depth + z,   1,0,0,
    width + x, height + y, depth + z,   1,0,0,
    -width + x, height + y, depth + z,   1,0,0,
    -width + x,-height + y, depth + z,   1,0,0,
  ]);
}

// Non elegant but very simple way of drawing a multi colored cube at a given size and position
export function createCubeWithNormals(width, height, depth, x, y, z) {
  return new Float32Array([
    //    X           Y          Z         Normal
    -width + x,-height + y,-depth + z,   -1,0,0,
    -width + x, height + y, depth + z,   -1,0,0,
    -width + x, height + y,-depth + z,   -1,0,0,
    -width + x, -height + y, depth + z,   -1,0,0,
    -width + x, height + y, depth + z,   -1,0,0,
    -width + x,-height + y,-depth + z,   -1,0,0,

    width + x ,-height + y,-depth + z,   1,0,0,
    width + x , height + y,-depth + z,   1,0,0,
    width + x , height + y, depth + z,   1,0,0,
    width + x , height + y, depth + z,   1,0,0,
    width + x ,-height + y, depth + z,   1,0,0,
    width + x ,-height + y,-depth + z,   1,0,0,

    -width + x,-height + y,-depth + z,   0,-1,0,
    width + x,-height + y,-depth + z,   0,-1,0,
    width + x,-height + y, depth + z,   0,-1,0,
    width + x,-height + y, depth + z,   0,-1,0,
    -width + x,-height + y, depth + z,   0,-1,0,
    -width + x,-height + y,-depth + z,   0,-1,0,

    -width + x, height + y,-depth + z,   0,1,0,
    width + x, height + y, depth + z,   0,1,0,
    width + x, height + y,-depth + z,   0,1,0,
    -width + x, height + y, depth + z,   0,1,0,
    width + x, height + y, depth + z,   0,1,0,
    -width + x, height + y,-depth + z,   0,1,0,

    width + x,-height + y,-depth + z,   0,0,-1,
    -width + x,-height + y,-depth + z,   0,0,-1,
    width + x, height + y,-depth + z,   0,0,-1,
    -width + x, height + y,-depth + z,   0,0,-1,
    width + x, height + y,-depth + z,   0,0,-1,
    -width + x,-height + y,-depth + z,   0,0,-1,

    -width + x,-height + y, depth + z,   0,0,1,
    width + x,-height + y, depth + z,   0,0,1,
    width + x, height + y, depth + z,   0,0,1,
    width + x, height + y, depth + z,   0,0,1,
    -width + x, height + y, depth + z,   0,0,1,
    -width + x,-height + y, depth + z,   0,0,1,
  ]);
}


const depthVertexShader = `#version 300 es

layout(location=0) in vec4 aPosition;

uniform mat4 lightPovMvp;

void main(){
  gl_Position = lightPovMvp * aPosition;
}
`;

const depthFragmentShader = `#version 300 es
precision mediump float;

out float fragmentdepth;

void main(){
 fragmentdepth = gl_FragCoord.z;
}
`;

const vertexShaderSrc = `#version 300 es

layout(location=0) in vec4 aPosition;
layout(location=1) in vec3 aNormal;

uniform mat4 modelViewProjection;
uniform mat4 lightPovMvp;

out vec3 vNormal;
out vec4 positionFromLightPov;

void main()
{
    vNormal = aNormal;
    gl_Position = modelViewProjection * aPosition;
    positionFromLightPov = lightPovMvp * aPosition;
}`;


const fragmentShaderSrc = `#version 300 es
precision mediump float;

uniform vec3 uLightDirection;

in vec3 vNormal;
in vec4 positionFromLightPov;

uniform mediump sampler2DShadow shadowMap;

out vec3 fragColor;

float ambientLight = 0.2;

vec2 adjacentPixels[4] = vec2[](
  vec2(-1, 0), 
  vec2(1, 0), 
  vec2(0, 1), 
  vec2(0, -1)
);

vec3 color = vec3(1.0, 1.0, 1.0);

float visibility = 1.0;
float shadowSpread = 1100.0;

void main()
{
  vec3 projCoords = positionFromLightPov.xyz / positionFromLightPov.w;
  for (int i = 0; i < 4; i++) {
    vec3 biased = vec3(projCoords.xy + adjacentPixels[i]/shadowSpread, projCoords.z);
    float hitByLight = texture(shadowMap, biased);
    visibility *= max(hitByLight, 0.83);
  }
  
  vec3 normalizedNormal = normalize(vNormal);
  float lightCos = dot(uLightDirection, normalizedNormal);
  float brightness = max(lightCos * visibility, ambientLight);
  fragColor = color * max(brightness * visibility, ambientLight);
}`;


const gl = document.querySelector('canvas').getContext('webgl2');

const program = createProgram(gl, vertexShaderSrc, fragmentShaderSrc);
const depthProgram = createProgram(gl, depthVertexShader, depthFragmentShader);

gl.enable(gl.DEPTH_TEST);
gl.enable(gl.CULL_FACE);

const origin = new DOMPoint(0, 0, 0);

// Setup Light
gl.useProgram(program);
const lightPosition = new DOMPoint(-0.5, 0.4, -2);
const inverseLightDirection = normalize(new DOMPoint(-0.0, 1, -0.5));
const lightDirectionLoc = gl.getUniformLocation(program,'uLightDirection');
gl.uniform3fv(lightDirectionLoc, new Float32Array([inverseLightDirection.x, inverseLightDirection.y, inverseLightDirection.z]));
const lightPovProjection = createOrtho(-1,1,-1,1,0,6);
const lightPovProj2 = createPerspective(Math.PI / 4, 1, 0.1, 4);

const lightPovView = createLookAt(lightPosition, origin);
const lightPovMvp = lightPovProj2.multiply(lightPovView);

const lightPovMvpDepthLocation = gl.getUniformLocation(depthProgram, 'lightPovMvp');
gl.useProgram(depthProgram);
gl.uniformMatrix4fv(lightPovMvpDepthLocation, false, lightPovMvp.toFloat32Array());

const textureSpaceConversion = new DOMMatrix([
  0.5, 0.0, 0.0, 0.0,
  0.0, 0.5, 0.0, 0.0,
  0.0, 0.0, 0.5, 0.0,
  0.5, 0.5, 0.5, 1.0
]);
const textureSpaceMvp = textureSpaceConversion.multiply(lightPovMvp);
const lightPovMvpRenderLocation = gl.getUniformLocation(program, 'lightPovMvp');
gl.useProgram(program);
gl.uniformMatrix4fv(lightPovMvpRenderLocation, false, textureSpaceMvp.toFloat32Array());

// Set Camera MVP Matrix
const cameraPosition = new DOMPoint(-0.6, 0.7, -0.6);
const projection = createPerspective(Math.PI / 3, 16 / 9, 0.1, 10);
const projectionLoc = gl.getUniformLocation(program, 'modelViewProjection');
const view = createLookAt(cameraPosition, origin);
const modelViewProjection = projection.multiply(view);
gl.uniformMatrix4fv(projectionLoc, false, modelViewProjection.toFloat32Array());

// Create cubes and bind their data
const verticesPerCube = 6 * 6;
const numberOfCubes = 6;
const cubes = new Float32Array([
  ...createCubeWithNormals(5, 0.1, 5, 0, 0, 0),
  ...createCubeWithNormals(0.1, 0.4, 0.1, 0, 0.2, 0.2),
  ...createCubeWithNormals(0.4, 0.3, 0.1, 0.3, 0.2, -0.4),
  ...createCubeWithNormals(0.1, 0.2, 0.4, -0.5, 0.2, -0.3),
  ...createCubeWithNormals(0.02, 0.5, 0.02, 0.5, 0.2, 0.5),
  ...createCubeWithNormals(0.1, 0.1, 0.1, 0.4, 0.2, -0.7),

]);

const vertexBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
gl.bufferData(gl.ARRAY_BUFFER, cubes, gl.STATIC_DRAW);

gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 24, 0);
gl.vertexAttribPointer(1, 3, gl.FLOAT, false, 24, 12);
gl.enableVertexAttribArray(0);
gl.enableVertexAttribArray(1);


// Depth Texture
const depthTextureSize = new DOMPoint(1024, 1024);
const depthTexture = gl.createTexture();
gl.bindTexture(gl.TEXTURE_2D, depthTexture);
gl.texStorage2D(gl.TEXTURE_2D, 1, gl.DEPTH_COMPONENT32F, depthTextureSize.x, depthTextureSize.y);
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_COMPARE_MODE, gl.COMPARE_REF_TO_TEXTURE);
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

const depthFramebuffer = gl.createFramebuffer();
gl.bindFramebuffer(gl.FRAMEBUFFER, depthFramebuffer);
gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.TEXTURE_2D, depthTexture, 0);

// Get access to the shadow map uniform so we can set it during draw
const shadowMapLocation = gl.getUniformLocation(program, 'shadowMap');

let previousTime = 0;

const lightRotationAngles = new DOMPoint();
const lightSpinRate = 0.15;
const lightRiseSetRate = 0.05;

const cameraRotationAngles = new DOMPoint();
const cameraSpinRate = 0.1;
let cameraZoom = 1;
const cameraZoomRate = 0.1;

const interval = 1000 / 60;

function draw(time) {
  //const interval = (time - previousTime) / 1000;


  //previousTime = time;

  const delta = time - previousTime;

  if (delta >= interval) {
    previousTime = time - (delta % interval);

    lightRotationAngles.x += lightSpinRate * 0.05;
    lightRotationAngles.y += lightRiseSetRate * 0.05;
    lightRotationAngles.z += lightSpinRate * 0.05;

    inverseLightDirection.x = (Math.cos(lightRotationAngles.x) * 1);
    inverseLightDirection.y = Math.abs(Math.sin(lightRotationAngles.y) * 2);
    inverseLightDirection.z = (Math.sin(lightRotationAngles.z) * 1);

    const normalizedDirection = normalize(inverseLightDirection)

    gl.uniform3fv(lightDirectionLoc, new Float32Array([normalizedDirection.x, normalizedDirection.y, normalizedDirection.z]));

    const lightPovView = createLookAt(lightPosition, origin);
    const lightPovMvp = lightPovProj2.multiply(lightPovView);

    // Render shadow map to depth texture
    gl.useProgram(depthProgram);

    gl.uniformMatrix4fv(lightPovMvpDepthLocation, false, lightPovMvp.toFloat32Array());


    gl.bindFramebuffer(gl.FRAMEBUFFER, depthFramebuffer);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    gl.viewport(0, 0, depthTextureSize.x, depthTextureSize.y);
    gl.cullFace(gl.FRONT);
    gl.drawArrays(gl.TRIANGLES, 0, verticesPerCube * numberOfCubes);


    // MAIN RENDER
    gl.useProgram(program);

    cameraRotationAngles.x -= cameraSpinRate * 0.05;
    cameraRotationAngles.y -= cameraSpinRate * 0.05;
    cameraRotationAngles.z -= cameraSpinRate * 0.05;
    cameraZoom += cameraZoomRate * 0.1;
    const zoomPos = clamp(Math.sin(cameraZoom) * -2, -2, -1.2);
    cameraPosition.x = (Math.cos(cameraRotationAngles.x) * zoomPos);
    cameraPosition.y = Math.abs(Math.cos(cameraRotationAngles.y) * 0.2) + 0.5;
    cameraPosition.z = (Math.sin(cameraRotationAngles.z) * zoomPos);
    const view = createLookAt(cameraPosition, origin);
    const modelViewProjection = projection.multiply(view);
    gl.uniformMatrix4fv(projectionLoc, false, modelViewProjection.toFloat32Array());


    const textureSpaceMvp = textureSpaceConversion.multiply(lightPovMvp);
    gl.uniformMatrix4fv(lightPovMvpRenderLocation, false, textureSpaceMvp.toFloat32Array());

    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    gl.bindTexture(gl.TEXTURE_2D, depthTexture);
    gl.uniform1i(shadowMapLocation, 0);
    gl.cullFace(gl.BACK);
    gl.drawArrays(gl.TRIANGLES, 0, verticesPerCube * numberOfCubes);
  }
  requestAnimationFrame(draw);
}

draw(0);

function clamp(num, min, max) {
  return Math.min(Math.max(num, min), max);
}
