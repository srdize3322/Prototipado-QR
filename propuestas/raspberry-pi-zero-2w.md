# Raspberry Pi Zero 2W - SBC Linux

## Specs
- **CPU:** Quad-core Cortex-A53 1 GHz (BCM2710A1) | **RAM:** 512 MB
- **Wi-Fi:** 2.4/5 GHz dual-band integrado | **BT:** 4.2 BLE
- **Interfaces:** 1 USB 2.0 (micro), 40-pin GPIO, UART, SPI, I2C
- **Video:** Mini-HDMI, CSI camera connector
- **Consumo:** ~500-600 mA activo (2.5-3W)
- **OS:** Raspberry Pi OS, Ubuntu, Armbian
- **Almacenamiento:** microSD (no integrado)

## Compatibilidad Módulos

| Módulo | Compatible | Notas |
|--------|-----------|-------|
| **QR UART** | ✅ | UART GPIO + Python serial |
| **QR USB** | ✅ | **Plug & play** via libusb/evdev |
| **GPS UART/USB** | ✅ | gpsd daemon gestiona todo |
| **LTE USB** | ✅ | **Dongle 4G mejor opción Linux** |
| **LEDs/OLED** | ✅ | GPIO + Python libraries (gpiozero) |
| **Batería** | ⚠️ | UPS HAT externo ($15-20) |

## Expansión Futura
- **USB Hub:** Requerido para múltiples USB (solo 1 puerto)
- **GPIO:** 40 pines, bien documentado
- **HATs:** Ecosistema grande (alimentación, sensores, displays)
- **Software:** Linux completo = máxima flexibilidad

## Configuraciones Típicas

| Config | Componentes | Costo | Uso |
|--------|-------------|-------|-----|
| **UART Básico** | RPi + QR UART + SD 16GB | ~$70 | Python simple |
| **USB Simple** | RPi + QR USB + Fuente 3A | ~$75 | Plug & play |
| **+GPS USB** | Anterior + GPS USB | ~$90 | gpsd automático |
| **+LTE Dongle** | Anterior + 4G USB + Hub | ~$120 | Celular managed |

## Costo & Disponibilidad
- **Placa:** $30-40 (⚠️ Disponibilidad variable)
- **Fuente 5V/2.5A oficial:** $8-10
- **SD 16GB:** $8-10
- **Carcasa:** $5-8 (opcional)
- **Total MVP:** ~$70-80
- **Stock:** ⚠️ Moderado (escasez recurrente)

## Pros/Contras
✅ Linux completo | Dual-band Wi-Fi | USB dongles fáciles | Python/Node/Go | HAT ecosystem | GPIO 40 pines | Comunidad enorme
⚠️ Mayor consumo que ESP32 (~5x) | Precio alto | Requiere SD | Boot lento (~20s) | Disponibilidad irregular

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

## Configuración Python Típica

### Lector QR USB:
```python
import evdev

device = evdev.InputDevice('/dev/input/event0')
for event in device.read_loop():
    if event.type == evdev.ecodes.EV_KEY:
        print(f"QR: {event}")
```

### HTTP POST:
```python
import requests

data = {
    "device_id": "RPI-001",
    "qr_value": "https://example.com/item/123"
}

response = requests.post("https://servidor.com/api/scan", json=data)
print(response.json())
```

## Recomendación
**Opción premium** cuando flexibilidad Linux justifica el costo extra. Ideal para prototipos que evolucionarán a aplicaciones complejas (web servers, databases, computer vision). Para MVP económico, ESP32 es mejor balance costo/capacidad.
