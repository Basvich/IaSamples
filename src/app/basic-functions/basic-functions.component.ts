import {Component, OnInit} from '@angular/core';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import * as tf from '@tensorflow/tfjs';
import { DialogoConfirmacionComponent } from '../dialogo-confirmacion/dialogo-confirmacion.component';

@Component({
  selector: 'app-basic-functions',
  templateUrl: './basic-functions.component.html',
  styleUrls: ['./basic-functions.component.scss']
})
export class BasicFunctionsComponent implements OnInit {

  constructor(public dialogo: MatDialog) { }

  ngOnInit(): void {
  }

  public async test1() {
    console.log("hola");
    const image = document.getElementById('imgLena') as HTMLImageElement;
    const tImg = tf.browser.fromPixels(image);
    console.log('Shape of the imgLena:', tImg.shape);
    tImg.print();
    // Volvemos a pasarlo a imagen y la mostramos de nuevo como salida
    const canvasOut = document.getElementById('canvasOut') as HTMLCanvasElement;
    tf.browser.toPixels(tImg, canvasOut);
    // var o= await cropAndResizeImage(tImg, [128,128]);
    // tf.browser.toPixels(o, canvasOut);    
    // canvasOut.src=resImg;
  }

  public testVarious() {
    this.testRelu();
    this.testAvgPool();
    this.testConv1D();
  }

  public testConv2DBasic(): void {
    const a = tf.tensor([[1, 2, 3, 4], [3, 4, 5, 6], [5, 6, 7, 8], [7, 8, 9, 10]], [4, 4], 'int32');
    console.log('shape:', a.shape);
    console.log('dtype', a.dtype);
    a.print();
    let c2D = tf.layers.conv2d({
      inputShape: [4, 4, 1],  //4x4 1 layer
      kernelSize: 5,  // tama
      filters: 8,
      strides: 1,
      activation: 'relu',
      kernelInitializer: 'varianceScaling'
    });
    const b = c2D.apply(a);

  }

  protected testRelu() {
    const x = tf.tensor1d([-1, 2, -3, 4]);
    // Aplica relu a los elementos
    var r = tf.relu(x);
    r.print();
  }

  protected testAvgPool() {
    const x = tf.tensor5d([1, 2, 3, 4, 5, 6, 7, 8], [1, 2, 2, 2, 1]);
    const result = tf.avgPool3d(x, 2, 1, 'valid');
    result.print();
  }

  protected testConv1D() {
    const c = tf.tensor1d([1, 2, 3, 4, 5, 6, 7]);
    const filter = tf.tensor1d([1, 0, 1]);
    //const res=tf.conv1d(c, filter, 1, 'same' );
    //res.print();

  }

  /**
   * Ejemplo copiado de https://www.geeksforgeeks.org/tensorflow-js-tf-conv2d-function/
   */
  public ConvAny() {
    // Input tensor
    /* data_format: Specify the data format of the input and output data.
    With the default format "NHWC", the data is stored in the order of: [batch, height, width, channels].
    Alternatively, the format could be "NCHW", the data storage order of: [batch, channels, height, width].*/
    const x = tf.tensor4d([[
      [[2], [1], [2], [0], [1]],
      [[1], [3], [2], [2], [3]],
      [[1], [1], [3], [3], [0]],
      [[2], [2], [0], [1], [1]],
      [[0], [0], [3], [1], [2]],]]);
    console.log('Shape of the input:', x.shape);
    console.log(`input batch: ${x.shape[0]}  dim: ${x.shape[1]} X ${x.shape[2]} channels:${x.shape[3]}`)
    // Kernel has been set
    // filter: A 4-D tensor of shape [filter_height, filter_width, in_channels, out_channels]
    const kernel = tf.tensor4d([
      [[[2, 0.1]], [[3, 0.2]]],
      [[[0, 0.3]], [[1, 0.4]]],
    ]);
    console.log('Shape of the kernel:', kernel.shape);
    console.log(`kernel dim: ${kernel.shape[0]} X  ${kernel.shape[1]} channels: in:${kernel.shape[2]} out: ${kernel.shape[3]}`)
    // Output tensor after convolution
    let out = tf.conv2d(x, kernel, [1, 1], "same");
    out.print();
    console.log('Shape of the output:', out.shape);
    let l1=this.normalizedValues(2, this.filters.Nearest);
    l1.print();
  }

