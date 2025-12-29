# LEDs & Indicadores

## Estados del Sistema

| Estado | Verde | Rojo | Descripción |
|--------|-------|------|-------------|
| Boot | 3 blinks | OFF | Iniciando |
| Wi-Fi conectando | Pulsando | OFF | Buscando red |
| Wi-Fi OK | Fijo | OFF | Listo |
| QR leído OK | 2 blinks | OFF | Scan exitoso |
| Error servidor | OFF | 3 blinks | HTTP error |
| Error QR | OFF | Pulsando | Ilegible |
| Sin Wi-Fi | OFF | Fijo | Desconectado |

---

## Opciones

| Opción | Precio | GPIO | Ventaja | Complejidad |
|--------|--------|------|---------|-------------|
| **2 LEDs individuales** | $0.50 | 2 | Suficiente para MVP | Muy fácil |
| **LED RGB (WS2812)** | $1.50 | 1 | Múltiples colores | Fácil |
| **OLED 0.96" I2C** | $3-5 | 2 | Texto, debugging | Media |
| **Buzzer** | $0.50 | 1 | Beep confirmación | Fácil |

**Conexión LEDs individuales:** GPIO → 220Ω → LED → GND (Verde=GPIO25, Rojo=GPIO26)

---

## Recomendación MVP

**2 LEDs (Verde + Rojo)** + resistencias 220Ω = $0.50  
Suficiente para todos los estados del sistema.
