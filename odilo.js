// Variável para controlar se o script deve chutar ou não, true para chutar, false para não
let chutarQuiz = false;

// Variável para controlar o tempo entre a verificação de cada página
let intervaloTempoPagina = 20000;

// Função para verificar a presença do quiz
function checkForQuiz() {
  return document.querySelector("body > md-backdrop") !== null;
}

// Função para encontrar e testar uma opção aleatória do quiz
function testQuizOptions() {
  if (!chutarQuiz) {
    notificarUsuario();
    return;
  }

  // Seleciona todos os buttons
  const radioButtons = document.querySelectorAll("md-radio-button");
  if (radioButtons.length === 0) {
    console.log("Nenhuma opção encontrada.");
    return;
  }

  // Escolhe um índice aleatório
  const randomIndex = Math.floor(Math.random() * radioButtons.length);
  const option = radioButtons[randomIndex];

  if (!option) {
    console.log("Opção não encontrada no índice:", randomIndex);
    return;
  }

  // Clica na opção aleatória
  option.click();
  console.log("Opção selecionada:", option);
  

  setTimeout(() => {
    clickConfirmButton();
    setTimeout(() => {
      clickCloseButton();
    }, 500); // Atraso de 0.5 segundo para clicar no botão de fechamento
  }, 500); // Atraso de 0.5 segundo para clicar no botão de confirmação
}

// Função para clicar no botão de confirmação
function clickConfirmButton() {
  const confirmButtonElement = document.querySelector("body > div.md-dialog-container.ng-scope > md-dialog > form > md-dialog-actions > button > span");
  if (confirmButtonElement) {
    confirmButtonElement.click();
    console.log("Botão de confirmação clicado!");
  } else {
    console.log("Botão de confirmação não encontrado!");
  }
}

// Função para clicar no botão de fechamento
function clickCloseButton() {
  const closeButtonElement = document.querySelector("body > div.md-dialog-container.ng-scope > md-dialog > md-toolbar > div > button > md-icon");
  if (closeButtonElement) {
    closeButtonElement.click();
    console.log("Botão de fechamento clicado!");
  } else {
    console.log("Botão de fechamento não encontrado!");
  }
}

// Função para notificar o usuário
function notificarUsuario() {
  console.log("Quiz identificado. Esperando a resposta do usuário.");
  // Tentativa de tocar um som
  const audio = new Audio('https://www.soundjay.com/phone/telephone-ring-03a.mp3');
  audio.play().catch((error) => {
    console.log("Erro ao tentar tocar o som:", error);
  });

  // Envia uma notificação
  if (Notification.permission === 'granted') {
    new Notification("Quiz identificado! Por favor, responda.");
  } else {
    console.log("Permissão de notificação não foi concedida.");
  }
}

// Função para solicitar permissão de notificação
function solicitarPermissaoNotificacao() {
  if (Notification.permission !== 'granted') {
    Notification.requestPermission().then(permission => {
      if (permission === 'granted') {
        console.log("Permissão de notificação concedida.");
      } else {
        console.log("Permissão de notificação negada.");
      }
    });
  }
}

// Função para iniciar o processo
function startQuizAutomation() {
  solicitarPermissaoNotificacao();
  intervalId = setInterval(() => {
    if (checkForQuiz()) {
      console.log("Quiz encontrado!");
      testQuizOptions();
    } else {
      console.log("Quiz não encontrado, clicando no botão de página à direita.");
      const pageButtonElement = document.querySelector("#right-page-btn > md-icon");
      if (pageButtonElement) {
        pageButtonElement.click();
        console.log("Elemento de página à direita clicado!");
      } else {
        console.log("Elemento de página à direita não encontrado!");
      }
    }
  }, intervaloTempoPagina);
  console.log("Iniciado");
}

// Função para parar o intervalo
function stopQuizAutomation() {
  if (intervalId) {
    clearInterval(intervalId);
    console.log("Parado");
  } else {
    console.log("Nenhum intervalo ativo para parar");
  }
}

// Função para definir o tempo entre a verificação de cada página
function TempoPagina(tempo) {
  intervaloTempoPagina = tempo;
  console.log(`Tempo entre a verificação de cada página ajustado para ${tempo} ms`);
}

// Adiciona listeners passivos para eventos de rolagem
document.addEventListener('touchstart', function() {}, { passive: true });
document.addEventListener('scroll', function() {}, { passive: true });

// Inicia o clique automático
startQuizAutomation();

// para fechar a automatização digite : stopQuizAutomation();
