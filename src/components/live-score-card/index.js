import PropTypes from "prop-types"; 

const LiveScoreCard = ({ match }) => {
    if (!match) return <div>Match data unavailable.</div>;

    const { title, subtitle, score, status, date } = match;

    return (
        <div className="sports-card neon-glow">
        <div className="card-border-glow"></div>
    
        <div className="sports-card-content">
            <h4 className="sports-card-title">{title || "Match Title"}</h4>
            <p className="sports-card-subtitle">{subtitle || "League Name"}</p>
            <p className="sports-card-score">{score || "0 - 0"}</p>
            <p className="sports-card-status">Status: {status || "N/A"}</p>
            <p className="sports-card-date">Date: {date || "Unknown"}</p>
        </div>
    </div>
    
    );
};

LiveScoreCard.propTypes = {
    match: PropTypes.shape({
        title: PropTypes.string,
        subtitle: PropTypes.string,
        score: PropTypes.string,
        status: PropTypes.string,
        date: PropTypes.string,
    }).isRequired,
};

export default LiveScoreCard;
