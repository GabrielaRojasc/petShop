export function valida (input) {
    const tipoDeInput=input.dataset.tipo;
    if(validadores[tipoDeInput]){
        validadores[tipoDeInput](input);
    }

    if(input.validity.valid){
        input.parentElement.classList.remove("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = "";
    }else {
        input.parentElement.classList.add("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = 
            mostrarMensajeDeError(tipoDeInput, input);
    }
};

const tipoDeErrores = [
    "valueMissing",
    "typeMismatch",
    "patternMismatch",
    "customError",
]

const mensajesDeError = {
    nombre: {
        valueMissing: "El campo nombre no puede estar vacío"
    },
    email: {
        valueMissing: "Este campo correo no puede estar vacío",
        typeMismatch: "El correo no es válido"
    },
    password: {
        valueMissing: "Este campo contrasenia no puede estar vacío",
        patternMismatch: "Al menos 6 caracteres, debe contener una letra minúscula, una mayúscula, un número y caractere especial"
    },
    nacimiento: {
        valueMissing: "Este campo nacimiento no puede estar vacío",
        customError: "Debes tener al menos 18 años de edad"
    },
    numero: {
        valueMissing: "Este campo no puede estar vacío",
        patternMismatch:"El formato requerido es XXX-XXX-XXXX 10 dígitos"
    },
    direccion: {
        valueMissing: "Este campo no puede estar vacío",
        patternMismatch:"La direccion debe contener entre 10 a 30 caracteres"
    },
    ciudad: {
        valueMissing: "Este campo no puede estar vacío",
        patternMismatch:"La ciudad debe contener entre 4 a 30 caracteres"
    },
    estado: {
        valueMissing: "Este campo no puede estar vacío",
        patternMismatch:"El estado debe contener entre 4 a 30 caracteres"
    },
}

const validadores = {
    nacimiento: (input) => validarNacimiento(input),
};

function mostrarMensajeDeError(tipoDeInput, input){
    let mensaje = "";
    tipoDeErrores.forEach((error) => {
        if(input.validity[error]) {
            console.log(tipoDeInput, error);
            console.log(input.validity[error]);
            console.log(mensajesDeError[tipoDeInput][error]);
            mensaje=mensajesDeError[tipoDeInput][error];
        }
    });

    return mensaje;
}

function validarNacimiento (input){
    const fechaCliente = new Date(input.value);
    let mensaje = ""
    if (!mayorEdad(fechaCliente)){
        mensaje = "Debes tener al menos 18 años de edad"
    };

    input.setCustomValidity(mensaje);
}; 

function mayorEdad(fecha){
    const fechaActual = new Date();
    const diferenciaFechas = new Date(
        fecha.getUTCFullYear() + 18,
        fecha.getUTCMonth(),
        fecha.getUTCDate()
        );
    return diferenciaFechas <= fechaActual;
};