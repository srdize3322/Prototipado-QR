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
`https://tu-servidor.com/api/v1`

### 1. POST /scan - Enviar lectura QR
**Campos clave a enviar:** `device_id`, `timestamp`, `qr_value`, `event_id`, nivel de batería y señal.

**Respuestas esperadas:** Confirmación de recepción con sello de tiempo del servidor o error con código legible.

### 2. GET /ping - Heartbeat
**Uso:** Verificar que el dispositivo esté en línea y confirmar si hay actualización disponible.

### 3. GET /config - Obtener configuración
**Uso:** Recuperar parámetros remotos como intervalo de escaneo, brillo de LED o URL de envío.

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

---

## MQTT Topics (Escalado Futuro)

### Estructura recomendada:
`dispositivos/{device_id}/scan` para lecturas QR, `status` para heartbeat, `config` para ajustes remotos y `broadcast/update` para mensajes masivos.

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
