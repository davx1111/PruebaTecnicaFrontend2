// ========================================
// 1. DATOS DEL CUESTIONARIO
// ========================================
// Array con todas las preguntas del cuestionario
const preguntas = [
    {
        pregunta: "¿Qué significa HTML?",
        opciones: [
            "Hyper Text Markup Language",
            "High Tech Modern Language",
            "Home Tool Markup Language",
            "Hyperlinks and Text Markup Language"
        ],
        respuestaCorrecta: 0 // La primera opción (índice 0) es correcta
    },
    {
        pregunta: "¿Cuál es el método de array que NO modifica el array original?",
        opciones: [
            "push()",
            "pop()",
            "map()",
            "splice()"
        ],
        respuestaCorrecta: 2
    },
    {
        pregunta: "¿Qué significa CSS?",
        opciones: [
            "Computer Style Sheets",
            "Cascading Style Sheets",
            "Creative Style Sheets",
            "Colorful Style Sheets"
        ],
        respuestaCorrecta: 1
    },
    {
        pregunta: "¿Cuál de estos NO es un tipo de dato primitivo en JavaScript?",
        opciones: [
            "String",
            "Boolean",
            "Array",
            "Number"
        ],
        respuestaCorrecta: 2
    },
    {
        pregunta: "¿Qué etiqueta HTML se usa para definir un script de JavaScript?",
        opciones: [
            "<javascript>",
            "<js>",
            "<script>",
            "<scripting>"
        ],
        respuestaCorrecta: 2
    },
    {
        pregunta: "¿Cuál es la forma correcta de declarar una variable en JavaScript?",
        opciones: [
            "var nombre = 'Juan';",
            "let nombre = 'Juan';",
            "const nombre = 'Juan';",
            "Todas las anteriores"
        ],
        respuestaCorrecta: 3
    },
    {
        pregunta: "¿Qué framework CSS está siendo usado en esta prueba?",
        opciones: [
            "Tailwind",
            "Foundation",
            "Bootstrap",
            "Bulma"
        ],
        respuestaCorrecta: 2
    },
    {
        pregunta: "¿Cuál es el operador de igualdad estricta en JavaScript?",
        opciones: [
            "=",
            "==",
            "===",
            "!="
        ],
        respuestaCorrecta: 2
    },
    {
        pregunta: "¿Qué método se usa para agregar un elemento al final de un array?",
        opciones: [
            "shift()",
            "unshift()",
            "push()",
            "pop()"
        ],
        respuestaCorrecta: 2
    },
    {
        pregunta: "¿Cuál es la etiqueta semántica HTML5 para el contenido principal?",
        opciones: [
            "<section>",
            "<main>",
            "<article>",
            "<div>"
        ],
        respuestaCorrecta: 1
    }
];

// ========================================
// 2. VARIABLES GLOBALES
// ========================================
let preguntaActual = 0; // Qué pregunta estamos mostrando (empieza en 0)
let respuestasUsuario = {}; // Objeto para guardar las respuestas del usuario

// ========================================
// 3. OBTENER ELEMENTOS DEL HTML
// ========================================
// Buscamos todos los elementos que vamos a modificar
const preguntaTexto = document.getElementById('preguntaTexto');
const opcionesContainer = document.getElementById('opcionesContainer');
const numeroPregunta = document.getElementById('numeroPregunta');
const totalPreguntas = document.getElementById('totalPreguntas');
const btnAnterior = document.getElementById('btnAnterior');
const btnSiguiente = document.getElementById('btnSiguiente');
const instrucciones = document.getElementById('instrucciones');
const preguntaContainer = document.getElementById('preguntaContainer');
const contador = document.getElementById('contador');
const resultado = document.getElementById('resultado');
const resumenResultados = document.getElementById('resumenResultados');

// ========================================
// 4. INICIAR LA APLICACIÓN
// ========================================
// Cuando la página termine de cargar, ejecutar la función iniciar()
document.addEventListener('DOMContentLoaded', iniciar);

function iniciar() {
    // Mostrar cuántas preguntas hay en total
    totalPreguntas.textContent = preguntas.length;
    
    // Cargar respuestas guardadas si existen
    cargarRespuestasGuardadas();
    
    // Mostrar la primera pregunta
    mostrarPregunta();
    
    // Configurar los botones correctamente
    configurarBotones();
    
    // Agregar eventos a los botones
    btnAnterior.addEventListener('click', irAPreguntaAnterior);
    btnSiguiente.addEventListener('click', irAPreguntaSiguiente);
}

