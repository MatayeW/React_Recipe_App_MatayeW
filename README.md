# Smart Recipe and Meal Planning Application

A modern, responsive React web application for recipe discovery, nutritional planning, weekly meal scheduling, and bookmarking favorite culinary ideas.

---

## Application Screenshots

### 1. Home Page

![Home Page](./react-recipe-app-MatayeW/screenshots/home.png)

### 2. Search and Multi-Faceted Filters

![Recipes Search & Filters](./react-recipe-app-MatayeW/screenshots/recipe-filters.png)

### 3. Dynamic Recipe Detail and Video Player

![Recipe Detail with Video](./react-recipe-app-MatayeW/screenshots/recipe-details.png)

### 4. Weekly Meal Planner

![Weekly Meal Planner](./react-recipe-app-MatayeW/screenshots/meal-planner.png)

### 5. Bookmarked Favorites

![Saved Favorites](./react-recipe-app-MatayeW/screenshots/favorites.png)

### 6. Responsive Mobile View

![Mobile View](./react-recipe-app-MatayeW/screenshots/mobile.jpg)

---

## Key Features

1. **Centralized Recipe Catalog (`recipesData.jsx`)**:
   - 17 complete recipes with prep and cook times, servings, difficulty ratings, categories, cuisines, ingredient lists, and step-by-step instructions.

2. **Live Search and Multi-Faceted Filters**:
   - Real-time search across recipe titles and ingredients.
   - Category, cuisine, and difficulty filters.
   - Sorting options for easier recipe discovery.
   - Dynamic empty states with options to reset filters.

3. **Dynamic Recipe Detail Routing (`/recipes/:id`)**:
   - Dynamic recipe lookup using React Router route parameters.
   - Custom recipe detail pages with ingredients and cooking instructions.
   - HTML5 video tutorials and audio cooking tips.
   - Interactive Add to Meal Planner functionality.
   - Favorite recipe toggling.

4. **Weekly Meal Planner (`/meal-planner`)**:
   - Seven-day weekly calendar with breakfast, lunch, and dinner slots.
   - Add recipes directly to individual meal slots.
   - Remove scheduled meals.
   - Clear the entire week's meal plan.
   - Meal plan persistence using browser `localStorage`.

5. **Favorites System (`/favorites`)**:
   - Save and remove favorite recipes.
   - Favorites are stored using `localStorage`.
   - Real-time favorites counter in the navigation bar.
   - Dedicated favorites page with an empty-state message.

6. **Cooking Tutorial Media**:
   - HTML5 video players for recipe tutorials.
   - Audio players for cooking tips.
   - Native media controls and playback support.
   - Media files are stored in the application's public assets directory.

---

## Component Architecture

```text
react-recipe-app-MatayeW/src/
├── components/
│   ├── common/ (Footer.jsx, Header.jsx)
│   ├── MealPlanner/ (DayCard.jsx, MealPlanner.jsx)
│   ├── Media/ (AudioPlayer.jsx, VideoPlayer.jsx)
│   ├── Navigation/ (Navbar.jsx)
│   ├── Recipe/ (RecipeCard.jsx, RecipeDetail.jsx, RecipeFilter.jsx, RecipeList.jsx)
│   └── UI/ (Button.jsx, Card.jsx, Loading.jsx, Modal.jsx, SearchBar.jsx)
├── data/ (recipesData.jsx)
├── pages/ (FavoritesPage.jsx, Home.jsx, MealPlannerPage.jsx, NotFound.jsx, RecipesPage.jsx)
├── utils/ (helpers.js)
├── App.jsx
├── App.module.css
├── index.css
└── main.jsx
```

---

## How to View

```bash
# 1. Navigate into the app directory
cd react-recipe-app-MatayeW

# 2. Install dependencies
npm install

# 3. Run local development server
npm run dev

# 4. Validate lint and production build
npm run lint
npm run build
```

For the full documentation, see [`react-recipe-app-MatayeW/README.md`](./react-recipe-app-MatayeW/README.md) and the planning document, [`PLANNING.md`](./react-recipe-app-MatayeW/PLANNING.md).