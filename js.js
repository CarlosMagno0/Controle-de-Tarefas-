const form = document.getElementById('task-form');
const descInput = document.getElementById('task-desc');
const statusInput = document.getElementById('task-status');
const destinoInput = document.getElementById('task-destino');

let tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];

function salvarTarefas() {
  localStorage.setItem('tarefas', JSON.stringify(tarefas));
}

function removerTarefa(id) {
  tarefas = tarefas.filter(t => t.id !== id);
  salvarTarefas();
  renderTarefas();
  atualizarGrafico();
}

function renderTarefas() {
  ['a-fazer', 'em-andamento', 'concluido'].forEach(status => {
    const column = document.getElementById(status);
    column.innerHTML = `<h2>${status.replace('-', ' ').toUpperCase()}</h2>`;
  });

  tarefas.forEach(tarefa => {
    const div = document.createElement('div');
    div.classList.add('task-item');
    div.innerHTML = `
      <div><span class="status-dot ${tarefa.status}"></span> ${tarefa.desc}</div>
      <div class="task-date">${tarefa.data}</div>
      <button class="remove-btn" onclick="removerTarefa(${tarefa.id})">×</button>
    `;
    document.getElementById(tarefa.status).appendChild(div);
  });
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const desc = descInput.value.trim();
  const status = statusInput.value;
  const destino = destinoInput.value;

  if (!desc) return;

  const tarefa = {
    id: Date.now(),
    desc,
    status,
    destino,
    data: new Date().toLocaleDateString('pt-BR')
  };

  tarefas.push(tarefa);
  salvarTarefas();
  renderTarefas();
  atualizarGrafico();
  form.reset();
});

function atualizarGrafico() {
  const meses = Array(12).fill(0);
  tarefas.forEach(tarefa => {
    const mes = new Date(tarefa.data.split('/').reverse().join('-')).getMonth();
    meses[mes]++;
  });

  chart.data.datasets[0].data = meses;
  chart.update();
}

let chart;

function criarGrafico() {
  const ctx = document.getElementById('taskChart').getContext('2d');
  chart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
      datasets: [{
        label: 'Tarefas por Mês',
        backgroundColor: '#6a994e',
        data: Array(12).fill(0)
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            stepSize: 1
          }
        }
      }
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  criarGrafico();
  renderTarefas();
  atualizarGrafico();
});

// grafico

const descricaoInput = document.getElementById("descricao");
const statusSelect = document.getElementById("status");
const destinoSelect = document.getElementById("destino");
const botaoAdicionar = document.getElementById("adicionar");

const listas = {
  "a-fazer": document.querySelector("#a-fazer ul"),
  "em-andamento": document.querySelector("#em-andamento ul"),
  "concluido": document.querySelector("#concluido ul")
};

const meses = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
];

let contagemMensal = new Array(12).fill(0);

function atualizarGrafico(chart) {
  chart.data.datasets[0].data = contagemMensal;
  chart.update();
}

function adicionarTarefa() {
  const descricao = descricaoInput.value.trim();
  const status = statusSelect.value;
  const destino = destinoSelect.value;

  if (!descricao) return;

  const li = document.createElement("li");
  li.textContent = descricao;

  const botaoRemover = document.createElement("button");
  botaoRemover.textContent = "Remover";
  botaoRemover.onclick = () => {
    li.remove();
  };

  li.appendChild(botaoRemover);
  listas[status].appendChild(li);

  const mesAtual = new Date().getMonth();
  contagemMensal[mesAtual]++;
  atualizarGrafico(grafico);

  descricaoInput.value = "";
}

botaoAdicionar.addEventListener("click", adicionarTarefa);

const ctx = document.getElementById("graficoTarefas").getContext("2d");

const grafico = new Chart(ctx, {
  type: "bar",
  data: {
    labels: meses,
    datasets: [{
      label: "Tarefas por mês",
      data: contagemMensal,
      backgroundColor: "#4caf50"
    }]
  },
  options: {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        ticks: { stepSize: 1 }
      }
    }
  }
});
