export const MATERIALS = [
  "A pre-soldered Arduino Nano (offbrand boards may not be compatible with this project)",
  "A pre-soldered 16x2 Alphanumeric LCD",
  "A computer with the Arduino IDE installed.",
  "A USB-C data cable to connect the Arduino Nano (USB-C) to your computer.",
  "25 jumper wires",
  "3 top actuated tactile switches.",
  "1 10k Multi-Turn Precision 25 Turn Potentiometer",
  "1 1k resistor",
];

export const ARDUINO_CODE = `#include <LiquidCrystal.h>

LiquidCrystal lcd(12, 11, 10, 9, 8, 7);
const int startPin = 3, stopPin = 4, lapPin = 5;
unsigned long elapsedMilliseconds = 0, lastUpdateTime = 0, lapMilliseconds = 0;
bool isRunning = false, hasLap = false, hasStarted = false;
int lastStartButtonState = HIGH, lastStopButtonState = HIGH, lastLapButtonState = HIGH;

byte playChar[8] = {B00000, B10000, B11100, B11111, B11111, B11100, B10000, B00000};
byte pauseChar[8] = {B00000, B11011, B11011, B11011, B11011, B11011, B11011, B00000};
byte idleChar[8] = {B00000, B00000, B01110, B01010, B01010, B01110, B00000, B00000};

void printTwoDigits(int value) { if (value < 10) lcd.print('0'); lcd.print(value); }

void printTime(unsigned long milliseconds) {
  unsigned long totalSeconds = milliseconds / 1000;
  int hours = totalSeconds / 3600, minutes = (totalSeconds % 3600) / 60, seconds = totalSeconds % 60;
  printTwoDigits(hours); lcd.print(':'); printTwoDigits(minutes); lcd.print(':'); printTwoDigits(seconds);
}

void drawTopRow() {
  lcd.setCursor(0, 0);
  if (isRunning) lcd.write(byte(0)); else if (hasStarted) lcd.write(byte(1)); else lcd.write(byte(2));
  lcd.setCursor(2, 0); lcd.print("TIME: "); printTime(elapsedMilliseconds);
}

void drawBottomRow() {
  lcd.setCursor(0, 1);
  if (hasLap) { lcd.print("  LAP "); printTime(lapMilliseconds); lcd.print("   "); }
  else if (!hasStarted || isRunning) lcd.print("                ");
  else lcd.print("     PAUSED     ");
}

void resetStopwatch() { elapsedMilliseconds = 0; lapMilliseconds = 0; isRunning = false; hasLap = false; hasStarted = false; lastUpdateTime = millis(); }
void captureLap() { lapMilliseconds = elapsedMilliseconds; hasLap = true; }

void toggleStartStop() {
  if (isRunning) isRunning = false;
  else { isRunning = true; hasStarted = true; lastUpdateTime = millis(); }
}

void handleButtons() {
  int startButtonState = digitalRead(startPin), stopButtonState = digitalRead(stopPin), lapButtonState = digitalRead(lapPin);
  if (startButtonState == LOW && lastStartButtonState == HIGH) toggleStartStop();
  if (stopButtonState == LOW && lastStopButtonState == HIGH) resetStopwatch();
  if (lapButtonState == LOW && lastLapButtonState == HIGH) captureLap();
  lastStartButtonState = startButtonState; lastStopButtonState = stopButtonState; lastLapButtonState = lapButtonState;
}

void updateStopwatch() {
  if (!isRunning) return;
  unsigned long currentTime = millis();
  elapsedMilliseconds += currentTime - lastUpdateTime;
  lastUpdateTime = currentTime;
}

void setup() {
  lcd.begin(16, 2); lcd.createChar(0, playChar); lcd.createChar(1, pauseChar); lcd.createChar(2, idleChar);
  pinMode(startPin, INPUT_PULLUP); pinMode(stopPin, INPUT_PULLUP); pinMode(lapPin, INPUT_PULLUP);
  resetStopwatch(); drawTopRow(); drawBottomRow();
}

void loop() { handleButtons(); updateStopwatch(); drawTopRow(); drawBottomRow(); }`;

