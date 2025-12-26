# Raspberry Pi Zero 2 W - Módulo Base

## Categoría
**Computadora completa Linux (cerebro del sistema)**

## Descripción general
Mini computadora con sistema operativo completo (Linux). Ofrece máxima flexibilidad de software a costa de mayor consumo y complejidad. Ideal cuando se requiere procesamiento pesado, múltiples servicios o lenguajes de alto nivel (Python, Node.js, etc.).

## Especificaciones técnicas

### Procesador
- **CPU:** Quad-core ARM Cortex-A53 64-bit
- **Frecuencia:** 1 GHz
- **RAM:** 512 MB LPDDR2
- **Almacenamiento:** MicroSD (8-32 GB recomendado)

### Conectividad integrada
- ✅ **Wi-Fi:** 802.11 b/g/n (2.4 GHz)
- ✅ **Bluetooth:** 4.2 BLE

### Interfaces disponibles
- **GPIO:** 40 pines (header)
- **USB:** 1x Micro USB OTG
- **CSI:** Conector cámara
- **UART, SPI, I2C:** Disponibles vía GPIO
- **Mini HDMI:** Salida de video

### Sistema Operativo
- **Raspberry Pi OS** (Debian-based) - Recomendado
- **Ubuntu Server**
- **Otros Linux:** Alpine, Arch, etc.

### Alimentación
- **Voltaje:** 5V vía Micro USB
- **Consumo:** 
  - Idle: ~100-150 mA
  - Carga media: 200-300 mA
  - Máximo: ~400 mA
  - **Mucho mayor que ESP32** (~10x)

## Plataformas de desarrollo
- ✅ **Python** - Lenguaje principal
- ✅ **Node.js / JavaScript**
- ✅ **C/C++** - Con compilación nativa
- ✅ **Go, Rust, etc.**
- ✅ Cualquier lenguaje con soporte Linux ARM

## Compatibilidad con módulos

### 📡 Wi-Fi
- ✅ **Integrado** - No requiere módulo externo
- ✅ **Dongles USB Wi-Fi** - Para dual band o mejor alcance

### 📷 Lector QR
- ✅ **Cámara Pi oficial** ($15-25) → Conector CSI dedicado
- ✅ **Cámaras USB** → Puerto USB (requiere hub powered)
- ✅ **Escáner QR USB** → Puerto USB
- ✅ **Escáner UART** → GPIO serial (menos común, ESP32 mejor para esto)
- ✅ **Decodificación por software** - Python: OpenCV, zbar, pyzbar

### 🛰️ GPS
- ✅ **Módulos GPS USB** → USB (ideal)
- ✅ **Módulos GPS UART** → GPIO serial
- ⚠️ **GPS via USB más común** en RPi que UART

### 📶 LTE/Celular
- ✅ **Dongles USB 4G** (Huawei, ZTE, etc.) → USB
- ✅ **Módulos HAT LTE** (Sixfox, Waveshare) → GPIO
- ✅ **SIM7600 HAT** → USB o serial
- ✅ **Mejor soporte que ESP32** para módems complejos

### 💡 Indicadores LED
- ✅ **LEDs individuales** → GPIO con resistencias
- ✅ **Matrices LED, NeoPixels** → GPIO
- ✅ **Pantallas HDMI** → Mini HDMI out

### 🔋 Batería
- ⚠️ **Alto consumo** - Requiere batería grande (10,000+ mAh para uso prolongado)
- ✅ **UPS HATs disponibles** - Con gestión inteligente
- ⚠️ **No ideal para batería** comparado con ESP32

### 🖥️ Pantallas
- ✅ **Mini HDMI** → Cualquier pantalla/monitor
- ✅ **Pantallas táctiles GPIO** (Waveshare, etc.)
- ✅ **Pantallas USB** (via DisplayLink)
- ✅ **OLED/LCD I2C** → GPIO

## Costo aproximado

| Item | Precio (USD) |
|------|--------------|
| Raspberry Pi Zero 2 W | 15-20 |
| MicroSD 16GB | 5-8 |
| Fuente 5V 2A | 5-8 |
| Cable Micro USB | 2-3 |
| Header GPIO (si no soldado) | 1-2 |

**Costo base típico:** ~$30-40 (con accesorios básicos)

