# GPS - Geolocalización

## Opciones

| Módulo | Interface | Precio | Precisión | Cold Start | Recomendación |
|--------|-----------|--------|-----------|------------|---------------|
| **NEO-6M** | UART | $8-12 | ~2.5m | 27s | ⭐ MVP |
| **NEO-M8N** | UART | $12-18 | ~2.5m | 26s | Mejor |
| **USB GPS** | USB | $15-25 | Variable | 20-30s | RPi/OPi |

---

## NEO-6M/M8N - Recomendado

### Specs NEO-6M:
- **Precio:** $8-12
- **Interface:** UART (9600 baud)
- **Protocolo:** NMEA 0183
- **Voltaje:** 3.3-5V
- **Update:** 1-5 Hz

### Specs NEO-M8N:
- **Precio:** $12-18
- **Ventajas:** Menor consumo, start más rápido
- **Compatible:** Drop-in replacement de 6M

**Compatibilidad:**
- ESP32: ✅ UART1 o GPIO libres (32, 33)
- RPi/OPi: ✅ UART GPIO o USB
- Arduino MKR: ⚠️ Software Serial

---

## Configuración Típica

| Config | GPS | Plataforma | Costo | Dificultad |
|--------|-----|------------|-------|------------|
| **ESP32** | NEO-6M | ESP32 | +$10 | ⭐ Fácil |
| **RPi USB** | USB GPS | RPi | +$20 | ⭐ Fácil (gpsd) |

---

## Integración con Sistema

**Campos adicionales a enviar:** Incluir `latitude`, `longitude`, `gps_accuracy` y número de `satellites` en el payload JSON del endpoint /scan.

---

## Consideraciones

- **Cold start:** 27-30s (primera vez)
- **Hot start:** <1s (almanaque válido)
- **Precisión:** ~2.5m estándar
- **Antena:** Integrada suficiente, externa para vehículos

---

## Recomendación

### Para MVP:
**Opcional** - Solo si geolocalización es requerida  
**NEO-6M** ($8-10) si presupuesto ajustado  
**NEO-M8N** ($12-15) si mejor rendimiento

### Sistema base + GPS:
- ESP32 + QR: $45
- +GPS: $55-60 total
