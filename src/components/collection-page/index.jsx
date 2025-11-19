import "./styles.css";

function CollectionPage({ title, subtitle, recipes, onBack, onSelectRecipe }) {
  return (
    <main className="collection-page">
      <button className="collection-back" onClick={onBack}>
        ← Back to homepage
      </button>

      <header className="collection-header">
        <h1>{title}</h1>
        <p className="collection-subtitle">{subtitle}</p>
      </header>

      <section className="collection-grid">
        {recipes.map((recipe) => (
          <article
            key={recipe.id}
            className={`collection-card ${
              onSelectRecipe ? "collection-card--action" : ""
            }`}
            onClick={onSelectRecipe ? () => onSelectRecipe(recipe) : undefined}
          >
            <div className="collection-card-img">
              <img src={recipe.image} alt={recipe.name} />
            </div>
            <div className="collection-card-body">
              <h3>{recipe.name}</h3>
              <div className="collection-meta">
                <span>{recipe.cuisine}</span>
                <span>{recipe.difficulty}</span>
                <span>
                  {recipe.prepTimeMinutes + recipe.cookTimeMinutes} mins total
                </span>
              </div>
              <p className="collection-description">{recipe.instructions[0]}</p>
              <div className="collection-tags">
                {recipe.mealType.map((type) => (
                  <span key={`${recipe.id}-${type}`}>{type}</span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}

export default CollectionPage;
