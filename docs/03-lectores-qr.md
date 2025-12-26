# Evaluación de Lectores QR

## Tipos de Lectores QR

### 1. Cámaras + Software de Procesamiento

#### Opción A: Cámara USB Estándar
- **Hardware**: Cualquier webcam USB compatible
- **Software**: OpenCV + ZBar/ZXing
- **Plataforma Compatible**: Raspberry Pi, PC embebidos

**Ventajas:**
- ✅ Cámaras económicas ($10-30 USD)
- ✅ Fácil reemplazo
- ✅ Alta disponibilidad
- ✅ Resoluciones variables según presupuesto

**Desventajas:**
- ❌ Requiere procesamiento de imagen significativo
- ❌ Consumo de CPU/GPU alto
- ❌ Latencia variable según iluminación
- ❌ Requiere plataforma con capacidad de procesamiento

**Costo Total:** $10-30 USD

---

#### Opción B: Módulo de Cámara CSI (Raspberry Pi)
- **Hardware**: Raspberry Pi Camera Module v2/v3
- **Resolución**: 8MP (v2) o 12MP (v3)
- **Interfaz**: CSI dedicada

**Ventajas:**
- ✅ Integración nativa con Raspberry Pi
- ✅ Bajo latency por interfaz dedicada
- ✅ Buena calidad de imagen
- ✅ Librerías optimizadas (picamera2)

**Desventajas:**
- ❌ Solo compatible con Raspberry Pi
- ❌ Cable flat delicado
- ❌ Costo medio ($25-35 USD)

**Costo Total:** $25-35 USD

---

#### Opción C: ESP32-CAM
- **Hardware**: ESP32 con cámara OV2640 integrada
- **Resolución**: 2MP
- **Interfaz**: Integrada

**Ventajas:**
- ✅ Todo en uno, muy compacto
- ✅ Económico ($8-12 USD)
- ✅ Bajo consumo
- ✅ Wi-Fi integrado

**Desventajas:**
- ❌ Recursos limitados para procesamiento
- ❌ Tasa de éxito de lectura QR variable
- ❌ Requiere optimización significativa
- ❌ Puede requerir librerías externas

**Costo Total:** $8-12 USD

---

### 2. Módulos Lectores QR Dedicados

#### Opción D: Módulo GM65/GM66
- **Tipo**: Escáner láser 1D/2D
- **Interfaz**: UART, USB
- **Fabricante**: Zhenghou Wincode (clon chino de Symbol)

**Características:**
- Lectura de QR, DataMatrix, PDF417, códigos 1D
- Velocidad de escaneo: <100ms
- Distancia de lectura: 5-15cm (según modelo)
- Alimentación: 5V, ~100mA

**Ventajas:**
- ✅ Procesamiento independiente
- ✅ Alta tasa de éxito de lectura
- ✅ Bajo consumo
- ✅ Fácil integración (UART simple)
- ✅ No requiere procesamiento del MCU

**Desventajas:**
- ❌ Costo más elevado ($18-25 USD)
- ❌ Componente adicional
- ❌ Distancia de lectura limitada

**Costo Total:** $18-25 USD

---

#### Opción E: Módulo GM67
- **Tipo**: Escáner 2D con objetivo ajustable
- **Interfaz**: UART, USB
- **Versión mejorada del GM65**

**Características:**
- Similar al GM65 pero con mejor óptica
- Distancia de lectura: 5-20cm
- Mayor tasa de éxito en condiciones adversas

**Ventajas:**
- ✅ Todas las del GM65
- ✅ Mayor distancia de lectura
- ✅ Mejor desempeño con baja iluminación

**Desventajas:**
- ❌ Costo mayor ($25-35 USD)

**Costo Total:** $25-35 USD

---

#### Opción F: ScanEngine de Honeywell/Zebra
- **Tipo**: Escáneres industriales profesionales
- **Modelos**: N4313, SE955, etc.

**Características:**
- Grado industrial
- Altísima confiabilidad
- Interfaces múltiples

