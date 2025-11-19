import { useEffect, useRef } from "react";
import "./styles.css";
import { cravingItem } from "../../../data/homepageData.js";

function Homepage({
  onOpenCraving,
  onOpenTrending,
  onOpenMustSee,
  onOpenCollection,
  onOpenEditorsChoice,
  onOpenExplore,
  trendingRecipes,
  mustSeeHighlight,
  mustSeeCollections,
  editorsChoiceRecipes,
  onSelectRecipe,
  scrollTarget,
  onClearScrollTarget,
}) {
  const mustSeeSectionRef = useRef(null);

  useEffect(() => {
    if (scrollTarget === "must-see" && mustSeeSectionRef.current) {
      mustSeeSectionRef.current.scrollIntoView({ behavior: "smooth" });
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
              onClick={onOpenCraving}
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
              onClick={() => onSelectRecipe(recipe)}
            >
              <img src={recipe.image} alt={recipe.name} />
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
            onClick={() => onOpenCollection(mustSeeHighlight.id)}
          >
            <div className="must-see-feature-img">
              <img
                src={mustSeeHighlight.image}
                alt={mustSeeHighlight.title}
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
              onClick={() => onOpenCollection(collection.id)}
            >
              <img src={collection.image} alt={collection.title} />
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
            onClick={() => onSelectRecipe(recipe)}
          >
            <img src={recipe.image} alt={recipe.name} />
            <p className="editors-card-title">{recipe.name}</p>
          </div>
        ))}
      </div>

      <div className="explore-more">
        <button className="explore-more-button" onClick={onOpenExplore}>
          Explore More
        </button>
      </div>
    </section>
  );
}

export default Homepage;
