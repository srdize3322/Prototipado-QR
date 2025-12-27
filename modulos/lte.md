# LTE/Celular - Conectividad Móvil

## Cuándo Usar
✅ Dispositivos móviles sin Wi-Fi  
⚠️ Requiere: Plan datos mensual, SIM card, antena externa

---

## Opciones

| Módulo | Precio | Interface | Consumo | Recomendación |
|--------|--------|-----------|---------|---------------|
| **SIM7600 (4G)** | $25-35 | UART | 2A peak | RPi con cuidado |
| **USB 4G Dongle** | $30-50 | USB | 500mA | ⭐ RPi/OPi (fácil) |
| **SIM7070G (NB-IoT)** | $15-20 | UART | 500mA | Bajo consumo IoT |

---

## Configuración por Plataforma

### Raspberry Pi / Orange Pi: ⭐ Recomendado
**USB 4G Dongle:**
- Plug & play
- NetworkManager automático
- Ejemplos: Huawei E3372, ZTE MF823
- Costo: $30-50
- **Más simple que UART**

### ESP32: ⚠️ Complejo
**SIM7600 UART:**
- Requiere fuente 5V/3A externa
- Buck converter 3.8V dedicado
- Comandos AT manuales
- Cableado: TX→GPIO4, RX→GPIO2, PWRKEY→GPIO5
- **No recomendado para MVP**

---

## Costos Reales

| Config | HW | Datos/mes | Total Mensual |
|--------|----|-----------|--------------
|--------|
| **RPi + Dongle** | $80 | $5-15 | $85-95 primer mes |
| **ESP32 + SIM7600** | $95 | $5-15 | $100-110 primer mes |

**Estimación consumo:** ~2KB por scan → 1000 scans = 2MB/mes

---

## Recomendación

### Para MVP:
❌ **No incluir LTE** - Wi-Fi suficiente para prototipo

### Para producción móvil:
➡️ **RPi + USB 4G Dongle** - Más simple y estable

### Evitar:
❌ SIM800L (2G obsoleto)  
❌ SIM7600 + ESP32 para MVP (muy complejo)
