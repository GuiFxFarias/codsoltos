"use client";

import { useState } from "react";

function Pai() {
  const [dadosRecebidos, setDadosRecebidos] = useState("");

  // Função para receber dados do filho
  function receberDadosDoFilho(dados: any) {
    setDadosRecebidos(dados);
  }

  return (
    <div>
      <p>Dados recebidos do filho: {dadosRecebidos}</p>
      <Filho enviarDadosParaPai={receberDadosDoFilho} />
    </div>
  );
}

// Componente filho
function Filho(props: any) {
  // Função para enviar dados para o pai
  function enviarDados() {
    const dados = "Dados do filhote";
    props.enviarDadosParaPai(dados);
  }

  return (
    <div>
      <button onClick={enviarDados}>Enviar Dados</button>
    </div>
  );
}

// Componente principal
function ListaPai() {
  return (
    <div>
      <Pai />
    </div>
  );
}

export default ListaPai;
