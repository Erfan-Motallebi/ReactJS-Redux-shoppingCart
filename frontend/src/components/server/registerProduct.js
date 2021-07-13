const registerFetch = (data) => {
  fetch("http://localhost:5005/api/products", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

module.exports = registerFetch;
