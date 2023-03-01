import { AfterViewInit, Component, ViewChild } from '@angular/core';
import * as dfd from 'danfojs';
import { DataFrame } from 'danfojs/dist/danfojs-base';
import * as tf from '@tensorflow/tfjs';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ArrayType1D } from 'danfojs/dist/danfojs-base/shared/types';

/* eslint-env browser */

interface IClases {
  [key: string]: { [key: string]: number };
}

//const titanicTrainCsv = "https://raw.githubusercontent.com/pcsanwald/kaggle-titanic/master/train.csv"; //esta viene con los nombres entre comillas
//const titanicTrainCsv = 'assets/titanic/titanic.csv';//'https://web.stanford.edu/class/archive/cs/cs109/cs109.1166/stuff/titanic.csv';
const titanicTrainCsv = 'assets/titanic/titanic.train.csv';

@Component({
  selector: 'app-titanic',
  templateUrl: './titanic.component.html',
  styleUrls: ['./titanic.component.scss']
})
export class TitanicComponent implements AfterViewInit {

  private preparedData?: DataFrame;
  public displayedColumns: Array<string> | undefined;
  public dataSource = new MatTableDataSource();
  public CurrentClases: IClases | undefined;
  @ViewChild('paginator1') paginator!: MatPaginator;  //Referencia directa al elemento html
  @ViewChild(MatTable) table!: MatTable<any>;


  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  /** Se comprueba que la librería carga bien y se puede usar */
  public testDanfo() {
    //Datos normales
    var data = {
      A: ['foo', 'bar', 'foo', 'bar', 'foo', 'bar', 'foo', 'foo'],
      B: ['one', 'one', 'two', 'three', 'two', 'two', 'one', 'three'],
      C: [1, 3, 2, 4, 5, 2, 6, 7],
      D: [3, 2, 4, 1, 5, 6, 7, 7],
    };

    const df = new dfd.DataFrame(data);
    const grp = df.groupby(['A']).col(['C', 'D']);
    console.log(grp);
    console.log(grp.sum().print());

    //Datos usando tensorflow
    const tf = dfd.tensorflow //Tensorflow.js is exportedfrom Danfojs
    const tensor_arr = tf.tensor([12, 34, 56, 2])
    const s = new dfd.Series(tensor_arr)
    s.print();
    //Realizando un encoder
    const encoder = new dfd.LabelEncoder();
    const d=encoder.fit(df['A']);
    const enc_val = encoder.transform(df['A'])
    const df2=df.drop({ columns: ["A"], inplace: false });    
    df.head().print();
    df2.head().print();
    df2.addColumn('A',enc_val, {inplace:true});
    df2.head().print();
    let cm=df2.column('A'); 
    //cm=df.column('AA');
    df.head().print();

  }

  public async testDanfoLoadCsv() {
    const df = await dfd.readCSV("https://raw.githubusercontent.com/plotly/datasets/master/finance-charts-apple.csv");
    const new_df = df.setIndex({ column: "Date", drop: true }); //resets the index to Date column
    new_df.head().print();
  }

  public async testLoadTitanic() {

    try {
      let df = await dfd.readCSV(titanicTrainCsv);
      //do something with the CSV file
      df.head().print();
      df.ctypes.print();
      this.countEmptySpots(df);
      df = this.prepareData(df);
      /* const df2 = df.dropNa();
      df2.describe().print(); */
      // Print the describe data
      //df.describe().print();
      // Count of empty spots      

      const df2 = this.standarizeData(df);
      this.preparedData = df2;
      /* const jsss=dfd.toJSON(df2);
      console.log(jsss); */
    } catch (error) {
      console.error(error);
    }
  }

  public async trainData() {
    if (!this.preparedData) throw new Error("No data");
    //Los datos de entrada son todos a partir de la primera columna (0 index)
    const trainX = this.preparedData.iloc({ columns: [`1:`] }).tensor;
    //los datos deseados de salida, son la columna sobrevivió
    const trainY = this.preparedData["survived"].tensor;
    const model = this.getModel();
    model.compile({
      optimizer: "rmsprop",
      loss: 'binaryCrossentropy',
      metrics: ['accuracy'],
    });
    console.log("Training started....")
    await model.fit(trainX, trainY, {
      batchSize: 32,
      epochs: 30,
      validationSplit: 0.2,// Asking the model to save 20% for validation on the fly
      callbacks: {
        onEpochEnd: async (epoch, logs) => {
          if (logs) console.log(`EPOCH (${epoch + 1}): Train Accuracy: ${(logs['acc'] * 100).toFixed(2)}, Val Accuracy:  ${(logs['val_acc'] * 100).toFixed(2)}\n`);
        },
        onTrainEnd: async () => {

        }
      }
    });

  }

  public showDataInTable(df?: DataFrame) {
    const df2 = df ?? this.preparedData;  //feo
    if (!df2) return;
    const jss = dfd.toJSON(df2);
    const cols = TableHelper.CalcColums(jss as any[]);
    this.displayedColumns = cols;
    const ds = jss as any[];
    this.dataSource.data = ds; //new MatTableDataSource(ds);
    //this.table.renderRows();
  }

  private countEmptySpots(df: DataFrame) {
    const empty_spots = df.isNa().sum();
    empty_spots.print();
    // Find the average
    const empty_rate = empty_spots.div(df.isNa().count());
    empty_rate.print();
  }

