# Arquitectura del Sistema

## Arquitectura General

```
┌─────────────────────────────────────────────────────────────┐
│                      MÓDULO LECTOR QR                        │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   Lector QR  │→ │   MCU/SBC    │→ │  Wi-Fi       │      │
│  │  (Cámara o   │  │  (ESP32 o    │  │  Module      │      │
│  │   Módulo)    │  │   Rpi)       │  │              │      │
│  └──────────────┘  └──────┬───────┘  └──────────────┘      │
│                            │                                 │
│                     ┌──────▼───────┐                        │
│                     │  Sistema de  │                        │
│                     │    LEDs      │                        │
│                     └──────────────┘                        │
└─────────────────────────────────────────────────────────────┘
                               │
                               │ Wi-Fi / Internet
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                       SERVIDOR BACKEND                       │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │  API Gateway │→ │  Lógica de   │→ │   Base de    │      │
│  │  (REST/MQTT) │  │  Negocio     │  │   Datos      │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
```

## Componentes del Módulo Lector

### 1. Hardware de Lectura QR

**Opciones:**
- Cámara USB + Software
- Raspberry Pi Camera Module
- ESP32-CAM
- Módulo QR dedicado (GM65/GM67)

**Responsabilidades:**
- Capturar imagen / escanear código
- Decodificar información QR
- Entregar dato al procesador principal

---

### 2. Unidad de Procesamiento (MCU/SBC)

**Opciones:**
- Raspberry Pi (Zero 2W, 3B+, 4)
- ESP32
- Arduino MKR WiFi

**Responsabilidades:**
- Control del lector QR
- Gestión de conectividad Wi-Fi
- Comunicación con servidor
- Control de LEDs de estado
- Manejo de errores y reintentos
- Almacenamiento temporal (cola de eventos)

---

### 3. Sistema de Retroalimentación (LEDs)

**Estados Visuales:**

| Estado | LED | Patrón | Significado |
|--------|-----|--------|-------------|
| **Listo** | Verde | Fijo | Esperando lectura |
| **Leyendo** | Azul | Parpadeando rápido | Procesando QR |
| **Éxito** | Verde | Parpadeo 3x | Lectura exitosa y enviada |
| **Error Lectura** | Amarillo | Parpadeo 2x | QR no válido o no legible |
| **Error Conexión** | Rojo | Parpadeo lento | Sin conexión a servidor |
| **Error Crítico** | Rojo | Fijo | Falla de sistema |

**Implementación Básica:**
```python
class LEDController:
    def __init__(self, pin_verde, pin_amarillo, pin_rojo, pin_azul):
        self.verde = LED(pin_verde)
        self.amarillo = LED(pin_amarillo)
        self.rojo = LED(pin_rojo)
        self.azul = LED(pin_azul)
    
    def estado_listo(self):
        self.apagar_todos()
        self.verde.on()
    
    def estado_leyendo(self):
        self.apagar_todos()
        self.azul.blink(on_time=0.1, off_time=0.1)
    
    def estado_exito(self):
        self.apagar_todos()
        for _ in range(3):
            self.verde.on()
            time.sleep(0.2)
            self.verde.off()
            time.sleep(0.2)
        self.estado_listo()
```

---

### 4. Conectividad Wi-Fi

**Consideraciones:**
- Reconexión automática
- Manejo de credenciales (WPA2)
- Modo AP para configuración inicial
- Indicador de calidad de señal

**Configuración Inicial (Modo AP):**
```
Dispositivo crea red Wi-Fi: "QR-TOTEM-XXXX"
Usuario se conecta y configura:
  - SSID de red principal
  - Contraseña
  - URL del servidor
  - ID del dispositivo
```

---

## Flujo de Operación Principal

```
┌─────────────┐
│   Inicio    │
└──────┬──────┘
       │
       ▼
┌─────────────────┐
│ Conectar Wi-Fi  │
└──────┬──────────┘
       │
       ▼
┌─────────────────┐
│ LED: Listo      │◄─────────────┐
└──────┬──────────┘              │
       │                         │
       ▼                         │
┌─────────────────┐              │
│ Esperar QR      │              │
└──────┬──────────┘              │
       │                         │
       ▼                         │
┌─────────────────┐              │
│ QR Detectado    │              │
└──────┬──────────┘              │
       │                         │
       ▼                         │
┌─────────────────┐              │
│ LED: Leyendo    │              │
└──────┬──────────┘              │
       │                         │
       ▼                         │
┌─────────────────┐              │
│ Decodificar QR  │              │
└──────┬──────────┘              │
       │                         │
       ▼                         │
    ¿Válido? ──No──┐             │
       │           │             │
      Sí           ▼             │
       │    ┌─────────────────┐  │
       │    │ LED: Error      │  │
       │    │     Lectura     │  │
       │    └────────┬────────┘  │
       │             └────────────┘
       ▼
┌─────────────────┐
│ Enviar a        │
│ Servidor        │
└──────┬──────────┘
       │
       ▼
    ¿Éxito? ──No──┐
       │          │
      Sí          ▼
       │   ┌─────────────────┐
       │   │ Guardar en Cola │
       │   │ (Reintento)     │
       │   └────────┬────────┘
       │            │
       ▼            │
┌─────────────────┐ │
│ LED: Éxito      │ │
└──────┬──────────┘ │
       │            │
       └────────────┴────────────┘
```

