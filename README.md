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
| **MVP Simple** | ESP32 + GM67 + LEDs | **$45** | Solo QR + Wi-Fi |
| **MVP Completo** | RPi Zero 2W + QR USB + LEDs | **$60** | ⭐ Multi-periférico |
| **+GPS** | RPi + GPS USB | $75 | Geolocalización |
| **+LTE** | RPi + LTE USB + Hub | $110 | Conectividad celular |
| **Todo integrado** | RPi + QR + GPS + LTE | $130 | Sistema completo |

---

## 🚀 Comenzar: Dos Rutas MVP

### Ruta A: Simple (Solo QR + Wi-Fi) - $45

**Hardware:**
- [ESP32-DevKit](propuestas/esp32-devkit.md): $8
- [GM67 QR UART](modulos/lector-qr.md): $30
- [2 LEDs + resistencias](modulos/led-indicadores.md): $0.50
- Cables dupont: $2
- Fuente USB 5V/2A: $5

**Conexiones:**
```
GM67 → ESP32
───────────────
VCC  → 5V
GND  → GND
TX   → GPIO16 (RX2)
RX   → GPIO17 (TX2)
```

---

### Ruta B: Completo (QR + LTE + GPS) - $60-130 ⭐ Recomendado

**Hardware:**
- [Raspberry Pi Zero 2W](propuestas/raspberry-pi-zero-2w.md): $20
- [GM67 QR USB](modulos/lector-qr.md): $30
- SD 16GB + Fuente: $15
- LEDs: $0.50
- GPS USB (opcional): $15
- LTE USB (opcional): $45

**Ventajas:**
- ✅ USB host real - plug & play
- ✅ Múltiples periféricos sin conflicto
- ✅ Linux completo - debugging fácil
- ✅ Escalable sin reescribir código

**Ver:** [propuestas/README.md](propuestas/README.md) para análisis técnico detallado

---

## 📊 Comparativa Rápida Plataformas

| Plataforma | Precio | Complejidad | Expansión | Recomendación |
|------------|--------|-------------|-----------|---------------|
| **ESP32-DevKit** | $8 | ⭐ Fácil | ⭐⭐ | QR+Wi-Fi solo |
| **ESP32-S3** | $15 | ⭐⭐ | ⭐⭐ | Versión lite |
| **Orange Pi Zero2** | $19 | ⭐⭐ | ⭐⭐⭐ | Linux económico |
| **RPi Zero 2W** | **$20** | ⭐⭐ | ⭐⭐⭐ | **⭐ MVP multi-periférico** |
| **Arduino MKR** | $45 | ⭐ | ⭐ | Solo batería integrada |

---

## 🔧 Tecnologías

- **HW:** ESP32, Raspberry Pi, GM67/DE2120 QR scanners
- **SW:** Arduino C++, Python, PlatformIO
- **Comunicación:** Wi-Fi 2.4/5GHz, HTTPS REST, MQTT
- **Interfaces:** UART, I2C, SPI, GPIO

---

## 📖 Documentación Detallada

- [Plataformas Base](propuestas/README.md) - Comparativa cerebros + análisis técnico
- [Módulos Periféricos](modulos/README.md) - QR, GPS, LTE, LEDs
- [Protocolos Comunicación](modulos/comunicacion.md) - HTTP/MQTT + JSON

---

## 🎯 Decisión por Caso de Uso

| Tu Necesidad | Plataforma Recomendada | Costo | Por Qué |
|--------------|------------------------|-------|---------|
| **QR + Wi-Fi básico** | ESP32-DevKit | $45 | Económico, suficiente |
| **QR + GPS** | RPi Zero 2W | $75 | USB flexible |
| **QR + LTE** | RPi Zero 2W | $90 | Módem USB estable |
| **QR + LTE + GPS** | **RPi Zero 2W** ⭐ | $130 | **Única opción práctica** |
| **Batería integrada** | Arduino MKR | $85 | Cargador integrado |

### ⚠️ Advertencia ESP32 con Múltiples Periféricos

**Problema:** ESP32 tiene solo 3 UART (compartidos). Conectar QR + LTE + GPS simultáneamente causa:
- Conflicto de puertos
- USB Host inestable
- Gestión manual compleja

**Solución:** Raspberry Pi Zero 2W tiene USB host real → todos los periféricos funcionan plug & play.

**Diferencia de costo:** Solo +$25-35 vs **eliminación de riesgo técnico**.

Ver [propuestas/README.md](propuestas/README.md) para análisis técnico completo.

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

**¿Solo QR + Wi-Fi?** → ESP32 + GM67 ($45)  
**¿QR + LTE + GPS?** → **RPi Zero 2W** ($60-130) ⭐ Recomendado  
**¿Linux económico?** → Orange Pi Zero2 ($19)  
**¿Batería integrada?** → Arduino MKR ($45)

📄 Ver [propuestas/README.md](propuestas/README.md) para análisis técnico detallado
