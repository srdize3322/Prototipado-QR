# Netum W8 – Escáner 2D Wi-Fi de mano con base (cliente ligero)

## Categoría
Dispositivo comercial terminado (plug-and-play)

## Resumen
El Netum W8 es un escáner de código de barras 2D comercial inalámbrico que destaca por incluir conectividad Wi-Fi directa. Puede conectarse a redes Wi-Fi y enviar los datos escaneados directamente a un servidor en LAN o nube, sin pasar por una PC intermedia. Es un producto listo para usar, con base de carga incluida.

## Características principales

### Hardware
- **Formato:** Escáner manual tipo pistola
- **Sensor:** CMOS 1280×960
- **Procesador:** CPU 32 bits para decodificación
- **Velocidad:** ~280 scans/segundo (según fabricante)
- **Decodificación:** Interna (todos los códigos 1D/2D comunes: QR, Data Matrix, PDF417, etc.)
- **Pantallas:** Puede leer códigos en papel o pantallas
- **Batería:** 2000 mAh interna (~40 horas de uso)
- **Base:** Cuna de carga continua
- **Indicadores:** LEDs de estado, buzzer, LEDs en base de carga

### Conectividad
- **Wi-Fi:** 2.4 GHz (802.11 b/g/n) integrado
- **Bluetooth:** 4.2
- **Otras:** Modo inalámbrico 2.4 GHz propietario con dongle USB

### Software y comunicación
- **Protocolos soportados:** MQTT, HTTP/HTTPS, TCP/UDP socket
- **Modos de operación:** 
  - Wi-Fi directo a servidor
  - Bluetooth HID/SPP (a tablets/PCs)
  - USB 2.4 GHz con dongle
- **Configuración:** Vía app o escaneando códigos de configuración
- **Buffer offline:** Almacena lecturas cuando sin conexión, sube al reconectar

## Evaluación según criterios del proyecto

### ✅ Lectura QR integrada
**Cumple completamente** - Capaz de escanear y decodificar prácticamente todos los códigos 1D y 2D comunes, incluyendo QR, Data Matrix, PDF417, etc., ya sea impresos en papel o mostrados en pantallas. Decodificación interna y rápida.

### ✅ Conectividad Wi-Fi
**Cumple completamente** - Wi-Fi 2.4 GHz integrado (802.11 b/g/n). Puede conectarse a un router o hotspot y operar en red local o con acceso a Internet.

### ✅ Envío de datos al servidor
**Cumple completamente** - Nativamente soportado. El W8 puede subir cada dato escaneado a un servidor designado en tiempo real. Ofrece compatibilidad con protocolo MQTT y HTTP/HTTPS de forma configurable, así como modos socket TCP/UDP simples. Se configura la URL o broker MQTT y el dispositivo envía automáticamente el contenido del código (junto con un identificador del escáner).

### ⚠️ Indicadores (LED/Buzzer)
**Parcial** - Cuenta con los indicadores típicos de un escáner de mano: emite beeps de confirmación y tiene LEDs de estado en el cuerpo (LED verde para lectura correcta, tonos distintos en error). La base de carga también tiene LED para indicar carga/estado. **Limitación:** No tiene LEDs bicolor personalizables explícitamente vinculados a la respuesta del servidor, ya que es un dispositivo cerrado. La confirmación es sobre la lectura del código en sí, pero no sabe si el servidor lo valida como OK o ERROR a menos que esté integrado con software adicional.

### ❌ Modularidad y expansiones
**Nula** - Es un producto comercial cerrado. No ofrece posibilidad de anexar módulos internamente ni exponer interfaces para desarrollo (no hay GPIO accesibles ni soporte para ampliaciones como GPS o LTE). Su firmware es fijo (aunque actualizable para mejoras, no para personalización de funcionalidades). Si se requiere ampliar funcionalidad, tendría que hacerse externamente.

## Costos aproximados

| Componente | Precio (USD) |
|------------|--------------|
| Netum W8 con base | 80-90 |
| **Total** | **80-90** |

