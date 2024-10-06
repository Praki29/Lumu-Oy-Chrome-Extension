// background.js

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "fetchProductData") {
    const productName = request.productName;
    const apiUrl = `https://real-time-product-search.p.rapidapi.com/search-v2?q=${encodeURIComponent(
      productName
    )}&country=in&language=en&page=1&limit=10&sort_by=BEST_MATCH&product_condition=ANY`;

    fetch(apiUrl, {
      method: "GET",
      headers: {
        "X-Rapidapi-Key": "76a714c540msh115b81d26756a3fp18747bjsn4dd4289ddf2c",
        "X-Rapidapi-Host": "real-time-product-search.p.rapidapi.com",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        sendResponse({ data });
      })
      .catch((error) => {
        console.error("Error fetching product data:", error);
        sendResponse({ error: error.message });
      });

    // Indicate that you want to send a response asynchronously
    return true; // Will respond asynchronously
  }
});
