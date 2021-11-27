import { Component, OnInit } from '@angular/core';
import * as tf from '@tensorflow/tfjs';

@Component({
  selector: 'app-basic-functions',
  templateUrl: './basic-functions.component.html',
  styleUrls: ['./basic-functions.component.scss']
})
export class BasicFunctionsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  public async test1(){
    console.log("hola");
    const image = document.getElementById('imgLena') as HTMLImageElement;
    const tImg=tf.browser.fromPixels(image);
    tImg.print();
    // Volvemos a pasarlo a imagen y la mostramos de nuevo como salida
    const canvasOut=document.getElementById('canvasOut') as HTMLCanvasElement;

    tf.browser.toPixels(tImg, canvasOut);    
    // var o= await cropAndResizeImage(tImg, [128,128]);
    // tf.browser.toPixels(o, canvasOut);    
    // canvasOut.src=resImg;
  }

}
