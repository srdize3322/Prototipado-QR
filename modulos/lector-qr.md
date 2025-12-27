# Lectores QR

## Tipos Disponibles

| Tipo | Precio | Interface | Velocidad | Recomendación |
|------|--------|-----------|-----------|---------------|
| **UART Dedicado** | $28-66 | UART/USB | ~100ms | ⭐ MVP |
| **Cámara + OpenCV** | $8-20 | CSI/USB | ~1-2s | Futuro |

---

## Opción 1: Escáneres UART - ⭐ Recomendado

### GM67/GM65 - TOP CHOICE
- **Precio:** $28-30
- **Interface:** UART (9600-115200) o USB
- **Códigos:** 1D + 2D (QR, DataMatrix, PDF417)
- **Rango:** 5-30 cm
- **Consumo:** ~100 mA activo
- **Salida:** ASCII directo

**Compatibilidad:**
- ESP32: ✅ UART2 directo (RX=16, TX=17)
- RPi/OPi: ✅ USB plug & play
- Arduino MKR: ⚠️ UART único

**Cableado ESP32:**
```
GM67 → ESP32
VCC → 5V | GND → GND | TX → GPIO16 | RX → GPIO17
```

---

### DYScan DE2120 - Premium
- **Precio:** $66
- **Velocidad:** <50ms (ultra-rápido)
- **Rango:** 3-40 cm (mejor que GM67)
- **Usar si:** Presupuesto permite

---

### M5Stack QR Module
- **Precio:** $19.95
- **Interface:** I2C
- **Ecosistema:** M5Stack/ESP32
- **Limitación:** Menor rango

---

## Opción 2: Cámara - Futuro

### ESP32-CAM
- **Precio:** $8-12
- **Velocidad:** ~1-2s (lento)
- **Requiere:** Buena iluminación

### RPi Camera
- **Precio:** $15-25
- **Velocidad:** ~500ms
- **Ventaja:** Flexible

---

## Comparativa

| Config | Lector | Plataforma | Costo | Velocidad |
|--------|--------|------------|-------|-----------|
| **MVP Básico** | GM67 | ESP32 | $45 | ⚡⚡⚡ |
| **MVP Premium** | DE2120 | ESP32 | $80 | ⚡⚡⚡ |
| **Linux** | GM67 USB | RPi | $60 | ⚡⚡⚡ |

---

## Recomendación

➡️ **GM67 ($28-30)** + plataforma elegida  
- Mejor balance precio/rendimiento
- Compatible con todas las plataformas
- Velocidad suficiente (<100ms)
