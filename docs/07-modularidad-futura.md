# Modularidad Futura

## Visión de Expansión

El diseño modular permite agregar funcionalidades adicionales sin rediseñar completamente el sistema base. Las tres expansiones principales consideradas son:

1. **Conectividad LTE** (comunicación celular)
2. **GPS** (geolocalización)
3. **Batería** (operación autónoma)

---

## 1. Módulo LTE (Comunicación Celular)

### Casos de Uso
- Ubicaciones sin infraestructura Wi-Fi
- Dispositivos móviles o vehículos
- Backup de conectividad
- Cobertura en exteriores

### Opciones de Hardware

#### Opción A: Módulo SIM800/SIM7600
**Especificaciones:**
- Interfaz: UART/I2C
- Redes: 2G/4G LTE
- Consumo: 100-500mA (transmisión)
- Costo: $15-30 USD

**Ventajas:**
- ✅ Fácil integración con ESP32/Arduino
- ✅ Librerías disponibles
- ✅ Costo moderado

**Desventajas:**
- ❌ Consumo energético significativo
- ❌ Requiere SIM card y plan de datos
- ❌ Complejidad adicional de firmware

#### Opción B: Raspberry Pi con USB Modem
**Especificaciones:**
- Interfaz: USB
- Compatibilidad: Amplia con módems 4G
- Costo: $20-50 USD (modem)

**Ventajas:**
- ✅ Configuración estándar Linux
- ✅ Mayor velocidad de datos
- ✅ Soporte de múltiples operadores

**Desventajas:**
- ❌ Mayor consumo
- ❌ Espacio adicional requerido

#### Opción C: Módulo LTE Integrado (Cellular IoT)
**Ejemplos:**
- Particle Boron (LTE + MCU)
- Arduino MKR NB 1500
- Hologram Nova

**Ventajas:**
- ✅ Todo en uno
- ✅ Optimizado para IoT
- ✅ Planes de datos IoT

**Desventajas:**
- ❌ Costo más elevado ($50-100 USD)
- ❌ Lock-in con proveedor específico

### Costos de Operación LTE

| Plan | Datos/mes | Costo/mes | Ideal para |
|------|-----------|-----------|------------|
| **IoT Básico** | 1-5MB | $2-5 | Eventos esporádicos |
| **IoT Estándar** | 10-50MB | $5-10 | Uso regular |
| **IoT Premium** | 100-500MB | $10-20 | Uso intensivo o imágenes |

**Estimado de consumo:**
- Evento QR (JSON): ~1KB
- 1000 eventos/mes: ~1MB
- Con overhead y reconexiones: ~3-5MB/mes

### Arquitectura con LTE

```
┌──────────────────────────────────────┐
│         Módulo Lector QR             │
│  ┌──────────┐    ┌──────────┐       │
│  │  Wi-Fi   │    │   LTE    │       │
│  │  Module  │    │  Module  │       │
│  └────┬─────┘    └────┬─────┘       │
│       │               │              │
│       └───────┬───────┘              │
│               │                      │
│         ┌─────▼──────┐               │
│         │ Selector   │               │
│         │ Conectiv.  │               │
│         └────────────┘               │
└──────────────────────────────────────┘
```

### Lógica de Selección de Conectividad

```python
class ConnectivityManager:
    def __init__(self):
        self.wifi = WiFiModule()
        self.lte = LTEModule()
        self.preferred = "wifi"  # wifi o lte
    
    def send_data(self, payload):
        # Intentar Wi-Fi primero (si es preferido)
        if self.preferred == "wifi" and self.wifi.is_connected():
            try:
                return self.wifi.send(payload)
            except Exception as e:
                logger.warning(f"Wi-Fi falló: {e}")
        
        # Fallback a LTE
        if self.lte.is_available():
            return self.lte.send(payload)
        
        # Si ambos fallan, encolar para reintento
        self.queue.add(payload)
        return False
```

