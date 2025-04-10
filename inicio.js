const descricaoInput = document.getElementById("descricao");
const statusSelect = document.getElementById("status");
const destinoSelect = document.getElementById("destino");
const botaoAdicionar = document.getElementById("adicionar");

const tarefasMensais = {};
const ctx = document.getElementById("graficoTarefas").getContext("2d");

let grafico;

function atualizarGrafico() {
  const meses = Object.keys(tarefasMensais);
  const valores = Object.values(tarefasMensais);

  if (grafico) grafico.destroy();

  grafico = new Chart(ctx, {
    type: "bar",
    data: {
      labels: meses,
      datasets: [{
        label: "Tarefas por mês",
        data: valores,
        backgroundColor: "#69b96c"
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}

function adicionarTarefa() {
  const descricao = descricaoInput.value.trim();
  const status = statusSelect.value;

  if (!descricao) return;

  const li = document.createElement("li");
  li.innerHTML = `${descricao} <button onclick="removerTarefa(this)">❌</button>`;

  document.querySelector(`#${status} ul`).appendChild(li);

  const mesAtual = new Date().toLocaleString("default", { month: "long" });

  tarefasMensais[mesAtual] = (tarefasMensais[mesAtual] || 0) + 1;
  atualizarGrafico();

  descricaoInput.value = "";
}

function removerTarefa(botao) {
  botao.parentElement.remove();
}

botaoAdicionar.addEventListener("click", adicionarTarefa);
