# AGENTS.md — Inslearns

## Definición del proyecto

**Inslearns** es una aplicación educativa interactiva estilo Instagram con estética cyberpunk, enfocada en Matemáticas. Su objetivo es ofrecer una experiencia de aprendizaje visual, clara y atractiva, donde los estudiantes puedan consultar y guardar apuntes de clase en **«Mi Cuaderno»**, además de publicar, explorar y practicar contenidos matemáticos en un formato tipo feed.

La aplicación debe priorizar:

- **Consulta y guardado de apuntes:** los estudiantes pueden revisar publicaciones educativas y guardar apuntes de clase en **«Mi Cuaderno»** para consultarlos posteriormente.
- **Experiencia educativa interactiva:** publicación y consumo de contenido didáctico de Matemáticas con apoyo visual (diagramas, esquemas o imágenes).
- **Estética cyberpunk coherente:** fondo oscuro, acentos neón cian, magenta, amarillo y verde, y jerarquía visual clara.
- **Enfoque mobile-first:** diseño pensado primero para dispositivos móviles.
- **Verificación de veracidad:** inclusión de señales o mecanismos que ayuden a evaluar la confiabilidad del contenido compartido.
- **Ejercicios generados por IA:** generación y presentación de actividades personalizadas a partir del contenido publicado.

## Rol del agente

Eres un agente de desarrollo para **Inslearns**. Tu función es diseñar, implementar y mantener la aplicación con soluciones funcionales, coherentes con el propósito educativo del proyecto, fáciles de mantener y alineadas con la identidad visual y técnica definida en este documento.

## Stack permitido

- **HTML5** para la estructura y la semántica del contenido.
- **CSS3** para los estilos, el diseño visual y la responsividad.
- **JavaScript ES6+ puro** (Vanilla JS) para la lógica de la aplicación.

**Restricciones:**

- No utilizar frameworks ni librerías pesadas (por ejemplo: React, Angular, Vue, Svelte, jQuery, Bootstrap, Tailwind, etc.).
- No incorporar dependencias externas salvo que sean estrictamente necesarias y se justifique explícitamente; por defecto, la solución debe funcionar con tecnologías web nativas.
- Priorizar código modular, legible y mantenible dentro del stack permitido.

## Estructura de archivos obligatoria

El proyecto debe respetar la siguiente estructura mínima:

```text
/
├── index.html
├── css/
│   └── styles.css
└── js/
    ├── app.js
    ├── data.js
    └── ai.js
```

**Responsabilidades de cada archivo:**

- `index.html`: punto de entrada de la aplicación; define la estructura semántica de la interfaz.
- `css/styles.css`: hoja de estilos principal de la interfaz.
- `js/app.js`: lógica principal de la aplicación, interacción con la interfaz y orquestación de funcionalidades.
- `js/data.js`: definición y gestión de datos, modelos, contenido de ejemplo o fuentes de información utilizadas por la aplicación.
- `js/ai.js`: lógica relacionada con la verificación de veracidad y la generación de ejercicios mediante IA (o su simulación/integración definida en el proyecto).

No alterar esta estructura base sin una instrucción explícita del usuario.

## Regla estricta de idioma

- Toda la **interfaz de usuario** debe estar escrita en **español** (textos visibles, etiquetas, botones, mensajes, placeholders, títulos, estados, etc.).
- Todos los **comentarios del código** deben estar escritos en **español**.
- Los **nombres de variables descriptivas**, funciones, constantes y otros identificadores cuyo propósito sea comunicarse en el código deben estar en **español** y ser claros.
- Se permite el uso de términos técnicos inevitables en inglés únicamente cuando no exista una alternativa razonable (por ejemplo, nombres de APIs o propiedades estándar del lenguaje), pero la explicación y el contexto deben mantenerse en español.

## Reglas de diseño e interfaz (UI/UX)

- **Estética cyberpunk:** utilizar fondo oscuro y acentos neón en **cian**, **magenta**, **amarillo** y **verde**, manteniendo una identidad visual consistente en toda la interfaz.
- **Enfoque mobile-first:** diseñar priorizando dispositivos móviles, con un contenedor centrado y un ancho máximo de **480px** en escritorio para simular una aplicación móvil.
- **Contenido centrado en Matemáticas:** la interfaz y las publicaciones deben enfocarse en temas matemáticos, priorizando la comprensión visual mediante diagramas, esquemas o imágenes cuando corresponda.
- **Consulta y guardado en «Mi Cuaderno»:** la interfaz debe permitir a los estudiantes consultar y guardar apuntes de clase en la sección **«Mi Cuaderno»** de forma clara y accesible.
- **Tarjetas limpias y jerarquía visual clara:** presentar el contenido en tarjetas que muestren, de forma ordenada, el **autor**, la **etiqueta de materia**, el **contenido breve** y una **barra de acciones**.
- **Legibilidad y contraste:** garantizar buen contraste entre texto y fondo, especialmente sobre la base oscura y los acentos neón.
- **Sin estilos en línea:** no utilizar estilos en línea dentro de `index.html`; todos los estilos deben definirse en `css/styles.css`.

## Estructura de apuntes matemáticos de clase

La aplicación debe incluir y mantener apuntes matemáticos de clase para los siguientes temas:

- **Álgebra / Pendiente:** conceptos de ecuaciones y pendiente de una recta.
- **Geometría / Pitágoras:** relaciones métricas en triángulos rectángulos y teorema de Pitágoras.
- **Trigonometría:** razones trigonométricas y relaciones angulares fundamentales.
- **Cálculo / Derivadas:** interpretación y cálculo básico de derivadas.
- **Probabilidad:** fundamentos de probabilidad y análisis de eventos.

