# Propuestas de Implementación - Módulo Lector QR + Wi-Fi

Este directorio contiene el análisis detallado de diferentes opciones para implementar el prototipo de módulo lector QR con conectividad Wi-Fi.

## Estructura

```
proposals/
├── README.md (este archivo)
├── comerciales/          # Dispositivos y kits comerciales listos o semi-listos
│   ├── m5stack-atom-qr.md
│   ├── scangenie.md
│   ├── netum-w8.md
│   ├── rtscan-rtx200.md
│   └── rak-wisblock.md
└── diy/                  # Soluciones DIY desde componentes básicos
    └── (pendiente)
```

## Comparativa rápida - Dispositivos Comerciales

| Dispositivo | Costo (USD) | Complejidad | Modularidad | Programable | Recomendación |
|-------------|-------------|-------------|-------------|-------------|---------------|
| **M5Stack ATOM QR** | ~85 | Baja | ⚠️ Media | ✅ Sí | ⭐⭐⭐⭐⭐ Mejor balance |
| **ScanGenie** | ~79 | Baja-Media | ⚠️ Buena | ✅ Sí | ⭐⭐⭐⭐ Excelente con pantalla |
| **Netum W8** | ~85 | Muy Baja | ❌ Nula | ❌ No | ⭐⭐⭐ Solo para MVP rápido |
| **RTscan RTX200** | 80-120 | Media-Alta | ⚠️ Parcial | ⚠️ Requiere MCU | ⭐⭐ Industrial, complejo |
| **RAK WisBlock** | ~139 | Media | ✅ Excelente | ✅ Sí | ⭐⭐⭐⭐ Si escalabilidad es crítica |

### Leyenda
- ✅ = Cumple completamente
- ⚠️ = Cumple parcialmente o con limitaciones
- ❌ = No cumple o muy limitado
- ⭐ = Nivel de recomendación (1-5)

## Evaluación por criterios del proyecto

### 1. Lectura QR integrada
| Dispositivo | Cumplimiento | Notas |
|-------------|--------------|-------|
| M5Stack ATOM QR | ✅ Completo | Decodificación interna, 6 tipos 2D + 19 tipos 1D |
| ScanGenie | ✅ Completo | >20 simbologías, motor Newland/DE2120 |
| Netum W8 | ✅ Completo | CMOS 1280×960, ~280 scans/seg |
| RTscan RTX200 | ✅ Completo | Sensor CMOS 640×480, múltiples simbologías |
| RAK WisBlock | ✅ Completo | Motor Rakinda LV3296, amplia compatibilidad |

**Conclusión:** Todas las opciones cumplen perfectamente este requisito.

### 2. Conectividad Wi-Fi
| Dispositivo | Cumplimiento | Tecnología |
|-------------|--------------|------------|
| M5Stack ATOM QR | ✅ Completo | ESP32, 802.11 b/g/n, 2.4 GHz |
| ScanGenie | ✅ Completo | ESP32-S3, 802.11 b/g/n, 2.4 GHz |
| Netum W8 | ✅ Completo | Wi-Fi 2.4 GHz integrado |
| RTscan RTX200 | ✅ Completo | Wi-Fi 2.4 GHz opcional integrable |
| RAK WisBlock | ✅ Completo | ESP32 (RAK11200), 802.11 b/g/n |

**Conclusión:** Todas las opciones incluyen Wi-Fi. Las basadas en ESP32 ofrecen mayor flexibilidad de programación.

### 3. Envío datos a servidor
| Dispositivo | Cumplimiento | Protocolos | Programable |
|-------------|--------------|------------|-------------|
| M5Stack ATOM QR | ✅ Completo | HTTP(S), MQTT, WS, etc. | Sí, totalmente |
| ScanGenie | ✅ Completo | HTTP(S), MQTT, TCP/UDP | Sí, totalmente |
| Netum W8 | ✅ Completo | MQTT, HTTP(S), TCP/UDP | No, pre-configurado |
| RTscan RTX200 | ⚠️ Compatible | Requiere MCU externo | Vía controlador |
| RAK WisBlock | ✅ Completo | HTTP(S), MQTT, WS, etc. | Sí, totalmente |

**Conclusión:** Opciones programables (M5Stack, ScanGenie, WisBlock) ofrecen mayor control. Netum W8 funciona pero es menos flexible.

### 4. Indicadores (LED/Buzzer)
| Dispositivo | Cumplimiento | Detalle |
|-------------|--------------|---------|
| M5Stack ATOM QR | ✅ Completo | LED RGB programable + buzzer + LEDs blancos/verdes |
| ScanGenie | ✅ Completo | Pantalla TFT 1.14" + buzzer + LED on-board |
| Netum W8 | ⚠️ Parcial | LEDs y beeps de lectura, no respuesta servidor |
| RTscan RTX200 | ⚠️ Parcial | LED blanco + buzzer, requiere LEDs externos para OK/ERROR |
| RAK WisBlock | ⚠️ Parcial | LED on-board básico, fácil añadir módulo LED/pantalla |

**Conclusión:** M5Stack y ScanGenie tienen la mejor solución de indicadores integrada. Las otras opciones requieren hardware adicional.

