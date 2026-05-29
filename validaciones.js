// ========================================
// FUNCIONES DE VALIDACIÓN (10 puntos c/u)
// ========================================

// 1. Validar Apellido (solo caracteres, sin dígitos)
function validarApellido(apellido) {
    const regexApellido = /^[a-záéíóúàèìòùäëïöüâêîôûãñõ\s'-]+$/i;
    
    if (apellido.trim().length === 0) {
        return { valido: false, mensaje: "El apellido es requerido" };
    }
    
    if (!regexApellido.test(apellido)) {
        return { valido: false, mensaje: "El apellido no puede contener números" };
    }
    
    if (apellido.trim().length < 2) {
        return { valido: false, mensaje: "El apellido debe tener al menos 2 caracteres" };
    }
    
    return { valido: true, mensaje: "" };
}

// 2. Validar Nombre (solo caracteres, sin dígitos)
function validarNombre(nombre) {
    const regexNombre = /^[a-záéíóúàèìòùäëïöüâêîôûãñõ\s'-]+$/i;
    
    if (nombre.trim().length === 0) {
        return { valido: false, mensaje: "El nombre es requerido" };
    }
    
    if (!regexNombre.test(nombre)) {
        return { valido: false, mensaje: "El nombre no puede contener números" };
    }
    
    if (nombre.trim().length < 2) {
        return { valido: false, mensaje: "El nombre debe tener al menos 2 caracteres" };
    }
    
    return { valido: true, mensaje: "" };
}

// 3. Validar DNI (solo números, longitud exacta de 8)
function validarDni(dni) {
    const regexDni = /^[0-9]+$/;
    
    if (dni.trim().length === 0) {
        return { valido: false, mensaje: "El DNI es requerido" };
    }
    
    if (!regexDni.test(dni)) {
        return { valido: false, mensaje: "El DNI solo puede contener números" };
    }
    
    if (dni.length !== 8) {
        return { valido: false, mensaje: "El DNI debe tener exactamente 8 dígitos" };
    }
    
    return { valido: true, mensaje: "" };
}

// 4. Validar Fecha de Nacimiento (año mayor a 2006)
function validarFechaNacimiento(fechaString) {
    if (!fechaString || fechaString.trim().length === 0) {
        return { valido: false, mensaje: "La fecha de nacimiento es requerida" };
    }
    
    const fecha = new Date(fechaString);
    
    if (isNaN(fecha.getTime())) {
        return { valido: false, mensaje: "Formato de fecha inválido" };
    }
    
    const anio = fecha.getFullYear();
    
    if (anio > 2006) {
        return { valido: false, mensaje: "Debes tener al menos 18 años (nacido antes de 2006)" };
    }
    
    const hoy = new Date();
    if (fecha > hoy) {
        return { valido: false, mensaje: "La fecha no puede ser futura" };
    }
    
    return { valido: true, mensaje: "" };
}

// 5. Validar Email (formato válido de correo electrónico)
function validarEmail(email) {
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (email.trim().length === 0) {
        return { valido: false, mensaje: "El email es requerido" };
    }
    
    if (!regexEmail.test(email)) {
        return { valido: false, mensaje: "El formato del email no es válido" };
    }
    
    return { valido: true, mensaje: "" };
}

// ========================================
// ESTADO GLOBAL
// ========================================

let respuestasGuardadas = {
    pregunta1: "",
    pregunta2: "",
    pregunta3: ""
};

let formularioValido = false;

// ========================================
// FUNCIONES DEL DOM Y EVENTOS
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registroForm');
    const inputs = form.querySelectorAll('input[type="text"], input[type="email"], input[type="date"]');
    const btnPreguntas = document.getElementById('btnPreguntas');
    
    // Agregar validación en tiempo real
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validarCampo(this);
        });
        
        input.addEventListener('input', function() {
            if (this.classList.contains('error')) {
                validarCampo(this);
            }
        });
    });
    
    // Validar al enviar el formulario
    btnPreguntas.addEventListener('click', function(e) {
        e.preventDefault();
        validarFormularioCompleto();
    });
});

// Validar un campo individual
function validarCampo(input) {
    const id = input.id;
    let resultado = { valido: false, mensaje: "" };

    switch(id) {
        case 'apellido':
            resultado = validarApellido(input.value);
            mostrarError(input, resultado, 'errorApellido');
            return resultado.valido;
        case 'nombre':
            resultado = validarNombre(input.value);
            mostrarError(input, resultado, 'errorNombre');
            return resultado.valido;
        case 'dni':
            resultado = validarDni(input.value);
            mostrarError(input, resultado, 'errorDni');
            return resultado.valido;
        case 'fechaNacimiento':
            resultado = validarFechaNacimiento(input.value);
            mostrarError(input, resultado, 'errorFecha');
            return resultado.valido;
        case 'email':
            resultado = validarEmail(input.value);
            mostrarError(input, resultado, 'errorEmail');
            return resultado.valido;
        default:
            return false;
    }
}

