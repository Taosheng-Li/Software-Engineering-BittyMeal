import "./styles.css";
import type { Recipe } from "../../types/recipe";

type CollectionPageProps = {
  title: string;
  subtitle: string;
  recipes: Recipe[];
  onBack: () => void;
};

const CollectionPage = ({
  title,
  subtitle,
  recipes,
  onBack,
}: CollectionPageProps) => {
  return (
    <main className="collection-page">
      <button className="collection-back" onClick={onBack}>
        ← Back to homepage
      </button>

      <header className="collection-header">
        <h1>{title}</h1>
        <p className="collection-subtitle">{subtitle}</p>
      </header>

      <section className="collection-grid" aria-live="polite">
        {recipes.map((recipe) => (
          <article key={recipe.id} className="collection-card">
            <div className="collection-card-img">
              <img src={recipe.image} alt={recipe.name} loading="lazy" />
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
};

export default CollectionPage;
