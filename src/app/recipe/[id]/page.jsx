/* eslint-disable @next/next/no-img-element */
import axiosInstance from "@/lib/axiosInstance";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import Step from "@/components/Step";
import Buttons from "@/components/Buttons";

import { Roboto_Slab } from "next/font/google";
const robotoSlab = Roboto_Slab({ subsets: ["latin"] });

export default async function RecipePage({ params }) {
  const res = await axiosInstance.get(`/api/recipes/${params.id}`, {
    params: {
      id: params.id,
    },
  });

  const recipe = res.data.recipe
  console.log(recipe)
  return (
    <section>
      <div className="card card-side h-96 bg-[#ffffff] rounded-none drop-shadow-lg">
      <div className="card-body justify-center">
        <h2 className={`${robotoSlab.className} card-title text-4xl`}>{recipe.name}</h2>
        <p className="grow-0">{recipe.description}</p>
        <p className="grow-0 text-tlight">Autor: {recipe.author}</p>
        <hr className="text-tlight"/>
        <div className="py-2 gap-6 flex items-center">
          <FontAwesomeIcon icon={faClock} size="2x" color="#D39738"/>
          <div>
            <p className="font-bold text-center">Preparação</p>
            <p>{recipe.prepTime} minutos</p>
          </div>
          <div>
            <p className="font-bold text-center">Forno</p>
            <p>{recipe.cookTime} minutos</p>
          </div>
          <div>
            <p className="font-bold text-center">Total</p>
            <p>{recipe.cookTime + recipe.prepTime} minutos</p>
          </div>
          <Buttons id={params.id}/>
        </div>
        <div className="flex gap-4">
          
          
        </div>
       

      </div>
      <figure className="w-1/2">
        <img src={recipe.image} alt={recipe.name} ></img>
      </figure>
      </div>
      <div className="grid grid-cols-4 p-8">
        <div className="col-span-3">
          <h2 className={`${robotoSlab.className} text-2xl`}>Instruções</h2>
          {recipe.steps.map((step, index) => (
            <Step key={index} step={step} index={index}/>
          ))}
        </div>
        <div className="bg-bg rounded-xl p-4">
          <h2 className={`${robotoSlab.className} text-2xl pb-2`}>Ingredientes</h2>
          {recipe.ingredients.map((ingredient, index) => (
            <p key={index} className="py-2">{ingredient}</p>
          ))}
        </div>
      </div>
      
      
    </section>
  )
}
