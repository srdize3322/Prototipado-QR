# ESP32-WROOM/DevKit - Módulo Base

## Categoría
**Módulo base programable (cerebro del sistema)**

## Descripción general
Microcontrolador ESP32 de Espressif en formato development board. Es el cerebro más económico y versátil para proyectos IoT. Incluye Wi-Fi y Bluetooth integrados, múltiples GPIO y bajo consumo.

## Especificaciones técnicas

### Procesador
- **CPU:** Xtensa dual-core 32-bit LX6
- **Frecuencia:** 160-240 MHz
- **RAM:** 520 KB SRAM
- **Flash:** 4 MB (típico)

### Conectividad integrada
- ✅ **Wi-Fi:** 802.11 b/g/n (2.4 GHz)
- ✅ **Bluetooth:** v4.2 BR/EDR y BLE

### Interfaces disponibles
- **GPIO:** 30+ pines (algunos compartidos)
- **UART:** 3 puertos
- **SPI:** 4 controladores
- **I2C:** 2 controladores
- **ADC:** 12-bit, 18 canales
- **PWM:** 16 canales

### Alimentación
- **Voltaje:** 5V vía USB o 3.3V directo
- **Consumo:** 
  - Activo Wi-Fi: ~160-260 mA
  - Deep sleep: ~10 µA
  - Modem sleep: ~20 mA

## Plataformas de desarrollo
- ✅ Arduino IDE
- ✅ PlatformIO
- ✅ ESP-IDF (oficial Espressif)
- ✅ MicroPython
- ✅ Mongoose OS

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
- ✅ **LCD I2C** - Conexión directa

## Costo aproximado

| Item | Precio (USD) |
|------|--------------|
| ESP32-DevKit v1 | 5-8 |
| ESP32-WROOM-32 | 6-10 |
| ESP32 NodeMCU | 7-10 |

**Costo típico:** ~$5-8

## Ventajas como módulo base
- ✅ Precio muy bajo
- ✅ Wi-Fi integrado
- ✅ Amplia documentación y comunidad
- ✅ Múltiples interfaces (UART, SPI, I2C)
- ✅ Bajo consumo con modos de ahorro
- ✅ Fácil programación (Arduino compatible)
- ✅ GPIO suficientes para múltiples módulos

## Desventajas
- ⚠️ Voltaje lógico 3.3V (algunos módulos requieren 5V → necesita level shifter)
- ⚠️ Corriente máxima por GPIO: 40 mA (requiere transistores para cargas pesadas)
- ⚠️ ADC no muy preciso
- ⚠️ Solo 2.4 GHz Wi-Fi (no 5 GHz)

## Consideraciones de diseño

### Pines a evitar
- **GPIO 0:** Boot mode (pull-up, no usar para entrada crítica)
- **GPIO 2:** Boot mode (debe estar flotante o pull-down al boot)
- **GPIO 6-11:** Flash SPI (no usar)
- **GPIO 12:** Nivel de voltaje boot (evitar si posible)

### Pines recomendados para módulos externos
- **UART1:** GPIO 9, 10 (TX, RX) - OJO: conectados a USB-Serial
- **UART2:** GPIO 16, 17 (RX, TX) - **Mejor para módulos UART**
- **I2C:** GPIO 21 (SDA), 22 (SCL) - Estándar
- **SPI:** GPIO 18 (SCK), 19 (MISO), 23 (MOSI), 5 (CS) - Estándar

## Ejemplos de configuración completa

### Configuración 1: QR básico + Wi-Fi
```
ESP32-DevKit ($8)
├── Escáner QR UART ($35-45) → UART2 (GPIO 16/17)
├── LED Verde ($0.20) → GPIO 25
└── LED Rojo ($0.20) → GPIO 26

Total: ~$43-53
```

### Configuración 2: QR + GPS
```
ESP32-DevKit ($8)
├── Escáner QR UART ($35-45) → UART2 (GPIO 16/17)
├── GPS NEO-6M ($8-12) → UART1 o software serial
├── LEDs indicadores → GPIO 25/26
└── SD Card (opcional) ($2-5) → SPI

Total: ~$53-73
```

### Configuración 3: Sistema completo
```
ESP32-DevKit ($8)
├── Escáner QR UART ($35-45) → UART2
├── SIM800L GSM ($8-12) → Software serial o UART1
├── GPS (integrado en A9G) 
├── Pantalla OLED ($3-5) → I2C
├── LEDs → GPIO
└── Batería Li-Po + TP4056 ($8-12)

Total: ~$70-90
```

## Disponibilidad
- **AliExpress:** Amplia disponibilidad, envío 2-4 semanas
- **Amazon:** Disponible, envío rápido, precio +20-30%
- **Mercado Libre Chile:** Disponible local, precio +30-50%
- **Tiendas locales:** Electrónica Chile, BricoGeek, etc.

## Recomendación
✅ **Altamente recomendado** como módulo base para prototipado. Es el mejor balance costo/capacidad/facilidad para sistemas modulares IoT. Ideal para comenzar y escalar según necesidades.

## Alternativas en la misma familia
- **ESP32-S2:** Sin Bluetooth, más GPIO
- **ESP32-S3:** Más potente, USB nativo, mejor para cámara
- **ESP32-C3:** RISC-V, más económico, menos GPIO
- **ESP32-CAM:** Con cámara integrada (ver archivo dedicado)

## Referencias
- [Espressif ESP32 Official](https://www.espressif.com/en/products/socs/esp32)
- [Documentación Arduino-ESP32](https://docs.espressif.com/projects/arduino-esp32/)
- [ESP32 Pinout Reference](https://randomnerdtutorials.com/esp32-pinout-reference-gpios/)
