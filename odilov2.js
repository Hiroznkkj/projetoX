// Variável para controlar o tempo entre as ações
let intervaloTempoPagina = 60000;

// Função para verificar se o quiz está ativo
function checkForQuiz() {
  return document.querySelector("body > div.md-dialog-container.ng-scope") !== null;
}

// Função para selecionar uma opção aleatória
function selecionarOpcaoAleatoria() {
  const radioButtons = document.querySelectorAll("md-radio-button");
  if (radioButtons.length === 0) {
    console.log("Nenhuma opção encontrada.");
    return false;
  }

  // Escolhe uma opção aleatória
  const randomIndex = Math.floor(Math.random() * radioButtons.length);
  const randomOption = radioButtons[randomIndex];

  if (randomOption) {
    randomOption.click();
    console.log("Opção aleatória testada:", randomOption);
    return true;
  }

  console.log("Falha ao selecionar uma opção aleatória.");
  return false;
}

// Função para clicar no botão "Próxima Questão"
function clicarBotaoProximaQuestao(isFirstQuestion) {
  // Seleciona o botão "Próxima Questão" com base na posição
  const nextQuestionButton = isFirstQuestion
    ? document.querySelector(
        "body > div.md-dialog-container.ng-scope > md-dialog > form > md-dialog-actions > button > span"
      )
    : document.querySelector(
        "body > div.md-dialog-container.ng-scope > md-dialog > form > md-dialog-actions > button:nth-child(2) > span"
      );

  if (nextQuestionButton) {
    nextQuestionButton.click();
    console.log("Botão 'Próxima Questão' clicado!");
    return true;
  }

  console.log("Botão 'Próxima Questão' não encontrado.");
  return false;
}

// Função para verificar e clicar no botão "Terminar"
function clicarBotaoTerminar() {
  const finishButton = document.querySelector(
    "body > div.md-dialog-container.ng-scope > md-dialog > form > md-dialog-actions > button.md-raised.md-primary.md-button.ng-scope.md-ink-ripple > span"
  );

  if (finishButton) {
    finishButton.click();
    console.log("Botão 'Terminar' clicado!");
    return true;
  }

  console.log("Botão 'Terminar' não encontrado.");
  return false;
}

// Função para clicar no botão "Enviar Respostas"
function clicarBotaoEnviarRespostas() {
  const submitButton = document.querySelector(
    "body > div.md-dialog-container.ng-scope > md-dialog > form > md-dialog-actions > button.md-raised.md-primary.md-button.ng-scope.md-ink-ripple"
  );

  if (submitButton) {
    submitButton.click();
    console.log("Botão 'Enviar Respostas' clicado!");
    return true;
  }

  console.log("Botão 'Enviar Respostas' não encontrado.");
  return false;
}

// Função para clicar no botão de fechamento do quiz
function clicarBotaoFecharQuiz() {
  const closeButton = document.querySelector(
    "body > div.md-dialog-container.ng-scope > md-dialog > md-toolbar > div > button > md-icon"
  );

  if (closeButton) {
    closeButton.click();
    console.log("Botão de fechamento clicado!");
    return true;
  }

  console.log("Botão de fechamento não encontrado.");
  return false;
}

// Função principal para gerenciar o fluxo do quiz
function handleQuizFlow() {
  let isFirstQuestion = true; // Controla se é a primeira questão

  const intervalLoop = setInterval(() => {
    if (!checkForQuiz()) {
      console.log("Quiz finalizado ou não encontrado.");
      clearInterval(intervalLoop);
      return;
    }

    // Verifica se o botão "Terminar" está disponível
    if (clicarBotaoTerminar()) {
      setTimeout(() => {
        clicarBotaoEnviarRespostas();
        setTimeout(() => {
          clicarBotaoFecharQuiz();
        }, 500); // Espera para clicar no botão de fechar
      }, 500); // Espera para clicar no botão de enviar
      clearInterval(intervalLoop);
      return;
    }

    // Tenta selecionar uma opção aleatória e clicar em "Próxima Questão"
    if (selecionarOpcaoAleatoria()) {
      setTimeout(() => {
        clicarBotaoProximaQuestao(isFirstQuestion);
        isFirstQuestion = false; // Após a primeira questão, muda o controle
      }, 500); // Espera para clicar no botão de próxima questão
    }
  }, 1000); // Intervalo curto para repetição do loop
}

// Função para iniciar a automação do quiz
function startQuizAutomation() {
  console.log("Iniciando automação do quiz...");

  intervalId = setInterval(() => {
    if (checkForQuiz()) {
      console.log("Quiz encontrado! Processando...");
      handleQuizFlow();
    } else {
      console.log("Quiz não encontrado. Avançando para a próxima página.");
      const pageButton = document.querySelector("#right-page-btn > md-icon");
      if (pageButton) {
        pageButton.click();
        console.log("Botão de página à direita clicado!");
      } else {
        console.log("Botão de página à direita não encontrado.");
      }
    }
  }, intervaloTempoPagina);
}

// Função para parar a automação
function stopQuizAutomation() {
  if (intervalId) {
    clearInterval(intervalId);
    console.log("Automação do quiz parada.");
  } else {
    console.log("Nenhum intervalo ativo para parar.");
  }
}

// Inicia a automação do quiz
startQuizAutomation();
