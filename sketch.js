//variáveis da Bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametroBolinha = 20;
let raio = diametroBolinha / 2

//variáveis da Raquete Aliada
let raqueteAltura = 90;
let raqueteComprimento = 10;
let xRaqueteAliada = 5;
let yRaqueteAliada = 150;

//variáveis da Raquete Inimiga
let xRaqueteInimiga = 585;
let yRaqueteInimiga = 145;
let velocidadeYInimiga;
let chanceDeErrar = 0;

let colidiu = false

//placar do jogo
let placarAliado = 0
let placarInimigo = 0

//velocidade da bolinha
let velocidadeXBolinha = 6;
let velocidadeYBolinha = 6;

//sons do jogo
let raquetada;
let ponto;
let trilha;


function preload() {
  trilha = loadSound("alone.mp3");
  ponto = loadSound("ponto.mp3");
  raquetada = loadSound("raquetada.mp3");
}

function setup() {
  createCanvas(600, 400);
  trilha.loop()
}

function draw() {
  background(0);
  mostraBolinha();
  movimentaBolinha();
  verificaColisaoBorda();
  mostraRaqueteAliada();
  mostraRaqueteInimiga();
  colisaoMinhaRaqueteBiblioteca();
  colisaoInimigaRaqueteBiblioteca()
  movimentaRaqueteAliada();
  movimentaRaqueteInimiga();
  //controleInimigo();
  incluiPlacar();
  //bolinhaNaoFicaPresa();
}

//------------------FUNCTIONS-----------------------------


function mostraBolinha() {
  circle(xBolinha, yBolinha, diametroBolinha);
}




function movimentaBolinha() {
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
}




function verificaColisaoBorda() {


  if (xBolinha + raio > width ||
    xBolinha - raio < 0) {
    velocidadeXBolinha *= -1;
  }


  if (yBolinha + raio > height ||
    yBolinha - raio < 0) {
    velocidadeYBolinha *= -1
  }


}




function mostraRaqueteAliada() {
  rect(xRaqueteAliada, yRaqueteAliada, raqueteComprimento, raqueteAltura)
}




function mostraRaqueteInimiga() {
  rect(xRaqueteInimiga, yRaqueteInimiga, raqueteComprimento, raqueteAltura)
}




function movimentaRaqueteAliada() {


  if (keyIsDown(DOWN_ARROW)) {
    yRaqueteAliada += 10;
  }


  if (keyIsDown(UP_ARROW)) {
    yRaqueteAliada -= 10
  }


}




function calculaChanceDeErrar() {
  if (placarInimigo >= placarAliado) {
    chanceDeErrar += 1
    if (chanceDeErrar >= 39) {
      chanceDeErrar = 40
    }
  } else {
    chanceDeErrar -= 1
    if (chanceDeErrar <= 35) {
      chanceDeErrar = 35
    }
  }
}




function movimentaRaqueteInimiga() {
  velocidadeYInimiga = yBolinha - yRaqueteInimiga -
    raqueteComprimento / 2 - 30;
  yRaqueteInimiga += velocidadeYInimiga + chanceDeErrar
  calculaChanceDeErrar()

}
/*
function controleInimigo() {
  if (keyIsDown(83)) {
    yRaqueteInimiga += 10;
  }
  
  
  if (keyIsDown(87)) {
    yRaqueteInimiga -= 10
  }
}
*/




function colisaoMinhaRaqueteBiblioteca() {


  colidiu =
    collideRectCircle(xRaqueteAliada, yRaqueteAliada, raqueteComprimento, raqueteAltura, xBolinha, yBolinha, raio);


  if (colidiu) {
    velocidadeXBolinha *= -1;
    raquetada.play()
  }


}




function colisaoInimigaRaqueteBiblioteca() {


  colidiu =
    collideRectCircle(xRaqueteInimiga, yRaqueteInimiga, raqueteComprimento, raqueteAltura, xBolinha, yBolinha, raio);


  if (colidiu) {
    velocidadeXBolinha *= -1;
    raquetada.play()
  }


}




function incluiPlacar() {
  stroke(255)
  textAlign(CENTER);
  textSize(16);
  fill(color(255, 140, 0));
  rect(150, 10, 40, 20);
  fill(255)
  text(placarAliado, 170, 26);
  fill(color(255, 140, 0));
  rect(450, 10, 40, 20);
  fill(255)
  text(placarInimigo, 470, 26);


  if (xBolinha > 590) {
    placarAliado += 1
    ponto.play()
  }


  if (xBolinha < 10) {
    placarInimigo += 1
    ponto.play()

  }


}



function bolinhaNaoFicaPresa() {
  if (xBolinha - raio < 0) {
    xBolinha = 23
  }
}




