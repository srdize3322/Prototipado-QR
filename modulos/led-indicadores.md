# Módulos Indicadores LED / Pantallas

Este documento lista opciones de indicadores visuales para feedback al usuario.

## Índice
1. [LEDs individuales](#leds-individuales)
2. [LEDs RGB](#leds-rgb)
3. [Matrices LED / NeoPixels](#matrices-led--neopixels)
4. [Pantallas OLED](#pantallas-oled)
5. [Pantallas TFT/LCD](#pantallas-tftlcd)

---

## LEDs individuales

### Descripción
LEDs simples de un solo color para indicación básica OK/ERROR.

### Configuración típica para proyecto QR
- **LED Verde:** QR válido / éxito
- **LED Rojo:** QR inválido / error
- **(Opcional) LED Azul:** Conectando / procesando

### Especificaciones
- **Voltaje típico:** 
  - Rojo: 1.8-2.2V
  - Verde/Azul: 3.0-3.4V
- **Corriente típica:** 10-20 mA
- **Resistencia calculada:** (Vcc - Vled) / I
  - Para 3.3V y LED rojo (2V, 15mA): R = (3.3-2)/0.015 = 87Ω → usar 100Ω
  - Para 3.3V y LED verde (3.2V, 15mA): R = (3.3-3.2)/0.015 = 7Ω → usar 10-22Ω
  - Para 5V y LED rojo: usar 220-330Ω

### Compatibilidad

| Módulo Base | Compatibilidad | Configuración |
|-------------|----------------|---------------|
| **ESP32-DevKit** | ✅ **Excelente** | GPIO cualquiera + resistencia + LED + GND |
| **ESP32-S3** | ✅ **Excelente** | Igual ESP32 |
| **Raspberry Pi Zero 2W** | ✅ **Excelente** | GPIO con resistencia |

### Conexión típica (ESP32)
```
GPIO (ej: GPIO 25) ──[Resistencia 220Ω]──[LED Verde]──GND
GPIO (ej: GPIO 26) ──[Resistencia 220Ω]──[LED Rojo]──GND
```

### Código de ejemplo (Arduino ESP32)
```cpp
#define LED_VERDE 25
#define LED_ROJO 26

void setup() {
  pinMode(LED_VERDE, OUTPUT);
  pinMode(LED_ROJO, OUTPUT);
}

void indicarOK() {
  digitalWrite(LED_VERDE, HIGH);
  digitalWrite(LED_ROJO, LOW);
  delay(2000);
  digitalWrite(LED_VERDE, LOW);
}

void indicarError() {
  digitalWrite(LED_ROJO, HIGH);
  digitalWrite(LED_VERDE, LOW);
  delay(2000);
  digitalWrite(LED_ROJO, LOW);
}
```

### Costo
| Item | Precio (USD) |
|------|--------------|
| LED 5mm individual | $0.05-0.10 |
| Resistencias (pack) | $1-2 (100 unidades) |
| **Total (2 LEDs + resistencias)** | **<$1** |

### Ventajas
- ✅ Costo ínfimo
- ✅ Fácil implementación
- ✅ Bajo consumo (~20-40 mA total)
- ✅ Visible en exteriores

### Desventajas
- ⚠️ Limitado a colores fijos
- ⚠️ Requiere múltiples GPIO para múltiples estados

---

## LEDs RGB

### Descripción
LED que combina rojo, verde y azul para generar cualquier color.

### Tipos

#### LED RGB común cátodo/ánodo
- **Pines:** 4 (R, G, B, común)
- **Voltaje:** 3.3-5V por color
- **Corriente:** 20 mA por color
- **Control:** 3 GPIO (uno por color) con PWM
- **Costo:** $0.20-0.50

#### LED RGB WS2812B (NeoPixel)
- **Pines:** 3 (VCC, GND, DIN)
- **Voltaje:** 5V
- **Corriente:** ~60 mA (blanco máximo)
- **Control:** 1 GPIO con protocolo especial
- **Direccionable:** Pueden encadenarse
- **Costo:** $0.30-0.60

### Compatibilidad

| Módulo Base | RGB común | WS2812B (NeoPixel) |
|-------------|-----------|-------------------|
| **ESP32-DevKit** | ✅ Excelente (3 GPIO + PWM) | ✅ Excelente (FastLED/Adafruit lib) |
| **ESP32-S3** | ✅ Excelente | ✅ Excelente |
| **Raspberry Pi Zero 2W** | ✅ Excelente | ✅ Buena (lib Python) |

### Código de ejemplo WS2812B (Arduino ESP32)
```cpp
#include <Adafruit_NeoPixel.h>

#define PIN_LED 25
#define NUM_LEDS 1

Adafruit_NeoPixel pixel(NUM_LEDS, PIN_LED, NEO_GRB + NEO_KHZ800);

void setup() {
  pixel.begin();
}

void indicarOK() {
  pixel.setPixelColor(0, pixel.Color(0, 255, 0)); // Verde
  pixel.show();
}

void indicarError() {
  pixel.setPixelColor(0, pixel.Color(255, 0, 0)); // Rojo
  pixel.show();
}

void indicarProcesando() {
  pixel.setPixelColor(0, pixel.Color(0, 0, 255)); // Azul
  pixel.show();
}
```

### Ventajas
- ✅ Múltiples colores con 1-3 GPIO
- ✅ Efectos visuales (fade, parpadeo, etc.)
- ✅ WS2812B: Solo 1 GPIO, encadenable

### Desventajas
- ⚠️ Mayor complejidad que LED simple
- ⚠️ Mayor consumo (especialmente blanco)

---

## Matrices LED / NeoPixels

### Descripción
Arrays de LEDs para efectos visuales más complejos.

### Tipos comunes
- **Matriz 8x8 LED:** MAX7219 controller
- **Anillo NeoPixel:** 12, 16, 24 LEDs
- **Tira LED WS2812B:** Cualquier longitud

### Compatibilidad
- ✅ Todos los módulos base soportan vía SPI (MAX7219) o GPIO (WS2812B)

### Costo
| Item | Precio (USD) |
|------|--------------|
| Matriz 8x8 con MAX7219 | 2-4 |
| Anillo NeoPixel 12 LEDs | 3-5 |
| Tira WS2812B (1m, 60 LEDs) | 8-12 |

### Uso en proyecto QR
⚠️ **Overkill** para indicación simple. Útil solo si se requiere:
- Efectos visuales llamativos
- Múltiples estados simultáneos
- Interfaz más rica

---

## Pantallas OLED

### Descripción
Pantallas monocromáticas o color de bajo consumo con interfaz I2C/SPI.

### Modelos comunes

#### SSD1306 (128x64, monocromo)
- **Interfaz:** I2C o SPI
- **Tamaño:** 0.96" típico
- **Consumo:** ~20 mA
- **Costo:** $3-5

#### SSD1331 (96x64, color)
- **Interfaz:** SPI
- **Colores:** 65K
- **Tamaño:** 0.95"
- **Costo:** $8-12

### Compatibilidad

| Módulo Base | Compatibilidad | Notas |
|-------------|----------------|-------|
| **ESP32-DevKit** | ✅ **Excelente** | I2C (GPIO 21/22) o SPI |
| **ESP32-S3** | ✅ **Excelente** | Igual ESP32 |
| **Raspberry Pi Zero 2W** | ✅ **Excelente** | I2C habilitado por defecto |

### Código de ejemplo SSD1306 (Arduino ESP32)
```cpp
#include <Wire.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>

#define SCREEN_WIDTH 128
#define SCREEN_HEIGHT 64
#define OLED_RESET -1

Adafruit_SSD1306 display(SCREEN_WIDTH, SCREEN_HEIGHT, &Wire, OLED_RESET);

void setup() {
  display.begin(SSD1306_SWITCHCAPVCC, 0x3C);
  display.clearDisplay();
}

void mostrarOK(String qr) {
  display.clearDisplay();
  display.setTextSize(2);
  display.setTextColor(SSD1306_WHITE);
  display.setCursor(0,0);
  display.println("OK!");
  display.setTextSize(1);
  display.println(qr);
  display.display();
}
```

### Ventajas
- ✅ Información detallada (texto, QR leído, IP, etc.)
- ✅ Bajo consumo
- ✅ Compacta
- ✅ Ideal para debugging/status

### Desventajas
- ⚠️ No visible en exteriores con luz solar directa
- ⚠️ Monocromo (SSD1306) menos impactante que LED color

---

## Pantallas TFT/LCD

### Descripción
Pantallas color de mayor tamaño para interfaces más ricas.

### Modelos comunes

#### ILI9341 (2.4"-2.8", 240x320)
- **Interfaz:** SPI
- **Colores:** 262K
- **Táctil:** Opcional (resistivo)
- **Costo:** $8-15

#### ST7735 (1.8", 128x160)
- **Interfaz:** SPI
- **Colores:** 262K
- **Costo:** $5-8

### Compatibilidad

| Módulo Base | Compatibilidad | Notas |
|-------------|----------------|-------|
| **ESP32-DevKit** | ✅ **Buena** | SPI estándar, consume mucha RAM |
| **ESP32-S3** | ✅ **Excelente** | Más RAM, mejor para pantallas grandes |
| **Raspberry Pi Zero 2W** | ✅ **Excelente** | Mini-HDMI también disponible |

### Ventajas
- ✅ Interfaz gráfica completa
- ✅ Colores, iconos, imágenes
- ✅ Táctil (algunos modelos)

### Desventajas
- ⚠️ Mayor consumo (~100-200 mA)
- ⚠️ Consume RAM significativa en ESP32
- ⚠️ Complejidad mayor
- ⚠️ **Overkill** para indicación simple OK/ERROR

### Costo
| Pantalla | Precio (USD) |
|----------|--------------|
| TFT 1.8" ST7735 | 5-8 |
| TFT 2.4" ILI9341 | 10-15 |
| TFT 2.8" táctil | 12-18 |

---

## Comparativa para proyecto QR

| Opción | Costo | Simplicidad | Visibilidad exterior | Info detallada | Recomendación |
|--------|-------|-------------|---------------------|----------------|---------------|
| **LEDs individuales** | <$1 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ❌ | ✅ **Ideal básico** |
| **LED RGB (WS2812B)** | $0.50 | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ❌ | ✅ **Ideal con efectos** |
| **OLED 0.96"** | $3-5 | ⭐⭐⭐⭐ | ⭐⭐ | ✅ | ⚠️ Para debugging |
| **TFT 2.4"** | $10-15 | ⭐⭐⭐ | ⭐⭐⭐ | ✅✅ | ⚠️ Si se requiere UI rica |

---

## Recomendaciones por escenario

### Prototipo básico
✅ **2 LEDs individuales** (verde + rojo)
- Costo: <$1
- Configuración: GPIO + resistencia
- Suficiente para OK/ERROR

### Prototipo con efectos
✅ **1 LED RGB WS2812B**
- Costo: ~$0.50
- Múltiples estados con colores
- Solo 1 GPIO requerido

### Prototipo con debugging
✅ **OLED SSD1306 0.96"** + LEDs
- Costo: ~$4
- Muestra QR leído, IP, estado, errores
- Ideal para desarrollo

### Totem/kiosko con UI
✅ **Pantalla TFT 2.4-2.8" táctil** (si presupuesto permite)
- Costo: ~$12-18
- Interfaz completa
- Usuario puede interactuar

### Producción simple
✅ **LED RGB WS2812B**
- Bajo costo
- Efectos profesionales (fade, parpadeo)
- Fácil reemplazo

---

## Configuración recomendada para proyecto QR + Wi-Fi

### Mínimo viable
```
ESP32-DevKit
├── LED Verde (GPIO 25) ──[220Ω]──GND
└── LED Rojo (GPIO 26) ──[220Ω]──GND

Costo adicional: <$1
```

### Recomendado
```
ESP32-DevKit
└── LED RGB WS2812B (GPIO 25) ──5V──GND

Costo adicional: ~$0.50
```

### Con debugging
```
ESP32-DevKit
├── LED RGB WS2812B (GPIO 25)
└── OLED 0.96" I2C (GPIO 21/22)

Costo adicional: ~$4
```

---

**Última actualización:** Diciembre 2025
**Recomendación:** **LED RGB WS2812B** - Mejor balance costo/capacidad/efecto visual
