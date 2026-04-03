export const MATERIALS = [
  { text: "An Arduino Nano with headers (off-brand boards may not be compatible with this project)", image: "/components/arduino_nano.png" },
  { text: "A pre-soldered 16x2 Alphanumeric LCD", image: "/components/lcd.png" },
  { text: "25 Male to Male jumper wires", image: "/components/jumper_wires.png" },
  { text: "3 top actuated tactile switches (buttons)", image: "/components/button.png" },
  { text: "1 10k Multi-Turn Precision 25 Turn Potentiometer (dial)", image: "/components/potentiometer.png" },
  { text: "1 1k resistor", image: "/components/resistor.png" },
  { text: "1 bread board", image: "/components/breadboard.png" },
  { text: "A computer with the Arduino IDE installed.", image: "/components/ide.png" },
  { text: "A USB-C data cable to connect the Arduino Nano (USB-C) to your computer.", image: "/components/usb_c.png" },
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
    kicker: "Overview",
    sidebarLabel: "Overview",
    title: "An introduction to breadboards and simple electronics",
    type: "composite",
    content: [
      { type: "text", body: "This guide is for beginner breadboard users to walk you through wiring and programming your first Arduino Nano stopwatch with start/stop, reset, and lap controls displayed on a 16x2 LCD. You won’t need previous experience with a breadboard, coding, or an Arduino, but a brief understanding of how these electronics work (provided in this introduction) will be helpful to you. These instructions are recommended for ages 12 and up and is for anyone interested in learning simple electronics." },
      { type: "text", body: "A diagram for your understanding is provided below." },
      { type: "image", src: "/diagrams/diagram-1.png", alt: "Labeled breadboard diagram showing coordinates and bus lines" },
      { type: "text", body: "In the top left of the diagram above, notice the letter and number coordinates. Throughout these instructions coordinates will be referred to in letter, number format (for example, see `G12` in the diagram). The long red and blue labeled columns that stretch the full length of the board are called bus lines. The red bus is for power and the blue bus is for ground. A bus line is a continuous strip of metal that shares current and therefore, it doesn’t matter where on the bus you connect a wire as long as it’s connected to the right bus (power and ground must not be conflicted)." },
      { type: "text", body: "Similarly, a given row is also connected (`A1`, `B1`, `C1`, `D1` and `E1` are connected and separately `F1`, `G1`, `H1`, `I1` and `J1`). See the black lines representing row connections on the right of the diagram. To be safe, it is recommended that you follow the exact coordinates given in these instructions and take extra care when a bus is mentioned to connect it to the right bus." },
      { type: "text", body: "Breadboards are designed to hold metal tips of wires and other electrical components in place to distribute current to certain outputs such as a screen or LED light based on inputs such as a button or a dial. The Arduino encodes the users’ input into specific instructions in a way that something like an LCD (an alphanumeric screen) can understand. The code for this project that tells the Arduino how to do this is already provided." },
      { type: "text", body: "For more information on how the project works, read the step introductions as you go. Hopefully, this will inspire you to try more complicated projects in the future, for which, further understanding provided in those step introductions will be helpful. Your task for now however, is to connect the wires and components in such a way that all the components receive power and are hooked up to the right pins. Read the diagrams and steps carefully to make sure everything is placed on the board correctly." },
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
    title: "Setting up Power and Ground for the board",
    intro: "This section will require 1 red jumper wire for power and 1 blue jumper wire for ground.",
    type: "composite",
    content: [
      { type: "text", body: "This step will walk you through how to power and ground the board so that all the electronics are properly powered when we connect them in later steps." },
      {
        type: "callout",
        variant: "warning",
        items: [
          { body: "It’s important to note how the power and ground buses work on our bread board. When we connect the nano to the power bus, that means that anything that is also connected down the line on the bus will be connected to the Nano and thus be powered by the 5v connection." }
        ],
      },
      { type: "text", body: "Putting the Nano on the breadboard: Take the Nano and ensure it’s placed so that its VIN pin is inserted in the breadboard (`H49`), the TX1 pin into (`H35`)." },
      { type: "text", body: "Your board should look like this at the end of these steps:" },
      { type: "image", src: "/diagrams/diagram-2.png", alt: "Power and Ground wiring" },
      {
        type: "callout",
        items: [
          { body: "Connecting Nano to Power: Wire 1 wire from (`I52`), which is next to the 5v pin on the nano, to the top + (red) bus. This ensures that the nano gives power to anything that is wired to the + bus." },
          { body: "Connecting Nano to Ground: Wire 1 wire from (`I50`), next to the ground pin (GND) on the nano, to the top - (blue) bus. This grounds the - bus and anything connected to it will be grounded." }
        ],
      }
    ],
  },
  {
    id: "part2",
    sidebarLabel: "Part 2 — Powering LCD",
    kicker: "Part 2",
    title: "Powering the LCD Screen",
    intro: "To set up the LCD Screen we must first place it into the breadboard.",
    type: "composite",
    content: [
      { type: "text", body: "Orientation: Orient the LCD Screen in your hand so that the screen is facing towards you and the pins and their corresponding labels are furthest from your body." },
      { type: "text", body: "Inserting LCD into Breadboard: With the LCD correctly oriented in your hand, find the leftmost pin labeled VSS, and insert it into `A26`. Keeping the LCD Screen parallel to the buses on the breadboard nearest you, the rest of the pins on the LCD should fit into their correct places as you place VSS into `A26`." },
      { type: "text", body: "For the LCD Screen to function at all, it must be powered. This can be done by using the power and ground buses set up previously to provide backlight so text and displays can be seen clearly." },
      { type: "text", body: "Your board should look like this at the end of these steps:" },
      { type: "image", src: "/diagrams/diagram-3.png", alt: "LCD Powering diagram" },
      {
        type: "callout",
        items: [
          { body: "Connecting LCD to Power: Connect `C27` and the power (positive/red) bus with a wire. This connects the VDD pin on the LCD to power." },
          { body: "Connecting LCD to Ground: Connect `C26` and the ground (negative/blue) bus with a wire. This connects the VSS pin on the LCD to ground." },
          { body: "Backlight to Ground 1: Connect `C30` to the ground (negative/blue) bus with a wire. This connected the V0 pin on the LCD to ground." },
          { body: "Backlight to Ground 2: Connect `C41` to the ground (negative/blue) bus with a wire. This connects the K pin on the LCD to ground." },
          { body: "Backlight to Power: Connect `C40` to `G40` using a 1k Ohm resistor. Then connect `H40` to the power (positive/red) bus with a wire. This connects the A pin on the LCD providing power for the backlight so the display can be seen." },
        ],
      },
    ],
  },
  {
    id: "part3",
    sidebarLabel: "Part 3 — Connecting LCD",
    kicker: "Part 3",
    title: "Connecting the LCD Screen to the Arduino",
    intro: "In order to connect the LCD Screen to the Arduino Nano, 6 jumper wires will be used.",
    type: "composite",
    content: [
      { type: "text", body: "It is recommended that each of these jumper wires are different colors. Keeping same colored wires apart makes it much easier to keep track of which wire goes to which pin between the various components and debug. The order of the pins is very important, ensure that the pins you have connected match the code exactly. Your connections can be verified using the wiring diagram below." },
      { type: "text", body: "Your board should look like this at the end of these steps:" },
      { type: "image", src: "/diagrams/diagram-4.png", alt: "LCD Data wiring diagram" },
      {
        type: "callout",
        items: [
          { body: "Connect `C29` and `C63` with a wire. This connects the RS pin on the LCD to pin D12 on the Arduino." },
          { body: "Connect `C31` to `C62` with a wire. This connects the E pin on the LCD to pin D11 on the Arduino." },
          { body: "Connect `C36` and `C61` with a wire. This connects the D4 pin on the LCD to pin D10 on the Arduino." },
          { body: "Connect `C37` and `C60` with a wire. This connects the D5 pin on the LCD to pin D9 on the Arduino." },
          { body: "Connect `C38` and `C59` with a wire. This connects the D6 pin on the LCD to pin D8 on the Arduino." },
          { body: "Connect `C39` and `C58` with a wire. This connects the D7 pin on the LCD to pin D7 on the Arduino." },
        ],
      },
    ],
  },
  {
    id: "part4",
    sidebarLabel: "Part 4 — Potentiometer",
    kicker: "Part 4",
    title: "Connecting the Potentiometer to the LCD screen.",
    intro: "A potentiometer is an electrical component that allows for us to adjust the voltage going through it. We are going to use a potentiometer to change the brightness of the LCD screen.",
    type: "composite",
    content: [
      { type: "text", body: "The first step is to place the potentiometer into the board. Hold the potentiometer with the wires on the bottom and the side with one wire facing away with you." },
      {
        type: "callout",
        items: [
          { body: "Place the wiper pin in `E11`" },
          { body: "Place the output pin in `F12`" },
          { body: "Place the input pin in `F10`" },
        ],
      },
      { type: "text", body: "Now that the potentiometer is in its place, the next step is to connect the pins to what they’re supposed to connect to." },
      { type: "text", body: "Your board should look like this at the end of these steps:" },
      { type: "image", src: "/diagrams/diagram-5.png", alt: "Potentiometer wiring diagram" },
      {
        type: "callout",
        items: [
          { body: "The wiper pin needs to connect to the LCD screen to control the brightness. Connect a wire from `D11` to pin Vo on the Arduino." },
          { body: "The input pin needs to connect to the input voltage we are working with. Connect a wire from `G10` to any spot on the + bus (red)." },
          { body: "The output pin needs to connect to the ground voltage we are working with. Connect a wire from `G12` to any spot on the - bus (blue)." },
        ],
      },
    ],
  },
  {
    id: "part5",
    sidebarLabel: "Part 5 — Buttons",
    kicker: "Part 5",
    title: "Setting up the input buttons",
    intro: "The buttons are like gates that will allow a signal through to the Arduino when the user would like to alter the state of the clock.",
    type: "composite",
    content: [
      { type: "text", body: "The first button is the start/stop button and will be connected to Arduino pin 3." },
      { type: "text", body: "Your board should look like this at the end of these steps:" },
      { type: "image", src: "/diagrams/diagram-6.png", alt: "Complete build diagram" },
      {
        type: "callout",
        items: [
          { body: "Place a button in `E15`, `F15`, `E17`, and `F17` spanning over the gap in the breadboard. Connect the top end (row 15) to ground, bringing a wire from the negative bus to row 15 (`I15` in this example)." },
          { body: "Now that the button is grounded, connect it to the Arduino input pin labeled D3 by bringing a wire from the button at `G17` to the Arduino at `C54`." },
        ],
      },
      { type: "text", body: "The second button is the reset button and will be connected to Arduino pin 4." },
      {
        type: "callout",
        items: [
          { body: "Place a button in `E18`, `F18`, `E20`, and `F20` spanning over the gap in the breadboard. Connect the top end (row 18) to ground, bringing a wire from the negative bus to row 18 (`I18` in this example)." },
          { body: "Now that the button is grounded, connect it to the Arduino input pin labeled D4 by bringing a wire from the button at `G20` to the Arduino at `C55`." },
        ],
      },
      { type: "text", body: "The third button is the lap button and will be connected to Arduino pin 5." },
      {
        type: "callout",
        items: [
          { body: "Place a button in `E21`, `F21`, `E23`, and `F23` spanning over the gap in the breadboard. Connect the top end (row 21) to ground, bringing a wire from the negative bus to row 21 (`I21` in this example)." },
          { body: "Now that the button is grounded, connect it to the Arduino input pin labeled D5 by bringing a wire from the button at `G23` to the Arduino at `C56`." },
        ],
      },
      { type: "text", body: "Now, each button input is marked in a HIGH state by the Arduino. Pressing a button connects that input to ground, which changes the state to LOW." },
    ],
  },
  {
    id: "part6",
    sidebarLabel: "Part 6 — Upload Code",
    kicker: "Part 6",
    title: "Uploading code to the Arduino Nano",
    intro: "The code, or 'sketch', is the final piece that brings your hardware to life. It acts as the brain of the stopwatch.",
    type: "composite",
    content: [
      {
        type: "callout",
        items: [
          { body: "Open the Arduino IDE on your computer." },
          { body: "Connect the Arduino Nano to your computer with your USB-C cable." },
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
        items: [
          { body: "Click the checkmark button at the top left of the screen to compile the code." },
          { body: "Click the arrow button at the top left of the screen to push the code to the Arduino." },
          { body: "Unplug the Arduino." },
        ],
      },
    ],
  },
  {
    id: "conclusion",
    sidebarLabel: "Conclusion",
    title: "The final product",
    type: "text_block",
    content: [
      "Congratulations! After following these instructions, you should now have a fully functional stopwatch!",
      "To test it all together, make sure it’s connected to power by plugging the USB-C cable into the arduino and some sort of power. The laptop used to upload the code in step 5 will work to power it. The LCD should light up and you should be able to click button one (1) to start/stop the timer, button two (2) to reset the timer, and button three (3) to add a lap.",
      "If you would like to find other similar tutorials and DIY projects with your Arduino Nano, you can refer to https://docs.arduino.cc/tutorials/",
    ],
  },
];
