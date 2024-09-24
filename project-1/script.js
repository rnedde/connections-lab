window.addEventListener("load", function() {
    console.log("page is loaded");

    //array of all bodyparts
    let bodyParts = ['head', 'neck', 'pecs', 'delts', 'triceps', 'biceps', 'forearms', 'hands', 'abs', 'obliques', 'quads', 'groin', 'shins', 'calves', 'feet']
    for(let i=0; i<bodyParts.length; i++){
        addHoverEffect('bendi-' + bodyParts[i]);
    }

    let bodyPartColors = ["#ffb9b5", ]

    //color when mouse hovers, white when removed. 
    function addHoverEffect(elementId, hoverColor) {
        let element = document.getElementById(elementId);
        
        if (element) {
            element.style.fill = "white";
            element.addEventListener('mouseover', function() {
                console.log(elementId + " hovered");
                element.style.fill = ""; //set to color
            });

            element.addEventListener('mouseout', function() {
                console.log(elementId + " unhovered");
                element.style.fill = "white";  //set to white
            });
        } else {
            console.error("Element with ID " + elementId + " not found!");
        }
    }
})
