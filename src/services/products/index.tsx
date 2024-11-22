export const getData = async (url: string) => {
  const response = await fetch(url, {
  // const response = await fetch("http://localhost:3000/api/product", {
  //   // cache: "force-cache",
    cache: "no-store",
  //   next: {
  //     tags: ["products"]
  //     // revalidate: 30,
  //   },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  const data = response.json();
  return data;
}