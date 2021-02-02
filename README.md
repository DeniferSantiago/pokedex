# _Denifer Pokedex_

Este proyecto es una prueba de conocimientos de React, en este he utilizado la siguiente lista de librerias:

1. `aws-amplify` framework de amazon, en este caso solo se usa Cognito.
2. `react-router-dom` libreria para implementar navegacion tipo spa.
3. `redux` librería de administración de estado de la app.
4. `react-redux` librería puente para integrar redux con react.
5. `@material-ui` librería de componentes siguiendo la guia de material design.

### Modo Desarollo

Para correr este proyecto en modo desarollo debes seguir los siguientes pasos:

1. `git clone "https://github.com/DeniferSantiago/pokedex.git"` clonar el repositorio.
2. Abrir la carpeta del repositorio en su editor preferido, luego ejecutar `npm i` en la raíz del proyecto.
3. Si no ha instalado amplify siga este [tutorial](https://docs.amplify.aws/start/getting-started/installation/q/integration/react), luego de instalado ejecute `amplify env add` en la raiz del proyecto.
4. Luego ejecute `amplify push`.
5. Ejecute `npm run serve` para iniciar el servidor de desarrollo, este abrira el proyecto en su navegador.

### Modo Producción
Siga los pasos del modo desarrollo y siga estos simples pasos.

1. Compile la aplicación ejecutando `npm run build`.
2. Publique la app al servidor estatico en amazon ejecutando `amplify publish`.

*Nota: debe crear una cuenta para poder utilizar el proyecto, se le enviará un codigo al correo que provea para confirmar la cuenta luego de eso podra utilizar normalmente el proyecto.*

Puede utilizar el proyecto sin hacer nada accediendo [aqui](https://d1hz8odaehrigp.cloudfront.net/).