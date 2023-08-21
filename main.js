var lifts;
var floors;
const form = document.getElementById("form");
const LiftInput = document.getElementById("liftInput");
const FloorInput = document.getElementById("floorInput");

function FormSubmit(event){
  event.preventDefault();
  lifts = parseInt(LiftInput.value);
  floors = parseInt(FloorInput.value);

  window.location.href = `sim.html?lifts=${lifts}&floors=${floors}`;
 
}

form.addEventListener("submit", FormSubmit);