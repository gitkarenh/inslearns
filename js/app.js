// Lógica principal de la aplicación: interfaz, eventos y orquestación

let seccionActual = 'feed';
let temaSeleccionadoFeed = 'todos';
let temaSeleccionadoCuaderno = 'todos';
const respuestasEjercicio = {};

// Obtiene un elemento del DOM por su identificador
function obtenerElemento(id) {
  return document.getElementById(id);
}

// Muestra u oculta la barra de navegación inferior
function mostrarNavegacion(mostrar) {
  obtenerElemento('barra-navegacion').classList.toggle('oculto', !mostrar);
}

// Marca el botón activo en la navegación
function actualizarNavegacionActiva(seccion) {
  const botones = obtenerElemento('barra-navegacion').querySelectorAll('.boton-nav');
  botones.forEach((boton) => {
    boton.classList.toggle('activo', boton.dataset.seccion === seccion);
  });
}

// Muestra el feed con una transición suave
function mostrarFeedConTransicion() {
  const feed = obtenerElemento('seccion-feed');
  feed.classList.remove('oculto');
  feed.classList.remove('feed-visible');
  requestAnimationFrame(() => {
    requestAnimationFrame(() => feed.classList.add('feed-visible'));
  });
}

// Muestra una sección principal de la app
function mostrarSeccionPrincipal(seccion, conTransicion) {
  seccionActual = seccion;
  const feed = obtenerElemento('seccion-feed');
  const cuaderno = obtenerElemento('seccion-cuaderno');
  feed.classList.toggle('oculto', seccion !== 'feed');
  cuaderno.classList.toggle('oculto', seccion !== 'cuaderno');
  actualizarNavegacionActiva(seccion);
  renderizarVistaActual();
  if (seccion === 'feed' && conTransicion) {
    mostrarFeedConTransicion();
    return;
  }
  if (seccion === 'feed') {
    feed.classList.add('feed-visible');
  }
}

// Muestra la pantalla de registro y oculta la app
function mostrarRegistro() {
  obtenerElemento('seccion-registro').classList.remove('oculto');
  obtenerElemento('seccion-feed').classList.add('oculto');
  obtenerElemento('seccion-cuaderno').classList.add('oculto');
  cerrarModalPublicar();
  mostrarNavegacion(false);
}

// Limpia la selección activa de un grupo de chips
function limpiarChips(idGrupo) {
  const chips = obtenerElemento(idGrupo).querySelectorAll('.chip');
  chips.forEach((chip) => chip.classList.remove('chip-activo'));
}

// Activa chips según una lista de valores guardados
function activarChipsGuardados(idGrupo, valores) {
  const chips = obtenerElemento(idGrupo).querySelectorAll('.chip');
  chips.forEach((chip) => {
    chip.classList.toggle('chip-activo', valores.includes(chip.dataset.valor));
  });
}

// Rellena el formulario con los datos del usuario
function cargarUsuarioEnFormulario(usuario) {
  obtenerElemento('campo-nombre').value = usuario.nombre || '';
  obtenerElemento('campo-carrera').value = usuario.carrera || '';
  limpiarChips('grupo-materias');
  limpiarChips('grupo-intereses');
  activarChipsGuardados('grupo-materias', usuario.materiasSeleccionadas || []);
  activarChipsGuardados('grupo-intereses', usuario.intereses || []);
}

// Obtiene los valores seleccionados en un grupo de chips
function obtenerValoresChips(idGrupo) {
  const chipsActivos = obtenerElemento(idGrupo).querySelectorAll('.chip-activo');
  return Array.from(chipsActivos).map((chip) => chip.dataset.valor);
}

// Construye un objeto Usuario desde el formulario
function leerUsuarioDesdeFormulario() {
  return {
    nombre: obtenerElemento('campo-nombre').value.trim(),
    carrera: obtenerElemento('campo-carrera').value.trim(),
    materiasSeleccionadas: obtenerValoresChips('grupo-materias'),
    intereses: obtenerValoresChips('grupo-intereses')
  };
}

// Actualiza el resumen del perfil en el feed
function mostrarResumenPerfil(usuario) {
  const resumen = obtenerElemento('resumen-perfil');
  const materias = usuario.materiasSeleccionadas.join(', ') || 'Sin temas seleccionados';
  resumen.textContent = `${usuario.nombre} · ${usuario.carrera} · Temas: ${materias}`;
}

