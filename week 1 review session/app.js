console.log("hello");

let count = 0;

//steps
//1. identify and select the button
let button;
let colorButton;
let bgColors = ["#03fca1", "#fc8403", "#4503fc"];
let choice = 0;
button = document.getElementById('button');
console.log(button);



//2. listen to event click on the button
//callback function runs when an event occurs
//anonymous function doesn't have a name or a reference
button.addEventListener("click", function () {
    //3. incerase the number in the counter
    console.log("counter increase")
    count += 1;
    document.getElementById('counter').innerHTML = count;
});



//button to change background color
colorButton = document.getElementById('button-color');
colorButton.addEventListener('click', function () {
    document.body.style.background = bgColors[choice];
    choice= (choice+1)%3;
})


//check for scrolling on the window
window.addEventListener('scroll', function(){

    //logs value of window height location.
    console.log(window.scrollY);
    document.body.style.background = "hsl("+ window.scrollY%255 +",50%,50%)"
})



