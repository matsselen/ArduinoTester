// MIT License
// Copyright (c) 2021 Mats Selen
// ---------------------------------

'use strict';


//============================================================================
// connect to the serial port, set up the writer and reader, and start reading
async function connectAndStart() {

    // Request a serial port so we can open a connection to an Arduino device. 
    try {
        port = await navigator.serial.requestPort({ filters: [{ usbVendorId: 0x2341 }] });
    } catch (e) {
        console.log("No port selected - returning");
        return false;
    }

    // Open the serial port
    console.log("Opening port");
    try {
        await port.open({ baudRate: 115200, baudrate: 115200 });
        // yes - you need both if you want it to run on Chromebooks
    } catch (e) {
        alert(
            "Failed to establish connection to the port: " +
            "make sure that your computer user has access to the IOLab dongle."
        );
        return false;
    }

    // Create a reader and a writer for this port
    writer = port.writable.getWriter();
    reader = port.readable.getReader();
    serialConnected = true;

    // update the UI
    updateSystemState();

    // Launch the reading loop. This runs forever (until the serial port is disconnected).
    await readLoop();

    // If we leave the read loop it must be all over
    console.log("Elvis has left the building")

}

//=================================================================
// Disconnect from the serial port and stop reading and processing
async function disconnectAndStop() {
    console.log("Entering disconnectAndStop()");

    writer.releaseLock();
    try {
        await reader.cancel();
    } catch {
        console.log("error canceling the reader");
    }

    // close the serial port & clean up a bit
    await port.close();

    // reset control variables 
    port = null;
    reader = null;
    writer = null;
    serialConnected = false;

    // update the UI
    updateSystemState();


}

//=======================================================
// Read any data records that arrive via the serial port 
// and add these to the rxdata array.
async function readLoop() {

    while (port != null) {

        try {
            const { value, done } = await reader.read();

            if (value) {
                // save received data rxdata list
                for (let i = 0; i < value.length; i++) {
                    rxdata[writePointer++] = value[i];
                    console.log(value[i]);
                }
                
                // write Rx records to Rx box 
                dataBoxRx.innerHTML += value + '\n'; 

            }

            if (done) {
                console.log('Releasing the reader');
                reader.releaseLock();
                return;
            }

        } catch (e) {
            console.log("Error fetching data in readLoop");
        }
    }
}

//============================================
// send a byte array to the serial port
async function sendRecord(byteArray) {
    if (port != null) {
        dataBoxTx.innerHTML += byteArray + '\n';
        console.log(byteArray);
        
    } else {
        console.log("sendRecord: serial port is not open");
    }
}


//===============================================
// update the look and content of the UI based on 
// the state of the data acquisition system
function updateSystemState() {


  if (serialConnected) {
    connectImg.src = "images/release.PNG";
  } else {
    connectImg.src = "images/connect.PNG";

  }

}