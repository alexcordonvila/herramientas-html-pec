# PEC1
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

npm run build nos activa el modo producción. Parcel aquí genera la carpeta /dist y si que modifica el código, lo minifica, optimiza imágenes, añade hashes a los archivos para la caché de navegador...

Para el proyecto base se han añadido paquetes al module bundles Parcel que nos mejoran la manera en que trabajamos. 

Se ha añadido: 
 - npm install --save-dev rimraf npm-run-all


En el enunciado se indica que el formato de las url tiene que ser /categoria /det1 /det2 indicando que se espera el uso del sistema "Directory-based Routing" o "Clean URLs" por eso hemos definido una estructura de carpetas para organizar los accesos y dentro de cada carpeta su index.html.

Para que parcel detecte correctamente todos los "entry points" hemos modificado el package.json con el uso de patrones de búsqueda (glob):
```json
  "parcel:dev": "parcel src/**/*.html",
  "parcel:build": "parcel build src/*.html src/**/*.html --public-url ./",
```

3. Soporte a navegadores antiguos.
Se ha aprovechado el proceso de configuración inicial para añadir el campo "browserlist" al package.json con la configuración que se pide en el enunciado. Para ello hemos usado la configuración "last 10 years" y además hemos añadido "not dead" para excluir aquellos que no tienen soporte oficial o uso real actual. Hemos visto que esto ayuda a mantener un tamaño reducido de los archivos.
Hemos aprendido que podemos usar npx browserlist para ver una lista completa de los navegadores en función de nuestra configuración y que es importante saber que Parcel va a aumentar bastante el tamaño de la build final para dar soporte a esos navegadores de hasta 10 años de antiguedad.

4. Utilización de pre/postprocesadores.
A pesar de que se diga de postCSS no es un preprocessor comentaremos el uso del mismo en este apartado. Para que parcel empiece a usar postCSS creamos el fichero .postcssrc en la raiz del proyecto. Hemos usado autoprefixer (añade prefijos de navegadores para poder soportar css moderno en todos los navegadores) y css nano ``npm install cssnano``  (minimizador de css) para experimentar en el uso de post-procesamiento 
Como preprocesador extra hemos decidido usar SASS porque hasta este momento no lo he usado nunca y me parece un buen momento para usarlo aunque no aproveche todas sus funcionalidades. Nos permite escribir los estilos de manera más organizada, mayor reusabilidad, variables... 

5. Dependencia externa.
Para nuestra web de recomendaciones de restaurantes en Bilbao nos hemos planteado usar el paquete Leaflet para mostrar un mapa de los restaurantes. Se ha configurado siguiendo la documentación ```https://leafletjs.com/examples/quick-start/```. Para las 3 imagenes dentro de detalle hemos usado el paquete npm de SplideJS ```https://splidejs.com/```.

6. Semántica y accesibilidad.
Para validar la semántica hemos usado el Nu Html checker, siempre pasandole el html de la build para producción.
Hemos añadido aria-labels en los puntos necesarios como en botones de "ver detalles" en la página de categoria, en los buttons de la home o la navbar.

La acessibilidad de la web la hemos tratado siguiendo los siguientes puntos:
- Todas las imagenes de la web tienen el atributo `alt` con descripciones detalladas del contenido.
- Hemos seleccionado un color de fondo y letra con un contraste de 17:04:1 en la página de categoria validado en ```https://webaim.org/resources/contrastchecker/?fcolor=1C1C1C&bcolor=FFFFFF``` y de 15:19:1 en la página de detalles y links validado en ```https://webaim.org/resources/contrastchecker/?fcolor=1C1C1C&bcolor=F0F2F5```.
- Hemos añadido skip links siguiendo las recomendaciones de ```https://webaim.org/techniques/skipnav/```

7. Creación y publicación a Git y Github.
La creación del proyecto se ha hecho primero en local usando Parcel. Como parcel ya añade un .git en el proyecto generado hemos podido publicarlo en github siguiendo la documentación y que se puede encontrar en el siguiente enlace: https://github.com/alexcordonvila/herramientas-html-pec

