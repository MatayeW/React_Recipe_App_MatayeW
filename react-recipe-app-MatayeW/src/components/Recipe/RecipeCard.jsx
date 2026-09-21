import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Card from "../UI/Card";
import { formatCookTime, getTotalTime, getDifficultyEmoji, getDifficultyColor } from "../../utils/helpers";
import styles from "./Recipe.module.css";

// RecipeCard: displays a single recipe's summary. Used inside
// RecipeList (rendered many times via map) and reused again inside
// FavoritesPage — this is one of the 5+ components used in multiple places.
const RecipeCard = ({ recipe, isFavorite = false, onFavoriteToggle }) => {
    // The whole card is wrapped in a Link, so clicking the favorite
    // star needs to stop that click from also triggering navigation.
    const handleFavoriteClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        onFavoriteToggle(recipe.id);
    };

    return (
        <Link to={`/recipes/${recipe.id}`} className={styles.cardLink}>
            <Card hoverable>
                <div className={styles.imageWrapper}>
                    <img src={recipe.image} alt={recipe.title} className={styles.recipeImage} />

                    <button
                        className={styles.favoriteStar}
                        onClick={handleFavoriteClick}
                        aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
                    >
                        {/* Ternary operator: filled vs outline star based on favorite state */}
                        {isFavorite ? "★" : "☆"}
                    </button>
                </div>

                <div className={styles.recipeInfo}>
                    <h3>{recipe.title}</h3>

                    <div className={styles.badgeRow}>
                        <span className={`${styles.badge} ${styles.badgeCuisine}`}>{recipe.cuisine}</span>
                        <span
                            className={`${styles.badge} ${styles.badgeDifficulty}`}
                            style={{ backgroundColor: getDifficultyColor(recipe.difficulty) }}
                        >
                            {getDifficultyEmoji(recipe.difficulty)} {recipe.difficulty}
                        </span>
                    </div>

                    {/* Expression as a prop / embedded expression: total time is
              calculated on the fly, not stored directly on the recipe */}
                    <p className={styles.recipeMeta}>⏱ {formatCookTime(getTotalTime(recipe))}</p>

                    <p className={styles.recipeMeta}>Servings: {recipe.servings || 4}</p>
                </div>
            </Card>
        </Link>
    );
};

RecipeCard.propTypes = {
    recipe: PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        category: PropTypes.string,
        cuisine: PropTypes.string,
        difficulty: PropTypes.string,
        prepTime: PropTypes.number,
        cookTime: PropTypes.number,
        servings: PropTypes.number,
        image: PropTypes.string,
    }).isRequired,
    isFavorite: PropTypes.bool,
    onFavoriteToggle: PropTypes.func.isRequired,
};

export default RecipeCard;