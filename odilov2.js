// Variável para controlar o tempo entre as ações
let intervaloTempoPagina = 60000;


function checkForQuiz() {
  return document.querySelector("body > div.md-dialog-container.ng-scope") !== null;
}


function selecionarOpcaoAleatoria() {
  const radioButtons = document.querySelectorAll("md-radio-button");
  if (radioButtons.length === 0) {
    console.log("Nenhuma opção encontrada.");
    return false;
  }

  
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


function clicarBotaoProximaQuestao(isFirstQuestion) {
  
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


function handleQuizFlow() {
  let isFirstQuestion = true; 

  const intervalLoop = setInterval(() => {
    if (!checkForQuiz()) {
      console.log("Quiz finalizado ou não encontrado.");
      clearInterval(intervalLoop);
      return;
    }

    
    if (clicarBotaoTerminar()) {
      setTimeout(() => {
        clicarBotaoEnviarRespostas();
        setTimeout(() => {
          clicarBotaoFecharQuiz();
        }, 500); 
      }, 500); 
      clearInterval(intervalLoop);
      return;
    }
    if (selecionarOpcaoAleatoria()) {
      setTimeout(() => {
        clicarBotaoProximaQuestao(isFirstQuestion);
        isFirstQuestion = false; 
      }, 500); 
    }
  }, 1000); 
}


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


function stopQuizAutomation() {
  if (intervalId) {
    clearInterval(intervalId);
    console.log("Automação do quiz parada.");
  } else {
    console.log("Nenhum intervalo ativo para parar.");
  }
}

startQuizAutomation();