// ========================================
// 5. CARGAR Y GUARDAR RESPUESTAS (localStorage)
// ========================================

// Cargar respuestas que estén guardadas en el navegador
function cargarRespuestasGuardadas() {
    // Intentar obtener las respuestas del localStorage
    const respuestasGuardadas = localStorage.getItem('respuestasQuiz');
    
    // Si hay respuestas guardadas, convertirlas de texto a objeto
    if (respuestasGuardadas) {
        respuestasUsuario = JSON.parse(respuestasGuardadas);
    }
}

// Guardar las respuestas en el navegador
function guardarRespuestas() {
    // Convertir el objeto a texto y guardarlo
    localStorage.setItem('respuestasQuiz', JSON.stringify(respuestasUsuario));
}

// Guardar la respuesta cuando el usuario selecciona una opción
function guardarRespuestaSeleccionada() {
    // Buscar cuál radio button está seleccionado
    const opcionSeleccionada = document.querySelector('input[name="respuesta"]:checked');
    
    // Si hay una opción seleccionada
    if (opcionSeleccionada) {
        // Guardar el índice de la opción seleccionada
        respuestasUsuario[preguntaActual] = parseInt(opcionSeleccionada.value);
        
        // Guardar en localStorage
        guardarRespuestas();
    }
}

// ========================================
// 6. MOSTRAR PREGUNTA EN PANTALLA
// ========================================
function mostrarPregunta() {
    // Obtener la pregunta actual del array
    const pregunta = preguntas[preguntaActual];
    
    // Actualizar el número de pregunta (ej: "Pregunta 1 de 10")
    numeroPregunta.textContent = preguntaActual + 1;
    
    // Mostrar el texto de la pregunta
    preguntaTexto.textContent = pregunta.pregunta;
    
    // Limpiar las opciones anteriores
    opcionesContainer.innerHTML = '';
    
    // Crear un radio button para cada opción
    pregunta.opciones.forEach((opcion, indice) => {
        // Crear el contenedor
        const divOpcion = document.createElement('div');
        divOpcion.className = 'form-check mb-2';
        
        // Crear el radio button
        const radioButton = document.createElement('input');
        radioButton.className = 'form-check-input';
        radioButton.type = 'radio';
        radioButton.name = 'respuesta';
        radioButton.id = `opcion${indice}`;
        radioButton.value = indice;
        
        // Si esta opción fue seleccionada antes, marcarla
        if (respuestasUsuario[preguntaActual] === indice) {
            radioButton.checked = true;
        }
        
        // Cuando el usuario seleccione esta opción, guardarla
        radioButton.addEventListener('change', guardarRespuestaSeleccionada);
        
        // Crear la etiqueta (label) con el texto de la opción
        const etiqueta = document.createElement('label');
        etiqueta.className = 'form-check-label';
        etiqueta.htmlFor = `opcion${indice}`;
        etiqueta.textContent = opcion;
        
        // Agregar el radio button y la etiqueta al contenedor
        divOpcion.appendChild(radioButton);
        divOpcion.appendChild(etiqueta);
        
        // Agregar el contenedor a la página
        opcionesContainer.appendChild(divOpcion);
    });
}

// ========================================
// 7. NAVEGACIÓN ENTRE PREGUNTAS
// ========================================

// Ir a la pregunta anterior
function irAPreguntaAnterior() {
    // Solo retroceder si no estamos en la primera pregunta
    if (preguntaActual > 0) {
        preguntaActual = preguntaActual - 1; // Restar 1
        mostrarPregunta();
        configurarBotones();
    }
}

// Ir a la pregunta siguiente o finalizar
function irAPreguntaSiguiente() {
    // Si NO estamos en la última pregunta
    if (preguntaActual < preguntas.length - 1) {
        preguntaActual = preguntaActual + 1; // Sumar 1
        mostrarPregunta();
        configurarBotones();
    } else {
        // Si estamos en la última pregunta, finalizar
        mostrarResultados();
    }
}

