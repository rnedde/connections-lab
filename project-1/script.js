window.addEventListener("load", function () {

    console.log("page is loaded");

    //able to access css variables
    const root = document.documentElement;

    //array of all bodyparts
    let bodyParts = ['head', 'neck', 'pecs', 'delts', 'biceps', 'triceps', 'forearms', 'hands', 'abs', 'obliques', 'quads', 'adductor', 'shins', 'calves', 'feet'];

    for (let i = 0; i < bodyParts.length; i++) {
        interaction(i);
    }




    //color when mouse hovers, white when removed. 
    function interaction(index) {
        //grabs the color from the css variables (thanks, chatGPT)
        let hoveredBodyPart = bodyParts[index];
        let hoverColor = getComputedStyle(root).getPropertyValue('--' + hoveredBodyPart + '-color').trim();

        //composes the element Id string
        let bodyPartElementId = 'bendi-' + hoveredBodyPart;
        let bodyPartElement = document.getElementById(bodyPartElementId);
        let informationDiv = document.getElementById('information');
        let commonNameElement = document.getElementById('common-name');
        let muscleGroupElement = document.getElementById('muscle-group');
        let stretchNameElement = document.getElementById('stretch-name');
        let stretchDescriptionElement = document.getElementById('stretch-description');
        let stretchDurationElement = document.getElementById('stretch-duration');
        let countdownButtonElement = document.getElementById('countdown-button');
        

        let bodyPart, name, commonName, muscleGroup, stretch, stretchIndex, stretchName, stretchDescription, stretchDuration;


        //get data from JSON
        fetch('./stretches.json')
            .then(response => response.json())
            .then(data => {
                //sets variables from json data
                bodyPart = data.bodyParts[index];
                name = bodyPart.name;
                commonName = bodyPart.commonName;
                muscleGroup = bodyPart.muscleGroup;

                //gets a random stretch from the list
                stretchIndex = Math.floor(Math.random() * bodyPart.stretches.length);
                stretch = bodyPart.stretches[stretchIndex];

                //variables for the randomly selected stretch
                stretchName = stretch.stretchName;
                stretchDescription = stretch.instructions;
                stretchDuration = stretch.duration;
            })

        if (bodyPartElement) {
            //set all body parts to white first.
            bodyPartElement.style.fill = "white";

            //when mouse hovers over element, set to its color
            bodyPartElement.addEventListener('mouseover', function () {
                bodyPartElement.style.fill = hoverColor;
                commonNameElement.innerHTML = commonName;
                commonNameElement.style.backgroundColor = hoverColor;
            });

            //when mouse moves off, set to white.
            bodyPartElement.addEventListener('mouseout', function () {
                bodyPartElement.style.fill = "white";
                commonNameElement.innerHTML = "";
                commonNameElement.style.backgroundColor = "white";
            });

            //display stretch information on the page when body part is clicked
            bodyPartElement.addEventListener('click', function () {
                console.log(bodyPartElementId + " clicked");
                informationDiv.style.visibility='visible';
                muscleGroupElement.innerHTML = muscleGroup;
                stretchNameElement.innerHTML = stretchName;
                stretchDescriptionElement.innerHTML = stretchDescription;
                stretchDurationElement.innerHTML = stretchDuration;

            });

            //countdown madness
            countdownButtonElement.addEventListener('click', function(){
                console.log('countdown clicked');
            })




        } else {
            console.error("Element with ID " + bodyPartElementId + " not found!");
        }

    }

})
