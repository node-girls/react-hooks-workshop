# Taller IG con React NodeGirlsMadrid 29F
Bienvenidas!!!!

> 👉 Las slides de la primera parte [las puedes ver aquí](https://slides.com/yunevk/taller-react-nodegirls/live#/).

## ¿Qué vamos a hacer?
Vamos a hacer una app basada (siempre basada, nunca copiada...) en instagram. Así podremos ver las fotos de nuestras compis de taller y presumir de las cosas molonas que estamos haciendo.

La pinta que esperamos que tenga es esta:

<p align="center">
  <img alt="Aplicación NodeGirls" height="600" src="/nodegirls-ig.gif">
</p>

Con las slides como fondo ya os hemos contado los principales aspectos técnicos de React. Como siempre, la mejor forma de quedarnos con ellos es embarrarnos y cacharrear, así que allá vamos.

## ¿Qué pasos vamos a serguir?

1. Montaremos el proyecto.

2. Haremos un poco de __arquitectura__ básica con los componentes fundamentales.

3. Añadiremos los estilos e imágenes necesarias para que luzca.

4. Les daremos un poco de vidilla sencilla para empezar, ¿cómo?
  * seteando nuestra variable de estado

  * modificando esta variable de estado con __funciones de primer orden__ (no asustarse todavía, nos hacen el favor ;P);

    > :warning: A partir de aquí viene la caña, pero os lo vamos a contar suuuuper bien, así que __nonti preocupare__ (o como se diga).

5. Mostraremos los post que están almacenados en el super back que nos ha montado Irene. Aquí van a entrar en juego unos cuantos conceptos y técnicas interesantes como:
  * Llamada a la API.
  * El hook `useEffect`.
  * Renderizado condicional.
  * Mapeo de arrays para generar elementos html.

6. Cargaremos la imagen que queramos subir.

7. Mostraremos los filtros aplicados a nuestra imagen para poder elegir el que más nos favorece.

8. Con un elemento `textarea` habilitaremos la opción de subir un comentario a lo Paulo Cohello.

9. Cuando ya tengamos todos los datos que compongan cada elemento post, lo subiremos a la base de datos.

10. Por último, veremos como manejar los likes y dislikes (por si le damos sin querer me gusta a la foto de ese petardo que nos cae fatal).

## Inicializar el proyecto y API

Antes de empezar con nuestra aplicación de React, tenemos que levantar un servidor con una API para poder conectarnos a ella, pero que no cunda el pánico!! Irene se ha currado una API muy fácil de usar para que no nos tengamos que preocupar para nada del back. ;)

Así que, en otra instancia de la consola, solo tenemos que ejecutar el siguiente comando:

```
npx github:IrenePEncinar/express-instagram
```

Y así podremos acceder desde `localhost:3000`! Volvamos ahora a nuestra aplicación para conectarnos.

Ahora sí, vamos a inicializar el proyecto de React:

1. Instala `create-react-app` con el comando `npm install -g create-react-app`.
2. Inicializa el proyecto con el comando: `create-react-app ig-ngm`.
3. Cambia a la capeta que contiene el código y abre tu IDE.

## Arquitectura del proyecto
Como vemos `create-react-app` nos ha creado una estructura básica del proyecto. La magia la vamos a hacer dentro de la capeta `src` y vamos a dividir nuestro código entre los componentes de UI o _dummies_ y los compoenents que se responsabilizan de las 
acciones o _containers_.

En nuestro caso, solo tendremos un componente _container_ que le vamos a llama `Home.jsx` y el resto serán componentes de UI. 

Como primer paso, vamos a crear la estructura de carpetas que necesitaremos:

```
src/
  components/
    Body.jsx
    Footer.jsx
    Header.jsx
  containers/
    Home.jsx
```
## Añadiendo estilos e imágenes

Antes de empezar con la caña, vamos a añadir primero los archivos necesarios para que nuestra aplicación luzca bien.

