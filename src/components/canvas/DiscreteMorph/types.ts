export interface DiscreteMorphProps {
   textures: THREE.Texture[];
   dataTextures: THREE.DataTexture[];
   count: number;
   opacity?: number[];
}

export type DescGsapOptions = gsap.TweenVars
