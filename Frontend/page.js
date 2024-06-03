let currentPage = 1;
const productsPerPage = 8;
let allProducts = [];

// fetch products from API
const fetchProducts = async () => {
    try {
        const res = await fetch('http://localhost:4000/products');
        if (res.status === 200) {
            allProducts = await res.json();
            renderProducts();
            renderPagination();
        } else {
            console.log("Error fetching products");
        }
    } catch (err) {
        console.log(err);
    }
};

// render products based on current page
const renderProducts = () => {
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    const paginatedProducts = allProducts.slice(startIndex, endIndex);

    let products = '';
    paginatedProducts.forEach(element => {
        products += `
            <div class="product-info">
                <h3>${element.name}</h3>
                <img src="${element.url_image}" alt="photo">
                <p>Price: $${element.price}</p>
                <p>Discount: ${element.discount}%</p>
            </div>
        `;
    });
    document.getElementById("card").innerHTML = products;
};

// render pagination buttons
const renderPagination = () => {
    const totalPages = Math.ceil(allProducts.length / productsPerPage);
    let paginationButtons = '';

    for (let i = 1; i <= totalPages; i++) {
        paginationButtons += `<button class="page-button" onclick="changePage(${i})">${i}</button>`+`&nbsp;`;
    }

    document.getElementById("pagination").innerHTML = paginationButtons;
};

// change the current page
const changePage = (pageNumber) => {
    currentPage = pageNumber;
    renderProducts();
};

// fetch categories from API
const dataCategories = async () => {
    try {
        const res = await fetch('http://localhost:4000/categories');
        if (res.status === 200) {
            const data = await res.json();
            console.log(data);
            let categories = '';
            data.forEach(element => {
                categories += `<div>${element.id}</div>` + '-' +`&nbsp;`+ `<div style="margin-inline-end: 2px;">${element.name}</div>`+`&nbsp;`.repeat(5);
            });

            document.getElementById("category").innerHTML = categories;
        } else {
            console.log("Error fetching categories");
        }
    } catch (err) {
        console.log(err);
    }
};

// fetch products by id from API
const searchProductsByID = async (id) => {
    try {
        if (id <= '0' || id > '10') {
            window.location.reload(); 
            return; 
        }
        
        const res = await fetch(`http://localhost:4000/search/${id}`);
        if (res.status === 200) {
            const products = await res.json();
            let productsHTML = '';

            products.forEach(product => {
                productsHTML += `
                    <div class="product-info">
                        <h3>${product.name_product}</h3>
                        <img src="${product.url_image}" alt="photo">
                        <p>Price: $${product.price}</p>
                        <p>Discount: ${product.discount}%</p>
                    </div>
                `;
            });

            document.getElementById("card").innerHTML = productsHTML;
        } else {
            console.log("Error fetching products by ID");
        }
    } catch (err) {
        console.log(err);
    }
}


// Capture the search input and pass it to searchProductsByID
const searchById = (event) => {
    event.preventDefault();
    const searchInput = document.getElementById("searchInput").value;
    console.log(searchInput);
    searchProductsByID(searchInput);
}


fetchProducts();
dataCategories();
