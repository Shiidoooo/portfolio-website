// uAssemble: 0 = loose cloud, 1 = gourd. uBurst pushes particles outward (pointer hover).
export const gourdVertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uAssemble;
  uniform float uBurst;
  uniform float uSize;
  uniform float uPixelRatio;

  attribute vec3 aCloud;
  attribute vec3 aGourd;
  attribute float aRandom;

  varying float vRandom;
  varying float vDepth;

  void main() {
    // Particles arrive at slightly different times so the gourd "grows" together.
    float arrival = smoothstep(aRandom * 0.45, 0.55 + aRandom * 0.45, uAssemble);
    vec3 shape = mix(aCloud, aGourd, arrival);

    shape += normalize(aGourd + 0.0001) * uBurst * (0.4 + aRandom * 1.6);

    float phase = aRandom * 6.28318;
    shape += vec3(sin(uTime * 0.8 + phase * 7.0), cos(uTime * 0.7 + phase * 5.0), sin(uTime * 0.6 + phase * 3.0)) * 0.025;

    vec4 viewPosition = modelViewMatrix * vec4(shape, 1.0);
    gl_Position = projectionMatrix * viewPosition;
    gl_PointSize = uSize * uPixelRatio * (0.35 + aRandom) / -viewPosition.z;

    vRandom = aRandom;
    vDepth = clamp((shape.z + 1.5) / 3.0, 0.0, 1.0);
  }
`;

export const gourdFragmentShader = /* glsl */ `
  uniform vec3 uAccent;
  uniform vec3 uTeal;
  uniform vec3 uPaper;

  varying float vRandom;
  varying float vDepth;

  void main() {
    float distanceToCenter = length(gl_PointCoord - 0.5);
    if (distanceToCenter > 0.5) discard;

    float softEdge = smoothstep(0.5, 0.05, distanceToCenter);
    vec3 color = mix(uTeal, uAccent, vDepth);
    color = mix(color, uPaper, step(0.9, vRandom));
    float alpha = softEdge * (0.3 + vRandom * 0.6);

    gl_FragColor = vec4(color, alpha);
  }
`;
