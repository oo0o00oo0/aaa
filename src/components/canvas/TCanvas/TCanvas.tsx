import { Canvas, useThree } from "@react-three/fiber"
import React from "react"
import DiscreteMorph from "@canvas/DiscreteMorph"
import { Vector3 } from "three"
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
         <React.Suspense fallback={null}>
            <Moprhings count={count} />
         </React.Suspense>
      </Canvas>
   )
}

const Moprhings = ({ count }) => {
   const { TEXTURES, DATA_TEXTURES } = useAssets(morphData)

   console.log(TEXTURES)

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
