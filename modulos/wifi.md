# Módulos Wi-Fi

Este documento lista las opciones de conectividad Wi-Fi según el módulo base elegido.

## Resumen

La mayoría de los módulos base modernos ya incluyen Wi-Fi integrado, por lo que **no se requiere módulo externo** en la mayoría de los casos.

---

## Wi-Fi integrado en módulos base

### ESP32-DevKit
- ✅ **Wi-Fi integrado:** 802.11 b/g/n (2.4 GHz)
- ✅ **No requiere módulo adicional**
- **Alcance típico:** 50-100m en espacio abierto, 10-30m en interior
- **Velocidad:** Hasta 150 Mbps teórico
- **Modos:** Station, AP, Station+AP
- **Seguridad:** WPA/WPA2/WPA3

### ESP32-S3
- ✅ **Wi-Fi integrado:** 802.11 b/g/n (2.4 GHz)
- ✅ **Idéntico a ESP32 estándar**
- ✅ **No requiere módulo adicional**

### Raspberry Pi Zero 2 W
- ✅ **Wi-Fi integrado:** 802.11 b/g/n (2.4 GHz)
- ✅ **No requiere módulo adicional**
- **Alcance:** Similar a ESP32
- **Ventaja:** Stack completo Linux (NetworkManager, wpa_supplicant, etc.)

---

## Módulos Wi-Fi externos (casos especiales)

### ESP-01 (ESP8266 como módulo AT)

#### Descripción
Módulo Wi-Fi basado en ESP8266 con firmware AT commands. Se usa como "modem Wi-Fi" serial para MCUs sin Wi-Fi.

#### Cuándo usar
- ⚠️ Solo si el módulo base **no tiene Wi-Fi integrado**
- Ejemplo: Arduino Uno, STM32 básico, etc.
- **NO necesario para ESP32 o Raspberry Pi**

#### Compatibilidad
| Módulo Base | Compatibilidad | Notas |
|-------------|----------------|-------|
| ESP32-DevKit | ❌ **No necesario** | Ya tiene Wi-Fi mejor |
| ESP32-S3 | ❌ **No necesario** | Ya tiene Wi-Fi |
| Raspberry Pi Zero 2W | ❌ **No necesario** | Ya tiene Wi-Fi |
| Arduino/MCU sin Wi-Fi | ✅ Sí | Usar comandos AT por UART |

#### Costo
- **ESP-01:** $2-4
- **ESP-01S:** $3-5

---

### Dongles USB Wi-Fi (para Raspberry Pi)

#### Descripción
Adaptadores USB Wi-Fi, útiles para:
- Dual band (2.4 + 5 GHz)
- Mayor alcance
- Antena externa

#### Compatibilidad
| Módulo Base | Compatibilidad | Notas |
|-------------|----------------|-------|
| ESP32-DevKit | ❌ **No** | No tiene USB host |
| ESP32-S3 | ❌ **No** | USB OTG limitado |
| Raspberry Pi Zero 2W | ✅ **Sí** | Vía puerto USB (requiere hub) |

#### Modelos comunes
- **TP-Link TL-WN725N:** ~$8-12 (2.4 GHz, compacto)
- **Alfa AWUS036NHA:** ~$25-35 (dual band, alta potencia)
- **Realtek RTL8188:** ~$5-8 (económico)

#### Ventajas
- ✅ 5 GHz support (algunos modelos)
- ✅ Mayor alcance con antena externa
- ✅ No usa GPIO del módulo base

#### Desventajas
- ❌ Ocupa puerto USB (requiere hub en RPi Zero)
- ❌ Mayor consumo energético
- ❌ Costo adicional innecesario si Wi-Fi integrado es suficiente

---

## Mejoras de alcance Wi-Fi

Si el alcance Wi-Fi integrado no es suficiente, considerar:

### Antena externa (ESP32)
- **Costo:** $2-5
- **Ganancia:** 3-5 dBi
- **Mejora alcance:** 30-50%
- **Compatibilidad:** ESP32 con conector U.FL/IPEX (no todos los DevKit lo tienen)

### Repetidor/Access Point cercano
- **Costo:** $15-30
- **Solución:** Instalar AP cerca del dispositivo
- **Mejor opción** si hay múltiples dispositivos

### Módulo con antena integrada potente
- **ESP32-WROOM-32U:** Conector para antena externa
- **ESP32 con PCB antenna + shield:** Algunos DevKit incluyen antena en PCB optimizada

---

## Tabla comparativa

| Opción | Costo | Alcance | Velocidad | Facilidad | Recomendación |
|--------|-------|---------|-----------|-----------|---------------|
| **Wi-Fi integrado ESP32** | Incluido | ⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ✅ Usar por defecto |
| **Wi-Fi integrado RPi** | Incluido | ⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ✅ Usar por defecto |
| **ESP-01 módulo externo** | $3-5 | ⭐⭐ | ⭐⭐⭐ | ⭐⭐ | ⚠️ Solo si base sin Wi-Fi |
| **Antena externa ESP32** | $2-5 | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ | ⚠️ Solo si alcance insuficiente |
| **USB Wi-Fi dongle** | $8-35 | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⚠️ Solo RPi + dual band |

---

## Recomendaciones

### Para ESP32-DevKit
✅ **Usar Wi-Fi integrado** - Suficiente para 99% de casos
⚠️ Si alcance es problema: Usar antena externa o mover AP más cerca

### Para ESP32-S3
✅ **Usar Wi-Fi integrado** - Idéntico a ESP32

### Para Raspberry Pi Zero 2W
✅ **Usar Wi-Fi integrado** - Suficiente para mayoría de casos
⚠️ Si necesitas 5 GHz: Dongle USB dual band (~$15-25)

### Para este proyecto (QR + Wi-Fi básico)
✅ **Wi-Fi integrado es suficiente** - No gastar en módulo adicional

---

## Código de ejemplo

### ESP32 (Arduino)
```cpp
#include <WiFi.h>

const char* ssid = "TuRed";
const char* password = "TuPassword";

void setup() {
  Serial.begin(115200);
  
  WiFi.begin(ssid, password);
  
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  
  Serial.println("\nConectado!");
  Serial.print("IP: ");
  Serial.println(WiFi.localIP());
}

void loop() {
  // Tu código aquí
}
```

### Raspberry Pi (Python)
```python
import subprocess

# Conectar a red (usando nmcli)
subprocess.run([
    'sudo', 'nmcli', 'dev', 'wifi', 'connect', 
    'TuRed', 'password', 'TuPassword'
])

# Verificar conexión
result = subprocess.run(['ip', 'addr', 'show', 'wlan0'], 
                       capture_output=True, text=True)
print(result.stdout)
```

---

## Configuración Wi-Fi recomendada

### Para mayor alcance
- **Canal:** Usar canal menos congestionado (1, 6, 11)
- **Potencia TX:** Configurar al máximo permitido
- **Banda:** 2.4 GHz (mejor penetración que 5 GHz)

### Para mayor velocidad
- **Banda:** 5 GHz si disponible
- **Canal ancho:** 40 MHz
- **Estándar:** 802.11n

### Para este proyecto
✅ **2.4 GHz en canal fijo (ej: 6)**
- Mejor alcance
- Compatible con todos los dispositivos
- Suficiente velocidad para enviar datos QR

---

**Última actualización:** Diciembre 2025
**Conclusión:** Wi-Fi ya está integrado en todos los módulos base recomendados. No se requiere módulo adicional.
