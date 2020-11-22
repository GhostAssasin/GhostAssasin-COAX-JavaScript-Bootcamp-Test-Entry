const { delay, interval, resize } = config || { delay: 10, interval: 5, resize: false };
const modal = document.getElementById('myModal');
const modalImg = document.getElementById("img01");
const imagesUrls = [
  "https://images.pexels.com/photos/1275929/pexels-photo-1275929.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=9060",
  "https://images.pexels.com/photos/1451074/pexels-photo-1451074.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=450&w=560",
  "https://images.pexels.com/photos/1460880/pexels-photo-1460880.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=200",
  "https://images.pexels.com/photos/1437629/pexels-photo-1437629.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=300&w=500",
  "https://images.pexels.com/photos/87284/ocean-seacoast-rocks-water-87284.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=426&w=400",
  "https://images.pexels.com/photos/885880/pexels-photo-885880.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=150&w=1260",
  "https://images.pexels.com/photos/1112598/pexels-photo-1112598.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
];
let timeout = delay;

function checkActivity() {
  timeout--
  if (timeout <= 0){
    const img = new Image(); //add image instance to get natural height and width of image
    const i = Math.floor(Math.random() * Math.floor(imagesUrls.length)); //calculate index of random image from list 
    modalImg.zoomIn();
    modalImg.src = imagesUrls[i];
    modal.style.display = "block";
    setTimeout(modalImg.zoomInRemove,900);

    img.addEventListener("load", function() {
      modalImg.style.height = this.naturalHeight + "px";
      modalImg.style.width = this.naturalWidth + "px";
      if (this.naturalWidth <= window.innerWidth && this.naturalHeight <= window.innerHeight){
        modalImg.style.margin = calculateMargin(window.innerHeight, this.naturalHeight) + "px 0px 0px " + calculateMargin(window.innerWidth, this.naturalWidth) + "px";
      } else if (resize) {
        const scale = Math.min(window.innerWidth / this.naturalWidth, window.innerHeight / this.naturalHeight);
        const width = scale * this.naturalWidth;
        const height = scale * this.naturalHeight;
        modalImg.style.width = width + "px";
        modalImg.style.height = height + "px";
        modalImg.style.margin = calculateMargin(window.innerHeight, height) + "px 0px 0px " + calculateMargin(window.innerWidth, width) + "px";
      } else {
        modalImg.style.margin ="0px"
      }
    });
    img.src = imagesUrls[i];
    setTimeout(addZoom, interval * 1000);
  }
  else {
    setTimeout(checkActivity, 1000);
  }
}

function addZoom() {
  modalImg.zoomOut();
  setTimeout(clearZoom,900);
}

function clearZoom() {
  modal.style.display = "none";
  modalImg.zoomOutRemove();
  checkActivity()
} 

function userActivity() {
  timeout = delay;
  modalImg.zoomOut();
  setTimeout(modalImg.zoomOutRemove,1999);
  modal.style.display = "none";
}

function calculateMargin(windowSize, imageSize) {
  return Math.floor(Math.random() * Math.floor(windowSize - imageSize));
}

modalImg.zoomIn = function() {
  modalImg.classList.add('content-zoom-in');
}
modalImg.zoomInRemove = function() {
  modalImg.classList.remove('content-zoom-in');
}
modalImg.zoomOut = function() {
  modalImg.classList.add('content-zoom-out');
}
modalImg.zoomOutRemove = function() {
  modalImg.classList.remove('content-zoom-out');
}

document.addEventListener('keydown', userActivity);
document.addEventListener('mousedown', userActivity);
document.addEventListener('mousemove', userActivity);

setTimeout(checkActivity, 1000);
