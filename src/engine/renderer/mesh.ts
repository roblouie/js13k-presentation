import { Object3d } from './object-3d';
import { Material } from './material';
import { MoldableCube, PlaneGeometry } from '@/engine/moldable-cube';

export class Mesh extends Object3d {
  geometry: MoldableCube;
  material: Material;

  constructor(geometry: PlaneGeometry | MoldableCube, material: Material) {
    super();
    this.geometry = geometry;
    this.material = material;
  }
}
