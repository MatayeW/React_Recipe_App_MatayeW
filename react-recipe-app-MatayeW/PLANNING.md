# Recipe Discovery & Meal Planning – Planning Document

## Project Hierarchy

```text
App
├── Navbar
├── Routes
│   ├── Home
│   ├── RecipesPage
│   │   ├── SearchBar
│   │   ├── RecipeFilter
│   │   └── RecipeList
│   │       └── RecipeCard
│   ├── RecipeDetail
│   │   └── VideoPlayer
│   ├── MealPlannerPage
│   │   └── MealPlanner
│   │       └── DayCard
│   ├── FavoritesPage
│   │   └── RecipeList
│   └── NotFound
└── Footer
```

Reusable components such as `Button`, `Card`, `Loading`, `Modal`, `Header`, and `AudioPlayer` support multiple pages and features. `AudioPlayer` and `Header` are used on the Home page.

## Data Flow

Recipe data is stored in `recipesData.jsx` and loaded into `App.jsx`. `App` provides recipe data to pages and components through props. `RecipesPage` transforms the data by filtering and sorting it before passing the visible recipes to `RecipeList`.

User actions such as favouriting recipes and adding meals update state in `App.jsx`. Callback functions are passed to child components so changes can flow back to the parent. Components then receive the updated state and re-render.

## Props Flow

`App` passes recipes, favourites, loading state, and event handlers to page components. `RecipesPage` passes filtered recipes and favourite information to `RecipeList`, which passes individual recipe data to `RecipeCard`.

The meal-planning state flows from `App` to `MealPlannerPage`, then to `MealPlanner` and individual `DayCard` components. Child components use callback props to communicate changes back to `App`.

## State Strategy

React `useState` manages interactive UI state, including favourites, the weekly meal plan, search terms, filters, sorting, mobile navigation, and meal selections.

Shared state is lifted to `App.jsx` when multiple components need access to the same data. Local state remains inside components when it only affects that component.

`useEffect` handles initial recipe loading and synchronises favourites and the meal plan with browser `localStorage`, allowing user data to persist between sessions.

## Routing Strategy

React Router provides separate routes for the Home page, recipe browsing, individual recipe details, the meal planner, and favourites. Dynamic route parameters are used for individual recipes, while a wildcard route provides a custom 404 page.

## Data Flow Diagram

```text
                      recipesData.jsx
                            |
                            v
        +-----------------------------------------+
        |  App.jsx  (owns shared state)           |
        |  recipes | favorites | mealPlan         |
        +-----------------------------------------+
          |  props down: data + handler functions
          |
   +------+--------------+------------------+-----------------+
   v                     v                  v                 v
RecipesPage          RecipeDetail      MealPlannerPage    FavoritesPage
(search, filters,    (useParams,       |                  |
 sort = local state) |  VideoPlayer,    v                  v
   |                 |  AudioPlayer)  MealPlanner        RecipeList
   v                 |                  |                  |
RecipeList           |                  v                  v
   |                 |                DayCard (x7)      RecipeCard
   v                 |                  |
RecipeCard           |                  |
   |                 |                  |
   +-----------------+------------------+
          |  callbacks up: onFavoriteToggle, onAddMeal, onRemoveMeal, onClearWeek
          v
   App.jsx updates state  ->  useEffect saves it to localStorage  ->  pages re-render
```

**Sibling communication:** `RecipesPage` and `FavoritesPage` never talk to each other directly. Both read `favorites` from `App`, so a heart clicked on one page shows on the other.