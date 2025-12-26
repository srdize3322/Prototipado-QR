# RTscan RTX200 – Módulo QR/NFC con Wi-Fi integrado

## Categoría
Módulo OEM industrial

## Resumen
El RTX200 es un módulo OEM fijo de escaneo 2D (QR, DataMatrix, etc.) que incorpora también lectura NFC opcional, orientado a aplicaciones de control de acceso y kioskos. Posee un sensor CMOS de 640×480 y decodifica códigos 1D/2D de forma autónoma.

## Características principales

### Hardware
- **Sensor:** CMOS 640×480
- **Decodificación:** Interna (múltiples simbologías 2D: QR, PDF417, DataMatrix; también 1D)
- **Interfaces:** TTL serial, RS232, USB-HID, Wi-Fi
- **Alimentación:** 5–15V DC
- **Indicadores:** Buzzer, LED blanco de iluminación/confirmación
- **Adicionales:** Lectura NFC opcional

### Conectividad
- **Wi-Fi:** 2.4 GHz integrable de fábrica
- **Otras:** USB, RS232, UART TTL

### Software y comunicación
- Pensado para transmitir cada lectura vía Wi-Fi a servidor backend
- Compatible con sistemas de control de acceso
- Puede programarse para enviar HTTP/MQTT desde controlador conectado

## Evaluación según criterios del proyecto

### ✅ Lectura QR integrada
**Cumple completamente** - Decodifica internamente múltiples simbologías 2D (QR, PDF417, DataMatrix, etc.) y 1D, entregando el texto del código al instante.

### ✅ Conectividad Wi-Fi
**Cumple completamente** - Incluye Wi-Fi 2.4 GHz integrable de fábrica (además de USB/RS232). Soporta comunicación inalámbrica directa con redes Wi-Fi.

### ✅ Envío de datos al servidor
**Compatible** - Pensado para transmitir cada lectura vía Wi-Fi a un servidor backend. Se puede programar para enviar mensajes HTTP/MQTT desde un controlador conectado.

### ⚠️ Indicadores (LED/Buzzer)
**Parcial** - Incluye buzzer y un LED blanco para iluminación/señalización. No tiene LED verde/rojo dedicados, pero es posible lograr indicaciones OK/ERROR mediante patrones de buzzer o agregando LEDs externos controlados por el sistema anfitrión.

### ⚠️ Modularidad y expansiones
**Parcial** - Es un módulo OEM enfocado en escaneo; permite integración en diseños más complejos gracias a sus interfaces (pudiendo anexar, p. ej., un microcontrolador ESP32 que gestione Wi-Fi y futuros módulos LTE/GPS). Sin embargo, el dispositivo en sí no posee ranuras plug-and-play para expansiones (su diseño modular radica en ser él el módulo de escaneo dentro de un sistema mayor).

## Costos aproximados

| Componente | Precio (USD) |
|------------|--------------|
| RTX200 con Wi-Fi | 80-120 |
| **Total estimado** | **80-120** |

## Pros
- ✅ Robusto y diseñado para operar 24/7
- ✅ Decodificación interna muy eficiente
- ✅ Múltiples interfaces de salida
- ✅ Wi-Fi integrado de fábrica
- ✅ Incluye NFC opcional
- ✅ Alimentación flexible (5-15V)

## Contras
- ❌ Sin LEDs verde/rojo dedicados (requiere hardware externo)
- ❌ No es plug-and-play modular (requiere integración)
- ❌ Costo medio-alto
- ❌ Disponibilidad: típicamente bajo pedido al fabricante
- ❌ Documentación puede ser limitada

## Riesgos y mitigaciones
- **Integración compleja:** Requiere diseño de sistema anfitrión → usar con ESP32 o similar para simplificar
- **Licencias/firmware propietario:** Validar documentación disponible antes de compra
- **Disponibilidad limitada:** Verificar tiempos de envío y stock con distribuidores

## Pasos para prototipo
1. Contactar distribuidor para validar disponibilidad y opciones (Wi-Fi, NFC)
2. Adquirir módulo y validar interfaces disponibles
3. Diseñar circuito de integración con microcontrolador (ESP32 recomendado)
4. Cablear interfaces UART/USB y alimentación
5. Implementar lógica de comunicación HTTP/MQTT
6. Añadir LEDs externos para indicación OK/ERROR
7. Probar lecturas en distintas condiciones y distancias
8. Validar latencia punta-a-punta

## Disponibilidad
- **Proveedor:** RTscan (fabricante)
- **Distribuidores:** RAKwireless y otros distribuidores industriales
- **Región:** Internacional (verificar envío a Chile)
- **Tiempo estimado:** 2-4 semanas (bajo pedido)

## Recomendación
⚠️ **Opción intermedia** - Ideal si se busca un módulo industrial robusto y se tiene capacidad de diseñar la integración. No recomendado para prototipado rápido sin experiencia en diseño electrónico.

## Referencias
- [RAKwireless Store - Información de módulos similares](https://store.rakwireless.com)
