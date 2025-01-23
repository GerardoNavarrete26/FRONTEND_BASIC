// Datos de ejemplo
const reservas = [
    { habitacion: 'Suite 01', cliente: 'Juan Pérez', fecha: '2024-03-15', estado: 'Confirmada' },
    { habitacion: 'Tainy 11', cliente: 'María Gómez', fecha: '2024-03-16', estado: 'Pendiente' },
    { habitacion: 'Suite 05', cliente: 'Carlos López', fecha: '2024-03-17', estado: 'Cancelada' }
  ];
  
  // Inicializar gráficos
  document.addEventListener('DOMContentLoaded', function() {
    // Gráfico de barras: Reservas por mes
    new Chart(document.getElementById('chartReservasMes'), {
        type: 'bar',
        data: {
            labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
            datasets: [{
                label: 'Reservas por Mes',
                data: [12, 15, 8, 20, 18, 10],
                backgroundColor: 'rgba(54, 162, 235, 0.5)'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
        }
    });
  
    // Gráfico de doughnut: Top habitaciones
    new Chart(document.getElementById('chartTopHabitaciones'), {
        type: 'doughnut',
        data: {
            labels: ['Suite 01', 'Tainy 11', 'Suite 05'],
            datasets: [{
                label: 'Reservas',
                data: [15, 12, 8],
                backgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56'
                ]
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
        }
    });
  
    // Gráfico de líneas: Tendencia de reservas
    new Chart(document.getElementById('chartTendenciaReservas'), {
        type: 'line',
        data: {
            labels: ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4'],
            datasets: [{
                label: 'Tendencia de Reservas',
                data: [30, 45, 40, 60],
                borderColor: '#4e73df',
                backgroundColor: 'rgba(78, 115, 223, 0.1)',
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
  
    // Gráfico de barras horizontales: Reservas por tipo de habitación
    new Chart(document.getElementById('chartReservasPorTipo'), {
        type: 'bar',
        data: {
            labels: ['Suite', 'Tainy Cabin', 'Familiar'],
            datasets: [{
                label: 'Reservas por Tipo',
                data: [45, 30, 25],
                backgroundColor: [
                    '#4e73df',
                    '#1cc88a',
                    '#36b9cc'
                ],
                borderWidth: 1
            }]
        },
        options: {
            indexAxis: 'y', // Hace que el gráfico sea horizontal
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    beginAtZero: true
                }
            }
        }
    });
  
    // Llenar tabla
    const tabla = document.getElementById('tablaReservas');
    reservas.forEach(reserva => {
        tabla.innerHTML += `
            <tr>
                <td>${reserva.habitacion}</td>
                <td>${reserva.cliente}</td>
                <td>${reserva.fecha}</td>
                <td>${reserva.estado}</td>
            </tr>
        `;
    });
  });
  
  // Generar PDF
  function generarPDF() {
    const { jsPDF } = window.jspdf;
    html2canvas(document.querySelector(".content")).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const imgWidth = 210; // A4 width in mm
        const imgHeight = canvas.height * imgWidth / canvas.width;
        
        pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
        pdf.save('reporte-reservas.pdf');
    });
  }