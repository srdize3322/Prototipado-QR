# LTE/Celular - Conectividad Móvil

## Cuándo Usar LTE

✅ **Usar si:**
- Sin cobertura Wi-Fi confiable
- Dispositivos móviles en vehículos
- Backup de conectividad crítico

⚠️ **Consideraciones:**
- Costo mensual (plan datos)
- Mayor consumo energía
- Requiere SIM card
- Antena externa recomendada

---

## Opciones Disponibles

| Módulo | Bandas | Interface | Precio | Consumo | GPS | Notas |
|--------|--------|-----------|--------|---------|-----|-------|
| **SIM800L** | 2G GSM | UART | $8-12 | 2A peak | ❌ | 2G obsoleto, evitar |
| **SIM7600** | 4G LTE | UART | $25-35 | 2A peak | ✅ | Recomendado |
| **SIM7070G** | LTE Cat-M1/NB-IoT | UART | $15-20 | 500mA | ✅ | Bajo consumo IoT |
| **A9G** | 2G GSM | UART | $10-15 | 1A | ✅ | GPS integrado, 2G |

---

## Recomendado: SIM7600 (LTE 4G)

### Specs:
- **Precio:** $25-35 (módulo), $40-50 (breakout con reguladores)
- **Bandas:** LTE Cat-1 (B1/B3/B5/B7/B8/B20/B28)
- **Interface:** UART (115200 baud), comandos AT
- **Voltaje:** 3.4-4.2V (requiere fuente dedicada)
- **Consumo:** 
  - Sleep: <1 mA
  - Idle: ~20 mA
  - Transmisión: **2A peak**
- **GPS:** Integrado (ventaja)
- **Antena:** Externa requerida (LTE + GPS)

### Compatibilidad:

| Plataforma | Compatible | Notas |
|------------|-----------|-------|
| ESP32 | ⚠️ **Con fuente externa** | ESP32 no puede suministrar 2A, requiere buck 4V/3A externo |
| Orange Pi | ✅ USB 4G dongle mejor | Usar dongle USB LTE más simple |
| RPi Zero 2W | ✅ USB 4G dongle mejor | Igual OPi |
| Arduino MKR | ❌ | Usar MKR GSM 1400 ($75) |

---

## Integración con ESP32 (Complejo)

### Circuitería requerida:
```
Fuente 5V/3A → Buck Converter (3.8V/3A) → SIM7600
                     ↓
              ESP32 (alimentado separado 5V/1A)
```

### Cableado UART:
```
SIM7600         ESP32
────────────────────────
TXD          → GPIO4 (RX software serial)
RXD          → GPIO2 (TX software serial)
PWRKEY       → GPIO5 (control encendido)
```

**Control:** Usar comandos AT para iniciar conexión HTTP y enviar datos JSON.

---

## Alternativa: USB 4G Dongle (Linux)

### Para RPi/Orange Pi:
- **Precio:** $30-50
- **Ventaja:** Plug & play, reconocido como interfaz red
- **Desventaja:** Ocupa USB, no funciona en ESP32
- **Ejemplos:** Huawei E3372, ZTE MF823
- **Configuración:** Automático en Raspberry Pi OS/NetworkManager

---

## Alternativa IoT: SIM7070G (Cat-M1/NB-IoT)

### Ventajas:
- ✅ Menor consumo (~500 mA max)
- ✅ Diseñado para IoT
- ✅ GPS integrado
- ⚠️ Requiere cobertura Cat-M1/NB-IoT operador

### Uso:
- Telemetría baja frecuencia
- Envíos cada 5-15 minutos
- Ideal para batería

---

## Configuraciones y Costos

| Config | Módulo | Plataforma | Costo HW | Costo Mensual | Complejidad |
|--------|--------|------------|----------|---------------|-------------|
| **MVP sin LTE** | - | ESP32 | $45 | $0 | ⭐ |
| **ESP32 + LTE** | SIM7600 | ESP32 | $90-100 | $5-15 | ⭐⭐⭐⭐ |
| **Linux + Dongle** | USB 4G | RPi/OPi | $80-100 | $5-15 | ⭐⭐ |
| **IoT optimizado** | SIM7070G | ESP32 | $70-80 | $3-10 | ⭐⭐⭐ |

---

## Plan de Datos

### Estimación consumo:
- Por scan: ~2 KB (JSON + headers HTTP)
- 1000 scans/mes: ~2 MB
- Plan recomendado: 50-100 MB/mes

### Operadores Chile:
- Entel IoT: Desde $5/mes
- Movistar M2M: Desde $8/mes
- Claro: Planes prepago

---

## Recomendación Final

### Para MVP:
❌ **No incluir LTE** - Añade complejidad y costo innecesario
➡️ Usar Wi-Fi, suficiente para prototipo

### Para producción con movilidad:
➡️ **USB 4G Dongle + RPi** (más simple)
➡️ **SIM7070G + ESP32** (si optimización batería crítica)

### Evitar:
❌ SIM800L (2G obsoleto)
❌ SIM7600 + ESP32 para MVP (muy complejo)

### Escalabilidad:
1. **Fase 1:** ESP32 + Wi-Fi ($45)
2. **Fase 2:** +GPS si necesario ($60)
3. **Fase 3:** +LTE si movilidad requerida ($90-100)
