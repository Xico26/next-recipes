"use client"

import { useState } from "react"

import Form from "../../components/Form"
import { useRouter } from "next/navigation"

const NewRecipe = () => {
    const router = useRouter()
    const [submitting, setSubmitting] = useState(false)
    const [recipe, setRecipe] = useState({
        author: '',
        name: '',
        description: '',
        prepTime: '',
        cookTime: '',
        ingredients: [],
        steps: [],
        tags: [],
        image: ''
    })

    const handleIngredientChange = (e, index) => {
        const { value } = e.target;
        setRecipe(prevRecipe => ({
            ...prevRecipe,
            ingredients: prevRecipe.ingredients.map((ingredient, i) => i === index ? value : ingredient)
        }));
    };

    const addIngredient = () => {
        setRecipe(prevRecipe => ({
            ...prevRecipe,
            ingredients: [...prevRecipe.ingredients, '']
        }));
    };

    const removeIngredient = (index) => {
        setRecipe(prevRecipe => ({
            ...prevRecipe,
            ingredients: prevRecipe.ingredients.filter((_, i) => i !== index)
        }));
    };
    const handleStepChange = (e, index) => {
        const { value } = e.target;
        setRecipe(prevRecipe => ({
            ...prevRecipe,
            steps: prevRecipe.steps.map((step, i) => i === index ? value : step)
        }));
    };

    const addStep = () => {
        setRecipe(prevRecipe => ({
            ...prevRecipe,
            steps: [...prevRecipe.steps, '']
        }));
    };

    const removeStep = (index) => {
        setRecipe(prevRecipe => ({
            ...prevRecipe,
            steps: prevRecipe.steps.filter((_, i) => i !== index)
        }));
    };

    const handleTagChange = (e, index) => {
      const { value } = e.target;
      setRecipe(prevRecipe => ({
          ...prevRecipe,
          tags: prevRecipe.tags.map((tag, i) => i === index ? value : tag)
      }));
  };
    const addTag = () => {
        setRecipe(prevRecipe => ({
            ...prevRecipe,
            tags: [...prevRecipe.tags, '']
        }));
    };

    const removeTag = (index) => {
        setRecipe(prevRecipe => ({
            ...prevRecipe,
            tags: prevRecipe.tags.filter((_, i) => i !== index)
        }));
    };

    const createRecipe = async (e) => {
        e.preventDefault()
        setSubmitting(true)
        try {
            const res = await fetch("/api/recipes/new", {
                method: 'POST',
                body: JSON.stringify({
                    author: recipe.author,
                    name: recipe.name,
                    description: recipe.description,
                    prepTime: recipe.prepTime,
                    cookTime: recipe.cookTime,
                    ingredients: recipe.ingredients,
                    steps: recipe.steps,
                    tags: recipe.tags,
                    image: recipe.image
                })
            })
            if (res.ok) {
                router.push('/')
            }
        } catch(e) {
            console.log("Creating error!")
            console.log(e)
        } finally {
            setSubmitting(false)
        }
    }


    return (
        <Form type="Adicionar" recipe={recipe} setRecipe={setRecipe} submitting={submitting} handleSubmit={createRecipe} addIngredient={addIngredient} removeIngredient={removeIngredient} handleIngredientChange={handleIngredientChange} addStep={addStep} removeStep={removeStep} handleStepChange={handleStepChange} addTag={addTag} removeTag={removeTag} handleTagChange={handleTagChange}/>
    )
}

export default NewRecipe