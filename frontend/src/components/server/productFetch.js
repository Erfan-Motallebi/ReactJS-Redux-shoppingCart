module.exports = async function productFetch() {
  const fetchedData = await fetch("http://localhost:5005/api/products", {
    method: "GET",
  });
  const result = await fetchedData.json();
  return result;
};
