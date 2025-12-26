# Protocolos de Comunicación

## Protocolos Evaluados

### 1. HTTP/HTTPS (REST API)

#### Descripción
Protocolo de aplicación sobre TCP/IP, ampliamente utilizado para APIs web.

#### Características Técnicas
- **Puerto**: 80 (HTTP), 443 (HTTPS)
- **Método**: Request/Response
- **Formato**: JSON, XML, texto plano
- **Seguridad**: TLS/SSL (HTTPS)

#### Ventajas
- ✅ Ampliamente soportado en todas las plataformas
- ✅ Fácil implementación y depuración
- ✅ Gran cantidad de librerías disponibles
- ✅ Compatible con firewalls corporativos
- ✅ Infraestructura web estándar (nginx, Apache)
- ✅ Fácil integración con sistemas existentes

#### Desventajas
- ❌ Overhead de protocolo considerable
- ❌ No ideal para comunicación en tiempo real
- ❌ Requiere polling para actualizaciones del servidor
- ❌ Mayor consumo de datos y batería

#### Caso de Uso Ideal
- Sistema donde cada lectura QR se envía al servidor
- No requiere respuesta inmediata
- Infraestructura web existente
- Integración con APIs REST existentes

#### Ejemplo de Implementación (Python/Raspberry Pi)
```python
import requests
import json

def enviar_lectura_qr(codigo_qr, dispositivo_id):
    url = "https://api.ejemplo.com/qr/scan"
    payload = {
        "qr_code": codigo_qr,
        "device_id": dispositivo_id,
        "timestamp": time.time()
    }
    headers = {
        "Content-Type": "application/json",
        "Authorization": "Bearer TOKEN_API"
    }
    
    try:
        response = requests.post(url, json=payload, headers=headers, timeout=5)
        return response.status_code == 200
    except requests.exceptions.RequestException as e:
        print(f"Error: {e}")
        return False
```

#### Ejemplo de Implementación (ESP32/Arduino)
```cpp
#include <WiFi.h>
#include <HTTPClient.h>

bool enviarLecturaQR(String codigoQR) {
  if(WiFi.status() == WL_CONNECTED) {
    HTTPClient http;
    http.begin("https://api.ejemplo.com/qr/scan");
    http.addHeader("Content-Type", "application/json");
    
    String payload = "{\"qr_code\":\"" + codigoQR + "\",\"device_id\":\"ESP32_001\"}";
    
    int httpCode = http.POST(payload);
    http.end();
    
    return httpCode == 200;
  }
  return false;
}
```

---

### 2. MQTT (Message Queuing Telemetry Transport)

#### Descripción
Protocolo de mensajería ligero pub/sub diseñado para IoT.

#### Características Técnicas
- **Puerto**: 1883 (MQTT), 8883 (MQTT+TLS)
- **Método**: Publish/Subscribe
- **QoS Levels**: 0 (at most once), 1 (at least once), 2 (exactly once)
- **Broker**: Mosquitto, HiveMQ, AWS IoT, etc.

#### Ventajas
- ✅ Muy ligero, bajo overhead
- ✅ Ideal para IoT y dispositivos embebidos
- ✅ Soporte de QoS para garantizar entrega
- ✅ Comunicación bidireccional sin polling
- ✅ Bajo consumo de batería
- ✅ Reconexión automática
- ✅ Last Will Testament para detección de desconexión

#### Desventajas
- ❌ Requiere broker MQTT
- ❌ Configuración inicial más compleja
- ❌ Menos familiar para desarrolladores web
- ❌ Puede requerir infraestructura adicional

#### Caso de Uso Ideal
- Múltiples dispositivos comunicándose
- Necesidad de comunicación bidireccional (servidor puede enviar comandos)
- Dispositivos con batería
- Alta frecuencia de mensajes

#### Ejemplo de Implementación (Python/Raspberry Pi)
```python
import paho.mqtt.client as mqtt
import json

def on_connect(client, userdata, flags, rc):
    print(f"Conectado con código: {rc}")
    client.subscribe("totem/comandos")

def on_message(client, userdata, msg):
    print(f"Mensaje recibido: {msg.topic} {msg.payload}")

client = mqtt.Client()
client.on_connect = on_connect
client.on_message = on_message

client.connect("broker.ejemplo.com", 1883, 60)

def enviar_lectura_qr(codigo_qr):
    payload = json.dumps({
        "qr_code": codigo_qr,
        "timestamp": time.time()
    })
    client.publish("totem/lecturas", payload, qos=1)

client.loop_start()
```

#### Ejemplo de Implementación (ESP32/Arduino)
```cpp
#include <WiFi.h>
#include <PubSubClient.h>

WiFiClient espClient;
PubSubClient client(espClient);

void callback(char* topic, byte* payload, unsigned int length) {
  // Procesar comandos del servidor
}

void setup() {
  client.setServer("broker.ejemplo.com", 1883);
  client.setCallback(callback);
}

void enviarLecturaQR(String codigoQR) {
  if (!client.connected()) {
    reconnect();
  }
  String payload = "{\"qr_code\":\"" + codigoQR + "\"}";
  client.publish("totem/lecturas", payload.c_str(), true);
}
```

---

### 3. WebSocket

