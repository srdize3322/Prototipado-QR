# LEDs & Indicadores

## Estados del Sistema

| Estado | Verde | Rojo | Descripción |
|--------|-------|------|-------------|
| Boot | ⚡ 3 blinks | OFF | Iniciando |
| Wi-Fi conectando | 💫 Pulsando | OFF | Buscando red |
| Wi-Fi OK | ✅ Fijo | OFF | Listo |
| QR leído OK | ⚡ 2 blinks | OFF | Scan exitoso |
| Error servidor | OFF | ⚡ 3 blinks | HTTP error |
| Error QR | OFF | 💫 Pulsando | Ilegible |
| Sin Wi-Fi | OFF | ✅ Fijo | Desconectado |

---

## Opciones

### 1. LEDs Individuales - ⭐ Recomendado MVP
- **Precio:** $0.50 (2 LEDs + resistencias)
- **Conexión:** GPIO → 220Ω → LED → GND
- **Pines:** Verde=GPIO25, Rojo=GPIO26

### 2. LED RGB (WS2812/NeoPixel)
- **Precio:** $1.50
- **Control:** 1 pin GPIO
- **Ventaja:** Múltiples colores
- **Librería:** Adafruit_NeoPixel

### 3. OLED 0.96" I2C
- **Precio:** $3-5
- **Resolución:** 128x64
- **Ventaja:** Texto, debugging visual
- **Librería:** Adafruit_SSD1306

### 4. Buzzer (Opcional)
- **Precio:** $0.50
- **Uso:** Beep confirmación (tone() function)

---

## Comparativa

| Opción | Precio | GPIO | Info | Complejidad |
|--------|--------|------|------|-------------|
| **2 LEDs** | $0.50 | 2 | Básica | ⭐ Muy fácil |
| **LED RGB** | $1.50 | 1 | Media | ⭐⭐ Fácil |
| **OLED** | $3-5 | 2 (I2C) | Alta | ⭐⭐⭐ Media |

---

## Recomendación MVP
**2 LEDs (Verde + Rojo)** + resistencias 220Ω  
- Costo: $0.50
- Suficiente para todos los estados
- Muy simple de implementar
