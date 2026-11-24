// Módulo de IA: verificación de veracidad matemática y generación de ejercicios (sin manipulación del DOM)

// Simula un pequeño retraso para representar procesamiento local o llamada externa
function esperarSimulacion(milisegundos) {
  return new Promise((resolver) => setTimeout(resolver, milisegundos));
}

// Calcula un nivel de confianza simulado según la claridad del contenido
function calcularNivelConfianza(contenido) {
  const longitud = contenido ? contenido.trim().length : 0;
  if (longitud >= 120) {
    return 'Alto';
  }
  if (longitud >= 60) {
    return 'Medio';
  }
  return 'Bajo';
}

// Construye una explicación académica breve para la validación matemática
function construirExplicacionAcademica(publicacion, nivelConfianza) {
  const tema = publicacion.materia || 'el tema matemático';
  if (nivelConfianza === 'Alto') {
    return `La validación matemática de ${tema} es coherente: incluye elementos clave del tema. Se recomienda contrastar con una fuente formal.`;
  }
  if (nivelConfianza === 'Medio') {
    return `El contenido de ${tema} es comprensible, pero conviene revisar fórmulas, pasos y condiciones para confirmar su rigor matemático.`;
  }
  return `La explicación de ${tema} es limitada; amplía fórmulas, ejemplo y nota de cuidado para fortalecer la veracidad matemática.`;
}

// Verifica la veracidad matemática del contenido de una publicación
async function verificarVeracidad(publicacion) {
  // Punto de extensión: aquí podría realizarse una llamada a una API externa con la misma interfaz
  await esperarSimulacion(350);
  const contenido = publicacion.contenido || '';
  const nivelConfianza = calcularNivelConfianza(contenido);
  const explicacionAcademica = construirExplicacionAcademica(publicacion, nivelConfianza);
  return {
    nivelConfianza,
    explicacionAcademica
  };
}

// Obtiene un banco de ejercicios por materia con retroalimentación
function obtenerBancoEjercicios(materia) {
  const bancos = {
    'Álgebra': {
      pregunta: '¿Cuál es la pendiente de la recta que pasa por (1, 2) y (3, 6)?',
      opciones: ['2', '4', '1/2'],
      indiceCorrecto: 0,
      retroalimentacion: 'Correcto: m = (6 - 2) / (3 - 1) = 4 / 2 = 2.'
    },
    'Geometría': {
      pregunta: 'En un triángulo rectángulo con catetos 3 y 4, ¿cuánto mide la hipotenusa?',
      opciones: ['5', '6', '7'],
      indiceCorrecto: 0,
      retroalimentacion: 'Correcto: por Pitágoras, c² = 3² + 4² = 25, entonces c = 5.'
    },
    'Trigonometría': {
      pregunta: 'En un triángulo rectángulo, ¿qué razón define sen(θ)?',
      opciones: ['Cateto opuesto / hipotenusa', 'Cateto adyacente / hipotenusa', 'Cateto opuesto / cateto adyacente'],
      indiceCorrecto: 0,
      retroalimentacion: 'Correcto: el seno es la razón entre el cateto opuesto y la hipotenusa.'
    },
    'Cálculo': {
      pregunta: 'Si f(x) = x³, ¿cuál es f\'(x)?',
      opciones: ['3x²', 'x²', '3x'],
      indiceCorrecto: 0,
      retroalimentacion: 'Correcto: aplicando la regla de potencia, d/dx(x³) = 3x².'
    },
    'Probabilidad': {
      pregunta: 'Al lanzar un dado justo, ¿cuál es la probabilidad de obtener un número par?',
      opciones: ['1/2', '1/3', '2/3'],
      indiceCorrecto: 0,
      retroalimentacion: 'Correcto: hay 3 casos favorables (2, 4, 6) entre 6 posibles, así que P = 3/6 = 1/2.'
    }
  };
  return bancos[materia] || null;
}

// Genera un ejercicio de aprendizaje basado en la publicación
async function generarEjercicio(publicacion) {
  // Punto de extensión: aquí podría realizarse una llamada a una API externa con la misma interfaz
  await esperarSimulacion(350);
  const base = obtenerBancoEjercicios(publicacion.materia || '');
  if (base) {
    return {
      pregunta: base.pregunta,
      opciones: base.opciones.slice(),
      indiceCorrecto: base.indiceCorrecto,
      retroalimentacion: base.retroalimentacion
    };
  }
  const tema = publicacion.titulo || publicacion.materia || 'este tema';
  return {
    pregunta: `¿Cuál opción representa mejor el concepto de "${tema}"?`,
    opciones: [`Aplica correctamente el concepto de ${tema}.`, `Presenta una idea que no corresponde a ${tema}.`, `Confunde el procedimiento principal de ${tema}.`],
    indiceCorrecto: 0,
    retroalimentacion: 'La opción correcta resume la idea matemática principal del apunte de forma coherente.'
  };
}
