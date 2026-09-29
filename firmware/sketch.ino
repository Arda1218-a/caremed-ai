/* ==========================================================================
   CareMed AI - Smart Physical Infirmary Cabinet (ESP32 Firmware)
   Hardware Features:
   - Dual Independent Doors (Upper Shelf Servo & Lower Shelf Servo)
   - 8 Shelf Slots (4 Upper, 4 Lower Microswitch / Load Cell Sensors)
   - 20x4 Ergonomic Cyclical Display (Non-touch friendly for elderly)
   - "Dose Alarm -> Taken -> Ingestion -> Return Verification" Cycle
   - Anti-Misplacement Camera / Barcode Voice Alert Simulation
   - Q Pharmacy Low Stock Exhaustion Alert
   ========================================================================== */

#include <Wire.h>
#include <LiquidCrystal_I2C.h>
#include <ESP32Servo.h>

// Pin Definitions
#define PIN_SERVO_TOP     18
#define PIN_SERVO_BOTTOM  19
#define PIN_BUZZER        4
#define PIN_LED_TOP       16
#define PIN_LED_BOTTOM    17

// 8 Slot Sensor Pins (Internal Pullup)
const int slotPins[8] = {32, 33, 25, 26, 27, 14, 12, 13};

// Hardware Objects
LiquidCrystal_I2C lcd(0x27, 20, 4);
Servo servoTop;
Servo servoBottom;

// Medicine Database Struct (4 Top, 4 Bottom Slots)
struct Medicine {
  String name;
  String dose;
  int shelf;      // 0: Upper Shelf, 1: Lower Shelf
  int slotIndex;  // 0 - 7
  int remaining;  // Remaining pills
  bool isDue;     // Is medication due?
};

Medicine cabinetMeds[8] = {
  {"Coraspin",   "100mg", 0, 0, 3, true},   // Top 1 (Low stock alert test: 3 pills remaining)
  {"Glucophage", "850mg", 0, 1, 18, false}, // Top 2
  {"Beloc ZOK",  "50mg",  0, 2, 12, false}, // Top 3
  {"Parol",      "500mg", 0, 3, 20, false}, // Top 4
  {"Nexium",     "40mg",  1, 4, 15, false}, // Bottom 1
  {"Lipitor",    "20mg",  1, 5, 25, false}, // Bottom 2
  {"Augmentin",  "1000mg",1, 6, 8,  false}, // Bottom 3
  {"Ecopirin",   "150mg", 1, 7, 14, false}  // Bottom 4
};

// Finite State Machine
enum CabinetState {
  STATE_IDLE,
  STATE_DOSE_ALARM,
  STATE_MED_TAKEN_OUT,
  STATE_VERIFY_RETURN
};

CabinetState currentState = STATE_IDLE;
int currentTargetSlot = 0; // Active due medicine: Coraspin (Top 1)
int takenCountToday = 2;
int remainingCountToday = 1;

// Non-blocking Timers
unsigned long lastDisplaySwitch = 0;
unsigned long lastBuzzerBeep = 0;
int displayPage = 0;

void setup() {
  Serial.begin(115200);

  // LCD Setup
  lcd.init();
  lcd.backlight();
  lcd.clear();
  lcd.setCursor(2, 1);
  lcd.print("CareMed Smart");
  lcd.setCursor(3, 2);
  lcd.print("Cabinet Ready!");

  // Servo Setup
  servoTop.attach(PIN_SERVO_TOP);
  servoBottom.attach(PIN_SERVO_BOTTOM);
  closeDoors();

  // Pin Modes
  pinMode(PIN_BUZZER, OUTPUT);
  pinMode(PIN_LED_TOP, OUTPUT);
  pinMode(PIN_LED_BOTTOM, OUTPUT);

  for (int i = 0; i < 8; i++) {
    pinMode(slotPins[i], INPUT_PULLUP);
  }

  delay(1200);
  lcd.clear();
  printVoiceMessage("System active. Mains powered, battery backed up.");
  
  // Trigger initial dose alarm for demonstration
  triggerDoseAlarm(0);
}

