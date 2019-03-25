window.onload = function(){
  postReferenceValues();
  postRecommendationValues();
  initializeSlider();
}

let recommendation = {};
let reference = {};
let sliderContent = [];
let sliderShowing = [];
let itensShowing = 3;
let first = 0;
let last = 0;

function X(response){
  recommendation = response.data.recommendation;
  reference = response.data.reference.item;
  populateValues(recommendation, reference);
}

function populateValues(rec, ref){
  recommendation = rec;
  reference = ref
}

function postReferenceValues(){
  var tmpl = document.getElementsByTagName('template')[0].content.cloneNode(true);
  tmpl.querySelector('.product-link').href = reference.detailUrl;
  tmpl.querySelector('.product-img').src = reference.imageName;
  tmpl.querySelector('.product-name').innerText = reference.name;
  tmpl.querySelector('.old').innerText = reference.oldPrice;
  tmpl.querySelector('.evidence').innerText = reference.price;
  tmpl.querySelector('.conditions').innerHTML = reference.productInfo.paymentConditions;
  document.getElementsByClassName('ref')[0].appendChild(tmpl);
}

function postRecommendationValues(){
  let index = 0
  recommendation.forEach(element => {
    let tmpl = document.getElementsByTagName('template')[0].content.cloneNode(true);
    tmpl.querySelector('.product-wrapper').id = index;
    tmpl.querySelector('.product-link').href = element.detailUrl;
    tmpl.querySelector('.product-img').src = element.imageName;
    tmpl.querySelector('.product-name').innerText = element.name;
    tmpl.querySelector('.old').innerText = element.oldPrice;
    tmpl.querySelector('.evidence').innerText = element.price;
    tmpl.querySelector('.conditions').innerHTML = element.productInfo.paymentConditions;
    sliderContent.push(tmpl);
    index++;
  });
}

function initializeSlider(){
  let slider = document.getElementsByClassName('slider')[0].querySelector('.content');
  
  for(let i = 0; i < itensShowing; i++){
    slider.appendChild(sliderContent[i]);
    last++;
  }
}

function next(){
  if(last < sliderContent.length){
    let hidde = document.getElementById(first);
    // hidde.parentNode.removeChild(hidde);
    hidde.style.display = 'none';
    let show = sliderContent[last];
    document.getElementsByClassName('slider')[0].querySelector('.content').appendChild(show);
    last++;
    first++;
    console.log("Primeiro: " + first + "\n" + "Ultimo: " + last);
    if(last === sliderContent.length){
      let arrow = document.getElementsByClassName('right')[0];
      arrow.style.color = '#aaaaaa';
      arrow.style.cursor = 'default';
    }
  }
}

function previous(){
  if(last > 3){
    last--;
    first--;
    console.log("Primeiro: " + first + "\n" + "Ultimo: " + last);
    let hidde = document.getElementById(last);
    hidde.style.display = 'none';
    let ff = sliderContent[first];
    console.log(ff);
    let content = document.getElementsByClassName('slider')[0].querySelector('.content');
    content.insertBefore(ff ,document.getElementById(first))
  }
}

function test(){
  var newPara = sliderContent[3];
  console.log(newPara);
  document.body.appendChild(newPara);
}