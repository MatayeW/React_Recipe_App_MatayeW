// Adds prepTime + cookTime together, falls back to 0 if a recipe is missing either field so callers never get NaN
export const getTotalTime = (recipe) => {
    const prep = recipe.prepTime || 0;
    const cook = recipe.cookTime || 0;
    return prep + cook;
};

// Formats a number of minutes into a readable string
export const formatCookTime = (minutes) => {
    if (!minutes || minutes <= 0) return "0 min";

    const hours = Math.floor(minutes/60);
    const remainingMinutes = minutes % 60;

    if (hours === 0) return `${remainingMinutes} min`;
    if (remainingMinutes === 0) return `${hours} hr`;
    return `${hours} hr ${remainingMinutes} min`;
};

// Maps a difficulty string to a hex color, used as an inline style on
// the difficulty badge so its background reflects the data directly.
export const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
        case "easy":
            return "#dcefdc";
        case "medium":
            return "#fdf1cf";
        case "hard":
            return "#f7dada";
        default:
            return "var(--color-secondary)";
    }
};

// Assigning emoji (visual indicator) to difficulty level
export const getDifficultyEmoji = (difficulty) => {
    switch (difficulty) {
        case "easy":
            return "🟢";
        case "medium":
            return "🟡";
        case "hard":
            return "🔴";
        default:
            return "⚪";
    }
};

// Filters an array of recipes against a search term and optional category/cuisine/difficulty values
export const filterRecipes = (
    recipes,
    { searchTerm = "", category = "all", cuisine = "all", difficulty = "all" } =
    {}
) => {
    const term = searchTerm.trim().toLowerCase();

    return recipes.filter((recipe) => {
        const matchesSearch = term === "" || recipe.title.toLowerCase().includes(term);
        const matchesCategory = category === "all" || recipe.category === category;
        const matchesCuisine = cuisine === "all" || recipe.cuisine === cuisine;
        const matchesDifficulty = difficulty === "all" || recipe.difficulty === difficulty;

        return matchesSearch && matchesCategory && matchesCuisine && matchesDifficulty;
    });
};

// Sorts a copy of the recipes array by title, total cook time or difficulty
export const sortRecipes = (recipes, sortBy = "title") => {
    const difficultyOrder = { easy: 0, medium: 1, hard: 2 };
    const sorted = [...recipes];

    switch (sortBy) {
        case "title":
            return sorted.sort((a, b) => a.title.localeCompare(b.title));
        case "time":
            return sorted.sort((a, b) => getTotalTime(a) - getTotalTime(b));
        case "difficulty":
            return sorted.sort((a, b) => difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty]);
        default:
            return sorted;
    }
};