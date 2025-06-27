/* eslint-disable @next/next/no-img-element */
import Link from "next/link"

const RecipeCard = (props) => {
    const recipe = props.recipe
    return (
        <div className="card w-96 bg-base-100 shadow-xl">
            <figure className="h-3/4"><img src={recipe.image} alt={recipe.name} className="h-full"/></figure>
            <div className="card-body">
                <Link href={`/recipe/${recipe._id}`}>
                    <h2 className="card-title">{recipe.name}</h2>
                </Link>
                <p>{recipe.description}</p>
                <div className="card-actions justify-end">
                    {recipe.tags.map((tag) => (
                        <button className="badge badge-outline" key={tag} onClick={props.handleTagClick}>{tag}</button>
                    ))}
                </div>
            </div>
            
        </div>
    )
}

export default RecipeCard