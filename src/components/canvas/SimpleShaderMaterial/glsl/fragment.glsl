precision mediump float;

uniform float uBlend;
uniform float uOpacity_0;
uniform float uOpacity_1;
varying vec2 vUv;
varying vec2 vUv_1;
varying vec2 vUv_2;

uniform sampler2D uTexture_0;
uniform sampler2D uTexture_1;

uniform sampler2D uAtlas;

void main() {

  // vec4 color_1 = texture2D(uTexture_0, vUv);
  // vec4 color_2 = texture2D(uTexture_1, vUv);
  vec4 color_1 = texture2D(uTexture_0, vUv_1);
  vec4 color_2 = texture2D(uTexture_1, vUv_2);
  vec4 color = mix(color_1, color_2, uBlend);

  // vec4 atlas_1 = texture2D(uAtlas, vUv_1);
  // vec4 atlas_2 = texture2D(uAtlas, vUv_2);
  // vec4 color = mix(atlas_1, atlas_2, uBlend);

  float opac = mix(uOpacity_0, uOpacity_1, uBlend);

  gl_FragColor = vec4(color.rgb, opac);
  // gl_FragColor = vec4(1., .0, .6, 1.);
}