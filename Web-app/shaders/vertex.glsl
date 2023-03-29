varying vec2 vUv;
varying vec3 vPos;
varying vec2 vCoordinates;
attribute vec3 aCoordinates;
attribute float aSpeed;
attribute float aOffset;
attribute float aDirection;
attribute float aPress;

uniform float move;
uniform float time;
uniform vec2 mouse;
uniform float transition;



void main() {
    vUv = uv;
    vec3 pos = position;

//not stable
    pos.x += sin(move*aSpeed*aDirection)*10. ;
    pos.y += sin(move*aDirection)*10. * cos(move*aSpeed) ;
    pos.z = mod(position.z + move *200.* aSpeed + aOffset, 2000.) - 1000.;

    vec3 stable = position;
    float dist = distance(stable.xy, mouse);
    float area = 1. - smoothstep(0.,300.,dist);

    stable.x += 50. * cos(0.1* time * aPress)*aDirection*area;
    stable.y += 50. * sin(0.1*time*aPress)*aDirection*area;
    stable.z += 200. * cos(0.1*time*aPress)*aDirection*area;
    
    pos = mix(pos,stable, 1.-transition); // transition must be changing when scroll= 1 : normal
   
   
    vec4 mvPosition = modelViewMatrix * vec4( pos, 1. );
    gl_PointSize = 8000. * (1. / - mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;

    vCoordinates = aCoordinates.xy;
    vPos = pos;
}