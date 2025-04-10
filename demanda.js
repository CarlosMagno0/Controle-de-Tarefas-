document.addEventListener("DOMContentLoaded", () => {
    const input = document.getElementById("demanda");
    const select = document.getElementById("prioridade");
    const botao = document.getElementById("adicionar");
    const lista = document.getElementById("lista-demandas");
  
    const demandas = JSON.parse(localStorage.getItem("demandasTI")) || [];
  
    function atualizarLista() {
      lista.innerHTML = "";
      demandas.forEach((item, index) => {
        const div = document.createElement("div");
        div.classList.add("item");
        div.classList.add(item.prioridade.toLowerCase());
  
        div.innerHTML = `
          <strong>${item.texto}</strong><br>
          <small>Prioridade: ${item.prioridade}</small>
          <button class="remover" data-index="${index}">Remover</button>
        `;
  
        lista.appendChild(div);
      });
    }
  
    botao.addEventListener("click", () => {
      const texto = input.value.trim();
      const prioridade = select.value;
      if (!texto) return;
  
      demandas.push({ texto, prioridade });
      localStorage.setItem("demandasTI", JSON.stringify(demandas));
      atualizarLista();
  
      input.value = "";
    });
  
    lista.addEventListener("click", (e) => {
      if (e.target.classList.contains("remover")) {
        const index = e.target.getAttribute("data-index");
        demandas.splice(index, 1);
        localStorage.setItem("demandasTI", JSON.stringify(demandas));
        atualizarLista();
      }
    });
  
    atualizarLista();
  });
  