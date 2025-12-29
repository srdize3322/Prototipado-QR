# Prototipado QR + Wi-Fi

Sistema modular IoT: lectura QR, envío Wi-Fi, escalable (GPS/LTE).

---

## Decisión de Plataforma

**Plataforma elegida: Raspberry Pi Zero 2 W (con header soldado)**

**Motivo:** Mejor compatibilidad y velocidad de prototipado. Permite integrar lector QR por USB/UART y controlar LEDs por GPIO sin conflictos. Única opción práctica para escalar a múltiples periféricos (QR + GPS + LTE).

**Lector QR:** GM67 (1D/2D) - soporta USB y UART. Para MVP usaremos USB (más simple).

**Puerto correcto:** En la Zero 2 W, solo el puerto micro-USB marcado "USB" soporta OTG/datos. El puerto "PWR" es únicamente para alimentación.

---

## BOM / Kit Fase Inicial (QR + 4G + RPi Zero 2W)

> **Precios referenciales en CLP al 2025-12-29** (AliExpress). Pueden variar por cupones, vendedor, tipo de cambio e impuestos de importación.
>
> **Esta es la propuesta inicial para la etapa de prototipado**, posterior a la reunión y análisis. Empezamos con módulo QR + 4G + Raspberry Pi Zero 2W.

