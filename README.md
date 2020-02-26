# Taller IG con React NodeGirlsMadrid 29F
Bienvenidas!!!!

> 👉 Las slides de la primera parte [las puedes ver aquí](https://slides.com/yunevk/taller-react-nodegirls/live#/).

## ¿Qué vamos a hacer?
Vamos a hacer una app basada (siempre basada, nunca copiada...) en instagram. Así podremos ver las fotos de nuestras compis de taller y presumir de las cosas molonas que estamos haciendo.

La pinta que esperamos que tenga es esta:

***************Vídeo????

Con las slides como fondo ya os hemos contado los principales aspectos técnicos de React. Como siempre, la mejor forma de quedarnos con ellos es embarrarnos y cacharrear, así que allá vamos.

## ¿Qué pasos vamos a serguir?

1. Montaremos el proyecto.
2. Haremos un poco de __arquitectura__ básica con los componentes fundamentales.
3. Les daremos un poco de vidilla sencilla para empezar, ¿cómo?
  * seteando nuestra variable de estado
  * modificando esta variable de estado con __funciones de primer orden__ (no asustarse todavía, nos hacen el favor ;P);
< :warning: A partir de aquí viene la caña, pero os lo vamos a contar suuuuper bien, así que __nonti preocupare__ (o como se diga).
4. Mostraremos los post que están almacenados en el super back que nos ha montado Irene. Aquí van a entrar en juego unos cuantos conceptos y técnicas interesantes como:
  * Llamada a la api.
  * El hook useEffect.
  * Renderizado condicional.
  * Mapeo de arrays para generar elementos html.
5. Cargaremos la imagen que queramos subir.
6. Mostraremos los filtros aplicados a nuestra imagen para poder elegir el que más nos favorece.
7. Con un elemento `textarea` habilitaremos la opción de subir un comentario a lo Paulo Cohello.
8. Cunado ya tengamos todos los datos que compongan cada elemento post, lo subiremos a la base de datos.
9. Por último, veremos como manejar los likes y dislikes (por si le damos sin querer me gusta a la foto de ese petardo que nos cae fatal).

## Inicializar el proyecto
1. Instala `create-react-app` con el comando `npx install -g create-react-app`.
2. Inicializa el proyecto con el comando: `npm create-react-app ig-ngm`.
3. Cambia a la capeta que contiene el código y abre tu IDE.

> :warning: **¿Tienes algún problema con Git/Node y no puedes seguir estos pasos?** ¡No te preocupes! Hemos creado este repo de [Codesandbox](https://codesandbox.io/s/create-react-app-0q9nn?fontsize=14) para que no te pierdas nada del taller. Así puedes seguirlo, y cuando termine vemos cómo podemos arreglar esos problemas. :wink:

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
import react from 'React';
import Header from '../../components/header/Header';
import Body from '../../components/Body/Body';
import Footer from '../../components/footer/Footer';

const Home = () => {
  return (
    <div>
      <Header/>
      <Body/>
      <Footer/>
    </div>
  )
}

export default Home;
```
A su vez, este tendremos que llamarlo desde App para que sea visible: 


```js
import React from 'react';
import Home from './containers/home/Home';
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
    <>
      {step ===1 && <button>Home</button>}
      {(step === 2 || step === 3) && <button>Cancel</button>}
      {(step ===1 || step === 2) && <button>Next</button>}
      {step === 3 && <button>Share</button>}
    </>
  );
};

export default Header;
```
donde:

  * `step`: es el paso del flujo de carga de imágenes.
  * `hadleGoHome`: es la función que nos va a permitir navegar hasta la primera pantalla.
  * `handleNextStep`: es la función que nos permitirá navegar hasta a siguiente pantalla.
  * `handleSharePost`: es una función que navegará a home y lanzará la petición post con los datos.

### Footer
Este es el componente que nos va a permitir subir las imágenes. Para ello, incluiremos un botón que permita navegar a la pantalla de inicio y un input para seleccionar el archivo que queremos subir.

```js
import React from 'react';

const Footer = ({ step }) => {
  return (
    <>
      <button>Home</button>
      <input
        type="file"
        name="file"
        id="file"
        className="file"
        disabled={step!==1}
        />
    </>
  );
};