### Recomendación LTE
**Para Prototipo:** SIM7600 + ESP32 (costo total: ~$50)
**Para Producción:** Módulo integrado como Particle Boron (~$75) con plan IoT

---

## 2. Módulo GPS (Geolocalización)

### Casos de Uso
- Trazabilidad de ubicación
- Dispositivos móviles
- Control de asistencia con verificación de ubicación
- Análisis de movilidad
- Anti-fraude (verificar ubicación esperada)

### Opciones de Hardware

#### Opción A: Módulo GPS UART (NEO-6M/NEO-7M)
**Especificaciones:**
- Interfaz: UART
- Precisión: 2.5m CEP
- Tiempo de fix: 30-60s (cold start)
- Consumo: 45mA
- Costo: $8-15 USD

**Ventajas:**
- ✅ Económico
- ✅ Fácil integración
- ✅ Bajo consumo
- ✅ Ampliamente soportado

**Desventajas:**
- ❌ Precisión limitada
- ❌ Requiere antena externa para mejor señal
- ❌ Lento en cold start

#### Opción B: GPS de Alta Precisión (NEO-M8/M9)
**Especificaciones:**
- Precisión: <1m con DGPS
- Tiempo de fix: <10s
- Multi-GNSS (GPS, GLONASS, Galileo, BeiDou)
- Costo: $20-35 USD

**Ventajas:**
- ✅ Mayor precisión
- ✅ Fix más rápido
- ✅ Mejor en interiores

**Desventajas:**
- ❌ Costo más elevado
- ❌ Consumo mayor

#### Opción C: GPS Integrado en módulo LTE
Muchos módulos LTE incluyen GPS/GNSS integrado.

**Ventajas:**
- ✅ Reduce componentes
- ✅ Un solo módulo para ambas funciones
- ✅ Simplifica firmware

**Desventajas:**
- ❌ Costo combinado más alto

### Integración GPS

```python
class GPSModule:
    def __init__(self, uart_port):
        self.serial = serial.Serial(uart_port, 9600)
        self.parser = pynmea2
    
    def get_location(self, timeout=60):
        """Obtener coordenadas GPS con timeout"""
        start_time = time.time()
        
        while (time.time() - start_time) < timeout:
            line = self.serial.readline().decode('ascii', errors='ignore')
            
            if line.startswith('$GPGGA'):
                msg = pynmea2.parse(line)
                if msg.gps_qual > 0:  # Fix válido
                    return {
                        'lat': msg.latitude,
                        'lon': msg.longitude,
                        'alt': msg.altitude,
                        'satellites': msg.num_sats,
                        'timestamp': time.time()
                    }
        
        return None  # No se obtuvo fix en el tiempo
```

### Formato de Datos con GPS

```json
{
  "type": "qr_scan",
  "device_id": "TOTEM_001",
  "timestamp": 1705320600,
  "data": {
    "qr_code": "https://ejemplo.com/ticket/ABC123"
  },
  "location": {
    "lat": -34.603722,
    "lon": -58.381592,
    "accuracy_m": 2.5,
    "altitude_m": 25.0,
    "satellites": 8,
    "timestamp": 1705320595
  }
}
```

### Consideraciones GPS

1. **Consumo Energético**: GPS puede consumir 45-100mA continuo
2. **Tiempo de Fix**: Planear 30-60s para obtener ubicación
3. **Cobertura**: No funciona en interiores sin señal
4. **Privacidad**: Considerar regulaciones de datos de ubicación

### Optimización de Batería con GPS

```python
# Activar GPS solo cuando sea necesario
def scan_qr_with_location():
    # Activar GPS
    gps.power_on()
    
    # Mientras GPS obtiene fix, escanear QR
    qr_code = scan_qr_code()
    
    # Obtener ubicación (con timeout)
    location = gps.get_location(timeout=30)
    
    # Apagar GPS para ahorrar batería
    gps.power_off()
    
    # Enviar datos
    send_to_server(qr_code, location)
```

