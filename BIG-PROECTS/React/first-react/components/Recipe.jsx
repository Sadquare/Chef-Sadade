import ReactMarkdown from "react-markdown"
export default function Recipe(props) {

    return(
        <section>
                <ReactMarkdown>{props.recipeList}</ReactMarkdown>
            </section>
    )
}