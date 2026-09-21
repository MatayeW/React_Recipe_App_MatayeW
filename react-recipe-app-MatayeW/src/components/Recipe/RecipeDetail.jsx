import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import Button from "../UI/Button";
import Modal from "../UI/Modal";
import VideoPlayer from "../Media/VideoPlayer";
import { formatCookTime, getTotalTime, getDifficultyEmoji } from "../../utils/helpers";
import styles from "./Recipe.module.css";

const DAYS = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
const MEAL_TYPES = ["breakfast", "lunch", "dinner"];

// function to read the id from the url and look up matching recipe
const RecipeDetail = ({ recipes, favorites, onFavoriteToggle, onAddMeal }) => {
    const { id } = useParams();
    const navigate = useNavigate();

    // Complex state: tracks whether the "add to meal plan" modal is open,
    // plus which day/meal slot is currently selected in it.
    const [isPlanModalOpen, setIsPlanModalOpen] = useState(false);
    const [selectedDay, setSelectedDay] = useState(DAYS[0]);
    const [selectedMealType, setSelectedMealType] = useState(MEAL_TYPES[0]);

    // Route params to always arrive as strings
    const recipe = recipes.find((r) => r.id === parseInt(id, 10));

    // Error/not-found state to show "not found" message instead of recipe details
    if(!recipe) {
        return (
            <div className={styles.notFound}>
                <h2>Recipe not found</h2>
                <p>We could not find a recipe with that ID.</p>
                <Button onClick={() => navigate("/recipes")}>Back to Recipes</Button>
            </div>
        );
    }

    const isFavorite = favorites.some((r) => r.id === recipe.id);

    const handleConfirmAddMeal = () => {
        onAddMeal(selectedDay, selectedMealType, recipe);
        setIsPlanModalOpen(false);
    };

    return (
        <div className={styles.recipeDetail}>
            <Button variant="secondary" onClick={() => navigate("/recipes")}>
                ← Back to Recipes
            </Button>

            <h1>{recipe.title}</h1>

            <p className={styles.recipeMeta}>
                {recipe.cuisine} ● {getDifficultyEmoji(recipe.difficulty)} {recipe.difficulty} ●{""}
                {formatCookTime(getTotalTime(recipe))} ● Serves {recipe.servings || 4}
            </p>

            <div className={styles.detailActions}>
                <button
                    className={styles.detailFavoriteBtn}
                    onClick={() => onFavoriteToggle(recipe.id)}
                    aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
                >
                    {isFavorite ? "★ Favorited" : "☆ Add to Favorites"}
                </button>

                <Button onClick={() => setIsPlanModalOpen(true)}>
                    + Add to Meal Planner
                </Button>
            </div>

            <img src={recipe.image} alt={recipe.title} className={styles.detailImage} />

            <VideoPlayer videoUrl={recipe.videoUrl} title={`${recipe.title} - Tutorial`} />

            <Modal isOpen={isPlanModalOpen} onClose={() => setIsPlanModalOpen(false)}>
                <h2>Add &quot;{recipe.title}&quot; to your meal plan</h2>
                <div className={styles.planForm}>
                    <div className={styles.planRow}>
                        <label htmlFor="plan-day">Day</label>
                        <select
                            id="plan-day"
                            value={selectedDay}
                            onChange={(e) => setSelectedDay(e.target.value)}
                        >
                            {DAYS.map((day) => (
                                <option key={day} value={day}>
                                    {day.charAt(0).toUpperCase() + day.slice(1)}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className={styles.planRow}>
                        <label htmlFor="plan-meal-type">Meal</label>
                        <select
                            id="plan-meal-type"
                            value={selectedMealType}
                            onChange={(e) => setSelectedMealType(e.target.value)}
                        >
                            {MEAL_TYPES.map((mealType) => (
                                <option key={mealType} value={mealType}>
                                    {mealType.charAt(0).toUpperCase() + mealType.slice(1)}
                                </option>
                            ))}
                        </select>
                    </div>

                    <Button onClick={handleConfirmAddMeal}>Add to Plan</Button>
                </div>
            </Modal>

            <div className={styles.detailColumns}>
                <div>
                    <h2>Ingredients</h2>
                    <ul>
                        {recipe.ingredients.map((ingredient, index) =>(
                            <li key={index}>{ingredient}</li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h2>Instructions</h2>
                    <ol>
                        {recipe.instructions.map((step, index) => (
                            <li key={index}>{step}</li>
                        ))}
                    </ol>
                </div>
            </div>
        </div>
    );
};

RecipeDetail.propTypes = {
    recipes: PropTypes.array.isRequired,
    favorites: PropTypes.array.isRequired,
    onFavoriteToggle: PropTypes.func.isRequired,
    onAddMeal: PropTypes.func.isRequired,
};

export default RecipeDetail;