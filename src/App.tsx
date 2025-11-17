import { useEffect, useMemo, useState } from "react";
import Navigation from "./components/navigation";

import "./index.css";
import Homepage from "./components/homepage";
import CollectionPage from "./components/collection-page";
import RecipeDetail from "./components/recipe-detail";
import recipesJson from "../data/recipes.json";
import type { Recipe } from "./types/recipe";
import type { RecipeCollection } from "./types/collection";

type View =
  | "home"
  | "craving"
  | "trending"
  | "must-see"
  | "editors"
  | "recipe"
  | "collection";

type HomeScrollTarget = "must-see" | null;

type RecipesResponse = {
  recipes: Recipe[];
};

const { recipes: allRecipes } = recipesJson as RecipesResponse;

type CollectionConfig = {
  id: string;
  title: string;
  subtitle: string;
  recipeIds: number[];
};

const mustSeeCollectionConfig: CollectionConfig[] = [
  {
    id: "mediterranean-glow",
    title: "Mediterranean Glow",
    subtitle: "Citrus, herbs, and olive oil bring these mezze-ready plates to life.",
    recipeIds: [6, 7, 9, 10],
  },
  {
    id: "global-street-party",
    title: "Global Street Party",
    subtitle: "Bold handheld bites inspired by bustling markets and night stalls.",
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
  const [view, setView] = useState<View>("home");
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  const cravingRecipes = useMemo(() => {
    const sorted = [...allRecipes].sort((a, b) => b.rating - a.rating);
    return sorted.slice(0, 8);
  }, []);

  const trendingRecipes = useMemo(() => {
    const sorted = [...allRecipes].sort((a, b) => b.reviewCount - a.reviewCount);
    return sorted.slice(0, 8);
  }, []);

  const mustSeeCollections = useMemo<RecipeCollection[]>(() => {
    return mustSeeCollectionConfig
      .map((collection) => {
        const recipes = collection.recipeIds
          .map((id) => allRecipes.find((recipe) => recipe.id === id))
          .filter((recipe): recipe is Recipe => Boolean(recipe));
        if (recipes.length === 0) {
          return null;
        }
        return {
          id: collection.id,
          title: collection.title,
          subtitle: collection.subtitle,
          recipes,
          image: recipes[0].image,
        } satisfies RecipeCollection;
      })
      .filter(
        (collection): collection is RecipeCollection => collection !== null,
      );
  }, [allRecipes]);

  const mustSeeHighlight = mustSeeCollections[0] ?? null;

  const mustSeeRecipes = useMemo(() => {
    const seen = new Set<number>();
    const aggregated: Recipe[] = [];
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
      .filter((recipe): recipe is Recipe => Boolean(recipe));
  }, []);

  const spotlightTrending = useMemo(
    () => trendingRecipes.slice(0, 4),
    [trendingRecipes],
  );

  const handleBackHome = () => setView("home");
  const handleOpenRecipe = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
    setView("recipe");
  };
  const handleBackFromRecipe = () => {
    setSelectedRecipe(null);
    setView("home");
  };

  const [collectionView, setCollectionView] = useState<RecipeCollection | null>(
    null,
  );
  const [homeScrollTarget, setHomeScrollTarget] =
    useState<HomeScrollTarget>(null);

  const handleOpenCollection = (collectionId: string) => {
    const collection = mustSeeCollections.find(({ id }) => id === collectionId);
    if (!collection) return;
    setCollectionView(collection);
    setView("collection");
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
      <Navigation />
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
        />
      )}
      {view === "craving" && (
        <CollectionPage
          title="What We Are Craving"
          subtitle="The dishes everyone on BittyMeal is reaching for right now—comforting, colorful, and packed with flavor."
          recipes={cravingRecipes}
          onBack={handleBackHome}
        />
      )}
      {view === "trending" && (
        <CollectionPage
          title="Trending Now"
          subtitle="These recipes are having a moment. High reviews and plenty of buzz from our community cooks."
          recipes={trendingRecipes}
          onBack={handleBackHome}
        />
      )}
      {view === "must-see" && (
        <CollectionPage
          title="Must-See Collections"
          subtitle="Three stand-out dishes we can't stop talking about—from Mediterranean brightness to indulgent Italian comfort."
          recipes={mustSeeRecipes}
          onBack={handleBackHome}
        />
      )}
      {view === "editors" && (
        <CollectionPage
          title="Editor's Choice"
          subtitle="Fresh picks from the BittyMeal team—seasonal favorites and can't-miss classics."
          recipes={editorsChoiceRecipes}
          onBack={handleBackHome}
        />
      )}
      {view === "collection" && collectionView && (
        <CollectionPage
          title={collectionView.title}
          subtitle={collectionView.subtitle}
          recipes={collectionView.recipes}
          onBack={handleBackFromCollection}
        />
      )}
      {view === "recipe" && selectedRecipe && (
        <RecipeDetail recipe={selectedRecipe} onBack={handleBackFromRecipe} />
      )}
    </>
  );
}

export default App;
