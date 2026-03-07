1. Proceso de desarrollo para generar la plantilla de inicio con Parcel.
En primer lugar hemos verificado que tenemos node a una versión superior a la 20.x. con "node -v".
Luego hemos seguido la documentación de Parcel para crear el proyecto base con:
"npm create parcel vanilla herramientas-html-pec" y hemos verificado que se ha creado correctamente usando npm start.

En este punto se ha aprovechado para subir el proyecto a Github y conectarlo a la vez con Netlify desde un inicio para trabajar con continuous deployment.
En netlify nos ha costado deployar porque en base directory poniamos el nombre de la carpeta base, al final lo hemos dejado vacío porque si el proyecto se encuentra directamente en la raiz la documentación recomienda dejar ese campo vacío.


2. Definición de entornos de producción y desarrollo.
Cuando hemos instalado parcel hemos modificado el package.json para poder configurar dos entornos distintos a traves de scripts:

```json
"scripts": {
    "start": "parcel",
    "build": "parcel build"
  },
```
npm start activa el modo desarrollo, nos lanza el servidor local y la recarga en vivo. No se lanza ningún optimizador ni minificador para poder depurar el codigo.

3. Soporte a navegadores antiguos.
4. Utilización de pre/postprocesadores.
5. Dependencia externa.
6. Semántica y accesibilidad.
7. Creación y publicación a Git y Github.
8. Publicación a internet