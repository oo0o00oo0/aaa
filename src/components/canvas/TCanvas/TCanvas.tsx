import { Canvas, useThree } from "@react-three/fiber"
import { Suspense } from "react"
import DiscreteMorph from "@canvas/DiscreteMorph"
import { Vector3 } from "three"

import { morphData } from "@src/data/morph_data"
import { useAssets } from "@src/lib/useAssets"

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
   const { textures, DATA_TEXTURES } = useAssets(morphData)
   const { viewport } = useThree()

   const tempSizeHeightPercentage = 1

   return (
      <group
         scale={[
            viewport.height * tempSizeHeightPercentage,
            viewport.height * tempSizeHeightPercentage,
            1
         ]}>
         <DiscreteMorph
            count={count}
            dataTextures={DATA_TEXTURES}
            textures={textures}
         />
      </group>
   )
}

export default TCanvas
