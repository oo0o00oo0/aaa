import React from "react"
import * as THREE from "three"
import { useThree } from "@react-three/fiber"
import SimpleShaderMaterial from "@canvas/SimpleShaderMaterial"
import useStore from "@state/store"
import { gsap, Linear } from "gsap"
import MorphBufferGeometry from "../MorphBufferGeometry/MorphBufferGeometry"

interface Props {
   textures: THREE.Texture[];
   dataTextures: THREE.DataTexture[];
   count: number;
   // debounce?: number;
}

interface StoreState {
   SCROLL_VALUE: number;
}

type GsapOptions = gsap.TweenVars

const DiscreteMorph: React.FC<Props> = ({
   textures,
   dataTextures,
   count
   // debounce = 0
}) => {
   const invalidate = useThree(s => s.invalidate)

   const [transitionId, setTransitionId] = React.useState(0)

   const [animating, setAnimating] = React.useState(false)

   const meshRef = React.useRef<THREE.Mesh>(null)
   const shaderRef = React.useRef<THREE.ShaderMaterial>(null)

   React.useLayoutEffect(() => {
      updateTransitionId(setTransitionId, count, 0)

      // shaderRef.current.uniforms.uTexture_0.value = textures[1]
      // shaderRef.current.uniforms.uTexture_1.value = textures[1]

      if (!meshRef.current.visible) {
         meshRef.current.visible = true
      }
   }, [])

   const scrollValueRef = React.useRef(0)

   React.useEffect(() => {
      const subscription = useStore.subscribe(
         state => state.SCROLL_VALUE,
         scrollValue => {
            scrollValueRef.current = scrollValue
            if (animating) {
               //@ts-ignore
               return
            }
            updateTransitionId(setTransitionId, count, scrollValue)
         }
      )

      return () => subscription()
   }, [count, animating])

   React.useEffect(() => {
      if (animating) {
         return
      }

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
   const gsapOptions: GsapOptions = {
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
// import { debounce as db } from "lodash-es"

// React.useEffect(() => {
//    const unsubscribe = useStore.subscribe(
//       state => state.SCROLL_VALUE,
//       debouncedCallback
//    )

//    return () => {
//       unsubscribe()
//       debouncedCallback.cancel()
//    }
// }, [count, invalidate])

// const debouncedCallback = React.useCallback(
//    db(
//       (s: number) => updateTransitionId(setTransitionId, count, s),
//       debounce,
//       { leading: true, trailing: true }
//    ),
//    [count]
// )
