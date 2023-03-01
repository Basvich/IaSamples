# IaSamples

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.0.3. Update a angular 15

## Que hay
Es un proyecto que usa angular como base para probar diferentes ejecrcios relacionados con tensor flow JS. Y como usarlos de forma correcta. Algunos de los ejemplos son adaptaciones directas de los ejemplos obtenidos del libro **Leaning TensoFlow.js** Con algun pequeño cambio para que funcione.
La parte básica de interface de usuario no está cuidada, aunque la forma de usar las cosas es lo mas correcta posible para poder tener una referencia de como hacer de una forma correcta ciertas cosas. En la mayor parte de los casos, se usan botones para realizar por separado las distintas acciones que llevan a obtener un resultado, de esta forma se separa la funcionalidad para que quede mas claro.



### basic-functions

Es una prueba sobre como poder usar directamente algunas de las funciones de convolución existentes en la librería tfjs, sobre una imagen cualquiera.

### Toxicity

Es el uso de la red Toxicity, que permite clasificar una frase en ingles para ver si es una frase que puede ser considerada insultante o un ataque personal. La dificultad aquí residió en adaptar el código existente de la clase wraper que usa la red entrenada, ya que no cargaba correctamente el *tokenizer*.

### No linear

Es la creación de un modelo sencillo para aproximar una función no lineal. Se muestra como cargar los datos originales y los esperados para entrenar el modelo. Se incluye tambien lo básico para mostrar una gráfica con los datos originales y los aproximados.

### Titanic

Para probar lo básico de predecir resultados en base a la clasificación de unos resultados. En este caso se trata de usar los datos de todos los pasajeros del Titanic, obteniendo el resultado en base a clase, sexo, etc, la probabilidad de vivir o morir. Se usa la librería danfo.js para importar y tratar los datos originales, y tambien ver como usar la propia librería en un entonrno de Angular.

Es una adaptacion para web (angular) del capitulo 9 *Classification Models and Data Analysis* del libro *Learning TensorFlow.js*

#### links

- [danfo.js](https://danfo.jsdata.org/getting-started) y [danfo titanic](https://danfo.jsdata.org/examples/titanic-survival-prediction-using-danfo.js-and-tensorflow.js)
- [ejempos Leanring TensorFlow.js](https://github.com/GantMan/learn-tfjs)
- [datos titanic](https://github.com/GantMan/learn-tfjs/tree/master/chapter9/extra/titanic%20data)
- [flex css](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
