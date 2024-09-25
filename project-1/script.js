window.addEventListener("load", function () {
    console.log("page is loaded");

    //able to access css variables
    const root = document.documentElement;

    //array of all bodyparts
    let bodyParts = ['head', 'neck', 'pecs', 'delts', 'biceps', 'triceps', 'forearms', 'hands', 'abs', 'obliques', 'quads', 'adductor', 'shins', 'calves', 'feet'];

    for (let i = 0; i < bodyParts.length; i++) {
        hover(bodyParts[i]);
    }
    //color when mouse hovers, white when removed. 
    function hover(bodyPart) {

        //grabs the color from the css variables (thanks, chatGPT)
        let hoverColor = getComputedStyle(root).getPropertyValue('--' + bodyPart + '-color').trim();

        //composes the element Id string
        let bodyPartElementId = 'bendi-' + bodyPart;
        let bodyPartElement = document.getElementById(bodyPartElementId);
        let muscleGroupElement = document.getElementById('muscle-group');
        

        if (bodyPartElement) {
            //set all body parts to white first.
            bodyPartElement.style.fill = "white";

            //when mouse hovers over element, set to its color
            bodyPartElement.addEventListener('mouseover', function () {
                console.log(bodyPartElementId + " hovered");
                bodyPartElement.style.fill = hoverColor;
                muscleGroupElement.innerHTML = bodyPart;
                muscleGroupElement.style.backgroundColor= hoverColor;
            });

            //when mouse moves off, set to white.
            bodyPartElement.addEventListener('mouseout', function () {
                console.log(bodyPartElementId + " unhovered");
                bodyPartElement.style.fill = "white";
                muscleGroupElement.innerHTML = "";
                
            });
        } else {
            console.error("Element with ID " + bodyPartElementId + " not found!");
        }
    }
})
