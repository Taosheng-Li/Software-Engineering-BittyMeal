import "./styles.css";
import type { KeyboardEvent } from "react";
import { useEffect, useRef } from "react";
import { cravingItem } from "../../../data/homepageData";
import type { Recipe } from "../../types/recipe";
import type { RecipeCollection } from "../../types/collection";

type HomepageProps = {
  onOpenCraving: () => void;
  onOpenTrending: () => void;
  onOpenMustSee: () => void;
  onOpenCollection: (collectionId: string) => void;
  onOpenEditorsChoice: () => void;
  trendingRecipes: Recipe[];
  mustSeeHighlight: RecipeCollection | null;
  mustSeeCollections: RecipeCollection[];
  editorsChoiceRecipes: Recipe[];
  onSelectRecipe: (recipe: Recipe) => void;
  scrollTarget: "must-see" | null;
  onClearScrollTarget?: () => void;
};

const Homepage = ({
  onOpenCraving,
  onOpenTrending,
  onOpenMustSee,
  onOpenCollection,
  onOpenEditorsChoice,
  trendingRecipes,
  mustSeeHighlight,
  mustSeeCollections,
  editorsChoiceRecipes,
  onSelectRecipe,
  scrollTarget,
  onClearScrollTarget,
}: HomepageProps) => {
  const handleKeyPress = (
    event: KeyboardEvent<HTMLElement>,
    cb: () => void
  ) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      cb();
    }
  };

  const mustSeeSectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (scrollTarget === "must-see" && mustSeeSectionRef.current) {
      mustSeeSectionRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      onClearScrollTarget?.();
    }
  }, [scrollTarget, onClearScrollTarget]);

  return (
    <section className="whole-page">
      <div className="section-heading">
        <p className="heading">WHAT WE ARE CRAVING</p>
        <button className="heading-link" onClick={onOpenCraving}>
          SEE ALL
        </button>
      </div>

      <div className="craving-scroll">
        <div className="craving-con">
          {cravingItem.map((item) => (
            <div
              key={item.id}
              className="craving-pic interactive-card"
              role="button"
              tabIndex={0}
              onClick={onOpenCraving}
              onKeyDown={(event) => handleKeyPress(event, onOpenCraving)}
            >
              <img src={item.img} alt={item.name} />
              <div className="craving-pic-p">
                <p>COLLECTION</p>
                <p id="des">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="section-heading section-heading--trending">
        <p className="heading">Trending</p>
        <button className="heading-link" onClick={onOpenTrending}>
          SEE ALL
        </button>
      </div>

      <div className="trending-scroll">
        <div className="trending-con">
          {trendingRecipes.map((recipe) => (
            <div
              key={recipe.id}
              className="trending-pic interactive-card"
              role="button"
              tabIndex={0}
              onClick={() => onSelectRecipe(recipe)}
              onKeyDown={(event) =>
                handleKeyPress(event, () => onSelectRecipe(recipe))
              }
            >
              <img src={recipe.image} alt={recipe.name} loading="lazy" />
              <div className="trending-pic-p">
                <p className="trending-name">{recipe.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div ref={mustSeeSectionRef}>
        <div className="section-heading section-heading--must-see">
          <p className="heading">Must-See</p>
          <button className="heading-link" onClick={onOpenMustSee}>
            SEE ALL
          </button>
        </div>

        {mustSeeHighlight && (
          <div
            className="must-see-feature interactive-card"
            role="button"
            tabIndex={0}
          onClick={() => onOpenCollection(mustSeeHighlight.id)}
          onKeyDown={(event) =>
            handleKeyPress(event, () => onOpenCollection(mustSeeHighlight.id))
          }
        >
          <div className="must-see-feature-img">
            <img
              src={mustSeeHighlight.image}
              alt={mustSeeHighlight.title}
              loading="lazy"
            />
          </div>
          <div className="must-see-feature-copy">
            <p className="must-see-label">Collection</p>
            <h3 className="must-see-feature-title">
              {mustSeeHighlight.title}
            </h3>
            <p className="must-see-feature-description">
              {mustSeeHighlight.subtitle}
            </p>
          </div>
        </div>
        )}

        <div className="must-see-grid">
          {mustSeeCollections.slice(1).map((collection) => (
            <div
              key={collection.id}
              className="must-see-card interactive-card"
              role="button"
              tabIndex={0}
              onClick={() => onOpenCollection(collection.id)}
              onKeyDown={(event) =>
                handleKeyPress(event, () => onOpenCollection(collection.id))
              }
            >
              <img src={collection.image} alt={collection.title} loading="lazy" />
              <div className="must-see-overlay">
                <p className="must-see-label">Collection</p>
                <h3 className="must-see-title">{collection.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="section-heading section-heading--editors">
        <p className="heading">Editor's Choice</p>
        <button className="heading-link" onClick={onOpenEditorsChoice}>
          SEE ALL
        </button>
      </div>

      <div className="editors-grid">
        {editorsChoiceRecipes.map((recipe) => (
          <div
            key={recipe.id}
            className="editors-card interactive-card"
            role="button"
            tabIndex={0}
            onClick={() => onSelectRecipe(recipe)}
            onKeyDown={(event) =>
              handleKeyPress(event, () => onSelectRecipe(recipe))
            }
          >
            <img src={recipe.image} alt={recipe.name} loading="lazy" />
            <p className="editors-card-title">{recipe.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Homepage;
