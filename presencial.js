document.addEventListener("DOMContentLoaded", () => {
    const inputNome = document.querySelector(".form input[type='text']");
    const inputData = document.querySelector(".form input[type='date']");
    const botao = document.querySelector(".form button");
    const lista = document.querySelector(".lista");
  
    const registros = JSON.parse(localStorage.getItem("presencial")) || [];
  
    function atualizarLista() {
      lista.innerHTML = "";
      registros.forEach((item, index) => {
        const div = document.createElement("div");
        div.classList.add("item");
        div.innerHTML = `
          <strong>${item.nome}</strong><br>
          <small>Data: ${item.data}</small>
          <button class="remover" data-index="${index}">Remover</button>
        `;
        lista.appendChild(div);
      });
    }
  
    botao.addEventListener("click", () => {
      const nome = inputNome.value.trim();
      const data = inputData.value;
      if (!nome || !data) return;
  
      registros.push({ nome, data });
      localStorage.setItem("presencial", JSON.stringify(registros));
      atualizarLista();
  
      inputNome.value = "";
      inputData.value = "";
    });
  
    lista.addEventListener("click", (e) => {
      if (e.target.classList.contains("remover")) {
        const index = e.target.getAttribute("data-index");
        registros.splice(index, 1);
        localStorage.setItem("presencial", JSON.stringify(registros));
        atualizarLista();
      }
    });
  
    atualizarLista();
  });

  // melhoras

  function adicionarAtividadePresencial() {
    const input = document.getElementById("atividade-presencial");
    const lista = document.getElementById("lista-presencial");
  
    if (input.value.trim() === "") {
      alert("Digite uma atividade antes de adicionar.");
      return;
    }
  
    const item = document.createElement("li");
    item.textContent = input.value;
    lista.appendChild(item);
  
    input.value = "";
  }
  
  