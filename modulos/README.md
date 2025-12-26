# Módulos Periféricos

Esta carpeta contiene la documentación de **módulos periféricos** que se conectan al módulo base (cerebro).

## Estructura

Cada archivo describe un tipo de módulo con:
- Opciones disponibles en el mercado
- Especificaciones técnicas
- **Compatibilidad con cada módulo base**
- Costos aproximados
- Ejemplos de código
- Recomendaciones

---

## Módulos disponibles

| Módulo | Descripción | Precio típico | Obligatorio |
|--------|-------------|---------------|-------------|
| [📷 Lector QR](lector-qr.md) | Escáneres 2D UART, cámaras, USB | $8-45 | ✅ Sí |
| [📡 Wi-Fi](wifi.md) | Conectividad inalámbrica | Incluido | ✅ Sí |
| [🛰️ GPS](gps.md) | Geolocalización GNSS | $8-25 | ⚠️ Opcional |
| [📶 LTE/Celular](lte.md) | Conectividad móvil 4G | $20-40 | ⚠️ Opcional |
| [💡 LEDs/Pantallas](led-indicadores.md) | Indicadores visuales | $0.50-15 | ✅ Recomendado |

---

## Cómo usar esta documentación

### 1. Elige tu módulo base
Ver carpeta [`/propuestas/`](../propuestas/) para elegir el "cerebro":
- ESP32-DevKit (recomendado)
- ESP32-S3
- Raspberry Pi Zero 2W

### 2. Revisa compatibilidad
En cada archivo de módulo, busca la **tabla de compatibilidad** que indica si es compatible con tu módulo base elegido.

Ejemplo de tabla de compatibilidad:
| Módulo Base | Compatibilidad | Notas |
|-------------|----------------|-------|
| ESP32-DevKit | ✅ Excelente | Conexión directa UART |
| ESP32-S3 | ✅ Excelente | Igual que ESP32 |
| RPi Zero 2W | ⚠️ Via USB mejor | GPIO también funciona |

### 3. Calcula costo total
Suma el costo del módulo base + módulos periféricos elegidos.

---

## Configuraciones típicas

### 🎯 Configuración Mínima (QR + Wi-Fi básico)
```
Módulo base: ESP32-DevKit ($8)
├── Wi-Fi: Integrado
├── Lector QR: Escáner UART ($35)
└── Indicadores: 2 LEDs ($0.50)

Total: ~$43
```

### 🎯 Configuración Recomendada
```
Módulo base: ESP32-DevKit ($8)
├── Wi-Fi: Integrado
├── Lector QR: Escáner UART ($35)
├── Indicadores: LED RGB WS2812B ($0.50)
└── Debugging: OLED 0.96" ($4)

Total: ~$47
```

### 🎯 Configuración con GPS
```
Módulo base: ESP32-DevKit ($8)
├── Wi-Fi: Integrado
├── Lector QR: Escáner UART ($35)
├── GPS: NEO-M8N UART ($15)
├── Indicadores: LED RGB ($0.50)
└── Display: OLED ($4)

Total: ~$62
```

### 🎯 Configuración completa futura (GPS + LTE)
```
Módulo base: ESP32-DevKit ($8)
├── Wi-Fi: Integrado
├── Lector QR: Escáner UART ($35)
├── GPS: Integrado en SIM7600
├── LTE: SIM7600SA-H ($35)
├── Indicadores: LED RGB ($0.50)
└── Display: OLED ($4)

Total: ~$82
Fuente externa robusta requerida: +$10-15
```

### 🎯 Configuración económica con cámara
```
Módulo base: ESP32-S3 ($15)
├── Wi-Fi: Integrado
├── Lector QR: Cámara OV2640 ($6) + software
├── Indicadores: LED RGB ($0.50)
└── Display: OLED ($4)

Total: ~$25
⚠️ Menor fiabilidad lecturas QR
```

---

## Matriz de compatibilidad general

### Módulos de comunicación

| Módulo | ESP32-DevKit | ESP32-S3 | RPi Zero 2W | Notas |
|--------|--------------|----------|-------------|-------|
| **Escáner QR UART** | ✅ | ✅ | ⚠️ | ESP32 ideal, RPi mejor USB |
| **Cámara + software** | ❌ | ✅ | ✅ | Requiere ESP32-S3 o RPi |
| **GPS UART** | ✅ | ✅ | ✅ | Todos compatibles |
| **GPS USB** | ❌ | ⚠️ | ✅ | Solo RPi práctico |
| **LTE UART (SIM7600)** | ⚠️ | ⚠️ | ✅ | Complejo en ESP32, RPi más fácil |
| **Dongle USB 4G** | ❌ | ❌ | ✅ | Solo RPi |

