# SB Components ScanGenie – Escáner QR programable (ESP32 + pantalla)

## Categoría
Dispositivo DIY programable

## Resumen
El ScanGenie de SB Components es un dispositivo DIY que combina un motor de escaneo 2D con un microcontrolador ESP32-S3 en una sola placa. Viene equipado con una pantalla TFT de 1.14″ para mostrar información o feedback al usuario, un sensor de imagen de 640×480 para captura, y un buzzer integrado para alertas sonoras.

## Características principales

### Hardware
- **Microcontrolador:** ESP32-S3
- **Escáner:** Motor 2D (ej. Newland/DE2120)
- **Sensor:** 640×480 para captura de imagen
- **Pantalla:** TFT 1.14″ (feedback visual)
- **Decodificación:** Interna (>20 simbologías 1D/2D: QR, DataMatrix, PDF417, etc.)
- **Indicadores:** Buzzer integrado, pantalla TFT, LED on-board del ESP32
- **Alimentación:** USB-C (5V, sin batería interna)
- **Interfaces:** 2 puertos USB-C, GPIOs expuestos

### Conectividad
- **Wi-Fi:** 802.11 b/g/n (2.4 GHz) vía ESP32-S3
- **Bluetooth:** 5 BLE

### Software y comunicación
- **Plataforma:** Arduino IDE, ESP-IDF
- **Código abierto:** Totalmente personalizable
- **Protocolos:** HTTP(S), MQTT, TCP/UDP (configurable)
- **Integración cloud:** Diseñado para enviar datos a servicios en la nube
- **GPIO disponibles:** Para conectar hardware adicional

## Evaluación según criterios del proyecto

### ✅ Lectura QR integrada
**Cumple completamente** - Incorpora un módulo escáner 1D/2D capaz de decodificar internamente gran variedad de códigos (>20 tipos), incluidos QR, DataMatrix, PDF417, etc., entregando el texto vía UART/USB al ESP32.

### ✅ Conectividad Wi-Fi
**Cumple completamente** - ESP32-S3 a bordo con Wi-Fi b/g/n y Bluetooth 5 BLE. Puede conectarse a redes Wi-Fi estándar y también ofrece BLE para comunicaciones locales.

### ✅ Envío de datos al servidor
**Cumple completamente** - Pensado para integración cloud: el dispositivo puede ser programado para enviar cada lectura a servidores mediante HTTP(S) REST, MQTT u otros mecanismos de IoT. Control total para definir cómo y a dónde se envía el mensaje con ID del equipo + contenido del QR.

### ✅ Indicadores (LED/Buzzer)
**Cumple completamente** - Incluye buzzer para notificaciones audibles. La pantalla TFT permite presentar feedback visual elaborado (mostrar "OK" en verde o "ERROR" en rojo, textos, iconos). El ESP32 cuenta con LEDs indicadores estándar y GPIO donde podría conectarse un LED externo fácilmente.

### ⚠️ Modularidad y expansiones
**Buena** - Diseñado como plataforma abierta. Dispone de GPIOs libres para anexar hardware extra (sensores, módulos UART, etc.). Por ejemplo, se podría agregar un módulo GPS por UART, o un módulo celular (SIM800) usando los pines serial. Cuenta con 2 puertos USB-C. Aunque no es "modular por bloques" como WisBlock, sí permite modificaciones y ampliaciones mediante su naturaleza open-source y hardware expansible.

## Costos aproximados

| Componente | Precio (USD) |
|------------|--------------|
| ScanGenie | 78.99 |
| (Opcional) Módulos adicionales | Variable |
| (Opcional) Carcasa | 10-20 |
| **Total base** | **~79** |

## Pros
- ✅ Precio muy competitivo (~$79)
- ✅ Pantalla TFT integrada para UI rica
- ✅ ESP32-S3 potente y actualizado
- ✅ Totalmente open-source y programable
- ✅ Decodificación 2D rápida y confiable
- ✅ Dos puertos USB-C
- ✅ GPIOs accesibles para expansión
- ✅ Diseñado específicamente para IoT/cloud

## Contras
- ❌ Menor comunidad que M5Stack
- ❌ Documentación puede ser limitada
- ❌ Sin carcasa protectora incluida
- ❌ Disponibilidad más limitada (tiendas especializadas)
- ❌ No modular plug-and-play

## Riesgos y mitigaciones
- **Disponibilidad limitada:** Verificar stock en Tindie/distribuidores → comprar con anticipación
- **Soporte técnico:** Comunidad más pequeña → revisar ejemplos disponibles antes de comprar
- **Integración:** Requiere conocimientos de programación ESP32 → validar experiencia previa

## Pasos para prototipo
1. Adquirir ScanGenie en tienda oficial (Tindie, SB Components)
2. Instalar Arduino IDE con soporte ESP32-S3
3. Probar firmware de ejemplo para escaneo
4. Implementar conexión Wi-Fi y comunicación HTTP/MQTT
5. Programar interfaz en pantalla TFT (estado, QR leído, respuesta servidor)
6. Configurar LEDs/buzzer según respuesta del servidor
7. (Opcional) Conectar módulos adicionales vía GPIO (GPS, sensores)
8. Diseñar y fabricar carcasa protectora
9. Optimizar consumo y rendimiento
10. Validar en entorno real

## Disponibilidad
- **Proveedor:** SB Components
- **Distribuidores:** 
  - Tindie
  - OzRobotics
  - Tiendas SB Components
- **Región:** Envío internacional (verificar a Chile)
- **Tiempo estimado:** 2-4 semanas

## Recomendación
✅ **Recomendado** - Excelente opción si se valora tener una pantalla integrada para UI más rica. Precio muy competitivo. Ideal para quienes buscan open-source con ESP32-S3 actualizado. Requiere algo más de trabajo de integración que M5Stack pero ofrece mayor flexibilidad.

## Referencias
- [OzRobotics - ScanGenie](https://ozrobotics.com)
- [Tindie - SB Components](https://www.tindie.com)
