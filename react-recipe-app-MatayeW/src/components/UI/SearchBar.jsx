import { useState } from "react";
import PropTypes from "prop-types";
import styles from "./UI.module.css";
import Button from "./Button";

// Search bar component
const SearchBar = ({ placeholder = "Search recipes...", searchTerm = "", onSearch }) => {
    // Tracks focus so the input's border can be styled dynamically —
    // an inline style driven by state, not just a hard-coded value.
    const [isFocused, setIsFocused] = useState(false);

    // Live search: tell the parent about every keystroke so the
    // results update as the user types
    const handleChange = (e) => {
        onSearch(e.target.value);
    };

    // Pressing Enter / Search just stops the page from reloading,
    // because the results are already up to date
    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <form
            className={styles.searchBar}
            onSubmit={handleSubmit}
        >
            <input
                type="text"
                value={searchTerm}
                onChange={handleChange}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder={placeholder}
                aria-label="Search recipes"
                style={{
                    borderColor: isFocused ? "var(--color-primary)" : "var(--color-border)",
                    boxShadow: isFocused ? "0 0 0 2px var(--color-primary-light)" : "none",
                }}
            />

            <Button type="submit" variant="primary">
                Search
            </Button>
        </form>
    );
};

SearchBar.propTypes = {
    placeholder: PropTypes.string,
    searchTerm: PropTypes.string,
    onSearch: PropTypes.func.isRequired,
};

export default SearchBar;