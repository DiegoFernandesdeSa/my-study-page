"use client";
import Card from "./Card";
import { mockData } from "./mock/mock";

export const SectionCard = () => {
  return (
    <div className="flex md:grid-cols-2 gap-8 justify-center items-center py-6 px-8 h-screen max-h-[951px]">
      {mockData.map((mock, idx) => (
        <Card key={idx} content={mock.content} name={mock.name} />
      ))}
    </div>
  );
};