export const SECTIONS = [
  {
    id: "top",
    sidebarLabel: "Overview",
    title: "",
    type: "none"
  },
  {
    id: "materials",
    sidebarLabel: "Before You Start",
    kicker: "Before You Start",
    title: "Gather your materials",
    intro: "Before starting these instructions, you should have:",
    type: "checklist",
    items: MATERIALS,
  },
  {
    id: "step1",
    sidebarLabel: "Step 1 — Power & Ground",
    kicker: "Step 1",
    title: "Setting up Power and Ground for the board",
    intro: "This section will require 4 jumper wires. 2 for power, 2 for ground.",
    type: "callout",
    items: [
      {
        header: "Connecting Nano to Power",
        body: "Wire 1 wire from 5v on the nano (i, 58) to the + bus. This ensures that the nano gives power to anything that is connected to the + bus.",
      },
      {
        header: "Connecting Nano to Ground",
        body: "Wire 1 wire from GND on the nano (i, 60) to the - bus. This grounds the - bus and anything connected to it will be grounded.",
      },
      {
        header: "Bridging power across the busses",
        body: "On the far end of the bread board, plug 1 wire into both + ends of the bread board. It should span across to connect the 2 buses. This provides power to the other bus of the bread board that is not directly connected to the nano’s 5v power.",
      },
      {
        header: "Bridging ground across the busses",
        body: "Also on the far end of the bread board, plug 1 wire into both - ends of the bread board. It should span across to connect the 2 buses. This grounds the other bus of the bread board that is not directly connected to the nano’s ground.",
      },
    ],
    image: "/google-docs-image.png",
  },
  {
    id: "step2",
    sidebarLabel: "Step 2 — LCD Screen",
    kicker: "Step 2",
    title: "Powering and Connecting the LCD Screen to the Arduino Nano",
    intro: "For the LCD Screen to function at all, it must be powered. This can be done by using the power and ground buses set up previously.",
    type: "composite",
    content: [
      {
        type: "callout",
        items: [
          { body: "Connect the VSS pin on the LCD Screen to the ground (negative/blue) bus on the breadboard." },
          { body: "Connect the VDD pin on the LCD Screen to the power (positive/red) bus on the breadboard" },
          { body: "Then, connect both the V_o pin and the K pin on the LCD Screen to the ground bus." },
          { body: "The last step is to connect the A pin on the LCD Screen to a 1k Ohm resistor and connect the other end of the resistor to the power bus using another jumper wire." },
        ],
      },
      { type: "text", body: "It should look something like this…" },
      { type: "image", src: "/google-docs-image (1).png", alt: "Partial LCD wiring" },
      { type: "text", body: "In order to connect the LCD Screen to the Arduino Nano, 6 jumper wires will be used. It is recommended that each of these jumper wires are different colors, if that is not possible, alternating colors works as well. Keeping same colored wires apart makes it much easier to keep track of which wire goes to which pin between the various components and debug." },
      { type: "text", body: "The order of the pins is very important, ensure that the pins you have connected match the code exactly. Your connections can be verified using the wiring diagram below." },
      {
        type: "callout",
        items: [
          { body: "Using jumper wires, connect pin D12 on the Arduino to pin RS on the LCD Screen." },
          { body: "Then connect D11 to pin E on the LCD." },
          { body: "Next connect D10 on the Arduino to D4 on the LCD." },
          { body: "Fourth, connect D9 on the Arduino to D5 on the LCD." },
          { body: "After, connect pin D8 on the Arduino to pin D6 on the LCD." },
          { body: "And lastly, connect pin D7 on theArduino to pin D7 on the LCD." },
        ],
      },
      { type: "text", body: "This completes the connection between the Arduino and the LCD Screen and they can now communicate." },
      { type: "image", src: "/google-docs-image (2).png", alt: "Full LCD wiring diagram" },
    ],
  },
  {
    id: "step3",
    sidebarLabel: "Step 3 — Potentiometer",
    kicker: "Step 3",
    title: "Connecting the Potentiometer to the LCD screen.",
    intro: "A potentiometer is an electrical component that allows for us to adjust the voltage going through it. By turning the potentiometer, the voltage is adjusted. We are going to use a potentiometer to change the brightness of the LCD screen.",
    type: "composite",
    content: [
      { type: "text", body: "The first step is to place the potentiometer into the board. If you look at the bottom of the potentiometer, you will see 3 metal wires coming out of it. On one side there will be two wires, and the other there will be 1. Hold the potentiometer with the wires on the bottom and the side with one wire facing away with you. The wire on the front left connects to the input voltage; this will be called the “input pin”. The wire on the front right connects to ground. This will be called the “ground pin”. The wire on the back will output some voltage between these two depending on how you turn the dial on the top. This will be called the “wiper pin”" },
      { type: "text", body: "To place the potentiometer in the circuit, go through the following instructions:" },
      {
        type: "callout",
        items: [
          { body: "Place the wiper pin in E11" },
          { body: "Place the output pin in F12" },
          { body: "Place the input pin in F10" },
        ],
      },
      { type: "text", body: "Now that the potentiometer is in its place, the next step is to connect the pins to what they’re supposed to connect to." },
      {
        type: "callout",
        items: [
          { body: "The wiper pin needs to connect to the LCD screen to control the brightness. Connect a wire from D11 to pin Vo on the Arduino" },
          { body: "The input pin needs to connect to the input voltage we are working with. Connect a wire from G10 to any spot on the + bus (red)" },
          { body: "The output pin needs to connect to the ground voltage we are working with. Connect a wire from G12 to any spot on the - bus (blue)" },
        ],
      },
      { type: "text", body: "The LCD screen should now be able to change brightness by turning the potentiometer. You can test this by turning on the arduino and then turning the potentiometer back and forth. As you do this you should see white squares appear and disappear on the screen. Once this is working, the next step is to connect the buttons to actually make the screen react to those inputs." },
      { type: "image", src: "/google-docs-image (3).png", alt: "Potentiometer wiring diagram" },
    ],
  },
  {
    id: "step4",
    sidebarLabel: "Step 4 — Buttons",
    kicker: "Step 4",
    title: "Setting up the input buttons",
    intro: "The buttons are like gates that will allow a signal through to the Arduino when the user would like to alter the state of the clock. The pre-written code will interpret this input for you, but your job is to provide the buttons with power and direct it to the correct pins.",
    type: "composite",
    content: [
      { type: "text", body: "The first button is the start/stop button and will be connected to Arduino pin 3." },
      {
        type: "callout",
        items: [
          { body: "Place a button in E15, F15, E17, and F17 spanning over the gap in the breadboard. Connect the top end (row 15) to ground, bringing a wire from the negative bus to row 15 (I15 in this example)." },
          { body: "Now that the button is grounded, connect it to the Arduino input pin labeled D3 by bringing a wire from the button at G17 to the Arduino at C54." },
        ],
      },
      { type: "text", body: "The second button is the reset button and will be connected to Arduino pin 4" },
      {
        type: "callout",
        items: [
          { body: "Place a button in E18, F18, E20, and F20 spanning over the gap in the breadboard. Connect the top end (row 18) to ground, bringing a wire from the negative bus to row 18 (I18 in this example)." },
          { body: "Now that the button is grounded, connect it to the Arduino input pin labeled D4 by bringing a wire from the button at G20 to the Arduino at C55." },
        ],
      },
      { type: "text", body: "The third button is the lap button and will be connected to Arduino pin 5" },
      {
        type: "callout",
        items: [
          { body: "Place a button in E21, F21, E23, and F23 spanning over the gap in the breadboard. Connect the top end (row 21) to ground, bringing a wire from the negative bus to row 21 (I21 in this example)." },
          { body: "Now that the button is grounded, connect it to the Arduino input pin labeled D5 by bringing a wire from the button at G23 to the Arduino at C56." },
        ],
      },
      { type: "text", body: "Now, each button input is marked in a HIGH state by the Arduino. Pressing a button connects that input to ground, which changes the state to LOW. The code detects that change and treats it as a command to change the stopwatch’s state." },
      { type: "image", src: "/google-docs-image (4).png", alt: "Complete hardware build including buttons" },
    ],
  },
  {
    id: "code",
    sidebarLabel: "Step 5 — Upload Code",
    kicker: "Step 5",
    title: "Uploading code to the Arduino Nano",
    intro: "The code, or 'sketch', is the final piece that brings your hardware to life. It acts as the brain of the stopwatch, using the Arduino’s internal clock to track time and interpreting the button signals you wired in the previous step to display the results on your LCD screen.",
    type: "composite",
    content: [
      {
        type: "callout",
        id: "setup-steps",
        items: [
          { body: "Open the Arduino IDE on your computer." },
          { body: "Connect the Arduino Nano to your computer with your USB-C cable." },
          { body: "Click the ‘Select Board’ dropdown menu and select the option titled ‘Arduino Nano’." },
          { body: "Copy the code below and paste it into the Arduino IDE." },
        ],
      },
      {
        type: "code",
        items: ARDUINO_CODE,
        hint: "Scroll to see full sketch",
      },
      {
        type: "callout",
        id: "upload-steps",
        items: [
          { body: "Click the checkmark button at the top left of the screen to compile the code." },
          { body: "Click the arrow button at the top left of the screen to push the code to the Arduino." },
          { body: "Unplug the Arduino and celebrate completing the assembly!" },
        ],
      },
    ],
  },
  {
    id: "conclusion",
    sidebarLabel: "Conclusion",
    kicker: "Conclusion",
    title: "The final product",
    type: "text_block",
    content: [
      "After completing these instructions, you should have a working stopwatch!",
      "To test it, make sure it’s connected to power by plugging a usb cable into the arduino and some sort of power (a laptop, power bank, wall, etc.)",
      "Then, the LCD should light up.",
    ],
  },
];
