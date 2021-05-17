import { Group, AxesHelper, Color } from 'three';
import BasicLights from './Lights.js';

import * as d3 from 'd3';
import perlinNoise3d from 'perlin-noise-3d';
import Bar from './Bar.js';

const count = 80;
const max = 200;
const barW = 5;
const noise = new perlinNoise3d();

export default class SeedScene extends Group {
  constructor() {
    super();

    let lights = new BasicLights();

    this.bars = Array(count * count).fill(0).map((_, i) => new Bar(max, barW, Math.floor(i / count) * barW, (i % count) * barW, 0x00ff00));
    console.log(this.bars);
    let axesHelper = new AxesHelper(100);
    this.add(lights, axesHelper, ...this.bars);
  }

  update(timeStamp) {
    this.bars.forEach(b => {
      const item = b.children[0];
      const x = (item.position.x / barW) / count;
      const z = (item.position.z / barW) / count;
      const pz = noise.get(x, z, timeStamp/10000);
      item.position.setY(pz *max);
      item.material.color = new Color(d3.interpolateCool(pz*1.1));
    })
  }
}