import { SectionProfile } from "@/components/SectionProfile";


export default function Home() {

  return (
    <div className="flex justify-center items-center">
       <section className="w-full bg-img_bg_hero bg-no-repeat bg-center bg-cover bg-fixed">
        <SectionProfile/>
       </section>
    </div>
  );
}