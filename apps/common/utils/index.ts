export const fetchData = async (url: string) => {
  console.log("Loading in from the shared folder...");
  const response = await fetch(`${url}`);
  if (!response.ok) throw new Error("Network response was not ok");
  return response.json();
};
