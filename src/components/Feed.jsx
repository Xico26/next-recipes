'use client'

import { useState, useEffect } from "react"
import RecipeCard from "./RecipeCard"
import Search from "./Search"

const Feed = () => {
  const [recipes,setRecipes] = useState([])
  const [search, setSearch] = useState("")
  const [filteredTags, setFilteredTags] = useState("")
  const handleSearchChange = (e) => {
    const { value } = e.target;
    setSearch(value);
    console.log(value)
  }

  const handleTagClick = (e) => {
    const value = e.target.innerText;
    setFilteredTags(value)
  }

  const handleClick = (e) => {
    setFilteredTags("")
  }

  useEffect(() => {
    const fetchrecipes = async () => {
      const res = await fetch("/api/recipes")
      const data = await res.json()
      setRecipes(data)
    }
    fetchrecipes()
  }, [])

  const filteredRecipes = recipes.filter((recipe) => {
    if (filteredTags == "") {
      return recipe.name.toLowerCase().includes(search.toLowerCase())
    }
    return recipe.name.toLowerCase().includes(search.toLowerCase()) && recipe.tags.includes(filteredTags)
  })

  return (
    <main className="w-full">
      <Search handleSearchChange={handleSearchChange}/>
      {filteredTags ? 
        <div className="flex gap-4 items-center justify-center mb-4">
          <p><span className="font-bold">Filtro: </span>{filteredTags}</p>
          <button className="btn btn-outline btn-error " onClick={handleClick}>Limpar Filtros</button> 
        </div>
        
      : ''}
      <section className="feed">
        <div className="flex flex-wrap gap-4 justify-center">
        {filteredRecipes.map((recipe) => (
          <RecipeCard key={recipe._id} recipe={recipe} handleTagClick={handleTagClick}/>
        ))}
      </div>
      </section>
    </main>
    
  )
}

export default Feed