**Incluye:**
- Escáner W8
- Base de carga
- Cable USB
- Batería interna (2000 mAh)
- (Algunos paquetes) Dongle USB 2.4 GHz

## Pros
- ✅ **Plug-and-play total** - Listo para usar, solo configurar
- ✅ Precio muy competitivo (~$85)
- ✅ Wi-Fi directo nativo (MQTT, HTTP)
- ✅ Batería incluida (40h autonomía)
- ✅ Base de carga continua
- ✅ Dispositivo robusto tipo industrial
- ✅ Lee pantallas y papel
- ✅ Buffer offline (almacena y sube después)
- ✅ Fácil adquisición (Amazon, AliExpress)
- ✅ Sin necesidad de programación

## Contras
- ❌ **Cero modularidad** - Dispositivo cerrado, no ampliable
- ❌ **Sin GPS integrado** - No puede añadirse internamente
- ❌ **Sin LTE** - Solo Wi-Fi o Bluetooth
- ❌ **Indicadores limitados** - No responde dinámicamente a validación del servidor
- ❌ **Firmware propietario** - No personalizable
- ❌ **Formato pistola** - No ideal para montaje fijo en totem/kiosko
- ❌ Requiere que usuario "apunte y dispare" (no lecturaautomática continua)

## Riesgos y mitigaciones
- **No programable:** Depende 100% de funcionalidad de fábrica → Validar que protocolos soportados (MQTT/HTTP) sean suficientes para caso de uso
- **Falta feedback servidor:** Solo indica lectura OK, no validación → Implementar lógica en servidor/app complementaria
- **Formato manual:** No automático → Considerar si el formato pistola se ajusta al caso de uso (totem requeriría formato fijo)

## Pasos para implementación

### Setup inicial
1. Adquirir Netum W8 en distribuidor confiable
2. Cargar dispositivo completamente en base
3. Escanear códigos de configuración para conectar a Wi-Fi
4. Configurar URL del servidor o broker MQTT
5. Validar envío de datos de prueba

### Integración con servidor
1. Implementar endpoint HTTP o broker MQTT para recibir scans
2. Configurar formato de mensaje (JSON con ID dispositivo + QR)
3. Probar conectividad y latencia
4. Implementar validación en servidor
5. (Opcional) Desarrollar app complementaria para feedback visual

### Limitaciones a considerar
- No habrá indicación LED en el escáner de OK/ERROR del servidor
- Requiere que usuario accione el gatillo para cada scan
- No apropiado para lecturas automáticas continuas

## Disponibilidad
- **Fabricante:** Netum
- **Distribuidores:** 
  - Amazon (amplia disponibilidad)
  - AliExpress (tiendas oficiales Netum)
  - eBay
  - Distribuidores de equipos de código de barras
- **Región:** Envío global, disponible para Chile
- **Tiempo estimado:** 1-2 semanas (stock inmediato en muchos casos)

## Casos de uso ideales
✅ **Recomendado para:**
- Implementación muy rápida (sin desarrollo)
- Presupuesto muy ajustado
- Uso manual/portátil
- Casos donde la validación del servidor no requiere feedback inmediato al operador
- Entornos con Wi-Fi confiable

❌ **No recomendado para:**
- Lecturas automáticas continuas
- Requerimientos de expansión futura (GPS, LTE, sensores)
- Necesidad de personalización profunda
- Montaje fijo en totem con feedback inmediato
- Desarrollo de prototipo que evolucionará significativamente

## Recomendación
⚠️ **Opción viable para MVP/prueba rápida** - Excelente si se necesita validar el concepto rápidamente sin inversión en desarrollo. Ideal para pilotos o casos de uso simples. **No recomendado si se busca flexibilidad, modularidad o evolución del producto.** Para un prototipo que luego escalará o requerirá funciones adicionales, preferir opciones programables (M5Stack, ScanGenie, WisBlock).

## Referencias
- Especificaciones disponibles en Amazon/AliExpress (buscar "Netum W8")
- Manuales de usuario disponibles con el producto
