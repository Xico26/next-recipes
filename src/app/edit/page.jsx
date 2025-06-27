"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import axiosInstance from "@/lib/axiosInstance";

import Form from "@/components/Form"

const EditRecipe = () => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const recipeId = searchParams.get("id")
    console.log(recipeId)
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

    useEffect(() => {
        const getRecipeDetails = async () => {
            console.log("RECIPEID")
            console.log(recipeId)
            const res = await axiosInstance.get(`/api/recipes/${recipeId}`, {
                params: {
                    id: recipeId
                }
            });
              const recipe = res.data.recipe
              console.log(recipe)
            setRecipe({
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
        }
        if (recipeId) {
            getRecipeDetails()
        }
    }, [recipeId])

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

    const editRecipe = async (e) => {
        e.preventDefault()
        setSubmitting(true)

        if (!recipeId) {
            return alert("RECIPE ID NOT FOUND!")
        }
        try {
            const res = await fetch(`/api/recipes/${recipeId}`, {
                method: 'PATCH',
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

        <Form type="Editar" recipe={recipe} setRecipe={setRecipe} submitting={submitting} handleSubmit={editRecipe} addIngredient={addIngredient} removeIngredient={removeIngredient} handleIngredientChange={handleIngredientChange} addStep={addStep} removeStep={removeStep} handleStepChange={handleStepChange} addTag={addTag} removeTag={removeTag} handleTagChange={handleTagChange}/>
    )
}

export default EditRecipe