import React from "react"
import * as THREE from "three"
import { useThree } from "@react-three/fiber"
import { gsap, Linear } from "gsap"
import SimpleShaderMaterial from "@canvas/SimpleShaderMaterial"
import useStore from "@state/store"
import MorphBufferGeometry from "../MorphBufferGeometry/MorphBufferGeometry"
import { DescGsapOptions, DiscreteMorphProps } from "./types"

const checkScrollSpeed = (function (settings) {
   settings = settings || {}

   var lastPos,
      newPos,
      timer,
      delta,
      delay = settings.delay || 50 // in "ms" (higher means lower fidelity )

   function clear() {
      lastPos = null
      delta = 0
   }

   clear()

   return function () {
      newPos = window.scrollY
      if (lastPos != null) {
         delta = newPos - lastPos
      }
      lastPos = newPos
      clearTimeout(timer)
      timer = setTimeout(clear, delay)
      return delta
   }
})()

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
      {
         // TODO DOES NOT SYNC STATE ON PAGE LOAD - something to do with the animation not the state
         // const initialScrollValue = useStore.getState().SCROLL_VALUE
         // scrollValueRef.current = initialScrollValue
         // updateTransitionId(setTransitionId, count, scrollValueRef.current)
         // shaderRef.current.uniforms.uTexture_0.value = textures[1]
         // shaderRef.current.uniforms.uTexture_1.value = textures[1]
      }

      if (!meshRef.current.visible) {
         meshRef.current.visible = true
      }
   }, [])

   React.useEffect(() => {
      const subscription = useStore.subscribe(
         state => state.SCROLL_VALUE,
         scrollValue => {
            if (animating) {
               return
            }
            // if (!scrolly) {
            updateShader(
               shaderRef,
               textures,
               dataTextures,
               scrollValue,
               invalidate,
               count
            )
            // } else {
            //    updateTransitionId(setTransitionId, count, scrollValue)
            // }
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

   return (
      <mesh
         ref={meshRef}
         visible={false}>
         <MorphBufferGeometry />
         <SimpleShaderMaterial ref={shaderRef} />
      </mesh>
   )
}

const updateShader = (
   shaderRef,
   textures,
   dataTextures,
   SCROLL_VALUE,
   invalidate,
   count
) => {
   const textureIndex = Math.floor(SCROLL_VALUE * count)

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
