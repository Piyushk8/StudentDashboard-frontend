export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

export const getRatingChangeColor = (oldRating: number, newRating: number) => {
  const change = newRating - oldRating;
  if (change > 0) return "text-green-600";
  if (change < 0) return "text-red-600";
  return "text-gray-600";
};

export const getRatingChangeIcon = (oldRating: number, newRating: number) => {
  const change = newRating - oldRating;
  if (change > 0) return "↗️";
  if (change < 0) return "↘️";
  return "➡️";
};

export const getHeatmapIntensity = (count: number, maxCount: number) => {
  if (count === 0) return "bg-gray-100 border border-gray-200";
  const intensity = Math.ceil((count / maxCount) * 4);
  const colors = [
    "bg-green-100 border border-green-200",
    "bg-green-200 border border-green-300",
    "bg-green-400 border border-green-500",
    "bg-green-600 border border-green-700",
  ];
  return colors[intensity - 1] || colors[3];
};


export const apiUrl = import.meta.env.VITE_SERVER;