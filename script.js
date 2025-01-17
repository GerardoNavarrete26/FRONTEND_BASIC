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
