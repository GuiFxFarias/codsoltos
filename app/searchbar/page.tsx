"use client";
import { useState } from "react";

export default function Searchbar() {
  interface INames {
    name: string;
  }

  const names: INames[] = [
    { name: "Guilherme" },
    { name: "Guilarme" },
    { name: "Manuela" },
    { name: "Rodrygo" },
  ];

  const [value, setValue] = useState("");

  const valueLowerCase = value.toLowerCase();

  const aNames = names.filter((name) =>
    name.name.toLowerCase().includes(valueLowerCase)
  );

  return (
    <div>
      <h1 className="text-white mb-4 ml-10 mt-10">Searchbar</h1>
      <div className="text-white ml-10 mt-10 flex">
        <input
          type="search"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="pl-1 text-black rounded-md mr-2"
        />
      </div>
      <ul className="text-white ml-10 mt-2">
        {aNames.map((name, i) => (
          <li className="text-white" key={i}>
            {name.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
