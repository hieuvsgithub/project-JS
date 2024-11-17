let mainProduct = document.querySelector(".product-main");
let inputSearch = document.querySelector("#search-inp");
let btnSearch = document.querySelector("#btn-search");

let url = "http://localhost:3000/products";
import * as mixin from "./mixin.js";
import * as utils from "./utils.js";
const productId = await utils.getParam("id");
const product = await mixin.getById(url, productId);

// hàm hiện mô tả sản phẩm chính
function renderDetail() {
  mainProduct.innerText = "";
  let row = document.createElement("div");
  row.classList.add("row");
  row.innerHTML = /*html*/ `
  <div class="col-5 col-lg-12">
                  <div class="slides-img-product">
                    <div class="carousel-inner">
                      <div class="wrapper-slide-img">

                      </div>
                      <!-- wrapper-slide-img -->
                      <div class="moves-img">
                      </div>
                      <!-- moves-img -->
                    </div>
                    <!-- carousel-inner -->
                    <div class="control">
                      <button class="prev">
                        <i class="fa-solid fa-left-long"></i>
                      </button>
                      <button class="next">
                        <i class="fa-solid fa-right-long"></i>
                      </button>
                    </div>
                    <!-- control -->
                  </div>
                  <!-- slides-img-product -->
                  <div class="banner-promotion">
                    <a href="#">
                      <img
                        src="../imgs/banner-promotion/laptop_t10_600x200.webp"
                        alt="Ảnh banner giảm giá"
                      />
                    </a>
                  </div>
                </div>
                <!-- col-5 -->
                <div class="col-7 col-lg-12">
                  <div class="desc-product">
                    <h1>${product.title}</h1>
                    <div class="result-feedback">
                      <span class="result-evaluate">
                        4.0 <i class="fa-solid fa-star"></i>
                      </span>
                      <!-- đánh giá -->
                      <span class="nav-feedback">
                        <a href="#">Xem đánh giá</a>
                      </span>
                      <!-- phản hồi -->
                    </div>
                    <!-- result-feedback -->
                    <div class="price-original">${
                      product.originalPrice
                    }VND</div>
                    <!-- price-original -->
                    <div class="price-is-reduced">
                      ${
                        product.originalPrice -
                        product.originalPrice * (product.sale / 100)
                      }VND<span class="percent-discount">${product.sale}%</span>
                    </div>
                    <!-- price-is-reduced -->
                    <div class="gift">
                      <div class="title-gift">
                        <i class="fa-solid fa-gift"></i> Quà tặng khuyến mãi
                      </div>
                      <div class="list-gift">
                        <ul>
                          <li>
                            1. Quà tặng thêm 01 năm bảo hành khi mua Laptop
                            Lenovo
                          </li>
                          <li>
                            2. Tặng ngay <span>1</span> x
                            <span>Phụ kiện giá đỡ Laptop N3</span> trị giá
                            <span>199.000₫</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <!-- gift -->
                    <div class="select">
                      <div class="select-buy">Mua ngay</div>
                      <div class="select-add-cart">Thêm vào giỏ hàng</div>
                    </div>
                    <!-- select -->
                    <div class="benefit">
                    </div>
                    <!-- benefit -->
                    <div class="payment-support">
                      Hỗ trợ trả góp MPOS (Thẻ tín dụng), HDSAISON
                      <a href="#">(Xem chi tiết)</a>
                    </div>
                    <!-- payment-support -->
                    <div class="promotion">
                      <div class="title-promotion">Khuyễn mãi</div>
                      <div class="list-promotion">

                      </div>
                    </div>
                    <!-- promotion -->
                  </div>
                  <!-- desc-product -->
                </div>
                <!-- col-7 -->
  `;
  mainProduct.appendChild(row);
}
renderDetail();

let wrapperImgProduct = document.querySelector(".wrapper-slide-img");
let movesImg = document.querySelector(".moves-img");
let benefit = document.querySelector(".benefit");
let listPromotion = document.querySelector(".list-promotion");
let btnNext = document.querySelector(".next");
let btnPrev = document.querySelector(".prev");

function slideImgProduct(arr) {
  arr.map((value) => {
    let slideImgProduct = document.createElement("div");
    slideImgProduct.classList.add("slide-img");
    slideImgProduct.innerHTML = /*html*/ `
    <img
      src="${value}"
      alt="Ảnh sản phẩm"
    />
    `;
    wrapperImgProduct.appendChild(slideImgProduct);
  });
}
slideImgProduct(product.imgDetail);

// hàm hiển thị ảnh mô tả sản phẩm
function renderImgDetail(arr) {
  arr.map((value) => {
    let itemMoveImg = document.createElement("div");
    itemMoveImg.classList.add("item-move-img");
    itemMoveImg.innerHTML = `
    <img
        src="${value}"
        alt="ảnh sản phẩm"
    />
    `;
    movesImg.appendChild(itemMoveImg);
  });
}
renderImgDetail(product.imgDetail);

// xử lý hiển thị 1 slide tại 1 thời điểm
let slideEle = document.querySelectorAll(".slide-img");
let moveEle = document.querySelectorAll(".item-move-img");
console.log(slideEle);
console.log(moveEle);
// chỉ sổ hiện tại của slide
let currSlide = 0;
// hàm sử lý slide
function handleYouSlide() {
  slideEle.forEach((value) => {
    value.style.display = "none";
  });
  slideEle[currSlide].style.display = "block";
  moveEle.forEach((value) => {
    value.style.border = "none";
  });
  moveEle[currSlide].style.border = "1px solid red";
}
handleYouSlide();

// hàm hiển thị lợi ích khi mua sản phẩm
function renderBenefit(arr) {
  let ulEle = document.createElement("ul");
  arr.map((value) => {
    let liEle = document.createElement("li");
    liEle.textContent = `✔ ${value}`;
    ulEle.appendChild(liEle);
  });
  benefit.appendChild(ulEle);
}
renderBenefit(product.service);

// hàm hiển thị các khuyến mãi của sản phẩm
function renderPromotion(arr) {
  let ulEle = document.createElement("ul");
  arr.map((value) => {
    let liEle = document.createElement("li");
    liEle.innerHTML = `
        ${value} <a href="#">(Xem thêm).</a>
        `;
    ulEle.appendChild(liEle);
  });
  listPromotion.appendChild(ulEle);
}
renderPromotion(product.promotion);

// Hàm xử lý sự kiện click next
function next() {
  currSlide++;
  if (currSlide >= product.imgDetail.length) {
    currSlide = 0;
  }
  handleYouSlide();
}
// Hàm xử lý sự kiện click prev
function prev() {
  currSlide--;
  if (currSlide < 0) {
    currSlide = product.imgDetail.length - 1;
  }
  handleYouSlide();
}

// tạo sự kiện cho nút next , prev
btnNext.addEventListener("click", () => {
  next();
});
btnPrev.addEventListener("click", () => {
  prev();
});

// tạo sự kiện cho btnsearch
btnSearch.addEventListener("click", () => {
  localStorage.setItem("searching", inputSearch.value);
  window.location.href = "../pages/products.html";
});

// setInterval(() => {
//   next();
// }, 3000);
