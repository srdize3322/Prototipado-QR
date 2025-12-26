# Módulos Lectores QR / Códigos de Barras

Este documento lista las diferentes opciones de módulos lectores QR/códigos disponibles, con sus características, precios y compatibilidad con los módulos base.

## Índice de lectores
1. [Escáneres 2D UART Genéricos](#escáneres-2d-uart-genéricos)
2. [M5Stack Atomic QRCode](#m5stack-atomic-qrcode)
3. [RAK12018 WisBlock Scanner](#rak12018-wisblock-scanner)
4. [Cámaras con decodificación por software](#cámaras-con-decodificación-por-software)
5. [Escáneres USB](#escáneres-usb)
6. [Netum W8 (Dispositivo completo)](#netum-w8)

---

## Escáneres 2D UART Genéricos

### Descripción
Módulos OEM de escaneo 2D con salida UART/TTL. Leen códigos 1D y 2D (QR, DataMatrix, PDF417, etc.) y envían el texto decodificado por serial.

### Modelos comunes
- **RT830**
- **HCC-QR606**  
- **YH04**
- **GM66** (Neotym)
- **DE2120** (Newland)
- **LV3296** (Rakinda)

### Especificaciones típicas
- **Sensor:** CMOS 640×480 o 1280×720
- **Códigos soportados:** 
  - 2D: QR Code, Data Matrix, PDF417, MaxiCode, Aztec
  - 1D: Code 128, Code 39, EAN-13/8, UPC, etc.
- **Interfaz:** UART TTL (3.3V o 5V), baudrate configurable (típico 9600-115200)
- **Salida:** ASCII text con terminador CR/LF
- **Iluminación:** LED blanco integrado
- **Indicadores:** LED de apuntado, buzzer
- **Distancia:** 5-40 cm típico
- **Alimentación:** 5V, ~150-300 mA

### Compatibilidad con módulos base

| Módulo Base | Compatibilidad | Notas |
|-------------|----------------|-------|
| **ESP32-DevKit** | ✅ **Excelente** | Conexión directa UART2 (GPIO 16/17). Si escáner es 5V TTL, usar level shifter |
| **ESP32-S3** | ✅ **Excelente** | Igual que ESP32, más UART disponibles |
| **Raspberry Pi Zero 2W** | ✅ **Buena** | Via GPIO serial, pero USB o CSI preferibles en RPi |

### Configuración recomendada
```
Escáner UART → RX/TX del módulo base
              → GND común
              → 5V alimentación (puede requerir fuente externa si >500mA)
              → Level shifter si escáner es 5V y módulo base 3.3V
```

### Costo aproximado
| Item | Precio (USD) |
|------|--------------|
| Escáner 2D UART básico | 25-35 |
| Escáner 2D UART premium (Newland, etc.) | 40-60 |
| Level shifter 3.3V↔5V | 1-2 |

**Rango típico:** $30-45

### Ventajas
- ✅ Decodificación por hardware (descarga CPU del base)
- ✅ Rápido y confiable
- ✅ Iluminación integrada
- ✅ Lee códigos en papel y pantallas
- ✅ Fácil integración (solo UART)
- ✅ Bajo consumo

### Desventajas
- ⚠️ Costo medio-alto
- ⚠️ Documentación a veces pobre
- ⚠️ Comandos propietarios (algunos modelos)
- ⚠️ Tamaño físico mayor que cámara simple

### Disponibilidad
- **AliExpress:** Alta disponibilidad, ~$25-45
- **Amazon:** Limitado, precios mayores
- **Distribuidores especializados:** Netum, RTscan, Rakinda

### Código de ejemplo (ESP32 Arduino)
```cpp
// Escáner en UART2 (GPIO 16=RX, 17=TX)
HardwareSerial Scanner(2);

void setup() {
  Serial.begin(115200);
  Scanner.begin(9600, SERIAL_8N1, 16, 17); // RX=16, TX=17
}

void loop() {
  if (Scanner.available()) {
    String qrData = Scanner.readStringUntil('\n');
    qrData.trim();
    Serial.println("QR leído: " + qrData);
    // Enviar a servidor...
  }
}
```

---

## M5Stack Atomic QRCode

### Descripción
Módulo escáner compacto de M5Stack con motor 2D integrado y microcontrolador (M5Atom Lite con ESP32).

### Especificaciones
- **Sensor:** CMOS 640×480
- **Códigos:** 6 tipos 2D + 19 tipos 1D
- **MCU incluido:** ESP32 (M5Atom Lite) - Wi-Fi + BLE
- **Interfaces:** Grove port, GPIO expuestos
- **Indicadores:** LED blanco, LED verde, LED RGB, buzzer
- **Formato:** Compacto, todo-en-uno

### Compatibilidad con módulos base

| Módulo Base | Compatibilidad | Notas |
|-------------|----------------|-------|
| **ESP32-DevKit** | ⚠️ **Limitado** | Ya incluye ESP32, usar solo el módulo escáner sin Atom es complejo |
| **ESP32-S3** | ⚠️ **Limitado** | Mismo caso, ya trae ESP32 integrado |
| **Raspberry Pi Zero 2W** | ❌ **No compatible** | Diseñado para ecosistema M5Stack |

**Nota:** Este es un **dispositivo completo**, no un módulo para conectar. Ver sección de [dispositivos comerciales completos](../comerciales/m5stack-atom-qr.md).

### Costo aproximado
- **Kit completo:** $85

### Recomendación
✅ Usar como **solución completa standalone**, no como módulo. Ya incluye el "cerebro" ESP32.

---

## RAK12018 WisBlock Scanner

### Descripción
Módulo escáner para ecosistema WisBlock de RAKwireless. Se conecta a base WisBlock con core MCU.

### Especificaciones
- **Motor:** Rakinda LV3296
- **Formato:** WisBlock module (plug-and-play)
- **Códigos:** QR, EAN-8, ISBN, múltiples 1D/2D
- **Interfaz:** UART via conector WisBlock
- **Indicadores:** LED, buzzer típicos de motor

### Compatibilidad con módulos base

| Módulo Base | Compatibilidad | Notas |
|-------------|----------------|-------|
| **ESP32-DevKit** | ⚠️ **Adaptable** | Posible pero requiere adaptador WisBlock→breadboard, pierde ventaja plug-and-play |
| **ESP32-S3** | ⚠️ **Adaptable** | Mismo caso |
| **Raspberry Pi Zero 2W** | ❌ **No recomendado** | Diseñado para WisBlock |

**Nota:** Diseñado específicamente para **RAK WisBlock ecosystem**. Si no usas base WisBlock, elegir escáner UART genérico es más económico y simple.

### Costo aproximado
- **RAK12018:** $119

### Recomendación
✅ Solo si usas **RAK WisBlock como módulo base**. Ver [propuesta WisBlock completa](../comerciales/rak-wisblock.md).

---

## Cámaras con decodificación por software

### Descripción
Usar una cámara simple (OV2640, USB webcam, Pi Camera) y decodificar QR por software en el módulo base.

### Opciones de cámara

#### OV2640 (para ESP32-CAM variant)
- **Resolución:** 2MP (1600×1200)
- **Interfaz:** DVP paralela (específica ESP32-CAM)
- **Costo:** $5-8 (incluida en ESP32-CAM)
- **Librería:** esp32-camera + quirc/QRCode

#### Raspberry Pi Camera Module v2
- **Resolución:** 8MP (3280×2464)
- **Interfaz:** CSI (conector ribbon)
- **Costo:** $15-25
- **Software:** Python + OpenCV + pyzbar / zbar

#### Cámaras USB genéricas
- **Resolución:** Variable (720p-1080p)
- **Interfaz:** USB 2.0
- **Costo:** $8-20
- **Software:** OpenCV + pyzbar (Python) o similares

### Compatibilidad con módulos base

| Módulo Base | Cámara | Compatibilidad | Notas |
|-------------|--------|----------------|-------|
| **ESP32-DevKit** | OV2640 | ❌ **No** | Requiere ESP32-CAM variant |
| **ESP32-DevKit** | USB | ❌ **No** | ESP32 no tiene USB host |
| **ESP32-S3** | OV2640/OV5640 | ✅ **Excelente** | Interfaz DVP nativa, mejor que ESP32-CAM |
| **ESP32-S3** | USB | ⚠️ **Limitado** | USB OTG teóricamente, pero complejo |
| **Raspberry Pi Zero 2W** | Pi Camera | ✅ **Excelente** | Conector CSI dedicado |
| **Raspberry Pi Zero 2W** | USB | ✅ **Buena** | Requiere hub powered, mayor consumo |

### Decodificación por software

#### En ESP32/ESP32-S3 (C/C++)
- **Librería:** [quirc](https://github.com/dlbeer/quirc) - Decoder QR compacto
- **Ventajas:** Sin costo adicional de escáner dedicado
- **Desventajas:** 
  - Lento (2-5 FPS)
  - Consume mucha RAM
  - Requiere buena iluminación
  - Distancia limitada (10-30 cm)

#### En Raspberry Pi (Python)
- **Librerías:** pyzbar, zbar, OpenCV QR detector
- **Ventajas:** 
  - Fácil programación (Python)
  - Buena tasa de éxito
  - Flexible (múltiples códigos en una imagen)
- **Desventajas:**
  - Alto consumo CPU
  - Latencia variable

### Costo aproximado
| Opción | Precio (USD) |
|--------|--------------|
| ESP32-CAM (OV2640 incluida) | 8-12 |
| ESP32-S3 + cámara OV2640 | 15-20 |
| RPi Zero 2W + Pi Camera v2 | 35-45 |
| RPi Zero 2W + USB webcam | 28-40 |

### Ventajas de decodificación por software
- ✅ Costo más bajo que escáner dedicado
- ✅ Componente común (cámara)
- ✅ Puede usarse para otras cosas (fotos, video)

### Desventajas de decodificación por software
- ❌ Menor fiabilidad que escáner dedicado
- ❌ Mayor latencia
- ❌ Requiere buena iluminación
- ❌ Consume recursos del CPU
- ❌ No lee tan bien pantallas/códigos difíciles

### Recomendación
- ✅ **ESP32-S3 + cámara:** Si presupuesto es muy ajustado y condiciones controladas
- ✅ **RPi + Pi Camera:** Si ya usas RPi y quieres flexibilidad Python
- ❌ **Para producción/fiabilidad:** Preferir escáner 2D UART dedicado

---

## Escáneres USB

### Descripción
Escáneres de códigos con interfaz USB (HID, COM, o custom). Plug-and-play con computadoras, requiere adaptación para MCUs.

### Tipos
- **USB-HID:** Se comporta como teclado, "escribe" el código
- **USB-COM/Serial:** Puerto serial virtual
- **USB Custom:** Requiere driver específico

### Compatibilidad con módulos base

| Módulo Base | Compatibilidad | Notas |
|-------------|----------------|-------|
| **ESP32-DevKit** | ❌ **No** | No tiene USB host |
| **ESP32-S3** | ⚠️ **Teórico** | USB OTG, pero soporte limitado |
| **Raspberry Pi Zero 2W** | ✅ **Buena** | Puerto USB OTG, puede actuar como host con hub |

### Costo aproximado
- **Escáner USB 2D básico:** $25-40
- **Escáner USB profesional:** $60-100

### Recomendación
⚠️ **Solo para Raspberry Pi** - ESP32 no es adecuado para escáneres USB. Preferir UART para ESP32.

---

## Netum W8

### Descripción
Dispositivo **completo standalone** con escáner 2D + Wi-Fi integrado. No es un módulo para conectar.

### Compatibilidad
❌ **No aplica** - Es un dispositivo terminal completo. Ver [análisis detallado](../comerciales/netum-w8.md).

---

## Tabla comparativa resumida

| Opción | Costo | Velocidad | Fiabilidad | Compatibilidad ESP32 | Compatibilidad RPi |
|--------|-------|-----------|------------|---------------------|-------------------|
| **Escáner UART** | $30-45 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ✅ Excelente | ✅ Buena |
| **M5Stack Atomic** | $85 | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⚠️ Ya incluye ESP32 | ❌ No |
| **RAK12018** | $119 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⚠️ Solo WisBlock | ⚠️ Solo WisBlock |
| **Cámara + Software (ESP32-S3)** | $15-20 | ⭐⭐ | ⭐⭐⭐ | ✅ ESP32-S3 | ❌ N/A |
| **Cámara + Software (RPi)** | $20-25 | ⭐⭐⭐ | ⭐⭐⭐⭐ | ❌ N/A | ✅ Excelente |
| **Escáner USB** | $30-50 | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ❌ No compatible | ✅ Buena |

## Recomendaciones por escenario

### Para prototipo con ESP32-DevKit
✅ **Escáner 2D UART genérico** ($30-45)
- Mejor balance costo/desempeño
- Fácil integración
- Alta fiabilidad

### Para prototipo con ESP32-S3
✅ **Opción económica:** Cámara + decodificación software ($15-20)
✅ **Opción confiable:** Escáner 2D UART ($30-45)

### Para prototipo con Raspberry Pi Zero 2W
✅ **Opción económica:** Pi Camera + pyzbar ($20-25)
✅ **Opción confiable:** Cámara USB + pyzbar ($15-20)
✅ **Opción premium:** Escáner USB ($30-50)

### Para producción
✅ **Escáner 2D UART dedicado** - Máxima fiabilidad

---

**Última actualización:** Diciembre 2025
