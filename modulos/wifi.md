# Wi-Fi - Conectividad Inalámbrica

## Estado: Integrado en Módulos Base

✅ **Todas las plataformas base propuestas incluyen Wi-Fi integrado.**

No se requiere módulo externo para MVP.

---

## Comparativa Wi-Fi Integrado

| Plataforma | Wi-Fi | Bandas | Alcance | Notas |
|------------|-------|--------|---------|-------|
| **ESP32-DevKit** | 802.11 b/g/n | 2.4 GHz | ~50-100m | Excelente para IoT |
| **ESP32-S3** | 802.11 b/g/n | 2.4 GHz | ~50-100m | Igual ESP32 |
| **Orange Pi Zero2** | 802.11 a/b/g/n/ac | **2.4 + 5 GHz** | ~30-80m | Dual-band |
| **RPi Zero 2W** | 802.11 b/g/n/ac | **2.4 + 5 GHz** | ~30-80m | Dual-band |
| **Arduino MKR** | 802.11 b/g/n | 2.4 + 5 GHz | ~50-100m | Nina-W102 |

---

## Configuración Típica (ESP32)

### Conexión básica:
```cpp
#include <WiFi.h>

const char* ssid = "TuRed";
const char* password = "TuPassword";

void setup() {
  WiFi.begin(ssid, password);
  
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
  }
  
  Serial.println("WiFi conectado");
  Serial.println(WiFi.localIP());
}
```

---

## Consideraciones

### Alcance:
- Entorno abierto: 50-100m
- Interior con paredes: 20-40m
- Mejoras: Antena externa (+$2-5)

### Consumo:
- ESP32 activo Wi-Fi: 160-260 mA
- ESP32 modem sleep: ~20 mA
- RPi/Orange Pi: 300-500 mA constante

### Seguridad:
- ✅ WPA2/WPA3 soportado
- ✅ Certificados TLS para HTTPS
- ⚠️ Evitar WEP/Open networks

---

## Módulos Wi-Fi Externos (Solo si necesario)

**No recomendado** para este proyecto, pero disponibles:

| Módulo | Interface | Precio | Uso |
|--------|-----------|--------|-----|
| ESP-01 | UART | $2-4 | AT commands (legacy) |
| ESP8266 | UART/SPI | $3-5 | Si MCU sin Wi-Fi |

**Conclusión:** Usar plataforma con Wi-Fi integrado es más simple y económico.
