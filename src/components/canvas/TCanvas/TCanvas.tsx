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

   const { viewport } = useThree()

   const xPaddingInPixels = window.innerWidth * 0.02

   const effectiveWidth = viewport.width - 2 * xPaddingInPixels

   const topOffset = viewport.height * 0.125
   const xScaleFactor = effectiveWidth / viewport.width

   return (
      <group
         position={[0, viewport.height / 2 - topOffset, 0]}
         scale={[
            viewport.width * xScaleFactor,
            viewport.width * xScaleFactor,
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
