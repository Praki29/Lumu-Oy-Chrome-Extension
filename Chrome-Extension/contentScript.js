const targetNode = document.body;

// Create a MutationObserver to monitor changes in the DOM
const observer = new MutationObserver((mutationsList) => {
  for (const mutation of mutationsList) {
    if (mutation.type === "childList") {
      // Attempt to find the product name and price whenever the DOM changes
      updateProductDetails();
    }
  }
});

// Function to check for the product name and price and update
function updateProductDetails() {
  const priceElement = document.querySelector("hm-product-price .edbe20");
  const nameElement = document.querySelector("hm-product-name h1"); // Adjust the selector as needed
  const imageElement = document.querySelector(
    ".product-detail-main-image-container img"
  ); // Selecting the image

  if (nameElement && priceElement) {
    // Extract the product name and price
    const productName = nameElement.textContent.trim();
    const productPrice = priceElement.textContent.trim();
    console.log("Product name found:", productName);
    console.log("Product price found:", productPrice);

    const productImageSrc = imageElement ? imageElement.src : ""; // Get the src from the img tag

    // Send the product name, price, and image to the popup
    chrome.runtime.sendMessage({
      name: productName,
      price: productPrice,
      image: productImageSrc,
    });

    // Store in session storage
    sessionStorage.setItem("productName", productName);
    sessionStorage.setItem("productPrice", productPrice);
    sessionStorage.setItem(
      "productImage",
      imageElement ? imageElement.src : ""
    );
  } else {
    console.log("Product name or price element not found yet.");
  }
}

// Start observing the target node for configured mutations
observer.observe(targetNode, { childList: true, subtree: true });

// Additionally, check for the product details on initial load
updateProductDetails(); // Call initially to get the product details on load

// Optionally, set an interval to keep checking every few seconds
setInterval(updateProductDetails, 2000); // Check every 2 seconds
