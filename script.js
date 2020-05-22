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
form.addEventListener("submit", function(event){
   //alert(pilotName);
   if (!pilotName.value || !copilotName.value || !fuelLevel.value || !cargoMass.value){
      alert('Please fill out all fields!')
      event.preventDefault();
   } else if (!Number(fuelLevel.value) || !Number(fuelLevel.value)){
      alert('Fuel Level and Cargo Mass must be numbers!');
      event.preventDefault();
   }
   event.preventDefault();
   
   pilotStatus.innerHTML = `Pilot ${pilotName.value} is ready for launch`;
   copilotStatus.innerHTML = `Co-pilot ${copilotName.value} is ready for launch`;
   if (fuelLevel.value < 10000) {
      faultyItems.style.visibility = "visible";
      launchStatus.innerHTML = 'Shuttle Not Ready for Launch'
      launchStatus.style.color = "red";
      fuelStatus.innerHTML = 'Fuel level too low for launch'
   }
   if (cargoMass.value > 10000){
      faultyItems.style.visibility = "visible";
      launchStatus.innerHTML = 'Shuttle Not Ready for Launch'
      launchStatus.style.color = "red";
      cargoStatus.innerHTML = 'Cargo mass too high for launch'


   }
});
}
/* This block of code shows how to format the HTML once you fetch some planetary JSON!
<h2>Mission Destination</h2>
<ol>
   <li>Name: ${}</li>
   <li>Diameter: ${}</li>
   <li>Star: ${}</li>
   <li>Distance from Earth: ${}</li>
   <li>Number of Moons: ${}</li>
</ol>
<img src="${}">
*/
window.onload=init;