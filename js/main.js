let bestSellerPC = document.querySelector(".best-seller-pc");
let bestSellerLaptopGaming = document.querySelector(
  ".best-seller-laptop-gaming"
);
let bestSellerLaptopVP = document.querySelector(".best-seller-laptop-vp");
let bestSellerComputerMouse = document.querySelector(
  ".best-seller-computer-mouse"
);
let bestSellerKeyboard = document.querySelector(".best-seller-keyboard");

// khai báo nít bấm XEM TẤT CẢ của từng loại sản phẩm
let allProductPC = document.querySelector(".all-pc");
let allProductLapTopGaming = document.querySelector(".all-laptop-gaming");
let allProductLapTopVP = document.querySelector(".all-laptop-vp");
let allProductComputerMouse = document.querySelector(".all-computer-mouse");
let allProductKeyboard = document.querySelector(".all-keyboard");
let allIn = document.querySelector(".all-pc");

let url = "http://localhost:3000/products";
import * as mixin from "./mixin.js";
// import * as products from "./products.js";
const dataProducts = await mixin.fetchAPI(url);

// ham hien thi san pham
function renderProducts(data, type, pointOfAppearance, quantity = 0) {
  if (type) {
    data = data.filter((value) => value.type === type);
  }
  pointOfAppearance.innerText = "";
  for (let i = 0; i < data.length - quantity; i++) {
    let product = document.createElement("div");
    product.classList.add("item");
    product.innerHTML = /*html*/ `
              <div class="img-product">
                <a href="/pages/detail-products.html?id=${data[i].id}">
                  <img
                    src="${data[i].image}"
                    alt="Ảnh sản phẩm bán chạy"
                  />
                </a>
              </div>
              <div class="detail-product">
                <h3>
                  <a href="/pages/detail-products.html?id=${data[i].id}"> ${
      data[i].title
    } </a>
                </h3>
                <div class="information">
                  <span title="Bộ sử lý">
                    <i class="fa-solid fa-microchip"></i> i7-14700K
                  </span>
                  <span title="card">
                    <i class="fa-solid fa-display"></i> RTX-4070
                  </span>
                  <span title="Chipset intel">
                    <i class="fa-solid fa-chess-board"></i> B762
                  </span>
                  <span title="RAM">
                    <i class="fa-solid fa-memory"></i> 16GB
                  </span>
                  <span title="ROM">
                    <i class="fa-solid fa-chess-board"> </i> 500GB
                  </span>
                </div>
                <div class="price-original">${data[i].originalPrice}đ</div>
                <div class="price-is-reduced">
                  ${
                    data[i].originalPrice -
                    data[i].originalPrice * (data[i].sale / 100)
                  }đ <span class="percent-discount">${data[i].sale}%</span>
                </div>
                <div class="evaluate">
                  4.8 <i class="fa-solid fa-star"></i>
                  <span class="number-of-reviews">
                    (<span class="quantity">5</span> đánh giá )
                  </span>
                </div>
              </div>
    `;
    pointOfAppearance && pointOfAppearance.appendChild(product);
  }
}

renderProducts(dataProducts, "pc", bestSellerPC, 7);
renderProducts(dataProducts, "laptop_gaming", bestSellerLaptopGaming, 7);
renderProducts(dataProducts, "laptop_vp", bestSellerLaptopVP, 7);

// xử lý nút bấm XEM TẤT CẢ

function handleBtnAll(btn, type) {
  btn.type.href = `/pages/products.html?type=${type}`;
  console.log(btn);
}
handleBtnAll(allProductPC, "pc");
handleBtnAll(allProductLapTopGaming, "laptop_gaming");
handleBtnAll(allProductLapTopVP, "laptop_vp");
