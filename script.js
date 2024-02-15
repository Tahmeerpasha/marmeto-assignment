const tabs = document.querySelectorAll('[data-tab-target]');
const tabContents = document.querySelectorAll('[data-tab-content]');
tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const target = document.querySelector(tab.dataset.tabTarget);
        tabContents.forEach(tab => tab.classList.remove('active'));
        target.classList.add('active');
        tabs.forEach(tab => tab.classList.remove('active'));
        tab.classList.add('active');
    })
});

document.addEventListener('DOMContentLoaded', function () {
    // Fetch data from the API
    fetch('https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json')
        .then(response => response.json())
        .then(data => {
            // Populate product cards for each category
            data.categories.forEach(category => {
                const tabContent = document.querySelector(`#${category.category_name.toLowerCase()}`);
                category.category_products.forEach(product => {
                    const productCard = createProductCard(product);
                    tabContent.appendChild(productCard);
                });
            });

            // Show products for the active tab
            const activeTab = document.querySelector('.tab.active');
            showProducts(activeTab.dataset.tabTarget);

            // Add click event listeners to tabs
            document.querySelectorAll('.tab').forEach(tab => {
                tab.addEventListener('click', () => {
                    const target = tab.dataset.tabTarget;
                    showProducts(target);
                    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
                    tab.classList.add('active');
                });
            });
        })
        .catch(error => console.error('Error fetching data:', error));

    // Function to create a product card
    function createProductCard(product) {
        const card = document.createElement('div');
        card.classList.add('product-card');

        const imageWithBadge = document.createElement('div');
        imageWithBadge.classList.add('product-image-with-badge');
        card.appendChild(imageWithBadge);
        const image = document.createElement('img');
        image.classList.add('product-image');
        image.src = product.image;
        // if (product.title === 'Mens Kurta') {
        //     image.style.width = '89%';
        //     image.style.height = '89%';
        // }
        imageWithBadge.appendChild(image);

        const badge = document.createElement('div');
        badge.classList.add('product-badge');
        badge.textContent = product.badge_text || ''; // Handling null badge text
        imageWithBadge.appendChild(badge);
        if (badge.textContent === '') {
            imageWithBadge.removeChild(badge);
        }

        const titleAndVendor = document.createElement('div');
        titleAndVendor.classList.add('product-title-and-vendor');
        card.appendChild(titleAndVendor);
        const title = document.createElement('div');
        title.classList.add('product-title');
        title.textContent = product.title;
        titleAndVendor.appendChild(title);

        const vendor = document.createElement('div');
        vendor.classList.add('product-vendor');
        vendor.textContent = product.vendor;
        titleAndVendor.appendChild(vendor);

        const priceAndDiscount = document.createElement('div');
        priceAndDiscount.classList.add('product-price-and-discount');
        card.appendChild(priceAndDiscount);
        const price = document.createElement('div');
        price.classList.add('product-price');
        price.textContent = `Rs ${product.price}`;
        priceAndDiscount.appendChild(price);

        const compareAtPrice = document.createElement('div');
        compareAtPrice.classList.add('product-compare-at-price');
        compareAtPrice.textContent = `${product.compare_at_price}`;
        priceAndDiscount.appendChild(compareAtPrice);

        const discount = document.createElement('div');
        discount.classList.add('product-discount');
        const discountPercentage = Math.round(((product.compare_at_price - product.price) / product.compare_at_price) * 100);
        discount.textContent = `${discountPercentage}% off`;
        priceAndDiscount.appendChild(discount);

        const addToCartButton = document.createElement('button');
        addToCartButton.classList.add('add-to-cart');
        addToCartButton.textContent = 'Add to cart';
        card.appendChild(addToCartButton);

        return card;
    }

    // Function to show products based on tab
    function showProducts(target) {
        const tabContent = document.querySelectorAll('.tab-content > div');
        tabContent.forEach(content => {
            if (`#${content.id}` === target) {
                content.style.display = 'grid';
            } else {
                content.style.display = 'none';
            }
        });
    }
});