Hemos preparado este CSS para que lo insertes en `index.css`, con las clases que utilizaremos a continuación. Por eso, solo tienes que acceder a [este enlace](https://raw.githubusercontent.com/Maritxis/ig-ngm-pruebas/master/src/index.css), copiar el código y pegarlo en tu archivo `index.css`.

No solo vamos a añadir estilos, también tendremos algunos iconos. Recuerda que los archivos estáticos de la aplicación (como las imágenes) las tienes que añadir dentro la carpeta `public` que se ha generado con `create-react-app`. Por eso, necesitamos una estrcutura así:

```
public/
  img/
```

Es decir, vamos a crear una carpeta `img` dentro de `public`. Dentro de esta carpeta añadiremos los siguientes iconos (abre cada enlace para copiar su contenido):

- [`camera.svg`](https://raw.githubusercontent.com/Maritxis/ig-ngm-pruebas/master/public/img/camera.svg)
- [`heart.svg`](https://raw.githubusercontent.com/Maritxis/ig-ngm-pruebas/master/public/img/heart.svg)
- [`home.svg`](https://raw.githubusercontent.com/Maritxis/ig-ngm-pruebas/master/public/img/home.svg)
- [`left-arrow.svg`](https://raw.githubusercontent.com/Maritxis/ig-ngm-pruebas/master/public/img/left-arrow.svg)
- [`nodegirls.svg`](https://raw.githubusercontent.com/Maritxis/ig-ngm-pruebas/master/public/img/nodegirls.svg)
- [`right-arrow.svg`](https://raw.githubusercontent.com/Maritxis/ig-ngm-pruebas/master/public/img/right-arrow.svg)
- [`share.svg`](https://raw.githubusercontent.com/Maritxis/ig-ngm-pruebas/master/public/img/share.svg)

> ⚠️ Para no extender más el taller, vamos a tener todo el código CSS en un archivo, pero lo ideal es que el código CSS relativo a cada componente esté en archivos diferentes, y sea cada componente el que importe su archivo CSS. Esta refactorización la puedes hacer después. 😉

Por último, tendremos que añadir los estilos para poder mostrar los filtros, y para eso vamos a usar [CSSGram](https://una.im/CSSgram/). Es muy fácil añadirlo! Solo tienes que incluir la siguiente línea en tu archivo `/public/index.html`, más concretamente dentro de la etiqueta `<head>`.

```
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/cssgram/0.1.10/cssgram.min.css">
```

Ya tenemos nuestro _setup_, así que continuamos con los componentes.

## Montando los componentes básicos: Header, Body y Footer

Vamos a tener tres componentes básicos en nuestra página (a parte de dos más que nos permitirán tener el código separado por responsabilidades independientes). Estos son:
* **Header**
* **Body** (que va a ser la parte principal de la aplicación)
* **Footer**

Vamos a crear la estructura básica de un componente en React:

```js
import React from 'react';

const Component = () => ({});

export default Component;
```
Este paso lo repetiremos para cada uno de los componentes con sus correspondientes nombres. 

Como inicialmente queremos saber que están ahí, podéis darle un poco de contenido, un `button` un `header` o cualquier cosa que os apetezca. __Any way__, si levantamos la aplicación (por si alguien ha olvidado el comando __menos utilizado__ en la historia: ```npm start```), todavía no vamos a ver nada, __niente__, __nothing de nothing__... y ¿porqueéééééé? pues sencillamente, porque no hay nadie que haga uso de estos componentes. Creemos pues `Home` el elemento __Body__ e incluyamos nuestros __dummies__ pero __loved__, components.

```js
import React from 'react';
import Header from '../components/Header';
import Body from '../components/Body';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <>
      <Header/>
      <Body/>
      <Footer/>
    </>
  )
}

export default Home;
```
A su vez, este tendremos que llamarlo desde App para que sea visible: 


```js
import React from 'react';
import Home from './containers/Home';
import './App.css';

function App() {
  return (
    <div className="App">
      <Home></Home>
    </div>
  );
}

export default App;
```

Ahora sí, ahora levantaremos nuestra aplicación y podremos ver esas __preciosidades__ de componentes en pantalla.

## Dando contenido a nuestros _dummy components_
Vamos a ver qué va a hacer cada uno de nuestros componentes y a añadirles el código que necesitan.

### Header
Este componente debe permitirnos navegar entre pantallas cuando estemos cargando la imagen y deberá permitirnos cancelar el post. Para ello vamos a incluir condicionalmente cuatro botones que estarán o no estarán dependiendo del paso en el que estemos.

Y nuestro componente `Header` quedaría así:

```js
import React from 'react';

const Header = ({ step}) => {
  return (
    <header>
      {step ===1 && <button><img src="/img/nodegirls.svg" className="icon logo" alt="Home" /></button>}
      {(step === 2 || step === 3) && <button><img src="/img/nodegirls.svg" className="icon logo" alt="Home" /></button>}
      {(step ===1 || step === 2) && <button><img src="/img/right-arrow.svg" className="icon" alt="Siguiente" /></button>}
      {step === 3 && <button><img src="/img/share.svg" className="icon" alt="Enviar" /></button>}
    </header>
  );
};

export default Header;
```
Donde `step` es el paso del flujo de carga de imágenes.

### Footer

Este es el componente que nos va a permitir subir las imágenes. Para ello, incluiremos un botón que permita navegar a la pantalla de inicio y un input para seleccionar el archivo que queremos subir.

```js
import React from 'react';

const Footer = ({ step }) => {
  return (
	<footer>
    <button><img src="/img/home.svg" className="icon" alt="Home" /></button>
    <div className="upload-btn-wrapper">
      <button><img src="/img/camera.svg" className="icon" alt="Subir imagen" /></button>
      <input
        type="file"
        name="file"
        id="file"
        className="file"
        disabled={step !== 1} />
    </div>
  </footer>
  );
};

export default Footer;
```
Igual que en componente anterior, `step` nos permite conocer el paso en el que estamos en el flujo de subir la imagen.

### Body
De momento, inicializaremos este componente de una forma muy básica, simplemente vamos a hacer que nos muestre el paso en el que nos encotramos. Así, `Body` nos queda tal que:

```js
import React from 'react';

const Body = ({ step }) => {
  return (
    <main>
      <h2>Body in step {step} </h2>
    </main>
  );
};

export default Body;
```
## Step, nuestra primera variable de estado, nuestro primer hook

Vemos que nuestros tres componentes dependen de la variable step que les pasamos como propiedad. Esta propiedad, `step` debe venir y ser manejada en el componente `Home`, pero ¿cómo? ¿como variable de estado? ¿porquéééeéééé motivooooo? :scream:

Bueno, el motivo no es especialmente sencillo, vamos a intentar explicarlo aquí, aunque seguramente, si estás haciendo el taller en vivo la explicación sea mejor. Cuando pasamos una propiedad a un componente hijo, este solo se va a actualizar si forma parte o bien de las propiedades o bien del estado del padre. Cualquier otro tipo de variable dentro del scope del componente padre que mute su valor, no se vería reflejada en el hijo.

Dicho lo cual, veamos cómo se traduce esto en código: necesitamos utilizar el método `useState` de React. Este método nos devuelve un array con dos valores, el primero, el de nuestra variable de estado y el segundo, el de la función que hemos de invocar cada vez que necesitemos mutar dicha variable, en otras palabras: 

```js
import React, { useState } from 'react';
import Header from '../components/Header';
import Body from '../components/Body';
import Footer from '../components/Footer';

const Home = () => {
  const [step, setStep] = useState(1);
  return (
    <>
      <Header
        step={step}
      />
      <Body
        step={step}
      />
      <Footer
        step={step}
      />
    </>
  )
}

export default Home;
```

## Funciones como ciudadanos de primera: pasando lógica entre componentes
Hasta el momento, nuestros componentes `Header` y `Footer`, contienen unos botones estupendísimos y preciosísimos que no hacen ná de ná. Necesitamos darles un poco de vida, pero, sobre todo de lógica. 

> :hand: One minute!!!!! ¿No habíais dicho que `Header`, `Footer` y `Body` eran componentes UI si ninguna lógica? Bingoooo!!!!! :tada: Así es, premio para tí, pequeña padawan por estar atenta. Entonces... ¿Cómo hago para darles ese soplo de vida y espíritu y que esos botones e input sirvan para algo más que para mostrar una interfaz bonita?

Para esos menesteres, vamos a hacer uso de una de las características más molonas de JavaScript que es que las funciones son ciudadanos de primera categoría, oiga, nada que envidiarles a sus primos los objetos, strings, numbers ni ningún otro. Y si estos últimos, pueden venir como parámetros de una función otra función no va a ser menos. Así, nuestros _dummy components_ quedarían:

```js
const Header = ({ step, handleGoHome, handleShare, handleNext }) => {
  return (
    <header>
      {step ===1 && <button onClikc={handleGoHome}><img src="/img/nodegirls.svg" className="icon logo" alt="Home" /></button>}
      {(step === 2 || step === 3) && <button onClick={handleGoHome}><img src="/img/nodegirls.svg" className="icon logo" alt="Home" /></button>}
      {(step ===1 || step === 2) && <button onClick={handleNext}><img src="/img/right-arrow.svg" className="icon" alt="Siguiente" /></button>}
      {step === 3 && <button onClick={handleShare}><img src="/img/share.svg" className="icon" alt="Enviar" /></button>}
    </header>
  );
};
```

Donde:

  * `step`: es el paso del flujo de carga de imágenes.
  * `hadleGoHome`: es la función que nos va a permitir navegar hasta la primera pantalla.
  * `handleNextStep`: es la función que nos permitirá navegar hasta a siguiente pantalla.
  * `handleSharePost`: es una función que navegará a home y lanzará la petición post con los datos.

```js
const Footer = ({ step, handleGoHome, handleUploadImage }) => {
  return (
    <footer>
    	<button onClick={handleGoHome}><img src="/img/home.svg" className="icon" alt="Home" /></button>
    	<div className="upload-btn-wrapper">
      	<button><img src="/img/camera.svg" className="icon" alt="Subir imagen" /></button>
      	<input
          type="file"
          name="file"
          id="file"
          className="file"
          disabled={step !== 1}
          onChange={handleUploadImage} />
    	</div>
  	</footer>
  );
};
```

Donde `step` y `handleGoHome` son los mismos elementos definidos para el componente `Header`, `handleUploadImage` va ser la función que suba imágenes y el `input` va a estar deshabilitado en cualquier pantalla que no sea la inicial.

Por supuesto, estas funciones habrán de venir definidas en algún lado. La lógica la definimos dentro de los _containers_. Nosotras, hoy solo tenemos un _container_, `Home`, en el que definiremos lo que queremos que haga cada una de estas funciones:

```js
import React, { useState } from 'react';
import Header from '../components/Header';
import Body from '../components/Body';
import Footer from '../components/Footer';

const Home = () => {
  const [step, setStep] = useState(1);
  const handleGoHome = () => setStep(1);
  const handleNext = () => setStep(step + 1);
  const handleShare = () => {};
  const handleUploadImage = () => {};
  return (
    <>
      <Header
        step={step}
        handleShare={handleShare}
        handleGoHome={handleGoHome}
        handleNext={handleNext}
      />
      <Body
        step={step}
      />
      <Footer
        step={step}
        handleGoHome={handleGoHome}
        handleUploadImage={handleUploadImage}
      />
    </>
  )
}

export default Home;
```

Hasta el momento, tenemos una app que nos permite navegar entre pantallas, y cambiar la variable de estado `step`. Hemos aprendido varias cositas interesantes, hemos hecho nuestros primero pinitos con _jsx_, con el _state_ de un componente, con los hooks, con sus propiedades... Hemos hecho un montón de cosas pero sinceramente, esa app, hasta aquí no es muy divertida. _Stay with us_, ahora vamos a entrar en la parte con más enjundia del taller!!! :mag:

## Carga inicial de los posts

> :warning: **Warning!!!!** La carga inicial de los posts es un poco compleja!!!! Keep your eyes :eyes: and ears :ear: open!!!

El componente `Body` será el que nos muestre el contenido de los post de nuestro IG. Por ello, como medida inicial lo primero que haremos, será la carga de los mismos.

Posts es una variable que pasaremos como propiedad al componente Body. Puesto que nos interesa que cada vez que `posts` varíe su valor, `Body` se actualice, hemos de establecerla como parte del estado de` Home`. Esto lo hacemos de manera análoga a como hacíamos con `step`.
```js
const [posts, setPosts] = useState([]); 
```

Por otra parte hemos de incluir la petición a back. Vamos a separar este proceso en varios pasos:
1. **instalación del módulo de node axios** que nos va a facilitar realizar y procesar las peticiones: 
``` npm i -S axios ```
2. **Importaremos el módulo** axios en `Home`:
``` import axios from 'axios' ```
3. Queremos que la petición se realice la primera vez que se "monta" nuestro componente, para ello usaremos el _hook_ `useEffect`, al que le pasaremos como dependencia un array vacío. El hecho de que no tenga dependencias, evita que entremos en un bucle infinito:
```js
  const getPosts = async () => {
    const res = await axios.get('http://localhost:3000/api/posts');
    setPosts(res.data);
  } 
  useEffect(() => {
    getPosts();
  }, []);
```
Una vez obtenidos los datos, estos se pasarán a `Body` (componente encargado de mostrarlos) como propiedades.

Este es el código de `Home` y de `Body` en este punto del taller: 

* **Home**:

```js
import React, { useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Body from '../components/Body';
import Footer from '../components/Footer';

const Home = () => {
  const [step, setStep] = useState(1);
  const [posts, setPosts] = useState([]); 
  const handleGoHome = () => setState(1);
  const handleNext = () => setState(step + 1);
  const handleShare = () => {};
  const handleUploadImage = () => {};
  const getPosts = async () => {
    const res = await axios.get('http://localhost:3000/api/posts');
    setPosts(res.data);
  } 
  useEffect(() => {
    getPosts();
  }, []);
  return (
    <>
      <Header
        step={step}
        handleShare={handleShare}
        handleGoHome={handleGoHome}
        handleNext={handleNext}
      />
      <Body
        step={step}
        posts={posts}
      />
      <Footer
        step={step}
        handleGoHome={handleGoHome}
        handleUploadImage={handleUploadImage}
      />
    </>
  )
}

export default Home;
```
* **Body**:

```js
import React from 'react';

const Body = ({ step, posts }) => {
  return (
    <main>
      <h2>Body in step {step} </h2>
    </main>
  );
};

export default Body;
```

Vamos a hacer un componente específico para la visualización de los posts. Cada uno de los post que nos viene de back, tiene esta estructura: 

```
{
  username,
  userImage,
  postImage,
  filter,
  caption,
  hasBeenLiked,
  likes
}
```

así que contando con la info que queremos mostrar, nuestro compoente CardPost, tendrá esta pinta en código:

```js
import React from 'react';

const CardPost = ({post}) => {
  return (
    <article className="post">
      <div className="post-user">
        <img src={post.userImage} alt={post.username}/>
        <p>{post.username}</p>
      </div>
      <div className="post-content">
        <div className={post.filter}>
          <img className="img" src={post.postImage} alt="" />
        </div>
        <div className="post-info">
          <div className="post-likes">
            <button onClick={() => handleLikes(post)}> 
              <span><img src="/img/heart.svg" className={post.hasBeenLiked ? "liked" : "not-liked"}></img></span>
            </button>
            <p>{post.likes}</p>
          </div>
          <p>{post.caption}</p>
        </div>
      </div>
    </article>
  )
}
```
Ahora vamos a ver un poquito de la magia de react (bueno, después de los hooks, que los hooks molan mucho): por una parte vamos a hacer un renderizado condicional, ya que solo queremos mostrar los posts en caso de estar en el step uno y además vamos a hacer una cosa muy fncional y molona: generar html a partir del mapeo de un array de javascript. Esta maravilla de la naturaleza y del código, se hace introduciendo estas líneas en nuestro componente body

```js
  { step === 1 
    && <div className="posts">posts.map((post, index) => <CardPosts key={post.id} post={post}/>)</div>}
```
No olvidéis que:
1. `Body` debe importar `CardPost` o no podrá utilizarlo.
2. El _array_ de posts, le tiene que ser pasado a `Body` como _prop_.

## Subida del post: recogiendo la info
A continuación vamos a darle duro a la subida del post. Elegiremos una foto, un filtro, escribiremos un comentario inspiracional y lo guardaremos en la BBDD para la posteridad o hasta que reiniciemos back ;P.

### Subida de la imagen
Recordemos (que con todo lo que hemos hecho hasta el momento, igual ya ni nos acordamos de qué había en el footer), que en caso de estar en el step 1, habíamos habilitado un input de tipo file. Vamos a manejar la subida de archivos, enlazando el método `handleUpload` (en `Home`) con el evento `onChange` del `input`. Este `hanldeUpload` será el encargado de leer el archivo de la imagen, seter `image` como variable de estado y navegar al siguiente step.

```js
const handleUpload = (ev) => {
  const files = ev.target.files
  if (files.length){
    const reader = new FileReader();
    reader.readAsDataUrl(files[0]);
    reader.onLoad = (ev) => {
      setImage(ev.target.result);
      setStep(2);
    }
  }
}
```

No olvidéis que este método hay que enlazarlo con `Footer` como una propiedad del mismo.

### Eliginedo el mejor filtro: CardFilter y setFilter
Vamos a tener una serie de filtros disponibles, para que nuestras fotos sean lo más aparentes posibles y el resto de la humanidad se muera de envidia con esa foto tan original de nuestro pie frente al mar (sí, vamos necesitando y soñando con unas merecidas vacatas ;P).

Además de `components` y `containers`, dentro de `src`, crearemos una carpeta `data`que incluya algo de info necesaria. El primer archivo que incluiremos dentro de las misma será una lista de los filtros que tenemos disponibles. Es el archivo `filter.js` y los filtros son:

```js
export default [
  { name: 'normal' },
  { name: 'clarendon' },
  { name: 'gingham' },
  { name: 'moon' },
  { name: 'lark' },
  { name: 'reyes' },
  { name: 'juno' },
  { name: 'slumber' },
  { name: 'aden' },
  { name: 'perpetua' },
  { name: 'mayfair' },
  { name: 'rise' },
  { name: 'hudson' },
  { name: 'valencia' },
  { name: 'xpro2' },
  { name: 'willow' },
  { name: 'lofi' },
  { name: 'inkwell' },
  { name: 'nashville' }
]
```

En el step 2, mostraremos un listado de estos, aplicados sobre nuestra imagen. Vamos a crear un componente específico que nos permita hacer esto, se llamará ``CardFilter` y lo vamos a hacer, dentro de la carpeta `components`.

```js
import React from 'react';

const CardFilter = ({filter, image, setFilter}) => {
  return (
  <div className={filter.name}>
    <p>{filter.name}</p>
    <div
      className="img"
      id={filter.name}
      onClick={() => setFilter(filter.name)}>
        <img src={image} alt="" />
    </div>
  </div>
  )
}
```
Al igual que en los CardPosts, el renderizado de los componetes de filtros, será condicional, ya que solo lo vamos a hacer después de haber elegido una imagen (step 2) y se hará desde `Body` através de un `map` de los distintos filtros, estas líneas en nuestro `Body`, serán las responsables de dicho comportamiento:

```js
import CardFilter from './CardFilter';
import filters from '../data/filters';
```

```js
{step === 2
      && <div className="filter-container">{filters.map((filter => <CardFilter key={filter.name} image={image} filter={filter} setFilter={setFilter} />))}</div>}
```

Desde `Home`, filter debe setar establecida como variable de stado, y por tanto, también debemos haber definido setFilter para poder modificar su valor. No vamos a poner aquí el código porque hemos dado ya un montón la turra con las variables de stado y los hooks, os dejamos que le deis un poco al coco... y si a estar altura tenéis fitras las neuronas, podéis encontrar cómo hacerlo, en el código.

### ¿Cómo ser Paulo Coelho y dejar comentarios filosóficos? Solo necesitas un textArea y un setCaption.

Vengaaaa, chicas, que ya no nos queda ná de ná. Después de haber elegido el filtro más molón, navegaremos a la siguiente pantalla, clickando en el botón `Next` del `Header`, haciendo uso del método `handleNext` que setea el step a su valor más uno.

La última pantalla antes de guardar el post, mostrará la imagen con su filtro aplicado y nos permitirá dejar un comentario filosófico sobre lo hermosa que es la vida (recordemos que esto es IG, no tuiter, así que aquí no caben los haters, somos todo amor, salud y vacatas molonas). De nuevo, vamos a echar mano de un renderizado condicional denro de `Body`:

```js
{
  step === 3
  && 
  <>
    <div className="selected-image">
      <div className={filter}>
        <img className="img" src={image} alt="" />
			</div>
    </div>
    <div clas="caption-container">
      <textarea 
  			className="caption-input"
        name={}
        type="text"
        onChange={(ev) => setCaption(ev.target.value)}
        placeholder="Write a caption..."
      >
      </textarea>
    </div>
  </>
}
```

### Guardando la info: llamada a la API.
Y yaaaaaaa casiiiii lo tenemos. Solo nos falta implementar el método `handleShare` que haga la petición de guardado de los datos, vuelva al step 1 y actualice los posts:

```js
const savePost = async () => {
  const url = 'localhost:3000/api/posts';
  const post = {
    username: 'ngm',
    userImage: userImage, //imagen guardada dentro de la carpta data
    hasBeenLiked: false,
    likes: 0
    caption,
    filter,
    postImage: image,
  }
  const config = {
    method: 'post',
    url,
    data: post,
  }
  const res = await axios(config);
}

const handleShare = () => {
  savePost();
  setStep(1);
  setTimeout(() => getPosts());
}
```

## Likes y dislikes: interaccionando con los post de tus compis.

Bueno, bueno, bueno... esto ya... mola!!!! Solo una última cosita y es manejar las interacciones con los posts de nuestras coleguis!!! La variable `hasBeenLiked` es una variable `boolean` que indica si ya le hemos dado `me gusta` a una imagen o no. Así que cuando clickamos en los likes, lo que tenemos que hacer, es comprobar si ya le habíamos dado a me gusta o no, si ya le habíamos dado a me gusta, estaremos haciendo un `dislike` y debemos restarle un like, en caso contrario, debemos sumarselo. Y por supuesto, actualizar nuestros posts en base de datos. Con estas pautas... ¿Os atrevéis a hacer este ejercicio vosotras solas? Recordad que si os atascáis en algo simepre podéis acudir al código final del repo.

## ¡Enhorabuena! ¡Has completado el taller! :tada:

Esperamos que hayas aprendido mucho y te hayas quedado con ganas de seguir trasteando. :wink: ¡Eso es lo importante!

<p align="center">
  <img alt="Despedida" width="500" src="https://media.giphy.com/media/26u4exk4zsAqPcq08/giphy.gif">
</p>

Ahora tienes un mundo abierto de posibilidades: puedes tratar de mejorar tu aplicación, añadir nuevas funcionalidades, seguir estudiando, practicando, ¡lo que tú quieras!

Si quieres seguir ampliando información, recuerda que tienes varios enlaces en las slides para seguir aprendiendo. ¡Pero tómatelo con calma! ¡Ahora toca celebrarlo! :beers:

## ¡Pero esto no termina aquí!

¡No ha hecho más que empezar!

Si tienes cualquier duda o sugerencia, puedes dejarla en un `issue` de este repo, o incluso hacer una `pull request` encuentras algún error o quieres añadir algo. 🤗

<p align="center">
  <img alt="Despedida" width="500" src="https://media.giphy.com/media/m9eG1qVjvN56H0MXt8/giphy.gif">
</p>
