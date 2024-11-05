let carouselInnerElement = document.querySelector(".carousel-inner");
let btnNext = document.querySelector(".next");
let btnPrev = document.querySelector(".prev");

let url = "http://localhost:3000/slide";

import * as mixin from "./mixin.js";
const dataSlide = await mixin.fetchAPI(url);

// hàm hiển thị slide
function display(arr) {
  // hiện slide
  let displaySlide = arr.map((value) => {
    let slide =
      /*html*/
      `<div class="slide">
    <img src="${value.image}" alt="" />
    </div>`;
    return slide;
  });
  // hiển thị move
  let displayMove = arr.map((value) => {
    let move = `<div class="item-move"></div>`;
    return move;
  });
  return `<div class="wrapper-slide">${displaySlide.join("")}</div>
  <div class="moves">${displayMove.join("")}</div>`;
}
carouselInnerElement.innerHTML = display(dataSlide);
display(dataSlide);

// xử lý hiển thị 1 slide tại 1 thời điểm
let slideEle = document.querySelectorAll(".slide");
let moveEle = document.querySelectorAll(".item-move");
// chỉ số hiện tại của slide đang hiển thị
let currSlide = 0;
// Hàm xử lý slide
function handleYouSlide() {
  slideEle.forEach((value) => {
    value.style.display = "none";
  });
  slideEle[currSlide].style.display = "block";
  moveEle.forEach((value) => {
    value.style.background = "white";
  });
  moveEle[currSlide].style.background = "red";
}
handleYouSlide();

// Hàm xử lý sự kiện click next
function next() {
  currSlide++;
  if (currSlide >= dataSlide.length) {
    currSlide = 0;
  }
  handleYouSlide();
}
// Hàm xử lý sự kiện click prev
function prev() {
  currSlide--;
  if (currSlide < 0) {
    currSlide = dataSlide.length - 1;
  }
  handleYouSlide();
}

// Tạo sự kiện click nút next, prev
btnNext.addEventListener("click", () => {
  next();
});
btnPrev.addEventListener("click", () => {
  prev();
});
// xử lý auto chạy slide
setInterval(() => {
  next();
}, 3000);
