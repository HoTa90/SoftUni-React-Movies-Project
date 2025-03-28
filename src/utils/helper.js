export const minutesTohours = (minutes) => {

  if (minutes === 0) return 'N/A'
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

export const formattedDate = (date) => {
  if (date?.toDate) {
    date = date.toDate();
  }

  if (!(date instanceof Date) || isNaN(date)) {
    return "Invalid Date";
  }

  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const getGenreName = (id) => {
  const genres = [
    { id: 28, name: "Action" },
    { id: 12, name: "Adventure" },
    { id: 16, name: "Animation" },
    { id: 35, name: "Comedy" },
    { id: 80, name: "Crime" },
    { id: 99, name: "Documentary" },
    { id: 18, name: "Drama" },
    { id: 10751, name: "Family" },
    { id: 14, name: "Fantasy" },
    { id: 36, name: "History" },
    { id: 27, name: "Horror" },
    { id: 10402, name: "Music" },
    { id: 9648, name: "Mystery" },
    { id: 10749, name: "Romance" },
    { id: 878, name: "Science Fiction" },
    { id: 53, name: "Thriller" },
    { id: 10752, name: "War" },
    { id: 37, name: "Western" },
    { id: false, name: "Remove Filter" },
    { id: 10759, name: "Action & Adventure" },
    { id: 10762, name: "Kids" },
    { id: 10763, name: "News" },
    { id: 10764, name: "Reality" },
    { id: 10765, name: "Sci-Fi & Fantasy" },
    { id: 10766, name: "Soap" },
    { id: 10767, name: "Talk" },
    { id: 10768, name: "War & Politics" },
  ];

  const { name } = genres.find(genre => genre.id === id)
  return name
}

export const isValidType = (type) => {
  const validTypes = ['movie', 'tv', 'person']

  return validTypes.includes(type)
}

export const imagePath = "https://image.tmdb.org/t/p/w500";
export const imagePathOriginal = "https://image.tmdb.org/t/p/original";