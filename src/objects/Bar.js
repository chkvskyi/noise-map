import { Group, BoxGeometry, MeshBasicMaterial, Mesh, MeshPhysicalMaterial, MeshDepthMaterial, MeshPhongMaterial } from 'three';

export default class Bar extends Group {
  constructor(height, width, posX, posZ, color) {
    super();

    this.name = 'land';

    let geometry = new BoxGeometry(width, height, width);
    let material = new MeshPhysicalMaterial({ color });
    let cube = new Mesh(geometry, material);
    cube.position.set(posX, -height / 2, posZ);
    this.add(cube);
  }
}
