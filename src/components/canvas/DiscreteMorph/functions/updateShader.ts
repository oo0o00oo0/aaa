function cubicBezier(p0, p1, p2, p3, t) {
   const u = 1 - t
   const tt = t * t
   const uu = u * u
   const uuu = uu * u
   const ttt = tt * t
   return uuu * p0 + 3 * uu * t * p1 + 3 * u * tt * p2 + ttt * p3
}

function piecewiseBezier(t) {
   const holdStart = 0.7

   if (t < holdStart) {
      return cubicBezier(0, 0.1, 0.9, 1, t / holdStart)
   } else {
      return 1
   }
}

export const updateShader = (
   shaderRef: React.RefObject<THREE.ShaderMaterial>,
   textures: THREE.Texture[],
   dataTextures: THREE.DataTexture[],
   SCROLL_VALUE: number,
   invalidate: () => void,
   count: number,
   opacity: number[]
) => {
   const textureIndex = Math.floor(SCROLL_VALUE * count)
   shaderRef.current.uniforms.uOpacity_0.value = opacity[textureIndex % count]
   shaderRef.current.uniforms.uOpacity_1.value =
      opacity[(textureIndex + 1) % count]
   //MULTI TEXTURES
   shaderRef.current.uniforms.uTexture_0.value = textures[textureIndex % count]
   shaderRef.current.uniforms.uTexture_1.value =
      textures[(textureIndex + 1) % count]

   shaderRef.current.uniforms.uVertTexture_0.value =
      dataTextures[textureIndex % count]
   shaderRef.current.uniforms.uVertTexture_1.value =
      dataTextures[(textureIndex + 1) % count]

   const blendFactor = SCROLL_VALUE * count - textureIndex

   shaderRef.current.uniforms.uBlend.value = piecewiseBezier(blendFactor)

   invalidate()
}
