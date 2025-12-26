# RAK WisBlock (RAK12018 + RAK11200) – Solución IoT modular con escáner QR

## Categoría
Plataforma modular IoT

## Resumen
WisBlock de RAKwireless es una plataforma modular de IoT compuesta por bloques intercambiables (base, núcleo MCU, módulos de sensor o comunicación). El RAK12018 es un módulo de escáner de códigos de barra/QR que se enchuja a una base WisBlock. Combinado con el core module RAK11200 (ESP32-WROVER con Wi-Fi), se obtiene un sistema completo y altamente expandible.

## Características principales

### Hardware - RAK12018 (Escáner)
- **Motor:** Rakinda LV3296
- **Decodificación:** Interna (múltiples códigos 1D/2D: QR, EAN-8, ISBN, etc.)
- **Salida:** UART serial al core WisBlock
- **Indicadores:** LED de iluminación, beep (típico en motores OEM)

### Hardware - RAK11200 (Core Wi-Fi)
- **MCU:** ESP32-WROVER
- **Wi-Fi:** 802.11 b/g/n (2.4 GHz)
- **Bluetooth:** BLE 4.2
- **LEDs:** LED RGB on-board
- **Programación:** Arduino, ESP-IDF

### Base WisBlock
- **Slots:** Múltiples para sensores, comunicación, IO
- **Batería:** Conector Li-Po integrado + circuito de carga
- **Alimentación:** USB-C + batería opcional
- **Dimensiones:** Compacto, formato estándar WisBlock

### Conectividad y expansión
Sistema modular con amplia gama de módulos disponibles:
- **Comunicaciones:** LTE-M/NB-IoT (RAK5860), LoRaWAN, módulos celulares
- **Sensores:** GPS/GNSS (RAK1910), ambientales, movimiento
- **IO:** Pantallas OLED, LEDs RGB, relés, actuadores
- **Almacenamiento:** MicroSD, EEPROM
- **Interfaz:** Múltiples protocolos (I2C, SPI, UART, ADC)

## Evaluación según criterios del proyecto

### ✅ Lectura QR integrada
**Cumple completamente** - El módulo RAK12018 realiza la decodificación internamente (motor LV3296). Soporta lectura de amplia variedad de códigos 2D (QR y otros) y 1D, entregando el resultado vía UART al core.

### ✅ Conectividad Wi-Fi
**Cumple completamente** - El core RAK11200 (ESP32) dispone de Wi-Fi 802.11 b/g/n a 2.4 GHz y BLE 4.2. Maneja conectividad a red local o Internet.

### ✅ Envío de datos al servidor
**Cumple completamente** - Totalmente soportado mediante programación. El ESP32 se programa (Arduino, ESP-IDF) para enviar el ID del dispositivo y los datos del QR al servidor deseado. Protocolos estándar: HTTP/HTTPS (REST API), MQTT, WebSockets, etc.

### ⚠️ Indicadores (LED/Buzzer)
**Parcial (ampliable)** - El módulo escáner típicamente tiene LED de iluminación y puede tener beep. El core RAK11200 cuenta con LEDs de estado que podrían reprogramarse. Lo más potente: dado lo modular del sistema, se puede añadir un módulo WisBlock de indicador (LED RGB, pantallas OLED). También es trivial conectar LEDs verde/rojo a pines del ESP32 en la base.

### ✅ Modularidad y expansiones
**Excelente** - La razón de ser de WisBlock es la modularidad. Módulos plug-and-play para casi cualquier función:
- Comunicaciones celulares (LTE-M/NB-IoT)
- Radio LoRaWAN
- GPS/GNSS
- Sensores ambientales
- Actuadores
- Almacenamiento
- Batería recargable Li-Po con circuitería de carga integrada

Cumple perfectamente el objetivo de "diseño orientado a futuras integraciones".

## Costos aproximados