export default Footer;
```
Donde `step` y `handleGoHome` son los mismos elementos definidos para el componente `Header`, `handleUploadImage` va ser la función que suba imágenes y el `input` va a estar deshabilitado en cualquier pantalla que no sea la inicial.

### Body
De momento, inicializaremos este componente e una forma muy básica, simplemente vamos a hacer que nos muestre el paso en el que nos encotramos. Así, `Body` nos queda tal que:

```js
import React from 'react';

const Body = ({ step }) => {
  return (
    <>
      <h2>Body in step {step} </h2>
    </>
  );
};

export default Body;
```
## Step, nuestra primera variable de estado, nuestro primer hook

Vemos que nuestros tres componentes dependen de la variable step que les pasamos como propiedad. Esta propiedad, `step` debe venir y ser manejada en el componente `Home`, pero ¿cómo? ¿como variable de estado? ¿porquéééeéééé motivooooo? :scream:

Bueno, el motivo no es especialmente sencillo, vamos a intentar explicarlo aquí, aunque seguramente, si estás haciendo el taller en vivo la explicación sea mejor. Cuando pasamos una propiedad a un componente hijo, este solo se va a actualizar si forma parte o bien de las propiedades o bien del estado del padre. Cualquier otro tipo de variable dentro del scope del componente padre que mute su valor, no se vería reflejada en el hijo.

Dicho lo cual, veamos cómo se traduce esto en código: necesitamos utilizar el método `useState` de React. Este método nos devuelve un array con dos valores, el primero, el de nuestra variable de estado y el segundo, el de la función que hemos de invocar cada vez que necesitemos mutar dicha variable, en otras palabras: 

```js
import react, { useState } from 'React';
import Header from '../../components/header/Header';
import Body from '../../components/Body/Body';
import Footer from '../../components/footer/Footer';

const Home = () => {
  const [step, setStep] = useState(1);
  return (
    <div>
      <Header
        step={step}
      />
      <Body
        step={step}
      />
      <Footer
        step={step}
      />
    </div>
  )
}

export default Home;
```

## Funciones como ciudadanos de primera: pasando lógica entre componentes
Hasta el momento, nuestros componentes `Header` y `Footer`, contienen unos botones estupendísimos y preciosísimos que no hacen ná de ná. Necesitamos darles un poco de vida, pero, sobre todo de lógica. 

> :hand: One minute!!!!! ¿No habíais dicho que `Header`, `Footer` y `Body` eran componentes UI si ninguna lógica? Bingoooo!!!!! :tada: Así es, premio para tí, pequeña padawan por estar atenta. Entonces... ¿Cómo hago para darles ese soplo de vida y espíritu y que esos botones e input sirvan para algo más que para mostrar una interfaz bonita?

Para esos menesteres, vamos a hacer uso de una de las características más molonas de js que es que las funciones son ciudadanos de primera categoría, oiga, nada que envidiarles a sus primos los objetos, strings, numbers ni ningún otro. Y si estos últimos, pueden venir como parámetros de una función otra función no va a ser menos. Así, nuestros _dummy components_ quedarían:

```js
const Header = ({ handleGoHome, handleShare, handleNext, step}) => {
  return (
    <>
      {step ===1 && <button onClikc={handleGoHome}>Home</button>}
      {(step === 2 || step === 3) && <button onClick={handleGoHome}>Cancel</button>}
      {(step ===1 || step === 2) && <button onClick={handleNext}>Next</button>}
      {step === 3 && <button onClick={handleShare}>Share</button>}
    </>
  );
};
```

```js
const Footer = ({ handleGoHome, handleUploadImage, step }) => {
  return (
    <>
      <button onClick={handleGoHome}>Home</button>
      <input
        type="file"
        name="file"
        id="file"
        className="file"
        disabled={step!==1}
        onChange={handleUploadImage}/>
    </>
  );
};
```

Por supuesto, estas funciones habrán de venir definidas en algún lado. La lógica la definimos dentro de los _containers_. Nosotras, hoy solo tenemos un _container_, `Home`, en el que definiremos lo que queremos que haga cada una de estas funciones:

```js
import react, { useState } from 'React';
import Header from '../../components/header/Header';
import Body from '../../components/Body/Body';
import Footer from '../../components/footer/Footer';

