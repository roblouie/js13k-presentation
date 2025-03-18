(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))i(o);new MutationObserver(o=>{for(const t of o)if(t.type==="childList")for(const s of t.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&i(s)}).observe(document,{childList:!0,subtree:!0});function e(o){const t={};return o.integrity&&(t.integrity=o.integrity),o.referrerPolicy&&(t.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?t.credentials="include":o.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function i(o){if(o.ep)return;o.ep=!0;const t=e(o);fetch(o.href,t)}})();function h(r,a,e){const i=r.createProgram(),o=r.createShader(r.VERTEX_SHADER);r.shaderSource(o,a),r.compileShader(o),r.attachShader(i,o);const t=r.createShader(r.FRAGMENT_SHADER);return r.shaderSource(t,e),r.compileShader(t),r.attachShader(i,t),r.linkProgram(i),r.getProgramParameter(i,r.LINK_STATUS)||(console.log(r.getShaderInfoLog(o)),console.log(r.getShaderInfoLog(t))),i}function N(r,a,e,i,o,t){return new Float32Array([-r+i,-a+o,-e+t,-1,0,0,-r+i,a+o,e+t,-1,0,0,-r+i,a+o,-e+t,-1,0,0,-r+i,-a+o,e+t,-1,0,0,-r+i,a+o,e+t,-1,0,0,-r+i,-a+o,-e+t,-1,0,0,r+i,-a+o,-e+t,1,0,0,r+i,a+o,-e+t,1,0,0,r+i,a+o,e+t,1,0,0,r+i,a+o,e+t,1,0,0,r+i,-a+o,e+t,1,0,0,r+i,-a+o,-e+t,1,0,0,-r+i,-a+o,-e+t,0,-1,0,r+i,-a+o,-e+t,0,-1,0,r+i,-a+o,e+t,0,-1,0,r+i,-a+o,e+t,0,-1,0,-r+i,-a+o,e+t,0,-1,0,-r+i,-a+o,-e+t,0,-1,0,-r+i,a+o,-e+t,0,1,0,r+i,a+o,e+t,0,1,0,r+i,a+o,-e+t,0,1,0,-r+i,a+o,e+t,0,1,0,r+i,a+o,e+t,0,1,0,-r+i,a+o,-e+t,0,1,0,r+i,-a+o,-e+t,0,0,-1,-r+i,-a+o,-e+t,0,0,-1,r+i,a+o,-e+t,0,0,-1,-r+i,a+o,-e+t,0,0,-1,r+i,a+o,-e+t,0,0,-1,-r+i,-a+o,-e+t,0,0,-1,-r+i,-a+o,e+t,0,0,1,r+i,-a+o,e+t,0,0,1,r+i,a+o,e+t,0,0,1,r+i,a+o,e+t,0,0,1,-r+i,a+o,e+t,0,0,1,-r+i,-a+o,e+t,0,0,1])}class or{constructor(a,e){this.size=a,this.depthTexture=e.createTexture(),e.bindTexture(e.TEXTURE_2D,this.depthTexture),e.texStorage2D(e.TEXTURE_2D,1,e.DEPTH_COMPONENT32F,a,a),this.cubeMapTexture=e.createTexture(),e.bindTexture(e.TEXTURE_CUBE_MAP,this.cubeMapTexture),e.texParameteri(e.TEXTURE_CUBE_MAP,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_CUBE_MAP,e.TEXTURE_MAG_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_CUBE_MAP,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_CUBE_MAP,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_CUBE_MAP,e.TEXTURE_WRAP_R,e.CLAMP_TO_EDGE);for(let i=0;i<6;i++)e.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+i,0,e.RGBA32F,a,a,0,e.RGBA,e.FLOAT,null);this.depthFramebuffer=e.createFramebuffer(),e.bindFramebuffer(e.FRAMEBUFFER,this.depthFramebuffer),e.framebufferTexture2D(e.FRAMEBUFFER,e.DEPTH_ATTACHMENT,e.TEXTURE_2D,this.depthTexture,0),e.readBuffer(e.NONE)}bindForWriting(a,e){e.bindFramebuffer(e.FRAMEBUFFER,this.depthFramebuffer),e.viewport(0,0,this.size,this.size),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,a.face,this.cubeMapTexture,0)}getSides(a){return[{face:a.TEXTURE_CUBE_MAP_POSITIVE_X,target:[1,0,0],up:[0,-1,0]},{face:a.TEXTURE_CUBE_MAP_NEGATIVE_X,target:[-1,0,0],up:[0,-1,0]},{face:a.TEXTURE_CUBE_MAP_POSITIVE_Y,target:[0,1,0],up:[0,0,1]},{face:a.TEXTURE_CUBE_MAP_NEGATIVE_Y,target:[0,-1,0],up:[0,0,-1]},{face:a.TEXTURE_CUBE_MAP_POSITIVE_Z,target:[0,0,1],up:[0,-1,0]},{face:a.TEXTURE_CUBE_MAP_NEGATIVE_Z,target:[0,0,-1],up:[0,-1,0]}]}}var q=1e-6,g=typeof Float32Array<"u"?Float32Array:Array;Math.hypot||(Math.hypot=function(){for(var r=0,a=arguments.length;a--;)r+=arguments[a]*arguments[a];return Math.sqrt(r)});function p(){var r=new g(16);return g!=Float32Array&&(r[1]=0,r[2]=0,r[3]=0,r[4]=0,r[6]=0,r[7]=0,r[8]=0,r[9]=0,r[11]=0,r[12]=0,r[13]=0,r[14]=0),r[0]=1,r[5]=1,r[10]=1,r[15]=1,r}function nr(r){return r[0]=1,r[1]=0,r[2]=0,r[3]=0,r[4]=0,r[5]=1,r[6]=0,r[7]=0,r[8]=0,r[9]=0,r[10]=1,r[11]=0,r[12]=0,r[13]=0,r[14]=0,r[15]=1,r}function Z(r,a,e){var i=a[0],o=a[1],t=a[2],s=a[3],f=a[4],u=a[5],A=a[6],P=a[7],v=a[8],_=a[9],c=a[10],d=a[11],R=a[12],F=a[13],U=a[14],S=a[15],l=e[0],E=e[1],m=e[2],T=e[3];return r[0]=l*i+E*f+m*v+T*R,r[1]=l*o+E*u+m*_+T*F,r[2]=l*t+E*A+m*c+T*U,r[3]=l*s+E*P+m*d+T*S,l=e[4],E=e[5],m=e[6],T=e[7],r[4]=l*i+E*f+m*v+T*R,r[5]=l*o+E*u+m*_+T*F,r[6]=l*t+E*A+m*c+T*U,r[7]=l*s+E*P+m*d+T*S,l=e[8],E=e[9],m=e[10],T=e[11],r[8]=l*i+E*f+m*v+T*R,r[9]=l*o+E*u+m*_+T*F,r[10]=l*t+E*A+m*c+T*U,r[11]=l*s+E*P+m*d+T*S,l=e[12],E=e[13],m=e[14],T=e[15],r[12]=l*i+E*f+m*v+T*R,r[13]=l*o+E*u+m*_+T*F,r[14]=l*t+E*A+m*c+T*U,r[15]=l*s+E*P+m*d+T*S,r}function G(r,a){return r[0]=1,r[1]=0,r[2]=0,r[3]=0,r[4]=0,r[5]=1,r[6]=0,r[7]=0,r[8]=0,r[9]=0,r[10]=1,r[11]=0,r[12]=a[0],r[13]=a[1],r[14]=a[2],r[15]=1,r}function tr(r,a,e,i,o){var t=1/Math.tan(a/2),s;return r[0]=t/e,r[1]=0,r[2]=0,r[3]=0,r[4]=0,r[5]=t,r[6]=0,r[7]=0,r[8]=0,r[9]=0,r[11]=-1,r[12]=0,r[13]=0,r[15]=0,o!=null&&o!==1/0?(s=1/(i-o),r[10]=(o+i)*s,r[14]=2*o*i*s):(r[10]=-1,r[14]=-2*i),r}var z=tr;function rr(r,a,e,i){var o,t,s,f,u,A,P,v,_,c,d=a[0],R=a[1],F=a[2],U=i[0],S=i[1],l=i[2],E=e[0],m=e[1],T=e[2];return Math.abs(d-E)<q&&Math.abs(R-m)<q&&Math.abs(F-T)<q?nr(r):(P=d-E,v=R-m,_=F-T,c=1/Math.hypot(P,v,_),P*=c,v*=c,_*=c,o=S*_-l*v,t=l*P-U*_,s=U*v-S*P,c=Math.hypot(o,t,s),c?(c=1/c,o*=c,t*=c,s*=c):(o=0,t=0,s=0),f=v*s-_*t,u=_*o-P*s,A=P*t-v*o,c=Math.hypot(f,u,A),c?(c=1/c,f*=c,u*=c,A*=c):(f=0,u=0,A=0),r[0]=o,r[1]=f,r[2]=P,r[3]=0,r[4]=t,r[5]=u,r[6]=v,r[7]=0,r[8]=s,r[9]=A,r[10]=_,r[11]=0,r[12]=-(o*d+t*R+s*F),r[13]=-(f*d+u*R+A*F),r[14]=-(P*d+v*R+_*F),r[15]=1,r)}function ir(){var r=new g(3);return g!=Float32Array&&(r[0]=0,r[1]=0,r[2]=0),r}function sr(r,a,e){return r[0]=a[0]+e[0],r[1]=a[1]+e[1],r[2]=a[2]+e[2],r}(function(){var r=ir();return function(a,e,i,o,t,s){var f,u;for(e||(e=3),i||(i=0),o?u=Math.min(o*e+i,a.length):u=a.length,f=i;f<u;f+=e)r[0]=a[f],r[1]=a[f+1],r[2]=a[f+2],t(r,r,s),a[f]=r[0],a[f+1]=r[1],a[f+2]=r[2];return a}})();const cr=`#version 300 es

layout(location=0) in vec3 Position;

uniform mat4 gWVP;
uniform mat4 gWorld;

out vec3 fragPos;

void main(){
  vec4 Pos4 = vec4(Position, 1.0);
  gl_Position = gWVP * Pos4;
  fragPos = vec3(gWorld * vec4(Position, 1.0));
}
`,fr=`#version 300 es
precision mediump float;

in vec3 fragPos;

uniform vec3 gLightWorldPos;

out float LightToPixelDistance;

void main(){
  vec3 LightToVertex = fragPos - gLightWorldPos;

  LightToPixelDistance = length(LightToVertex) / 40.0;
}
`,lr=`#version 300 es

layout(location=0) in vec3 Position;
layout(location=1) in vec3 aNormal;

uniform mat4 gWVP;
uniform mat4 gWorld;

out vec3 vNormal;
out vec3 WorldPos0;

void main()
{
    vNormal = aNormal;
    vec4 Pos4 = vec4(Position, 1.0);
    gl_Position = gWVP * Pos4;
    WorldPos0 = (gWorld * Pos4).xyz;
}`,Er=`#version 300 es
precision mediump float;

in vec3 vNormal;
in vec3 WorldPos0;

uniform vec3 gLightWorldPos;

uniform mediump samplerCube shadowCubeMap;

out vec3 FragColor;

float ambientLight = 0.5;

vec3 color = vec3(0.0, 0.0, 1.0);

float radius(float distance, float radius)
{
    return (2.0 / (radius * radius)) * (1.0 - distance / sqrt(distance * distance + radius * radius));
}

float quadraticLinearConstant(float distance, float a, float b, float c)
{
    return 1.0 / (
        distance * distance * a +
        distance * b +
        c
    );
}

void main()
{
    vec3 LightWorldDir = WorldPos0 - gLightWorldPos;
    vec3 offset = gLightWorldPos - WorldPos0;
    float distance = length(LightWorldDir);
    vec3 direction = normalize(LightWorldDir);
    vec3 direction2 = normalize(offset);
    float distance2 = length(offset);
    
    float SampledDistance = texture(shadowCubeMap, direction).r * 40.0;

    float bias = 0.015;
    float ShadowFactor = 0.0;

    if (SampledDistance + bias < distance)
        ShadowFactor = 0.25;
    else
        ShadowFactor = 1.0;
        
    float diffuse = max(0.0, dot(direction2, normalize(vNormal)));
    float attenuation = quadraticLinearConstant(distance, 0.008, 0.01, 0.4);
    float brightness = diffuse * attenuation;

    FragColor = color * clamp(brightness * ShadowFactor, 0.0, 1.0);
}
`,n=document.querySelector("canvas").getContext("webgl2");n.enable(n.DEPTH_TEST);n.cullFace(n.BACK);n.getExtension("EXT_color_buffer_float");n.getExtension("OES_texture_float_linear");const W=h(n,lr,Er),C=h(n,cr,fr);n.useProgram(C);const y=n.getUniformLocation(C,"gWVP"),mr=n.getUniformLocation(C,"gLightWorldPos"),H=n.getUniformLocation(C,"gWorld");n.useProgram(W);const I=n.getUniformLocation(W,"gWVP"),Tr=n.getUniformLocation(W,"gLightWorldPos"),D=n.getUniformLocation(W,"gWorld"),ur=n.getUniformLocation(W,"shadowMap"),L=[0,3,0],Y=z(p(),Math.PI/2,1,.1,60);function er(r){L[0]=r[0],L[1]=r[1],L[2]=r[2],n.useProgram(W),n.uniform3fv(Tr,L),n.useProgram(C),n.uniform3fv(mr,L)}er([4,4,-.5]);const B=rr(p(),[15,8,-12],[0,0,0],[0,1,0]),x=z(p(),Math.PI/3,16/9,.1,60),Pr=Z(p(),x,B),M=6*6,vr=new Float32Array([...N(.5,1,.5,0,0,0),...N(20,1,20,0,0,0),...N(1.5,1,1.5,0,0,0),...N(.1,.1,.1,0,0,0)]),_r=n.createBuffer();n.bindBuffer(n.ARRAY_BUFFER,_r);n.bufferData(n.ARRAY_BUFFER,vr,n.STATIC_DRAW);n.vertexAttribPointer(0,3,n.FLOAT,!1,24,0);n.vertexAttribPointer(1,3,n.FLOAT,!1,24,12);n.enableVertexAttribArray(0);n.enableVertexAttribArray(1);const Ar=[4,3,5],O=G([],Ar),X=G([],[-2,3,-4]);let K=G([],L);const V=p(),j=new or(1024,n);let $=0,J=0,Q=0;n.bindTexture(n.TEXTURE_CUBE_MAP,j.cubeMapTexture);let k=0;const w=1e3/60;function ar(r){const a=r-k;if(a>=w){k=r-a%w,$+=.005,J+=.0025,Q+=.005,er([Math.sin($)*4,Math.sin(J)*3+8,Math.cos(Q)*4]),n.useProgram(C),j.getSides(n).forEach((s,f)=>{j.bindForWriting(s,n),n.clearColor(1,1,1,1),n.clear(n.COLOR_BUFFER_BIT|n.DEPTH_BUFFER_BIT);const u=rr(p(),L,sr([],L,s.target),s.up);n.uniformMatrix4fv(H,!1,O);const A=b(Y,u,O);n.uniformMatrix4fv(y,!1,A),n.drawArrays(n.TRIANGLES,0,M),n.uniformMatrix4fv(H,!1,X);const P=b(Y,u,X);n.uniformMatrix4fv(y,!1,P),n.drawArrays(n.TRIANGLES,M*2,M),n.uniformMatrix4fv(H,!1,V);const v=b(Y,u,V);n.uniformMatrix4fv(y,!1,v),n.drawArrays(n.TRIANGLES,M,M)}),K=G([],L),n.useProgram(W),n.uniformMatrix4fv(I,!1,Pr),n.bindFramebuffer(n.FRAMEBUFFER,null),n.viewport(0,0,n.canvas.width,n.canvas.height),n.clearColor(0,0,0,1),n.clear(n.COLOR_BUFFER_BIT|n.DEPTH_BUFFER_BIT),n.uniform1i(ur,0),n.uniformMatrix4fv(D,!1,O);const e=b(x,B,O);n.uniformMatrix4fv(I,!1,e),n.drawArrays(n.TRIANGLES,0,M),n.uniformMatrix4fv(D,!1,X);const i=b(x,B,X);n.uniformMatrix4fv(I,!1,i),n.drawArrays(n.TRIANGLES,M*2,M),n.uniformMatrix4fv(D,!1,V);const o=b(x,B,V);n.uniformMatrix4fv(I,!1,o),n.drawArrays(n.TRIANGLES,M,M),n.uniformMatrix4fv(D,!1,K);const t=b(x,B,K);n.uniformMatrix4fv(I,!1,t),n.drawArrays(n.TRIANGLES,M*3,M)}requestAnimationFrame(ar)}ar();function b(r,a,e){const i=p(),o=Z(p(),a,e);return Z(i,r,o),i}
