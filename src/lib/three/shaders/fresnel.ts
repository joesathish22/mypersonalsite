import * as THREE from "three";

const vertexShader = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vViewDir;

  void main() {
    vec4 worldPosition = modelMatrix * vec4(position, 1.0);
    vNormal = normalize(normalMatrix * normal);
    vViewDir = normalize(cameraPosition - worldPosition.xyz);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  uniform vec3 uColor;
  uniform float uOpacity;
  uniform float uPower;
  varying vec3 vNormal;
  varying vec3 vViewDir;

  void main() {
    float fresnel = 1.0 - clamp(dot(normalize(vNormal), normalize(vViewDir)), 0.0, 1.0);
    float rim = pow(fresnel, uPower);
    gl_FragColor = vec4(uColor, rim * uOpacity);
  }
`;

/**
 * A minimal rim-light ("fresnel") material — glows at the silhouette edge,
 * transparent at the center. Used for the Protect-stage shield shell: an
 * engineered, restrained glow rather than a flat glassy sphere.
 */
export function createFresnelMaterial(color: string, opacity = 0.6, power = 2.2) {
  return new THREE.ShaderMaterial({
    uniforms: {
      uColor: { value: new THREE.Color(color) },
      uOpacity: { value: opacity },
      uPower: { value: power },
    },
    vertexShader,
    fragmentShader,
    transparent: true,
    depthWrite: false,
    side: THREE.FrontSide,
    blending: THREE.AdditiveBlending,
  });
}
