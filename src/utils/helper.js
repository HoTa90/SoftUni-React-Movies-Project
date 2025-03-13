export const minutesTohours = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
  
    return `${hours}h ${mins}m`;
  };
  
  export const ratingToPercentage = (rating) => {
    return (rating * 10)?.toFixed(0);
  };