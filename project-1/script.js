window.addEventListener("load", function () {

    console.log("page is loaded");

    const root = document.documentElement;
    let bodyParts = ['head', 'neck', 'pecs', 'delts', 'biceps', 'triceps', 'forearms', 'hands', 'abs', 'obliques', 'quads', 'adductor', 'shins', 'calves', 'feet'];

    let selectedStretch = {};  // Store data related to the currently selected stretch
    let countdown;
    for (let i = 0; i < bodyParts.length; i++) {
        interaction(i);
    }

    const countdownButtonElement = document.getElementById('countdown-button');
    countdownButtonElement.addEventListener('click', function () {
        console.log('Countdown clicked for stretch:', selectedStretch);
        if (selectedStretch.stretchDuration) {
            startCountdown(selectedStretch.stretchDuration);
        }
    });

    function interaction(index) {
        let hoveredBodyPart = bodyParts[index];
        let hoverColor = getComputedStyle(root).getPropertyValue('--' + hoveredBodyPart + '-color').trim();
        let bodyPartElementId = 'bendi-' + hoveredBodyPart;
        let bodyPartElement = document.getElementById(bodyPartElementId);
        let informationDiv = document.getElementById('information');
        let commonNameElement = document.getElementById('common-name');
        let muscleGroupElement = document.getElementById('muscle-group');
        let stretchNameElement = document.getElementById('stretch-name');
        let stretchDescriptionElement = document.getElementById('stretch-description');
        let stretchDurationElement = document.getElementById('stretch-duration');
        

        if (bodyPartElement) {
            bodyPartElement.style.fill = "white";

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

            bodyPartElement.addEventListener('mouseout', function () {
                bodyPartElement.style.fill = "white";
                commonNameElement.innerHTML = "";
                commonNameElement.style.backgroundColor = "white";
            });

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

                        informationDiv.style.visibility = 'visible';
                        muscleGroupElement.innerHTML = selectedStretch.muscleGroup;
                        stretchNameElement.innerHTML = selectedStretch.stretchName;
                        stretchDescriptionElement.innerHTML = selectedStretch.stretchDescription;
                        stretchDurationElement.innerHTML = selectedStretch.stretchDuration;
                    });
            });
        } else {
            console.error("Element with ID " + bodyPartElementId + " not found!");
        }
    }

    function startCountdown(duration) {
        console.log(`Starting countdown for ${duration} seconds`);
        // Example countdown logic
        let countdownInterval = 0;
        clearInterval(countdownInterval);
        countdown = duration;
        countdownInterval = setInterval(() => {
            let countdownElement = document.getElementById('countdown');
            countdownElement.innerHTML =countdown;
            console.log(`Time remaining: ${countdown} seconds`);
            countdown--;
            if (countdown < 0) {
                clearInterval(countdownInterval);
                console.log("Countdown finished");
                
            }
        }, 1000);  // 1 second intervals
    }

});