#### Descripción
Protocolo de comunicación full-duplex sobre TCP.

#### Características Técnicas
- **Puerto**: 80 (WS), 443 (WSS)
- **Método**: Full-duplex bidireccional
- **Overhead**: Muy bajo después de handshake inicial
- **Seguridad**: TLS/SSL (WSS)

#### Ventajas
- ✅ Comunicación en tiempo real
- ✅ Bidireccional sin overhead de HTTP
- ✅ Bajo latency
- ✅ Compatible con firewalls (usa puertos HTTP)
- ✅ Mantiene conexión persistente

#### Desventajas
- ❌ Conexión persistente consume recursos
- ❌ Complejidad en manejo de reconexiones
- ❌ No ideal para dispositivos con batería
- ❌ Requiere servidor WebSocket

#### Caso de Uso Ideal
- Necesidad de feedback inmediato del servidor
- Dashboard en tiempo real
- Dispositivos con alimentación continua
- Baja latencia crítica

---

### 4. CoAP (Constrained Application Protocol)

#### Descripción
Protocolo diseñado específicamente para dispositivos IoT con recursos limitados.

#### Características Técnicas
- **Puerto**: 5683 (CoAP), 5684 (CoAPs)
- **Protocolo Base**: UDP
- **Método**: Request/Response similar a HTTP
- **Formato**: Binario compacto

#### Ventajas
- ✅ Diseñado para dispositivos embebidos
- ✅ Muy ligero (sobre UDP)
- ✅ Soporte de multicast
- ✅ Menor consumo que HTTP
- ✅ Observación de recursos (similar a pub/sub)

#### Desventajas
- ❌ Menos adoptado que HTTP/MQTT
- ❌ Menos librerías disponibles
- ❌ Infraestructura menos común
- ❌ UDP puede tener problemas con algunos firewalls

#### Caso de Uso Ideal
- Redes con muchos dispositivos
- Recursos muy limitados
- Comunicación local (LAN)

---

### 5. Solución Híbrida: MQTT + HTTP

#### Descripción
Usar MQTT para comunicación principal y HTTP como fallback.

#### Implementación
```python
def enviar_evento(codigo_qr):
    # Intentar MQTT primero
    if mqtt_client.is_connected():
        try:
            mqtt_client.publish("totem/lecturas", codigo_qr)
            return True
        except:
            pass
    
    # Fallback a HTTP
    try:
        requests.post("https://api.ejemplo.com/qr", json={"code": codigo_qr})
        return True
    except:
        return False
```

#### Ventajas
- ✅ Redundancia y confiabilidad
- ✅ Aprovecha ventajas de ambos protocolos
- ✅ Flexibilidad según condiciones de red

#### Desventajas
- ❌ Mayor complejidad
- ❌ Más código a mantener

---

## Tabla Comparativa

| Protocolo | Overhead | Latencia | Consumo | Bidireccional | Complejidad | Adopción |
|-----------|----------|----------|---------|---------------|-------------|----------|
| **HTTP/REST** | Alto | Media | Alto | No (polling) | Baja | Muy Alta |
| **MQTT** | Bajo | Baja | Bajo | Sí | Media | Alta |
| **WebSocket** | Bajo | Muy Baja | Medio | Sí | Media | Alta |
| **CoAP** | Muy Bajo | Baja | Muy Bajo | Sí (observe) | Alta | Baja |

## Formato de Datos

### JSON (Recomendado)
```json
{
  "device_id": "TOTEM_001",
  "qr_code": "https://ejemplo.com/producto/12345",
  "timestamp": 1703607600,
  "location": {
    "lat": -34.603722,
    "lon": -58.381592
  },
  "status": "success"
}
```

**Ventajas:**
- ✅ Legible por humanos
- ✅ Ampliamente soportado
- ✅ Fácil debugging

**Desventajas:**
- ❌ Mayor tamaño que formatos binarios

### Protocol Buffers / MessagePack (Alternativa)
Para optimización extrema de ancho de banda.

## Seguridad

### Recomendaciones Mínimas
1. **Usar TLS/SSL siempre** (HTTPS, MQTTS, WSS)
2. **Autenticación**: API Keys, OAuth, Certificados
3. **Validación**: Verificar integridad de datos
4. **Rate Limiting**: Prevenir abuso

### Ejemplo de Autenticación
```python
headers = {
    "Authorization": "Bearer " + API_TOKEN,
    "X-Device-ID": DEVICE_ID,
    "X-Signature": hmac_sha256(payload, SECRET_KEY)
}
```

## Recomendación Final

### Para Prototipo Inicial
**Recomendado:** HTTP/REST con JSON
- Simplicidad
- Rápido desarrollo
- Fácil debugging

### Para Producción (<50 dispositivos)
**Recomendado:** MQTT con QoS 1
- Eficiencia
- Bidireccionalidad
- Confiabilidad

### Para Producción (>50 dispositivos)
**Recomendado:** MQTT con broker dedicado
- Escalabilidad
- Menor costo de infraestructura
- Gestión centralizada

### Para Aplicaciones Críticas
**Recomendado:** MQTT + HTTP (híbrido)
- Máxima confiabilidad
- Redundancia
- Flexibilidad