---

## Arquitectura del Backend

### Componentes del Servidor

#### 1. API Gateway
**Funciones:**
- Recibir eventos de lecturas QR
- Autenticar dispositivos
- Rate limiting
- Enrutamiento de mensajes

**Tecnologías Sugeridas:**
- Node.js + Express
- Python + FastAPI
- Go + Gin

#### 2. Broker MQTT (Opcional)
**Funciones:**
- Recibir mensajes pub/sub
- Gestionar suscripciones
- QoS management

**Opciones:**
- Mosquitto (open source)
- HiveMQ
- AWS IoT Core
- Azure IoT Hub

#### 3. Lógica de Negocio
**Funciones:**
- Validar códigos QR
- Aplicar reglas de negocio
- Registrar eventos
- Enviar respuestas a dispositivos

#### 4. Base de Datos
**Opciones:**

**SQL (PostgreSQL, MySQL):**
```sql
CREATE TABLE lecturas_qr (
    id SERIAL PRIMARY KEY,
    dispositivo_id VARCHAR(50) NOT NULL,
    codigo_qr TEXT NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    resultado VARCHAR(20),
    metadata JSONB
);

CREATE INDEX idx_dispositivo ON lecturas_qr(dispositivo_id);
CREATE INDEX idx_timestamp ON lecturas_qr(timestamp);
```

**NoSQL (MongoDB):**
```javascript
{
  "_id": ObjectId("..."),
  "dispositivo_id": "TOTEM_001",
  "codigo_qr": "https://...",
  "timestamp": ISODate("2024-01-15T10:30:00Z"),
  "resultado": "valido",
  "metadata": {
    "latencia_ms": 45,
    "rssi": -67,
    "intentos": 1
  }
}
```

---

## Protocolo de Comunicación

### Formato de Mensaje (JSON)

#### Dispositivo → Servidor
```json
{
  "type": "qr_scan",
  "device_id": "TOTEM_001",
  "timestamp": 1705320600,
  "data": {
    "qr_code": "https://ejemplo.com/ticket/ABC123",
    "scan_duration_ms": 120,
    "signal_strength": -65
  },
  "metadata": {
    "firmware_version": "1.2.3",
    "uptime_seconds": 86400
  }
}
```

#### Servidor → Dispositivo
```json
{
  "type": "scan_result",
  "request_id": "req_12345",
  "status": "success",
  "message": "Acceso autorizado",
  "led_action": "success",
  "data": {
    "user_name": "Juan Pérez",
    "valid_until": 1705407000
  }
}
```

---

## Consideraciones de Seguridad

### Nivel de Dispositivo
1. **Autenticación**: Token único por dispositivo
2. **Encriptación**: TLS/SSL para todas las comunicaciones
3. **Firma de Mensajes**: HMAC para integridad
4. **Actualización OTA**: Firmware updates seguros

### Nivel de Servidor
1. **Rate Limiting**: Máximo X requests por minuto
2. **Validación de Entrada**: Sanitizar todos los datos
3. **Logs de Auditoría**: Registrar todas las transacciones
4. **Backup**: Respaldos automáticos de BD

---

## Escalabilidad

### Arquitectura para Crecimiento

```
┌────────────────────────────────────────────┐
│          Load Balancer / CDN               │
└─────────────┬──────────────────────────────┘
              │
     ┌────────┴────────┐
     ▼                 ▼
┌─────────┐      ┌─────────┐
│ API     │      │ API     │
│ Server 1│      │ Server 2│
└────┬────┘      └────┬────┘
     │                │
     └────────┬───────┘
              ▼
     ┌──────────────┐
     │  Message     │
     │  Queue       │
     │  (RabbitMQ)  │
     └──────┬───────┘
            │
     ┌──────┴───────┐
     ▼              ▼
┌─────────┐    ┌─────────┐
│Worker 1 │    │Worker 2 │
└────┬────┘    └────┬────┘
     │              │
     └──────┬───────┘
            ▼
     ┌─────────────┐
     │  Database   │
     │  Cluster    │
     └─────────────┘
```

### Capacidad Estimada

| Componente | 1-10 dispositivos | 10-100 | 100-1000 | >1000 |
|------------|-------------------|--------|----------|-------|
| **Servidor** | VPS básico | VPS medio | Servidor dedicado | Cluster |
| **BD** | SQLite/Postgres | Postgres | Postgres HA | Postgres Cluster |
| **Costo/mes** | $10-20 | $50-100 | $200-500 | $1000+ |

---

## Monitoreo y Mantenimiento

### Métricas Clave
1. **Uptime del dispositivo**
2. **Latencia de lectura QR**
3. **Tasa de éxito de lectura**
4. **Latencia de red**
5. **Errores y reintentos**

### Dashboard Sugerido
- Mapa de dispositivos activos
- Gráficas de lecturas por hora/día
- Alertas de dispositivos offline
- Logs en tiempo real
- Estadísticas de desempeño

### Herramientas
- **Grafana** para visualización
- **Prometheus** para métricas
- **ELK Stack** para logs
- **PagerDuty** para alertas
