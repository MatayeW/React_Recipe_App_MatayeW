import PropTypes from "prop-types";
import styles from "./UI.module.css";

// Reusable card component
const Card = ({ children, hoverable = false }) => {
    return (
        <div className={`${styles.card} ${hoverable ? styles.cardHoverable : ""}`}>
            {children}
        </div>
    );
};

Card.propTypes = {
    children: PropTypes.node.isRequired,
    hoverable: PropTypes.bool,
};

export default Card;