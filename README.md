# Prototipado QR + Wi-Fi

Sistema modular IoT para lectura de códigos QR y envío vía Wi-Fi, escalable a GPS/LTE.

## 🎯 Objetivo

**Módulo físico** que:
1. Lee códigos QR → 2. Envía a servidor vía Wi-Fi → 3. Escalable (GPS, LTE, batería)

---

## 📂 Estructura

```
propuestas/          # Módulos base ("cerebros")
├── esp32-devkit.md         ⭐ Recomendado MVP
├── esp32-s3.md             Avanzado/cámara
├── orange-pi-zero2.md      Linux económico
├── raspberry-pi-zero-2w.md Linux premium
└── arduino-mkr-wifi-1010.md Batería integrada

modulos/             # Periféricos
├── lector-qr.md            Escáneres UART/USB
├── comunicacion.md         HTTP REST / MQTT
├── wifi.md                 (Integrado en base)
├── gps.md                  Geolocalización
├── lte.md                  Conectividad móvil
└── led-indicadores.md      Estados visuales
```

---

## 💰 Configuraciones & Presupuesto

| Config | Componentes | Costo | Uso |
|--------|-------------|-------|-----|
| **MVP Básico** | ESP32 + GM67 + LEDs | **$45** | ⭐ Recomendado inicio |
| **MVP Premium** | ESP32 + DE2120 + LEDs | $80 | Mejor rango/velocidad |
| **+GPS** | MVP + NEO-M8N | $60 | Geolocalización |
| **+LTE Simple** | RPi Zero 2W + USB 4G | $100 | Celular fácil |
| **+LTE Complejo** | ESP32 + SIM7600 | $95 | Celular optimizado |

---

## 🚀 Comenzar: MVP en 3 Pasos

### 1. Hardware ($45 total)
- [ESP32-DevKit](propuestas/esp32-devkit.md): $8
- [GM67 QR UART](modulos/lector-qr.md): $30
- [2 LEDs + resistencias](modulos/led-indicadores.md): $0.50
- Cables dupont: $2
- Fuente USB 5V/2A: $5

### 2. Conexiones
```
GM67 → ESP32
───────────────
VCC  → 5V
GND  → GND
TX   → GPIO16 (RX2)
RX   → GPIO17 (TX2)

LEDs → ESP32
───────────────
Verde → GPIO25 → 220Ω → LED → GND
Rojo  → GPIO26 → 220Ω → LED → GND
```

### 3. Código Base
Ver [modulos/comunicacion.md](modulos/comunicacion.md) para endpoints HTTP y lógica LED

---

## 📊 Comparativa Rápida Plataformas

| Plataforma | Precio | Complejidad | Expansión | Recomendación |
|------------|--------|-------------|-----------|---------------|
| **ESP32-DevKit** | $8 | ⭐ Fácil | ⭐⭐⭐ | **⭐ MVP** |
| **ESP32-S3** | $15 | ⭐⭐ | ⭐⭐⭐ | Avanzado |
| **Orange Pi Zero2** | $22 | ⭐⭐ | ⭐⭐ | Alt. Linux |
| **RPi Zero 2W** | $40 | ⭐⭐ | ⭐⭐⭐ | Premium |
| **Arduino MKR** | $45 | ⭐ | ⭐ | Solo si batería crítica |

---

## 🔧 Tecnologías

- **HW:** ESP32, Raspberry Pi, GM67/DE2120 QR scanners
- **SW:** Arduino C++, Python, PlatformIO
- **Comunicación:** Wi-Fi 2.4/5GHz, HTTPS REST, MQTT
- **Interfaces:** UART, I2C, SPI, GPIO

---

## 📖 Documentación Detallada

- [Plataformas Base](propuestas/README.md) - Comparativa cerebros
- [Módulos Periféricos](modulos/README.md) - QR, GPS, LTE, LEDs
- [Protocolos Comunicación](modulos/comunicacion.md) - HTTP/MQTT + JSON

---

## ✅ Roadmap

- [x] Investigación hardware
- [x] Documentación módulos
- [x] Matrices compatibilidad
- [x] Protocolos comunicación
- [ ] **Siguiente:** Prototipo físico MVP
- [ ] Firmware ESP32 completo
- [ ] Testing conectividad
- [ ] Expansión GPS/LTE

---

## 🎯 Decisión Rápida

**¿Presupuesto <$60?** → ESP32 + GM67  
**¿Necesitas Linux?** → Orange Pi Zero2  
**¿Máxima velocidad?** → ESP32 + DE2120  
**¿Batería integrada crítica?** → Arduino MKR (⚠️ costoso)

Ver archivos individuales para specs técnicas completas.