### Recomendación GPS
**Para Prototipo:** NEO-6M (~$10)
**Para Producción:** NEO-M8 (~$25) o GPS integrado en módulo LTE

---

## 3. Módulo Batería (Operación Autónoma)

### Casos de Uso
- Instalaciones temporales
- Ubicaciones sin acceso a electricidad
- Dispositivos móviles
- Backup de energía

### Diseño de Sistema de Batería

#### Componentes Necesarios

1. **Batería LiPo/Li-Ion**
2. **Controlador de carga** (TP4056, MCP73831)
3. **Regulador de voltaje** (LDO o buck converter)
4. **Protección de batería** (BMS)
5. **Medición de batería** (INA219, resistor divider)

### Opciones de Batería

#### Opción A: Batería 18650 Li-Ion
**Especificaciones:**
- Capacidad: 2000-3500mAh
- Voltaje: 3.7V nominal
- Ciclos: 300-500
- Costo: $3-8 USD por celda

**Ventajas:**
- ✅ Alta densidad energética
- ✅ Económica
- ✅ Fácil reemplazo

**Desventajas:**
- ❌ Requiere holder y protección
- ❌ Volumen considerable

#### Opción B: Batería LiPo
**Especificaciones:**
- Capacidad: 1000-10000mAh
- Voltaje: 3.7V (1S) o 7.4V (2S)
- Forma: Flexible
- Costo: $10-40 USD

**Ventajas:**
- ✅ Factor de forma flexible
- ✅ Alta corriente de descarga
- ✅ Menor peso por capacidad

**Desventajas:**
- ❌ Más delicada (inflado)
- ❌ Requiere cuidado en carga
- ❌ Costo más elevado

#### Opción C: Power Bank Commercial
**Ventajas:**
- ✅ Protección integrada
- ✅ USB output estándar
- ✅ Indicador de carga

**Desventajas:**
- ❌ Menos integración
- ❌ Puede apagarse con bajo consumo

### Cálculo de Autonomía

#### Ejemplo: ESP32 + Módulo GM65

**Consumo por Estado:**
- Standby: 80mA
- Lectura QR: 150mA × 2s
- Transmisión Wi-Fi: 200mA × 1s
- Deep Sleep: 0.15mA

**Ciclo Típico (lectura cada 30s):**
```
Deep Sleep: 27s × 0.15mA = 4.05mA·s
Standby: 1s × 80mA = 80mA·s
Lectura: 2s × 150mA = 300mA·s
Total por ciclo (30s): 384.05mA·s
```

**Promedio:** 384.05mA·s / 30s = **12.8mA**

**Autonomía con batería 2500mAh:**
2500mAh / 12.8mA = **195 horas ≈ 8 días**

### Optimización de Consumo

```cpp
// ESP32 con gestión de energía
void loop() {
    // Despertar
    if (debe_escanear()) {
        // Encender módulo QR
        pinMode(QR_POWER_PIN, OUTPUT);
        digitalWrite(QR_POWER_PIN, HIGH);
        delay(500);  // Esperar estabilización
        
        // Escanear
        String qr = leerQR();
        
        // Conectar Wi-Fi solo si es necesario
        if (qr.length() > 0) {
            WiFi.mode(WIFI_STA);
            conectarWiFi();
            enviarDatos(qr);
            WiFi.disconnect();
            WiFi.mode(WIFI_OFF);
        }
        
        // Apagar módulo QR
        digitalWrite(QR_POWER_PIN, LOW);
    }
    
    // Dormir hasta próxima lectura
    esp_sleep_enable_timer_wakeup(30 * 1000000);  // 30s
    esp_deep_sleep_start();
}
```

### Sistema de Carga

#### Carga Solar (Opcional)
Para instalaciones permanentes en exterior:

**Componentes:**
- Panel solar: 5-10W ($10-25 USD)
- Controlador de carga solar: MPPT ($5-15 USD)
- Batería: 5000-10000mAh

