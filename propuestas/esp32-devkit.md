# ESP32-DevKit - Módulo Base MCU

## Specs
- **CPU:** Dual-core 240 MHz | **RAM:** 520 KB | **Flash:** 4 MB
- **Wi-Fi:** 2.4 GHz b/g/n integrado | **BT:** 4.2 BLE
- **Interfaces:** 3 UART, 4 SPI, 2 I2C, 30+ GPIO
- **Consumo:** 160-260 mA activo, 10 µA deep sleep
- **Programación:** Arduino, PlatformIO, MicroPython, ESP-IDF

## Compatibilidad con módulos

### 📡 Wi-Fi
- ✅ **Integrado** - No requiere módulo externo

### 📷 Lector QR
- ✅ **Escáner 2D UART** (RT830, HCC-QR606, YH04) - Conexión directa por UART
- ⚠️ **ESP32-CAM integrada** - Requiere variante ESP32-CAM
- ✅ **Módulos USB QR** - Via convertidor USB-TTL
- ✅ **Rakinda, Newland, etc.** - Por UART/RS232

### 🛰️ GPS
- ✅ **Módulos GPS UART** (NEO-6M, NEO-7M, NEO-M8N, etc.) - Conexión directa
- ✅ **Módulos I2C GPS** - Vía I2C

### 📶 LTE/Celular
- ✅ **SIM800L** - UART, requiere fuente externa 3.4-4.4V
- ✅ **SIM7600** - UART
- ✅ **A9G (GPS+GSM)** - UART
- ⚠️ **Módulos complejos** - Verificar consumo de corriente

### 💡 Indicadores LED
- ✅ **LEDs individuales** - GPIO directo con resistencias
- ✅ **LED RGB** - GPIO o NeoPixel/WS2812
- ✅ **Matrices LED** - Por I2C/SPI

### 🔋 Batería
- ⚠️ **Requiere módulo cargador externo** (TP4056, MCP73831)
- ✅ Compatible con baterías Li-Po/Li-Ion

### 🖥️ Pantallas
- ✅ **OLED I2C** - Conexión directa
- ✅ **TFT SPI** - Conexión directa
- ✅ **LCD I2C** - Módulos

| Módulo | Compatible | Notas |
|--------|-----------|-------|
| **QR UART** (GM67, RT830) | ✅ | UART2 directo, level shifter si 5V |
| **GPS UART** (NEO-6M/M8N) | ✅ | UART1 o software serial |
| **LTE** (SIM7600) | ⚠️ | Requiere fuente externa >2A, buck 4V |
| **LEDs/RGB** | ✅ | GPIO directo + resistencias |
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