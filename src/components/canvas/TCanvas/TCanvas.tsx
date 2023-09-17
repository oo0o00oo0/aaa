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

let t = [
   "/atlas/00_HERO.webp",
   "/atlas/atlas.webp",
   "/atlas/one.webp",
   "/atlas/atlas.webp",
   "/atlas/one.webp",
   "/atlas/atlas.webp"
]
const Moprhings = ({ count }) => {
   const { DATA_TEXTURES } = useAssets(morphData)

   const { viewport } = useThree()

   const tempSizeHeightPercentage = 1

   const textures = React.useMemo(() => {
      const data = new Uint8Array([
         255,
         0,
         0,
         255, // Red
         0,
         255,
         0,
         255, // Green
         0,
         0,
         255,
         255, // Blue
         255,
         255,
         0,
         255 // Yellow
      ])

      const texture = new DataTexture(data, 2, 2, RGBAFormat)
      texture.needsUpdate = true

      return [texture, texture, texture, texture, texture, texture]
   }, [])

   const test = useUpdatedTextures(textures, t)

   console.log(test)

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
            textures={test}
         />
      </group>
   )
}

export default TCanvas

export const useUpdatedTextures = (initialTextures, texturePaths) => {
   const [textures, setTextures] = useState(initialTextures)

   const loadTexture = (path, index) => {
      const loader = new THREE.TextureLoader()
      loader.load(
         path,
         texture => {
            // Use requestIdleCallback to ensure update only when there's no work being done on the main thread
            // setTimeout(() => {
            // console.log("SET")

            window.requestIdleCallback(() => {
               setTextures(prevTextures => {
                  const updatedTextures = [...prevTextures]
                  updatedTextures[index] = texture
                  return updatedTextures
               })
            })

            if (index < texturePaths.length - 1) {
               loadTexture(texturePaths[index + 1], index + 1)
            }
            // }, 1000)
         },
         undefined,
         error => {
            console.error(`Failed to load texture at index ${index}:`, error)
            if (index < texturePaths.length - 1) {
               loadTexture(texturePaths[index + 1], index + 1)
            }
         }
      )
   }

   useEffect(() => {
      loadTexture(texturePaths[0], 0)
   }, [texturePaths])

   return textures
}
