window.addEventListener("load", function () {

    console.log("page is loaded");

    //able to access css variables
    const root = document.documentElement;

    //array of all bodyparts
    let bodyParts = ['head', 'neck', 'pecs', 'delts', 'biceps', 'triceps', 'forearms', 'hands', 'abs', 'obliques', 'quads', 'adductor', 'shins', 'calves', 'feet'];


    for (let i = 0; i < bodyParts.length; i++) {
        hover(bodyParts[i]);
        isClicked(bodyParts[i], i);
    }





    //color when mouse hovers, white when removed. 
    function hover(bodyPart) {
        //grabs the color from the css variables (thanks, chatGPT)
        let hoverColor = getComputedStyle(root).getPropertyValue('--' + bodyPart + '-color').trim();

        //composes the element Id string
        let bodyPartElementId = 'bendi-' + bodyPart;
        let bodyPartElement = document.getElementById(bodyPartElementId);
        let muscleGroupElement = document.getElementById('muscle-group-name');


        if (bodyPartElement) {
            //set all body parts to white first.
            bodyPartElement.style.fill = "white";

            //when mouse hovers over element, set to its color
            bodyPartElement.addEventListener('mouseover', function () {
                console.log(bodyPartElementId + " hovered");
                bodyPartElement.style.fill = hoverColor;
                muscleGroupElement.innerHTML = bodyPart;
                muscleGroupElement.style.backgroundColor = hoverColor;
            });

            //when mouse moves off, set to white.
            bodyPartElement.addEventListener('mouseout', function () {
                console.log(bodyPartElementId + " unhovered");
                bodyPartElement.style.fill = "white";
                muscleGroupElement.innerHTML = "";
                muscleGroupElement.style.backgroundColor = "white";
            });
        } else {
            console.error("Element with ID " + bodyPartElementId + " not found!");
        }
    }


    function isClicked(bodyPart, index) {
        //grabs the color from the css variables (thanks, chatGPT)
        let hoverColor = getComputedStyle(root).getPropertyValue('--' + bodyPart + '-color').trim();

        //composes the element Id string
        let bodyPartElementId = 'bendi-' + bodyPart;

        let bodyPartElement = document.getElementById(bodyPartElementId);

        //get elements to be filled
        let muscleGroupNameElement = document.getElementById('muscle-group-name');
        let stretchNameElement = document.getElementById('stretch-name');
        let stretchDescription = document.getElementById('stretch-description');
        let stretchDuration = document.getElementById('stretch-duration');

        //get data from json

        if (bodyPartElement) {
            //set all body parts to white first.
            bodyPartElement.style.fill = "white";

            //when mouse clicks on element, show information. 
            bodyPartElement.addEventListener('click', function () {
                console.log(bodyPartElementId + " clicked");
                bodyPartElement.style.fill = hoverColor;
                muscleGroupNameElement.innerHTML = bodyPart;
                muscleGroupNameElement.style.backgroundColor = hoverColor;
                fetch('./stretches.json')
                .then(response=>response.json())
                .then(data => {
                    let bodyPart = data.bodyParts[index];
                    let name = bodyPart.name;
                    let commonName = bodyPart.commonName;
                    let muscleGroup = bodyPart.muscleGroup;
                    console.log(name,commonName,muscleGroup)
                })

            });

        } else {
            console.error("Element with ID " + bodyPartElementId + " not found!");
        }
    }

})
