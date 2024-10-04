window.addEventListener("load", function () {

    //needed to get color variables from css
    const root = document.documentElement;

    //array to hold body part names
    let bodyParts = ['head', 'neck', 'pecs', 'delts', 'biceps', 'triceps', 'forearms', 'hands', 'abs', 'obliques', 'quads', 'adductor', 'shins', 'calves', 'feet'];
    //global object to store the stretch that is clicked
    let selectedStretch = {};

    let countdown;
    let countdownOn = false;

    //cycles through each body part for hover and click interactions. 
    for (let i = 0; i < bodyParts.length; i++) {
        interaction(i);
    }

    //when countdown button is clicked, start countdown, and change button to say "restart"
    const countdownButtonElement = document.getElementById('countdown-button');
    const countdownElement = document.getElementById('countdown');
    countdownButtonElement.addEventListener('click', function () {
        countdownOn = true;
        startCountdown(selectedStretch.stretchDuration, countdownElement);
        countdownButtonElement.innerHTML = "restart";
    });


    function interaction(index) {
        let hoveredBodyPart = bodyParts[index];
        //get color variable from css
        let hoverColor = getComputedStyle(root).getPropertyValue('--' + hoveredBodyPart + '-color').trim();

        //uses body part name to get the id tag from the svg. 
        let bodyPartElementId = 'bendi-' + hoveredBodyPart;
        let bodyPartElement = document.getElementById(bodyPartElementId);

        //getting elements...
        let informationDiv = document.getElementById('information');
        let commonNameElement = document.getElementById('common-name');
        let muscleGroupElement = document.getElementById('muscle-group');
        let stretchNameElement = document.getElementById('stretch-name');
        let stretchDescriptionElement = document.getElementById('stretch-description');
        let stretchDurationElement = document.getElementById('stretch-duration');
        let countdownContainerElement = document.getElementById('countdown-container');


        if (bodyPartElement) {

            //set fill of all parts to white first. 
            bodyPartElement.style.fill = "white";

            //when the mouse is hovered, gets the common name from the json file, 
            //and changes color of the body part and the text highlight
            bodyPartElement.addEventListener('mouseover', function () {
                fetch('./stretches.json')
                    .then(response => response.json())
                    .then(data => {
                        let bodyPart = data.bodyParts[index];
                        commonName = bodyPart.commonName;
                        commonNameElement.innerHTML = commonName;
                    });
                bodyPartElement.style.fill = hoverColor;
                commonNameElement.style.backgroundColor = hoverColor;
            });

            //goes back to default when mouse leaves the body part. 
            bodyPartElement.addEventListener('mouseout', function () {
                bodyPartElement.style.fill = "white";
                commonNameElement.innerHTML = "";
                commonNameElement.style.backgroundColor = "white";
            });

            //when the body part is clicked, updates the global selectedStretch object to match the clicked body part. 
            bodyPartElement.addEventListener('click', function () {
                console.log(bodyPartElementId + " clicked");

                fetch('./stretches.json')
                    .then(response => response.json())
                    .then(data => {
                        let bodyPart = data.bodyParts[index];
                        let stretchIndex = Math.floor(Math.random() * bodyPart.stretches.length);
                        let stretch = bodyPart.stretches[stretchIndex];

                        selectedStretch = {
                            name: bodyPart.name,
                            commonName: bodyPart.commonName,
                            muscleGroup: bodyPart.muscleGroup,
                            stretchName: stretch.stretchName,
                            stretchDescription: stretch.instructions,
                            stretchDuration: stretch.duration
                        };

                        //changes style of information section to be visible and match body part color
                        informationDiv.style.visibility = 'visible';
                        muscleGroupElement.style.backgroundColor = hoverColor;
                        countdownContainerElement.style.backgroundColor = hoverColor;
                        stretchNameElement.style.border = '2px solid ' + hoverColor;

                        //updates information to match selected body part.
                        muscleGroupElement.innerHTML = selectedStretch.muscleGroup;
                        stretchNameElement.innerHTML = selectedStretch.stretchName;
                        stretchDescriptionElement.innerHTML = selectedStretch.stretchDescription;
                        stretchDurationElement.innerHTML = selectedStretch.stretchDuration;


                        //when a new body part is selected, the countdown resets. 
                        countdownElement.innerHTML = selectedStretch.stretchDuration;
                        countdownOn = false;
                    });
            });



        } else {
            console.error("Element with ID " + bodyPartElementId + " not found!");
        }
    }

    function startCountdown(duration, element) {
        element.innerHTML = "Ready?"

        //countdown is the current time remaining
        countdown = duration;

        //created with help from chatGPT
        const countdownInterval = setInterval(() => {
            element.innerHTML = countdown;
            countdown--;
            if (countdown < 0) {
                clearInterval(countdownInterval);
                element.innerHTML = "Finished!"
            }

            //stop timer and reset text if countdown is stopped.
            if (!countdownOn) {
                clearInterval(countdownInterval);
                element.innerHTML = selectedStretch.stretchDuration;
                countdownButtonElement.innerHTML = "start";
            }
            //starts over if restart button is clicked. 
            countdownButtonElement.addEventListener('click', function () {
                clearInterval(countdownInterval);
            })


        }, 1000);  // 1 second intervals
    }

});
