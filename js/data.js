// Gestión de datos, modelos y persistencia local para Inslearns

const CLAVE_USUARIO = 'inslearns_user';
const CLAVE_PUBLICACIONES = 'inslearns_posts';
const CLAVE_GUARDADOS = 'inslearns_math_saved';
const CLAVE_LIKES = 'inslearns_math_likes';

// Crea un objeto Usuario con el esquema definido
function crearUsuarioBase() {
  return {
    nombre: '',
    carrera: '',
    materiasSeleccionadas: [],
    intereses: []
  };
}

// Convierte un texto separado por comas en una lista limpia
function convertirTextoALista(texto) {
  if (!texto) {
    return [];
  }
  return texto.split(',').map((e) => e.trim()).filter((e) => e.length > 0);
}

// Obtiene el usuario almacenado o un usuario base
function obtenerUsuario() {
  const datos = localStorage.getItem(CLAVE_USUARIO);
  if (!datos) {
    return crearUsuarioBase();
  }
  try {
    return { ...crearUsuarioBase(), ...JSON.parse(datos) };
  } catch (error) {
    return crearUsuarioBase();
  }
}

// Guarda el objeto Usuario en localStorage
function guardarUsuario(usuario) {
  localStorage.setItem(CLAVE_USUARIO, JSON.stringify(usuario));
}

// Lee un valor JSON desde localStorage con valor por defecto
function leerJsonLocal(clave, valorPorDefecto) {
  const datos = localStorage.getItem(clave);
  if (!datos) {
    return valorPorDefecto;
  }
  try {
    return JSON.parse(datos);
  } catch (error) {
    return valorPorDefecto;
  }
}

// Obtiene el mapa de likes por apunte desde localStorage
function obtenerLikes() {
  return leerJsonLocal(CLAVE_LIKES, {});
}

// Guarda el mapa de likes por apunte en localStorage
function guardarLikes(mapaLikes) {
  localStorage.setItem(CLAVE_LIKES, JSON.stringify(mapaLikes));
}

// Diagramas SVG por publicación para apoyo visual en Matemáticas
const DIAGRAMAS_POR_PUBLICACION = {
  'mat-1': '<svg viewBox="0 0 200 120" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Pendiente de una recta"><rect width="200" height="120" fill="#081018"/><line x1="20" y1="100" x2="180" y2="100" stroke="#00f0ff" stroke-width="2"/><line x1="40" y1="110" x2="40" y2="10" stroke="#00f0ff" stroke-width="2"/><line x1="40" y1="90" x2="165" y2="25" stroke="#ff00e6" stroke-width="3"/><circle cx="60" cy="80" r="4" fill="#ffee00"/><circle cx="130" cy="43" r="4" fill="#39ff14"/><text x="70" y="70" fill="#e6f7ff" font-size="11">m = Δy/Δx</text></svg>',
  'mat-2': '<svg viewBox="0 0 200 120" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Teorema de Pitágoras"><rect width="200" height="120" fill="#081018"/><polygon points="40,95 150,95 40,25" fill="rgba(0,240,255,0.15)" stroke="#00f0ff" stroke-width="3"/><rect x="40" y="85" width="10" height="10" fill="none" stroke="#ffee00" stroke-width="2"/><text x="90" y="110" fill="#39ff14" font-size="12">b</text><text x="20" y="65" fill="#39ff14" font-size="12">a</text><text x="100" y="55" fill="#ff00e6" font-size="12">c</text><text x="120" y="20" fill="#e6f7ff" font-size="12">a²+b²=c²</text></svg>',
  'mat-3': '<svg viewBox="0 0 200 120" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Razones trigonométricas"><rect width="200" height="120" fill="#081018"/><polygon points="35,95 165,95 165,35" fill="rgba(255,0,230,0.12)" stroke="#00f0ff" stroke-width="3"/><rect x="155" y="85" width="10" height="10" fill="none" stroke="#ffee00" stroke-width="2"/><text x="95" y="110" fill="#39ff14" font-size="11">ady</text><text x="170" y="70" fill="#39ff14" font-size="11">op</text><text x="80" y="55" fill="#ff00e6" font-size="11">hip</text><text x="45" y="25" fill="#e6f7ff" font-size="11">sen, cos, tan</text></svg>',
  'mat-4': '<svg viewBox="0 0 200 120" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Derivada y tangente"><rect width="200" height="120" fill="#081018"/><path d="M20 95 Q70 90 90 70 T170 20" fill="none" stroke="#00f0ff" stroke-width="3"/><line x1="55" y1="95" x2="140" y2="35" stroke="#ffee00" stroke-width="2"/><circle cx="95" cy="66" r="4" fill="#ff00e6"/><text x="110" y="85" fill="#39ff14" font-size="12">tangente</text><text x="130" y="18" fill="#e6f7ff" font-size="12">f\'(x)</text></svg>',
  'mat-5': '<svg viewBox="0 0 200 120" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Probabilidad con dados"><rect width="200" height="120" fill="#081018"/><rect x="35" y="35" width="40" height="40" rx="6" fill="rgba(0,240,255,0.15)" stroke="#00f0ff" stroke-width="2"/><circle cx="55" cy="55" r="4" fill="#ffee00"/><rect x="95" y="35" width="40" height="40" rx="6" fill="rgba(255,0,230,0.15)" stroke="#ff00e6" stroke-width="2"/><circle cx="107" cy="47" r="3" fill="#39ff14"/><circle cx="123" cy="63" r="3" fill="#39ff14"/><text x="45" y="95" fill="#e6f7ff" font-size="12">P(A)=favorables/posibles</text></svg>'
};

