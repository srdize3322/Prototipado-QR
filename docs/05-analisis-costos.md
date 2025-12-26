# Análisis de Costos

## Costos por Configuración

### Configuración 1: Raspberry Pi Zero 2W + Webcam USB

#### Componentes
| Componente | Costo Unitario (USD) | Cantidad | Subtotal |
|------------|---------------------|----------|----------|
| Raspberry Pi Zero 2W | $15 | 1 | $15 |
| Webcam USB básica | $12 | 1 | $12 |
| Tarjeta microSD 16GB | $8 | 1 | $8 |
| Fuente 5V 2.5A | $7 | 1 | $7 |
| LEDs + resistencias | $2 | 1 | $2 |
| Carcasa/gabinete | $5 | 1 | $5 |
| **TOTAL** | | | **$49** |

#### Ventajas de Costo
- ✅ Desarrollo rápido (menos horas de ingeniería)
- ✅ Fácil reemplazo de componentes individuales
- ✅ No requiere PCB personalizado

#### Desventajas de Costo
- ❌ Costo unitario alto para producción
- ❌ Tarjeta SD puede requerir reemplazo

#### Costo Operativo Anual
- Consumo energético: ~2.5W × 24h × 365d × $0.15/kWh = **$3.29/año**
- Mantenimiento (reemplazo SD, etc.): **$5/año**
- **Total operativo: ~$8.29/año**

---

### Configuración 2: Raspberry Pi 4 (2GB) + Raspberry Pi Camera

#### Componentes
| Componente | Costo Unitario (USD) | Cantidad | Subtotal |
|------------|---------------------|----------|----------|
| Raspberry Pi 4 (2GB) | $45 | 1 | $45 |
| Pi Camera Module v2 | $30 | 1 | $30 |
| Tarjeta microSD 32GB | $10 | 1 | $10 |
| Fuente 5V 3A | $10 | 1 | $10 |
| LEDs + resistencias | $2 | 1 | $2 |
| Carcasa | $8 | 1 | $8 |
| **TOTAL** | | | **$105** |

#### Ventajas de Costo
- ✅ Procesamiento superior permite funcionalidades adicionales
- ✅ Menor tiempo de desarrollo
- ✅ Reutilizable para otros proyectos

#### Desventajas de Costo
- ❌ Costo inicial muy alto
- ❌ Sobre-especificado para función básica
- ❌ Mayor consumo energético

#### Costo Operativo Anual
- Consumo energético: ~6W × 24h × 365d × $0.15/kWh = **$7.88/año**
- Mantenimiento: **$5/año**
- **Total operativo: ~$12.88/año**

---

### Configuración 3: ESP32-CAM

#### Componentes
| Componente | Costo Unitario (USD) | Cantidad | Subtotal |
|------------|---------------------|----------|----------|
| ESP32-CAM | $10 | 1 | $10 |
| Programador FTDI (reusable) | $5 | 0.1* | $0.50 |
| Fuente 5V 1A | $4 | 1 | $4 |
| LEDs + resistencias | $2 | 1 | $2 |
| Carcasa básica | $3 | 1 | $3 |
| **TOTAL** | | | **$19.50** |

*Se asume 1 programador para 10 unidades

#### Ventajas de Costo
- ✅ Costo unitario muy bajo
- ✅ Ideal para producción a escala
- ✅ Bajo consumo = menor costo operativo

#### Desventajas de Costo
- ❌ Mayor tiempo de desarrollo (más horas de ingeniería)
- ❌ Puede requerir iteraciones de hardware
- ❌ Confiabilidad de lectura QR puede ser limitada

#### Costo Operativo Anual
- Consumo energético: ~1W × 24h × 365d × $0.15/kWh = **$1.31/año**
- Mantenimiento: **$2/año**
- **Total operativo: ~$3.31/año**

---

### Configuración 4: ESP32 DevKit + Módulo QR GM65

#### Componentes
| Componente | Costo Unitario (USD) | Cantidad | Subtotal |
|------------|---------------------|----------|----------|
| ESP32 DevKit | $8 | 1 | $8 |
| Módulo GM65 QR Scanner | $22 | 1 | $22 |
| Fuente 5V 2A | $5 | 1 | $5 |
| LEDs + resistencias | $2 | 1 | $2 |
| PCB personalizado (opcional) | $3 | 1 | $3 |
| Carcasa | $5 | 1 | $5 |
| **TOTAL** | | | **$45** |

#### Ventajas de Costo
- ✅ Mejor balance costo/confiabilidad
- ✅ Lectura QR garantizada
- ✅ Bajo consumo energético
- ✅ Menos tiempo de desarrollo de software

#### Desventajas de Costo
- ❌ Módulo GM65 costoso
- ❌ Requiere integración de hardware

#### Costo Operativo Anual
- Consumo energético: ~1.5W × 24h × 365d × $0.15/kWh = **$1.97/año**
- Mantenimiento: **$3/año**
- **Total operativo: ~$4.97/año**

---

### Configuración 5: Arduino MKR WiFi 1010 + Módulo QR GM67

