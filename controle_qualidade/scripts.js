document.addEventListener("DOMContentLoaded", function() {
    const formID = document.getElementById('formID');
    if (formID) {
        formID.addEventListener('submit', function(e) {
            e.preventDefault();
            const idLote = document.getElementById('idLote').value;
            localStorage.setItem('idLote', idLote);
            location.href = 'verificar-erros.html';
        });
    }

    const formErros = document.getElementById('formErros');
    if (formErros) {
        formErros.addEventListener('submit', function(e) {
            e.preventDefault();
            const quantidadeErros = document.getElementById('quantidadeErros').value;
            localStorage.setItem('quantidadeErros', quantidadeErros);
            location.href = 'listar-erros.html';
        });
    }

    const formListaErros = document.getElementById('formListaErros');
    const errosContainer = document.getElementById('errosContainer');
    if (formListaErros) {
        const adicionarErro = document.getElementById('adicionarErro');
        adicionarErro.addEventListener('click', function() {
            const erroDiv = document.createElement('div');
            erroDiv.classList.add('erro-item');
            erroDiv.innerHTML = `
                <label for="tipoErro">Tipo de Erro:</label>
                <input type="text" class="tipoErro" name="tipoErro" required>
                <label for="quantidadeErro">Quantidade:</label>
                <input type="number" class="quantidadeErro" name="quantidadeErro" required>
                <button type="button" class="removerErro">Remover</button>
            `;
            errosContainer.appendChild(erroDiv);

            const removerErroButtons = document.querySelectorAll('.removerErro');
            removerErroButtons.forEach(button => {
                button.addEventListener('click', function() {
                    this.parentElement.remove();
                });
            });
        });

        formListaErros.addEventListener('submit', function(e) {
            e.preventDefault();
            const tiposErros = Array.from(document.querySelectorAll('.tipoErro')).map(input => input.value);
            const quantidadesErros = Array.from(document.querySelectorAll('.quantidadeErro')).map(input => input.value);
            const erros = tiposErros.map((tipo, index) => ({ tipo, quantidade: quantidadesErros[index] }));
            localStorage.setItem('erros', JSON.stringify(erros));
            location.href = 'gerar-relatorio.html';
        });
    }

    const formRelatorio = document.getElementById('formRelatorio');
    if (formRelatorio) {
        formRelatorio.addEventListener('submit', function(e) {
            e.preventDefault();
            const formatoRelatorio = document.getElementById('formatoRelatorio').value;
            const idLote = localStorage.getItem('idLote');
            const quantidadeErros = localStorage.getItem('quantidadeErros');
            const erros = JSON.parse(localStorage.getItem('erros'));
            const relatorio = {
                idLote,
                quantidadeErros,
                erros,
                formatoRelatorio,
                data: new Date().toLocaleString()
            };
            salvarRelatorio(relatorio);
            if (formatoRelatorio === 'impressao') {
                alert("Relatório gerado para impressão.");
                // Lógica para impressão aqui
            } else if (formatoRelatorio === 'pdf') {
                gerarPDF(relatorio);
            }
            location.href = 'inicial.html';
        });
    }

    const relatoriosContainer = document.getElementById('relatoriosContainer');
    if (relatoriosContainer) {
        const relatorios = JSON.parse(localStorage.getItem('relatorios')) || [];
        relatorios.forEach((relatorio, index) => {
            const relatorioDiv = document.createElement('div');
            relatorioDiv.classList.add('relatorio-item');
            relatorioDiv.innerHTML = `
                <p>ID do Lote: ${relatorio.idLote}</p>
                <p>Quantidade de Produtos com Erros: ${relatorio.quantidadeErros}</p>
                <p>Erros:</p>
                <ul>
                    ${relatorio.erros.map(erro => `<li>${erro.tipo}: ${erro.quantidade}</li>`).join('')}
                </ul>
                <p>Formato: ${relatorio.formatoRelatorio}</p>
                <p>Data: ${relatorio.data}</p>
                <button onclick="visualizarRelatorio(${index})">Baixar em PDF</button>
            `;
            relatoriosContainer.appendChild(relatorioDiv);
        });
    }
});

function salvarRelatorio(relatorio) {
    const relatorios = JSON.parse(localStorage.getItem('relatorios')) || [];
    relatorios.push(relatorio);
    localStorage.setItem('relatorios', JSON.stringify(relatorios));
}

function visualizarRelatorio(index) {
    const relatorios = JSON.parse(localStorage.getItem('relatorios')) || [];
    const relatorio = relatorios[index];
    gerarPDF(relatorio);
}

function gerarPDF(relatorio) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.text(`ID do Lote: ${relatorio.idLote}`, 10, 10);
    doc.text(`Quantidade de Produtos com Erros: ${relatorio.quantidadeErros}`, 10, 20);
    doc.text('Erros:', 10, 30);
    relatorio.erros.forEach((erro, index) => {
        doc.text(`${erro.tipo}: ${erro.quantidade}`, 10, 40 + (index * 10));
    });
    doc.text(`Formato: ${relatorio.formatoRelatorio}`, 10, 60 + (relatorio.erros.length * 10));
    doc.text(`Data: ${relatorio.data}`, 10, 70 + (relatorio.erros.length * 10));

    doc.save(`relatorio_${relatorio.idLote}.pdf`);
}



