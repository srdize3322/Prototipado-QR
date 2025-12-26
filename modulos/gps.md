# Módulos GPS / GNSS

Este documento lista opciones de módulos GPS/GNSS para geolocalización, con compatibilidad según módulo base.

## Índice
1. [Módulos GPS UART](#módulos-gps-uart)
2. [Módulos GPS USB](#módulos-gps-usb)
3. [Módulos GPS I2C](#módulos-gps-i2c)
4. [Módulos GSM+GPS combinados](#módulos-gsmgps-combinados)

---

## Módulos GPS UART

### Descripción
Módulos GPS con salida UART/serial. Envían tramas NMEA con coordenadas, velocidad, hora, etc.

### Modelos comunes

#### NEO-6M (u-blox)
- **Canales:** 50
- **Sensibilidad:** -161 dBm
- **Precisión:** 2.5m CEP
- **Actualización:** 1-10 Hz
- **Voltaje:** 3.3V - 5V
- **Consumo:** ~45 mA (tracking)
- **Antena:** Cerámica integrada + conector para externa
- **TTFF:** ~27s (cold start)
- **Costo:** $8-12

#### NEO-7M (u-blox)
- Mejora sobre NEO-6M
- **Precisión:** 2.5m CEP
- **Sensibilidad:** -162 dBm
- **TTFF:** ~26s
- **Costo:** $10-15

#### NEO-M8N (u-blox)
- **Precisión:** 2.5m CEP
- **Sensibilidad:** -167 dBm (mejor que 6M/7M)
- **TTFF:** ~26s
- **Múltiples GNSS:** GPS + GLONASS + Galileo + BeiDou
- **Actualización:** Hasta 18 Hz
- **Costo:** $12-18

#### NEO-M9N (u-blox - última generación)
- **Precisión:** 1.5m CEP (mejor)
- **Sensibilidad:** -167 dBm
- **TTFF:** ~24s
- **Múltiples GNSS:** GPS + GLONASS + Galileo + BeiDou
- **Costo:** $18-25

#### GY-GPS6MV2
- Módulo económico basado en NEO-6M
- Incluye batería backup (EEPROM)
- **Costo:** $8-10

### Interfaz típica
```
VCC  → 3.3V-5V
GND  → GND
TX   → RX módulo base (UART)
RX   → TX módulo base (UART)
PPS  → (opcional) pulso por segundo
```

### Compatibilidad con módulos base

| Módulo Base | Compatibilidad | Configuración | Notas |
|-------------|----------------|---------------|-------|
| **ESP32-DevKit** | ✅ **Excelente** | UART1 o 2 (ej: GPIO 16/17) | Usar TinyGPS++ library |
| **ESP32-S3** | ✅ **Excelente** | Cualquier UART | Mismo que ESP32 |
| **Raspberry Pi Zero 2W** | ✅ **Excelente** | GPIO serial o USB adapter | gpsd + Python |

### Librerías recomendadas

**ESP32 (Arduino):**
- [TinyGPS++](https://github.com/mikalhart/TinyGPSPlus) - Ligera y eficiente

**Raspberry Pi (Python):**
- [gpsd](https://gpsd.gitlab.io/gpsd/) - Daemon estándar
- [gps3](https://github.com/wadda/gps3) - Python wrapper

---

## Módulos GPS USB

### Descripción
GPS con interfaz USB, típicamente USB-serial (VCP). Aparecen como puerto COM/ttyUSB.

### Modelos comunes
- **GlobalSat BU-353S4:** ~$25-35
- **U-blox NEO-6M USB:** ~$15-20
- **Generic USB GPS dongles:** ~$12-20

### Compatibilidad con módulos base

| Módulo Base | Compatibilidad | Notas |
|-------------|----------------|-------|
| **ESP32-DevKit** | ❌ **No** | No tiene USB host |
| **ESP32-S3** | ⚠️ **Limitado** | USB OTG teórico, complejo |
| **Raspberry Pi Zero 2W** | ✅ **Excelente** | Plug and play con gpsd |

### Ventaja en Raspberry Pi
- ✅ Plug-and-play (no usar GPIO)
- ✅ Fácil debugging
- ✅ Intercambiable

---

## Módulos GPS I2C

### Descripción
Menos comunes, pero existen módulos GPS con interfaz I2C en lugar de UART.

### Modelos
- **Adafruit Ultimate GPS Breakout (I2C):** ~$40
- **Algunos módulos Quectel en modo I2C**

### Compatibilidad

| Módulo Base | Compatibilidad | Notas |
|-------------|----------------|-------|
| **ESP32-DevKit** | ✅ **Buena** | I2C estándar (GPIO 21/22) |
| **ESP32-S3** | ✅ **Buena** | I2C disponible |
| **Raspberry Pi Zero 2W** | ✅ **Buena** | I2C habilitado por defecto |

### Ventaja
- ✅ Libera UART para otros módulos
- ✅ Dirección I2C única (múltiples dispositivos en bus)

### Desventaja
- ⚠️ Menos comunes, mayor costo
- ⚠️ Velocidad limitada por I2C (suficiente para GPS)

---

## Módulos GSM+GPS combinados

### Descripción
Módulos que combinan celular (GSM/LTE) con GPS en un solo chip.

### Modelos comunes

#### A9G (AI-Thinker)
- **GSM:** Quad-band (850/900/1800/1900 MHz)
- **GPS:** Integrado
- **GPRS:** Class 10
- **Interfaz:** UART (comandos AT)
- **Voltaje:** 3.3-4.2V
- **Consumo:** ~500 mA (GSM transmitiendo)
- **Costo:** $10-15

#### SIM868 (SIMCom)
- **GSM:** Quad-band
- **GPS:** Integrado
- **Bluetooth:** Incluido
- **Costo:** $15-20

#### SIM7600E (SIMCom)
- **LTE:** Cat 1 (B1/B3/B5/B7/B8/B20)
- **GPS:** Integrado
- **Fallback:** 2G/3G
- **Costo:** $25-35

### Compatibilidad

| Módulo Base | Compatibilidad | Notas |
|-------------|----------------|-------|
| **ESP32-DevKit** | ✅ **Buena** | UART + fuente 5V externa | Verificar consumo corriente |
| **ESP32-S3** | ✅ **Buena** | UART + fuente externa |
| **Raspberry Pi Zero 2W** | ✅ **Excelente** | GPIO serial o USB |

### Ventaja
- ✅ GPS + celular en un solo módulo
- ✅ Ahorro de espacio
- ✅ Costo menor que dos módulos separados

### Desventaja
- ⚠️ Requiere SIM card
- ⚠️ Consumo alto (~500 mA en transmisión)
- ⚠️ Requiere fuente de alimentación robusta

---

## Comparativa de costos

| Módulo | Tipo | Precio (USD) | GNSS múltiple | Antena |
|--------|------|--------------|---------------|--------|
| NEO-6M | UART | 8-12 | ❌ Solo GPS | ✅ Integrada |
| NEO-7M | UART | 10-15 | ❌ Solo GPS | ✅ Integrada |
| NEO-M8N | UART | 12-18 | ✅ GPS+GLONASS+... | ✅ Integrada |
| NEO-M9N | UART | 18-25 | ✅ Todos | ✅ Integrada |
| USB GPS | USB | 15-25 | Variable | ✅ Integrada |
| A9G | UART+GSM | 10-15 | ❌ Solo GPS | ⚠️ Externa |
| SIM7600 | UART+LTE | 25-35 | ✅ GPS | ⚠️ Externa |

---

## Recomendaciones por módulo base

### Para ESP32-DevKit
✅ **NEO-6M o NEO-M8N** (UART)
- Conexión directa a UART2 o software serial
- TinyGPS++ library
- Costo: $8-18

### Para ESP32-S3
✅ **NEO-M8N** (UART)
- Múltiples UART disponibles
- Mejor precisión con GNSS múltiple
- Costo: $12-18

### Para Raspberry Pi Zero 2W
✅ **Opción 1:** USB GPS dongle ($15-25)
- Plug and play
- gpsd automático

✅ **Opción 2:** NEO-M8N vía GPIO serial ($12-18)
- Más económico
- Usa GPIO

---

## Configuración típica (ESP32 + NEO-6M)

### Hardware
```
NEO-6M        ESP32-DevKit
------        ------------
VCC  ------>  3.3V
GND  ------>  GND
TX   ------>  GPIO 16 (RX2)
RX   ------>  GPIO 17 (TX2)
```

### Software (Arduino)
```cpp
#include <TinyGPS++.h>
#include <HardwareSerial.h>

TinyGPSPlus gps;
HardwareSerial GPS_Serial(2); // UART2

void setup() {
  Serial.begin(115200);
  GPS_Serial.begin(9600, SERIAL_8N1, 16, 17); // RX=16, TX=17
}

void loop() {
  while (GPS_Serial.available() > 0) {
    gps.encode(GPS_Serial.read());
  }
  
  if (gps.location.isUpdated()) {
    Serial.print("Lat: ");
    Serial.println(gps.location.lat(), 6);
    Serial.print("Lng: ");
    Serial.println(gps.location.lng(), 6);
  }
}
```

---

## Consideraciones importantes

### Antena
- ✅ **Antena cerámica integrada:** Suficiente para uso exterior sin obstrucciones
- ⚠️ **Antena externa:** Necesaria si dispositivo estará en interior o en caja metálica
- **Ganancia típica:** 25-28 dBi

### Ubicación
- ✅ **Vista despejada al cielo:** Mejor señal
- ⚠️ **Interior:** Señal débil o nula
- ⚠️ **Urbano denso:** Rebote de señal ("multipath")

### Tiempo de primera fijación (TTFF)
- **Cold start:** 25-60 segundos (sin datos previos)
- **Warm start:** 10-20 segundos (con almanaque)
- **Hot start:** 1-5 segundos (con posición reciente)
- ✅ Módulos con batería backup: Mantienen almanaque → warm/hot start

### Precisión
- **Horizontal:** 2.5m CEP (típico), 1.5m (NEO-M9N)
- **Vertical:** 5-10m
- **Con GNSS múltiple (GPS+GLONASS+etc):** Mejor precisión y disponibilidad

---

## Disponibilidad (Chile)
- **AliExpress:** $8-25, envío 3-6 semanas
- **Amazon:** $15-35, envío 1-2 semanas
- **MercadoLibre Chile:** $15-40, disponibilidad local

---

**Última actualización:** Diciembre 2025
