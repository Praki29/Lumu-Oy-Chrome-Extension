# H&M Price Fetcher Chrome Extension

## Overview

The **H&M Price Fetcher** is a Chrome extension designed to extract product details from H&M product pages. It fetches the product name, price, and image, and displays them in a user-friendly popup interface. Additionally, the extension connects to a RapidAPI product search API to provide related product suggestions.

## Features

- Extracts product information (name, price, image) from H&M product pages.
- Displays the extracted information in a popup interface.
- Fetches related product suggestions from an external API.
- Clickable product cards that redirect users to the product page for purchase.
- Dark mode toggle for enhanced user experience.

## Technologies Used

- HTML
- CSS
- JavaScript
- Chrome Extension APIs
- RapidAPI for product search
- Custom Backend API hosted on DigitalOcean

## Installation

### Prerequisites

- Google Chrome browser installed.

### Steps to Install

1. Clone or download this repository to your local machine.
2. Open Google Chrome and navigate to `chrome://extensions/`.
3. Enable "Developer mode" in the top right corner.
4. Click on "Load unpacked" and select the folder where you downloaded the project.
5. The **H&M Price Fetcher** extension should now be visible in your extensions list.

## Usage

1. Navigate to a product page on the H&M website (e.g., [H&M](https://www2.hm.com)).
2. Click the **H&M Price Fetcher** extension icon in the Chrome toolbar.
3. The popup will display the product name, price, and image.
4. Below the product details, you will see related product cards. Click on any card to navigate to the respective product page.

## API Usage

- **Product Search API**: The extension uses the RapidAPI product search API to fetch related product suggestions based on the extracted product name.
- **Custom Backend API**: A custom backend API hosted on a DigitalOcean Droplet provides a JSON file with additional product information. This API enhances the functionality of the extension by delivering relevant product data and suggestions.

## Contribution

Contributions are welcome! If you have suggestions for improvements or additional features, please create an issue or submit a pull request.

## License

This project is licensed under the MIT License.

## Contact

For any inquiries or feedback, please reach out to [Gmail](mailto:pragatheeshmanipc@gmail.com) , [LinkedIn](https://linkedin.com/in/PragatheeshM)

---

Thank you for using **H&M Price Fetcher**! Enjoy your shopping experience!
