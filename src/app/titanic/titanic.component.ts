import { Component } from '@angular/core';
import * as dfd from 'danfojs';
import { DataFrame } from 'danfojs/dist/danfojs-base';
import { CsvInputOptionsBrowser } from 'danfojs/dist/danfojs-base/shared/types';

/* eslint-env browser */

//const titanicTrainCsv = "https://raw.githubusercontent.com/pcsanwald/kaggle-titanic/master/train.csv"; //esta viene con los nombres entre comillas
//const titanicTrainCsv = 'assets/titanic/titanic.csv';//'https://web.stanford.edu/class/archive/cs/cs109/cs109.1166/stuff/titanic.csv';
const titanicTrainCsv = 'assets/titanic/titanic.train.csv';

@Component({
  selector: 'app-titanic',
  templateUrl: './titanic.component.html',
  styleUrls: ['./titanic.component.scss']
})
export class TitanicComponent {
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
    s.print()
  }

  public async testDanfoLoadCsv() {
    const df = await dfd.readCSV("https://raw.githubusercontent.com/plotly/datasets/master/finance-charts-apple.csv");
    const new_df = df.setIndex({ column: "Date", drop: true }); //resets the index to Date column
    new_df.head().print();
  }

  public async testLoadTitanic() {
    const parms = {};
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
    } catch (error) {
      console.error(error);
    }
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
    df.drop({columns: ["name", "passengerId", "ticket", "cabin"], inplace:true});
    //Se eliminan filas que sigan conteniendo datos vacios/invalidos
    df.dropNa({axis:1, inplace:true}); //El eje 0: columnas, 1: filas

    //Convierte textos repetidos en labels numericas, o sea en nmúmeros
    const encoder = new dfd.LabelEncoder()
    const cols = ["sex", "Embarked"]; //Columnas que se modifican hacia labels (numeros)
    cols.forEach(col => {
      encoder.fit(df[col]);
      const enc_val = encoder.transform(df[col])
      df.addColumn(col, enc_val, { inplace: true })
    });
    //Tambien se podría haber realizado: df["Embarked"] = encoder.transform(onlyFull["Embarked"].values);
    df.head().print()
    return df;
  }

  /** Renombra columnas que estén en mayusculas a minusculas. Permite usar distintos csvs que nos vienen con distintas capitalizaciones */
  private renameColumnsNameToLower(df: DataFrame) {
    function isUpper(c: string): boolean { return c == c.toUpperCase(); }
    const toChange = df.columns.filter(n => (!n) && (n.length > 0) && isUpper(n.charAt(0)));
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
}
