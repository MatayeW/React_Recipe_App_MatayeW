import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navigation/Navbar";
import styles from "./App.module.css";
import Home from "./pages/Home";
import RecipesPage from "./pages/RecipesPage";
import RecipeDetail from "./components/Recipe/RecipeDetail";
import MealPlannerPage from "./pages/MealPlannerPage";
import FavoritesPage from "./pages/FavoritesPage";
import NotFound from "./pages/NotFound";
import { recipesData } from "./data/recipesData";

// The empty week shape used both as the initial state and whenever
// "Clear Week" is clicked.
const EMPTY_WEEK = {
    monday: { breakfast: null, lunch: null, dinner: null },
    tuesday: { breakfast: null, lunch: null, dinner: null },
    wednesday: { breakfast: null, lunch: null, dinner: null },
    thursday: { breakfast: null, lunch: null, dinner: null },
    friday: { breakfast: null, lunch: null, dinner: null },
    saturday: { breakfast: null, lunch: null, dinner: null },
    sunday: { breakfast: null, lunch: null, dinner: null },
};

function App() {
    // recipes: read once via a lazy initializer instead of setting it
    // in a mount-only useEffect. In a real app the data might come from
    // a fetch() instead, but the local-data case doesn't need an effect
    // at all since there's nothing asynchronous actually happening.
    const [recipes] = useState(() => recipesData);
    const [isLoading, setIsLoading] = useState(true);

    // favorites and mealPlan are "lifted state" — owned here in App
    // so that RecipesPage, FavoritesPage, and MealPlannerPage can all
    // read and update the same shared data instead of each having
    // their own disconnected copy. Both read their initial value from
    // localStorage via a lazy initializer (runs once, before first
    // render) rather than via a useEffect that calls setState on mount.
    const [favorites, setFavorites] = useState(() => {
        try {
            const saved = localStorage.getItem("favorites");
            return saved ? JSON.parse(saved) : [];
        } catch {
            return [];
        }
    });
    const [mealPlan, setMealPlan] = useState(() => {
        try {
            const saved = localStorage.getItem("mealPlan");
            return saved ? JSON.parse(saved) : EMPTY_WEEK;
        } catch {
            return EMPTY_WEEK;
        }
    });

    // Simulates an initial data fetch so the Loading component is
    // actually visible for a moment, rather than isLoading flipping to
    // false synchronously before the browser ever paints.
    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 400);
        return () => clearTimeout(timer);
    }, []);

    // Persist favorites to localStorage every time they change.
    useEffect(() => {
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }, [favorites]);

    // Persist the meal plan to localStorage every time it changes.
    useEffect(() => {
        localStorage.setItem("mealPlan", JSON.stringify(mealPlan));
    }, [mealPlan]);

    // Child-to-parent callback: RecipeCard calls this (via RecipeList)
    // when its favorite button is clicked. Adds or removes the recipe
    // depending on whether it's already favorited.
    const handleFavoriteToggle = (recipeId) => {
        setFavorites((prev) => {
            const alreadyFavorited = prev.some((r) => r.id === recipeId);
            if (alreadyFavorited) {
                return prev.filter((r) => r.id !== recipeId);
            }
            const recipe = recipes.find((r) => r.id === recipeId);
            return [...prev, recipe];
        });
    };

    // Child-to-parent callback: DayCard calls this when "Add" is clicked
    // on a meal slot. Updates only that one day/mealType pair, spreading
    // the rest of the mealPlan object unchanged.
    const handleAddMeal = (day, mealType, recipe) => {
        setMealPlan((prev) => ({
            ...prev,
            [day]: { ...prev[day], [mealType]: recipe },
        }));
    };

    const handleRemoveMeal = (day, mealType) => {
        setMealPlan((prev) => ({
            ...prev,
            [day]: { ...prev[day], [mealType]: null },
        }));
    };

    const handleClearWeek = () => {
        setMealPlan(EMPTY_WEEK);
    };

    return (
        <div className={styles.appLayout}>
            <Navbar favoritesCount={favorites.length} />

            <main className={styles.mainContent}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route
                        path="/recipes"
                        element={
                            <RecipesPage
                                recipes={recipes}
                                favorites={favorites}
                                isLoading={isLoading}
                                onFavoriteToggle={handleFavoriteToggle}
                            />
                        }
                    />
                    {/* Dynamic route: :id is read inside RecipeDetail via useParams() */}
                    <Route
                        path="/recipes/:id"
                        element={
                            <RecipeDetail
                                recipes={recipes}
                                favorites={favorites}
                                onFavoriteToggle={handleFavoriteToggle}
                                onAddMeal={handleAddMeal}
                            />
                        }
                    />
                    <Route
                        path="/meal-planner"
                        element={
                            <MealPlannerPage
                                mealPlan={mealPlan}
                                recipes={recipes}
                                onAddMeal={handleAddMeal}
                                onRemoveMeal={handleRemoveMeal}
                                onClearWeek={handleClearWeek}
                            />
                        }
                    />
                    <Route
                        path="/favorites"
                        element={
                            <FavoritesPage favorites={favorites} onFavoriteToggle={handleFavoriteToggle} />
                        }
                    />
                    {/* Catch-all: any path that doesn't match the routes above */}
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </main>
        </div>
    );
}

export default App;