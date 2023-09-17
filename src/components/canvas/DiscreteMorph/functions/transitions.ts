import { DescGsapOptions } from "../types"
import { gsap, Linear } from "gsap"

export const updateTransitionId = (
   setId: React.Dispatch<React.SetStateAction<number>>,
   count: number,
   SCROLL_VALUE: number
): void => {
   const textureIndex = Math.round(SCROLL_VALUE * count)

   setId(textureIndex % count)
}

export const transition = (
   index: number,
   shaderRef: React.RefObject<THREE.ShaderMaterial>,
   textures: THREE.Texture[],
   invalidate: () => void,
   dataTextures: THREE.DataTexture[],
   setAnimating: React.Dispatch<React.SetStateAction<boolean>>
): void => {
   const UNIFORMS = shaderRef.current.uniforms
   const gsapOptions: DescGsapOptions = {
      onStart: () => {
         setAnimating(true)
         if (shaderRef.current.uniforms.uBlend.value < 0.5) {
            UNIFORMS.uTexture_1.value = textures[index]

            UNIFORMS.uVertTexture_1.value = dataTextures[index]
         } else {
            UNIFORMS.uTexture_0.value = textures[index]

            UNIFORMS.uVertTexture_0.value = dataTextures[index]
         }
      },
      ease: Linear.easeOut,
      duration: 0.25,
      onComplete: () => {
         setAnimating(false)
      }
   }
   gsap.to(UNIFORMS.uBlend, {
      value: UNIFORMS.uBlend.value < 0.5 ? 1 : 0,
      ...gsapOptions,
      onUpdate: () => {
         invalidate()
      }
   })
}
