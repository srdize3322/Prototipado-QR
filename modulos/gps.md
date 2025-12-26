# GPS - Geolocalización

## Opciones Disponibles

| Módulo | Interface | Precio | Precisión | Tiempo Cold Start | Consumo |
|--------|-----------|--------|-----------|-------------------|---------|
| **NEO-6M** | UART | $8-12 | ~2.5m | 27s | 45 mA |
| **NEO-M8N** | UART | $12-18 | ~2.5m | 26s | 35 mA |
| **NEO-M9N** | UART | $20-30 | ~1.5m | 24s | 30 mA |
| **GT-U7** | UART | $6-10 | ~3m | 30s | 50 mA |
| **USB GPS** | USB | $15-25 | Variable | 20-30s | 80-150 mA |

---

## Recomendación MVP: NEO-6M/M8N

### NEO-6M (Básico)
- **Precio:** $8-12 (AliExpress)
- **Interface:** UART (9600 baud default)
- **Protocolo:** NMEA 0183
- **Voltaje:** 3.3-5V
- **Antena:** Cerámica integrada o externa (conector U.FL)
- **Update rate:** 1-5 Hz

**Compatibilidad:**
| Plataforma | Conexión | Notas |
|------------|----------|-------|
| ESP32 | ✅ UART1/Software Serial | GPIO libres (ej: 32, 33) |
| Orange Pi | ✅ UART GPIO | Python serial + gpsd |
| RPi Zero 2W | ✅ UART GPIO/USB | gpsd daemon |
| Arduino MKR | ⚠️ Software Serial | Limitado |

**Configuración ESP32:**
```cpp
#include <TinyGPS++.h>

TinyGPSPlus gps;
HardwareSerial GPSSerial(1); // UART1

void setup() {
  GPSSerial.begin(9600, SERIAL_8N1, 32, 33); // RX=32, TX=33
}

void loop() {
  while (GPSSerial.available()) {
    gps.encode(GPSSerial.read());
  }
  
  if (gps.location.isValid()) {
    float lat = gps.location.lat();
    float lng = gps.location.lng();
  }
}
```

---

### NEO-M8N (Mejor)
- **Precio:** $12-18
- **Ventajas:** Menor consumo, start más rápido
- **Compatible:** Igual que NEO-6M (drop-in replacement)

---

## Alternativas USB (Linux)

### Ventajas:
- ✅ Plug & play en RPi/Orange Pi
- ✅ No ocupa UART
- ✅ gpsd gestiona todo

### Desventajas:
- ⚠️ Mayor consumo
- ⚠️ No compatible ESP32 (sin USB Host)
- ⚠️ Ocupa único puerto USB

---

## Configuraciones Típicas

| Config | GPS | Plataforma | Costo Adicional | Dificultad |
|--------|-----|------------|-----------------|------------|
| **ESP32 Básico** | NEO-6M UART | ESP32 | +$10 | ⭐ Fácil |
| **ESP32 + QR + GPS** | NEO-M8N | ESP32 | +$15 | ⭐⭐ Media |
| **Linux USB** | USB GPS | RPi/OPi | +$20 | ⭐ Fácil |

---

## Consideraciones Importantes

### Tiempo de inicio:
- **Cold start:** 27-30s (primera vez sin almanaque)
- **Hot start:** <1s (con almanaque válido)
- **Mejora:** Guardar almanaque en EEPROM/Flash

### Precisión:
- **NEO-6M/M8N:** ~2.5m CEP
- **Con SBAS (WAAS/EGNOS):** ~1m
- **Mejora:** Antena externa para mejor señal

### Antena:
- ✅ Integrada: Suficiente para exteriores
- ⚠️ Externa: Requerida en vehículos (conector U.FL)

### UART:
- **QR en UART2:** Usar UART1 o Software Serial para GPS
- **ESP32:** 3 UART hardware disponibles

---

## Integración con Sistema

### JSON con GPS:
```json
{
  "device_id": "ESP32-ABC123",
  "timestamp": "2024-01-15T10:30:45Z",
  "qr_value": "https://example.com/item/456",
  "latitude": -33.4489,
  "longitude": -70.6693,
  "gps_accuracy": 2.5,
  "satellites": 8
}
```

---

## Recomendación Final

### Para MVP:
➡️ **Opcional** - Añadir solo si geolocalización es requerida
➡️ **NEO-6M** si presupuesto ajustado ($8-10)
➡️ **NEO-M8N** si mejor rendimiento ($12-15)

### Expansión:
- Sistema base: $45 (ESP32 + QR)
- +GPS: $55-60 total
- Escalable a LTE después
