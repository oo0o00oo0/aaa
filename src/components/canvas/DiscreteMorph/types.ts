export interface DiscreteMorphProps {
   textures: THREE.Texture[];
   dataTextures: THREE.DataTexture[];
   count: number;
   pageOpacity?: number[];
}

export type DescGsapOptions = gsap.TweenVars