// Mostrar o eliminar error en el DOM
function mostrarError(input, resultado, errorId) {
    const errorSpan = document.getElementById(errorId);
    
    if (resultado.valido) {
        input.classList.remove('error');
        errorSpan.classList.remove('show');
        errorSpan.textContent = '';
    } else {
        input.classList.add('error');
        errorSpan.classList.add('show');
        errorSpan.textContent = resultado.mensaje;
    }
}

// Validar formulario completo
function validarFormularioCompleto() {
    const apellido = document.getElementById('apellido');
    const nombre = document.getElementById('nombre');
    const dni = document.getElementById('dni');
    const fecha = document.getElementById('fechaNacimiento');
    const email = document.getElementById('email');
    
    let todosValidos = true;
    
    todosValidos &= validarCampo(apellido);
    todosValidos &= validarCampo(nombre);
    todosValidos &= validarCampo(dni);
    todosValidos &= validarCampo(fecha);
    todosValidos &= validarCampo(email);
    
    if (todosValidos) {
        formularioValido = true;
        mostrarPreguntas();
    } else {
        formularioValido = false;
        alert('Por favor, completa correctamente todos los campos del formulario');
    }
}

// ========================================
// FUNCIÓN PROGRESIVA DE PREGUNTAS (20 puntos)
// ========================================

function mostrarPreguntas() {
    // Preguntas progresivas
    const preguntas = [
        {
            pregunta: "¿Cuál es tu nacionalidad?",
            opciones: ["Argentina", "Brasil", "Chile", "Otra"]
        },
        {
            pregunta: "¿Cuál es tu color favorito?",
            opciones: ["Rojo", "Azul", "Verde", "Amarillo", "Otro"]
        },
        {
            pregunta: "¿Nombre de tu mascota?",
            opciones: null // Respuesta libre
        }
    ];
    
    let preguntaActual = 0;
    
    function hacerPregunta() {
        if (preguntaActual >= preguntas.length) {
            mostrarResultados();
            return;
        }
        
        const preguntaObj = preguntas[preguntaActual];
        let respuesta;
        
        if (preguntaObj.opciones) {
            // Mostrar opciones
            let mensaje = preguntaObj.pregunta + "\n\n";
            preguntaObj.opciones.forEach((opcion, index) => {
                mensaje += (index + 1) + ". " + opcion + "\n";
            });
            
            respuesta = prompt(mensaje, "");
        } else {
            respuesta = prompt(preguntaObj.pregunta, "");
        }
        
        if (respuesta === null) {
            // Usuario canceló
            return;
        }
        
        if (respuesta.trim().length === 0) {
            alert("Por favor, ingresa una respuesta");
            return;
        }
        
        // Guardar respuesta
        guardarRespuesta(preguntaActual, respuesta);
        preguntaActual++;
        hacerPregunta();
    }
    
    hacerPregunta();
}

// Guardar respuesta en objeto global
function guardarRespuesta(indice, respuesta) {
    if (indice === 0) {
        respuestasGuardadas.pregunta1 = respuesta;
    } else if (indice === 1) {
        respuestasGuardadas.pregunta2 = respuesta;
    } else if (indice === 2) {
        respuestasGuardadas.pregunta3 = respuesta;
    }
}

// Mostrar resultados en el DOM
function mostrarResultados() {
    const respuestasContainer = document.getElementById('respuestasContainer');
    const respuestasBox = document.getElementById('respuestas');
    const mensajeExito = document.getElementById('mensajeExito');
    
    // Limpiar contenido anterior
    respuestasBox.innerHTML = '';
    
    // Crear HTML con las respuestas
    const preguntas = [
        "¿Cuál es tu nacionalidad?",
        "¿Cuál es tu color favorito?",
        "¿Nombre de tu mascota?"
    ];
    
    const respuestas = [
        respuestasGuardadas.pregunta1,
        respuestasGuardadas.pregunta2,
        respuestasGuardadas.pregunta3
    ];
    
    respuestas.forEach((respuesta, index) => {
        const div = document.createElement('div');
        div.className = 'respuesta-item';
        div.innerHTML = `
            <div class="respuesta-pregunta">${preguntas[index]}</div>
            <div class="respuesta-respuesta">${respuesta}</div>
        `;
        respuestasBox.appendChild(div);
    });
    
    // Mostrar contenedor de respuestas
    respuestasContainer.style.display = 'block';
    
    // Mostrar mensaje de éxito
    setTimeout(() => {
        mensajeExito.style.display = 'block';
    }, 500);
    
    // Deshabilitar botón
    document.getElementById('btnPreguntas').disabled = true;
}