export const MATERIALS = [
  { text: "1 Arduino Nano with headers (pre-soldered)", info: "Note: off-brand boards may not be compatible with this project.", image: "/components/arduino_nano.png" },
  { text: "1 16x2 Alphanumeric LCD with headers (pre-soldered)", image: "/components/lcd.png" },
  { text: "16 short male-to-male jumper wires (10cm)", info: "Note: longer wires can be used, but they may make your breadboard look messier.", image: "/components/jumper_wires.png" },
  { text: "6 long male-to-male jumper wires (20cm)", info: "Note: longer wires can be used, but they may make your breadboard look messier.", image: "/components/jumper_wires.png" },
  { text: "3 top actuated tactile switches (buttons)", image: "/components/button.png" },
  { text: "1 10k Ohm Potentiometer (dial)", image: "/components/potentiometer.png" },
  { text: "1 1k Ohm resistor", image: "/components/resistor.png" },
  { text: "1 breadboard with 830 tie points", image: "/components/breadboard.png" },
  { text: "1 computer with the Arduino IDE installed", image: "/components/ide.png" },
  { text: "1 USB-C data cable to connect the Arduino Nano (USB-C) to your computer", image: "/components/usb_c.png" }
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

export const PARTS = [
  {
    id: "top",
    kicker: "Overview",
    sidebarLabel: "Overview",
    title: "An introduction to the project and breadboards",
    type: "composite",
    content: [
      { type: "text", body: "This guide is for beginner breadboard users to walk you through wiring and programming your first Arduino Nano stopwatch with start/stop, reset, and lap controls displayed on a 16x2 LCD. No prior experience with a breadboard, coding, or an Arduino Nano is required, but a brief understanding of how these electronics work (provided in this introduction) will help you follow along. These instructions are recommended for ages 12 and up. An image of the finished product is provided below." },
      { type: "image", src: "/finished-product.jpg", alt: "An image of the finished product, powered on and working." },
      { type: "text", body: "For more information on how the project works, click on the **‘Learn More’** tabs as you go. These tabs are optional, but help build your understanding for more complex projects in the future." },
      { type: "text", body: "This project is built on top of a breadboard. Breadboards are used to hold metal tips from wires and electronic parts. Breadboards let electricity flow from inputs, like a button or dial, to outputs, like a light or screen. The Arduino Nano encodes the users’ input into specific instructions in a way that something like an LCD (an alphanumeric screen) can understand." },
      { type: "text", body: "A diagram for your understanding is provided below." },
      { type: "image", src: "/diagrams/diagram-1.png", alt: "Labeled breadboard diagram showing coordinates and bus lines", credits: "Diagram created with Cirkit Designer™" },
      { type: "text", body: "In the top left of the diagram, notice the letter and number coordinates. Throughout these instructions, coordinates will be referred to in letter, number format. For example, see `G12` in the diagram." },
      { type: "text", body: "The long red and blue columns that run along the board are called bus lines. The red bus is for power, and the blue bus is for ground. Referring to the image above, notice that each bus line is connected all the way across, so you can connect to it anywhere. To be safe, it is recommended that you take extra care to use the correct bus when connecting your parts." },
      { type: "text", body: "Your task for now is to connect the wires and components in such a way that all the components receive power and are hooked up to the right pins (pins are labeled on components such as the Arduino Nano and LCD). Read the diagrams and steps carefully to make sure everything is placed on the board correctly." },
      {
        type: "info",
        header: "Learn More: Breadboard Connections",
        items: [
          { body: "A bus line is a continuous strip of metal that shares current. This is why it doesn’t matter where on the bus you connect a wire as long as it’s connected to the right bus. Similarly, any given row is also connected (for example, `A1`, `B1`, `C1`, `D1`, and `E1` are connected; and `F1`, `G1`, `H1`, `I1`, and `J1` are connected). See the black lines representing row connections on the right of the diagram above. This means that any wires or parts placed in the same connected row will be connected to each other." }
        ],
      }
    ],
  },
  {
    id: "materials",
    kicker: "Materials",
    sidebarLabel: "Materials",
    title: "Gather your materials",
    intro: "Before starting these instructions, you should have:",
    type: "checklist",
    items: MATERIALS,
  },
  {
    id: "part1",
    sidebarLabel: "Part 1 — Power & Ground",
    kicker: "Part 1",
    title: "Setting up power and ground for the board",
    materials: "This section will require **1 Arduino Nano**, **1 breadboard**, and **2 short jumper wires**.",
    type: "composite",
    content: [
      { type: "text", body: "After completing the steps below, your board should look like this:" },
      { type: "image", src: "/diagrams/diagram-2.png", alt: "Power and Ground wiring", credits: "Diagram created with Cirkit Designer™" },
      { type: "text", body: "This section will walk you through how to connect the Arduino Nano to the breadboard, then power and ground the board through the Nano so that all the electronics are properly powered when you connect them in later steps." },
      {
        type: "info",
        header: "Learn More: Power and Ground Buses",
        items: [
          { body: "When you connect the Nano to the power bus, that means that anything that’s connected on the bus will be connected to the Nano and thus be powered by the 5V connection. Similarly, anything that’s connected on the ground bus will be connected to the Nano’s ground pin." }
        ],
      },
      {
        type: "callout",
        variant: "warning",
        items: [{ body: "Sometimes it is difficult to see the pins on the Nano. Ensure that the pins are aligned with the correct coordinates, not the edges of the board itself." }]
      },
      {
        type: "callout",
        items: [
          { body: "**Nano to Breadboard:** Take the Nano and ensure it’s placed so that its VIN pin is inserted in the breadboard `H49`, the TX1 pin into `D49`, the D13 pin into `H63`, and the D12 pin into `D63`." },
          { body: "**Nano to Power:** Connect `I52` and the power (positive/red) bus with a short wire. This connects the power (positive/red) bus to the Nano’s 5V pin, powering anything connected to the bus." },
          { body: "**Nano to Ground:** Connect `I50` and the ground (negative/blue) bus with a short wire. This connects the ground (negative/blue) bus to the Nano’s GND pin, grounding anything connected to the bus." }
        ],
      }
    ],
  },
  {
    id: "part2",
    sidebarLabel: "Part 2 — Powering LCD",
    kicker: "Part 2",
    title: "Powering the LCD screen",
    materials: "This section will require **1 LCD screen**, **5 short jumper wires**, and **1 1k Ohm resistor**.",
    type: "composite",
    content: [
      { type: "text", body: "After completing the steps below, your board should look like this:" },
      { type: "image", src: "/diagrams/diagram-3.png", alt: "LCD Powering diagram", credits: "Diagram created with Cirkit Designer™" },
      {
        type: "callout",
        variant: "warning",
        items: [{ body: "Sometimes it is difficult to see the pins on the LCD. Ensure that the pins are aligned with the correct coordinates, not the edges of the LCD screen." }]
      },
      { type: "text", body: "To set up the LCD screen you must first connect it to the breadboard." },
      {
        type: "callout",
        items: [
          { body: "**LCD Orientation:** Orient the LCD screen in your hand so that the screen is facing towards you and the pins and their corresponding labels are furthest from your body." },
          { body: "**LCD to Breadboard:** With the LCD correctly oriented in your hand, find the leftmost pin labeled VSS, and insert it into `A26`. Keeping the LCD screen parallel to the buses on the breadboard nearest you, the rest of the pins on the LCD should fit into their correct places as you place VSS into `A26`." },
        ],
      },
      { type: "text", body: "For the LCD screen to function, it must be powered. This can be done by using the power and ground buses set up previously to provide backlight so text and displays can be seen clearly." },
      {
        type: "callout",
        items: [
          { body: "**LCD to Power:** Connect `C27` and the power (positive/red) bus with a short wire. This connects the VDD pin on the LCD to power." },
          { body: "**LCD to Ground:** Connect `C26` and the ground (negative/blue) bus with a short wire. This connects the VSS pin on the LCD to ground." },
          { body: "**Backlight to Ground 1:** Connect `C30` and the ground (negative/blue) bus with a short wire. This connects the RW pin on the LCD to ground." },
          { body: "**Backlight to Ground 2:** Connect `C41` and the ground (negative/blue) bus with a short wire. This connects the K pin on the LCD to ground." },
          { body: "**Backlight to Power:** Connect `C40` to `G40` using a 1k Ohm resistor. Then connect `H40` to the power (positive/red) bus with a short wire. This connects the A pin on the LCD providing power for the backlight so the display can be seen." },
        ],
      }
    ],
  },
  {
    id: "part3",
    sidebarLabel: "Part 3 — Connecting LCD",
    kicker: "Part 3",
    title: "Connecting the LCD screen to the Arduino Nano",
    materials: "This section will require **4 short jumper wires** and **2 long jumper wires**.",
    type: "composite",
    content: [
      { type: "text", body: "After completing the steps below, your board should look like this:" },
      { type: "image", src: "/diagrams/diagram-4.png", alt: "LCD Data wiring diagram", credits: "Diagram created with Cirkit Designer™" },
      { type: "text", body: "In order to connect the LCD screen to the Arduino Nano, 6 jumper wires will be used. It is recommended that each of these jumper wires are different colors. If using different colors is not possible, alternating colors works as well. Keeping same colored wires apart makes it much easier to keep track of which wire goes to which pin between the various components." },
      {
        type: "callout",
        variant: "warning",
        items: [
          { body: "The order of the pins is very important: ensure that the pins you have connected match the coordinates exactly. Your connections can be verified using the wiring diagram above." }
        ],
      },
      {
        type: "callout",
        items: [
          { body: "**RS to Nano:** Connect `C29` and `C63` with a long wire. This connects the RS pin on the LCD to pin D12 on the Nano." },
          { body: "**E to Nano:** Connect `C31` to `C62` with a long wire. This connects the E pin on the LCD to pin D11 on the Nano." },
          { body: "**D4 to Nano:** Connect `C36` and `C61` with a short wire. This connects the D4 pin on the LCD to pin D10 on the Nano." },
          { body: "**D5 to Nano:** Connect `C37` and `C60` with a short wire. This connects the D5 pin on the LCD to pin D9 on the Nano." },
          { body: "**D6 to Nano:** Connect `C38` and `C59` with a short wire. This connects the D6 pin on the LCD to pin D8 on the Nano." },
          { body: "**D7 to Nano:** Connect `C39` and `C58` with a short wire. This connects the D7 pin on the LCD to pin D7 on the Nano." }
        ],
      },
      { type: "text", body: "This completes the connection between the Nano and the LCD screen and they can now communicate." }
    ],
  },
  {
    id: "part4",
    sidebarLabel: "Part 4 — Potentiometer",
    kicker: "Part 4",
    title: "Connecting the potentiometer to the LCD screen.",
    materials: "This section will require **1 10k Ohm Potentiometer (dial)**, **2 short jumper wires**, and **1 long jumper wire**.",
    type: "composite",
    content: [
      { type: "text", body: "After completing the steps below, your board should look like this:" },
      { type: "image", src: "/diagrams/diagram-5.png", alt: "Potentiometer wiring diagram", credits: "Diagram created with Cirkit Designer™" },
      {
        type: "info",
        header: "Learn More: Potentiometers",
        items: [
          { body: "A potentiometer is an electrical component that allows for us to adjust the voltage going through it. By turning the potentiometer, the voltage is adjusted. You will use a potentiometer to change the brightness of the LCD screen." }
        ]
      },
      { type: "text", body: "The first step is connecting the potentiometer to the board. If you look at the bottom of the potentiometer, you will see 3 metal wires coming out of it. On one side there will be two wires, and the other there will be 1. Hold the potentiometer with the wires on the bottom and the side with one wire facing away from you. The wire on the front left connects to the input voltage; this will be called the “input pin”. The wire on the front right connects to ground. This will be called the “ground pin”. The wire on the back will output some voltage between these two depending on how you turn the dial on the top. This will be called the “wiper pin”." },
      {
        type: "callout",
        items: [
          { body: "**Potentiometer to Breadboard:** Place the wiper pin in `E2`, the ground pin in `F1`, and the input pin in `F3`." },
        ],
      },
      { type: "text", body: "Now that the potentiometer is connected to the board, the next steps connect the pins to the power bus, ground bus, and LCD." },
      {
        type: "callout",
        items: [
          { body: "**Potentiometer to LCD:** Connect `D2` and `C28` with a long wire. This connects the VO pin on the LCD to the wiper pin to control brightness." },
          { body: "**Potentiometer to Power:** Connect `G3` and the power (positive/red) bus with a short wire. This connects the input pin to the input voltage you are working with." },
          { body: "**Potentiometer to Ground:** Connect `G1` and the ground (negative/blue) bus with a short wire. This connects the ground pin to the ground voltage you are working with." },
        ],
      }
    ],
  },
  {
    id: "part5",
    sidebarLabel: "Part 5 — Buttons",
    kicker: "Part 5",
    title: "Setting up the input buttons",
    materials: "This section will require **3 tactile switches (buttons)**, **3 short jumper wires**, and **3 long jumper wires**.",
    type: "composite",
    content: [
      { type: "text", body: "After completing the steps below, your board should look like this:" },
      { type: "image", src: "/diagrams/diagram-6.png", alt: "Complete build diagram", credits: "Diagram created with Cirkit Designer™" },
      { type: "text", body: "The buttons are like gates that will allow a signal through to the Arduino Nano when the user would like to interact with the stopwatch. The provided code handles these signals, so you just need to connect each button to the correct pins." },
      {
        type: "info",
        header: "Learn More: Button Signals",
        items: [
          { body: "The Arduino Nano keeps track of a state for each button. To start, each button input is marked in a HIGH state. Pressing a button connects that input to ground, which sends a signal to change the state to LOW. The code detects that change and calls code to make the stopwatch complete the associated action." }
        ]
      },
      { type: "text", body: "The first button is the start/stop button and will be connected to pin D3 on the Nano." },
      {
        type: "callout",
        items: [
          { body: "**Start/Stop Button to Breadboard:** Place a button in `E9`, `F9`, `E11`, and `F11` so that it spans over the gap in the breadboard." },
          { body: "**Start/Stop Button to Ground:** Connect `G9` and the ground (negative/blue) bus with a short wire. This will complete the button’s connection to ground when the button is pressed." },
          { body: "**Start/Stop Button to Nano:** Connect `G11` to `C54` with a long wire. This connects the button’s input to pin D3 on the Nano." }
        ],
      },
      { type: "text", body: "The second button is the reset button and will be connected to pin D4 on the Nano." },
      {
        type: "callout",
        items: [
          { body: "**Reset Button to Breadboard:** Place a button in `E14`, `F14`, `E16`, and `F16` so that it spans over the gap in the breadboard." },
          { body: "**Reset Button to Ground:** Connect `G14` and the ground (negative/blue) bus with a short wire. This will complete the button’s connection to ground when the button is pressed." },
          { body: "**Reset Button to Nano:** Connect `G16` to `C55` with a long wire. This connects the button’s input to pin D4 on the Nano." }
        ],
      },
      { type: "text", body: "The third button is the lap button and will be connected to pin D5 on the Nano." },
      {
        type: "callout",
        items: [
          { body: "**Lap Button to Breadboard:** Place a button in `E19`, `F19`, `E21`, and `F21` so that it spans over the gap in the breadboard." },
          { body: "**Lap Button to Ground:** Connect `G19` and the ground (negative/blue) bus with a short wire. This will complete the button’s connection to ground when the button is pressed." },
          { body: "**Lap Button to Nano:** Connect `G21` to `C56` with a long wire. This connects the button’s input to pin D5 on the Nano." }
        ],
      }
    ],
  },
  {
    id: "part6",
    sidebarLabel: "Part 6 — Upload Code",
    kicker: "Part 6",
    title: "Uploading code to the Arduino Nano",
    materials: "This section will require **1 computer with the Arduino IDE** and **1 USB-C data cable**.",
    intro: "The code, or 'sketch', is the final piece that brings your hardware to life. It acts as the brain of the stopwatch: it uses the Arduino Nano’s internal clock to track time, stores variables to interpret the button signals you wired in the previous section, and calls functions to display the results on your LCD screen.",
    type: "composite",
    content: [
      {
        type: "callout",
        items: [
          { body: "Connect the Nano to your computer with your USB-C cable." },
          { body: "Open the Arduino IDE on your computer." },
          { body: "Click the ‘Select Board’ dropdown menu." },
          { body: "Select the option titled ‘Arduino Nano’." },
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
        start: 6,
        items: [
          { body: "Click the checkmark button at the top left of the screen to compile the code." },
          { body: "Click the arrow button at the top left of the screen to push the code to the Nano." },
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
      "Congratulations! After following these instructions, you should now have a fully functional stopwatch!",
      "To test it all together, make sure it’s connected to power by plugging the USB-C cable into the Arduino Nano and some sort of power. The laptop used to upload the code in part 6 will work to power it. The LCD should light up and you should be able to click button one (1) to start/stop the timer, button two (2) to reset the timer, and button three (3) to add a lap.",
      "If you would like to find other similar tutorials and DIY projects with your Arduino Nano, you can refer to https://docs.arduino.cc/tutorials/",
    ],
  },
];
