// Generado con ng generate component Nolinear. Sacado del capitulo 8 de Learning tensor flow
import {ReturnStatement} from '@angular/compiler';
import {Component, OnInit} from '@angular/core';
import * as tf from '@tensorflow/tfjs';
import {Chart,LineController, LineElement, PointElement,BarElement, LinearScale, BarController, CategoryScale, Title} from 'chart.js';

@Component({
  selector: 'app-nolinear',
  templateUrl: './nolinear.component.html',
  styleUrls: ['./nolinear.component.scss']
})
export class NolinearComponent implements OnInit {

  model: tf.LayersModel | undefined;
  xValues: Array<number> = [];  
  dataReal: Array<number> = []; 
  dataAprox: Array<number> = []; 

  public chart: Chart | undefined;

  constructor() { }

  ngOnInit(): void {
    this.initChart();
  }

  public CreateModel(): void {
    const model = tf.sequential();
    //Entradas
    model.add(tf.layers.dense({
      inputShape: [1],  //una entrada 1d, con 1 parametro; N-D tensor with shape
      units: 20,  //20 salidas, o una primera capa de 20 neuronas ; Positive integer, dimensionality of the output space.
      activation: 'relu',
    }));
    //intermedia
    model.add(
      tf.layers.dense({
        units: 20,
        activation: 'relu', //Ver disponibles en https://tech.courses/plotting-tensorflow-js-activation-functions/
      })
    );
    model.add(
      tf.layers.dense({
        units: 5,
        activation: 'relu', //Ver disponibles en https://tech.courses/plotting-tensorflow-js-activation-functions/
      })
    );
    //Salida
    model.add(
      tf.layers.dense({
        units: 1,
      })
    );
    // Compile for training
    model.compile({
      optimizer: 'adam',
      loss: 'meanSquaredError',
    })
    this.model = model;
    this.model.summary();
  }

  public CreateModel2(): void {
    const model = tf.sequential();
    //Entradas
    model.add(tf.layers.dense({
      inputShape: [1],
      units: 20,
      activation: 'relu',
    }));
    //intermedia
    model.add(
      tf.layers.dense({
        units: 20,
        activation: 'relu',
      })
    );
    //Salida
    model.add(
      tf.layers.dense({
        units: 1,
      })
    );
    // Compile for training
    model.compile({
      optimizer: 'adam',
      loss: 'meanSquaredError',
    })
    this.model = model;
  }

  public async Entrenar(): Promise<void> {
    if (!this.model || this.xValues.length>0) ReturnStatement;        
    // Create the dataset
    const jsxs = [];
    const jsys = [];
    const dataSize = 10
    const stepSize = 0.001
    // Entradas entre [0,10)
    for (let i = 0; i < dataSize; i = i + stepSize) {
      jsxs.push(i);
      jsys.push(i * i);
    }
    //Las entradas a mostrar son un rango mayor pero con menos precision
    for(let i=-5; i<15; i=i+0.5){
      this.xValues.push(i);
      this.dataReal.push(i*i);
    }
    this.chart!.update();
    // Inputs
    const xs = tf.tensor(jsxs);
    // Answers we want from inputs
    const ys = tf.tensor(jsys);
    const printCallback = {
      onEpochEnd: (epoch: number, log: any) => {
        console.log(epoch, log)
      },
    }
    // Train and print timing
    console.time('Training')
    await this.model!.fit(xs, ys, {
      epochs: 30,
      callbacks: printCallback,
      batchSize: 64,
    });
    console.timeEnd('Training');
    xs.dispose();
    ys.dispose();
  }

  public TestModel(): void {
    let res = tf.tidy(() => {
      let next = tf.tensor(this.xValues);
      return this.model!.predict(next);
    });
    const values = (<tf.Tensor<tf.Rank>>res).dataSync();
    for(let i=0; i<values.length; i++){
      var n=values[i];
      this.dataAprox.push(n);
    }
    this.chart!.update();
    //this.PrintResults(res);
    //OJO res no fue disposed
   /*  res = tf.tidy(() => {
      let next = tf.tensor([1, 3, 6]);
      return this.model!.predict(next);
    });
    this.PrintResults(res); */
  }

  public PrintResults(res: tf.Tensor<tf.Rank> | tf.Tensor<tf.Rank>[]) {
    (res as tf.Tensor<tf.Rank>).print();
  }

  private initChart() {   
    if(this.chart) return;
    const labels = ["a", "b", "c", "d", "e", "f", "g"];    

    Chart.register(LineController,BarController, LineElement, PointElement,BarElement, LinearScale, CategoryScale, Title);
    const ctx = document.getElementById('canvaschart');
    this.chart = new Chart(<HTMLCanvasElement>ctx , {
      type: 'line',
      data: {
        labels:this.xValues,
        datasets:[
          {
            label:"reales",
            borderColor: "#3e95cd",           
            data:this.dataReal,
            pointRadius:0
          },
          {
            label:"aproximados",
            borderColor: "#3e10a0",           
            data:this.dataAprox,
            pointRadius:0
          }

        ]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          },
          x:{
            type:'linear',
            display:true
          }          
        },
        showLine:true
      }
    });
  }

}
