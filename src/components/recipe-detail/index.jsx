import "./styles.css";

function RecipeDetail({ recipe, onBack }) {
  const totalTime = recipe.prepTimeMinutes + recipe.cookTimeMinutes;

  return (
    <main className="recipe-detail">
      <button className="detail-back" onClick={onBack}>
        ← Back to homepage
      </button>

      <header className="detail-header">
        <div className="detail-text">
          <p className="detail-eyebrow">{recipe.cuisine}</p>
          <h1 className="detail-title">{recipe.name}</h1>
          <div className="detail-meta">
            <span>★ {recipe.rating.toFixed(1)}</span>
            <span>{recipe.reviewCount} reviews</span>
            <span>{recipe.difficulty} difficulty</span>
            <span>{totalTime} mins total</span>
            <span>Serves {recipe.servings}</span>
          </div>
          <p className="detail-lede">{recipe.instructions[0]}</p>
        </div>
        <div className="detail-hero">
          <img src={recipe.image} alt={recipe.name} />
        </div>
      </header>

      <section className="detail-content">
        <article className="detail-panel">
          <h2>Ingredients</h2>
          <ul>
            {recipe.ingredients.map((ingredient, index) => (
              <li key={`${recipe.id}-ingredient-${index}`}>{ingredient}</li>
            ))}
          </ul>
        </article>

        <article className="detail-panel">
          <h2>Instructions</h2>
          <ol>
            {recipe.instructions.map((step, index) => (
              <li key={`${recipe.id}-instruction-${index}`}>{step}</li>
            ))}
          </ol>
        </article>
      </section>

      {recipe.tags.length > 0 && (
        <footer className="detail-footer">
          <p>Tags</p>
          <div className="detail-tags">
            {recipe.tags.map((tag) => (
              <span key={`${recipe.id}-${tag}`}>{tag}</span>
            ))}
          </div>
        </footer>
      )}
    </main>
  );
}

export default RecipeDetail;
