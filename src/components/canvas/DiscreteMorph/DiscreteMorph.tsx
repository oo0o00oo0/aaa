import React from "react"
import * as THREE from "three"
import { useThree } from "@react-three/fiber"
import { gsap, Linear } from "gsap"
import SimpleShaderMaterial from "@canvas/SimpleShaderMaterial"
import useStore from "@state/store"
import MorphBufferGeometry from "../MorphBufferGeometry/MorphBufferGeometry"
import { DescGsapOptions, DiscreteMorphProps } from "./types"

const DiscreteMorph: React.FC<DiscreteMorphProps> = ({
   textures,
   dataTextures,
   count
}) => {
   const invalidate = useThree(s => s.invalidate)

   const scrollValueRef = React.useRef<number>(0)

   const [transitionId, setTransitionId] = React.useState(0)
   const [animating, setAnimating] = React.useState(false)

   const meshRef = React.useRef<THREE.Mesh>(null)
   const shaderRef = React.useRef<THREE.ShaderMaterial>(null)

   React.useLayoutEffect(() => {
      // TODO DOES NOT SYNC STATE ON PAGE LOAD
      // const initialScrollValue = useStore.getState().SCROLL_VALUE
      // scrollValueRef.current = initialScrollValue

      // shaderRef.current.uniforms.uTexture_0.value = textures[1]
      // shaderRef.current.uniforms.uTexture_1.value = textures[1]

      if (!meshRef.current.visible) {
         meshRef.current.visible = true
      }
   }, [])

   React.useEffect(() => {
      const subscription = useStore.subscribe(
         state => state.SCROLL_VALUE,
         scrollValue => {
            scrollValueRef.current = scrollValue
            if (animating) {
               return
            }
            updateTransitionId(setTransitionId, count, scrollValue)
         }
      )

      return () => subscription()
   }, [count, animating])

   React.useEffect(() => {
      transition(
         transitionId,
         shaderRef,
         textures,
         invalidate,
         dataTextures,
         setAnimating
      )
   }, [transitionId, textures, invalidate])

   React.useEffect(() => {
      updateTransitionId(setTransitionId, count, scrollValueRef.current)
   }, [animating])

   return (
      <mesh
         ref={meshRef}
         visible={false}>
         <MorphBufferGeometry />
         <SimpleShaderMaterial ref={shaderRef} />
      </mesh>
   )
}

export default DiscreteMorph

const updateTransitionId = (
   setId: React.Dispatch<React.SetStateAction<number>>,
   count: number,
   SCROLL_VALUE: number
): void => {
   const textureIndex = Math.round(SCROLL_VALUE * count)

   setId(textureIndex % count)
}

const transition = (
   index: number,
   shaderRef: React.RefObject<THREE.ShaderMaterial>,
   textures: THREE.Texture[],
   invalidate: () => void,
   dataTextures: THREE.DataTexture[],
   setAnimating
): void => {
   const gsapOptions: DescGsapOptions = {
      onStart: () => {
         setAnimating(true)
         if (shaderRef.current.uniforms.uBlend.value < 0.5) {
            // SWAP THESE OUT FOR TEXTURE ATLAS's WHEN NEEDED
            shaderRef.current.uniforms.uTexture_1.value = textures[index]

            shaderRef.current.uniforms.uVertTexture_1.value =
               dataTextures[index]
         } else {
            // SWAP THESE OUT FOR TEXTURE ATLAS's WHEN NEEDED
            shaderRef.current.uniforms.uTexture_0.value = textures[index]

            shaderRef.current.uniforms.uVertTexture_0.value =
               dataTextures[index]
         }
      },
      ease: Linear.easeOut,
      // delay: 500,
      duration: 0.25,
      onComplete: () => {
         setAnimating(false)
      }
   }
   gsap.to(shaderRef.current.uniforms.uBlend, {
      value: shaderRef.current.uniforms.uBlend.value < 0.5 ? 1 : 0,
      ...gsapOptions,
      onUpdate: () => {
         invalidate()
      }
   })
}