void loop() {
  // State Machine
  switch (currentState) {
    case STATE_IDLE:
      handleIdleDisplay();
      break;

    case STATE_DOSE_ALARM:
      handleDoseAlarm();
      break;

    case STATE_MED_TAKEN_OUT:
      handleMedTakenOut();
      break;

    case STATE_VERIFY_RETURN:
      break;
  }

  handleSerialCommands();
  delay(50);
}

// Door Motor Controls
void openTopDoor() {
  servoTop.write(90);
  digitalWrite(PIN_LED_TOP, HIGH);
}

void openBottomDoor() {
  servoBottom.write(90);
  digitalWrite(PIN_LED_BOTTOM, HIGH);
}

void closeDoors() {
  servoTop.write(0);
  servoBottom.write(0);
  digitalWrite(PIN_LED_TOP, LOW);
  digitalWrite(PIN_LED_BOTTOM, LOW);
}

// Cyclical Non-Touch Display
void handleIdleDisplay() {
  if (millis() - lastDisplaySwitch > 3500) {
    lastDisplaySwitch = millis();
    displayPage = (displayPage + 1) % 4;
    lcd.clear();

    switch (displayPage) {
      case 0:
        lcd.setCursor(0, 0);
        lcd.print("--- CAREMED AI ---");
        lcd.setCursor(0, 1);
        lcd.print("Date: 29 Sep 2026");
        lcd.setCursor(0, 2);
        lcd.print("Time: 14:30:00");
        lcd.setCursor(0, 3);
        lcd.print("Power: AC Wall Plug");
        break;

      case 1:
        lcd.setCursor(0, 0);
        lcd.print("- DAILY DOSE STATUS -");
        lcd.setCursor(0, 1);
        lcd.print("Taken Today: ");
        lcd.print(takenCountToday);
        lcd.print(" doses");
        lcd.setCursor(0, 2);
        lcd.print("Remaining  : ");
        lcd.print(remainingCountToday);
        lcd.print(" doses");
        lcd.setCursor(0, 3);
        lcd.print("Status     : Normal");
        break;

      case 2:
        lcd.setCursor(0, 0);
        lcd.print("- NEXT MEDICATION -");
        lcd.setCursor(0, 1);
        lcd.print(cabinetMeds[currentTargetSlot].name + " " + cabinetMeds[currentTargetSlot].dose);
        lcd.setCursor(0, 2);
        lcd.print("Shelf: Top Shelf #1");
        lcd.setCursor(0, 3);
        lcd.print("Time : 18:00 (Evening)");
        break;

      case 3:
        lcd.setCursor(0, 0);
        lcd.print("-- HEALTH REMINDER --");
        lcd.setCursor(0, 1);
        lcd.print("Drink plenty of warm");
        lcd.setCursor(0, 2);
        lcd.print("water with pills!");
        lcd.setCursor(0, 3);
        lcd.print("Stay upright 15 mins");
        break;
    }
  }
}

// Dose Alarm Routine
void triggerDoseAlarm(int slotIndex) {
  currentTargetSlot = slotIndex;
  currentState = STATE_DOSE_ALARM;

  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print("! MEDICATION TIME !");
  lcd.setCursor(0, 1);
  lcd.print("Pill: " + cabinetMeds[slotIndex].name);
  lcd.setCursor(0, 2);
  lcd.print("Dose: " + cabinetMeds[slotIndex].dose);
  lcd.setCursor(0, 3);
  lcd.print("-> Take blinking slot");

  if (cabinetMeds[slotIndex].shelf == 0) {
    openTopDoor();
  } else {
    openBottomDoor();
  }

  printVoiceMessage("Dose time! Please take your " + cabinetMeds[slotIndex].name + " " + cabinetMeds[slotIndex].dose + " from the cabinet.");

  // Q Pharmacy Low Stock Verification
  if (cabinetMeds[slotIndex].remaining <= 3) {
    Serial.println("=================================================================");
    Serial.println("⚠️ [Q PHARMACY REFILL ALERT]: " + cabinetMeds[slotIndex].name + " is running low (" + String(cabinetMeds[slotIndex].remaining) + " pills left)!");
    Serial.println("Please visit the nearest pharmacy or your original dispensary 'Q Pharmacy' for a refill.");
    Serial.println("=================================================================");
  }
}