// Abre y cierra el modal de publicación
function abrirModalPublicar() {
  obtenerElemento('modal-publicar').classList.remove('oculto');
}
function cerrarModalPublicar() {
  obtenerElemento('modal-publicar').classList.add('oculto');
}

// Genera un identificador único para una publicación
function generarIdPublicacion() {
  return `pub-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
}

// Crea un objeto Publicacion desde el formulario de publicación
function crearPublicacionDesdeFormulario() {
  const usuario = obtenerUsuario();
  return {
    id: generarIdPublicacion(),
    autor: usuario.nombre || 'Estudiante',
    materia: obtenerElemento('campo-materia-publicar').value,
    titulo: obtenerElemento('campo-titulo-publicar').value.trim(),
    contenido: obtenerElemento('campo-contenido-publicar').value.trim(),
    veracidad: null,
    ejercicio: null,
    likes: 0,
    guardado: false
  };
}

// Guarda un nuevo apunte y actualiza la vista
function manejarEnvioPublicacion(evento) {
  evento.preventDefault();
  const publicaciones = obtenerPublicaciones();
  publicaciones.unshift(crearPublicacionDesdeFormulario());
  guardarPublicaciones(publicaciones);
  evento.target.reset();
  cerrarModalPublicar();
  actualizarSelectorTemas();
  mostrarSeccionPrincipal('feed');
}

// Guarda el perfil y muestra la app
function manejarEnvioRegistro(evento) {
  evento.preventDefault();
  const usuario = leerUsuarioDesdeFormulario();
  guardarUsuario(usuario);
  mostrarResumenPerfil(usuario);
  obtenerElemento('seccion-registro').classList.add('oculto');
  mostrarNavegacion(true);
  mostrarSeccionPrincipal('feed', true);
}

// Alterna el estado activo de un chip interactivo
function manejarClicChip(evento) {
  const chip = evento.target.closest('.chip');
  if (chip) {
    chip.classList.toggle('chip-activo');
  }
}

// Busca una publicación por id en la colección
function buscarPublicacion(publicaciones, idPublicacion) {
  return publicaciones.find((publicacion) => publicacion.id === idPublicacion);
}

// Sincroniza la lista de guardados con el estado actual
function sincronizarGuardados(guardados, idPublicacion, estaGuardado) {
  const indice = guardados.indexOf(idPublicacion);
  if (estaGuardado && indice === -1) {
    guardados.push(idPublicacion);
  }
  if (!estaGuardado && indice !== -1) {
    guardados.splice(indice, 1);
  }
}

// Obtiene los temas disponibles en las publicaciones
function obtenerTemasDisponibles() {
  const temas = obtenerPublicaciones().map((publicacion) => publicacion.materia).filter(Boolean);
  return [...new Set(temas)];
}

// Actualiza las opciones del filtro por tema en el feed y en Mi Cuaderno
function actualizarSelectorTemas() {
  temaSeleccionadoFeed = actualizarSelectorTemasEn('filtro-tema-feed', temaSeleccionadoFeed);
  const selectorFeed = obtenerElemento('filtro-tema-feed');
  if (selectorFeed && selectorFeed.options[0]) {
    selectorFeed.options[0].textContent = 'Todos los temas';
  }
  temaSeleccionadoCuaderno = actualizarSelectorTemasEn('filtro-tema-cuaderno', temaSeleccionadoCuaderno);
}

// Filtra publicaciones del feed por tema seleccionado
function obtenerPublicacionesFiltradasFeed() {
  const publicaciones = obtenerPublicaciones();
  if (temaSeleccionadoFeed === 'todos') {
    return publicaciones;
  }
  return publicaciones.filter((publicacion) => publicacion.materia === temaSeleccionadoFeed);
}

// Actualiza las opciones de un selector de temas
function actualizarSelectorTemasEn(idSelector, temaSeleccionado) {
  const selector = obtenerElemento(idSelector);
  if (!selector) {
    return 'todos';
  }
  const temas = obtenerTemasDisponibles();
  const opciones = [`<option value="todos">Todos</option>`];
  temas.forEach((tema) => {
    const seleccionado = tema === temaSeleccionado ? 'selected' : '';
    opciones.push(`<option value="${tema}" ${seleccionado}>${tema}</option>`);
  });
  selector.innerHTML = opciones.join('');
  selector.value = temas.includes(temaSeleccionado) ? temaSeleccionado : 'todos';
  return selector.value;
}

// Actualiza el contador visible de apuntes guardados
function actualizarContadorGuardados() {
  const contador = obtenerElemento('contador-guardados');
  if (!contador) {
    return;
  }
  const total = obtenerPublicaciones().filter((publicacion) => publicacion.guardado).length;
  contador.textContent = `(${total})`;
}

// Renderiza la vista activa (feed o cuaderno)
function renderizarVistaActual() {
  actualizarSelectorTemas();
  actualizarContadorGuardados();
  if (seccionActual === 'cuaderno') {
    renderizarCuaderno();
    return;
  }
  renderizarPublicaciones();
}

// Actualiza likes y estado guardado de una publicación
function actualizarInteraccion(idPublicacion, tipo) {
  const publicaciones = obtenerPublicaciones();
  const guardados = obtenerGuardados();
  const publicacion = buscarPublicacion(publicaciones, idPublicacion);
  if (!publicacion) {
    return;
  }
  if (tipo === 'like') {
    publicacion.likes += 1;
  }
  if (tipo === 'guardar') {
    publicacion.guardado = !publicacion.guardado;
    sincronizarGuardados(guardados, idPublicacion, publicacion.guardado);
  }
  guardarPublicaciones(publicaciones);
  guardarGuardados(guardados);
  renderizarVistaActual();
}

// Crea el HTML del resultado de veracidad
function crearHtmlVeracidad(veracidad) {
  if (!veracidad) {
    return '';
  }
  return `<div class="resultado-ia"><h4>Validación matemática</h4>
    <p><strong>Nivel de confianza:</strong> ${veracidad.nivelConfianza}</p>
    <p>${veracidad.explicacionAcademica}</p></div>`;
}

// Crea el HTML de una opción interactiva del ejercicio
function crearHtmlOpcionEjercicio(idPublicacion, opcion, indice, ejercicio, seleccion) {
  const clases = ['boton-opcion'];
  if (seleccion === indice && indice === ejercicio.indiceCorrecto) {
    clases.push('correcta');
  }
  if (seleccion === indice && indice !== ejercicio.indiceCorrecto) {
    clases.push('incorrecta');
  }
  return `<button type="button" class="${clases.join(' ')}" data-accion="opcion" data-indice="${indice}" data-id="${idPublicacion}">${opcion}</button>`;
}

// Crea el HTML del bloque de práctica interactiva
function crearHtmlEjercicio(idPublicacion, ejercicio) {
  if (!ejercicio) {
    return '';
  }
  const seleccion = respuestasEjercicio[idPublicacion];
  const opciones = ejercicio.opciones.map((opcion, indice) => {
    return crearHtmlOpcionEjercicio(idPublicacion, opcion, indice, ejercicio, seleccion);
  }).join('');
  let retro = '<p>Selecciona una opción para recibir respuesta inmediata.</p>';
  if (seleccion !== undefined) {
    const acierto = seleccion === ejercicio.indiceCorrecto;
    const clase = acierto ? 'mensaje-acierto' : 'mensaje-error';
    const texto = acierto ? '¡Correcto!' : 'Respuesta incorrecta.';
    retro = `<p class="${clase}">${texto}</p><p><strong>Retroalimentación:</strong> ${ejercicio.retroalimentacion}</p>`;
  }
  return `<div class="resultado-ia"><h4>Práctica interactiva</h4>
    <p><strong>Pregunta:</strong> ${ejercicio.pregunta}</p>
    <div class="lista-opciones-practica">${opciones}</div>${retro}</div>`;
}

// Crea el HTML del diagrama asociado a la publicación
function crearHtmlDiagrama(idPublicacion) {
  const diagrama = typeof obtenerDiagramaPorId === 'function' ? obtenerDiagramaPorId(idPublicacion) : '';
  if (!diagrama) {
    return '';
  }
  return `<div class="contenedor-diagrama">${diagrama}</div>`;
}

// Crea la tarjeta HTML de una publicación
function crearTarjetaPublicacion(publicacion) {
  const textoGuardar = publicacion.guardado ? 'Guardado' : 'Guardar';
  const claseGuardar = publicacion.guardado ? 'boton-accion activo' : 'boton-accion';
  return `<article class="tarjeta-publicacion" data-id="${publicacion.id}">
    <div class="cabecera-tarjeta">
      <h3 class="autor-publicacion">${publicacion.autor}</h3>
      <span class="etiqueta-materia">${publicacion.materia}</span>
    </div>
    ${crearHtmlDiagrama(publicacion.id)}
    <h4 class="titulo-publicacion">${publicacion.titulo}</h4>
    <p class="contenido-publicacion">${publicacion.contenido}</p>
    <div class="barra-acciones">
      <button type="button" class="boton-accion" data-accion="like">Me gusta (${publicacion.likes})</button>
      <button type="button" class="${claseGuardar}" data-accion="guardar">${textoGuardar}</button>
      <button type="button" class="boton-accion" data-accion="verificar">Verificar veracidad</button>
      <button type="button" class="boton-accion" data-accion="practicar">Practicar ejercicio</button>
    </div>
    ${crearHtmlVeracidad(publicacion.veracidad)}
    ${crearHtmlEjercicio(publicacion.id, publicacion.ejercicio)}
  </article>`;
}

// Renderiza una lista de publicaciones en un contenedor
function renderizarListaPublicaciones(idContenedor, publicaciones, mensajeVacio) {
  const contenedor = obtenerElemento(idContenedor);
  if (!publicaciones.length) {
    contenedor.innerHTML = `<p class="mensaje-vacio">${mensajeVacio}</p>`;
    return;
  }
  contenedor.innerHTML = publicaciones.map(crearTarjetaPublicacion).join('');
}

// Renderiza todas las publicaciones filtradas en el feed
function renderizarPublicaciones() {
  const publicaciones = obtenerPublicacionesFiltradasFeed();
  renderizarListaPublicaciones('contenedor-publicaciones', publicaciones, 'No hay publicaciones para este tema.');
}

// Filtra publicaciones guardadas por tema seleccionado
function filtrarGuardados(publicaciones, filtroTema) {
  if (!filtroTema || filtroTema === 'todos') {
    return publicaciones;
  }
  return publicaciones.filter((publicacion) => publicacion.materia === filtroTema);
}

// Renderiza las publicaciones guardadas en el cuaderno
function renderizarCuaderno() {
  actualizarSelectorTemas();
  const guardadas = obtenerPublicaciones().filter((publicacion) => publicacion.guardado);
  const contenedor = obtenerElemento('contenedor-guardados');
  if (!guardadas.length) {
    contenedor.innerHTML = `<div class="estado-vacio-cuaderno"><p class="mensaje-vacio">Aún no tienes apuntes guardados en Mi Cuaderno.</p><button type="button" class="boton-principal boton-volver-feed" data-accion="volver-feed">Volver al Feed</button></div>`;
    return;
  }
  const filtradas = filtrarGuardados(guardadas, temaSeleccionadoCuaderno);
  const mensaje = filtradas.length ? '' : 'No hay apuntes guardados para este tema.';
  renderizarListaPublicaciones('contenedor-guardados', filtradas, mensaje);
}

// Despliega el panel de validación matemática para un apunte
async function procesarVeracidad(idPublicacion) {
  const publicaciones = obtenerPublicaciones();
  const publicacion = buscarPublicacion(publicaciones, idPublicacion);
  if (!publicacion) {
    return;
  }
  publicacion.veracidad = await verificarVeracidad(publicacion);
  guardarPublicaciones(publicaciones);
  renderizarVistaActual();
}

// Despliega el panel de práctica interactiva para un apunte
async function procesarPractica(idPublicacion) {
  const publicaciones = obtenerPublicaciones();
  const publicacion = buscarPublicacion(publicaciones, idPublicacion);
  if (!publicacion) {
    return;
  }
  if (!publicacion.ejercicio) {
    publicacion.ejercicio = await generarEjercicio(publicacion);
    guardarPublicaciones(publicaciones);
  }
  renderizarVistaActual();
}

/* Las funciones procesarVeracidad y procesarPractica se definen junto a la gestión de Mi Cuaderno. */

// Registra la respuesta seleccionada en una práctica interactiva
function manejarSeleccionOpcion(boton) {
  const idPublicacion = boton.dataset.id;
  const indice = Number(boton.dataset.indice);
  if (!idPublicacion || Number.isNaN(indice)) {
    return;
  }
  respuestasEjercicio[idPublicacion] = indice;
  renderizarVistaActual();
}

// Maneja los clics de acciones y opciones dentro de tarjetas
function manejarAccionPublicacion(evento) {
  const botonOpcion = evento.target.closest('button[data-accion="opcion"]');
  if (botonOpcion) {
    manejarSeleccionOpcion(botonOpcion);
    return;
  }
  const boton = evento.target.closest('button[data-accion]');
  if (!boton) {
    return;
  }
  const accion = boton.dataset.accion;
  if (accion === 'volver-feed') {
    mostrarSeccionPrincipal('feed');
    return;
  }
  const tarjeta = evento.target.closest('.tarjeta-publicacion');
  if (!tarjeta) {
    return;
  }
  const idPublicacion = tarjeta.dataset.id;
  if (accion === 'like' || accion === 'guardar') {
    actualizarInteraccion(idPublicacion, accion);
  }
  if (accion === 'verificar') {
    procesarVeracidad(idPublicacion);
  }
  if (accion === 'practicar') {
    procesarPractica(idPublicacion);
  }
}

// Maneja el doble clic para dar me gusta a una publicación
function manejarDobleClicPublicacion(evento) {
  if (evento.target.closest('button, a, input, select, textarea')) {
    return;
  }
  const tarjeta = evento.target.closest('.tarjeta-publicacion');
  if (!tarjeta) {
    return;
  }
  actualizarInteraccion(tarjeta.dataset.id, 'like');
}

// Maneja la navegación inferior
function manejarNavegacion(evento) {
  const boton = evento.target.closest('.boton-nav');
  if (!boton) {
    return;
  }
  const seccion = boton.dataset.seccion;
  if (seccion === 'publicar') {
    abrirModalPublicar();
    return;
  }
  mostrarSeccionPrincipal(seccion);
}

// Muestra el feed directamente sin animación inicial
function mostrarFeedDirecto() {
  obtenerElemento('seccion-registro').classList.add('oculto');
  obtenerElemento('seccion-cuaderno').classList.add('oculto');
  const feed = obtenerElemento('seccion-feed');
  feed.classList.remove('oculto');
  feed.classList.add('feed-visible');
}

// Maneja el cambio del filtro por tema en el feed
function manejarCambioTema(evento) {
  temaSeleccionadoFeed = evento.target.value;
  renderizarPublicaciones();
}

// Maneja el cambio del filtro por tema en Mi Cuaderno
function manejarCambioTemaCuaderno(evento) {
  temaSeleccionadoCuaderno = evento.target.value;
  renderizarCuaderno();
  actualizarContadorGuardados();
}

// Configura eventos principales de la interfaz
function configurarEventos() {
  obtenerElemento('formulario-registro').addEventListener('submit', manejarEnvioRegistro);
  obtenerElemento('boton-editar-perfil').addEventListener('click', mostrarRegistro);
  obtenerElemento('contenedor-publicaciones').addEventListener('click', manejarAccionPublicacion);
  obtenerElemento('contenedor-guardados').addEventListener('click', manejarAccionPublicacion);
  obtenerElemento('contenedor-publicaciones').addEventListener('dblclick', manejarDobleClicPublicacion);
  obtenerElemento('contenedor-guardados').addEventListener('dblclick', manejarDobleClicPublicacion);
  obtenerElemento('grupo-materias').addEventListener('click', manejarClicChip);
  obtenerElemento('grupo-intereses').addEventListener('click', manejarClicChip);
  obtenerElemento('barra-navegacion').addEventListener('click', manejarNavegacion);
  obtenerElemento('boton-cerrar-modal').addEventListener('click', cerrarModalPublicar);
  obtenerElemento('formulario-publicar').addEventListener('submit', manejarEnvioPublicacion);
  obtenerElemento('filtro-tema-cuaderno').addEventListener('change', manejarCambioTemaCuaderno);
  obtenerElemento('filtro-tema-feed').addEventListener('change', manejarCambioTema);
}

// Inicializa la aplicación según el estado guardado
function iniciarAplicacion() {
  const usuario = obtenerUsuario();
  cargarUsuarioEnFormulario(usuario);
  configurarEventos();
  actualizarSelectorTemas();
  actualizarContadorGuardados();
  const tienePerfil = usuario.nombre && usuario.carrera;
  if (tienePerfil) {
    mostrarResumenPerfil(usuario);
    mostrarNavegacion(true);
    seccionActual = 'feed';
    actualizarNavegacionActiva('feed');
    renderizarVistaActual();
    mostrarFeedDirecto();
  } else {
    mostrarRegistro();
  }
}

document.addEventListener('DOMContentLoaded', iniciarAplicacion);
