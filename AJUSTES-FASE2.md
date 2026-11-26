# Ajustes realizados na fase 2

**Projeto:** Meu amigo cão - Pet Shop  
**Responsável:** Douglas Duarte da Silva

## 1. Continuidade da fase 1
Foram mantidos o nome do petshop, as quatro páginas existentes, as seis opções de produto, as categorias, os preços demonstrativos e os serviços de banho e tosa. Foi acrescentada uma quinta página, `agendamento.html`.

## 2. Estrutura e customização visual
- Inclusão do **Bootstrap 5.3** para grade responsiva, menu recolhível no celular e carrossel;
- Criação de `css/estilos.css` para cores, fontes, cartões, botões, imagens, formulário e rodapé;
- Organização das páginas com `header`, `nav`, `main`, `section`, `article` e `footer`;
- Imagens do catálogo mantidas na pasta `imagens/` e reutilizadas no carrossel.

## 3. JavaScript
No arquivo `js/app.js` foram organizadas funções para:
- atualizar a data e a hora locais;
- pausar e reativar a rotação do carrossel;
- definir limites de data do agendamento;
- verificar datas, inclusive exclusão de domingos;
- conferir campos obrigatórios e formato do CPF (11 números);
- calcular valor demonstrativo conforme serviço e modalidade;
- exibir uma prévia do agendamento **sem enviar ou salvar informações pessoais**.

## 4. Formulários
Cadastro do cliente (nome, CPF, sexo, telefone, e-mail, endereço e CEP), cadastro do pet (nome, espécie, raça, idade, porte e observações), serviço (banho ou tosa, com opção conjunta), método de atendimento (tele-busca ou entrega no local), calendário e horário. Foram usados inputs, selects, radio buttons, checkbox, number, e-mail, placeholder e required.

## 5. Acessibilidade
Foram acrescentados ou mantidos: textos `alt` nas fotografias, rótulos `label` nos campos, cabeçalhos semânticos de tabela, navegação por teclado, indicador de foco, link para pular ao conteúdo, controles para pausar o carrossel e `aria-live` para mensagens de status. A folha CSS também respeita preferência por movimentos reduzidos.

## 6. Limitação técnica importante
O GitHub Pages publica arquivos estáticos. Portanto o formulário é **demonstrativo**: valida as informações e apresenta um resumo, mas **não salva CPF, endereço ou dados do cliente, nem confirma agendamento real**. Uma implementação com armazenamento e confirmação de horários exigiria um serviço de backend.

## 7. Roteiro de testes recomendado
1. Abrir todas as páginas e confirmar o funcionamento dos links e do menu no celular.
2. Verificar rotação, controles anterior/próximo e botão de pausa do carrossel.
3. Confirmar que o relógio mostra data e hora atuais.
4. Conferir seis imagens, descrições e preços, além da tabela de serviços.
5. Testar campos vazios, e-mail inválido, CPF inválido, datas anteriores e domingo.
6. Testar seleção de tele-busca, entrega no local e atualização dos preços.
7. Concluir uma simulação com dados fictícios e confirmar que o resultado não exibe CPF/endereço.
8. Usar a tecla Tab, o link "Pular para o conteúdo", controles do carrossel e rótulos do formulário.

**Observação:** estes itens descrevem verificações de aceitação; a presença do código não substitui o teste manual no navegador.
