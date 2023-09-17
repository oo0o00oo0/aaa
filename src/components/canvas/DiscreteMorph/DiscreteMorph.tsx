import React from "react"
import * as THREE from "three"
import { useThree } from "@react-three/fiber"
import SimpleShaderMaterial from "@canvas/SimpleShaderMaterial"
import useStore from "@state/store"
import MorphBufferGeometry from "../MorphBufferGeometry/MorphBufferGeometry"
import { DiscreteMorphProps } from "./types"
import { updateShader } from "./functions/updateShader"

const DiscreteMorph: React.FC<DiscreteMorphProps> = ({
   textures,
   dataTextures,
   count,
   pageOpacity
}) => {
   const invalidate = useThree(s => s.invalidate)
   // console.log(textures)

   const meshRef = React.useRef<THREE.Mesh>(null)
   const shaderRef = React.useRef<THREE.ShaderMaterial>(null)

   React.useLayoutEffect(() => {
      updateShader(
         shaderRef,
         textures,
         dataTextures,
         0,
         invalidate,
         count,
         pageOpacity
      )

      if (!meshRef.current.visible) {
         meshRef.current.visible = true
      }
   }, [textures])

   React.useEffect(() => {
      const subscription = useStore.subscribe(
         state => state.SCROLL_VALUE,
         scrollValue => {
            updateShader(
               shaderRef,
               textures,
               dataTextures,
               scrollValue,
               invalidate,
               count,
               pageOpacity
            )
            // updateTransitionId(setTransitionId, count, scrollValue)
         }
      )

      return () => subscription()
   }, [count, textures])

   {
      // React.useEffect(() => {
      //    transition(
      //       transitionId,
      //       shaderRef,
      //       textures,
      //       invalidate,
      //       dataTextures,
      //       setAnimating
      //    )
      // }, [transitionId, textures, invalidate])
   }

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
