import React from "react"
import * as THREE from "three"
import { useLoader, useThree } from "@react-three/fiber"
import { insertEveryNth } from "@src/utils/functions"

let texturePaths = [
   "/atlas/00_HERO.webp",
   "/atlas/atlas.webp",
   "/atlas/one.webp",
   "/atlas/atlas.webp",
   "/atlas/one.webp",
   "/atlas/atlas.webp"
]

export const useAssets = morphData => {
   const { gl } = useThree()

   const initialTextures = React.useMemo(() => {
      const data = new Uint8Array([
         175, 175, 175, 175, 175, 175, 175, 175, 175, 175, 175, 175, 175, 175,
         175, 175
      ])

      const texture = new THREE.DataTexture(data, 2, 2, THREE.RGBAFormat)
      texture.needsUpdate = true

      const textures = texturePaths.map(() => texture)

      return textures
   }, [])

   const [TEXTURES, setTextures] =
      React.useState<THREE.Texture[]>(initialTextures)

   const loadTexture = (path: string, index: number) => {
      const loader = new THREE.TextureLoader()
      loader.load(
         path,
         texture => {
            window.requestIdleCallback(() => {
               setTextures(prevTextures => {
                  const updatedTextures = [...prevTextures]
                  updatedTextures[index] = texture
                  return updatedTextures
               })
            })
            gl.initTexture(texture)

            if (index < texturePaths.length - 1) {
               loadTexture(texturePaths[index + 1], index + 1)
            }
            // }, 1000)
         },
         () => console.log(index),
         error => {
            console.error(`Failed to load texture at index ${index}:`, error)
            if (index < texturePaths.length - 1) {
               loadTexture(texturePaths[index + 1], index + 1)
            }
         }
      )
   }

   React.useEffect(() => {
      loadTexture(texturePaths[0], 0)
   }, [texturePaths])

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

   return { TEXTURES, DATA_TEXTURES }
}