Cada apunte matemático de clase debe estructurar su contenido para incluir, de forma clara:

- **Fórmulas:** expresiones matemáticas relevantes del tema.
- **Explicación:** desarrollo conceptual breve y comprensible.
- **Ejemplo:** caso práctico o numérico que ilustre la aplicación.
- **Nota de cuidado:** advertencia, error común o consideración importante para evitar confusiones.

## Estructura de datos y estado

Para garantizar consistencia en el proyecto, se deben respetar exactamente los siguientes esquemas y nombres. No inventar propiedades ni claves distintas en futuros cambios.

### Objeto `Usuario`

Propiedades exactas:

- `nombre`
- `carrera`
- `materiasSeleccionadas`
- `intereses`

Ejemplo de esquema:

```js
{
  nombre: "",
  carrera: "",
  materiasSeleccionadas: [],
  intereses: []
}
```

### Objeto `Publicacion`

Propiedades exactas:

- `id`
- `autor`
- `materia`
- `titulo`
- `contenido`
- `veracidad`
- `ejercicio`
- `likes`
- `guardado`

Ejemplo de esquema:

```js
{
  id: "",
  autor: "",
  materia: "",
  titulo: "",
  contenido: "",
  veracidad: null,
  ejercicio: null,
  likes: 0,
  guardado: false
}
```

### Claves de `localStorage`

Usar únicamente estas claves exactas:

- `inslearns_user`: almacena el objeto `Usuario`.
- `inslearns_posts`: almacena la colección/listado de objetos `Publicacion` (apuntes matemáticos).
- `inslearns_math_saved`: almacena los identificadores de los apuntes guardados para mostrarlos en **«Mi Cuaderno»**.
- `inslearns_math_likes`: almacena los contadores de «me gusta» por apunte para mostrarlos y actualizarlos en la interfaz.

## Directrices del módulo de IA

- Toda la lógica relacionada con inteligencia artificial debe vivir **exclusivamente** en `js/ai.js`.
- `js/ai.js` debe mantenerse **separado de la manipulación del DOM**: no debe acceder a elementos de la interfaz ni modificarlos directamente. La interacción con la vista corresponde a `js/app.js`.
- Las funciones del módulo deben estar preparadas para funcionar tanto en **modo simulado local** como conectadas a una **API externa**, manteniendo la misma interfaz de entrada y salida. Cuando sea necesario para la integración con una API, pueden implementarse como funciones asíncronas (por ejemplo, devolviendo una `Promise`).
- El módulo debe permitir **verificar la veracidad matemática** del contenido de los apuntes y **generar ejercicios con retroalimentación** para reforzar el aprendizaje.

### Funciones obligatorias

#### `verificarVeracidad(post)`

- **Entrada:** recibe un objeto `post` con la estructura de `Publicacion` (apunte matemático).
- **Responsabilidad:** verificar la veracidad matemática y el rigor del contenido del apunte.
- **Salida:** debe devolver un objeto con, al menos, las siguientes propiedades:
  - `nivelConfianza`: nivel de confianza del análisis.
  - `explicacionAcademica`: explicación académica breve que justifique el resultado.

Ejemplo de salida:

```js
{
  nivelConfianza: "",
  explicacionAcademica: ""
}
```

#### `generarEjercicio(post)`

- **Entrada:** recibe un objeto `post` con la estructura de `Publicacion` (apunte matemático).
- **Responsabilidad:** generar un ejercicio de aprendizaje basado en el contenido del apunte.
- **Salida:** debe devolver un objeto con, al menos, las siguientes propiedades:
  - `pregunta`: enunciado de una pregunta de opción múltiple.
  - `opciones`: arreglo con las opciones de respuesta.
  - `indiceCorrecto`: índice de la opción correcta dentro de `opciones`.
  - `retroalimentacion`: explicación o retroalimentación asociada a la respuesta correcta.

Ejemplo de salida:

```js
{
  pregunta: "",
  opciones: [],
  indiceCorrecto: 0,
  retroalimentacion: ""
}
```

## Flujo de trabajo y restricciones

- **Lectura previa obligatoria:** antes de modificar cualquier archivo, el agente debe leer las secciones previas de `AGENTS.md` para respetar la definición del proyecto, el stack, la estructura, las reglas de idioma, el diseño, los esquemas de datos y las directrices del módulo de IA.
- **Preservación de funcionalidades:** al agregar nuevas funcionalidades, no se deben borrar ni romper las funcionalidades existentes; cualquier cambio debe integrarse de forma compatible con el comportamiento ya implementado.
- **Conservación de funciones y eventos existentes:** al editar, se deben conservar las funciones y los eventos existentes, evitando eliminarlos o alterar su comportamiento sin una necesidad explícita del cambio solicitado.
- **Funciones cortas y modulares:** mantener las funciones cortas y modulares, con una extensión máxima de **30-40 líneas por función**, favoreciendo la claridad, la reutilización y el mantenimiento.
- **Sin estilos en línea:** no introducir atributos `style` ni estilos embebidos en el HTML; toda la presentación debe definirse en `css/styles.css`.
- **Idioma obligatorio:** toda la interfaz de usuario y todos los comentarios del código deben mantenerse en español.
- **Verificación final:** comprobar que no existan errores en la consola del navegador ni enlaces rotos entre `index.html` y los scripts u otros recursos referenciados por la aplicación.
