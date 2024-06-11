"use client";
import Image from "next/image";

export const SectionProfile = () => {
  return (
    <div className="w-full h-screen max-h-[951px] flex justify-between">
      <div className="w-4/5 flex justify-center items-center">
        <div className="bg-blue-400/30 h-full flex w-full flex-col justify-center items-center text-center font-bold text-7xl">
          <p className="mb-8 text-8xl">Olá,</p>
          <p className="mb-8">Eu sou</p>
          <p className="mb-8">Diego Fernandes</p>
          <p>de Sá</p>
        </div>
      </div>
      <div>
        <Image
          className="flex z-10 opacity-50 h-screen max-h-[951px]"
          src="/images/eu.jpg"
          alt="profile"
          width={700}
          height={700}
        />
      </div>
    </div>
  );
};
