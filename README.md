# IaSamples

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.0.3.

## Que hay
Es un proyecto que usa angular como base para probar diferentes ejecrcios relacionados con tensor flow JS. Y como usarlos. Algunos de los ejemplos son adaptaciones directas de los ejemplos obtenidos del libro **Leaning TensoFlow.js** Con algun pequeño cambio para que funcione.


### basic-functions

Es una prueba sobre como poder usar directamente algunas de las funciones de convolución existentes en la librería tfjs, sobre una imagen cualquiera.

### Toxicity

Es el uso de la red Toxicity, que permite clasificar una frase en ingles para ver si es una frase que puede ser considerada insultante o un ataque personal. La dificultad aquí residió en adaptar el código existente de la clase wraper que usa la red entrenada, ya que no cargaba correctamente el *tokenizer*.

### No linear

Es la creación de un modelo sencillo para aproximar una función no lineal. Se muestra como cargar los datos originales y los esperados para entrenar el modelo. Se incluye tambien lo básico para mostrar una gráfica con los datos originales y los aproximados.

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
