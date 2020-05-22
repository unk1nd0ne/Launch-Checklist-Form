// Write your JavaScript code here!
function init (){
   let form = document.querySelector("form");
   let pilotName = document.querySelector("input[name=pilotName]");
   let copilotName = document.querySelector("input[name=copilotName]");
   let fuelLevel = document.querySelector("input[name=fuelLevel]");
   let cargoMass = document.querySelector("input[name=cargoMass]")
   let pilotStatus = document.getElementById("pilotStatus");
   let copilotStatus = document.getElementById("copilotStatus");
   let fuelStatus = document.getElementById("fuelStatus");
   let cargoStatus = document.getElementById("cargoStatus");
   let launchStatus = document.getElementById("launchStatus");
   let faultyItems = document.getElementById("faultyItems");

   fetch("https://handlers.education.launchcode.org/static/planets.json").then(function(response){
      response.json().then(function(json){
         let missionTarget = document.getElementById("missionTarget");
         let target = json[Math.floor(Math.random() * json.length)];
         missionTarget.innerHTML = `
      <h2>Mission Destination</h2>
         <ol>
            <li>Name: ${target.name}</li>
            <li>Diameter: ${target.diameter}</li>
            <li>Star: ${target.star}</li>
            <li>Distance from Earth: ${target.distance}</li>
            <li>Number of Moons: ${target.moons}</li>
         </ol>
      <img src="${target.image}">
   `;
      });
   });

   form.addEventListener("submit", function(event){
   
   if (!pilotName.value || !copilotName.value || !fuelLevel.value || !cargoMass.value){
      alert('All fields are required!')
      event.preventDefault();
   } else if (!Number(fuelLevel.value) || !Number(cargoMass.value) || Number(pilotName.value) || Number(copilotName.value)){
      alert('Make sure to enter valid information for each field!');
      event.preventDefault();
   } else {
   
      pilotStatus.innerHTML = `Pilot ${pilotName.value} is ready for launch`;
      copilotStatus.innerHTML = `Co-pilot ${copilotName.value} is ready for launch`;
      if (fuelLevel.value < 10000 || cargoMass.value > 10000){
         faultyItems.style.visibility = "visible";
         launchStatus.innerHTML = 'Shuttle Not Ready for Launch'
         launchStatus.style.color = "red";
         event.preventDefault();

         if (fuelLevel.value < 10000) {
            fuelStatus.innerHTML = 'Fuel level too low for launch'
         }
         if (cargoMass.value > 10000){
            cargoStatus.innerHTML = 'Cargo mass too high for launch'
         } 
      } else {
         launchStatus.innerHTML = 'Shuttle is Ready for Launch'
         launchStatus.style.color = "green";
         event.preventDefault();
      }
   }
});
}

window.onload=init;