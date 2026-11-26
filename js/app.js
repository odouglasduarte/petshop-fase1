/* FASE 2 | Meu amigo cão - Pet Shop
   JavaScript organizado por funcionalidades (Aulas 7 a 9).
   Formulário apenas demonstrativo: não envia nem salva dados pessoais. */
document.addEventListener("DOMContentLoaded", function () {
  "use strict";

  // 1) Mostra data e hora locais. Atualiza a cada minuto.
  const relogio = document.getElementById("relogio");
  function atualizarRelogio() {
    if (!relogio) return;
    relogio.textContent = new Intl.DateTimeFormat("pt-BR", {
      dateStyle: "full", timeStyle: "short"
    }).format(new Date());
  }
  atualizarRelogio();
  if (relogio) setInterval(atualizarRelogio, 60000);

  // 2) Controle manual para pausar/reiniciar o carrossel do Bootstrap.
  const botaoCarrossel = document.getElementById("pausarCarrossel");
  const elementoCarrossel = document.getElementById("carrosselPrincipal");
  if (botaoCarrossel && elementoCarrossel && window.bootstrap) {
    const carrossel = bootstrap.Carousel.getOrCreateInstance(elementoCarrossel);
    let pausado = false;
    botaoCarrossel.addEventListener("click", function () {
      pausado = !pausado;
      if (pausado) carrossel.pause();
      else carrossel.cycle();
      botaoCarrossel.textContent = pausado ? "Reativar imagens" : "Pausar imagens";
      botaoCarrossel.setAttribute("aria-pressed", String(pausado));
    });
  }

  // 3) Só executa os recursos abaixo na página de agendamento.
  const formulario = document.getElementById("formAgendamento");
  if (!formulario) return;

  const cpf = document.getElementById("cpf");
  const data = document.getElementById("dataAgendamento");
  const horario = document.getElementById("horarioAgendamento");
  const estadoData = document.getElementById("estadoData");
  const resumoValor = document.getElementById("resumoValor");
  const resultado = document.getElementById("resultado");
  const resumoTexto = document.getElementById("resumoTexto");
  const telefones = document.getElementById("telefone");

  // Datas no horário LOCAL (evita deslocamentos de data por UTC).
  function formatoDataLocal(d) {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const dia = String(d.getDate()).padStart(2, "0");
    return y + "-" + m + "-" + dia;
  }
  const amanha = new Date();
  amanha.setHours(12, 0, 0, 0);
  amanha.setDate(amanha.getDate() + 1);
  const limite = new Date(amanha);
  limite.setDate(limite.getDate() + 89);
  data.min = formatoDataLocal(amanha);
  data.max = formatoDataLocal(limite);

  // Calcula uma estimativa demonstrativa a partir das tabelas do site.
  const precos = {
    banho: { local: 45, busca: 65 },
    tosa: { local: 55, busca: 75 },
    banhoTosa: { local: 85, busca: 105 }
  };
  function escolha(nome) {
    const campo = formulario.querySelector('input[name="' + nome + '"]:checked');
    return campo ? campo.value : "";
  }
  function atualizarValor() {
    const servico = escolha("servico");
    const metodo = escolha("metodo");
    if (!servico || !metodo) {
      resumoValor.textContent = "Selecione um serviço e o tipo de atendimento.";
      return;
    }
    const valor = precos[servico][metodo];
    resumoValor.textContent = "Valor demonstrativo: " + valor.toLocaleString("pt-BR", {
      style: "currency", currency: "BRL"
    }) + " (cães de pequeno porte).";
  }
  formulario.querySelectorAll('input[name="servico"], input[name="metodo"]').forEach(function (campo) {
    campo.addEventListener("change", atualizarValor);
  });
  atualizarValor();

  // Atualiza a orientação do calendário e verifica domingos.
  function verificarData() {
    data.setCustomValidity("");
    if (!data.value) { estadoData.textContent = "Escolha um dia entre amanhã e os próximos 90 dias."; return false; }
    const partes = data.value.split("-").map(Number);
    const escolhida = new Date(partes[0], partes[1] - 1, partes[2], 12);
    const valida = data.value >= data.min && data.value <= data.max && escolhida.getDay() !== 0;
    if (!valida) {
      data.setCustomValidity("Escolha uma data de segunda a sábado dentro do período permitido.");
      estadoData.textContent = "Não atendemos aos domingos. Escolha outra data.";
    } else {
      estadoData.textContent = "Data dentro do período demonstrativo de agendamento.";
    }
    return valida;
  }
  data.addEventListener("change", verificarData);
  verificarData();

  // Mantém o campo CPF apenas numérico e valida os dígitos verificadores.
  cpf.addEventListener("input", function () {
    cpf.value = cpf.value.replace(/\D/g, "").slice(0, 11);
    cpf.setCustomValidity("");
  });
  if (telefones) telefones.addEventListener("input", function () {
    telefones.value = telefones.value.replace(/[^\d()+\s-]/g, "").slice(0, 20);
  });
  function cpfValido(valor) {
    if (!/^\d{11}$/.test(valor) || /^(\d)\1{10}$/.test(valor)) return false;
    let soma = 0;
    for (let i = 0; i < 9; i++) soma += Number(valor[i]) * (10 - i);
    let digito = (soma * 10) % 11;
    if (digito === 10) digito = 0;
    if (digito !== Number(valor[9])) return false;
    soma = 0;
    for (let i = 0; i < 10; i++) soma += Number(valor[i]) * (11 - i);
    digito = (soma * 10) % 11;
    if (digito === 10) digito = 0;
    return digito === Number(valor[10]);
  }

  // Não armazena nem transmite dados; mostra apenas prévia sem CPF/endereço.
  formulario.addEventListener("submit", function (evento) {
    evento.preventDefault();
    resultado.hidden = true;
    cpf.setCustomValidity("");
    verificarData();
    if (cpf.value && !cpfValido(cpf.value)) {
      cpf.setCustomValidity("Informe um CPF com dígitos verificadores válidos.");
    }
    if (!formulario.checkValidity()) {
      formulario.reportValidity();
      return;
    }
    const rotulos = { banho: "Banho", tosa: "Tosa", banhoTosa: "Banho e tosa" };
    const metodo = escolha("metodo") === "busca" ? "Tele-busca" : "Entrega do pet no local";
    const partes = data.value.split("-").map(Number);
    const dataLegivel = new Intl.DateTimeFormat("pt-BR").format(new Date(partes[0], partes[1] - 1, partes[2]));
    const pet = document.getElementById("nomePet").value.trim();
    const valor = precos[escolha("servico")][escolha("metodo")];
    resumoTexto.textContent = pet + " • " + rotulos[escolha("servico")] + " • " + metodo +
      " • " + dataLegivel + " às " + horario.value + " • " +
      valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" }) + ".";
    resultado.hidden = false;
    resultado.focus();
  });
});