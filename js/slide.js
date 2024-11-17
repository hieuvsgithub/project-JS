let carouselInnerElement = document.querySelector(".carousel-inner");
let btnNext = document.querySelector(".next");
let btnPrev = document.querySelector(".prev");

let dataSlide = [
  {
    id: 1,
    title: "Slide 1",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nunc nec ultricies ultricies, nunc nunc.",
    image: "https://file.hstatic.net/200000722513/file/slider_nvidia.png",
  },
  {
    id: 2,
    title: "Slide 2",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo, ratione?",
    image:
      "https://file.hstatic.net/200000722513/file/thang_10_haloween_web_slider_800x400.png",
  },
  {
    id: 3,
    title: "Slide 3",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel, magnam.",
    image:
      "https://file.hstatic.net/200000722513/file/web_slider_800x400_546c737be0664c5ca58d95ad0fc0aab3.png",
  },
  {
    id: 4,
    title: "Slide 4",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius, illum?",
    image:
      "https://file.hstatic.net/200000722513/file/gearvn-pc-gvn-msi-slider.jpg",
  },
  {
    id: 5,
    title: "Slide 4",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius, illum?",
    image:
      "https://file.hstatic.net/200000722513/file/banner_web_slider_800x400_laptop_gaming_wukong_d33e1e6762764ec799820bfcc5814047.jpg",
  },
  {
    id: 6,
    title: "Slide 5",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel, magnam.",
    image:
      "https://file.hstatic.net/200000722513/file/banner_web_slider_800x400_xa_kho.jpg",
  },
];

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
