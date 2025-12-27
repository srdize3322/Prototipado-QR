# Propuestas de Módulos Base ("Cerebros")

Comparativa de plataformas principales para el sistema QR+Wi-Fi.

## Diferencia Conceptual Clave

### ESP32 → Microcontrolador (MCU)
- Ejecuta una sola aplicación
- Sin sistema operativo completo
- Gestión manual de recursos (Wi-Fi, HTTP, memoria)
- Muy eficiente y económico
- **Limitado en interfaces simultáneas**

### Raspberry Pi / Orange Pi → Computador (SBC)
- Ejecuta Linux completo
- USB host real con drivers nativos
- Múltiples procesos, logs, debugging
- Mayor costo y consumo
- **Muy flexible para múltiples periféricos**

---

## Comparativa Rápida

| Plataforma | Precio | RAM/CPU | Wi-Fi | USB Host | GPIO/UART | Multi-Periférico | Recomendación |
|------------|--------|---------|-------|----------|-----------|------------------|---------------|
| **ESP32-DevKit** | $5-10 | 520KB/240MHz | 2.4GHz | ❌ | 30+/3 | ⚠️ Limitado | QR+Wi-Fi solo |
| **ESP32-S3** | $12-15 | 512KB/240MHz | 2.4GHz | ⚠️ | 45+/3 | ⚠️ Limitado | Versión lite |
| **Orange Pi Zero2** | $19-22 | 1GB/1.5GHz | 2.4+5GHz | ✅ | 26/1+USB | ✅ Excelente | Linux económico |
| **Raspberry Pi Zero 2W** | **$20** | 512MB/1GHz | 2.4+5GHz | ✅ | 40/1+USB | ✅ Excelente | **⭐ TOP multi-periférico** |
| **Arduino MKR 1010** | $38-45 | 32KB/48MHz | 2.4+5GHz | ❌ | 8/1 | ❌ | Batería integrada |

---

## Análisis Técnico: Múltiples Periféricos

### Problema de Interfaces en ESP32

**Lectores QR reales en el mercado:**
1. **USB (HID/Serial)** → Mayoría de modelos comerciales
2. **UART TTL** → Módulos OEM embebidos
3. **Cámara** → Solo SBC con procesamiento

**Limitación ESP32:**
- Solo 3 UART (compartidos con debug/flash)
- USB Host limitado e inestable
- Si conectas: QR UART + LTE UART + GPS UART → **Sin puertos disponibles**

**Ventaja SBC (RPi/OPi):**
- USB host real → plug & play
- QR USB + LTE USB + GPS USB → **Funciona simultáneamente**
- NetworkManager gestiona LTE automáticamente
- gpsd gestiona GPS sin configuración

### Tabla de Riesgos Técnicos

| Riesgo | ESP32 | SBC (RPi/OPi) |
|--------|-------|---------------|
| **Falta de interfaces** | 🔴 ALTO | 🟢 BAJO |
| **Lector QR incompatible** | 🟡 MEDIO | 🟢 BAJO |
| **LTE inestable** | 🔴 ALTO | 🟢 BAJO |
| **Debug en campo** | 🔴 DIFÍCIL | 🟢 FÁCIL (SSH) |
| **Escalar funciones** | 🔴 DIFÍCIL | 🟢 FÁCIL |

### Costos Reales

**ESP32 Completo (QR+LTE+GPS):**
- Hardware: $60-90
- Desarrollo firmware: Alto (gestión manual)
- Riesgo técnico: Alto

**RPi Zero 2W Completo:**
- Hardware: $90-130
- Desarrollo: Bajo (drivers existentes)
- Riesgo técnico: Bajo

**Diferencia:** +$25-35 USD vs **reducción drástica de riesgo**

---

## Criterios de Selección

### Para MVP solo QR + Wi-Fi (<$50):
➡️ **ESP32-DevKit** - Económico, suficiente

### Para múltiples periféricos (QR + LTE + GPS):
➡️ **Raspberry Pi Zero 2W** - ⭐ **RECOMENDADO**
- USB host real elimina conflictos
- Linux robusto con drivers probados
- Debugging trivial (SSH, logs)
- +$25-35 justificados por menor riesgo

### Para Linux económico:
➡️ **Orange Pi Zero2** - Similar RPi, $19, Wi-Fi 5GHz

### Si batería integrada es crítica:
➡️ **Arduino MKR** - Único con cargador, limitaciones técnicas

### ⚠️ ESP32 NO recomendado para múltiples periféricos:
- 3 UART insuficientes
- USB Host inestable
- Gestión manual compleja de recursos

