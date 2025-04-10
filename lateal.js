document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("btnAdicionar").addEventListener("click", adicionarProduto);
});

async function adicionarProduto() {
    const nome = document.getElementById('produto').value.trim();
    const quantidade = document.getElementById('quantidade').value.trim();
    const filial = document.getElementById('filial').value.trim();
    const dataPedido = document.getElementById('dataPedido').value;
    const dataSaida = document.getElementById('dataSaida').value;

    if (!nome || !quantidade || !filial || !dataPedido || !dataSaida) {
        alert('Preencha todos os campos!');
        return;
    }

    const produto = { nome, quantidade, filial, dataPedido, dataSaida };
    console.log("Enviando produto:", produto); // Log para depuração

    // Exibir a tela de carregamento
    document.getElementById('loading-screen').style.display = 'flex';

    try {
        const resposta = await fetch('http://localhost:3000/produtos', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(produto)
        });

        if (!resposta.ok) throw new Error('Erro ao adicionar produto');

        console.log("Produto adicionado com sucesso!");

        // Aguarde um pequeno tempo para que o usuário veja a tela de carregamento
        setTimeout(() => {
            // Esconder a tela de carregamento e redirecionar para a página inicial
            document.getElementById('loading-screen').style.display = 'none';
            window.location.href = "index.html"; // Substitua pelo caminho correto da sua página inicial
        }, 2000);

    } catch (error) {
        console.error("Erro:", error);
        alert('Erro ao adicionar produto!');
        document.getElementById('loading-screen').style.display = 'none'; // Esconder tela de carregamento
    }
}
