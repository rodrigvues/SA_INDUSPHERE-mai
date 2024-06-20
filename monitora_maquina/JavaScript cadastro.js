document.getElementById('machineForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const machineData = {
        id_maquina: document.getElementById('id_maquina').value,
        status: document.getElementById('status').value,
        nome: document.getElementById('nome').value,
        id_tipo_maquina: document.getElementById('id_tipo_maquina').value,
        data_instalacao: document.getElementById('data_instalacao').value,
        setor: document.getElementById('setor').value,
        id_usuario: document.getElementById('id_usuario').value,
        data_ultima_manutencao: document.getElementById('data_ultima_manutencao').value
    };

    console.log('Machine Data:', machineData);
    
    // Aqui você pode adicionar o código para enviar os dados para um servidor ou processá-los conforme necessário.
    
    alert('Máquina cadastrada com sucesso!');
    document.getElementById('machineForm').reset();
});