  private prepareData(df: DataFrame): DataFrame {
    this.renameColumnsNameToLower(df);

    // Se eliminan columnas que no sirven
    df.drop({ columns: ["name", "passengerId", "ticket", "cabin"], inplace: true });
    //Se eliminan filas que sigan conteniendo datos vacios/invalidos
    df.dropNa({ axis: 1, inplace: true }); //El eje 0: columnas, 1: filas

    //Convierte textos repetidos en labels numericas, o sea en nmúmeros
    const encoder = new dfd.LabelEncoder()
    const cols = ["sex", "embarked"]; //Columnas que se modifican hacia labels (numeros)
    const clases: IClases = {};
    cols.forEach(col => {
      const d = encoder.fit(df[col]);
      const clas = d.classes; //La correspondencia entre labels y valores
      clases[col] = clas;
      const enc_val = encoder.transform(df[col])
      df=df.addColumn(col, enc_val, { inplace: true })
    });
    this.CurrentClases = clases;
    //Tambien se podría haber realizado: df["Embarked"] = encoder.transform(onlyFull["Embarked"].values);
    df.head().print()
    return df;
  }

  private standarizeData(df: DataFrame): DataFrame {    
    /* const data = {
      fruits: ['pear', 'mango', "pawpaw", "mango", "bean"],
      Count: [20, 30, 89, 12, 30],
      Country: ["NG", "NG", "GH", "RU", "RU"]
    };
    const dff = new dfd.DataFrame(data);
    dff.print();
    const dum_df = dfd.getDummies(dff,{ columns: ['fruits']});
    dum_df.print(); */

    //La columna sexo , se va a transformar en 2 columnas separadas para hombre mujer, que es mejor que una sola entre 0-1
    /*  const sexOneHot = dfd.getDummies(df, { columns: ['sex'], prefix:'P' });
    df.drop({ columns: 'sex', inplace: true });
    df.addColumn('male', sexOneHot['0']);
    df.addColumn('female', sexOneHot['1']); */
    console.log(df.columns);  
    df.ctypes.print(); 
    let cm=df.column('embarked'); 
    cm=df.column('sex');
    if (false && !!this.CurrentClases) {
      /* var v1 = this.CurrentClases['sex']['male'];   
      df.head().print();   
      df.ctypes.print();
      const cm=df.column('sex');
      const male = (cm.apply((x: number) => { return x == v1 ? 1 : 0 }).values) as ArrayType1D;
      //replace in df
      df.addColumn("male", male, { inplace: true });
      v1 = this.CurrentClases['sex']['female'];
      const female = df['sex'].apply((x: number) => { return x == v1 ? 1 : 0 }).values
      df.addColumn('female', female);
      df.drop({ columns: 'sex', inplace: true }); */
    }
    const scaler = new dfd.MinMaxScaler();
    //Obtiene los maximos y minimos de cada columna
    const sf = scaler.fit(df);
    //Normaliza todas las columnas con esos maximos y minimos para tener valores entre [0,1]
    const df2 = scaler.transform(df);

    return df2;
  }

  /** Renombra columnas que estén en mayusculas a minusculas. Permite usar distintos csvs que nos vienen con distintas capitalizaciones */
  private renameColumnsNameToLower(df: DataFrame) {
    function isUpper(c: string): boolean {
      console.log('letra', c);
      return c == c.toUpperCase();
    }
    isUpper('Pollo'.charAt(0));
    const toChange = df.columns.filter(n => (!!n) && (n.length > 0) && isUpper(n.charAt(0)));
    if (toChange.length == 0) return;
    const rc: { [old: string]: string } = {};
    toChange.forEach(element => {
      const nName = element.charAt(0).toLowerCase() + element.slice(1);
      rc[element] = nName;
    });
    df.rename(rc, { inplace: true });
  }

  /** Cambia la columna de nombre para tener solo el titulo asociado al nombre */
  private refactorNameWithTitle(df: DataFrame) {
    //A feature engineering: Extract all titles from names columns, nos quedamos solo con el Mrs, Miss...   
    const title1 = df['name'].apply((x: string) => {
      return x.split(".")[0];
    });
    const title = title1.values;  //title tiene solo Mr, Miss, Mrs...
    df.addColumn("name", title, { inplace: true }); //replace in df
  }

  /**
   * Devuelve el modelo para la red. (según https://danfo.jsdata.org/examples/titanic-survival-prediction-using-danfo.js-and-tensorflow.js)
   * @returns 
   */
  private getModel(): tf.Sequential {
    const model = tf.sequential();
    model.add(
      tf.layers.dense({
        inputShape: [7],
        units: 124,
        activation: 'relu', 
        kernelInitializer: 'leCunNormal'
      }));
    model.add(tf.layers.dense({ units: 64, activation: 'relu' }));
    model.add(tf.layers.dense({ units: 32, activation: 'relu' }));
    model.add(tf.layers.dense({ units: 1, activation: "sigmoid" }))
    model.summary();
    return model;
  }

  private getModel2(inputShape: tf.Shape) {
    const model = tf.sequential();
    model.add(
      tf.layers.dense({
        inputShape,
        units: 120,
        activation: "relu",
        kernelInitializer: "heNormal",
      })
    );
    model.add(tf.layers.dense({ units: 64, activation: "relu" }));
    model.add(tf.layers.dense({ units: 32, activation: "relu" }));
    model.add(tf.layers.dense({ units: 1, activation: "sigmoid", }));
    model.summary();
    model.compile({
      optimizer: "adam",
      loss: "binaryCrossentropy",
      metrics: ["accuracy"],
    });

    return model;
  }

}

class TableHelper {
  /**
   * Devuelve las columnas para una tabla
   * @param data 
   * @returns 
   */
  static CalcColums(data: any[]): string[] {
    const res: string[] = [];
    if (data.length <= 0) throw new Error("No data");
    const f = data[0];
    for (const p in f) {
      res.push(p);
    }
    return res;
  }
}
