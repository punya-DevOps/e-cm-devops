/*
 * DevOps Store
 *
 * Frontend communicates with
 * Python Flask backend through REST API.
 */

const API_URL = "/api/products";


/*
 * Load products from Flask API
 */

async function loadProducts() {

    const productsContainer =
        document.getElementById("products");

    const loading =
        document.getElementById("loading");

    const errorMessage =
        document.getElementById("error-message");


    try {

        loading.style.display = "block";

        errorMessage.innerHTML = "";


        /*
         * Send GET request to Flask
         */

        const response = await fetch(API_URL);


        /*
         * Check HTTP response
         */

        if (!response.ok) {

            throw new Error(
                `HTTP error: ${response.status}`
            );

        }


        /*
         * Convert response to JSON
         */

        const products =
            await response.json();


        /*
         * Remove loading message
         */

        loading.style.display = "none";


        /*
         * Clear existing products
         */

        productsContainer.innerHTML = "";


        /*
         * Display each product
         */

        products.forEach(product => {

            const productCard =
                document.createElement("div");


            productCard.className =
                "product-card";


            /*
             * Select an icon based
             * on product name
             */

            let icon = "🛍️";


            if (
                product.name
                    .toLowerCase()
                    .includes("laptop")
            ) {

                icon = "💻";

            } else if (
                product.name
                    .toLowerCase()
                    .includes("keyboard")
            ) {

                icon = "⌨️";

            } else if (
                product.name
                    .toLowerCase()
                    .includes("mouse")
            ) {

                icon = "🖱️";

            } else if (
                product.name
                    .toLowerCase()
                    .includes("monitor")
            ) {

                icon = "🖥️";

            }


            /*
             * Create product HTML
             */

            productCard.innerHTML = `

                <div class="product-icon">
                    ${icon}
                </div>

                <h3>
                    ${product.name}
                </h3>

                <p class="product-description">
                    ${product.description}
                </p>

                <div class="product-bottom">

                    <span class="product-price">
                        ₹${Number(product.price).toLocaleString("en-IN")}
                    </span>

                    <button
                        class="buy-button"
                        onclick="buyProduct('${product.name}')"
                    >
                        Buy
                    </button>

                </div>

            `;


            /*
             * Add product card
             */

            productsContainer.appendChild(
                productCard
            );

        });

    }

    catch (error) {

        console.error(
            "Error loading products:",
            error
        );


        loading.style.display = "none";


        errorMessage.innerHTML =
            "Unable to connect to the backend. " +
            "Please make sure Flask is running.";

    }

}


/*
 * Buy button
 */

function buyProduct(productName) {

    alert(
        `You selected ${productName}. ` +
        `Shopping functionality will be added later.`
    );

}


/*
 * Load products when page loads
 */

document.addEventListener(
    "DOMContentLoaded",
    loadProducts
);
