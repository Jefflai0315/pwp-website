uniform float progress;
varying vec2 vUv;
varying vec2 vUv1;
varying vec2 uvRate1;

void main() {
    vUv = uv;
    vec2 _uv = uv - 0.5;
    vUv1 = _uv;
    // vUv1 *= uvRate1.xy;
    vUv1 += 0.5;
    vec3 pos = position;
    // step(progress,uv.y)
    // float p = step(progress,0.5*(vUv.x+vUv.y));
    // vUv.y = smoothstep(p,p+0.3,(vUv.x+vUv.y)/2.0);
    // vUv.y = 1. - vUv.y;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    
}