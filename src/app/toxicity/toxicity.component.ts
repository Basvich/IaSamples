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
  public Frase="";
  public Toxicity=0;
  public Insult=0;
  public IdentityAtack=0;
  public Obscene=0;
  constructor() { }

  ngOnInit(): void {
  }

  public async test1():Promise<void>{
    this.toxicityClassifier= await tm.load(0.85, ["toxicity", "insult", "identity_attack", "obscene"]);
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

  public async analize(){
    if(!this.toxicityClassifier) return;
    const predictions=await this.toxicityClassifier.classify(this.Frase);
    console.log(JSON.stringify(predictions, null, 2));
    const t1=this.getValue(predictions,"toxicity");
    this.Toxicity=t1;
    this.Insult=this.getValue(predictions,"insult");
    this.IdentityAtack=this.getValue(predictions, "identity_attack");
    this.Obscene=this.getValue(predictions, "obscene");
  }

  private getValue(predictions: tm.IResponseToxicity[], label:string):number{
    var r=predictions.find((p)=>p.label===label);
    let res=0;
    if(r){
      const r0=r.results[0];
      res=r0.probabilities["1"];
    }
    return res;
  }

}
