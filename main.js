// MIT License
// Copyright (c) 2022 Mats Selen
// ---------------------------------

//
// Main code for playing around with Arduino using the Web Serial API
//
'use strict';

// get handles to the html text boxes so we can refer to them in the code
const dataBoxTx = document.getElementById("dataBoxTx");
const dataBoxRx = document.getElementById("dataBoxRx");
const sendBox = document.getElementById("sendBox");

// do this when the DOM is first loaded
document.addEventListener('DOMContentLoaded', () => {

  // display the version number in the title (found in the globalVariables file)
  titleText.innerHTML = "Mats Arduino Thing v" +
    currentVersion[0].toString() + "." +
    currentVersion[1].toString() + "." +
    currentVersion[2].toString();

  // Check if web-serial API is supported by this browser and show a message if its not.
  const notSupported = document.getElementById('notSupported');
  notSupported.classList.toggle('hidden', 'serial' in navigator);

  // attach event listeners to the buttons 
  butConnect.addEventListener('click', clickConnect);
  butDebug.addEventListener('click', clickDebug);
  butSendChar.addEventListener('click', clickSendChars);

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
// event handler for the Send as Characters button  
async function clickSendChars() {
  let encoder = new TextEncoder();
  var bString = encoder.encode(sendBox.value);
  sendRecord(bString);
}

//============================================
// event handler for the debug button  
async function clickDebug() {
  console.log("Debug button clicked");

  // this serves no function other than making these variables easy to look at
  let nbytes = rxdata.length;
  let ndiff = writePointer - readPointer;
}



