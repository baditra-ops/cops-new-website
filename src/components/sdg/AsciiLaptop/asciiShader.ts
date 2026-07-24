import * as THREE from 'three';

export const asciiShader = {
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform sampler2D tDiffuse;
    uniform sampler2D tAtlas;
    uniform vec2 uResolution;
    uniform float uTime;
    uniform vec2 uMouse;

    varying vec2 vUv;

    void main() {
      float cols = 120.0;
      float aspect = uResolution.x / uResolution.y;
      vec2 grid = vec2(cols, cols / aspect);
      
      vec2 cellUv = floor(vUv * grid) / grid;
      vec2 innerUv = fract(vUv * grid);
      vec2 centerUv = cellUv + 0.5 / grid;
      
      vec4 color = texture2D(tDiffuse, centerUv);
      float lum = dot(color.rgb, vec3(0.299, 0.587, 0.114));

      vec2 aspectUv = vUv * vec2(aspect, 1.0);
      vec2 aspectMouse = uMouse * vec2(aspect, 1.0);
      float distToMouse = distance(aspectUv, aspectMouse);
      
      // Wipe effect: exponential falloff from mouse
      float wipe = exp(-distToMouse * 5.0) * 1.5; 
      float adjustedLum = max(0.0, lum - wipe);

      // Boot-in animation staggered by cell position
      float cellRandom = fract(sin(dot(cellUv, vec2(12.9898, 78.233))) * 43758.5453);
      float bootDelay = cellRandom * 0.8;
      float bootProgress = clamp((uTime - bootDelay) / 0.5, 0.0, 1.0);
      
      adjustedLum *= bootProgress;

      float atlasIndex = floor(adjustedLum * 9.99);
      atlasIndex = clamp(atlasIndex, 0.0, 9.0);

      // WebGL reads bottom-to-top, flip innerUv.y for canvas texture
      vec2 atlasUv = vec2((innerUv.x + atlasIndex) / 10.0, 1.0 - innerUv.y);
      vec4 charColor = texture2D(tAtlas, atlasUv);

      vec3 phosphorColor = vec3(0.2, 1.0, 0.4); // #33ff66
      vec3 finalColor = phosphorColor * charColor.r;
      
      // Use FBO alpha channel to determine if we are rendering the laptop or background
      float isLaptop = color.a > 0.1 ? 1.0 : 0.0;
      
      // Add subtle glow
      float glow = charColor.r * 0.5 * lum;

      // Ensure empty space is completely transparent to show background
      float alpha = charColor.r * isLaptop * bootProgress;

      gl_FragColor = vec4(finalColor + glow, alpha);
    }
  `
};
