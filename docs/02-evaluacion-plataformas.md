# Evaluación de Plataformas

## Plataformas Analizadas

### 1. Raspberry Pi (Modelos 3B+, 4, Zero 2W)

#### Características Técnicas
- **Procesador**: ARM Cortex (A53/A72 según modelo)
- **RAM**: 512MB - 8GB según modelo
- **Conectividad**: Wi-Fi 2.4/5GHz, Bluetooth, Ethernet (excepto Zero)
- **GPIO**: 40 pines
- **Sistema Operativo**: Linux completo (Raspberry Pi OS, Ubuntu, etc.)

#### Ventajas
- ✅ Sistema operativo completo con amplio soporte de librerías
- ✅ Capacidad de procesamiento de imagen avanzada
- ✅ Gran comunidad y documentación
- ✅ Múltiples interfaces (USB, CSI para cámara, HDMI)
- ✅ Fácil desarrollo y depuración
- ✅ Compatible con cámaras USB y módulos CSI nativos

#### Desventajas
- ❌ Mayor consumo energético (2.5A para Pi 4)
- ❌ Costo más elevado
- ❌ Requiere tarjeta microSD (punto de falla adicional)
- ❌ Tiempo de arranque más largo
- ❌ Tamaño más grande

#### Casos de Uso Ideales
- Prototipado rápido y desarrollo
- Necesidad de procesamiento de imagen avanzado
- Interfaz de usuario compleja
- Múltiples funcionalidades simultáneas

---

### 2. ESP32 (Módulos variados: DevKit, CAM, etc.)

#### Características Técnicas
- **Procesador**: Dual-core Xtensa LX6 @ 240MHz
- **RAM**: 520KB SRAM
- **Conectividad**: Wi-Fi 2.4GHz, Bluetooth/BLE
- **GPIO**: 34 pines programables
- **Sistema**: RTOS (FreeRTOS)

#### Ventajas
- ✅ Bajo consumo energético (modo deep sleep: <0.15mA)
- ✅ Costo muy económico ($5-15 USD)
- ✅ Tamaño compacto
- ✅ Arranque instantáneo
- ✅ Wi-Fi y Bluetooth integrados
- ✅ ESP32-CAM incluye cámara OV2640 integrada

#### Desventajas
- ❌ Recursos limitados de memoria y procesamiento
- ❌ Lectura de QR requiere librerías optimizadas o módulo externo
- ❌ Desarrollo más complejo para procesamiento de imagen
- ❌ ESP32-CAM: limitaciones de GPIO cuando se usa cámara

#### Casos de Uso Ideales
- Dispositivos con batería
- Producción a escala (bajo costo)
- Espacios reducidos
- Lectores QR dedicados con módulos externos

---

### 3. Arduino (Mega, Nano, MKR WiFi 1010)

#### Características Técnicas
- **Procesador**: AVR/SAMD21 según modelo
- **RAM**: 2KB - 32KB según modelo
- **Conectividad**: Wi-Fi en modelos MKR WiFi, requiere shields en otros
- **GPIO**: Variable según modelo
- **Sistema**: Código bare-metal

#### Ventajas
- ✅ Plataforma muy estable y confiable
- ✅ Simplicidad en programación
- ✅ Bajo consumo
- ✅ Amplia variedad de shields disponibles

#### Desventajas
- ❌ Recursos muy limitados para procesamiento de imagen
- ❌ Requiere módulo lector QR externo dedicado
- ❌ Wi-Fi requiere shields adicionales (excepto MKR WiFi)
- ❌ Costo se incrementa con shields necesarios

#### Casos de Uso Ideales
- Sistemas muy simples con lector QR dedicado (UART/I2C)
- Aplicaciones que priorizan estabilidad sobre funcionalidad
- Proyectos educativos

---

### 4. Alternativa: Módulos QR Dedicados + Microcontrolador

#### Descripción
Usar módulos lectores QR autónomos (ej: GM65, GM67, ScanEngine) conectados a microcontroladores simples.

#### Características
- **Módulo QR**: Procesamiento independiente de QR
- **MCU**: ESP32, STM32, o similar para comunicación
- **Interfaz**: UART, USB, o I2C

#### Ventajas
- ✅ Lectura de QR optimizada y confiable
- ✅ Bajo consumo total
- ✅ Simplicidad en programación del MCU
- ✅ Desacoplamiento de funciones
- ✅ Velocidad de lectura garantizada

#### Desventajas
- ❌ Costo del módulo QR ($20-40 USD)
- ❌ Mayor complejidad de integración
- ❌ Dos componentes independientes a mantener

#### Casos de Uso Ideales
- Producción donde la confiabilidad es crítica
- Necesidad de lectura QR muy rápida
- Presupuesto permite inversión inicial mayor

---

## Tabla Comparativa

| Característica | Raspberry Pi | ESP32 | Arduino | Módulo QR + MCU |
|----------------|--------------|-------|---------|-----------------|
| **Costo (USD)** | $35-55 | $5-15 | $15-35 | $25-55 |
| **Consumo (mA)** | 500-1200 | 80-240 | 50-150 | 100-300 |
| **Procesamiento QR** | Software (excelente) | Software (limitado) | Requiere módulo | Hardware (excelente) |
| **Conectividad Wi-Fi** | Integrada | Integrada | Requiere shield | Depende del MCU |
| **Tiempo de Arranque** | 20-40s | <1s | <1s | <1s |
| **Facilidad de Desarrollo** | Alta | Media | Alta | Media |
| **Escalabilidad** | Alta | Media | Baja | Alta |
| **Batería (estimado)** | 2-4h (2000mAh) | 8-12h | 12-18h | 6-10h |

## Recomendaciones Preliminares

### Para Prototipo Inicial
- **Raspberry Pi Zero 2W**: Balance entre capacidad y costo para desarrollo

### Para Producción con Presupuesto Limitado
- **ESP32-CAM**: Si la lectura QR básica es suficiente

### Para Producción Profesional
- **ESP32 + Módulo QR GM65/GM67**: Mejor balance costo/desempeño/confiabilidad

### Para Máxima Flexibilidad
- **Raspberry Pi 4**: Si se requieren múltiples funcionalidades futuras
