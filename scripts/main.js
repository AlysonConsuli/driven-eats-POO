import frango from "../img/frango_yin_yang.png";
import coca from "../img/coquinha_gelada.png";
import pudim from "../img/pudim.png";

class Prato {
  constructor(nome, imagem, descricao, preco) {
    this.nome = nome;
    this.imagem = imagem;
    this.descricao = descricao;
    this.preco = preco;
  }
}

class Bebida {
  constructor(nome, imagem, descricao, preco) {
    this.nome = nome;
    this.imagem = imagem;
    this.descricao = descricao;
    this.preco = preco;
  }
}

class Sobremesa {
  constructor(nome, imagem, descricao, preco) {
    this.nome = nome;
    this.imagem = imagem;
    this.descricao = descricao;
    this.preco = preco;
  }
}

class Pedido {
  constructor() {
    this.pratoSelecionado = null;
    this.bebidaSelecionada = null;
    this.sobremesaSelecionada = null;
  }

  verificarPedido() {
    if (
      this.pratoSelecionado &&
      this.bebidaSelecionada &&
      this.sobremesaSelecionada
    ) {
      btnPedir.classList.add("ativo");
      btnPedir.disabled = false;
      btnPedir.innerHTML = "Fazer pedido";
    }
  }

  selecionarPrato(elemento, { nome, preco }) {
    const selecionado = document.querySelector(".prato .selecionado");
    if (selecionado !== null) {
      selecionado.classList.remove("selecionado");
    }
    elemento.classList.add("selecionado");

    this.pratoSelecionado = {
      nome,
      preco,
    };
    this.verificarPedido();
  }

  getPratoView(prato) {
    const view = document.createElement("div");
    view.classList.add("opcao");
    view.addEventListener("click", () => {
      this.selecionarPrato(view, prato.nome, prato.preco);
    });
    view.innerHTML = `
          <img src="${prato.imagem}" />
          <div class="titulo">${prato.nome}</div>
          <div class="descricao">${prato.descricao}</div>
          <div class="fundo">
              <div class="preco">R$ ${prato.preco.toFixed(2)}</div>
              <div class="check">
                  <ion-icon name="checkmark-circle"></ion-icon>
              </div>
          </div>
      `;

    return view;
  }

  selecionarBebida(elemento, { nome, preco }) {
    const selecionado = document.querySelector(".bebida .selecionado");
    if (selecionado !== null) {
      selecionado.classList.remove("selecionado");
    }
    elemento.classList.add("selecionado");

    this.bebidaSelecionada = { nome, preco };
    this.verificarPedido();
  }

  getBebidaView(bebida) {
    const view = document.createElement("div");
    view.classList.add("opcao");
    view.addEventListener("click", () => {
      this.selecionarBebida(view, bebida.nome, bebida.preco);
    });
    view.innerHTML = `
          <img src="${bebida.imagem}" />
          <div class="titulo">${bebida.nome}</div>
          <div class="descricao">${bebida.descricao}</div>
          <div class="fundo">
              <div class="preco">R$ ${bebida.preco.toFixed(2)}</div>
              <div class="check">
                  <ion-icon name="checkmark-circle"></ion-icon>
              </div>
          </div>
      `;

    return view;
  }

  selecionarSobremesa(elemento, { nome, preco }) {
    const selecionado = document.querySelector(".sobremesa .selecionado");
    if (selecionado !== null) {
      selecionado.classList.remove("selecionado");
    }
    elemento.classList.add("selecionado");

    this.sobremesaSelecionada = { nome, preco };
    this.verificarPedido();
  }

  getSobremesaView(sobremesa) {
    const view = document.createElement("div");
    view.classList.add("opcao");
    view.addEventListener("click", () => {
      this.selecionarSobremesa(view, sobremesa.nome, sobremesa.preco);
    });
    view.innerHTML = `
          <img src="${sobremesa.imagem}" />
          <div class="titulo">${sobremesa.nome}</div>
          <div class="descricao">${sobremesa.descricao}</div>
          <div class="fundo">
              <div class="preco">R$ ${sobremesa.preco.toFixed(2)}</div>
              <div class="check">
                  <ion-icon name="checkmark-circle"></ion-icon>
              </div>
          </div>
      `;

    return view;
  }

