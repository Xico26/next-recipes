"use client"

import { useRouter } from "next/navigation"

const Buttons = (props) => {
    const router = useRouter()
    const deleteRecipe = async () => {
        const hasConfirmed = confirm("Tem a certeza que quer apagar esta receita?")
        if (hasConfirmed) {
            try {
                await fetch(`/api/recipes/${props.id}`, {
                    method: "DELETE"
                })
                router.push("/")
            } catch (e) {
                console.log(e)
            }
        }
    }
    const editRecipe = async () => {
        router.push(`/edit?id=${props.id}`)
    }
    return (
        <div className="flex gap-4">
            <div>
                <button className="btn btn-outline btn-error p-2" onClick={deleteRecipe}>Apagar Receita</button>
            </div>
            <div>
                <button className="btn btn-outline btn-info p-2" onClick={editRecipe}>Editar Receita</button>
            </div>
        </div>
    )
}

export default Buttons