| Item | Cant. | Precio | Envío | Subtotal | Link |
|------|------:|-------:|------:|---------:|------|
| Lector QR 1D/2D **GM67** | 1 | 14.300 | 5.438 | 19.738 | [AliExpress](https://es.aliexpress.com/item/1005005353980674.html) |
| **Raspberry Pi Zero 2 W** (con pines soldados) | 1 | 20.700 | 0 | 20.700 | [AliExpress](https://es.aliexpress.com/item/1005008224603338.html) |
| Carcasa aluminio CNC + disipación pasiva | 1 | 920 | 0 | 920 | [AliExpress](https://es.aliexpress.com/item/1005004091121680.html) |
| microSD 32 GB | 1 | 5.100 | 0 | 5.100 | [AliExpress](https://es.aliexpress.com/item/1005007535345003.html) |
| Fuente poder 5V 3A micro-USB | 1 | 2.330 | 0 | 2.330 | [AliExpress](https://www.aliexpress.com/ssr/300000512/BundleDeals2?productIds=1005008799188307:12000046708556983) |
| Adaptador OTG micro-USB macho → USB-A hembra (90°) | 1 | 884 | 1.738 | 2.622 | [AliExpress](https://es.aliexpress.com/item/4001307573370.html) |
| Cables Dupont 40 unids (M-M / F-F / M-F) | 1 | 920 | 0 | 920 | [AliExpress](https://es.aliexpress.com/item/32349445870.html) |
| Dongle USB **4G LTE** (150Mbps) | 1 | 9.700 | 0 | 9.700 | [AliExpress](https://es.aliexpress.com/item/1005010632978744.html) |

**TOTAL KIT BASE: 62.030 CLP** (~US$68 usando 1 USD ≈ 905,90 CLP)

### Faltantes / Recomendado para Kit Armable

**Obligatorio para MVP (indicadores visuales):**
- [ ] 1x LED verde + 1x LED rojo (5mm o SMD)
- [ ] 2x resistencias 220-330 Ω (una por LED)
- [ ] Mini protoboard o PCB perforada para fijar LEDs y resistencias

**Recomendado (por uso de múltiples USB):**
- [ ] Hub USB OTG (idealmente alimentado) para conectar GM67 + dongle 4G simultáneamente
- [ ] SIM + plan de datos (si se usará LTE)
- [ ] Cable extensión USB corto (acomodar dongle dentro/fuera carcasa)

**Recomendado para armado limpio:**
- [ ] Separadores/tornillos (standoffs) para montar Zero 2 W en carcasa
- [ ] Cinta doble contacto/termal o pads térmicos (según carcasa)

**Solo para debug (opcional):**
- [ ] Adaptador micro-HDMI → HDMI (si se quiere monitor)
- [ ] Teclado/mouse USB (si no se configura headless)
- [ ] Lector USB de microSD (si tu PC no tiene ranura)

---

## Conexión del GM67

### Recomendado (MVP): GM67 por USB
- Conectar GM67 al puerto micro-USB marcado "USB" usando el adaptador OTG
- Alimentación Pi por puerto "PWR IN"
- GM67 soporta USB y UART (validado por manual)

### Alternativo: GM67 por UART (GPIO)
- Solo si el GM67 se usa en modo serial TTL
- Antes de cablear: confirmar niveles lógicos (3.3V vs 5V) en manual del GM67

---

## Conectividad LTE (Opcional)

Para escenarios sin Wi-Fi estable, se puede usar un **dongle 4G LTE por USB**.

**Consideración clave:** La Zero 2 W tiene **un solo USB OTG**. Si usamos GM67 por USB + dongle 4G por USB simultáneamente, necesitaremos un **hub USB OTG** (idealmente con alimentación externa) o mover el GM67 a **UART (GPIO)**.

**Configuraciones recomendadas:**
- **MVP simple:** GM67 por USB + Wi-Fi (sin 4G)
- **MVP robusto:** GM67 por UART + dongle 4G por USB (sin hub necesario)

---

## Foco del Proyecto

**Objetivo:** Desarrollar un lector QR portátil con conectividad Wi-Fi para eventos, que pueda escanear códigos QR y enviar los datos a un servidor en tiempo real.

**Características principales:**
- Lectura rápida de códigos QR (<100ms)
- Envío de datos vía Wi-Fi (HTTPS REST)
- Indicadores LED de estado
- Configuración Wi-Fi simple (captive portal)
- Escalable: GPS y LTE opcionales

**Funcionalidad MVP:**
1. Lee QR → envía request al servidor
2. Según respuesta: LED verde (OK) o LED rojo (ERROR)
3. Considera reintentos y cola mínima cuando no hay red

---

## Plan de Implementación por Fases

### Fase 1: Pruebas de Factibilidad (Básico Funcional)
**Objetivo:** Validar QR + Wi-Fi con Raspberry Pi Zero 2W

**Compras iniciales:**
- **Raspberry Pi Zero 2W Kit completo** ($40-50)
  - RPi Zero 2W ($20)
  - Fuente 5V/2.5A ($8)
  - SD Card 16GB ($10)
  - Adaptadores (Mini HDMI, Micro USB OTG)
- **GM67 Lector QR** ($28-30)
- **Cables y adaptadores básicos** ($5-10)

**Total Fase 1:** ~$75-90

**Entregable:** Sistema funcional que lee QR y envía datos por Wi-Fi

---

### Fase 2: Optimización (Antena y Estabilidad)
**Objetivo:** Mejorar alcance y confiabilidad

**Compras adicionales:**
- **Antena Wi-Fi externa** ($5-8) - Si es necesario por rango
- **Carcasa temporal** ($5)
- **Pruebas de campo**

**Total Fase 2:** +$10-15

**Entregable:** Sistema estable con buen alcance Wi-Fi

---

### Fase 3: Encapsulado Físico
**Objetivo:** Diseño de carcasa e integración mecánica

**Actividades:**
- **Diseño CAD** del cuerpo (FreeCAD/Fusion 360)
- **Impresión 3D** o fabricación alternativa
  - Filamento PLA/PETG: $10-15
  - O fabricación en acrílico/plástico
- **Montaje e integración** de componentes

**Total Fase 3:** ~$15-30

**Entregable:** Dispositivo integrado en carcasa funcional

---

### Fase 4: Expansión Avanzada (GPS + LTE)
**Objetivo:** Agregar geolocalización y conectividad móvil
**Prerequisito:** Módulo base (WiFi + QR + RPi) **funcionando correctamente**

**Compras adicionales:**
- **GPS USB** (NEO-M8N): $15-18
- **Dongle 4G LTE USB**: $30-50
- **Hub USB** (si necesario): $5-8
- **Plan de datos**: $5-15/mes

**Total Fase 4:** +$50-75 (hardware) + mensualidad datos

**Entregable:** Sistema completo con tracking GPS y conectividad móvil

---

## Recomendación Final

### Raspberry Pi Zero 2W - PRIMERA OPCIÓN
- **Precio:** $20 | **MVP completo:** $60-130
- **Por qué:** USB host real, múltiples periféricos sin conflicto, Linux robusto
- **Cuándo:** Producción, escalabilidad, QR + LTE + GPS

### ESP32-DevKit - SEGUNDA OPCIÓN  
- **Precio:** $8 | **MVP simple:** $45
- **Por qué:** Económico, suficiente para caso básico
- **Cuándo:** Solo QR + Wi-Fi, sin expansión futura

**Diferencia clave:** +$15-30 elimina riesgo técnico de múltiples periféricos.

---

## Configuración Wi-Fi Inicial

Todos los dispositivos pueden crear red Wi-Fi propia para configuración:

1. Primera vez → crea red "QR-Setup-XXX"
2. Usuario conecta con teléfono
3. Portal web para ingresar Wi-Fi y contraseña
4. Dispositivo guarda y se reconecta
5. Listo para usar

**Nota:** Implementación trivial en RPi y ESP32 - No es factor diferenciador.

---

## Costos por Configuración

| Config | Plataforma | Precio | Uso |
|--------|------------|--------|-----|
| **Simple** | ESP32 + QR UART | $45 | QR + Wi-Fi básico |
| **Completo** | RPi + QR USB | $60 | Multi-periférico base |
| **+GPS** | RPi + GPS USB | $75 | Geolocalización |
| **+LTE** | RPi + LTE USB | $110 | Conectividad celular |
| **Todo** | RPi + QR + GPS + LTE | $130 | Sistema completo |

---

## Estructura

```
propuestas/          # Módulos base
├── raspberry-pi-zero-2w.md  [Recomendado]
├── esp32-devkit.md          [Alternativa]
├── orange-pi-zero2.md
├── esp32-s3.md
└── arduino-mkr-wifi-1010.md

modulos/             # Periféricos
├── lector-qr.md            GM67/DE2120 (UART/USB)
├── gps.md                  NEO-6M/M8N
├── lte.md                  SIM7600/USB dongles
└── led-indicadores.md      Estados visuales
```

---

## Comenzar Rápido

### Opción A: Producción (Recomendado)
- Raspberry Pi Zero 2W: $20
- QR USB: $30
- SD + fuente: $15
- **Total: $65** → Escalable a GPS/LTE después

### Opción B: Prueba Económica
- ESP32-DevKit: $8
- QR UART: $30
- LEDs: $2
- **Total: $40** → Solo QR + Wi-Fi

---

## Decisión por Caso

| Tu Necesidad | Usa | Por Qué |
|--------------|-----|---------|
| **Producción** | RPi Zero 2W | Robusto, escalable |
| **QR + LTE + GPS** | RPi Zero 2W | Única práctica |
| **Solo prueba QR** | ESP32 | Económico |
| **Presupuesto <$50** | ESP32 | Mínimo viable |

---

## Documentación

- [propuestas/README.md](propuestas/README.md) - Análisis técnico completo
- [modulos/README.md](modulos/README.md) - Periféricos y compatibilidad

---

## Nota Importante

**ESP32 con múltiples periféricos:**
- Solo 3 UART (QR + LTE + GPS = conflicto)
- USB Host inestable
- Gestión manual compleja

**Raspberry Pi Zero 2W:**
- USB host real = todos los periféricos simultáneos
- Linux = debugging fácil (SSH, logs)
- +$15-30 vs eliminación de riesgo técnico

Ver [propuestas/README.md](propuestas/README.md) para detalles técnicos.
