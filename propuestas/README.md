# Propuestas de Módulos Base ("Cerebros")

Comparativa de plataformas principales para el sistema QR+Wi-Fi:

## Comparativa Rápida

| Plataforma | Precio | RAM/CPU | Wi-Fi | Batería | GPIO/UART | Expansión | Recomendación |
|------------|--------|---------|-------|---------|-----------|-----------|---------------|
| **ESP32-DevKit** | $5-10 | 520KB/240MHz | 2.4GHz | Externo | 30+/3 | ⭐⭐⭐ | **⭐ TOP MVP** |
| **ESP32-S3** | $12-15 | 512KB/240MHz | 2.4GHz | Externo | 45+/3 | ⭐⭐⭐ | Avanzado/cámara |
| **Orange Pi Zero2** | $19-22 | 1GB/1.5GHz | 2.4+5GHz | UPS HAT | 26/1 | ⭐⭐ | Alt. Linux |
| **Raspberry Pi Zero 2W** | $30-40 | 512MB/1GHz | 2.4+5GHz | Externo | 40/1 | ⭐⭐⭐ | Premium Linux |
| **Arduino MKR 1010** | $38-45 | 32KB/48MHz | 2.4+5GHz | **Integrado** | 8/1 | ⭐ | Solo si batería crítica |

## Criterios de Selección

### Para MVP (<$60 total):
➡️ **ESP32-DevKit** - Máximo valor, fácil expansión

### Si necesitas Linux:
➡️ **Orange Pi Zero2** (disponibilidad/precio) o **RPi Zero 2W** (soporte/comunidad)

### Si expansión compleja futura (LTE+GPS+Cámara):
➡️ **ESP32-S3** - Más GPIO y potencia, compatible ESP32

### Si batería integrada es crítica:
➡️ **Arduino MKR** - Único con cargador, pero costoso y limitado

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