**Ventajas:**
- ✅ Máxima confiabilidad
- ✅ Soporte técnico profesional
- ✅ Garantía extendida
- ✅ Distancias de lectura superiores

**Desventajas:**
- ❌ Costo muy elevado ($80-200 USD)
- ❌ Sobredimensionado para prototipo

**Costo Total:** $80-200+ USD

---

### 3. Smartphones/Tablets con App

#### Opción G: Aplicación Android/iOS
- **Hardware**: Dispositivo móvil existente
- **Software**: App personalizada

**Ventajas:**
- ✅ Cámara de alta calidad incluida
- ✅ Pantalla para UI
- ✅ Conectividad múltiple (Wi-Fi, LTE)
- ✅ GPS integrado
- ✅ Batería integrada

**Desventajas:**
- ❌ Costo de dispositivo completo ($100-500 USD)
- ❌ Sobredimensionado para función específica
- ❌ Consumo de batería alto
- ❌ Requiere desarrollo de app
- ❌ Menos robusto para uso continuo

**Costo Total:** $100-500+ USD (si se compra nuevo)

---

## Tabla Comparativa de Lectores QR

| Opción | Costo | Velocidad | Confiabilidad | Facilidad Integración | Consumo |
|--------|-------|-----------|---------------|-----------------------|---------|
| **Webcam USB** | $10-30 | Media | Media | Alta (Rpi) | Alto |
| **Rpi Camera** | $25-35 | Alta | Alta | Alta (Rpi) | Medio |
| **ESP32-CAM** | $8-12 | Baja | Media | Media | Bajo |
| **GM65/GM66** | $18-25 | Muy Alta | Muy Alta | Muy Alta | Muy Bajo |
| **GM67** | $25-35 | Muy Alta | Muy Alta | Muy Alta | Muy Bajo |
| **Honeywell/Zebra** | $80-200+ | Excelente | Excelente | Alta | Bajo |
| **Smartphone** | $100-500+ | Alta | Alta | Baja | Alto |

## Librerías de Software para Procesamiento QR

### Para Raspberry Pi / Linux

#### ZBar
```bash
sudo apt-get install libzbar0 python3-zbar
```
- ✅ Rápido y eficiente
- ✅ Soporte múltiples formatos
- ✅ Bien mantenido

#### ZXing (Zebra Crossing)
```bash
pip3 install pyzxing
```
- ✅ Muy preciso
- ✅ Soporte extenso de formatos
- ❌ Más pesado (requiere Java)

#### OpenCV + QRCodeDetector
```python
import cv2
detector = cv2.QRCodeDetector()
```
- ✅ Integrado con OpenCV
- ✅ No requiere dependencias adicionales
- ⚠️ Menos robusto que ZBar/ZXing

### Para ESP32

#### quirc
- Librería C optimizada para embebidos
- ✅ Bajo uso de memoria
- ✅ Razonablemente rápida
- ❌ Solo QR, no otros formatos

#### ESP-QR-Scanner (GitHub)
- Port de quirc para ESP32-CAM
- ⚠️ Resultados variables según iluminación

## Recomendaciones por Caso de Uso

### Prototipo de Desarrollo Rápido
**Recomendado:** Webcam USB + Raspberry Pi + ZBar
- Flexibilidad máxima
- Fácil iteración
- Bajo riesgo

### Producción Económica (<100 unidades)
**Recomendado:** ESP32 + Módulo GM65
- Balance costo/confiabilidad
- Bajo consumo
- Fácil integración

### Producción Escala Media (100-1000 unidades)
**Recomendado:** ESP32 + Módulo GM67
- Mejor experiencia de usuario
- Confiabilidad profesional
- Costo unitario aceptable

### Producción Industrial (>1000 unidades)
**Recomendado:** MCU personalizado + Honeywell/Zebra
- Máxima confiabilidad
- Soporte técnico
- Optimización de costos a escala

### Instalación Temporal/Demo
**Recomendado:** Tablet Android + App
- Rápido deployment
- Sin necesidad de hardware adicional
- Flexibilidad total
