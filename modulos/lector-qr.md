# Lectores QR - Módulos Periféricos

## Tecnologías Disponibles

| Tipo | Precio | Interface | Latencia | Pros/Contras |
|------|--------|-----------|----------|--------------|
| **UART 2D** | $28-66 | UART/USB | ~100ms | ✅ Rápido, dedicated ⚠️ Rígido posicionamiento |
| **Cámara + CV** | $8-20 | CSI/USB | ~500ms-2s | ✅ Flexible, económico ⚠️ Lento, requiere procesamiento |

---

## Opción 1: Escáneres UART Dedicados (Recomendado MVP)

### GM67/GM65 - **TOP CHOICE**
- **Precio:** $28-30 (AliExpress)
- **Interface:** UART (9600-115200 baud) o USB
- **Lectura:** 1D + 2D (QR, DataMatrix, PDF417, etc.)
- **Rango:** 5-30 cm (según código)
- **Voltaje:** 3.3-5V
- **Consumo:** ~100 mA activo, <5 mA sleep
- **Trigger:** Auto-sense, botón, serial command
- **Salida:** ASCII directo por UART

**Compatibilidad:**
| Plataforma | Conexión | Notas |
|------------|----------|-------|
| ESP32 | ✅ UART2 directo | 3.3V compatible |
| Orange Pi | ✅ UART GPIO | Python serial |
| RPi Zero 2W | ✅ UART GPIO/USB | USB plug & play |
| Arduino MKR | ⚠️ UART único | Conflicto con debug |

**Configuración ESP32:**
```cpp
HardwareSerial QRSerial(2); // UART2
QRSerial.begin(9600, SERIAL_8N1, 16, 17); // RX=16, TX=17
```

---

### DYScan DE2120 - Premium
- **Precio:** ~$66 (Amazon)
- **Interface:** USB/UART
- **Lectura:** 1D + 2D ultra-rápido (<50ms)
- **Rango:** 3-40 cm
- **Ventajas:** Mayor rango, más robusto
- **Desventaja:** 2x precio de GM67

**Usar si:** Presupuesto permite y necesitas velocidad/distancia

---

### M5Stack QR Code Module 13.2
- **Precio:** $19.95
- **Interface:** I2C (dirección 0x21)
- **Resolución:** 640x480
- **Ventaja:** Ecosistema M5Stack
- **Desventaja:** Solo compatible con M5Stack/ESP32, menor rango

---

## Opción 2: Cámara + OpenCV (Escalado Futuro)

### ESP32-CAM
- **Precio:** $8-12
- **Procesamiento:** ZBar/OpenCV local (lento ~1-2s)
- **Ventaja:** Muy económico, puede capturar imagen
- **Desventaja:** Requiere iluminación buena, lento

### Raspberry Pi Camera Module
- **Precio:** $15-25
- **Procesamiento:** Python OpenCV (~500ms)
- **Ventaja:** Flexible, puede hacer visión adicional
- **Requiere:** RPi/Orange Pi (no ESP32)

---

## Comparativa de Configuraciones

| Config | Lector | Plataforma | Costo Total | Velocidad | Dificultad |
|--------|--------|------------|-------------|-----------|------------|
| **MVP Básico** | GM67 | ESP32 | ~$45 | ⚡⚡⚡ | ⭐ Fácil |
| **MVP Premium** | DE2120 | ESP32 | ~$80 | ⚡⚡⚡ | ⭐ Fácil |
| **Linux Simple** | GM67 USB | RPi Zero 2W | ~$70 | ⚡⚡⚡ | ⭐⭐ Media |
| **Económico Lento** | ESP32-CAM | ESP32 | ~$18 | ⚡ Lento | ⭐⭐⭐ Difícil |

---

## Recomendación Final

### Para MVP inmediato:
➡️ **GM67 ($28-30)** + **ESP32-DevKit ($8)**
- Total: ~$45
- Configuración: 30 minutos
- Velocidad: <100ms lectura
- Escalable: Añadir GPS/LTE después

### Si presupuesto permite:
➡️ **DYScan DE2120** para mejor rango/robustez

### Evitar para MVP:
❌ Cámara + OpenCV - Lento, complejo, requiere iluminación controlada

---

## Cableado Típico (GM67 + ESP32)

```
GM67          ESP32
─────────────────────
VCC (rojo)  → 5V
GND (negro) → GND
TXD (verde) → GPIO16 (RX2)
RXD (azul)  → GPIO17 (TX2)
```

**Nota:** Si GM67 es 5V TX, usar divisor de voltaje 5V→3.3V en RX del ESP32.
