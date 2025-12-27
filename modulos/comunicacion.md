# Protocolos de Comunicación

## HTTPS REST vs MQTT

| Aspecto | HTTPS REST | MQTT |
|---------|-----------|------|
| **Complejidad** | Simple | Requiere broker |
| **Latencia** | ~500ms-2s | ~50-200ms |
| **Overhead** | Alto | Bajo |
| **Infraestructura** | Solo servidor web | Broker MQTT |
| **Debugging** | Fácil (curl) | Requiere cliente |
| **Firewall** | Puerto 443 | Puerto 1883/8883 |

---

## Recomendación por Fase

### ⭐ MVP: **HTTPS REST**
✅ Rápido implementar  
✅ Sin infraestructura adicional  
✅ Fácil debug  
✅ Suficiente <100 dispositivos

### Escalado: **MQTT**
✅ Mejor >100 dispositivos  
✅ Bidireccional  
✅ Menor consumo batería

---

## Endpoints REST (MVP)

**Base URL:** `https://tu-servidor.com/api/v1`

### POST /scan
Envía: `device_id`, `timestamp`, `qr_value`, `event_id`  
Responde: Confirmación o código error

### GET /ping
Heartbeat: Verificar dispositivo online

### GET /config
Obtener parámetros remotos

---

## Seguridad

✅ TLS 1.2+ obligatorio  
✅ API Key en header `Authorization: Bearer <token>`  
✅ Rate limiting (10 req/min)

---

## Librerías

**ESP32:** `HTTPClient.h` (built-in)  
**RPi/OPi:** `requests` (Python)