  //

  getPrecoTotal() {
    return (
      this.pratoSelecionado.preco +
      this.bebidaSelecionada.preco +
      this.sobremesaSelecionada.preco
    );
  }

  confirmarPedido() {
    const modal = document.querySelector(".overlay");
    modal.classList.remove("escondido");

    document.querySelector(".confirmar-pedido .prato .nome").innerHTML =
      this.pratoSelecionado.nome;
    document.querySelector(".confirmar-pedido .prato .preco").innerHTML =
      this.pratoSelecionado.preco.toFixed(2);

    document.querySelector(".confirmar-pedido .bebida .nome").innerHTML =
      this.bebidaSelecionada.nome;
    document.querySelector(".confirmar-pedido .bebida .preco").innerHTML =
      this.bebidaSelecionada.preco.toFixed(2);

    document.querySelector(".confirmar-pedido .sobremesa .nome").innerHTML =
      this.sobremesaSelecionada.nome;
    document.querySelector(".confirmar-pedido .sobremesa .preco").innerHTML =
      this.sobremesaSelecionada.preco.toFixed(2);

    document.querySelector(".confirmar-pedido .total .preco").innerHTML =
      this.getPrecoTotal().toFixed(2);
  }

  cancelarPedido() {
    const modal = document.querySelector(".overlay");
    modal.classList.add("escondido");
  }

  enviarZap() {
    const telefoneRestaurante = 553299999999;
    const encodedText = encodeURIComponent(
      `Olá, gostaria de fazer o pedido: \n- Prato: ${
        this.pratoSelecionado.nome
      } \n- Bebida: ${this.bebidaSelecionada.nome} \n- Sobremesa: ${
        this.sobremesaSelecionada.nome
      } \nTotal: R$ ${this.getPrecoTotal().toFixed(2)}`
    );

    const urlWhatsapp = `https://wa.me/${telefoneRestaurante}?text=${encodedText}`;
    window.open(urlWhatsapp);
  }
}

const btnConfirmar = document.querySelector(".confirmar");
const btnCancelar = document.querySelector(".cancelar");
const btnPedir = document.querySelector(".fazer-pedido");

const pedido = new Pedido();

const pratos = [
  new Prato(
    "Estrombelete de Frango",
    frango,
    "Um pouco de batata, um pouco de salada",
    14.9
  ),
  new Prato("Asa de Boi", frango, "Com molho shoyu", 14.9),
  new Prato("Carne de Monstro", frango, "Com batata assada e farofa", 14.9),
];

const bebidas = [
  new Bebida("Coquinha gelada", coca, "Lata 350ml", 4.9),
  new Bebida("Caldo de Cana", coca, "Copo 600ml", 4.9),
  new Bebida("Corote Gelado", coca, "Garrafa 400ml", 4.9),
];

const sobremesas = [
  new Sobremesa("Pudim", pudim, "Gosto de doce de leite", 7.9),
  new Sobremesa("Flam", pudim, "Gosto de chocolate", 7.9),
  new Sobremesa("Brigadeiro", pudim, "3 unidades", 7.9),
];

const pratosContainer = document.querySelector(".opcoes.prato");
pratos.forEach((prato) =>
  pratosContainer.appendChild(pedido.getPratoView(prato))
);
const bebidasContainer = document.querySelector(".opcoes.bebida");
bebidas.forEach((bebida) =>
  bebidasContainer.appendChild(pedido.getBebidaView(bebida))
);
const sobremesasContainer = document.querySelector(".opcoes.sobremesa");
sobremesas.forEach((sobremesa) =>
  sobremesasContainer.appendChild(pedido.getSobremesaView(sobremesa))
);

btnConfirmar.addEventListener("click", () => {
  pedido.enviarZap();
});

btnCancelar.addEventListener("click", () => {
  pedido.cancelarPedido();
});

btnPedir.addEventListener("click", () => {
  pedido.confirmarPedido();
});
