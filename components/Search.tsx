import Image from "next/image"

export const Search  = () => {
return(
    <div className="flex items-center gap-4">
        <Image 
        src={"/images/search-line.png"} 
        alt="search"
        width={15}
        height={15}
        />
        <input type="text" className="bg-transparent outline-none text-gray-800 placeholder:text-gray-600" placeholder="Buscar..."/>
    </div>
)
}
