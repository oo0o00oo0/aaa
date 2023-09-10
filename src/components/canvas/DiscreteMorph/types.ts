export interface DiscreteMorphProps {
   textures: THREE.Texture[];
   dataTextures: THREE.DataTexture[];
   count: number;
   scrolly: boolean;
   // debounce?: number;
}

export type DescGsapOptions = gsap.TweenVars
