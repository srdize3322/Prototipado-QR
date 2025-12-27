# 🥇 Raspberry Pi Zero 2W - **TOP CHOICE**

## Specs Clave
- **SoC:** Quad-core ARM Cortex-A53 @ 1GHz
- **RAM:** 512MB
- **Wi-Fi:** 2.4GHz b/g/n (5GHz NO)
- **GPIO:** 40 pines
- **USB:** 1× Micro USB OTG (⭐ USB Host)
- **Precio:** **$20** + SD ($10) = **$30 total**
- **Consumo:** ~300-500mA (1.5-2.5W)

---

## Por Qué es #1

✅ **USB Host:** Conecta múltiples periféricos (QR + LTE + GPS USB)  
✅ **Sin límites UART:** No hay conflictos de pines  
✅ **Linux completo:** Python, Node.js, drivers disponibles  
✅ **Precio:** $20 (más barato que pensábamos)  
✅ **Desarrollo rápido:** SSH, apt, npm, pip

---

## Limitaciones

⚠️ **Wi-Fi:** Solo 2.4GHz (suficiente para IoT)  
⚠️ **Consumo:** Mayor que ESP32 (~2W vs 0.5W)  
⚠️ **Boot:** 20-40s (vs 2s ESP32)  

---

## Configuración con Módulos

| Módulos | Conexión | Costo Total |
|---------|----------|-------------|
| **QR USB** | USB | $50 |
| **QR + GPS USB** | Hub USB | $75 |
| **QR + LTE** | Hub USB | $80 |

---

## Cuándo Usar

✅ Necesitas 2+ periféricos USB  
✅ Lógica compleja (base de datos local, caching)  
✅ Desarrollo rápido (prototipo)

---

## Cuándo NO Usar

❌ Consumo crítico (batería)  
❌ Presupuesto mínimo ($20 vs $8 ESP32)  
❌ Boot rápido requerido

## vs ESP32

| Aspecto | ESP32 | RPi Zero 2W |
|---------|-------|-------------|
| **Precio** | $8 | $30-40 |
| **Consumo** | 160-260 mA | 500-600 mA |
| **Boot** | <1s | ~20s |
| **OS** | Firmware | Linux completo |
| **USB** | Via bridge | Nativo |
| **Flexibilidad SW** | C/Python | **Cualquier lenguaje** |
| **GPIO** | 30+ | 40 |

## Cuándo Usar RPi Zero 2W

### ✅ Elegir RPi si:
- Necesitas **múltiples procesos** simultáneos
- **USB dongles** (4G, GPS) más simples que UART
- Desarrollo en **Python/Node.js** preferido
- Requieres **Linux tooling** completo (apt, systemd, etc.)
- **Prototipado rápido** > optimización consumo

### ⚠️ Evitar RPi si:
- Presupuesto <$60
- Batería crítica (consumo alto)
- MVP simple (ESP32 suficiente)

## Librerías Python Típicas

- **QR USB:** `evdev` para lectura directa desde dispositivo input
- **HTTP:** `requests` para POST al servidor
- **GPIO:** `gpiozero` para control LEDs/sensores
- **GPS:** `gpsd-py3` para integración gpsd daemon

## Recomendación
**Opción premium** cuando flexibilidad Linux justifica el costo extra. Ideal para prototipos que evolucionarán a aplicaciones complejas (web servers, databases, computer vision). Para MVP económico, ESP32 es mejor balance costo/capacidad.
