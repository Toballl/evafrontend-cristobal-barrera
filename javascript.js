let listaEmpleados = [];

const objEmpleado = {
    id: '',
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    sexo: ''
};

let editando = false;
let empleadoEditando = null;

const formulario = document.querySelector('#formulario');
const nombreInput = document.querySelector('#nombre');
const apellidoInput = document.querySelector('#apellido');
const emailInput = document.querySelector('#email');
const telefonoInput = document.querySelector('#telefono');
const sexoInputs = document.querySelectorAll('input[name="sexo"]');
const terminosInput = document.querySelector('#terminos');
const btnAgregarInput = document.querySelector('#btnAgregar');
const btnCancelarInput = document.querySelector('#btnCancelar');
const btnActualizarInput = document.querySelector('#btnActualizar');
const divEmpleados = document.querySelector('.div-empleados');
const offcanvasContactanos = new bootstrap.Offcanvas(document.querySelector('#contactanos'));
const offcanvasInfo = new bootstrap.Offcanvas(document.querySelector('#infoOffcanvas'));

formulario.addEventListener('submit', validarFormulario);
btnCancelarInput.addEventListener('click', cancelarEdicion);
btnActualizarInput.addEventListener('click', actualizarEmpleado);

function validarFormulario(e) {
    e.preventDefault();

    const sexoSeleccionado = Array.from(sexoInputs).find(input => input.checked)?.value;

    if (nombreInput.value === '' || apellidoInput.value === '' || emailInput.value === '' || telefonoInput.value === '' || !sexoSeleccionado || !terminosInput.checked) {
        alert('Todos los campos se deben llenar y aceptar los términos y condiciones');
        return;
    }

    if (editando) {
        editarEmpleado();
    } else {
        objEmpleado.id = Date.now();
        objEmpleado.nombre = nombreInput.value;
        objEmpleado.apellido = apellidoInput.value;
        objEmpleado.email = emailInput.value;
        objEmpleado.telefono = telefonoInput.value;
        objEmpleado.sexo = sexoSeleccionado;

        agregarEmpleado();
    }
}

function agregarEmpleado() {
    listaEmpleados.push({ ...objEmpleado });

    mostrarEmpleados();

    formulario.reset();
    limpiarObjeto();
}

function limpiarObjeto() {
    objEmpleado.id = '';
    objEmpleado.nombre = '';
    objEmpleado.apellido = '';
    objEmpleado.email = '';
    objEmpleado.telefono = '';
    objEmpleado.sexo = '';
}

function mostrarEmpleados() {
    limpiarHTML();

    listaEmpleados.forEach(empleado => {
        const { id, nombre, apellido, email, telefono, sexo } = empleado;

        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${id}</td>
            <td>${nombre}</td>
            <td>${apellido}</td>
            <td>${email}</td>
            <td>${telefono}</td>
            <td>${sexo}</td>
            <td>
                <button class="btn btn-warning ms-2 me-2" onclick="cargarEmpleado(${id})">Editar</button>
                <button class="btn btn-danger ms-2 me-2" onclick="eliminarEmpleado(${id})">Eliminar</button>
            </td>
        `;

        divEmpleados.appendChild(row);
    });
}

function limpiarHTML() {
    while (divEmpleados.firstChild) {
        divEmpleados.removeChild(divEmpleados.firstChild);
    }
}

function cargarEmpleado(id) {
    const empleado = listaEmpleados.find(empleado => empleado.id === id);

    if (empleado) {
        nombreInput.value = empleado.nombre;
        apellidoInput.value = empleado.apellido;
        emailInput.value = empleado.email;
        telefonoInput.value = empleado.telefono;
        sexoInputs.forEach(input => {
            if (input.value === empleado.sexo) {
                input.checked = true;
            } else {
                input.checked = false;
            }
        });

        editando = true;
        empleadoEditando = empleado;
        btnAgregarInput.style.display = 'none';
        btnCancelarInput.style.display = 'inline-block';
        btnActualizarInput.style.display = 'inline-block';
        offcanvasInfo.hide(); 
        offcanvasContactanos.show(); 
        
    }
}

function cancelarEdicion() {
    formulario.reset();
    editando = false;
    empleadoEditando = null;
    btnAgregarInput.style.display = 'inline-block';
    btnCancelarInput.style.display = 'none';
    btnActualizarInput.style.display = 'none';
}

function actualizarEmpleado() {
    const sexoSeleccionado = Array.from(sexoInputs).find(input => input.checked)?.value;

    if (!empleadoEditando || !sexoSeleccionado) {
        return;
    }

    empleadoEditando.nombre = nombreInput.value;
    empleadoEditando.apellido = apellidoInput.value;
    empleadoEditando.email = emailInput.value;
    empleadoEditando.telefono = telefonoInput.value;
    empleadoEditando.sexo = sexoSeleccionado;

    mostrarEmpleados();
    cancelarEdicion();
}

function eliminarEmpleado(id) {
    listaEmpleados = listaEmpleados.filter(empleado => empleado.id !== id);
    mostrarEmpleados();
}
