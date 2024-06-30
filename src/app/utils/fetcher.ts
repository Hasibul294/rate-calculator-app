export const fetcher = async (start: string, end: string) => {
  const response = await fetch(
    `https://api.bytebeds.com/api/v1/property/1/room/rate-calendar/assessment?start_date=${start}&end_date=${end}`
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};