// Devuelve el diagrama SVG asociado a una publicación
function obtenerDiagramaPorId(idPublicacion) {
  return DIAGRAMAS_POR_PUBLICACION[idPublicacion] || '';
}

// Colección inicial de apuntes matemáticos de clase
const PUBLICACIONES_INICIALES = [
  {
    id: 'mat-1',
    autor: 'Profe Lina',
    materia: 'Álgebra',
    titulo: 'Álgebra / Pendiente de una recta',
    contenido: 'Fórmulas: m = (y₂ - y₁) / (x₂ - x₁), y = mx + b.\nExplicación: La pendiente m indica la razón de cambio entre y y x; b es la intersección con el eje y.\nEjemplo: Si A(1,2) y B(3,6), entonces m = (6-2)/(3-1) = 2 y la recta puede escribirse como y = 2x.\nNota de cuidado: Si x₂ = x₁, la recta es vertical y la pendiente no está definida (no es cero).',
    veracidad: null,
    ejercicio: null,
    likes: 12,
    guardado: false
  },
  {
    id: 'mat-2',
    autor: 'Marco Ríos',
    materia: 'Geometría',
    titulo: 'Geometría / Teorema de Pitágoras',
    contenido: 'Fórmulas: a² + b² = c², donde c es la hipotenusa.\nExplicación: En un triángulo rectángulo, el cuadrado de la hipotenusa equivale a la suma de los cuadrados de los catetos.\nEjemplo: Si a = 3 y b = 4, entonces c² = 9 + 16 = 25, por lo que c = 5.\nNota de cuidado: El teorema solo se aplica a triángulos rectángulos; identifica primero el ángulo de 90°.',
    veracidad: null,
    ejercicio: null,
    likes: 15,
    guardado: false
  },
  {
    id: 'mat-3',
    autor: 'Sara Núñez',
    materia: 'Trigonometría',
    titulo: 'Trigonometría / Razones trigonométricas',
    contenido: 'Fórmulas: sen(θ)=op/hip, cos(θ)=ady/hip, tan(θ)=op/ady.\nExplicación: Las razones trigonométricas relacionan los lados de un triángulo rectángulo con uno de sus ángulos agudos.\nEjemplo: Si op = 3, ady = 4 e hip = 5, entonces sen(θ)=3/5, cos(θ)=4/5 y tan(θ)=3/4.\nNota de cuidado: Verifica qué lado es opuesto y cuál es adyacente respecto al ángulo elegido, no al triángulo completo.',
    veracidad: null,
    ejercicio: null,
    likes: 10,
    guardado: false
  },
  {
    id: 'mat-4',
    autor: 'Diego Vega',
    materia: 'Cálculo',
    titulo: 'Cálculo / Derivadas básicas',
    contenido: 'Fórmulas: d/dx (xⁿ) = n·xⁿ⁻¹, d/dx (c) = 0.\nExplicación: La derivada representa la tasa de cambio instantánea y la pendiente de la recta tangente a la curva en un punto.\nEjemplo: Si f(x)=x³, entonces f\'(x)=3x²; en x=2 la pendiente es 12.\nNota de cuidado: Derivar no es lo mismo que evaluar la función; primero se obtiene f\'(x) y luego se sustituye el valor de x.',
    veracidad: null,
    ejercicio: null,
    likes: 9,
    guardado: false
  },
  {
    id: 'mat-5',
    autor: 'Valeria Cruz',
    materia: 'Probabilidad',
    titulo: 'Probabilidad / Regla básica',
    contenido: 'Fórmulas: P(A)=casos favorables/casos posibles, 0 ≤ P(A) ≤ 1.\nExplicación: La probabilidad mide qué tan posible es que ocurra un evento dentro de un espacio muestral.\nEjemplo: Al lanzar un dado justo, P(obtener un número par)=3/6=1/2.\nNota de cuidado: Cuenta solo casos igualmente probables y asegúrate de no exceder el total de casos posibles.',
    veracidad: null,
    ejercicio: null,
    likes: 11,
    guardado: false
  }
];

