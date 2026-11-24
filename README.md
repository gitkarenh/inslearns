# Inslearns — Matemáticas Cyberpunk

**Inslearns** es una aplicación educativa interactiva estilo Instagram, en su versión **Matemáticas Cyberpunk**, enfocada en Matemáticas. Permite a los estudiantes consultar apuntes de clase, interactuar con ellos y guardarlos en **«Mi Cuaderno»** dentro de una experiencia visual mobile-first.

La aplicación ofrece un feed con tarjetas educativas donde se exploran contenidos de **Álgebra**, **Geometría**, **Trigonometría**, **Cálculo** y **Probabilidad**, con diagramas o tarjetas visuales, validación matemática simulada y práctica interactiva.

## Descripción

Inslearns combina la dinámica de una red social con herramientas de estudio:

- **Feed educativo de matemáticas:** apuntes de clase con autor, tema, contenido estructurado y apoyo visual (diagramas/tarjetas).
- **Interacción de aprendizaje:** me gusta por botón o doble clic, y guardado de apuntes en «Mi Cuaderno».
- **Organización personal:** vista **«Mi Cuaderno»** para listar, filtrar y gestionar los apuntes guardados.
- **Apoyo con IA (simulada/local):** verificación de veracidad matemática y ejercicios interactivos con retroalimentación inmediata.
- **Persistencia local:** conservación del perfil, publicaciones y estados en `localStorage`.

## Apuntes de clase incluidos

La aplicación carga 5 apuntes matemáticos de clase con diagramas o tarjetas visuales:

- **Álgebra / Pendiente**
- **Geometría / Pitágoras**
- **Trigonometría / Razones trigonométricas**
- **Cálculo / Derivadas básicas**
- **Probabilidad / Regla básica**

Cada apunte incluye: **fórmulas**, **explicación**, **ejemplo** y **nota de cuidado**.

## Estética

- **Fondo oscuro** con acentos neón en **cian, magenta, amarillo y verde**.
- **Diseño mobile-first** con contenedor centrado y ancho máximo de **480px** en escritorio.
- **Tarjetas limpias** con jerarquía visual clara: autor, tema, visual, título, contenido y barra de acciones.
- **Sin estilos en línea:** toda la presentación se define en [css/styles.css](css/styles.css).

## Funcionalidades principales

- **5 apuntes de Matemáticas** precargados con diagramas o tarjetas visuales.
- **Filtro por tema** en el feed.
- **Me gusta** mediante botón o doble clic sobre la tarjeta.
- **Botón Guardar** para marcar o desmarcar apuntes.
- **Vista «Mi Cuaderno»** para listar y gestionar apuntes guardados, con filtro por tema o título.
- **Persistencia en `localStorage`**:
  - `inslearns_user`: perfil del estudiante.
  - `inslearns_posts`: colección de apuntes/publicaciones.
  - `inslearns_math_saved`: identificadores de apuntes guardados en «Mi Cuaderno».
  - `inslearns_math_likes`: contadores de «me gusta» por apunte.

## Paneles de IA

Cada apunte incluye dos acciones con paneles desplegables dentro de la tarjeta:

### 1. Verificar veracidad
- **Botón:** `Verificar veracidad`
- **Módulo:** [js/ai.js](js/ai.js) (separado de la manipulación del DOM)
- **Función:** `verificarVeracidad(post)`
- **Panel mostrado:** **Validación matemática**
  - **Nivel de confianza**
  - **Explicación académica**
- **Objetivo:** evaluar el rigor y la coherencia matemática del contenido del apunte.

### 2. Practicar ejercicio
- **Botón:** `Practicar ejercicio`
- **Módulo:** [js/ai.js](js/ai.js)
- **Función:** `generarEjercicio(post)`
- **Panel mostrado:** **Práctica interactiva**
  - **Pregunta**
  - **Opciones** seleccionables
  - **Respuesta inmediata** de acierto o error
  - **Retroalimentación**
- **Objetivo:** reforzar el aprendizaje con una práctica breve basada en el apunte.

## Estructura de carpetas

