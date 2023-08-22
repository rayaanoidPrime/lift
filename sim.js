const urlParams = new URLSearchParams(window.location.search);
const lifts = urlParams.get("lifts");
const floors = urlParams.get("floors");

const simContainer =  document.getElementById("sim-container");

for(let i = 0 ; i<floors ; i++){
    const newFloor = document.createElement("div");
    const newUp = document.createElement("div");
    const newDown = document.createElement("div");
    const floorButtons = document.createElement('div');
    const floorFloor = document.createElement('div');

    floorButtons.classList.add('floorButtons');
    floorFloor.classList.add('floorFloor');

    newFloor.classList.add('floor');
    newFloor.setAttribute('id' , `floor-${i}`);

    newUp.classList.add('up');
    newUp.textContent = "Up";
    newDown.classList.add('down');
    newDown.textContent = "Down";

    newFloor.appendChild(floorButtons);
    newFloor.appendChild(floorFloor);
    floorButtons.appendChild(newUp);
    floorButtons.appendChild(newDown);

    simContainer.appendChild(newFloor);
}

for(let i = 0 ; i<lifts ; i++){
    const newlift = document.createElement("div");
    newlift.classList.add("lift");

    const doorL = document.createElement('div');
    const doorR = document.createElement('div');

    doorR.classList.add('door','rdoor');
    doorL.classList.add('door','ldoor');

    newlift.appendChild(doorL);
    newlift.appendChild(doorR);

    const floor = document.getElementById(`floor-${floors-1}`)
    floor.appendChild(newlift);
}


// Create an array to keep track of lift positions and states
const liftStates = Array.from({ length: lifts }, () => ({
    position: floors - 1,
    moving: false,
    doorOpen: false
}));

function pixelsToVH(pixels) {
    const viewportHeight = window.innerHeight;
    const vh = (pixels / viewportHeight) * 100;
    return vh;
}

function openDoors(lift) {
    const doors  = lift.querySelectorAll('.door')
    const rdoor = doors[1]
    const ldoor = doors[0]

    rdoor.style.transform = 'translateX(50%) scaleX(1)';
    ldoor.style.transform = 'translateX(-50%) scaleX(1)';
}

function closeDoors(lift) {
    const doors  = lift.querySelectorAll('.door')
    const rdoor = doors[1]
    const ldoor = doors[0]
    
    rdoor.style.transform = 'translateX(0%) scaleX(1)';
    ldoor.style.transform = 'translateX(0%) scaleX(1)';
}

const moveLiftUp = (liftIndex , targetFloor) =>{
    console.log(liftIndex , targetFloor);
    const lift = document.getElementsByClassName('lift')[liftIndex];
    const liftState = liftStates[liftIndex];
    const currFloor = document.getElementById(`floor-${liftState.position}`)
    const floor = document.getElementById(`floor-${targetFloor}`)
   

    const currentFloor = liftState.position;
    liftStates[liftIndex].moving = true;
    lift.classList.add('moving');

    const targetPixels = Math.abs(floors-1-targetFloor)*(-10) - pixelsToVH(2*(floors-1-targetFloor));
    lift.style.transform = `translateY(${targetPixels}vh)`;
    liftStates[liftIndex].position = targetFloor;

    const timeReq = Math.abs(currentFloor - targetFloor)*2
    lift.style.transition = `transform ${timeReq}s`;
    console.log(`${timeReq}s`)
    setTimeout(()=>{
        openDoors(lift);
        setTimeout(()=>{
            closeDoors(lift);
        },2500)
        liftStates[liftIndex].moving = false;
        lift.classList.remove('moving');
    },timeReq*1000) 
}

const moveLiftDown = (liftIndex , targetFloor) =>{
    console.log(liftIndex , targetFloor);
    const lift = document.getElementsByClassName('lift')[liftIndex];
    const liftState = liftStates[liftIndex];   

    const currentFloor = liftState.position;
    liftStates[liftIndex].moving = true;
    lift.classList.add('moving');

    const targetPixels = Math.abs(floors-1-targetFloor)*(-10) - pixelsToVH(2*(floors-1-targetFloor));
    console.log( pixelsToVH(2*(floors-1-targetFloor)))
    lift.style.transform = `translateY(${targetPixels}vh)`;
    liftStates[liftIndex].position = targetFloor;

    const timeReq = Math.abs(currentFloor - targetFloor)*2;
    lift.style.transition = `transform ${timeReq}s `;
    console.log(`${timeReq}s`)
    setTimeout(()=>{
        openDoors(lift);
        setTimeout(()=>{
            closeDoors(lift);
        },2500)
        liftStates[liftIndex].moving = false;
        lift.classList.remove('moving');
    },timeReq*1000) 
    
}

const upButtons = document.querySelectorAll(".up");
upButtons.forEach((button , floorIndex) => {
    button.addEventListener('click' , async()=>{
        let i = 0;
        for(; i <lifts ; i++){
            if(!liftStates[i].moving && liftStates[i].position > floorIndex){
                moveLiftUp(i,floorIndex);
                break;
            }
        }
    })
})

const downButtons = document.querySelectorAll(".down");
downButtons.forEach((button , floorIndex) => {
    button.addEventListener('click' , async()=>{
        let i = 0;
        for(; i <lifts ; i++){
            if(!liftStates[i].moving && liftStates[i].position < floorIndex){
                moveLiftDown(i,floorIndex);
                break;
            }
        }
    })
})