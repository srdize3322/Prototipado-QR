# [2] ESP32-DevKit - Económico

## Specs Clave
- **CPU:** Dual-core Xtensa @ 240MHz
- **RAM:** 520KB SRAM
- **Wi-Fi:** 2.4GHz b/g/n
- **Bluetooth:** BLE
- **GPIO:** 34 (3× UART, I2C, SPI)
- **USB:** Micro USB (solo programación)
- **Precio:** **$8-12**
- **Consumo:** ~160mA @ 5V (0.8W)

---

## Ventajas

✓ **Precio:** $8 (lo más barato)  
✓ **Consumo:** 0.8W (ideal batería)  
✓ **Boot:** 2s (rápido)  
✓ **3× UART:** QR, GPS, debug simultáneos

---

## Limitaciones

• **No USB Host:** Solo periféricos UART  
• **1 QR + 1 GPS máximo:** No más de 3 UART  
• **LTE complejo:** Requiere fuente externa 3A  
• **Arduino IDE:** Debugging limitado vs Linux

---

## Configuración con Módulos

| Módulos | Conexión | Costo Total |
|---------|----------|-------------|
| **QR** | UART | $45 |
| **QR + GPS** | 2× UART | $60 |
| **QR + LTE** | UART + fuente externa | $95 |

---

## Cuándo Usar

✓ Presupuesto mínimo (<$50)  
✓ Solo QR o QR+GPS  
✓ Batería (bajo consumo)  
✓ Producción masiva (barato)

---

## Cuándo NO Usar

✗ Necesitas 3+ periféricos  
✗ Requieres USB (dongles 4G)  
✗ Lógica compleja (bases de datos)
| **OLED/TFT** | ✅ | I2C/SPI estándar |
| **Batería** | ⚠️ | Requiere TP4056 externo |

## Expansión Futura
- **UART libre:** 1 disponible post-QR (para LTE/GPS adicional)
- **GPIO:** ~20+ libres para sensores/actuadores
- **Batería:** Añadir TP4056 + boost 5V si necesario
- **LTE/GPS:** Planificar fuente 5V/3A desde inicio

## Configuraciones Típicas

| Config | Componentes | Costo | Uso |
|--------|-------------|-------|-----|
| **Mínimo** | ESP32 + QR UART + LEDs | ~$45 | MVP Wi-Fi básico |
| **+GPS** | Anterior + NEO-M8N | ~$60 | Geolocalización |
| **+LTE** | Anterior + SIM7600 + fuente 3A | ~$95 | Celular backup |

## Costo & Disponibilidad
- **Placa:** $5-10 (AliExpress/Amazon/Local)
- **Total MVP:** ~$45-55 con QR UART
- **Stock:** Alto (disponible inmediato)

## Pros/Contras
✅ Muy bajo costo | Wi-Fi integrado | Bajo consumo | Arduino fácil | Comunidad amplia
⚠️ Solo 3.3V lógica | LTE requiere circuito externo complejo | Sin cargador batería integrado

## Recomendación
**⭐ TOP CHOICE para MVP simple** (solo QR + Wi-Fi) - Mejor balance costo/capacidad.

⚠️ **IMPORTANTE:** Si tu proyecto requiere **múltiples periféricos simultáneos** (QR + LTE + GPS), considera **Raspberry Pi Zero 2W** en su lugar. ESP32 tiene limitaciones de UART que dificultan la conexión de 3+ periféricos. Ver [propuestas/README.md](README.md) para análisis técnico completo.