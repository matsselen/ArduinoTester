// MIT License
// Copyright (c) 2022 Mats Selen
// ---------------------------------

//
// Main code for playing around with Arduino using the Web Serial API
//
'use strict';

// get handles to the Rx and Tx text boxes
const dataBoxTx = document.getElementById("dataBoxTx");
const dataBoxRx = document.getElementById("dataBoxRx");


// do this when the DOM is first loaded
document.addEventListener('DOMContentLoaded', () => {

  // display the version number on the browser tab
  titleText.innerHTML = "Mats Arduino Thing v" +
    currentVersion[0].toString() + "." +
    currentVersion[1].toString() + "." +
    currentVersion[2].toString();

  // Check if web-serial API is supported by this browser and show a message if its not.
  const notSupported = document.getElementById('notSupported');
  notSupported.classList.toggle('hidden', 'serial' in navigator);

  // attach event listeners to the buttons & controls on the main page
  butConnect.addEventListener('click', clickConnect);
  butDebug.addEventListener('click', clickDebug);

});

//============================================
// event handler for connect/disconnect button  
async function clickConnect() {

  // if we are already connected then disconnect
  if (port != null) {
      await disconnectAndStop();
      return;
  }

  // otherwise try connecting
  await connectAndStart();
}

// event handler for the reset button
function resetApp() {
  console.log("Reload App");
  location.reload();
}

//============================================
// event handler for the debug button  
async function clickDebug() {
  console.log("Debug button clicked (put breakpoint in clickDebug function at the bottom of main.js)");
}




