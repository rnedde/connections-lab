
console.log("File is running!");

//name array
let names = ["Adam", "Steven", "Reverie", "Anna",
    "Zelong", "Liangsheng", "Miya", "Yael"];


//make sure whole window is loaded first
//(Event name, callback function("do this"))
window.addEventListener("load", () => {
    //all js code goes here
    console.log("page has loaded");

    //1. Select the HTML element
    let pickButton = document.getElementById("pick_button");

    //2. listen for the button to be clicked
    pickButton.addEventListener("click", () => {
        console.log("button clicked");

        //3. Pick a random name
        const numNames = names.length;
        let randomIndex = Math.floor(Math.random() * numNames);
        console.log(randomIndex);
        let pickedName = names[randomIndex];
        console.log(pickedName);

        //4. show name on the html page
        let pickedNameElement = document.getElementById("picked_name");
        pickedNameElement.innerHTML = pickedName;

        //5. add animation
        pickedNameElement.classList.add("picked_animation");

        //remove class after 3s
        setTimeout(() => {
            pickedNameElement.classList.remove("picked_animation");
        }, 3000)
    })
});