| Componente | Precio (USD) |
|------------|--------------|
| RAK12018 (Escáner QR) | 119 |
| RAK11200 (Core ESP32 Wi-Fi) | 10 |
| Base WisBlock | 10 |
| (Opcional) Módulo GPS RAK1910 | 15-20 |
| (Opcional) Módulo LTE RAK5860 | 40-50 |
| (Opcional) Batería Li-Po + cargador | 10-15 |
| (Opcional) Módulos LED/OLED | 5-15 |
| **Total base (solo QR+Wi-Fi)** | **139** |
| **Total expandido (GPS+LTE+Bat)** | **~200-230** |

## Pros
- ✅ **Máxima modularidad** - Sistema plug-and-play real
- ✅ Ecosistema completo de módulos (>50 opciones)
- ✅ Arquitectura profesional IoT
- ✅ Soporte para batería integrado
- ✅ Expansión sin rediseño (añadir LTE, GPS, LoRa, etc.)
- ✅ Documentación industrial completa
- ✅ Open source
- ✅ Comunidad activa RAKwireless

## Contras
- ❌ **Costo mayor** (~$139 base, cerca del límite de $150)
- ❌ Escáner RAK12018 es el componente más caro ($119)
- ❌ Requiere compra de múltiples módulos por separado
- ❌ Mayor complejidad inicial de setup
- ❌ Disponibilidad: stock limitado en algunos módulos

## Riesgos y mitigaciones
- **Costo:** Supera levemente el ideal → Evaluar si la modularidad justifica la inversión
- **Disponibilidad módulos:** Algunos en backorder → Planificar compras con anticipación
- **Curva de aprendizaje:** Múltiples componentes → Comenzar con kit básico antes de expandir
- **Alternativa:** Usar escáner RAK12018 con ESP32 externo (no-WisBlock) para reducir costo

## Pasos para prototipo

### Fase 1: Prototipo base (QR + Wi-Fi)
1. Adquirir RAK12018 + RAK11200 + Base WisBlock
2. Ensamblar módulos en la base (plug-and-play)
3. Instalar Arduino IDE con soporte RAK WisBlock
4. Probar ejemplos de lectura QR del escáner
5. Implementar conexión Wi-Fi y envío HTTP/MQTT
6. Añadir LEDs externos o módulo LED RGB para indicación
7. Validar funcionamiento básico

### Fase 2: Expansión modular (GPS)
1. Adquirir módulo GPS RAK1910
2. Enchufar en slot disponible de la base
3. Implementar lectura de coordenadas GPS
4. Integrar geolocalización en payload enviado al servidor

### Fase 3: Expansión celular (LTE)
1. Adquirir módulo LTE RAK5860 + SIM card
2. Enchufar en slot IO de la base
3. Configurar conexión LTE-M o NB-IoT
4. Implementar fallback Wi-Fi → LTE

### Fase 4: Autonomía (Batería)
1. Adquirir batería Li-Po compatible
2. Conectar a conector de batería en base
3. Configurar gestión de energía
4. Optimizar consumo para autonomía

## Disponibilidad
- **Proveedor:** RAKwireless (oficial)
- **Distribuidores:** 
  - RAK Store (global)
  - Tiendas especializadas IoT
  - Amazon (algunos módulos)
- **Región:** Envío internacional (confirmar a Chile)
- **Tiempo estimado:** 2-4 semanas (algunos módulos en backorder)

## Recomendación
⚠️ **Recomendado si se prioriza escalabilidad** - La mejor opción si el proyecto tiene alta probabilidad de requerir expansiones (GPS, LTE, LoRa, sensores). El costo inicial es alto (~$139) pero el diseño modular elimina la necesidad de rediseñar al expandir. **No recomendado si el presupuesto es crítico o no se prevén expansiones.**

## Alternativa híbrida
Para reducir costos manteniendo algo de modularidad:
- Usar **solo el escáner RAK12018** (~$119)
- Conectarlo a un **ESP32 DevKit externo** (~$5-10)
- Implementar comunicación UART entre ambos
- Añadir módulos externos según necesidad (GPS UART, SIM800 LTE)
- **Costo total:** ~$130-140, pero pierde facilidad plug-and-play

## Referencias
- [RAKwireless Store - RAK12018](https://store.rakwireless.com)
- [RAKwireless Docs - WisBlock](https://docs.rakwireless.com)
