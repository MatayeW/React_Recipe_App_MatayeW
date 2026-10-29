import { Link } from "react-router-dom";
import Button from "../components/UI/Button";
import AudioPlayer from "../components/Media/AudioPlayer";
import Header from "../components/common/Header";
import styles from "./Pages.module.css";

// The landing page

const Home = () => {
    return (
        <div className={styles.page}>
            <Header
                title="Welcome to Platr"
                description="Discover recipes, plan your meals, and make cooking easier."
            />

            <main className={styles.homeContent}>
                <section className={styles.hero}>
                    <div className={styles.heroText}>
                        <span className={styles.eyebrow}>
                            YOUR PERSONAL RECIPE COMPANION
                        </span>

                        <h1>
                            Cook something
                            <span> delicious.</span>
                        </h1>

                        <p>
                            Discover recipes you'll love, plan your meals for
                            the week, and keep your favorite dishes all in one
                            place.
                        </p>

                        <div className={styles.heroActions}>
                            <Link to="/recipes">
                                <Button variant="primary">
                                    Explore Recipes
                                </Button>
                            </Link>

                            <Link
                                to="/meal-planner"
                                className={styles.secondaryAction}
                            >
                                Plan My Week
                            </Link>
                        </div>
                    </div>

                    <div className={styles.heroImage}>
                        <img
                            src="/assets/images/platr-hero.jpg"
                            alt="Delicious food prepared for a meal"
                        />

                        <div className={styles.floatingCard}>
                            <span className={styles.floatingIcon}>♡</span>

                            <div>
                                <strong>Made with love</strong>
                                <small>Good food, good mood.</small>
                            </div>
                        </div>
                    </div>
                </section>

                <section className={styles.categoriesSection}>
                    <div className={styles.sectionHeading}>
                        <div>
                            <span className={styles.sectionEyebrow}>
                                FIND YOUR NEXT MEAL
                            </span>

                            <h2>What are you craving?</h2>
                        </div>

                        <Link
                            to="/recipes"
                            className={styles.viewAll}
                        >
                            View all →
                        </Link>
                    </div>

                    <div className={styles.categoryGrid}>
                        <Link
                            to="/recipes?category=breakfast"
                            className={styles.categoryCard}
                        >
                            <span className={styles.categoryIcon}>🍳</span>
                            <span>Breakfast</span>
                        </Link>

                        <Link
                            to="/recipes?category=lunch"
                            className={styles.categoryCard}
                        >
                            <span className={styles.categoryIcon}>🥗</span>
                            <span>Lunch</span>
                        </Link>

                        <Link
                            to="/recipes?cuisine=Italian"
                            className={styles.categoryCard}
                        >
                            <span className={styles.categoryIcon}>🍝</span>
                            <span>Italian</span>
                        </Link>

                        <Link
                            to="/recipes?category=dessert"
                            className={styles.categoryCard}
                        >
                            <span className={styles.categoryIcon}>🍰</span>
                            <span>Desserts</span>
                        </Link>
                    </div>
                </section>

                <section className={styles.quickAccess}>
                    <div className={styles.quickCard}>
                        <div>
                            <span className={styles.cardIcon}>♡</span>

                            <h3>Your Favorites</h3>

                            <p>
                                Keep all the recipes you love in one place.
                            </p>
                        </div>

                        <Link
                            to="/favorites"
                            className={styles.cardLink}
                        >
                            View favorites →
                        </Link>
                    </div>

                    <div className={styles.quickCard}>
                        <div>
                            <span className={styles.cardIcon}>✓</span>

                            <h3>Plan Your Week</h3>

                            <p>
                                Organize your meals and take the stress out of
                                deciding what to cook.
                            </p>
                        </div>

                        <Link
                            to="/meal-planner"
                            className={styles.cardLink}
                        >
                            Open planner →
                        </Link>
                    </div>
                </section>

                <section className={styles.audioSection}>
                    <div>
                        <span className={styles.sectionEyebrow}>
                            A LITTLE SOMETHING EXTRA
                        </span>

                        <h2>Today's cooking tip</h2>
                    </div>

                    <AudioPlayer
                        audioUrl="/assets/audio/daily-cooking-tips.mp3"
                        title="Today's Cooking Tip"
                    />
                </section>
            </main>
        </div>
    );
};

export default Home;