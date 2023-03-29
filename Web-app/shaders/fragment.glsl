varying vec2 vCoordinates;
varying vec3 vPos;
uniform sampler2D t1;
uniform sampler2D t2;
uniform sampler2D t1d;
uniform sampler2D t2d;
uniform sampler2D mask;
uniform float move;
uniform float pressedStory;
void main(){
    vec4 maskTexture = texture2D(mask, gl_PointCoord);
    vec2 myUv = vec2(((vCoordinates.x-50.)/412.) ,vCoordinates.y/512. );
    vec4 tt1 = texture2D(t1, myUv);
    vec4 tt2 = texture2D(t2, myUv);
    vec4 tt1d = texture2D(t1d, myUv);
    vec4 tt2d = texture2D(t2d, myUv);
    vec4 final = tt1;
    if (pressedStory == 1.) {
        final = mix(tt1,tt1d,smoothstep(0.,1.,fract(move)));
    }
   
    // vec4 final = mix(tt1,tt1d,smoothstep(0.,0.1,fract(move)));
    float alpha =1. - clamp(0.,1.,abs(vPos.z/900.));
        // gl_FragColor = vec4(vCoordinates.x/512. ,vCoordinates.y/512. ,0.,1.);
    // check value of final 
    // if (final.a < 0.5){
    //     gl_FragColor = vec4(0.,0.,0.,0.);
    // }
    // else {gl_FragColor = final;
    // }
    gl_FragColor = final;
    gl_FragColor.a *= maskTexture.r*alpha;
}