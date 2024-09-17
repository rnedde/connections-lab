console.log("hello");


window.addEventListener('load', changeColors);

//1. identify and select row
let row1 = document.getElementById("row1");
console.log(row1);

//2. listen to event click on the row
row1. addEventListener("mousedown", function(){
    document.getElementById('reveal1').style.visibility = 'visible';
})
row1. addEventListener("mouseup", function(){
    document.getElementById('reveal1').style.visibility = 'hidden';
})
row2. addEventListener("mousedown", function(){
    document.getElementById('reveal2').style.visibility = 'visible';
})
row2. addEventListener("mouseup", function(){
    document.getElementById('reveal2').style.visibility = 'hidden';
})
row3. addEventListener("mousedown", function(){
    document.getElementById('reveal3').style.visibility = 'visible';
})
row3. addEventListener("mouseup", function(){
    document.getElementById('reveal3').style.visibility = 'hidden';
})


let colorButton = document.getElementById("colorButton");

colorButton.addEventListener("click", changeColors);


//this could be made a lot more efficient, right??
function changeColors(){
    let baseColor1 = getRandomRgbColor();
    let baseColor2 = getRandomRgbColor();
    let baseColor3 = getRandomRgbColor();
    let baseColor4 = getRandomRgbColor();
    let baseColor5 = getRandomRgbColor();
    let baseColor6 = getRandomRgbColor();
    let baseColor7 = getRandomRgbColor();
    let baseColor8 = getRandomRgbColor();
    let baseColor9 = getRandomRgbColor();

    let topColor1 = getRandomRgbColor();
    let topColor2 = getRandomRgbColor();
    let topColor3 = getRandomRgbColor();

    document.getElementById('baseColor1').style.backgroundColor = baseColor1;
    document.getElementById('baseColor2').style.backgroundColor = baseColor2;
    document.getElementById('baseColor3').style.backgroundColor = baseColor3;
    document.getElementById('baseColor4').style.backgroundColor = baseColor4;
    document.getElementById('baseColor5').style.backgroundColor = baseColor5;
    document.getElementById('baseColor6').style.backgroundColor = baseColor6;
    document.getElementById('baseColor7').style.backgroundColor = baseColor7;
    document.getElementById('baseColor8').style.backgroundColor = baseColor8;
    document.getElementById('baseColor9').style.backgroundColor = baseColor9;

    document.getElementById('top1.1').style.backgroundColor=topColor1;
    document.getElementById('top1.2').style.backgroundColor=topColor1;
    document.getElementById('top1.3').style.backgroundColor=topColor1;
    document.getElementById('reveal1').style.backgroundColor=topColor1;

    document.getElementById('top2.1').style.backgroundColor=topColor2;
    document.getElementById('top2.2').style.backgroundColor=topColor2;
    document.getElementById('top2.3').style.backgroundColor=topColor2;
    document.getElementById('reveal2').style.backgroundColor=topColor2;

    document.getElementById('top3.1').style.backgroundColor=topColor3;
    document.getElementById('top3.2').style.backgroundColor=topColor3;
    document.getElementById('top3.3').style.backgroundColor=topColor3;
    document.getElementById('reveal3').style.backgroundColor=topColor3;
}

//this function is from chatGPT
function getRandomRgbColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}