## Archivos Detallados
- [ESP32-DevKit](esp32-devkit.md) - ⭐ Recomendado MVP
- [ESP32-S3](esp32-s3.md) - Avanzado
- [Orange Pi Zero2](orange-pi-zero2.md) - Linux económico
- [Raspberry Pi Zero 2W](raspberry-pi-zero-2w.md) - Linux premium
- [Arduino MKR WiFi 1010](arduino-mkr-wifi-1010.md) - Batería integrada
- ❌ Boot lento (20-40 seg)
- ❌ Costo mayor
- ❌ Más complejo (SD, OS, etc.)

**Usar si:** Necesitas procesamiento pesado, Python mandatorio, o múltiples servicios concurrentes

---

## Matriz de compatibilidad

### Con módulos de comunicación
| Módulo Base | Wi-Fi | Lector QR UART | GPS UART | LTE UART | USB Devices |
|-------------|-------|----------------|----------|----------|-------------|
| ESP32-DevKit | ✅ Int | ✅ Excelente | ✅ Excelente | ⚠️ Complejo | ❌ No |
| ESP32-S3 | ✅ Int | ✅ Excelente | ✅ Excelente | ⚠️ Complejo | ⚠️ Limitado |
| RPi Zero 2W | ✅ Int | ⚠️ Via USB mejor | ✅ Via USB mejor | ✅ Buena | ✅ Excelente |

**Leyenda:** Int = Integrado

### Con indicadores
| Módulo Base | LEDs | LED RGB | OLED I2C | TFT SPI | HDMI |
|-------------|------|---------|----------|---------|------|
| ESP32-DevKit | ✅ | ✅ | ✅ | ⚠️ RAM limitada | ❌ |
| ESP32-S3 | ✅ | ✅ | ✅ | ✅ Mejor | ❌ |
| RPi Zero 2W | ✅ | ✅ | ✅ | ✅ | ✅ |

---

## Recomendación para proyecto QR + Wi-Fi

### Fase 1: Prototipo básico
✅ **ESP32-DevKit** ($5-8)
- Suficiente para QR + Wi-Fi + LEDs
- Bajo costo para experimentar
- Amplia documentación

### Fase 2: Si se requiere cámara con decodificación software
✅ **ESP32-S3** ($12-15)
- Mejor procesamiento de imagen
- Más RAM

### Fase 3: Si se requiere procesamiento complejo o 4G USB
⚠️ **Raspberry Pi Zero 2W** ($30-40)
- Solo si ESP32 no es suficiente
- Considerar alto consumo

---

## Configuraciones ejemplo

### Configuración mínima viable (MVP)
```
ESP32-DevKit ($8)
├── Escáner QR UART ($35)
├── 2x LEDs ($0.50)
└── Alimentación USB 5V ($5)

Total: ~$48
```

### Configuración completa escalable
```
ESP32-DevKit ($8)
├── Escáner QR UART ($35)
├── GPS NEO-M8N ($15)
├── LED RGB WS2812B ($0.50)
├── OLED 0.96" ($4)
└── (Futuro) Slot para SIM7600 LTE

Total base: ~$62
+ LTE futuro: ~$35
```

### Configuración con cámara económica
```
ESP32-S3 ($15)
├── Cámara OV2640 ($6)
├── LED RGB ($0.50)
├── OLED ($4)
└── Decodificación QR por software

Total: ~$25 (más económico que escáner dedicado)
⚠️ Menor fiabilidad que escáner dedicado
```

---

## Próximos pasos

1. **Elegir módulo base** según requisitos del proyecto
2. **Revisar módulos disponibles** en carpeta `/modulos/`
3. **Validar compatibilidad** entre módulo base y módulos periféricos
4. **Calcular costo total** de la configuración elegida
5. **Verificar disponibilidad** en Chile

---

## Enlaces útiles

### Documentación módulos base
- [ESP32-DevKit](esp32-devkit.md) - Detalles completos
- [ESP32-S3](esp32-s3.md) - Detalles completos
- [Raspberry Pi Zero 2W](raspberry-pi-zero-2w.md) - Detalles completos

### Módulos periféricos
- [Lectores QR](../modulos/lector-qr.md)
- [Módulos Wi-Fi](../modulos/wifi.md)
- [Módulos GPS](../modulos/gps.md)
- [Módulos LTE](../modulos/lte.md)
- [Indicadores LED](../modulos/led-indicadores.md)

### README principal
- [Volver al inicio](../README.md)

---

**Última actualización:** Diciembre 2025
