let qtd = 1150;
let mes = 0;
let ano = 0;
let resto = 0;

for (let i = 0; i < qtd; i++) {
  mes = Math.ceil(qtd / 31, 1);
}

while (mes > 12) {
  ano += 1;
  mes -= 12;
}

console.log(resto, mes, ano);