### 5. Modularidad y expansiones futuras
| Dispositivo | Cumplimiento | GPS | LTE | Batería | Notas |
|-------------|--------------|-----|-----|---------|-------|
| M5Stack ATOM QR | ⚠️ Media | Ext | Ext | Ext | GPIO disponibles, ecosistema M5 |
| ScanGenie | ⚠️ Buena | Ext | Ext | No | GPIO libres, open-source, 2 USB-C |
| Netum W8 | ❌ Nula | No | No | ✅ Inc | Dispositivo cerrado, no ampliable |
| RTscan RTX200 | ⚠️ Parcial | Ext | Ext | Ext | Módulo OEM, integrable en diseño mayor |
| RAK WisBlock | ✅ Excelente | ✅ | ✅ | ✅ | Módulos plug-and-play dedicados |

**Leyenda:** Inc = Incluido, Ext = Externo (requiere módulos adicionales)

**Conclusión:** RAK WisBlock es el líder absoluto en modularidad con sistema plug-and-play. Las opciones ESP32 permiten expansión via cableado. Netum W8 no es ampliable.

## Matriz de decisión

### ¿Qué opción elegir según el escenario?

#### 🎯 **Prioridad: Prototipado rápido y económico**
**Recomendación:** M5Stack ATOM QR-CODE Kit ($85)
- ✅ Listo para usar out-of-the-box
- ✅ Documentación abundante
- ✅ Comunidad activa
- ✅ Balance precio/funcionalidad ideal

#### 🎯 **Prioridad: Interfaz de usuario rica (pantalla)**
**Recomendación:** ScanGenie ($79)
- ✅ Pantalla TFT integrada
- ✅ ESP32-S3 más moderno
- ✅ Precio más bajo
- ⚠️ Comunidad más pequeña

#### 🎯 **Prioridad: MVP ultra rápido sin programación**
**Recomendación:** Netum W8 ($85)
- ✅ Plug-and-play total
- ✅ Sin necesidad de programar
- ✅ Disponibilidad inmediata
- ⚠️ Cero modularidad futura
- ⚠️ No feedback de servidor

#### 🎯 **Prioridad: Escalabilidad y expansiones futuras**
**Recomendación:** RAK WisBlock ($139)
- ✅ Sistema modular profesional
- ✅ Fácil añadir GPS, LTE, LoRa, sensores
- ✅ Batería y carga integrada
- ⚠️ Costo cercano al límite ($150)
- ⚠️ Mayor complejidad inicial

#### 🎯 **Prioridad: Integración en producto OEM**
**Recomendación:** RTscan RTX200 ($80-120)
- ✅ Módulo industrial robusto
- ✅ Diseñado para integración
- ⚠️ Requiere diseño electrónico adicional
- ⚠️ Curva de aprendizaje alta

## Recomendaciones finales

### Top 3 para prototipo

#### 🥇 **Primera elección: M5Stack ATOM QR-CODE**
- Mejor balance general
- Facilidad de uso + flexibilidad
- Precio competitivo
- Ideal para iterar rápidamente

#### 🥈 **Segunda elección: ScanGenie**
- Si la pantalla TFT es valorada
- Precio ligeramente menor
- ESP32-S3 más moderno
- Requiere algo más de trabajo de integración

#### 🥉 **Tercera elección: RAK WisBlock**
- Si la escalabilidad es crítica desde el inicio
- Proyecto con visión de evolucionar a GPS+LTE
- Presupuesto permite ~$140

### ⚠️ Opciones no recomendadas para prototipo flexible

**Netum W8:** Solo para MVPs descartables o validaciones muy rápidas. No invertir si el proyecto evolucionará.

**RTscan RTX200:** Solo si hay capacidad de diseño electrónico in-house y se busca una solución OEM industrial.

## Próximos pasos sugeridos

1. **Definir prioridades del proyecto:**
   - ¿Es más importante velocidad de desarrollo o modularidad futura?
   - ¿Se requiere pantalla integrada?
   - ¿Cuál es el presupuesto definitivo?

2. **Validar disponibilidad:**
   - Verificar stock actual en distribuidores para Chile
   - Confirmar tiempos de envío
   - Validar costos de envío internacional

3. **Comprar kit recomendado:**
   - Hacer pedido con anticipación (2-4 semanas típico)
   - Considerar comprar 2 unidades para tener respaldo

4. **Preparar entorno de desarrollo:**
   - Instalar Arduino IDE / PlatformIO
   - Configurar librerías necesarias
   - Revisar ejemplos de código

5. **Fase de experimentación:**
   - Validar lecturas QR en diferentes condiciones
   - Medir latencias de comunicación
   - Probar alcance Wi-Fi
   - Desarrollar lógica de validación server-side

## Archivos detallados

### Dispositivos Comerciales
- [M5Stack ATOM QR-CODE Kit](comerciales/m5stack-atom-qr.md) ⭐ Recomendado
- [ScanGenie ESP32-S3](comerciales/scangenie.md) ⭐ Alternativa con pantalla
- [RAK WisBlock Modular](comerciales/rak-wisblock.md) ⭐ Máxima escalabilidad
- [Netum W8 WiFi Scanner](comerciales/netum-w8.md) - Solo MVP rápido
- [RTscan RTX200 OEM Module](comerciales/rtscan-rtx200.md) - Solo aplicaciones industriales

### Soluciones DIY
_(Pendiente)_ - Opciones construidas desde componentes básicos (ESP32-CAM, módulos UART, etc.)

---

**Última actualización:** Diciembre 2025
**Estado:** Fase de investigación y selección de hardware
