import { useState } from "react";
import Recipe from "./Recipe"
import IngredientsList from "./IngredientsList"
import {getRecipeFromGemini} from '../src/ai.js'

export default function ChefClaude() {

    const [ingredients, setIngredients] = useState([])

    const [recipeList, setRecipeList] = useState(false)

    function addNewIngredient(formData) {

        const newIngredient = formData.get("ingredient")
        if(newIngredient.trim() === "") {
            alert("Please enter a valid ingredient.")
            return
        }else
        setIngredients(prev => [...prev, newIngredient])
    }

    async function handleRecipeClick() {
        const recipe = await getRecipeFromGemini(ingredients)
        setRecipeList(recipe)
    }
    function closeRecipe() {
        setRecipeList("")
    }
    return (<>
        <main>
            <form action={addNewIngredient}>
                <input type="text" name="ingredient" />
                <button>+ Add ingredient</button>
            </form>

            {ingredients.length > 0 && <IngredientsList 
            ingredients={ingredients} 
            handleRecipeClick={handleRecipeClick} 
            recipeList={recipeList}
            closeRecipe={closeRecipe}
            />}
            {recipeList && <Recipe recipeList={recipeList}/>}
        </main>
    </>);
}