const Home = () => {
  const [step, setStep] = useState(1);
  const handleGoHome = () => setState(1);
  const handleNext = () => setState(step + 1);
  const handleShare = () => {};
  const handleUploadImage = () => {};
  return (
    <div>
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
    </div>
  )
}

export default Home;
```

Hasta el momento, tenemos una app que nos permite navegar entre pantallas, y cambiar la variable de estado `step`. Hemos aprendido varias cositas interesantes, hemos hecho nuestros primero pinitos con _jsx_, con el _state_ de un componente, con los hooks, con sus propiedades... Hemos hecho un montón de cosas pero sinceramente, esa app, hasta aquí no es muy divertida. _Stay with us_, ahora vamos a entrar en la parte con más enjundia del taller!!! :mag:

## Carga inicial de los posts

> :warning: **Warning!!!!** La carga inicial de los posts es un poco compleja!!!! Keep your eyes :eyes: and ears :ear: open!!!

El componente `Body` será el que nos muestre el contenido de los post de nuestro IG. Por ello, como medida inicial lo primero que haremos, será la carga de los mismos.

Posts es una variable que pasaremos como propiedad al componente Body. Puesto que nos interesa que cada vez que `post` varíe su valor, `Body` se actualice, hemos de establecerla como parte del estado de` Home`. Esto lo hacemos de manera análoga a como hacíamos con `step`.
```js
const [posts, setPosts] = useState([]); 
```

Por otra parte hemos de incluir la petición a back. Vamos a separar este proceso en varios pasos:
1. **instalación del módulo de node axios** que nos va a facilitar realizar y procesar las peticiones: 
``` npm i -S axios ```
2. **Importaremos el módulo** axios en `Home`:
``` import axios from 'axios ```
3. Queremos que la petición se realice la primera vez que se "monta" nuestro componente, para ello usaremos el _hook_ `useEffect`, al que le pasaremos como dependencia un array vacío. El hecho de que no tenga dependencias, evita que entremos en un bucle infinito:
```js
  const getPosts = async () => {
    const res = await axios.get('http;//localhost:3000/api/posts');
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
import react, { useState } from 'React';
import axios from 'axios';
import Header from '../../components/Header';
import Body from '../../components/Body';
import Footer from '../../components/Footer';

const Home = () => {
  const [step, setStep] = useState(1);
  const [posts, setPosts] = useState([]); 
  const handleGoHome = () => setState(1);
  const handleNext = () => setState(step + 1);
  const handleShare = () => {};
  const handleUploadImage = () => {};
  const getPosts = async () => {
    const res = await axios.get('http;//localhost:3000/api/posts');
    setPosts(res.data);
  } 
  useEffect(() => {
    getPosts();
  }, []);
  return (
    <div>
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
    </div>
  )
}

export default Home;
```
* **Body**:

```js
import React from 'react';

const Body = ({ step, posts }) => {
  return (
    <>
      <h2>Body in step {step} </h2>
    </>
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
    <article>
    <div>
      <img src={post.userImage} alt={post.username}/>
      <p>{post.username}</p>
    </div>
    <div>
      <img src={post.postImage} alt=""/>
      <div>
        <button onClick={() => handleLikes(post)}> 
          <i className="far fa-heart fa-lg"></i>
        </button>
        <p>{post.likes}</p>
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
    && posts.map((post, index) => <CardPosts key={post.id} post={post}/>)}
```
No olvidéis que:
1. Body debe importar CardPost o no podrá utilizarlo.
2. El array de posts, le tiene que ser pasado a Body como prop.

## Subida del post: recogiendo la info

### Subida de la imagen

### Eliginedo el mejor filtro: CardFilter y setFilter

### ¿Cómo ser Paulo Coelho y dejar comentarios filosóficos? Solo necesitas un textArea y un setCaption.

### Guardando la info: llamada a la API.

## Likes y dislikes: interaccionando con los post de tus compis.