// ========================================
// 8. CONFIGURAR BOTONES
// ========================================
function configurarBotones() {
    // BOTÓN ANTERIOR
    // Si estamos en la primera pregunta (índice 0)
    if (preguntaActual === 0) {
        btnAnterior.disabled = true; // Deshabilitar
        btnAnterior.classList.add('disabled');
    } else {
        btnAnterior.disabled = false; // Habilitar
        btnAnterior.classList.remove('disabled');
    }
    
    // BOTÓN SIGUIENTE
    // Si estamos en la última pregunta
    if (preguntaActual === preguntas.length - 1) {
        btnSiguiente.textContent = 'Finalizar'; // Cambiar texto
        btnSiguiente.classList.remove('btn-primary');
        btnSiguiente.classList.add('btn-success');
    } else {
        btnSiguiente.textContent = 'Siguiente'; // Texto normal
        btnSiguiente.classList.remove('btn-success');
        btnSiguiente.classList.add('btn-primary');
    }
}

// ========================================
// 9. MOSTRAR RESULTADOS
// ========================================
function mostrarResultados() {
    // Contadores
    let aciertos = 0;
    let errores = 0;
    
    // Variable para construir el HTML de la tabla
    let tablaHTML = '<div class="table-responsive"><table class="table table-striped">';
    tablaHTML += '<thead><tr><th>Pregunta</th><th>Tu Respuesta</th><th>Resultado</th></tr></thead><tbody>';
    
    // Revisar cada pregunta
    preguntas.forEach((pregunta, indice) => {
        // Obtener la respuesta que dio el usuario
        const respuestaDelUsuario = respuestasUsuario[indice];
        
        // Verificar si es correcta
        const esCorrecto = respuestaDelUsuario === pregunta.respuestaCorrecta;
        
        // Contar aciertos y errores
        if (esCorrecto) {
            aciertos++;
        } else {
            errores++;
        }
        
        // Obtener el texto de la respuesta
        let textoRespuesta = 'Sin respuesta';
        if (respuestaDelUsuario !== undefined) {
            textoRespuesta = pregunta.opciones[respuestaDelUsuario];
        }
        
        // Determinar el color de la fila
        const colorFila = esCorrecto ? 'table-success' : 'table-danger';
        const icono = esCorrecto ? '✓' : '✗';
        
        // Agregar fila a la tabla
        tablaHTML += `
            <tr class="${colorFila}">
                <td><strong>${indice + 1}.</strong> ${pregunta.pregunta}</td>
                <td>${textoRespuesta}</td>
                <td class="text-center"><strong>${icono}</strong></td>
            </tr>
        `;
    });
    
    tablaHTML += '</tbody></table></div>';
    
    // Calcular porcentaje
    const porcentaje = (aciertos / preguntas.length * 100).toFixed(2);
    
    // Crear resumen general
    const resumenGeneral = `
        <div class="alert alert-info mb-4">
            <h5>Resumen General</h5>
            <p><strong>Total de preguntas:</strong> ${preguntas.length}</p>
            <p><strong>Respuestas correctas:</strong> ${aciertos}</p>
            <p><strong>Respuestas incorrectas:</strong> ${errores}</p>
            <p><strong>Porcentaje de aciertos:</strong> ${porcentaje}%</p>
        </div>
    `;
    
    // Ocultar el cuestionario
    instrucciones.style.display = 'none';
    contador.style.display = 'none';
    preguntaContainer.style.display = 'none';
    opcionesContainer.style.display = 'none';
    btnAnterior.style.display = 'none';
    btnSiguiente.style.display = 'none';
    
    // Mostrar los resultados
    resultado.style.display = 'block';
    resumenResultados.innerHTML = resumenGeneral + tablaHTML;
    
    // Crear botón para reiniciar
    const botonReiniciar = document.createElement('button');
    botonReiniciar.className = 'btn btn-primary mt-3';
    botonReiniciar.textContent = 'Realizar Nuevo Cuestionario';
    botonReiniciar.addEventListener('click', reiniciarCuestionario);
    resumenResultados.appendChild(botonReiniciar);
}

// ========================================
// 10. REINICIAR CUESTIONARIO
// ========================================
function reiniciarCuestionario() {
    // Limpiar respuestas guardadas
    localStorage.removeItem('respuestasQuiz');
    respuestasUsuario = {};
    preguntaActual = 0;
    
    // Mostrar de nuevo el cuestionario
    instrucciones.style.display = 'block';
    contador.style.display = 'block';
    preguntaContainer.style.display = 'block';
    opcionesContainer.style.display = 'block';
    btnAnterior.style.display = 'inline-block';
    btnSiguiente.style.display = 'inline-block';
    resultado.style.display = 'none';
    
    // Empezar de nuevo
    mostrarPregunta();
    configurarBotones();
}