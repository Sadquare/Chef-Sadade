
export default function IngredientsList(props){

    const ingredientElments = props.ingredients.map((element, index) => <li key={index}>{element}</li>)

    
    return(
        <section>
                <h3>📝 List of Ingredients</h3>
                <ul>{ingredientElments}</ul>
                {props.ingredients.length > 2 && <div className="recipe-box">
                    <div>
                        <h3>Ready for a recipe?</h3>
                        <p>Generate Recipe from your list of ingredients.</p>
                    </div>
                    {props.recipeList ? <button onClick={props.closeRecipe}>Close Recipe List</button> : 
                    <button onClick={props.handleRecipeClick}>Get Recipe</button>}
                </div>}
            </section>
    )
}