## Ventajas como módulo base
- ✅ **Sistema operativo completo** - Linux full
- ✅ **Máxima flexibilidad software** - Cualquier lenguaje/framework
- ✅ **Fácil desarrollo** - Python, SSH, debugging estándar
- ✅ **Excelente para prototipado rápido** - Librerías maduras
- ✅ **Procesa tareas complejas** - OpenCV, ML, bases de datos locales
- ✅ **Mejor soporte USB** - Dongles 4G, cámaras USB, etc.
- ✅ **Comunidad enorme** - Toneladas de tutoriales

## Desventajas
- ❌ **Alto consumo energético** (~10x ESP32) - No ideal para batería
- ❌ **Boot time** - 20-40 segundos vs instantáneo en ESP32
- ❌ **Costo mayor** - ~$30-40 vs ~$5-8 ESP32
- ❌ **Más complejo** - Requiere SD, OS, updates, etc.
- ❌ **Menos robusto** - SD puede corromperse, OS puede fallar
- ❌ **Mayor tamaño físico**
- ⚠️ **Overkill** para tareas simples

## Cuándo usar Raspberry Pi vs ESP32

### Usar Raspberry Pi si:
- ✅ Necesitas procesamiento pesado (OpenCV, ML, OCR)
- ✅ Requieres múltiples servicios concurrentes
- ✅ Python/Node.js es crítico para desarrollo rápido
- ✅ Decodificación QR por software (cámara simple)
- ✅ Interfaz HDMI requerida
- ✅ Dongles USB 4G/LTE
- ✅ Base de datos local, logging complejo
- ✅ Desarrollo iterativo rápido

### Usar ESP32 si:
- ✅ Prioridad es bajo consumo / batería
- ✅ Boot instantáneo requerido
- ✅ Costo es crítico
- ✅ Tarea simple y definida
- ✅ Robustez en ambientes difíciles
- ✅ Tamaño compacto crítico

## Ejemplos de configuración completa

### Configuración 1: QR por cámara (económico)
```
Raspberry Pi Zero 2 W ($20)
├── MicroSD 16GB ($6)
├── Cámara USB básica ($10-15)
├── LEDs → GPIO
├── Fuente 5V 2A ($6)
└── Software: Python + OpenCV + pyzbar

Total: ~$42-47
Ventaja: Decodifica QR por software, sin escáner dedicado
```

### Configuración 2: Sistema con 4G
```
Raspberry Pi Zero 2 W ($20)
├── MicroSD 32GB ($8)
├── Cámara Pi oficial ($20)
├── Dongle USB 4G ($25-35)
├── USB Hub powered ($8-12)
├── GPS USB ($15-20)
├── Fuente 5V 3A ($8)
└── Batería 20,000mAh ($20-30)

Total: ~$124-153
Ventaja: Sistema completo con 4G y GPS, Linux full
⚠️ Excede presupuesto de $150
```

### Configuración 3: Totem con pantalla
```
Raspberry Pi Zero 2 W ($20)
├── MicroSD 16GB ($6)
├── Escáner QR USB ($30-40)
├── Pantalla táctil 7" HDMI ($40-60)
├── Fuente 5V 3A ($8)
└── Carcasa ($10-15)

Total: ~$114-149
Ventaja: Interfaz visual completa, kiosco interactivo
```

## Disponibilidad
- **MercadoLibre Chile:** Disponible, precio premium (+30-50%)
- **Amazon:** Disponible, pero importación
- **Tiendas especializadas:** Tiendas de robótica/electrónica
- ⚠️ **Stock limitado** - Escasez global desde 2021
- **Alternativa:** Buscar localmente antes de importar

## Recomendación
⚠️ **Recomendado solo para casos específicos** - Si necesitas procesamiento pesado, Python/Linux, o decodificación QR por software económica. Para sistema modular simple, **ESP32 es mejor opción** (menor costo, consumo, complejidad). 

**Para este proyecto QR+Wi-Fi básico: ESP32 es más apropiado** a menos que haya requisitos específicos de software complejo.

## Productos comerciales similares
- **Raspberry Pi 3/4** - Más caros pero más potentes
- **Raspberry Pi Pico W** - Microcontrolador (similar a ESP32)
- **Orange Pi Zero** - Alternativa más económica
- **Banana Pi M2 Zero** - Similar a RPi Zero

## Referencias
- [Raspberry Pi Official](https://www.raspberrypi.com/products/raspberry-pi-zero-2-w/)
- [Getting Started Guide](https://www.raspberrypi.com/documentation/)
- [GPIO Pinout](https://pinout.xyz/)
