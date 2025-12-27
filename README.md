# Prototipado QR + Wi-Fi

Sistema modular IoT: lectura QR, envío Wi-Fi, escalable (GPS/LTE).

---

## 🎯 Recomendación Final

### 🥇 Raspberry Pi Zero 2W - **PRIMERA OPCIÓN**
- **Precio:** $20 | **MVP completo:** $60-130
- **Por qué:** USB host real, múltiples periféricos sin conflicto, Linux robusto
- **Cuándo:** Producción, escalabilidad, QR + LTE + GPS

### 🥈 ESP32-DevKit - **SEGUNDA OPCIÓN**  
- **Precio:** $8 | **MVP simple:** $45
- **Por qué:** Económico, suficiente para caso básico
- **Cuándo:** Solo QR + Wi-Fi, sin expansión futura

**Diferencia clave:** +$15-30 elimina riesgo técnico de múltiples periféricos.

---

## 📶 Configuración Wi-Fi Inicial

**Todos los dispositivos** pueden crear red Wi-Fi propia para configuración:

1. Primera vez → crea red "QR-Setup-XXX"
2. Usuario conecta con teléfono
3. Portal web para ingresar Wi-Fi y contraseña
4. Dispositivo guarda y se reconecta
5. Listo para usar

✅ **Trivial en RPi y ESP32** - No es factor diferenciador.

---

## 💰 Costos por Configuración

| Config | Plataforma | Precio | Uso |
|--------|------------|--------|-----|
| **Simple** | ESP32 + QR UART | $45 | QR + Wi-Fi básico |
| **Completo** | RPi + QR USB | $60 | Multi-periférico base |
| **+GPS** | RPi + GPS USB | $75 | Geolocalización |
| **+LTE** | RPi + LTE USB | $110 | Conectividad celular |
| **Todo** | RPi + QR + GPS + LTE | $130 | Sistema completo |

---

## 📂 Estructura

```
propuestas/          # Módulos base
├── raspberry-pi-zero-2w.md  🥇 Recomendado
├── esp32-devkit.md          🥈 Alternativa
├── orange-pi-zero2.md
├── esp32-s3.md
└── arduino-mkr-wifi-1010.md

modulos/             # Periféricos
├── lector-qr.md            GM67/DE2120 (UART/USB)
├── comunicacion.md         HTTP REST / MQTT
├── gps.md                  NEO-6M/M8N
├── lte.md                  SIM7600/USB dongles
└── led-indicadores.md      Estados visuales
```

---

## 🚀 Comenzar Rápido

### Opción A: Producción (Recomendado)
- Raspberry Pi Zero 2W: $20
- QR USB: $30
- SD + fuente: $15
- **Total: $65** → Escalable a GPS/LTE después

### Opción B: Prueba Económica
- ESP32-DevKit: $8
- QR UART: $30
- LEDs: $2
- **Total: $40** → Solo QR + Wi-Fi

---

## 📋 Decisión por Caso

| Tu Necesidad | Usa | Por Qué |
|--------------|-----|---------|
| **Producción** | RPi Zero 2W | Robusto, escalable |
| **QR + LTE + GPS** | RPi Zero 2W | Única práctica |
| **Solo prueba QR** | ESP32 | Económico |
| **Presupuesto <$50** | ESP32 | Mínimo viable |

---

## 📖 Documentación

- [propuestas/README.md](propuestas/README.md) - Análisis técnico completo
- [modulos/README.md](modulos/README.md) - Periféricos y compatibilidad

---

## ⚠️ Nota Importante

**ESP32 con múltiples periféricos:**
- Solo 3 UART (QR + LTE + GPS = conflicto)
- USB Host inestable
- Gestión manual compleja

**Raspberry Pi Zero 2W:**
- USB host real = todos los periféricos simultáneos
- Linux = debugging fácil (SSH, logs)
- +$15-30 vs eliminación de riesgo técnico

Ver [propuestas/README.md](propuestas/README.md) para detalles técnicos.
