// generado con ng generate component Toxicity
//Como paquete npm en https://www.npmjs.com/package/@tensorflow-models/toxicity

import { Component, OnInit } from '@angular/core';
import * as tf from '@tensorflow/tfjs';

const jsModel="https://cdn.jsdelivr.net/npm/@tensorflow-models/toxicity@1.2.2";

@Component({
  selector: 'app-toxicity',
  templateUrl: './toxicity.component.html',
  styleUrls: ['./toxicity.component.scss']
})
export class ToxicityComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  public async test1():Promise<void>{
    const model = await tf.loadGraphModel(jsModel);
  }

}
