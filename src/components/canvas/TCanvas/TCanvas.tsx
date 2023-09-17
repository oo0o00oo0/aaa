import { Canvas, useThree } from "@react-three/fiber"
import * as THREE from "three"
import React, { Suspense, useEffect, useState } from "react"
import DiscreteMorph from "@canvas/DiscreteMorph"
import { DataTexture, RGBAFormat, TextureLoader, Vector3 } from "three"
import { morphData } from "@src/data/morph_data"
import { useAssets } from "@src/lib/useAssets"
import { pageOpacity } from "@src/config/app-config"

export const TCanvas = ({ count }) => {
   return (
      <Canvas
         frameloop="demand"
         orthographic
         camera={{
            position: new Vector3(0, 0, 1),
            zoom: 1
         }}
         dpr={window.devicePixelRatio}>
         <Suspense fallback={null}>
            <Moprhings count={count} />
         </Suspense>
      </Canvas>
   )
}

const Moprhings = ({ count }) => {
   const { TEXTURES, DATA_TEXTURES } = useAssets(morphData)

   const { viewport } = useThree()

   const tempSizeHeightPercentage = 1

   return (
      <group
         scale={[
            viewport.width * tempSizeHeightPercentage,
            viewport.width * tempSizeHeightPercentage,
            1
         ]}>
         <DiscreteMorph
            pageOpacity={pageOpacity}
            count={count}
            dataTextures={DATA_TEXTURES}
            textures={TEXTURES}
         />
      </group>
   )
}

export default TCanvas
