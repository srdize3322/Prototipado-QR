# ESP32-S3 - MCU Avanzado

## Specs
- **CPU:** Dual-core Xtensa LX7 240 MHz | **RAM:** 512 KB | **Flash:** 8 MB (típico)
- **Wi-Fi:** 2.4 GHz b/g/n integrado | **BT:** 5.0 BLE
- **Interfaces:** 3 UART, 4 SPI, 2 I2C, 45 GPIO
- **USB:** Nativo (OTG) - debugging directo, sin UART-USB bridge
- **Consumo:** Similar ESP32 estándar
- **Programación:** Arduino, ESP-IDF, compatible ESP32

## vs ESP32 Estándar

| Feature | ESP32 | ESP32-S3 |
|---------|-------|----------|
| **Precio** | $5-8 | $12-15 |
| **GPIO** | 30+ | 45 |
| **USB** | Via bridge | **Nativo** |
| **BT** | 4.2 | **5.0** |
| **CPU Core** | LX6 | **LX7** (mejor) |
| **RAM** | 520 KB | 512 KB |
| **Cámara** | Requiere CAM | **Mejor soporte** |

## Compatibilidad Módulos

| Módulo | Compatible | Notas |
|--------|-----------|-------|
| **QR UART** | ✅ | Igual ESP32, más UART disponibles |
| **GPS UART** | ✅ | Más GPIO libres |
| **LTE** | ⚠️ | Igual ESP32, requiere fuente externa |
| **LEDs/OLED** | ✅ | Más pines disponibles |
| **Cámara** | ✅ | **Mejor performance imagen** |

## Cuándo Usar ESP32-S3

### ✅ Elegir S3 si:
- Necesitas **cámara + procesamiento** (QR Code por OpenCV)
- Proyecto requiere **>30 GPIO** simultáneos
- **USB nativo** simplifica debugging
- Expansión futura compleja (LTE+GPS+Cámara+Sensores)

### ⚠️ Quedarse con ESP32 estándar si:
- MVP simple (QR UART + Wi-Fi)
- Presupuesto ajustado
- GPIO suficientes (30+)

## Configuraciones Típicas

| Config | Componentes | Costo | Uso |
|--------|-------------|-------|-----|
| **S3 Básico** | ESP32-S3 + QR UART | ~$55 | MVP mejorado |
| **S3 + Cámara** | ESP32-S3 + OV2640 | ~$30 | Visión custom |
| **S3 Completo** | S3 + QR + GPS + LEDs | ~$70 | Multi-sensor |

## Costo & Disponibilidad
- **Placa:** $12-15 (AliExpress/Amazon)
- **Total MVP:** ~$55-65 con QR UART
- **Stock:** Alto (similar ESP32)

## Pros/Contras
✅ USB nativo (debugging fácil) | Más GPIO | BT 5.0 | Mejor cámara | Compatible ESP32
⚠️ +$5-7 sobre ESP32 | No esencial para MVP simple

## Recomendación
**Buena opción** si proyecto escalará a procesamiento imagen o multi-sensores complejos. Para MVP básico, ESP32 estándar es más económico sin sacrificar capacidades esenciales.
