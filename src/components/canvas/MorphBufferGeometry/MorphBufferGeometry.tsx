import { morphData } from "@src/data/morph_data"
import React from "react"

type Props = {}

const MorphBufferGeometry = (props: Props) => {
   const { scaledIndices } = React.useMemo(() => {
      const size = morphData.position_0.length / 3

      const scaledIndices = new Float32Array(size)

      for (let i = 0; i < size; ++i) {
         scaledIndices[i] = i / size
      }

      return { scaledIndices }
   }, [])

   return (
      <bufferGeometry>
         <bufferAttribute
            attach="attributes-position"
            array={Float32Array.from(morphData.position_0)}
            count={morphData.position_0.length / 3}
            itemSize={3}
         />

         <bufferAttribute
            attach="index"
            array={morphData.indices}
            count={morphData.indices.length}
            itemSize={1}
         />
         <bufferAttribute
            attach="attributes-uIndex"
            array={scaledIndices}
            count={scaledIndices.length}
            itemSize={1}
         />
      </bufferGeometry>
   )
}

export default MorphBufferGeometry