void handleDoseAlarm() {
  if (millis() - lastBuzzerBeep > 1500) {
    lastBuzzerBeep = millis();
    tone(PIN_BUZZER, 1000, 200);
  }

  // Detect box lifted from shelf (Switch goes HIGH)
  if (digitalRead(slotPins[currentTargetSlot]) == HIGH) {
    currentState = STATE_MED_TAKEN_OUT;
    lcd.clear();
    lcd.setCursor(0, 1);
    lcd.print("  MEDICINE TAKEN!  ");
    lcd.setCursor(0, 2);
    lcd.print("Drink with water...");

    tone(PIN_BUZZER, 1500, 100);
    printVoiceMessage("Medicine taken. Ingest with water and return the box to its slot.");
  }
}

// Ingestion and Return Verification
void handleMedTakenOut() {
  for (int i = 0; i < 8; i++) {
    if (digitalRead(slotPins[i]) == LOW) {
      if (i == currentTargetSlot) {
        // Success: Correct Slot
        currentState = STATE_IDLE;
        cabinetMeds[currentTargetSlot].remaining--;
        takenCountToday++;
        if (remainingCountToday > 0) remainingCountToday--;

        closeDoors();
        noTone(PIN_BUZZER);
        
        tone(PIN_BUZZER, 1800, 150);
        delay(180);
        tone(PIN_BUZZER, 2200, 200);

        lcd.clear();
        lcd.setCursor(1, 1);
        lcd.print("DOSE RECORDED OK!");
        lcd.setCursor(0, 2);
        lcd.print("Box returned safely");

        printVoiceMessage("Dose completed! Pill verified and box returned to correct slot.");
        Serial.println("📱 [CAREGIVER SMS SENT]: Medication " + cabinetMeds[currentTargetSlot].name + " taken and cabinet secured.");
        delay(2500);
        break;

      } else {
        // Misplacement Error: Wrong Slot Alert
        tone(PIN_BUZZER, 400, 600);
        
        lcd.clear();
        lcd.setCursor(0, 0);
        lcd.print("!! WRONG SLOT !!");
        lcd.setCursor(0, 1);
        lcd.print("Expected: " + cabinetMeds[i].name);
        lcd.setCursor(0, 2);
        lcd.print("Found   : " + cabinetMeds[currentTargetSlot].name);
        lcd.setCursor(0, 3);
        lcd.print("Put in correct slot!");

        String shelfName = (i < 4) ? "Top shelf slot #" + String(i + 1) : "Bottom shelf slot #" + String(i - 3);
        printVoiceMessage("WARNING! " + cabinetMeds[i].name + " belongs here, why is " + cabinetMeds[currentTargetSlot].name + " placed in " + shelfName + "? Please move to correct slot!");
        
        delay(3000);
        lcd.clear();
        lcd.setCursor(0, 1);
        lcd.print("Place in correct slot");
        lcd.setCursor(0, 2);
        lcd.print("(" + cabinetMeds[currentTargetSlot].name + ")");
        break;
      }
    }
  }
}

void printVoiceMessage(String text) {
  Serial.println("\n🔊 [CABINET VOICE AUDIO]: " + text + "\n");
}

void handleSerialCommands() {
  if (Serial.available()) {
    String cmd = Serial.readStringUntil('\n');
    cmd.trim();
    if (cmd == "alarm1") {
      triggerDoseAlarm(0);
    } else if (cmd == "alarm5") {
      triggerDoseAlarm(4);
    } else if (cmd == "close") {
      closeDoors();
      currentState = STATE_IDLE;
    }
  }
}
