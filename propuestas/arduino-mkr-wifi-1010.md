# Arduino MKR WiFi 1010 - MCU Oficial Arduino

## Specs
- **CPU:** SAMD21 Cortex-M0+ 48 MHz | **RAM:** 32 KB | **Flash:** 256 KB
- **Wi-Fi:** 2.4/5 GHz Nina-W102 (u-blox) | **BT:** BLE
- **Interfaces:** 1 UART, SPI, I2C, 8 GPIO (3.3V)
- **Consumo:** ~100 mA activo, sleep mode disponible
- **Batería:** Conector JST Li-Po + cargador integrado
- **Programación:** Arduino IDE nativo

## Compatibilidad Módulos

| Módulo | Compatible | Notas |
|--------|-----------|-------|
| **QR UART** | ⚠️ | 1 solo UART (conflicto si debug serial) |
| **GPS UART** | ⚠️ | Requiere software serial o shield |
| **LTE** | ❌ | Insuficiente GPIO/recursos, usar MKR GSM 1400 |
| **LEDs** | ✅ | GPIO directo |
| **OLED I2C** | ✅ | I2C estándar |
| **Batería** | ✅ | **Cargador Li-Po integrado** (ventaja única) |

## Expansión Futura
- **UART limitado:** Solo 1 hardware UART disponible
- **GPIO:** Solo 8 pines digitales (muy limitado)
- **Shields:** Ecosistema MKR disponible pero costoso
- **Batería:** Sistema integrado simplifica portabilidad

## Configuraciones Típicas

| Config | Componentes | Costo | Uso |
|--------|-------------|-------|-----|
| **Mínimo** | MKR + QR UART + LEDs | ~$75 | MVP compacto |
| **+Batería** | Anterior + Li-Po 1000mAh | ~$85 | Portátil (ventaja) |
| **+GPS** | MKR + Shield GPS | ~$100+ | Costoso |

## Costo & Disponibilidad
- **Placa:** $38-45 (Oficial/Distribuidores)
- **Total MVP:** ~$75-85
- **Stock:** Alto (distribución oficial)

## Pros/Contras
✅ Dual-band Wi-Fi + BLE | **Cargador batería integrado** | Arduino IDE oficial | Bajo consumo | Compacto
⚠️ **Precio alto** | Solo 1 UART | GPIO muy limitado (8) | RAM/Flash limitado | Expansión costosa

## vs ESP32 / Orange Pi
- ⚠️ **Precio:** $40 vs $5-8 ESP32 / $19 OPi
- ⚠️ **GPIO/UART:** Muy inferior a ESP32
- ✅ **Batería:** Único con cargador integrado out-of-box
- ✅ **Oficial:** Soporte Arduino garantizado

## Recomendación
**No recomendado** para MVP por alto costo y limitaciones técnicas. Única ventaja real: cargador Li-Po integrado. Considerar solo si el sistema final **requiere** batería integrada y presupuesto lo permite. Para MVP, ESP32 es 5x más económico con mejores capacidades.
