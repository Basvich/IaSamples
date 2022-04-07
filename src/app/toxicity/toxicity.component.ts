// generado con ng generate component Toxicity
//Como paquete npm en https://www.npmjs.com/package/@tensorflow-models/toxicity

import { Component, OnInit } from '@angular/core';
import * as tf from '@tensorflow/tfjs';
import * as tm from './ToxicityClassifier'

const jsModel="https://cdn.jsdelivr.net/npm/@tensorflow-models/toxicity@1.2.2";

@Component({
  selector: 'app-toxicity',
  templateUrl: './toxicity.component.html',
  styleUrls: ['./toxicity.component.scss']
})
export class ToxicityComponent implements OnInit {
  private  toxicityClassifier:tm.ToxicityClassifier | undefined;
  constructor() { }

  ngOnInit(): void {
  }

  public async test1():Promise<void>{
    this.toxicityClassifier= await tm.load(0.85, ["toxicity", "insult"]);
  }

  public async test2(){
    if(!this.toxicityClassifier) return;
    const sentences = [
      'You are a poopy head!',
      'I like turtles',
      'Shut up!',
    ]
    const predictions=await this.toxicityClassifier.classify(sentences)
    console.log(JSON.stringify(predictions, null, 2))
  }

}
