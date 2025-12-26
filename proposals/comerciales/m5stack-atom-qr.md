# M5Stack ATOM QR-CODE Kit – Escáner 2D con ESP32 (Wi-Fi)

## Categoría
Kit de desarrollo programable

## Resumen
Kit compuesto por un módulo escáner 1D/2D de M5Stack ("Atomic QRCode") acoplado a un microcontrolador ESP32 (M5Atom Lite) que aporta la conectividad inalámbrica. El escáner integrado (640×480 CMOS) lee códigos QR y barras 1D/2D comunes, decodificándolos internamente.

## Características principales

### Hardware
- **Escáner:** Módulo 2D integrado, sensor CMOS 640×480
- **Microcontrolador:** ESP32 (M5Atom Lite)
- **Decodificación:** Interna (6 tipos de códigos 2D + 19 tipos 1D)
- **Precisión:** Hasta códigos de 5 mil de tamaño
- **Alimentación:** USB 5V (sin batería de serie)
- **Indicadores:** 
  - LED blanco de iluminación
  - LED verde de enfoque/apuntamiento
  - LED RGB programable (M5Atom)
  - Buzzer integrado

### Conectividad
- **Wi-Fi:** 802.11 b/g/n (2.4 GHz) vía ESP32
- **Bluetooth:** BLE vía ESP32

### Software y comunicación
- **Plataforma:** Arduino, MicroPython, UIFlow
- **Totalmente programable:** Control completo sobre lógica de envío
- **Protocolos:** HTTP, HTTPS, MQTT, WebSockets (configurable)
- **GPIOs expuestos:** Permite conectar periféricos adicionales
- **Grove port:** Para expansiones fáciles

## Evaluación según criterios del proyecto

### ✅ Lectura QR integrada
**Cumple completamente** - Escáner 2D integrado que decodifica internamente amplia gama de códigos 1D/2D (QR, DataMatrix, PDF417), con alta precisión gracias al sensor CMOS.

### ✅ Conectividad Wi-Fi
**Cumple completamente** - ESP32 con Wi-Fi integrado (2.4 GHz 802.11b/g/n). También soporta Bluetooth BLE.

### ✅ Envío de datos al servidor
**Cumple completamente** - Programable para enviar cada lectura via HTTP, MQTT u otro protocolo sobre Wi-Fi. El ESP32 puede conectarse a Internet y transmitir el ID del dispositivo y contenido del QR fácilmente.

### ✅ Indicadores (LED/Buzzer)
**Cumple completamente** - Incluye LEDs (blanco, verde) y buzzer. El M5Atom Lite aporta LED RGB programable (permite mostrar verde/rojo según respuesta del servidor) y buzzer integrado para señal sonora.

### ⚠️ Modularidad y expansiones
**Moderada** - Compacto pero open-source y ampliable a nivel de software. Expone algunos GPIO del ESP32, permite conectar sensores o módulos adicionales. M5Stack ofrece módulos en su ecosistema (aunque no se conectan directamente apilados, se integran vía Grove port o similar). También es viable alimentar con batería externa LiPo. No posee ranuras dedicadas para LTE o GPS, pero podría comunicarse con módulos externos vía serial/I2C.

## Costos aproximados

| Componente | Precio (USD) |
|------------|--------------|
| M5Stack ATOM QR-CODE Kit | 85 |
| (Opcional) Batería LiPo externa | 10-15 |
| (Opcional) Módulos adicionales | Variable |
| **Total base** | **85** |

## Pros
- ✅ Precio muy accesible (<$100)
- ✅ Completamente programable (Arduino, MicroPython)
- ✅ Listo para usar out-of-the-box
- ✅ Ecosistema M5Stack con múltiples accesorios
- ✅ Indicadores LED RGB configurables
- ✅ Documentación abundante y comunidad activa
- ✅ Open source
- ✅ Compacto y bajo consumo

## Contras
- ❌ No tiene ranuras plug-and-play para expansiones mayores
- ❌ Conexión de módulos adicionales requiere soldadura/cableado
- ❌ Sin batería incluida (requiere compra separada si se desea)
- ❌ Alimentación solo por USB (sin entrada DC directa)

## Riesgos y mitigaciones
- **Disponibilidad:** Verificar stock en distribuidores M5Stack → comprar con anticipación
- **Expansión limitada:** Para LTE/GPS se requieren módulos externos → planificar conexiones UART/I2C
- **Documentación en inglés:** Puede requerir traducción → usar comunidad y ejemplos

## Pasos para prototipo
1. Adquirir kit M5Stack ATOM QR-CODE en distribuidor oficial
2. Instalar Arduino IDE o PlatformIO con soporte M5Stack
3. Probar ejemplos básicos de escaneo QR
4. Implementar conexión Wi-Fi y envío HTTP/MQTT al servidor
5. Programar control de LED RGB según respuesta del servidor (verde=OK, rojo=ERROR)
6. Configurar buzzer para feedback sonoro
7. Optimizar consumo energético
8. (Opcional) Integrar módulos adicionales vía Grove/GPIO
9. Diseñar carcasa o soporte físico
10. Validar en condiciones reales de uso

## Disponibilidad
- **Proveedor:** M5Stack (oficial)
- **Distribuidores:** 
  - M5Stack Store (global)
  - AliExpress (tiendas oficiales M5Stack)
  - Amazon
  - Distribuidores locales de electrónica
- **Región:** Envío internacional disponible (confirmar envío a Chile)
- **Tiempo estimado:** 1-3 semanas

## Recomendación
✅ **Altamente recomendado** - Excelente balance precio/funcionalidad/facilidad de uso. Ideal para prototipado rápido con flexibilidad de programación. La mejor opción si se busca control total del software y se tiene experiencia básica en programación de microcontroladores.

## Referencias
- [M5Stack Docs - ATOM QR-CODE Kit](https://docs.m5stack.com)
- [M5Stack Store](https://shop.m5stack.com)