  public ConvLena(){
    const image = document.getElementById('imgLena') as HTMLImageElement;
    const tImg = tf.browser.fromPixels(image);
    console.log('Shape of the imgLena:', tImg.shape);
 
    // let out = tf.conv2d(tImg, params.filters, [2,2], 'same');
    /*Filter: Filter is of rank 4 with shape parameters [filterHeight, filterWidth, inDepth, outDepth] is passed. 
    It needs to be a 4D tensor, nested array or a typed array.*/
    /* const kernel = tf.tensor4d([
      [[[2, 0.1]], [[3, 0.2]]],
      [[[0, 0.3]], [[1, 0.4]]],
    ]);
    const kernel2 = tf.tensor4d([[ [1,0,1], [2,0,-2], [-1,0,-1] ]]);
    console.log('Shape of the kernel:', kernel.shape);
    let out = tf.conv2d(
      tImg, 
      kernel, //Filtro de convolucion
       [1, 1], //Strides, tamaño del paso en cada dimension
        "same");
    console.log('Shape of the output:', out.shape); */
  }

  /**
   * Toma la imagen, y le aplica a cada elemento del array el clip entre unos valores
   * maximo y mínimo, y devuelve una imagen
   */
  public async MaxMinLena(){
    const image = document.getElementById('imgLena') as HTMLImageElement;
    const tImg = tf.browser.fromPixels(image);
    //A 3D tensor that represents an image has this shape: (height, width, number_of_channels)
    console.log('Shape of the Lenna:', tImg.shape);
    const o1=tf.clipByValue(tImg, 0 , 128);
    console.log('Shape of the lenna cliped:', o1.shape);
    //const o2=tf.relu(o1)
    // Volvemos a pasarlo a imagen y la mostramos de nuevo como salida
    const canvasOut = document.getElementById('canvasOut') as HTMLCanvasElement;
    tf.browser.toPixels(o1, canvasOut); 
    tf.dispose(o1);
  }

  /** Aplica un filtrado a la imagen usando las primitivas de tf */
  public async BlurLena(){
    const image = document.getElementById('imgLena') as HTMLImageElement;
    const tImg = tf.browser.fromPixels(image);
    //A 3D tensor that represents an image has this shape: (height, width, number_of_channels)
    console.log('Shape of the Lenna:', tImg.shape);    
    
    // Volvemos a pasarlo a imagen y la mostramos de nuevo como salida
    const canvasOut = document.getElementById('canvasOut') as HTMLCanvasElement;    
    var t2=this.getImageTensor(tImg); //Tenemos la imagen en el tensor
    let o3=await this.frame(t2, {filter:this.gaussian, zoom:2, kernelWidth:1});
    tf.dispose(t2);
    console.log('Shape of the o3:', o3.shape);
    let o4=<tf.Tensor3D>o3.squeeze(); //Le quita la dimension adicional creada antes
    console.log('Shape of the o4:', o4.shape);
    tf.dispose(o3);
    let o5=tf.cast(o4, 'int32');  //Se vuelve a pasar a int para obtener la imagen
    tf.dispose(o4);
    tf.browser.toPixels(o5, canvasOut);
  }

  
  private normalizedValues(size:number, filter: (arg0: number) => number):tf.Tensor4D {
    let total = 0
    const values:number[][][][] = []
    for (let y = -size; y <= size; ++y) {
      const i = y + size
      values[i] = []
      for (let x = -size; x <= size; ++x) {
        const j = x + size
        values[i][j] = []
        const f = filter(x) * filter(y)
        total += f
        for (let c = 0; c < 3; ++c) {
          values[i][j][c] = [ f, f, f ]
        }
      }
    }
    const kernel = values.map(row => row.map(col => col.map((a: number[]) => a.map((b: number) => b / total))))
    // for (let x = -size; x <= size; ++x) values[x + size] = filter(x)
    // const kernel = tf.einsum('i,j->ij', values, values)
    // const sum = tf.sum(values)
    const normalized = <tf.Tensor4D>tf.div(kernel, total * 3);
    return normalized;
  }

