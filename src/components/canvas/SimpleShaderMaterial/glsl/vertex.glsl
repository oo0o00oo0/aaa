precision mediump float;

attribute float uIndex;

uniform sampler2D uVertTexture_0;
uniform sampler2D uVertTexture_1;

uniform float uBlend;

varying vec2 vUv;
varying vec3 vPos;
varying vec3 vNormal;

varying vec2 vUv_1;
varying vec2 vUv_2;

void main() {

  vec3 pos_1 = texture2D(uVertTexture_0, vec2(uIndex, 0.2)).rgb;
  vec3 pos_2 = texture2D(uVertTexture_1, vec2(uIndex, 0.2)).rgb;
  vec3 morph_pos = mix(pos_1, pos_2, uBlend);

  vec2 uv_1 = texture2D(uVertTexture_0, vec2(uIndex, 0.5)).rg;
  vec2 uv_2 = texture2D(uVertTexture_1, vec2(uIndex, 0.5)).rg;
  vec2 morph_uv = mix(uv_1, uv_2, uBlend);

  vUv_1 = uv_1;
  vUv_2 = uv_2;

  vUv = morph_uv;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(morph_pos.xyz, 1.);

}