```text
/
├── AGENTS.md
├── README.md
├── index.html
├── css/
│   └── styles.css
└── js/
    ├── ai.js
    ├── app.js
    └── data.js
```

### Descripción de archivos

- [index.html](index.html): estructura semántica de la interfaz y punto de entrada de la aplicación.
- [css/styles.css](css/styles.css): estilos principales, paleta cyberpunk, diseño mobile-first y componentes visuales.
- [js/app.js](js/app.js): lógica de interfaz, eventos, filtros, interacciones, renderizado y orquestación.
- [js/data.js](js/data.js): modelos, apuntes iniciales, diagramas visuales y persistencia en `localStorage`.
- [js/ai.js](js/ai.js): lógica de IA para verificación de veracidad matemática y generación de ejercicios con retroalimentación.

## Cómo ejecutarlo

### Opción 1: Ejecutar en local

1. **Clona el repositorio:**
   ```bash
   git clone https://github.com/gitkarenh/inslearns.git
   cd inslearns
   ```
2. **Inicia un servidor estático (recomendado):**

   Con Python 3:
   ```bash
   python3 -m http.server 8000
   ```

   Con Node.js (si tienes `npx`):
   ```bash
   npx serve .
   ```
3. **Abre la aplicación en el navegador:**
   - `http://localhost:8000`

> También puedes abrir `index.html` directamente, pero se recomienda un servidor local para un comportamiento más consistente.

### Opción 2: Ejecutar en GitHub Codespaces

1. Abre el repositorio en GitHub.
2. Haz clic en **Code** → **Codespaces** → **Create codespace on main** (o la rama correspondiente).
3. Espera a que el entorno se inicie.
4. En la terminal de Codespaces, ejecuta:
   ```bash
   python3 -m http.server 8000
   ```
5. Abre el puerto **8000** desde la pestaña **Ports** o con el botón **Open in Browser**.
6. Interactúa con la aplicación desde el navegador.

## Guía rápida de pruebas

1. **Carga inicial:** abre la app y verifica que se muestre el registro o el feed sin errores visibles.
2. **Apuntes precargados:** confirma que el feed muestre los 5 apuntes de **Álgebra, Geometría, Trigonometría, Cálculo y Probabilidad** con visual/diagrama.
3. **Filtro por tema:** en el feed, selecciona un tema y comprueba que solo aparezcan los apuntes correspondientes.
4. **Me gusta (botón):** pulsa `Me gusta` en un apunte y verifica que el contador aumente.
5. **Me gusta (doble clic):** haz doble clic sobre una tarjeta y verifica que el contador aumente.
6. **Guardar apunte:** pulsa `Guardar` y comprueba que el estado cambie a `Guardado`.
7. **Mi Cuaderno:** entra a `Mi Cuaderno` y verifica que aparezca el apunte guardado; usa el filtro por tema o título.
8. **Quitar de Mi Cuaderno:** pulsa `Guardado` para desmarcar y confirma que el apunte se retire del listado (o cambie su estado).
9. **Panel Verificar veracidad:** pulsa `Verificar veracidad` y comprueba que se despliegue la **Validación matemática** con nivel de confianza y explicación académica.
10. **Panel Practicar ejercicio:** pulsa `Practicar ejercicio`, elige una opción y verifica la **respuesta inmediata** de acierto o error con retroalimentación.
11. **Persistencia:** recarga la página y confirma que se conserven perfil, apuntes, likes, guardados y resultados generados en `localStorage`.
12. **Consola y recursos:** revisa que no haya errores en consola y que `index.html` cargue correctamente `css/styles.css`, `js/data.js`, `js/ai.js` y `js/app.js`.

## Tecnologías y convenciones

- Proyecto construido con **HTML5, CSS3 y JavaScript ES6+ puro** (sin frameworks pesados).
- Toda la **interfaz** y los **comentarios del código** están en **español**.
- La lógica de IA permanece en [js/ai.js](js/ai.js), separada de la manipulación del DOM.
- Revisa las reglas y convenciones del proyecto en [AGENTS.md](AGENTS.md).
