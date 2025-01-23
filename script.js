// Detectamos el nombre del archivo actual
const currentPage = window.location.pathname.split('/').pop();

// Si estamos en Estado de Habitaciones, aplicamos la funcionalidad de clic y el filtro de estado
if (currentPage === 'HabitacionesEstado.html') {
  // Seleccionamos todas las tarjetas de habitaciones
  const roomCards = document.querySelectorAll('.room-card');
  const filterStatus = document.getElementById('filterStatus');

  // Función para filtrar las tarjetas por estado
  const filterRoomsByStatus = () => {
    const status = filterStatus.value.toLowerCase();

    roomCards.forEach(card => {
      const cardStatus = card.getAttribute('data-status');
      if (status === 'all' || cardStatus === status) {
        card.style.display = 'block'; // Mostrar tarjeta si cumple con el filtro
      } else {
        card.style.display = 'none'; // Ocultar tarjeta si no cumple con el filtro
      }
    });
  };

  // Evento para actualizar el filtro al cambiar su valor
  if (filterStatus) filterStatus.addEventListener('change', filterRoomsByStatus);

  // Función de clic para redirigir a la vista de Listado de Habitaciones
  roomCards.forEach(card => {
    card.addEventListener('click', () => {
      // Obtenemos el número de la habitación de la tarjeta
      const roomNumber = card.getAttribute('data-number');

      // Guardamos el número de la habitación en localStorage
      localStorage.setItem('selectedRoom', roomNumber);

      // Redirigimos a la página de Listado de Habitaciones
      window.location.href = 'Habitaciones.html';
    });
  });
}

// Si estamos en Listado de Habitaciones, aplicamos el filtrado automático
if (currentPage === 'Habitaciones.html') {
  document.addEventListener('DOMContentLoaded', () => {
    // Recuperamos el número de habitación seleccionado desde localStorage
    const selectedRoom = localStorage.getItem('selectedRoom');

    // Si hay una habitación seleccionada, aplicamos el filtro
    if (selectedRoom) {
      const searchInput = document.getElementById('searchInput');
      const roomCards = document.querySelectorAll('.room-card');

      // Asignamos el valor recuperado al campo de búsqueda
      if (searchInput) searchInput.value = selectedRoom;

      // Filtramos las tarjetas para mostrar solo la habitación seleccionada
      roomCards.forEach(card => {
        const cardNumber = card.getAttribute('data-number');
        if (cardNumber === selectedRoom) {
          card.style.display = 'block'; // Mostrar la tarjeta seleccionada
        } else {
          card.style.display = 'none'; // Ocultar las demás tarjetas
        }
      });

      // Limpiamos localStorage para que no persista el valor
      localStorage.removeItem('selectedRoom');
    }
  });

  // Filtros en Listado de Habitaciones
  const filterType = document.getElementById('filterType');
  const filterStatus = document.getElementById('filterStatus');
  const searchInput = document.getElementById('searchInput');

  // Función para filtrar las tarjetas
  const filterRooms = () => {
    const roomCards = document.querySelectorAll('.room-card');
    const type = filterType?.value.toLowerCase() || ''; // Tipo de habitación
    const status = filterStatus?.value.toLowerCase() || ''; // Estado de la habitación
    const search = searchInput?.value.toLowerCase() || ''; // Número de habitación buscado

    roomCards.forEach(card => {
      const cardType = card.getAttribute('data-type');
      const cardStatus = card.getAttribute('data-status');
      const cardNumber = card.getAttribute('data-number');

      if (
        (type === 'all' || cardType === type) && // Coincide el tipo o no se aplica filtro
        (status === 'all' || cardStatus === status) && // Coincide el estado o no se aplica filtro
        (search === '' || cardNumber.includes(search)) // Coincide el número o no se busca nada
      ) {
        card.style.display = 'block'; // Mostrar tarjeta si cumple con los filtros
      } else {
        card.style.display = 'none'; // Ocultar tarjeta si no cumple con los filtros
      }
    });
  };

  // Agregar eventos para actualizar los filtros al cambiar valores
  if (filterType) filterType.addEventListener('change', filterRooms);
  if (filterStatus) filterStatus.addEventListener('change', filterRooms);
  if (searchInput) searchInput.addEventListener('keyup', filterRooms);
}

  // Función para mostrar el modal con la imagen correspondiente
  function showModal(status) {
    const modalImage = document.getElementById('modalImage');
    if (status === 'pendiente') {
      modalImage.src = 'Uploads/Rpendientepago.png'; // Cambia esta ruta por la imagen para pendientes
    } else if (status === 'ocupado') {
      modalImage.src = 'Uploads/Rvigente.png'; // Cambia esta ruta por la imagen para ocupados
    }
    const modal = new bootstrap.Modal(document.getElementById('infoModal'));
    modal.show();
  }

