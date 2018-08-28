uniform float iGlobalTime;
varying vec2 vfragCoord;
uniform vec2 iResolution;

float distanceFromSine(vec2 fuv, float frame) {
    float yValOfSineAtTheGivenPoint = sin(fuv.x + frame) * 0.8;
    // return distance from sine
    return abs(fuv.y - yValOfSineAtTheGivenPoint);
}

// // returns random number?
// float rand(float time) {
//  int iterBetween09 = int(fract(time) * 10.0); // between 0-9
//  int a = iterBetween09 * 456464564;
//  float b = float(a / 13213);
//  return fract(cos(b * time / 100.0) * b * 12.23 * pow(time, 8.0));
// }

float rand( float n )
{
    return fract(sin(n)*8785.32354);
}

void main()
{
    // Normalized pixel coordinates (from 0 to 1)
    vec2 test = vfragCoord.xy / iResolution.xy;

    vec2 fuv = test * 2.0 - 1.0;


    // base color
    vec3 col = vec3(0.0,0.0,0.0);

    float dis = distanceFromSine(fuv, iGlobalTime) * 0.5;
    float colorBasedOnDistance = 0.5 - dis;
    //if(fuv.x > 0.0) {
        colorBasedOnDistance += (fuv.x) * 0.1;
    //}

    // flash duration
    float flashDuration = 6.0;
    // noise function based of fuv.x as well as scales down with time
    float noise = max((rand((float(iGlobalTime))) * 0.05) * (fuv.x + 2.0) * ((max(flashDuration - iGlobalTime, 0.2 * flashDuration)) / flashDuration), 0.0); // noise gradually decreases as time goes on
    col = vec3(colorBasedOnDistance + noise,0.0,0.0);

    // Output to screen
    gl_FragColor = vec4(col,1.0);
    //gl_FragColor = vec4(abs(fuv.x),0.0,0.0,1.0);

}