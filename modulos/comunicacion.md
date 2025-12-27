# Protocolos de Comunicación

## HTTPS REST

✅ Simple de implementar  
✅ Sin infraestructura adicional  
✅ Fácil debug (curl, Postman)  
✅ Puerto estándar (443)

---

## Endpoints REST

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
