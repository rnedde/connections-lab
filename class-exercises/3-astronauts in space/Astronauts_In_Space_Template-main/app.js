console.log("page is loading");

//1. Make sure the page loads first
window.addEventListener('load', function () {
    console.log("page has loaded");

    //2. Request data
    fetch('http://api.open-notify.org/astros.json')
        .then(function (response) {
            //3. Then get the status of the request
            console.log(response);
            return response.json();
        })

        //4. Then access the data
        .then(function (data) {
            // console.log(data);
            let astroNumber = data.number;
            let astronauts = data.people;

            //5. Do something with the data
            // console.log(astroNumber);
            // console.log(astronauts);
            //add the number to the page;
            let numberPar = document.createElement('p');
            numberPar.innerHTML = astroNumber;

            //append number par to html
            let containerSection = document.querySelector('section');
            containerSection.appendChild(numberPar);

            //add styling to the number
            numberPar.setAttribute('class', 'astronaut_number');

            //add the astronaut names
            for(let i=0; i<astronauts.length; i++){
                let astronaut = (astronauts[i].name);

                //create a new span element for each astronaut
                let astroSpan = document.createElement('span');
                astroSpan.innerHTML = astronaut;

                //attach to the same container
                containerSection.appendChild(astroSpan);

                astroSpan.setAttribute('class', 'astronaut_name');
            }
        }

        )
        .catch(function(error){
            console.log(error);
        })

})