// Devuelve una copia de las publicaciones iniciales de ejemplo
function obtenerPublicacionesIniciales() {
  return PUBLICACIONES_INICIALES.map((publicacion) => ({ ...publicacion }));
}

// Aplica likes y guardados persistidos a una publicación
function aplicarEstadoPersistido(publicacion, likes, guardados) {
  const copia = { ...publicacion };
  if (typeof likes[copia.id] === 'number') {
    copia.likes = likes[copia.id];
  }
  copia.guardado = guardados.includes(copia.id);
  return copia;
}

// Sincroniza claves de likes y guardados desde publicaciones
function sincronizarClavesPersistencia(publicaciones) {
  const likes = {};
  const guardados = [];
  publicaciones.forEach((publicacion) => {
    likes[publicacion.id] = publicacion.likes || 0;
    if (publicacion.guardado) {
      guardados.push(publicacion.id);
    }
  });
  guardarLikes(likes);
  guardarGuardados(guardados);
}

// Obtiene publicaciones desde localStorage o inicializa ejemplos
function obtenerPublicaciones() {
  const datos = localStorage.getItem(CLAVE_PUBLICACIONES);
  let publicaciones = datos ? null : obtenerPublicacionesIniciales();
  if (datos) {
    try {
      publicaciones = JSON.parse(datos);
    } catch (error) {
      publicaciones = obtenerPublicacionesIniciales();
    }
  }
  const likes = obtenerLikes();
  const guardados = obtenerGuardados();
  return publicaciones.map((pub) => aplicarEstadoPersistido(pub, likes, guardados));
}

// Guarda la colección de publicaciones y sincroniza persistencia
function guardarPublicaciones(publicaciones) {
  localStorage.setItem(CLAVE_PUBLICACIONES, JSON.stringify(publicaciones));
  sincronizarClavesPersistencia(publicaciones);
}

// Obtiene la información de publicaciones guardadas
function obtenerGuardados() {
  const guardados = leerJsonLocal(CLAVE_GUARDADOS, []);
  return Array.isArray(guardados) ? guardados : [];
}

// Guarda la información de publicaciones guardadas
function guardarGuardados(guardados) {
  localStorage.setItem(CLAVE_GUARDADOS, JSON.stringify(guardados));
}
