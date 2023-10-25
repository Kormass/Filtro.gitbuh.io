var campers = [];
var acciones = [];

// Cargar datos de campers y acciones desde el almacenamiento local al iniciar la aplicación
if (localStorage.getItem('campers')) {
    campers = JSON.parse(localStorage.getItem('campers'));
    mostrarcampersEnSelector();
    mostrarListadoDecampers();
}

if (localStorage.getItem('acciones')) {
    acciones = JSON.parse(localStorage.getItem('acciones'));
    mostrarListadoDeacciones();
    mostraraccionesEnSelector(); // Mostrar acciones en el selector al cargar la página
}

function guardarcampersEnLocalStorage() {
    localStorage.setItem('campers', JSON.stringify(campers));
}

function guardaraccionesEnLocalStorage() {
    localStorage.setItem('acciones', JSON.stringify(acciones));
}

function registrarcamper() {
    var id = document.getElementById('id').value;
    var nombre = document.getElementById('nombre').value;
    var telefono = document.getElementById('telefono').value;
    var email = document.getElementById('email').value;
    var grupo = document.getElementById('grupo').value;

    if (id.trim() === '' || nombre.trim() === '' || telefono.trim() === ''||email.trim() === '' || grupo.trim() === ''){
        alert('Por favor, complete todos los campos.');
        return;
    }

    var nuevocamper = {
        id: id,
        nombre: nombre,
        telefono:telefono,
        email: email,
        grupo: grupo,
        campcoin: 0

    };

    campers.push(nuevocamper);
    guardarcampersEnLocalStorage();

    document.getElementById('id').value = '';
    document.getElementById('nombre').value = '';
    document.getElementById('telefono').value = '';
    document.getElementById('email').value = '';
    document.getElementById('grupo').value = '';

    mostrarcampersEnSelector();
    mostrarListadoDecampers();
}

function mostrarcampersEnSelector() {
    var select = document.getElementById('camperaccion');
    select.innerHTML = '';
    for (var i = 0; i < campers.length; i++) {
        var option = document.createElement('option');
        option.value = campers[i].nombre;
        option.text = campers[i].nombre;
        select.appendChild(option);
    }
}

function agregarPuntos() {
    var camper = document.getElementById('camperaccion').value;
    var accion = document.getElementById('accionaccion').value;
    var puntosCampcoins = parseInt(document.getElementById('puntosCampcoins').value);

    if (isNaN(puntosCampcoins)) {
        alert('Ingrese una cantidad válida de puntos.');
        return;
    }

    var camperEncontrado = campers.find(function (c) {
        return c.nombre === camper;
    });

    var accionEncontrado = acciones.find(function (j) {
        return j.nombre === accion;
    });

    if (camperEncontrado && accionEncontrado) {
        camperEncontrado.campcoin += accionEncontrado.puntos;
        guardarcampersEnLocalStorage();
    } else {
        alert('camper o accion no encontrado');
    }

    mostrarListadoDecampers();
}

function mostrarListadoDecampers() {
    var listadoHTML = '<ul>';
    for (var i = 0; i < campers.length; i++) {
        listadoHTML += '<li>' + campers[i].nombre + ' - campcoins: ' + campers[i].campcoin + '</li>';
    }
    listadoHTML += '</ul>';
    document.getElementById('listado-campers').innerHTML = listadoHTML;
}



function agregaraccion() {
    var nombreaccion = document.getElementById('nombreaccion').value;
    var puntosaccion = parseInt(document.getElementById('puntosaccion').value);

    if (nombreaccion.trim() === '' || isNaN(puntosaccion)) {
        alert('Por favor, complete todos los campos y asegúrese de ingresar puntos válidos.');
        return;
    }

    var nuevoaccion = {
        nombre: nombreaccion,
        puntos: puntosaccion
    };

    acciones.push(nuevoaccion);
    guardaraccionesEnLocalStorage();

    document.getElementById('nombreaccion').value = '';
    document.getElementById('puntosaccion').value = '';

    mostrarListadoDeacciones();
    mostraraccionesEnSelector(); // Mostrar acciones en el selector después de agregar uno nuevo
}

function mostrarListadoDeacciones() {
    var listadoHTML = '<ul>';
    for (var i = 0; i < acciones.length; i++) {
        listadoHTML += '<li>' + acciones[i].nombre + ' - Puntos: ' + acciones[i].puntos + '</li>';
    }
    listadoHTML += '</ul>';
    document.getElementById('listado-acciones').innerHTML = listadoHTML;
}

function mostraraccionesEnSelector() {
    var select = document.getElementById('accionaccion');
    select.innerHTML = '';
    for (var i = 0; i < acciones.length; i++) {
        var option = document.createElement('option');
        option.value = acciones[i].nombre;
        option.text = acciones[i].nombre;
        select.appendChild(option);
    }
    // Actualizar el campo de puntos con los puntos del accion seleccionado
    select.addEventListener('change', function () {
        var accioneseleccionado = acciones.find(function (j) {
            return j.nombre === select.value;
        });
        if (accioneseleccionado) {
            document.getElementById('puntosCampcoins').value = accioneseleccionado.puntos;
        } else {
            document.getElementById('puntosCampcoins').value = '';
        }
    });
}









































