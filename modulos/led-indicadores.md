# LEDs & Indicadores Visuales

## Estados del Sistema (Lógica LED)

| Estado | Verde | Rojo | Descripción |
|--------|-------|------|-------------|
| **Boot** | ⚡ 3 blinks | OFF | Sistema iniciando |
| **Wi-Fi Conectando** | 💫 Pulsando lento | OFF | Buscando red |
| **Wi-Fi OK** | ✅ ON fijo | OFF | Conectado, listo |
| **QR Leído OK** | ⚡ 2 blinks rápidos | OFF | Scan exitoso |
| **Error Servidor** | OFF | ⚡ 3 blinks | HTTP error/timeout |
| **Error QR** | OFF | 💫 Pulsando rápido | QR ilegible |
| **Sin Wi-Fi** | OFF | ✅ ON fijo | Conexión perdida |

---

## Opción 1: LEDs Individuales (Recomendado MVP)

### Componentes:
- **LED Verde 5mm:** $0.10-0.20
- **LED Rojo 5mm:** $0.10-0.20
- **Resistencias 220Ω:** $0.05 c/u
- **Total:** ~$0.50

### Conexión ESP32:
```
LED Verde:
  GPIO25 → Resistencia 220Ω → LED (+) → GND

LED Rojo:
  GPIO26 → Resistencia 220Ω → LED (+) → GND
```

### Código ESP32:
```cpp
#define LED_GREEN 25
#define LED_RED 26

void setup() {
  pinMode(LED_GREEN, OUTPUT);
  pinMode(LED_RED, OUTPUT);
}

// Estado: BOOT
void indicarBoot() {
  for(int i=0; i<3; i++) {
    digitalWrite(LED_GREEN, HIGH);
    delay(200);
    digitalWrite(LED_GREEN, LOW);
    delay(200);
  }
}

// Estado: WiFi OK
void indicarWiFiOK() {
  digitalWrite(LED_GREEN, HIGH);
  digitalWrite(LED_RED, LOW);
}

// Estado: QR Leído
void indicarQROK() {
  for(int i=0; i<2; i++) {
    digitalWrite(LED_GREEN, HIGH);
    delay(100);
    digitalWrite(LED_GREEN, LOW);
    delay(100);
  }
}

// Estado: Error Servidor
void indicarErrorServidor() {
  digitalWrite(LED_GREEN, LOW);
  for(int i=0; i<3; i++) {
    digitalWrite(LED_RED, HIGH);
    delay(200);
    digitalWrite(LED_RED, LOW);
    delay(200);
  }
}

// Estado: Sin WiFi
void indicarSinWiFi() {
  digitalWrite(LED_GREEN, LOW);
  digitalWrite(LED_RED, HIGH);
}
```

---

## Opción 2: LED RGB (WS2812/NeoPixel)

### Specs:
- **Precio:** $0.50-1.50 por LED
- **Control:** 1 pin GPIO (protocolo serial)
- **Colores:** 16 millones (RGB)
- **Ventaja:** Múltiples colores, 1 solo pin

### Ejemplo:
```cpp
#include <Adafruit_NeoPixel.h>

#define PIN_NEOPIXEL 27
#define NUM_PIXELS 1

Adafruit_NeoPixel pixel(NUM_PIXELS, PIN_NEOPIXEL, NEO_GRB);

void setup() {
  pixel.begin();
}

void setColor(uint8_t r, uint8_t g, uint8_t b) {
  pixel.setPixelColor(0, pixel.Color(r, g, b));
  pixel.show();
}

// Verde = WiFi OK
setColor(0, 255, 0);

// Rojo = Error
setColor(255, 0, 0);

// Azul = Procesando
setColor(0, 0, 255);
```

---

## Opción 3: Pantalla OLED (Avanzado)

### SSD1306 0.96" I2C
- **Precio:** $3-5
- **Resolución:** 128x64
- **Interface:** I2C (SDA=21, SCL=22)
- **Ventaja:** Texto, íconos, progreso

### Uso:
```cpp
#include <Wire.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>

Adafruit_SSD1306 display(128, 64, &Wire, -1);

void setup() {
  display.begin(SSD1306_SWITCHCAPVCC, 0x3C);
  display.clearDisplay();
  display.setTextSize(1);
  display.setTextColor(WHITE);
  display.setCursor(0, 0);
  display.println("WiFi: Conectado");
  display.println("QR: Listo");
  display.display();
}
```

---

## Comparativa Opciones

| Opción | Precio | GPIO | Info | Consumo | Complejidad |
|--------|--------|------|------|---------|-------------|
| **2 LEDs** | $0.50 | 2 | Básica | <20 mA | ⭐ Muy fácil |
| **LED RGB** | $1.50 | 1 | Media | ~60 mA | ⭐⭐ Fácil |
| **OLED** | $3-5 | 2 (I2C) | Alta | ~20 mA | ⭐⭐⭐ Media |

---

## Buzzer (Opcional)

### Buzzer Pasivo
- **Precio:** $0.30-0.80
- **Conexión:** GPIO → Buzzer → GND
- **Uso:** Beep confirmación QR leído

```cpp
#define BUZZER_PIN 27

void beepOK() {
  tone(BUZZER_PIN, 1000, 100); // 1kHz, 100ms
}
```

---

## Recomendación MVP

### Configuración mínima:
➡️ **2 LEDs (Verde + Rojo)** + resistencias
- Costo: $0.50
- GPIO: 2 pines
- Suficiente para estados esenciales

### Si presupuesto permite:
➡️ **OLED 0.96"** para debugging visual
- Muestra IP, estado, último QR
- Muy útil para desarrollo

### Evitar para MVP:
- Múltiples LEDs RGB (innecesario)
- Pantallas TFT grandes (caro, complejo)

---

## BOM Indicadores MVP

| Componente | Cantidad | Precio Unit | Total |
|------------|----------|-------------|-------|
| LED Verde 5mm | 1 | $0.15 | $0.15 |
| LED Rojo 5mm | 1 | $0.15 | $0.15 |
| Resistencia 220Ω | 2 | $0.05 | $0.10 |
| Buzzer (opcional) | 1 | $0.50 | $0.50 |
| **TOTAL** | - | - | **$0.40-0.90** |

---

## Integración con Sistema Completo

### Flujo típico:
1. **Boot:** Verde 3 blinks
2. **Conectando Wi-Fi:** Verde pulsando
3. **Wi-Fi OK:** Verde fijo
4. **Esperando QR:** Verde fijo
5. **QR Detectado:** Verde 2 blinks + buzzer
6. **Enviando HTTP:** Verde fijo
7. **Respuesta OK:** Verde 2 blinks
8. **Error:** Rojo 3 blinks

### Consumo total sistema:
- ESP32: ~160 mA
- QR Scanner: ~100 mA
- 2 LEDs: ~20 mA
- **Total:** ~280 mA @ 5V = 1.4W
