// Write your JavaScript code here!
// take planets json, get a random element and add html data to page
function setTarget(json){
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
   return;
}

// validate that all fields have a value and that the values are the correct type
function validateEntries(checklist){
     
   if (!checklist.pilotName.value || !checklist.copilotName.value || !checklist.fuelLevel.value || !checklist.cargoMass.value){
      alert('All fields are required!')
      return true;
   } else if (!Number(checklist.fuelLevel.value) || !Number(checklist.cargoMass.value) || Number(checklist.pilotName.value) || Number(checklist.copilotName.value)){
      alert('Make sure to enter valid information for each field!');
      return true;
   } else {
      return false;
   }
}

// Set therr piolot and copilot status
function setCrewStatus(checklist){
   checklist.pilotStatus.innerHTML = `Pilot ${checklist.pilotName.value} is ready for launch`;
   checklist.copilotStatus.innerHTML = `Co-pilot ${checklist.copilotName.value} is ready for launch`;
   return;
}

// Set the fuel status
function setFuelStatus(checklist){
   if (checklist.fuelLevel.value < 10000) {
      checklist.fuelStatus.innerHTML = 'Fuel level too low for launch'
      return true;
   } else {
      checklist.fuelStatus.innerHTML = 'Fuel level high enough for launch'
      return false;
   }
}

// Set the cargo mass status
function setCargoMass(checklist){
   if (checklist.cargoMass.value > 10000){
      checklist.cargoStatus.innerHTML = 'Cargo mass too high for launch'
      return true;
   } else {
      checklist.cargoStatus.innerHTML = 'Cargo mass low enough for launch'
      return false;
   }
}

function init (){

   // Store form data in an object
   const checklist = {
      form: document.querySelector("form"),
      pilotName: document.querySelector("input[name=pilotName]"),
      copilotName: document.querySelector("input[name=copilotName]"),
      fuelLevel: document.querySelector("input[name=fuelLevel]"),
      cargoMass: document.querySelector("input[name=cargoMass]"),
      pilotStatus: document.getElementById("pilotStatus"),
      copilotStatus: document.getElementById("copilotStatus"),
      fuelStatus: document.getElementById("fuelStatus"),
      cargoStatus: document.getElementById("cargoStatus"),
      launchStatus: document.getElementById("launchStatus"),
      faultyItems: document.getElementById("faultyItems")
   };

   // fetch target planets json and call setTarget function
   fetch("https://handlers.education.launchcode.org/static/planets.json").then(function(response){
      response.json().then(function(json){
         setTarget(json);
      });
   });

   // Listen for submit action
   checklist.form.addEventListener("submit", function(event){
   
      // if the entries are valid check the fuel and cargomass
   if (validateEntries(checklist)){
      event.preventDefault();
   } else {
      setCrewStatus(checklist);
      if (setFuelStatus(checklist) || setCargoMass(checklist)){
         checklist.faultyItems.style.visibility = "visible";
         checklist.launchStatus.innerHTML = 'Shuttle Not Ready for Launch'
         checklist.launchStatus.style.color = "red";
         event.preventDefault(); 
      } else {
         checklist.launchStatus.innerHTML = 'Shuttle is Ready for Launch'
         checklist.launchStatus.style.color = "green";
         checklist.faultyItems.style.visibility = "hidden";
         event.preventDefault();
      }
   }
});
}

window.onload=init;