  lanczos(x:number, a:number):number {
    if (x === 0) return 1
    if (x >= -a && x < a) {
      return (a * Math.sin(Math.PI * x) * Math.sin(Math.PI * (x / a))) / (Math.PI * Math.PI * x * x)
    }
    return 0
  }

  gaussian(x:number, theta = 1 /* ~ -3 to 3 */) {
    const C = 1 / Math.sqrt(2 * Math.PI * theta * theta)
    const k = -(x * x) / (2 * theta * theta)
    return C * Math.exp(k)
  }

  filters = {
    Lanczos3: (x: number) => this.lanczos(x, 3),
    Lanczos2: (x: number)=> this.lanczos(x, 2),
    Gaussian: (x: number) => this.gaussian(x, 1),
    Bilinear: () => 1,
    Nearest: () => 1,
  }

  /**
   * Aplica el filtro indicado
   *
   * @param {*} tensor
   * @param {{filter: (x:number)=>number; zoom: number; kernelWidth: number;}} args
   * @return {*} 
   * @memberof BasicFunctionsComponent
   */
  async frame(tensor: any, args: {filter: (x:number)=>number; zoom: number; kernelWidth: number;}){
    const f=this.filters.Lanczos2;
    const filter = args.filter; //this.filters[args.filter];
    // const [ height, width ] = tensor.shape
    // const res = args.resolution === 'Source' ? [ width, height ] : resolutions[args.resolution]
    // const strides = [ width / res[0], height / res[1] ]
    const { zoom, kernelWidth } = args
    const strides = Math.max(1, zoom)
    const size = Math.max(3, kernelWidth) * strides
    const kernel = this.normalizedValues(size, filter)
    const pad = 'valid' // sample to the edge, even when filter extends beyond image
    const dst = <tf.Tensor3D>tf.conv2d(tensor, kernel, strides, pad)
    return dst;
  } 

  getImageTensor(input: tf.Tensor): tf.Tensor4D {
    return tf.tidy(() => {
      if (input instanceof tf.Tensor) {
        const rank = input.shape.length
        if (rank !== 3 && rank !== 4) {
          throw new Error('input tensor must be of rank 3 or 4')
        }  
        return (rank === 3 ? input.expandDims(0) : input).toFloat() as tf.Tensor4D
      }else
      throw new Error('getImageTensor - expected input to be a tensor')
    })
  }

  /**
   * Prepare an input image by converting it to tf.Tensor and resizing it
   * according to the expected model input.
   */
  prepareImageInput(image: HTMLImageElement, inputTensorMetadata: {shape: number[]}): tf.Tensor {
    return tf.tidy(() => {
      let imageTensor = tf.browser.fromPixels(image, /* numChannels= */ 3);

      // Resize the query image according to the model input shape.
      imageTensor = tf.image.resizeBilinear(
          imageTensor,
          [inputTensorMetadata.shape[1], inputTensorMetadata.shape[2]], false);

      // Map to the correct input shape, range and type. The models expect float
      // inputs in the range [0, 1].
      imageTensor = imageTensor.toFloat().div(255).expandDims(0);

      return imageTensor;
    });
  }

  /* 
  Recorta una imagen al trozo indicado
  cropAndResizeFrame(img: tf.Tensor3D): tf.Tensor3D {
    return tf.tidy(() => {
      const expandedImage: tf.Tensor4D = tf.expandDims(cast(img, 'float32'), (0));
      let resizedImage;
      resizedImage = tf.image.cropAndResize(
          expandedImage, this.cropBox, this.cropBoxInd, this.cropSize,
          'bilinear');
      // Extract image from batch cropping.
      const shape = resizedImage.shape;
      return tf.reshape(resizedImage, shape.slice(1) as [number, number, number]);
    });
  } */

  mostrarDialogo(): void {
    this.dialogo
      .open(DialogoConfirmacionComponent, {
        data: `¿Te gusta programar en TypeScript?`
      })
      .afterClosed()
      .subscribe((confirmado: Boolean) => {
        if (confirmado) {
          alert("¡A mí también!");
        } else {
          alert("Deberías probarlo, a mí me gusta :)");
        }
      });
  }
  


}
