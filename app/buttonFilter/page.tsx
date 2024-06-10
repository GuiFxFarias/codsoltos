"use client";

import { useState } from "react";

export default function ButtonFilter() {
  interface INames {
    name: string;
    cargo: string;
  }

  const names: INames[] = [
    { name: "Guilherme", cargo: "Colaborador" },
    { name: "Craudio", cargo: "Supervisor" },
    { name: "Manuela", cargo: "Colaborador" },
    { name: "Rodrygo", cargo: "Supervisor" },
  ];

  const [values, setValues] = useState(names);

  function clickButton(e: any) {
    e.preventDefault();

    const value = e.target.id.toLowerCase();

    setValues(
      names.filter((cargo) => {
        return cargo.cargo.toLowerCase().includes(value); // Filtra os cargos para mostrar depois de clicar no botão
      })
    );
  }

  function clean(e: any) {
    e.preventDefault();

    setValues(names);
  }

  return (
    <div className="text-white">
      <h1 className=" mb-4 ml-10 mt-10">Botão de filtro</h1>
      <button
        className="w-24 justify-center text-black rounded-md mb-4 ml-10 mt-10 p-2 bg-red-500"
        id="Supervisor"
        onClick={clickButton}
      >
        Supervisor
      </button>
      <button
        className="w-24 justify-center text-black rounded-md mb-4 ml-10 mt-10 p-2 bg-blue-500"
        onClick={clean}
      >
        Limpar
      </button>
      {values.map((a, i) => (
        <div
          key={i}
          className="w-24 justify-center text-white rounded-md mb-4 ml-10 mt-10 p-2 bg-blue-300"
        >
          {a.name}
        </div>
      ))}
    </div>
  );
}
