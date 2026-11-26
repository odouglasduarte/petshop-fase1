/* Funções da fase 2: relógio, carrossel e simulação do agendamento.
   O formulário não envia nem armazena dados. */

document.addEventListener("DOMContentLoaded", function () {

    // Exibe a data e a hora. Exemplo de função temporal estudada na aula 8.
    function atualizarRelogio() {
        const relogio = document.getElementById("relogio");
        if (relogio) {
            const agora = new Date();
            relogio.textContent = agora.toLocaleDateString("pt-BR") + " - " +
                agora.toLocaleTimeString("pt-BR");
        }
    }
    atualizarRelogio();
    setInterval(atualizarRelogio, 1000);

    // Usa as funções prontas do carrossel do Bootstrap.
    const botaoPausa = document.getElementById("pausarCarrossel");
    const carrosselElemento = document.getElementById("carrosselPrincipal");
    if (botaoPausa && carrosselElemento && window.bootstrap) {
        const carrossel = bootstrap.Carousel.getOrCreateInstance(carrosselElemento);
        let pausado = false;
        botaoPausa.addEventListener("click", function () {
            if (pausado) {
                carrossel.cycle();
                botaoPausa.textContent = "Pausar imagens";
            } else {
                carrossel.pause();
                botaoPausa.textContent = "Reativar imagens";
            }
            pausado = !pausado;
            botaoPausa.setAttribute("aria-pressed", String(pausado));
        });
    }

    // O restante das funções é utilizado apenas na página de agendamento.
    const formulario = document.getElementById("formAgendamento");
    if (!formulario) return;

    const data = document.getElementById("dataAgendamento");
    const campoPreco = document.getElementById("resumoValor");
    const resultado = document.getElementById("resultado");
    const resumoTexto = document.getElementById("resumoTexto");
    const botaoEnviar = document.getElementById("enviarSimulacao");

    // Define amanhã como a primeira data disponível no calendário.
    const amanha = new Date();
    amanha.setDate(amanha.getDate() + 1);
    const ano = amanha.getFullYear();
    const mes = String(amanha.getMonth() + 1).padStart(2, "0");
    const dia = String(amanha.getDate()).padStart(2, "0");
    data.min = ano + "-" + mes + "-" + dia;

    // Lê o serviço e o tipo de atendimento escolhidos.
    function opcaoSelecionada(nome) {
        const elemento = formulario.querySelector('input[name="' + nome + '"]:checked');
        return elemento ? elemento.value : "";
    }

    // Calcula os valores demonstrativos apresentados na página Serviços.
    function calcularPreco() {
        const servico = opcaoSelecionada("servico");
        const metodo = opcaoSelecionada("metodo");
        if (!servico || !metodo) return 0;

        let valor = 0;
        if (servico === "banho") valor = 45;
        if (servico === "tosa") valor = 55;
        if (servico === "banhoTosa") valor = 85;
        if (metodo === "busca") valor += 20;
        return valor;
    }

    function atualizarPreco() {
        const valor = calcularPreco();
        if (valor === 0) {
            campoPreco.textContent = "Selecione um serviço e o tipo de atendimento.";
        } else {
            campoPreco.textContent = "Valor demonstrativo: R$ " +
                valor.toFixed(2).replace(".", ",") + ".";
        }
    }

    formulario.querySelectorAll('input[name="servico"], input[name="metodo"]').forEach(
        function (campo) {
            campo.addEventListener("change", atualizarPreco);
        }
    );

    // Valida a data e impede a escolha de domingos.
    function verificarData() {
        data.setCustomValidity("");
        if (!data.value) return;
        const escolhida = new Date(data.value + "T12:00:00");
        if (escolhida.getDay() === 0) {
            data.setCustomValidity("Escolha uma data de segunda a sábado.");
        }
    }
    data.addEventListener("change", verificarData);

    // O botão só é ativado quando o JavaScript foi carregado.
    botaoEnviar.disabled = false;

    formulario.addEventListener("submit", function (evento) {
        evento.preventDefault(); // Não envia dados pela internet.
        resultado.hidden = true;
        verificarData();

        // Usa os atributos HTML5 required, type, pattern e min.
        if (!formulario.checkValidity()) {
            formulario.reportValidity();
            return;
        }

        const servico = opcaoSelecionada("servico");
        const metodo = opcaoSelecionada("metodo");
        let nomeServico = "Banho";
        if (servico === "tosa") nomeServico = "Tosa";
        if (servico === "banhoTosa") nomeServico = "Banho e tosa";
        const nomeMetodo = metodo === "busca" ? "Tele-busca" : "Entrega no local";

        // A prévia não mostra CPF, endereço ou outros dados pessoais.
        const partes = data.value.split("-");
        const dataFormatada = partes[2] + "/" + partes[1] + "/" + partes[0];
        resumoTexto.textContent =
            document.getElementById("nomePet").value + " - " +
            nomeServico + " - " + nomeMetodo + " - " +
            dataFormatada + " às " +
            document.getElementById("horarioAgendamento").value +
            " - R$ " + calcularPreco().toFixed(2).replace(".", ",");

        resultado.hidden = false;
        resultado.focus();
    });

    // Esconde o resumo quando o formulário é limpo.
    formulario.addEventListener("reset", function () {
        resultado.hidden = true;
        data.setCustomValidity("");
        campoPreco.textContent = "Selecione um serviço e o tipo de atendimento.";
    });
});