import React from "react"
import * as THREE from "three"
import { useThree } from "@react-three/fiber"
import SimpleShaderMaterial from "@canvas/SimpleShaderMaterial"
import useStore from "@state/store"
import MorphBufferGeometry from "../MorphBufferGeometry/MorphBufferGeometry"

interface Props {
   textures: THREE.Texture[];
   dataTextures: THREE.DataTexture[];
   count: number;
}

const ContinuousMorph = ({ textures, dataTextures, count }) => {
   const invalidate = useThree(s => s.invalidate)

   const meshRef = React.useRef<THREE.Mesh>()
   const shaderRef = React.useRef<THREE.ShaderMaterial>()

   React.useLayoutEffect(() => {
      window.scrollTo(0, 0)
   }, [])

   React.useEffect(() => {
      const unsub = useStore.subscribe(
         state => state.SCROLL_VALUE,
         s => {
            updateShader(
               shaderRef,
               textures,
               dataTextures,
               s,
               invalidate,
               count
            )
         }
      )

      return () => {
         unsub()
      }
   }, [textures])

   React.useEffect(() => {
      const loader = new THREE.TextureLoader()

      loader.load(
         `/atlas/atlas.jpg`,
         texture => {
            shaderRef.current.uniforms.uAtlas.value = texture

            if (!meshRef.current.visible) {
               meshRef.current.visible = true
            }

            updateShader(
               shaderRef,
               textures,
               dataTextures,
               0,
               invalidate,
               count
            )
         },
         e => console.log(e),
         error => {
            console.error(`Failed to load texture at index:`, error)
         }
      )
   }, [])

   return (
      <mesh
         ref={meshRef}
         visible={false}>
         <MorphBufferGeometry />
         <SimpleShaderMaterial ref={shaderRef} />
      </mesh>
   )
}

export default ContinuousMorph

const updateShader = (
   shaderRef,
   textures,
   dataTextures,
   SCROLL_VALUE,
   invalidate,
   count
) => {
   const textureIndex = Math.floor(SCROLL_VALUE * count)

   shaderRef.current.uniforms.uTexture_0.value = textures[0]
   shaderRef.current.uniforms.uTexture_1.value = textures[0]

   //MULTI TEXTURES
   // shaderRef.current.uniforms.uTexture_0.value = textures[textureIndex % count]
   // shaderRef.current.uniforms.uTexture_1.value =
   //    textures[(textureIndex + 1) % count]

   shaderRef.current.uniforms.uVertTexture_0.value =
      dataTextures[textureIndex % count]

   shaderRef.current.uniforms.uVertTexture_1.value =
      dataTextures[(textureIndex + 1) % count]

   const blendFactor = SCROLL_VALUE * count - textureIndex
   shaderRef.current.uniforms.uBlend.value = blendFactor

   invalidate()
}
