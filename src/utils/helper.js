export const minutesTohours = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
  
    return `${hours}h ${mins}m`;
  };
  
  export const ratingToPercentage = (rating) => {
    return (rating * 10)?.toFixed(0);
  };

  export const resolveRatingColor = (rating) => {
    if (rating >= 7) {
      return "#22c55e"; 
    } else if (rating >= 5) {
      return "#f97316"; 
    } else {
      return "#ef4444"; 
    }
  };