#### Componentes
| Componente | Costo Unitario (USD) | Cantidad | Subtotal |
|------------|---------------------|----------|----------|
| Arduino MKR WiFi 1010 | $28 | 1 | $28 |
| Módulo GM67 QR Scanner | $30 | 1 | $30 |
| Fuente 5V 2A | $5 | 1 | $5 |
| LEDs + resistencias | $2 | 1 | $2 |
| Carcasa | $5 | 1 | $5 |
| **TOTAL** | | | **$70** |

#### Ventajas de Costo
- ✅ Alta confiabilidad
- ✅ Plataforma estable
- ✅ Bajo mantenimiento

#### Desventajas de Costo
- ❌ Costo elevado sin beneficios adicionales vs ESP32

#### Costo Operativo Anual
- Consumo energético: ~1.2W × 24h × 365d × $0.15/kWh = **$1.58/año**
- Mantenimiento: **$2/año**
- **Total operativo: ~$3.58/año**

---

## Análisis de Costo Total de Propiedad (TCO) a 3 años

### Cálculo TCO
TCO = Costo Inicial + (Costo Operativo Anual × 3) + (Horas Desarrollo × Costo Hora)

Asumiendo:
- Costo hora ingeniería: $30/hora
- Horas desarrollo Raspberry Pi: 20 horas
- Horas desarrollo ESP32-CAM: 60 horas
- Horas desarrollo ESP32 + GM65: 40 horas
- Horas desarrollo Arduino: 30 horas

| Configuración | Costo Inicial | Operativo 3a | Desarrollo | **TCO 3 años** |
|---------------|---------------|--------------|------------|----------------|
| **Rpi Zero 2W + Webcam** | $49 | $25 | $600 | **$674** |
| **Rpi 4 + Camera** | $105 | $39 | $600 | **$744** |
| **ESP32-CAM** | $19.50 | $10 | $1,800 | **$1,829.50** |
| **ESP32 + GM65** | $45 | $15 | $1,200 | **$1,260** |
| **Arduino + GM67** | $70 | $11 | $900 | **$981** |

### TCO para Producción (100 unidades)

Asumiendo economías de escala y desarrollo único:

| Configuración | Costo Unit. | 100 unid. | Desarrollo | **TCO Total** | **Por unidad** |
|---------------|-------------|-----------|------------|---------------|----------------|
| **Rpi Zero 2W + Webcam** | $49 | $4,900 | $600 | **$5,500** | **$55** |
| **Rpi 4 + Camera** | $105 | $10,500 | $600 | **$11,100** | **$111** |
| **ESP32-CAM** | $17* | $1,700 | $1,800 | **$3,500** | **$35** |
| **ESP32 + GM65** | $38* | $3,800 | $1,200 | **$5,000** | **$50** |
| **Arduino + GM67** | $60* | $6,000 | $900 | **$6,900** | **$69** |

*Costos reducidos por compra al por mayor

---

## Costos Adicionales a Considerar

### Infraestructura de Servidor
- **Servidor Cloud Básico**: $10-50/mes
- **Broker MQTT Managed**: $0-20/mes
- **Certificados SSL**: $0 (Let's Encrypt) - $200/año
- **Dominio**: $10-15/año
- **Almacenamiento DB**: $5-30/mes

**Estimado anual infraestructura:** $200-800/año

### Desarrollo y Mantenimiento
- **Desarrollo firmware inicial**: 20-60 horas
- **Desarrollo backend**: 40-80 horas
- **Mantenimiento anual**: 10-20 horas

### Costos Ocultos
- **Certificaciones (CE, FCC)**: $2,000-5,000 (si aplica)
- **Testing y QA**: 20-40 horas
- **Documentación**: 10-20 horas
- **Soporte técnico**: Variable

---

## Recomendaciones de Costo

### Para Prototipo Único / POC
**Recomendado:** Raspberry Pi Zero 2W + Webcam USB
- TCO más bajo para unidad única
- Desarrollo rápido
- **Costo total: ~$674**

### Para Producción Pequeña (10-50 unidades)
**Recomendado:** ESP32 + Módulo GM65
- Balance costo/confiabilidad
- Inversión en desarrollo amortizada
- **Costo por unidad: ~$50-55**

### Para Producción Media (50-500 unidades)
**Recomendado:** ESP32 + Módulo GM65 con PCB personalizado
- Optimización de componentes
- Reducción de costos por volumen
- **Costo por unidad: ~$35-45**

### Para Producción Grande (>500 unidades)
**Recomendado:** ESP32-CAM optimizado o diseño custom
- Inversión en desarrollo justificada
- Máxima reducción de costos
- **Costo por unidad: ~$25-30**

---

## ROI (Return on Investment)

### Ejemplo de Caso de Uso: Control de Acceso

Asumiendo:
- Costo alternativa manual: $15/hora × 8 horas = $120/día
- Días operación: 250 días/año
- Ahorro anual: $30,000

**ROI para inversión de $5,000 (100 unidades):**
- Payback period: 2 meses
- ROI año 1: 500%
- ROI año 3: 1,700%

### Conclusión de Costos

La configuración óptima depende de:
1. **Volumen de producción**
2. **Requisitos de confiabilidad**
3. **Capacidad de desarrollo**
4. **Presupuesto inicial disponible**

Para la mayoría de casos, **ESP32 + Módulo GM65** ofrece el mejor balance entre costo, confiabilidad y facilidad de desarrollo.
