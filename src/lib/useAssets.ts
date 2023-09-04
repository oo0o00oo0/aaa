import React from "react"
import * as THREE from "three"
import { useLoader } from "@react-three/fiber"
import { insertEveryNth } from "@src/utils/functions"

let t = ["/atlas/one.webp", "/atlas/one.webp", "/atlas/one.webp"]

export const useAssets = morphData => {
   const firstTexture = useLoader(THREE.TextureLoader, `/atlas/atlas.webp`)
   const secondTexture = useLoader(THREE.TextureLoader, `/atlas/atlas.webp`)
   const thirdTexture = useLoader(THREE.TextureLoader, `/atlas/atlas.webp`)
   const [textures, setTextures] = React.useState([
      firstTexture,
      secondTexture,
      thirdTexture
   ])

   // const loadNextTexture = (index: number) => {
   //    if (index < 2) {
   //       const loader = new THREE.TextureLoader()
   //       loader.load(
   //          // `/mathias/grid/grid-${index}.jpg`,
   //          t[index],
   //          texture => {
   //             setTextures(prevTextures => [...prevTextures, texture])
   //             window.requestIdleCallback(() => {
   //                loadNextTexture(index + 1)
   //             })
   //          },
   //          () => console.log(index),
   //          error => {
   //             loadNextTexture(index + 1)
   //             console.error(`Failed to load texture at index ${index}:`, error)
   //          }
   //       )
   //    }
   // }

   // React.useEffect(() => {
   //    loadNextTexture(1)
   // }, [])

   const DATA_TEXTURES = React.useMemo<THREE.DataTexture[]>(() => {
      const DATA_TEXTURES = Object.keys(morphData)
         .filter((key: string) => key.includes("position"))
         .reduce((cur: THREE.DataTexture[], key) => {
            const positions = insertEveryNth(morphData[key], 3, 1, 0)
            const uvs = insertEveryNth(
               morphData[key.replace("position", "uv")],
               2,
               2,
               0
            )

            const normals = insertEveryNth(
               morphData[key.replace("position", "normal")],
               3,
               2,
               0
            )

            const combined = new Float32Array([
               ...positions,
               ...uvs,
               ...normals
            ])

            const data_texture = new THREE.DataTexture(
               combined,
               morphData[key].length / 3,
               3,
               THREE.RGBAFormat,
               THREE.FloatType
            )
            data_texture.needsUpdate = true
            cur.push(data_texture)
            return cur
         }, [])

      return DATA_TEXTURES
   }, [])

   return { textures, DATA_TEXTURES }
}
