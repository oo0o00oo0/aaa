import React from "react"
import * as THREE from "three"
import shaderMaterial from "@src/lib/dreiShaderMaterial"
//@ts-ignore
import vertex from "./glsl/vertex.glsl"
//@ts-ignore
import fragment from "./glsl/fragment.glsl"
import { extend } from "@react-three/fiber"

type Props = {}

const SimpleShader = shaderMaterial(
   {
      uBlend: { value: 0 },
      uOpacity_0: { value: 0 },
      uOpacity_1: { value: 0 },
      uTexture_0: { value: new THREE.Texture() },
      uTexture_1: { value: new THREE.Texture() },
      uAtlas: { value: new THREE.Texture() },
      uVertTexture_0: { value: new THREE.Texture() },
      uVertTexture_1: { value: new THREE.Texture() }
   },
   vertex,
   fragment,
   () => console.log("init")
)

extend({ SimpleShader })

const SimpleShaderMaterial = React.forwardRef((props: Props, ref) => {
   return (
      // @ts-ignore
      <simpleShader
         transparent={true}
         wireframe={false}
         ref={ref}
      />
   )
})

export default SimpleShaderMaterial
