uniform sampler2D b0;
uniform sampler2D b1;
varying vec2 vUv;
varying vec2 vUv1;
uniform float progress;
uniform vec2 pixels;
uniform vec2 uvRate1;
uniform vec2 accel;
uniform float time;

vec2 mirrored(vec2 uv){
    vec2 m = mod(uv, 2.);
    return mix(m, 2. - m, step(1., m));
}

float tri(float p){
    return mix(p,1.0 - p, step(0.5,p))*2.0;
}

void main(){
    vec2 uv = gl_FragCoord.xy / pixels.xy;
    float p = fract(progress);
    float delayValue = p * 7. - uv.y* 2. + uv.x - 2.;

    delayValue = clamp(delayValue, 0., 1.);

    vec2 translateValue= p + delayValue*accel;
    vec2 translateValue1 = vec2(-0.5,1.)* translateValue;
    vec2 translateValue2 = vec2(-0.5,1.)* (translateValue-1. -accel);
    
    vec2 w = sin(sin(time*0.05)*vec2(0.,0.3)+ vUv.yx*vec2(0.,4.))*vec2(0,0.5);
    vec2 xy = w*tri(p)*0.5 + tri(delayValue)*0.5;
    vec2 uv1 = vUv1 + translateValue1 + xy;
    vec2 uv2 = vUv1 + translateValue2 + xy;
    vec4 T1 = texture2D(b0, mirrored(uv1));
    vec4 T2 = texture2D(b1, mirrored(uv2));
    vec4 final = mix(T1, T2, delayValue);
    gl_FragColor = final;
    // gl_FragColor = vec4(delayValue);
}