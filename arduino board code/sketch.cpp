
// 8-bit variables
byte counter;
byte inByte;

// long variables
unsigned long msLast;           // time of the last loop
unsigned long msNow;            // time of this loop
unsigned long msLength = 1000;  // teh lengt of time between toggling the LED

// logic variables
bool onLED = false; // keep track if the LED is on or off

void setup() {
  // initialize digital pin LED_BUILTIN as an output.
  pinMode(LED_BUILTIN, OUTPUT);

  // set up the serial port communication
  Serial.begin(115200);
  Serial.print("setup test\n");

  counter = 0;      // number of times thoug
  msNow = millis(); 
  msLast = msNow;

  digitalWrite(LED_BUILTIN, HIGH);
  onLED = true; 

}

void loop() {

  // number of milliseconds since the program started (i.e. "now")
  msNow = millis(); 

  // see of its time to toggle the LED
  if ((msNow - msLast) > msLength) {
    toggleLED();
    msLast = msNow;
    counter++;
    Serial.write(counter);
  }


  // see if there is any data available to read on the serial port
  if (Serial.available() > 0) {
    // read the incoming byte:
    inByte = Serial.read();
    Serial.write(inByte);
  }

}

// this function toggles the LED status (on->off or off->on)
void toggleLED() {
  if(onLED) {
    digitalWrite(LED_BUILTIN, LOW);
    onLED = false;
  } else {
    digitalWrite(LED_BUILTIN, HIGH);
    onLED = true;    
  }
}
