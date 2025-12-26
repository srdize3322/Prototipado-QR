# Protocolos de Comunicación Servidor

## Comparativa: HTTPS REST vs MQTT

| Aspecto | HTTPS REST | MQTT |
|---------|-----------|------|
| **Complejidad** | Simple (HTTP requests) | Requiere broker + lib |
| **Latencia** | Alta (~500ms-2s) | Baja (~50-200ms) |
| **Overhead** | Alto (headers HTTP) | Bajo (protocolo ligero) |
| **Batería** | Más consumo | Más eficiente |
| **Infraestructura** | Solo servidor web | Broker MQTT (Mosquitto/HiveMQ) |
| **Escalabilidad** | Buena (RESTful) | Excelente (pub/sub) |
| **Debugging** | Fácil (curl, Postman) | Requiere cliente MQTT |
| **Firewall** | Puerto 443 estándar | Puerto 1883/8883 |

## Recomendación por Fase

### MVP (Fase 1): **HTTPS REST**
- ✅ Rápido de implementar
- ✅ Sin infraestructura adicional
- ✅ Fácil debug y testing
- ⚠️ Suficiente para <100 dispositivos

### Escalado (Fase 2): **MQTT**
- ✅ Mejor para >100 dispositivos
- ✅ Bidireccional (servidor → dispositivo)
- ✅ QoS garantizado
- ✅ Menor consumo batería

---

## Endpoints HTTPS REST (MVP)

### Base URL
```
https://tu-servidor.com/api/v1
```

### 1. POST /scan - Enviar lectura QR
**Request:**
```json
{
  "device_id": "ESP32-ABC123",
  "timestamp": "2024-01-15T10:30:45Z",
  "qr_value": "https://example.com/product/12345",
  "event_id": "evt_20240115_001",
  "battery_level": 85,
  "signal_strength": -45
}
```

**Response 200 OK:**
```json
{
  "status": "success",
  "message": "QR received",
  "server_timestamp": "2024-01-15T10:30:46Z"
}
```

**Response 400 Error:**
```json
{
  "status": "error",
  "code": "INVALID_QR",
  "message": "QR format not recognized"
}
```

### 2. GET /ping - Heartbeat
**Request:**
```
GET /ping?device_id=ESP32-ABC123
```

**Response 200 OK:**
```json
{
  "status": "online",
  "server_time": "2024-01-15T10:31:00Z",
  "update_available": false
}
```

### 3. GET /config - Obtener configuración
**Request:**
```
GET /config?device_id=ESP32-ABC123
```

**Response 200 OK:**
```json
{
  "scan_interval": 1000,
  "led_brightness": 80,
  "server_endpoint": "https://tu-servidor.com/api/v1/scan"
}
```

---

## Lógica de Estados LED

| Estado | Verde | Rojo | Descripción |
|--------|-------|------|-------------|
| **Boot** | ⚡ 3 blinks | OFF | Sistema iniciando |
| **Wi-Fi Conectando** | 💫 Pulsando lento | OFF | Buscando red |
| **Wi-Fi OK** | ✅ ON fijo | OFF | Conectado, listo |
| **QR Leído OK** | ⚡ 2 blinks rápidos | OFF | Scan exitoso |
| **Error Servidor** | OFF | ⚡ 3 blinks | HTTP error/timeout |
| **Error QR** | OFF | 💫 Pulsando rápido | QR ilegible |
| **Sin Wi-Fi** | OFF | ✅ ON fijo | Conexión perdida |

### Implementación Ejemplo (ESP32)
```cpp
// Estados LED
#define LED_GREEN 25
#define LED_RED 26

void setup() {
  pinMode(LED_GREEN, OUTPUT);
  pinMode(LED_RED, OUTPUT);
}

void indicarEstado(String estado) {
  if (estado == "BOOT") {
    for(int i=0; i<3; i++) {
      digitalWrite(LED_GREEN, HIGH);
      delay(200);
      digitalWrite(LED_GREEN, LOW);
      delay(200);
    }
  }
  else if (estado == "WIFI_OK") {
    digitalWrite(LED_GREEN, HIGH);
    digitalWrite(LED_RED, LOW);
  }
  else if (estado == "QR_OK") {
    for(int i=0; i<2; i++) {
      digitalWrite(LED_GREEN, HIGH);
      delay(100);
      digitalWrite(LED_GREEN, LOW);
      delay(100);
    }
  }
  else if (estado == "ERROR") {
    digitalWrite(LED_GREEN, LOW);
    for(int i=0; i<3; i++) {
      digitalWrite(LED_RED, HIGH);
      delay(200);
      digitalWrite(LED_RED, LOW);
      delay(200);
    }
  }
}
```

---

## MQTT Topics (Escalado Futuro)

### Estructura recomendada:
```
dispositivos/{device_id}/scan     → Publicar lecturas QR
dispositivos/{device_id}/status   → Publicar heartbeat
dispositivos/{device_id}/config   → Recibir configuración
dispositivos/broadcast/update     → Updates masivos
```

### Payload ejemplo:
```json
{
  "device_id": "ESP32-ABC123",
  "qr_value": "https://example.com/item/456",
  "timestamp": 1705318245
}
```

## Seguridad

### HTTPS REST:
- ✅ TLS 1.2+ obligatorio
- ✅ API Key en header `Authorization: Bearer <token>`
- ✅ Rate limiting (max 10 req/min por device)

### MQTT:
- ✅ TLS + username/password
- ✅ QoS 1 mínimo (at least once)
- ✅ Client certificates opcionales

## Librerías Recomendadas

### ESP32:
- **HTTPS:** `HTTPClient.h` (built-in)
- **MQTT:** `PubSubClient` de Nick O'Leary

### Raspberry Pi/Orange Pi:
- **HTTPS:** `requests` (Python)
- **MQTT:** `paho-mqtt` (Python)