//Tania JavaScript

const togglePassword = document.getElementById('togglePassword');
const passwordField = document.getElementById('exampleInputPassword1');

// Agrega el evento click al botón
togglePassword.addEventListener('click', function () {
    // Cambia el tipo de input entre 'password' y 'text'
    const type = passwordField.type === 'password' ? 'text' : 'password';
    passwordField.type = type;

    // Cambia el texto del botón
    this.textContent = type === 'password' ? 'Mostrar contraseña' : 'Ocultar contraseña';
});

// script diego  (Lista de Reservas)

// Función para formatear la fecha en el campo de filtro (YYYY-DD-MM)
function formatearFecha(input) {
  let valor = input.value.replace(/\D/g, '');  // Eliminar todo lo que no sea un número

  // Añadimos los guiones de forma automática a medida que se va ingresando la fecha
  if (valor.length > 4 && valor.length <= 6) {
      valor = valor.substring(0, 4) + '-' + valor.substring(4);
  } else if (valor.length > 6) {
      valor = valor.substring(0, 4) + '-' + valor.substring(4, 6) + '-' + valor.substring(6, 8);
  }

  input.value = valor;  // Actualizamos el valor del input con la fecha formateada
  filtrarTabla(); // Llamamos a la función para filtrar la tabla inmediatamente
}

function filtrarTabla() {
  var rutFilter = document.getElementById('rutFilter').value.toLowerCase();
  var estadoFilter = document.getElementById('estadoFilter').value.toLowerCase();
  var fechaCreacionFilter = document.getElementById('fechaCreacionFilter').value;

  var tabla = document.getElementById("tablaCuerpo");
  var filas = tabla.getElementsByTagName("tr");

  for (var i = 0; i < filas.length; i++) {
      var fila = filas[i];
      var celdas = fila.getElementsByTagName("td");

      if (celdas.length > 0) {
          var cliente = celdas[0].innerText.toLowerCase();
          var rut = celdas[1].innerText.toLowerCase();
          var habitacion = celdas[2].innerText.toLowerCase();
          var fechaEntrada = celdas[3].innerText;
          var fechaSalida = celdas[4].innerText;
          var fechaCreacion = celdas[5].innerText;
          var estado = celdas[6].innerText.toLowerCase();

          // Filtro por RUT
          var matchRut = rut.includes(rutFilter);

          // Filtro por Estado
          var matchEstado = estado.includes(estadoFilter);

          // Filtro por Fecha de Creación
          var matchFechaCreacion = true;
          if (fechaCreacionFilter) {
              // La fecha ingresada ya está en formato YYYY-MM-DD, por lo que no es necesario convertirla
              var fechaFiltro = fechaCreacionFilter;

              // Comparamos si la fecha de la tabla y la fecha ingresada coinciden
              matchFechaCreacion = fechaCreacion.startsWith(fechaFiltro);
          }

          // Mostramos u ocultamos la fila según los filtros aplicados
          if (matchRut && matchEstado && matchFechaCreacion) {
              fila.style.display = "";
          } else {
              fila.style.display = "none";
          }
      }
  }
}

function limpiarFiltro() {
  document.getElementById('rutFilter').value = '';
  document.getElementById('estadoFilter').value = '';
  document.getElementById('fechaCreacionFilter').value = '';
  filtrarTabla(); // Limpiar el filtro
}










