function toggleNotifications() {
    var sidebar = document.getElementById("notificationsSidebar");
    sidebar.classList.toggle("active");
}

// Fecha a barra de notificações quando clica fora dela
document.addEventListener('click', function(event) {
    var sidebar = document.getElementById("notificationsSidebar");
    var bellButton = document.querySelector('.btn.notifications');
    
    if (!sidebar.contains(event.target) && !bellButton.contains(event.target)) {
        sidebar.classList.remove("active");
    }
});

document.addEventListener('DOMContentLoaded', function() {
    // Gauge chart configurations
    var gaugeOptions = {
        cutout: '70%',
        rotation: -90,
        circumference: 180,
        plugins: {
            tooltip: { enabled: false }
        }
    };

    var oeeGauge = new Chart(document.getElementById('oeeGauge').getContext('2d'), {
        type: 'doughnut',
        data: {
            labels: ['OEE', 'Restante'],
            datasets: [{
                data: [58.56, 41.44],
                backgroundColor: ['#36A2EB', '#EEE'],
                hoverBackgroundColor: ['#36A2EB', '#DDD']
            }]
        },
        options: gaugeOptions
    });

    var disponibilidadeGauge = new Chart(document.getElementById('disponibilidadeGauge').getContext('2d'), {
        type: 'doughnut',
        data: {
            labels: ['Disponibilidade', 'Restante'],
            datasets: [{
                data: [58.56, 41.44],
                backgroundColor: ['#36A2EB', '#EEE'],
                hoverBackgroundColor: ['#36A2EB', '#DDD']
            }]
        },
        options: gaugeOptions
    });

    var performanceGauge = new Chart(document.getElementById('performanceGauge').getContext('2d'), {
        type: 'doughnut',
        data: {
            labels: ['Performance', 'Restante'],
            datasets: [{
                data: [58.56, 41.44],
                backgroundColor: ['#36A2EB', '#EEE'],
                hoverBackgroundColor: ['#36A2EB', '#DDD']
            }]
        },
        options: gaugeOptions
    });

    var qualidadeGauge = new Chart(document.getElementById('qualidadeGauge').getContext('2d'), {
        type: 'doughnut',
        data: {
            labels: ['Qualidade', 'Restante'],
            datasets: [{
                data: [58.56, 41.44],
                backgroundColor: ['#36A2EB', '#EEE'],
                hoverBackgroundColor: ['#36A2EB', '#DDD']
            }]
        },
        options: gaugeOptions
    });

    var ctxLine = document.getElementById('lineChart').getContext('2d');
    var lineChart = new Chart(ctxLine, {
        type: 'line',
        data: {
            labels: ['03h', '04h', '05h', '06h', '07h', '08h', '09h', '10h', '11h', '12h', '13h', '14h', '15h'],
            datasets: [{
                label: 'OEE',
                data: [65, 59, 80, 81, 56, 55, 40, 45, 70, 65, 59, 80, 81],
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
                fill: false
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    var ctxTimeline = document.getElementById('timelineChart').getContext('2d');
    var timelineChart = new Chart(ctxTimeline, {
        type: 'doughnut',
        data: {
            labels: ['Total', 'Parada', 'Produzido'],
            datasets: [{
                data: [521, 99, 422],
                backgroundColor: ['#36A2EB', '#FF6384', '#FFCE56'],
                hoverBackgroundColor: ['#36A2EB', '#FF6384', '#FFCE56']
            }]
        }
    });

    var ctxDowntime = document.getElementById('downtimeChart').getContext('2d');
    var downtimeChart = new Chart(ctxDowntime, {
        type: 'bar',
        data: {
            labels: ['Motivo 1', 'Motivo 2', 'Motivo 3', 'Motivo 4', 'Motivo 5'],
            datasets: [{
                label: '% de Paradas',
                data: [50, 25, 12.5, 10, 2.5],
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
});