### Indicadores visuales

| Módulo | ESP32-DevKit | ESP32-S3 | RPi Zero 2W |
|--------|--------------|----------|-------------|
| **LEDs individuales** | ✅ | ✅ | ✅ |
| **LED RGB WS2812B** | ✅ | ✅ | ✅ |
| **OLED I2C** | ✅ | ✅ | ✅ |
| **TFT SPI pequeño** | ⚠️ | ✅ | ✅ |
| **TFT grande/HDMI** | ❌ | ❌ | ✅ |

**Leyenda:**
- ✅ = Compatible, recomendado
- ⚠️ = Compatible con limitaciones o complejidad
- ❌ = No compatible o no práctico

---

## Consideraciones de diseño

### Alimentación
- **ESP32 solo:** Fuente USB 5V/1A suficiente
- **ESP32 + escáner QR:** Fuente 5V/2A recomendada
- **ESP32 + LTE:** Fuente 5V/3A + capacitores obligatorio
- **RPi + cualquier cosa:** Fuente 5V/2.5A mínimo

### GPIO disponibles
- **ESP32:** ~30 GPIO, algunos reservados para flash
- **ESP32-S3:** ~45 GPIO
- **RPi Zero:** 40 pines header

### Niveles lógicos
- **ESP32/ESP32-S3:** 3.3V
- **Raspberry Pi:** 3.3V
- ⚠️ **Módulos 5V:** Requieren level shifter

### Consumo típico total

| Configuración | Idle | Activo | Pico |
|---------------|------|--------|------|
| ESP32 + QR + LEDs | 150 mA | 250 mA | 400 mA |
| ESP32 + QR + GPS + LEDs | 200 mA | 300 mA | 450 mA |
| ESP32 + QR + LTE + GPS | 250 mA | 500 mA | 2500 mA |
| RPi + USB QR | 250 mA | 400 mA | 600 mA |
| RPi + USB 4G + QR | 400 mA | 700 mA | 2000 mA |

---

## Guía de compra

### Prioridad 1: Obligatorios
1. ✅ **Módulo base** → Ver `/propuestas/` → $8-40
2. ✅ **Lector QR** → Ver [lector-qr.md](lector-qr.md) → $8-45
3. ✅ **Indicadores** → Ver [led-indicadores.md](led-indicadores.md) → $0.50-5

**Subtotal mínimo:** ~$16-90 (según elecciones)

### Prioridad 2: Recomendados
4. ⚠️ **Pantalla OLED** → Para debugging → $4
5. ⚠️ **Fuente alimentación robusta** → $5-15

**Subtotal recomendado:** ~$25-110

### Prioridad 3: Expansiones futuras
6. ⚠️ **GPS** → Ver [gps.md](gps.md) → $8-25
7. ⚠️ **LTE** → Ver [lte.md](lte.md) → $20-40

**Total con expansiones:** ~$53-175

---

## Recomendaciones por presupuesto

### Presupuesto <$50
✅ ESP32-DevKit + Escáner UART + LEDs
- Total: ~$43
- Funcional completo para QR + Wi-Fi

### Presupuesto $50-80
✅ ESP32-DevKit + Escáner UART + GPS + LED RGB + OLED
- Total: ~$62
- Incluye geolocalización y debugging

### Presupuesto $80-120
✅ ESP32-DevKit + Escáner UART + GPS + LTE (futuro) + displays
- Total: ~$82 base, ~$120 con LTE
- Sistema completo escalable

### Presupuesto >$150 o necesidad procesamiento
✅ Raspberry Pi Zero 2W + periféricos USB
- Mayor flexibilidad pero mayor consumo

---

## Disponibilidad en Chile

### Online internacional
- **AliExpress:** Precios más bajos, envío 3-6 semanas
- **Amazon:** Precios medios, envío 1-3 semanas

### Local Chile
- **MercadoLibre Chile:** Disponible inmediato, +30-50% precio
- **Tiendas especializadas:**
  - Electrónica Chile
  - BricoGeek
  - Unit Electronics

### Recomendación
- ✅ Comprar módulo base local (disponible rápido)
- ⚠️ Módulos periféricos: AliExpress para mejor precio

---

## Próximos pasos

1. ✅ [Elegir módulo base](../propuestas/)
2. ✅ Revisar compatibilidad de cada módulo periférico
3. ✅ Calcular costo total
4. ✅ Verificar disponibilidad
5. ✅ Realizar pedido con anticipación (3-6 semanas típico)
6. ✅ Mientras llegan: Preparar entorno de desarrollo

---

**Última actualización:** Diciembre 2025
