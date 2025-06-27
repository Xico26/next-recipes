import Link from "next/link"

const Navbar = () => {
  return (
    <div className="flex px-8 p-4 items-center w-full bg-myaccent">
      <Link className="text-3xl font-bold" href={"/"}>FamRecipes</Link>
      <Link className="ml-auto" href={"/new"}>Adicionar Receita</Link>
    </div>
  )
}

export default Navbar