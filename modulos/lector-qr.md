# Lectores QR

Módulos para escaneo de códigos 1D y 2D.

## Tecnologías

| Tipo | Precio | Interface | Velocidad | Uso |
|------|--------|-----------|-----------|-----|
| **Escáner UART/USB** | $28-66 | UART/USB | <100ms | Recomendado |
| **Cámara + Software** | $8-25 | CSI/USB | 0.5-2s | Alternativa |

---

## Escáneres Dedicados

### GM67/GM65
- **Precio:** $28-30
- **Formatos:** QR, DataMatrix, PDF417, códigos 1D
- **Velocidad:** ~100ms
- **Rango:** 5-30 cm
- **Interfaces:** UART (9600-115200 baud) o USB
- **Consumo:** ~100mA

**Compatibilidad:**
- ESP32: UART directo
- RPi/OPi: USB plug & play
- Arduino MKR: UART compartido

### DYScan DE2120
- **Precio:** $66
- **Velocidad:** <50ms
- **Rango:** 3-40 cm
- **Ventaja:** Mayor velocidad y rango

### M5Stack QR Module
- **Precio:** $20
- **Interface:** I2C
- **Limitación:** Rango reducido

---

## Alternativa Cámara

**ESP32-CAM:** $8-12, ~1-2s lectura, requiere iluminación  
**RPi Camera:** $15-25, ~500ms lectura, mayor flexibilidad

---

## Recomendación

**GM67** ($28-30): Mejor balance precio/velocidad/compatibilidad  
**DE2120** ($66): Si presupuesto permite y requiere mayor velocidad
