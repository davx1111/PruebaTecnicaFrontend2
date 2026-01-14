// Arreglo de preguntas
const preguntas = [
    {
        pregunta: "¿Qué significa HTML?",
        opciones: [
            "Hyper Text Markup Language",
            "High Tech Modern Language",
            "Home Tool Markup Language",
            "Hyperlinks and Text Markup Language"
        ],
        respuestaCorrecta: 0
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
        pregunta: "¿Cuál es la forma correcta de declarar una variable en JavaScript ES6?",
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

// Variables globales
let preguntaActual = 0;
let respuestasUsuario = {};

// Elementos del DOM
const preguntaTexto = document.getElementById('preguntaTexto');
const opcionesContainer = document.getElementById('opcionesContainer');
const numeroPregunta = document.getElementById('numeroPregunta');
const totalPreguntas = document.getElementById('totalPreguntas');
const btnAnterior = document.getElementById('btnAnterior');
const btnSiguiente = document.getElementById('btnSiguiente');

// Inicializar la aplicación
document.addEventListener('DOMContentLoaded', inicializar);

function inicializar() {
    totalPreguntas.textContent = preguntas.length;
    mostrarPregunta();
    
    // Event listeners para los botones
    btnAnterior.addEventListener('click', irAnterior);
    btnSiguiente.addEventListener('click', irSiguiente);
}

function mostrarPregunta() {
    const pregunta = preguntas[preguntaActual];
    
    // Actualizar contador
    numeroPregunta.textContent = preguntaActual + 1;
    
    // Mostrar pregunta
    preguntaTexto.textContent = pregunta.pregunta;
    
    // Limpiar opciones anteriores
    opcionesContainer.innerHTML = '';
    
    // Crear radio buttons para cada opción
    pregunta.opciones.forEach((opcion, index) => {
        const div = document.createElement('div');
        div.className = 'form-check mb-2';
        
        const input = document.createElement('input');
        input.className = 'form-check-input';
        input.type = 'radio';
        input.name = 'respuesta';
        input.id = `opcion${index}`;
        input.value = index;
        
        const label = document.createElement('label');
        label.className = 'form-check-label';
        label.htmlFor = `opcion${index}`;
        label.textContent = opcion;
        
        div.appendChild(input);
        div.appendChild(label);
        opcionesContainer.appendChild(div);
    });
}

function irAnterior() {
    // Función para el botón Anterior
    console.log('Ir a pregunta anterior');
}

function irSiguiente() {
    // Función para el botón Siguiente
    console.log('Ir a pregunta siguiente');
}
            