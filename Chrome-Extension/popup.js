document.addEventListener("DOMContentLoaded", function () {
  const productPrice = sessionStorage.getItem("productPrice");
  const productName = sessionStorage.getItem("productName");
  const productImage = sessionStorage.getItem("productImage");
  console.log("PRAKI LISTEN THE PRODUCT NAME is ", productName);
  // Assuming you're fetching the data from the API
  const apiUrl = "http://143.110.245.166:5000/sweater.json";

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      const products = data.data.products;
      const cardContainer = document.getElementById("cardContainer");

      // Staticly reference the first 5 products
      for (let i = 0; i < 5; i++) {
        const product = products[i];
        const card = document.createElement("div");
        card.className = "card";

        // Create the card content
        card.innerHTML = `
                      <img src="${product.product_photos[0]}" alt="${product.product_title}">
                      <h3>${product.product_title}</h3>
                      <p>${product.typical_price_range[0]}</p>
                  `;

        // Set the card to navigate to the product page on click
        card.onclick = function () {
          window.open(product.product_page_url, "_blank");
        };

        // Append the card to the card container
        cardContainer.appendChild(card);
      }
    })
    .catch((error) => console.error("Error fetching data:", error));

  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.scripting.executeScript(
      {
        target: { tabId: tabs[0].id },
        function: fetchProductName,
      },
      () => {
        if (productName) {
          fetchProductData(productName); // Fetch data from the API using product name
        } else {
          console.log("Product name not found");
        }
      }
    );
  });

  // Function to load the product cards
  function loadProductCards(products) {
    const cardContainer = document.getElementById("cardContainer");
    cardContainer.innerHTML = ""; // Clear previous cards

    products.forEach((product) => {
      const card = document.createElement("div");
      card.className = "product-card";

      card.innerHTML = `
              <div class="card">
                  <img src="${product.imageUrl}" alt="${product.name}" />
                  <h3>${product.name}</h3>
                  <p>Price: $${product.price}</p>
              </div>
          `;

      cardContainer.appendChild(card); // Append card to the container
    });
  }

  function fetchProductName() {
    const productNameElement = document.querySelector("h1.product-title"); // Replace this with the correct selector for the product name
    return productNameElement ? productNameElement.textContent.trim() : null;
  }

  // Set dark mode to be true by default
  const darkMode = sessionStorage.getItem("darkMode") === "true" || true; // Default to true for dark mode

  const priceElement = document.getElementById("product-price");
  priceElement.textContent = productPrice
    ? `Product Price: ${productPrice}`
    : "Loading...";

  const imgElement = document.getElementById("product-image");
  if (productImage) {
    imgElement.src = productImage;
  } else {
    imgElement.alt = "No product image found.";
  }

  // Set the product name element
  const nameElement = document.getElementById("product-name"); // Ensure you have this element in your HTML
  nameElement.textContent = productName
    ? `Product Name: ${productName}`
    : "Loading...";

  // Set dark mode if applicable
  if (darkMode) {
    document.body.classList.add("dark-mode");
    document.querySelector("#switch-btn input").checked = true; // Check the switch
  } else {
    document.body.classList.add("light-mode"); // Ensure light mode is applied
  }

  function fetchProductData(productName) {
    chrome.runtime.sendMessage(
      { action: "fetchProductData", productName },
      (response) => {
        if (response.data) {
          loadProductCards(response.data.products); // Adjust this based on the actual data structure
        } else if (response.error) {
          console.error("Error from background script:", response.error);
        }
      }
    );
  }

  // Toggle dark mode on button click
  document
    .querySelector("#switch-btn input")
    .addEventListener("change", function () {
      const isDarkMode = this.checked;
      sessionStorage.setItem("darkMode", isDarkMode);
      updateAppearance(isDarkMode);
    });

  // Function to update the appearance based on the mode
  function updateAppearance(isDarkMode) {
    document.body.classList.toggle("dark-mode", isDarkMode);
    document.body.classList.toggle("light-mode", !isDarkMode); // Toggle light mode
  }

  // Listen for messages from the content script to update the price and image in real-time
  chrome.runtime.onMessage.addListener(function (message) {
    console.log("Message received in popup:", message);
    if (message.price) {
      priceElement.textContent = `Product Price: ${message.price}`;
      sessionStorage.setItem("productPrice", message.price); // Store in session storage
    }
    if (message.name) {
      nameElement.textContent = `Product Name: ${message.name}`;
      sessionStorage.setItem("productName", message.name); // Store in session storage
    }
    if (message.image) {
      imgElement.src = message.image;
      sessionStorage.setItem("productImage", message.image); // Store in session storage
    }
  });
});
