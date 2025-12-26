# Módulos Base - "Cerebros" del Sistema

Esta carpeta contiene las propuestas de **módulos base** o "cerebros" que coordinan todo el sistema.

## ¿Qué es un módulo base?

El módulo base es el **microcontrolador o computadora principal** que:
- Ejecuta la lógica del programa
- Se conecta a otros módulos (QR, GPS, LTE, etc.)
- Maneja las comunicaciones (Wi-Fi, servidor)
- Controla los indicadores (LEDs, pantallas)

## Módulos base disponibles

| Módulo | Tipo | Costo | Wi-Fi | Programación | Complejidad | Consumo |
|--------|------|-------|-------|--------------|-------------|---------|
| [ESP32-DevKit](esp32-devkit.md) | MCU | $5-8 | ✅ | Arduino/C++ | Baja | Bajo |
| [ESP32-S3](esp32-s3.md) | MCU | $12-15 | ✅ | Arduino/C++ | Baja | Bajo |
| [Raspberry Pi Zero 2W](raspberry-pi-zero-2w.md) | SBC Linux | $30-40 | ✅ | Python/Node/etc | Media | Alto |

---

## Comparativa rápida

### ESP32-DevKit ⭐ **Recomendado para mayoría de casos**
- ✅ Precio más bajo ($5-8)
- ✅ Wi-Fi integrado
- ✅ Fácil programación (Arduino)
- ✅ Bajo consumo (~100-200 mA)
- ✅ Boot instantáneo
- ✅ Compatible con todos los módulos UART/I2C/SPI
- ⚠️ Solo 3.3V lógica (algunos módulos necesitan level shifter)

**Usar si:** Proyecto simple a medio, prioridad costo y consumo

### ESP32-S3 ⭐ **Para casos avanzados**
- ✅ Más potente que ESP32 estándar
- ✅ USB nativo (debugging fácil)
- ✅ Mejor para procesamiento imagen (si usas cámara)
- ✅ Más RAM
- ⚠️ Precio ~50% mayor que ESP32 estándar

**Usar si:** Necesitas procesar imagen/video, interfaz rica, o más potencia

### Raspberry Pi Zero 2 W ⚠️ **Solo casos específicos**
- ✅ Linux completo
- ✅ Máxima flexibilidad software (Python, Node.js, etc.)
- ✅ Excelente para prototipado rápido
- ✅ Mejor soporte USB (dongles 4G, etc.)
- ❌ Alto consumo (~10x ESP32)
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
