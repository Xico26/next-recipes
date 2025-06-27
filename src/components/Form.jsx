import Link from "next/link"

const Form = ({type, recipe, setRecipe, submitting, handleSubmit, addIngredient, removeIngredient, handleIngredientChange, handleStepChange, addStep, removeStep, handleTagChange, addTag, removeTag}) => {
  return (
    <section className="w-full max-w-full flex-start flex-col p-8">
        <h1 className="head_text text-left">
            <span className="text-2xl font-satoshi">{type} Receita</span>
        </h1>
        <form onSubmit={handleSubmit} className="mt-10 w-full max-w-2xl flex flex-col gap-7">
            <label>
                <span className="font-semibold text-gray-700 font-satoshi">Autor</span>
                <input value={recipe.author} onChange={(e) => setRecipe({...recipe, author: e.target.value})} placeholder="Nome do Autor" required className="input input-bordered flex items-center gap-2 w-full"/>
            </label>
            <label>
                <span className="font-semibold text-gray-700 font-satoshi">Nome</span>
                <input value={recipe.name} onChange={(e) => setRecipe({...recipe, name: e.target.value})} placeholder="Nome da Receita" required className="input input-bordered flex items-center gap-2 w-full"/>
            </label>
            <label className="flex flex-col">
                <span className="font-semibold text-gray-700 font-satoshi">Descrição</span>
                <textarea value={recipe.description} onChange={(e) => setRecipe({...recipe, description: e.target.value})} placeholder="Descrição" required className="textarea textarea-bordered w-full"/>
            </label>
            <label>
                <span className="font-satoshi font-semibold text-gray-700">
                    Tempo de Preparação
                </span>
                <input value={recipe.prepTime} onChange={(e) => setRecipe({...recipe, prepTime: e.target.value})} placeholder="Tempo de Preparação" required className="input input-bordered flex items-center gap-2 w-full" type="number"/>
            </label>
            <label>
                <span className="font-satoshi font-semibold text-gray-700">
                    Tempo de Forno
                </span>
                <input value={recipe.cookTime} onChange={(e) => setRecipe({...recipe, cookTime: e.target.value})} placeholder="Tempo de Forno" required className="input input-bordered flex items-center gap-2 w-full" type="number"/>
            </label>
            <div className="">
                <div className="font-satoshi font-semibold text-gray-700 pb-2">
                    Ingredientes
                </div>
                {recipe.ingredients.map((ingredient, index) => (
                    <div key={index} className="flex gap-4 pb-4">
                        <input
                            type="text"
                            value={ingredient}
                            className="input input-bordered flex items-center gap-2 w-full"
                            onChange={(e) => handleIngredientChange(e, index)} placeholder="Ingrediente"
                        />
                        <button type="button" onClick={() => removeIngredient(index)} className="btn btn-outline btn-error">Remover</button>
                    </div>
                ))}
                <button type="button" onClick={addIngredient} className="btn btn-outline btn-info">Adicionar Ingrediente</button>
            </div>
            <div>
                <div className="font-satoshi font-semibold text-gray-700 pb-2">
                    Passos
                </div>
                {recipe.steps.map((step, index) => (
                    <div key={index} className="flex gap-4 pb-4">
                        <input
                            type="text"
                            value={step}
                            className="input input-bordered flex items-center gap-2 w-full"
                            onChange={(e) => handleStepChange(e, index)} placeholder="Passo"
                        />
                        <button type="button" onClick={() => removeStep(index)} className="btn btn-outline btn-error">Remover</button>
                    </div>
                ))}
                <button type="button" onClick={addStep} className="btn btn-outline btn-info">Adicionar Passo</button>
            </div>
            <div>
                <div className="font-satoshi font-semibold text-gray-700 pb-2">
                    Categorias
                </div>
                {recipe.tags.map((tag, index) => (
                    <div key={index} className="flex gap-4 pb-4">
                        <input
                            type="text"
                            value={tag}
                            className="input input-bordered flex items-center gap-2 w-full"
                            onChange={(e) => handleTagChange(e, index)} placeholder="Categoria"
                        />
                        <button type="button" onClick={() => removeTag(tag)} className="btn btn-outline btn-error">Remover</button>
                    </div>
                ))}
                <button type="button" onClick={addTag} className="btn btn-outline btn-info">Adicionar Categoria</button>
            </div>
            <label className="flex flex-col">
                <span className="font-semibold text-gray-700 font-satoshi">
                    Imagem
                </span>
                <textarea value={recipe.image} onChange={(e) => setRecipe({...recipe, image: e.target.value})} placeholder="Endereço URL da imagem" required className="textarea textarea-bordered"/>
            </label>
            <div className="flex flex-end mb-5 gap-4">
                <button type="submit" disabled={submitting} className="btn btn-success !text-bglight">
                        {submitting ? `${type}...` : type}
                </button>
                <Link href="/" className="btn btn-error !text-bglight">
                    Cancelar
                </Link>
            </div>
            
        </form>
    </section>
  )
}

export default Form