function contarEspace(txt) {
  const espacos = txt.split(" ");

  const primeiroNome = espacos.shift();
  const ultimoNome = espacos.pop();

  return primeiroNome + " " + ultimoNome;
}

const texto = "Contar espacos sao tres";
const contar = contarEspace(texto);
console.log(contarEspace("Numero de espacos sao:", contar));
