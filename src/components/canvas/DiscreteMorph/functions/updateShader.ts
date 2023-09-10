export const updateShader = (
   shaderRef,
   textures,
   dataTextures,
   SCROLL_VALUE,
   invalidate,
   count,
   opacity
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

   shaderRef.current.uniforms.uBlend.value = blendFactor

   invalidate()
}
