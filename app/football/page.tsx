"use client";
import { useState } from "react";

const jogadores = [
  "Danilo",
  "Alex",
  "Matheus",
  "Luiz",
  "Lucas",
  "Fa",
  "Saulo",
  "Índio",
  "Diegao",
  "Salsa",
  "Diego",
  "Matheus G",
  "Macedo",
  "Muri",
  "Leonardo",
  "Thiago",
  "Igor Henrique",
  "Emilio",
];

const embaralharJogadores = (array: string[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const dividirTimes = (jogadores: string[]) => {
  const jogadoresEmbaralhados = embaralharJogadores([...jogadores]);
  const times = [];
  for (let i = 0; i < 3; i++) {
    times.push(jogadoresEmbaralhados.slice(i * 6, i * 6 + 6));
  }
  return times;
};

export default function Football() {
  const [times, setTimes] = useState<string[][]>([]);

  const handleDividirTimes = () => {
    const novosTimes = dividirTimes(jogadores);
    setTimes(novosTimes);
  };

  return (
    <div className="flex justify-center items-center">
      <section className="w-full bg-img_bg_hero bg-no-repeat bg-center bg-cover bg-fixed">
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg justify-center">
            <h1 className="text-2xl font-bold mb-4">
              Dividir Jogadores em Times
            </h1>
            <div className="flex w-full justify-center">
              <button
                onClick={handleDividirTimes}
                className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600"
              >
                Dividir Times
              </button>
            </div>
            <div className="mt-4">
              {times.map((time, index) => (
                <div key={index} className="mt-4">
                  <h2 className="text-xl font-semibold">Time {index + 1}</h2>
                  <ul className="list-disc list-inside">
                    {time.map((jogador, idx) => (
                      <li key={idx}>{jogador}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
