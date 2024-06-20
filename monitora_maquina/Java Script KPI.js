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
    // Configuração dos gráficos de medidor
    var gaugeOptions = function(data) {
        return {
            type: 'doughnut',
            data: {
                datasets: [{
                    data: [data, 100 - data],
                    backgroundColor: ['#36A2EB', '#E5E5E5'],
                    borderWidth: 0
                }]
            },
            options: {
                rotation: 1 * Math.PI,
                circumference: 1 * Math.PI,
                cutout: '70%',
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        };
    };

    var ctx1 = document.getElementById('gauge1').getContext('2d');
    new Chart(ctx1, gaugeOptions(20.56));

    var ctx2 = document.getElementById('gauge2').getContext('2d');
    new Chart(ctx2, gaugeOptions(43.68));

    var ctx3 = document.getElementById('gauge3').getContext('2d');
    new Chart(ctx3, gaugeOptions(39.45));

    var ctx4 = document.getElementById('gauge4').getContext('2d');
    new Chart(ctx4, gaugeOptions(62.32));

    var ctx5 = document.getElementById('gauge5').getContext('2d');
    new Chart(ctx5, gaugeOptions(69.19));

    var ctx6 = document.getElementById('gauge6').getContext('2d');
    new Chart(ctx6, gaugeOptions(20));
});
