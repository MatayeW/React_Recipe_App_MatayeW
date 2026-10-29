import { useState } from "react";
import PropTypes from "prop-types";
import { useSearchParams } from "react-router-dom";
import SearchBar from "../components/UI/SearchBar";
import RecipeFilter from "../components/Recipe/RecipeFilter";
import RecipeList from "../components/Recipe/RecipeList";
import Loading from "../components/UI/Loading";
import { filterRecipes, sortRecipes } from "../utils/helpers";
import styles from "./Pages.module.css";

const RecipesPage = ({
    recipes,
    favorites,
    isLoading,
    onFavoriteToggle,
}) => {
    const [searchParams] = useSearchParams();

    const initialCategory = searchParams.get("category") || "all";
    const initialCuisine = searchParams.get("cuisine") || "all";
    const initialSearch = searchParams.get("search") || "";

    const [searchTerm, setSearchTerm] = useState(initialSearch);
    const [category, setCategory] = useState(initialCategory);
    const [cuisine, setCuisine] = useState(initialCuisine);
    const [difficulty, setDifficulty] = useState("all");
    const [sortBy, setSortBy] = useState("title");

    // Data transformation: filter first, then sort the result.
    const filtered = filterRecipes(recipes, {
        searchTerm,
        category,
        cuisine,
        difficulty,
    });

    const visibleRecipes = sortRecipes(filtered, sortBy);

    const handleClearFilters = () => {
        setSearchTerm("");
        setCategory("all");
        setCuisine("all");
        setDifficulty("all");
    };

    return (
        <div className={styles.page}>
            <h1>Browse Recipes</h1>

            <SearchBar
                searchTerm={searchTerm}
                onSearch={setSearchTerm}
                placeholder="Search by recipe name..."
            />

            <RecipeFilter
                category={category}
                cuisine={cuisine}
                difficulty={difficulty}
                onCategoryChange={setCategory}
                onCuisineChange={setCuisine}
                onDifficultyChange={setDifficulty}
                onClear={handleClearFilters}
            />

            <div className={styles.sortRow}>
                <label htmlFor="sortBy">Sort by:</label>

                <select
                    id="sortBy"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                >
                    <option value="title">Title</option>
                    <option value="time">Cook Time</option>
                    <option value="difficulty">Difficulty</option>
                </select>
            </div>

            {isLoading ? (
                <Loading message="Loading recipes..." />
            ) : (
                <RecipeList
                    recipes={visibleRecipes}
                    favorites={favorites}
                    onFavoriteToggle={onFavoriteToggle}
                />
            )}
        </div>
    );
};

RecipesPage.propTypes = {
    recipes: PropTypes.array.isRequired,
    favorites: PropTypes.array.isRequired,
    isLoading: PropTypes.bool.isRequired,
    onFavoriteToggle: PropTypes.func.isRequired,
};

export default RecipesPage;