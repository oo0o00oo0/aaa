import React from "react"
import * as THREE from "three"
import { useThree } from "@react-three/fiber"
import SimpleShaderMaterial from "@canvas/SimpleShaderMaterial"
import useStore from "@state/store"
import MorphBufferGeometry from "../MorphBufferGeometry/MorphBufferGeometry"
import { DiscreteMorphProps } from "./types"
import { transition } from "./functions/transitions"
import { updateShader } from "./functions/updateShader"
import { ReactLenis, useLenis } from "@studio-freight/react-lenis"

const DiscreteMorph: React.FC<DiscreteMorphProps> = ({
   textures,
   dataTextures,
   count,
   opacity
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
            updateShader(
               shaderRef,
               textures,
               dataTextures,
               scrollValue,
               invalidate,
               count,
               opacity
            )
            // updateTransitionId(setTransitionId, count, scrollValue)
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

export default DiscreteMorph
