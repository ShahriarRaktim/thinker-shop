const loadProducts = () => {
  // const url = `https://fakestoreapi.com/products`;
  fetch('../js/data.json')
      .then((response) => response.json())
      .then((data) => showProducts(data));
};
loadProducts();

// show all product in UI 
const showProducts = (products) => {
  console.log(products)
  // const allProducts = products.map((pd) => pd);
  for (const product of products) {
      // const img = product.image;
      const div = document.createElement("div");
      div.classList.add("col");
      div.innerHTML = `
          <div class="single-product card h-100 text-center">
              <img class="product-image w-50 mx-auto" src=${product.image}></img>
              <div class="card-body">
                  <h4 class="card-title">${product.title}</h4>
                  <p class="card-text">Category: ${product.category}</p>
                  <h2>Price: $ ${product.price}</h2>
                  <h5 class="pb-3"><small class="rating">Avg.Rating: ${product.rating.rate} (${product.rating.count})</small></h5>
                  <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn btn-info">Add to Cart</button>
                  <button id="details-btn" class="btn btn-secondary">Details</button></div>
              </div>
          </div>
      `;
      document.getElementById("all-products").appendChild(div);
  }
};

let count = 0;
const addToCart = (id, price) => {
  count = count + 1;
  updatePrice("price", price);

  updateTaxAndCharge();
  document.getElementById("total-Products").innerText = count;
};


const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseFloat(element);
  return converted;
};


// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  const total = convertedOldPrice + convertPrice;
  document.getElementById(id).innerText = total.toFixed(2);
};

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = value.toFixed(2);
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted > 200) {
      setInnerText("delivery-charge", 30);
      setInnerText("total-tax", priceConverted * 0.2);
  }
  if (priceConverted > 400) {
      setInnerText("delivery-charge", 50);
      setInnerText("total-tax", priceConverted * 0.3);
  }
  if (priceConverted > 500) {
      setInnerText("delivery-charge", 60);
      setInnerText("total-tax", priceConverted * 0.4);
  }
  updateTotal();
};

//grandTotal update function
const updateTotal = () => {
  const grandTotal =
      getInputValue("price") + getInputValue("delivery-charge") +
      getInputValue("total-tax");
  document.getElementById("total").innerText = grandTotal.toFixed(2);
};

