# Meu amigo cão - Pet Shop | Fase 2

Projeto individual da disciplina **Fundamentos de Sistemas Web** (PUCRS).

**Autor:** Douglas Duarte da Silva  
**Site:** https://odouglasduarte.github.io/petshop-fase1/  
**Código-fonte:** https://github.com/odouglasduarte/petshop-fase1

## Objetivo
Dar continuidade ao site criado na fase 1, acrescentando apresentação visual com Bootstrap/CSS, JavaScript, cadastro de cliente e pet, simulação de agendamento e recursos de acessibilidade.

## Estrutura do projeto
- `index.html`: página inicial, carrossel com três imagens, botão de pausa e relógio atualizado em JavaScript;
- `produtos.html`: seis produtos em três categorias, preservados da fase 1;
- `servicos.html`: banho, tosa e banho e tosa, com valores nas modalidades local e tele-busca;
- `agendamento.html`: formulário com dados do cliente e pet, serviço, modalidade, calendário e horário;
- `contato.html`: dados fictícios e créditos das fotografias;
- `css/estilos.css`: identidade visual, responsividade e ajustes de acessibilidade;
- `js/app.js`: relógio, carrossel, validações e resumo demonstrativo;
- `imagens/`: fotografias usadas no catálogo e carrossel;
- `AJUDA.txt`: manual de uso;
- `AJUSTES-FASE2.md`: ajustes efetuados, requisitos e testes sugeridos.

## Funcionalidades
1. Navegação responsiva com Bootstrap.
2. Carrossel Bootstrap com indicadores, controles e botão para pausar a rotação.
3. Relógio com data e hora atualizadas automaticamente.
4. Formulário de cliente: nome, CPF, sexo, endereço, telefone e e-mail.
5. Formulário de pet: nome, espécie, raça, idade, porte e observações.
6. Seleção de banho, tosa ou banho e tosa, com tele-busca ou entrega no local.
7. Data e horário com verificação de domingos, campos obrigatórios e formato do CPF (11 números).
8. Prévia com pet, serviço, modalidade, data, horário e valor demonstrativo.
9. Recursos de acessibilidade: textos alternativos, navegação pelo teclado, rótulos de campos, contraste, link para pular ao conteúdo e avisos dinâmicos.

## Atenção à privacidade
O site é uma demonstração front-end no GitHub Pages. **Não possui servidor ou banco de dados.** Ao clicar em "Conferir simulação", a página exibe somente uma prévia e não envia nem armazena nome, CPF, endereço ou qualquer outro dado. Não há confirmação real de horário; para testar, utilize dados fictícios.

## Como executar
Abra o endereço do GitHub Pages no navegador. O Bootstrap é carregado via CDN, portanto a apresentação completa depende de conexão com a internet.

## Registro de alterações
Leia [AJUSTES-FASE2.md](AJUSTES-FASE2.md) para a descrição dos ajustes e as verificações recomendadas.
