import { useEffect, useMemo, useState } from "react";
import Navigation from "./components/navigation";

import "./index.css";
import Homepage from "./components/homepage";
import CollectionPage from "./components/collection-page";
import RecipeDetail from "./components/recipe-detail";
import recipesJson from "../data/recipes.json";

const { recipes: allRecipes } = recipesJson;

const mustSeeCollectionConfig = [
  {
    id: "mediterranean-glow",
    title: "Mediterranean Glow",
    subtitle:
      "Citrus, herbs, and olive oil bring these mezze-ready plates to life.",
    recipeIds: [6, 7, 9, 10],
  },
  {
    id: "global-street-party",
    title: "Global Street Party",
    subtitle:
      "Bold handheld bites inspired by bustling markets and night stalls.",
    recipeIds: [5, 8, 11, 12],
  },
  {
    id: "cozy-comforts",
    title: "Cozy Comforts",
    subtitle: "Slow-simmered classics and hearty bakes for chill evenings in.",
    recipeIds: [4, 13, 14, 15],
  },
  {
    id: "sweet-finishes",
    title: "Sweet Finishes",
    subtitle: "Finish the night with decadent desserts and creamy treats.",
    recipeIds: [16, 17, 18, 19],
  },
];

function App() {
  const [view, setView] = useState("home");
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [previousView, setPreviousView] = useState(null);
  const [collectionView, setCollectionView] = useState(null);
  const [homeScrollTarget, setHomeScrollTarget] = useState(null);

  const cravingRecipes = useMemo(() => {
    const sorted = [...allRecipes].sort((a, b) => b.rating - a.rating);
    return sorted.slice(0, 8);
  }, []);

  const trendingRecipes = useMemo(() => {
    const sorted = [...allRecipes].sort(
      (a, b) => b.reviewCount - a.reviewCount
    );
    return sorted.slice(0, 8);
  }, []);

  const mustSeeCollections = useMemo(() => {
    return mustSeeCollectionConfig
      .map((collection) => {
        const recipes = collection.recipeIds
          .map((id) => allRecipes.find((recipe) => recipe.id === id))
          .filter(Boolean);
        if (recipes.length === 0) {
          return null;
        }
        return {
          id: collection.id,
          title: collection.title,
          subtitle: collection.subtitle,
          recipes,
          image: recipes[0].image,
        };
      })
      .filter(Boolean);
  }, []);

  const mustSeeHighlight = mustSeeCollections[0] ?? null;

  const mustSeeRecipes = useMemo(() => {
    const seen = new Set();
    const aggregated = [];
    mustSeeCollections.forEach((collection) => {
      collection.recipes.forEach((recipe) => {
        if (!seen.has(recipe.id)) {
          seen.add(recipe.id);
          aggregated.push(recipe);
        }
      });
    });
    return aggregated;
  }, [mustSeeCollections]);

  const editorsChoiceRecipes = useMemo(() => {
    const editorIds = [1, 2, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
    return editorIds
      .map((id) => allRecipes.find((recipe) => recipe.id === id))
      .filter(Boolean);
  }, []);

  const spotlightTrending = useMemo(
    () => trendingRecipes.slice(0, 4),
    [trendingRecipes]
  );

  const handleOpenRecipe = (recipe) => {
    setSelectedRecipe(recipe);
    setPreviousView(view);
    setView("recipe");
  };

  const handleBackFromRecipe = () => {
    setSelectedRecipe(null);
    setView(previousView ?? "home");
    setPreviousView(null);
  };

  const handleOpenCollection = (collectionId) => {
    const collection = mustSeeCollections.find(({ id }) => id === collectionId);
    if (!collection) return;
    setCollectionView(collection);
    setView("collection");
  };

  const handleOpenExplore = () => {
    setView("explore");
  };

  const handleNavigateSection = (section) => {
    switch (section) {
      case "craving":
        setView("craving");
        break;
      case "trending":
        setView("trending");
        break;
      case "must-see":
        setView("must-see");
        break;
      case "editors":
        setView("editors");
        break;
      default:
        setView("home");
    }
  };

  const handleBackFromCollection = () => {
    setCollectionView(null);
    setView("home");
    setHomeScrollTarget("must-see");
  };

  useEffect(() => {
    if (view !== "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [view]);

  return (
    <>
      <Navigation
        recipes={allRecipes}
        onSelectRecipe={handleOpenRecipe}
        onNavigateSection={handleNavigateSection}
      />
      {view === "home" && (
        <Homepage
          onOpenCraving={() => setView("craving")}
          onOpenTrending={() => setView("trending")}
          onOpenMustSee={() => setView("must-see")}
          onOpenCollection={handleOpenCollection}
          onOpenEditorsChoice={() => setView("editors")}
          trendingRecipes={spotlightTrending}
          mustSeeHighlight={mustSeeHighlight}
          mustSeeCollections={mustSeeCollections}
          editorsChoiceRecipes={editorsChoiceRecipes}
          onSelectRecipe={handleOpenRecipe}
          scrollTarget={homeScrollTarget}
          onClearScrollTarget={() => setHomeScrollTarget(null)}
          onOpenExplore={handleOpenExplore}
        />
      )}
      {view === "craving" && (
        <CollectionPage
          title="What We Are Craving"
          subtitle="The dishes everyone on BittyMeal is reaching for right now—comforting, colorful, and packed with flavor."
          recipes={cravingRecipes}
          onBack={() => setView("home")}
          onSelectRecipe={handleOpenRecipe}
        />
      )}
      {view === "trending" && (
        <CollectionPage
          title="Trending Now"
          subtitle="These recipes are having a moment. High reviews and plenty of buzz from our community cooks."
          recipes={trendingRecipes}
          onBack={() => setView("home")}
          onSelectRecipe={handleOpenRecipe}
        />
      )}
      {view === "must-see" && (
        <CollectionPage
          title="Must-See Collections"
          subtitle="Three stand-out dishes we can't stop talking about—from Mediterranean brightness to indulgent Italian comfort."
          recipes={mustSeeRecipes}
          onBack={() => setView("home")}
          onSelectRecipe={handleOpenRecipe}
        />
      )}
      {view === "editors" && (
        <CollectionPage
          title="Editor's Choice"
          subtitle="Fresh picks from the BittyMeal team—seasonal favorites and can't-miss classics."
          recipes={editorsChoiceRecipes}
          onBack={() => setView("home")}
          onSelectRecipe={handleOpenRecipe}
        />
      )}
      {view === "explore" && (
        <CollectionPage
          title="Explore More"
          subtitle="Browse every BittyMeal recipe in one place—perfect when you want something unexpected."
          recipes={allRecipes}
          onBack={() => setView("home")}
          onSelectRecipe={handleOpenRecipe}
        />
      )}
      {view === "collection" && collectionView && (
        <CollectionPage
          title={collectionView.title}
          subtitle={collectionView.subtitle}
          recipes={collectionView.recipes}
          onBack={handleBackFromCollection}
          onSelectRecipe={handleOpenRecipe}
        />
      )}
      {view === "recipe" && selectedRecipe && (
        <RecipeDetail recipe={selectedRecipe} onBack={handleBackFromRecipe} />
      )}
    </>
  );
}

export default App;