8. Publicación a internet
Tener el proyecto en github nos ha permitido vincularlo facilmente a Netlify. Para ello hemos seguido los pasos de la documentación haciendo incapié en que el proyecto se encuentre en la raiz del repositorio para que la publicación sea sencilla. 
Hemos visto que Netlify nos ofrece 500 tokens para integración contínua y que si deployamos en la rama master enseguida nos quedamos sin tokens. Se ha decidido crear una rama para hacer previews ya que netrlify no descuenta tokens en deploys de ramas. Una vez tengamos versiones definitivas las iremos pasando a master gastando esos tokens.

# PEC2

1. Para el primer punto, como se pide que todas las imágenes del proyecto sean responsive y que al menos debe haber una imágen por cada técnica, hemos analizado los problemas actuales en las imágenes y donde podemos aplicar cada una de las técnicas.
   Hemos detectado que la imagen de la home es muy pesada y tarda en cargar.
   Hemos detectado que en /categoria usamos imagenes 
   
   - [x] Se ha usado la técnica de ancho variable (Descriptores w) en las imagenes que potencialmente vayan a variar de tamaño al mostrarse en diferentes dispositivos como en el carousel /det1 y /det2 o en las cards de /categoria. Para los breakpoints hemos usado una media del ancho de los dispositivos objetivo (móviles, tabletas y desktop). 400px para optimizar la carga en móviles básicos, 800px para tablets y móviles de alta densidad y 1200px para desktop. De esta manera aseguramos un equilibrio entre calidad visual y el peso del archivo que se va a descargar en el navegador.
   En este punto hemos aprendido que es muy importante tener en cuenta que los DPI del dispositivo que carga la página afectan en como el navegador va a pedir la imagen a descargar. Para calcular la imagen que el navegador va a descargar podemos usar este calculo:
   ```
    Ancho_Pantalla × %_Ocupado × DPR = Pixeles_Necesarios
   ```

  Por ejemplo, si tenemos una imagen en la web que siempre ocupa 400px de ancho y tenemos dos opciones en el srcset: una de 400w y otra de 800w.

  Para un "Monitor Estándar (DPI 1)", 400px × 1 = 400px. Entonces necesitamos 400 píxeles físicos y el navegador va a descargar la de 400w. En canvio, para un "Móvil/Laptop Retina (DPI 2)" el cálculo es 400px × 2= 800px, aunque el hueco mide 400, la pantalla es densa y necesita el doble para no verse borrosa y entonces el navegador va a descargar la de 800w.

   Tenemos que diferenciar entre el número de píxeles físicos y el de píxeles lógicos 
  
   - [x] Se ha usado la técnica de resolución variable en densidad 1x, 2x para las imagenes de tamaño fijo. Para ello hemos añadido un logotipo en la navbar donde poder aplicar esta técnica.
  
   - [x] Se ha usado la técnica de dirección de arte en la imagen principal de la home "hero image" y para la imagen destacada de las páginas de detalle /det1 y /det2. Para dispositivos mobiles mostraremos una imagen recortada mostrando mejor detalle del contenido. Al pasar a formato mobile hacemos el cambio de hero-image a hero-mobile.

2. Para el segundo punto hemos analizado todas las imágenes que estamos usando y hemos valorado qué formatos usar en cada caso. En la tabla siguiente mostramos el resultado de hacer el análisis del antes y después:

3. Se han añadido animaciones en los siguientes elementos:
   1. En la navbar se ha añadido una transición animada de subrallado al hacer hover encima de cada opción. Mencionar la fuente de documentación de esta animación: https://css-irl.info/animating-underlines/
   
   2. En la navbar se ha añadido una transición animada de color de letra al hacer hover encima de cada opción.
   3. En la página de /categorias se ha añadido una animación por CSS en las cards que afecta a la opacidad y a la escala haciendo que en lugar de que aparezcan las cards de golpe, aparecen de manera suave y dinámica.

4. Se ha añadido un elemento svg en la homepage animado por CSS añadiendo el svg directamente en el html para poder animarlo por CSS. La alternativa a esto era añadir la animación dentro del svg para cargarlo como <object> pero con ello no podemos cumplir la condición de animarlo por CSS como se explicita en el enunciado. Añadiendo el svg dentro del HTML es la manera de que la animación cargue más rápido evitando retardos por cargarlo desde archivo.

