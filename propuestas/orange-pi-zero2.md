# Orange Pi Zero2 - SBC Linux Compacto

## Specs
- **CPU:** Quad-core A53 1.5 GHz (Allwinner H616) | **RAM:** 512 MB/1 GB
- **Wi-Fi:** 2.4/5 GHz dual-band integrado | **BT:** 5.0
- **Interfaces:** 1 USB 2.0, 26-pin GPIO, UART, SPI, I2C
- **Consumo:** ~1.5W activo, soporte HAT batería con UPS
- **OS:** Armbian, Ubuntu, Debian

## Compatibilidad Módulos

| Módulo | Compatible | Notas |
|--------|-----------|-------|
| **QR UART** | ✅ | UART vía GPIO, Python serial |
| **QR USB** | ✅ | Puerto USB directo, evdev/libusb |
| **GPS UART/USB** | ✅ | UART GPIO o USB |
| **LTE USB** | ⚠️ | Funciona pero limitado a 1 puerto USB |
| **LEDs/OLED** | ✅ | GPIO + Python/C libraries |
| **Batería** | ✅ | UPS HAT disponible (añade $12-15) |

## Expansión Futura
- **USB Hub:** Requerido si +2 periféricos USB
- **GPIO:** 26 pines para sensores/actuadores
- **HATs:** Ecosistema pequeño pero creciente
- **Red:** Ethernet 100M opcional

## Configuraciones Típicas

| Config | Componentes | Costo | Uso |
|--------|-------------|-------|-----|
| **UART MVP** | OPi + QR UART + SD 16GB | ~$65 | Linux básico |
| **USB Simple** | OPi + QR USB + Fuente 3A | ~$70 | Plug & play |
| **+GPS** | Anterior + GPS USB | ~$80 | Multi-USB |
| **+LTE** | Anterior + LTE USB + Hub | ~$110 | Celular |

## Costo & Disponibilidad
- **Placa (512 MB):** $19-22 (AliExpress)
- **Fuente 5V/3A:** $5-7
- **SD 16GB:** $8-10
- **Total MVP:** ~$65-70
- **Stock:** Moderado (2-3 semanas envío)

## Pros/Contras
✅ Dual-band Wi-Fi/BT5 | Linux completo | 1 GB RAM suficiente | Precio competitivo vs RPi
⚠️ Comunidad menor que RPi | 1 solo USB (requiere hub) | Consumo >ESP32 | GPIO 3.3V

## vs Raspberry Pi Zero 2W
- ✅ Mejor: Wi-Fi 5 GHz, BT5.0, RAM hasta 1 GB
- ✅ Precio: $19 vs $30-40 RPi (mejor disponibilidad)
- ⚠️ Menor: Comunidad y soporte
- ⚠️ GPIO: Menos documentado

## Recomendación
**Buena alternativa** a RPi Zero 2W si disponibilidad/precio son problema. Linux completo permite mayor flexibilidad de software. Preferir para aplicaciones que requieren 5 GHz Wi-Fi o múltiples procesos.