**Cálculo:**
- Consumo diario: 12.8mA × 24h = 307mAh
- Panel 5W / 5V = 1A
- 4 horas sol efectivo = 4Ah generado
- **Surplus suficiente para operación continua**

### Esquema de Sistema con Batería

```
Panel Solar (Opcional)
       │
       ▼
┌──────────────┐
│ Controlador  │
│  de Carga    │◄──── USB (Carga)
└──────┬───────┘
       │
       ▼
┌──────────────┐
│   Batería    │
│   LiPo/Ion   │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│  BMS +       │
│  Regulador   │──── 5V/3.3V
└──────┬───────┘
       │
       ▼
  ┌────────┐
  │  ESP32 │
  │   +    │
  │ Módulo │
  │   QR   │
  └────────┘
```

### Monitoreo de Batería

```python
class BatteryMonitor:
    def __init__(self, adc_pin):
        self.adc = ADC(Pin(adc_pin))
        self.adc.atten(ADC.ATTN_11DB)  # Rango 0-3.6V
    
    def get_voltage(self):
        # Leer ADC con voltage divider (2:1)
        raw = self.adc.read()
        voltage = (raw / 4095.0) * 3.6 * 2
        return voltage
    
    def get_percentage(self):
        voltage = self.get_voltage()
        # LiPo: 4.2V = 100%, 3.0V = 0%
        percentage = ((voltage - 3.0) / 1.2) * 100
        return max(0, min(100, percentage))
    
    def needs_charging(self):
        return self.get_percentage() < 20
```

### Costos del Sistema con Batería

| Componente | Costo (USD) |
|------------|-------------|
| Batería 2500mAh | $8 |
| Controlador de carga | $3 |
| BMS | $2 |
| Regulador | $2 |
| Conectores | $1 |
| **Total** | **$16** |

**Con Solar:**
- Agregar panel 5W: +$15
- Controlador MPPT: +$8
- **Total con solar: ~$39**

### Recomendación Batería
**Para Prototipo:** Batería 18650 + TP4056 (~$11)
**Para Producción:** LiPo custom + BMS integrado (~$20)
**Para Exterior Permanente:** Sistema solar completo (~$55)

---

## Configuración Modular Completa

### Configuración Final Sugerida

**Hardware Base:**
- ESP32 DevKit: $8
- Módulo QR GM65: $22
- LEDs: $2
- Carcasa: $5
- **Subtotal base: $37**

**Módulos Opcionales:**
- LTE (SIM7600): +$25
- GPS (NEO-M8): +$25
- Batería (LiPo 5000mAh): +$20
- Solar (5W): +$23

**Configuraciones Típicas:**

| Configuración | Componentes | Costo Total |
|---------------|-------------|-------------|
| **Básica** | Base + Wi-Fi | $37 |
| **Móvil** | Base + LTE + GPS + Batería | $107 |
| **Autónoma** | Base + Batería + Solar | $80 |
| **Completa** | Base + LTE + GPS + Batería + Solar | $130 |

### Diseño de PCB Modular

Para producción, considerar PCB con:
- Headers para módulos opcionales
- Switches para habilitar/deshabilitar módulos
- Pads de soldadura para personalización
- Conector de batería estándar (JST)
- Puerto USB-C para carga

---

## Conclusiones de Modularidad

El diseño propuesto permite:

1. ✅ **Comenzar simple**: Solo Wi-Fi y lectura QR
2. ✅ **Agregar según necesidad**: LTE, GPS, batería
3. ✅ **Mantener compatibilidad**: Firmware modular
4. ✅ **Optimizar costos**: Pagar solo por lo necesario
5. ✅ **Escalar gradualmente**: De prototipo a producción

**Inversión recomendada:**
- Fase 1 (POC): Base + Wi-Fi ($37)
- Fase 2 (Piloto): + Batería ($57)
- Fase 3 (Producción): + LTE + GPS según casos de uso ($82-107)
