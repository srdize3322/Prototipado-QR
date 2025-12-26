# Módulos LTE / Celular (GSM/3G/4G)

Este documento lista opciones de conectividad celular para comunicación cuando Wi-Fi no está disponible.

## Índice
1. [Módulos 2G (GSM/GPRS)](#módulos-2g-gsmgprs)
2. [Módulos 3G](#módulos-3g)
3. [Módulos 4G LTE](#módulos-4g-lte)
4. [Módulos combinados GSM+GPS](#módulos-combinados-gsmgps)
5. [Dongles USB 4G](#dongles-usb-4g)

---

## ⚠️ Nota importante - Sunset 2G/3G

**Chile (y muchos países) están descontinuando redes 2G/3G:**
- **Movistar Chile:** 3G apagado en 2025
- **Entel Chile:** 3G en proceso de descontinuación
- **Claro Chile:** Similar

✅ **Recomendación:** Usar módulos **4G LTE** (Cat-1 o superior) para proyectos nuevos.

---

## Módulos 2G (GSM/GPRS)

### ⚠️ Advertencia
Redes 2G están siendo descontinuadas globalmente. **No recomendado para proyectos nuevos** excepto como fallback temporal.

### SIM800L

#### Descripación
Módulo GSM/GPRS quad-band muy económico y popular.

#### Especificaciones
- **Bandas:** 850/900/1800/1900 MHz
- **GPRS:** Multi-slot class 10 (~85.6 kbps)
- **Interfaz:** UART (comandos AT)
- **Voltaje:** 3.4V - 4.4V (⚠️ No 5V ni 3.3V directo)
- **Consumo:** 
  - Sleep: 1 mA
  - Idle: 10 mA
  - Transmitiendo: **500-2000 mA** (picos)
- **Costo:** $4-8

#### Compatibilidad

| Módulo Base | Compatibilidad | Notas |
|-------------|----------------|-------|
| **ESP32-DevKit** | ⚠️ **Complejo** | Requiere fuente externa 3.8-4.2V con capacidad >2A. No alimentar desde ESP32 |
| **ESP32-S3** | ⚠️ **Complejo** | Mismo caso |
| **Raspberry Pi Zero 2W** | ⚠️ **Complejo** | Requiere fuente externa robusta |

#### Problemas comunes
- ❌ **Voltage:** 3.3V es insuficiente, 5V es mucho → usar LDO 3.8V-4V
- ❌ **Corriente:** Picos de 2A destruyen reguladores débiles
- ❌ **Brown-out:** ESP32 se resetea si comparte fuente con SIM800L

#### Configuración recomendada
```
Fuente 5V → Buck/LDO ajustable a 4V (>2A) → SIM800L
         └→ 3.3V regulador → ESP32

Condensadores:
- 1000µF cerca de VCC SIM800L
- 100µF adicional
```

### SIM900/SIM900A
- Similar a SIM800L
- Más antiguo, menos eficiente
- **No recomendado** - Usar SIM800L si es necesario

---

## Módulos 3G

### SIM5320 / SIM5360

#### Descripción
Módulos 3G HSPA+, algunos con GPS integrado.

#### Especificaciones
- **3G:** WCDMA/HSPA+
- **Velocidad:** Hasta 7.2 Mbps DL, 5.76 Mbps UL
- **GPS:** SIM5360 incluye GPS
- **Interfaz:** UART
- **Voltaje:** 3.4-4.2V
- **Consumo:** Similar a SIM800L (picos altos)
- **Costo:** $15-25

#### Compatibilidad
- Similar a SIM800L (requiere fuente robusta)

#### Estado
⚠️ **3G en descontinuación** - No recomendado para proyectos nuevos

---

## Módulos 4G LTE

### ✅ Recomendado para proyectos nuevos

### SIM7600E / SIM7600SA / SIM7600G

#### Descripción
Módulo LTE Cat-1 con fallback 3G/2G y GPS integrado. Uno de los más versátiles.

#### Especificaciones
- **LTE Cat-1:** Hasta 10 Mbps DL, 5 Mbps UL
- **Bandas (SIM7600SA-H - Sudamérica):**
  - LTE: B2/B3/B4/B5/B7/B8/B28
  - WCDMA: B2/B4/B5/B8
  - GSM: 850/900/1800/1900 MHz
- **GPS:** Integrado
- **Interfaz:** UART (comandos AT similares a SIM800)
- **Voltaje:** 3.4-4.2V
- **Consumo:** 
  - Sleep: 2 mA
  - Idle: 20-50 mA
  - LTE transmitiendo: **500-2000 mA** (picos)
- **Costo:** $25-40

#### Variantes
- **SIM7600E:** Europa
- **SIM7600SA:** Sudamérica (✅ **Usar en Chile**)
- **SIM7600G:** Global (compatible Chile)

#### Compatibilidad

| Módulo Base | Compatibilidad | Notas |
|-------------|----------------|-------|
| **ESP32-DevKit** | ⚠️ **Medio** | Requiere fuente externa robusta (>2A), UART2 para AT commands |
| **ESP32-S3** | ⚠️ **Medio** | Mismo caso |
| **Raspberry Pi Zero 2W** | ✅ **Buena** | Via USB o GPIO serial, fuente >2A requerida |

#### Ventajas sobre SIM800L
- ✅ **4G LTE** - No obsoleto
- ✅ **GPS integrado** - Un módulo menos
- ✅ **Fallback automático** a 3G/2G si 4G no disponible
- ✅ **Mayor velocidad**

---

### SIM7000E / SIM7000G (NB-IoT / LTE-M)

#### Descripción
Módulo LTE-M y NB-IoT (Cat-M1/Cat-NB1), diseñado para IoT de bajo consumo.

#### Especificaciones
- **LTE Cat-M1:** 375 kbps DL/UL
- **NB-IoT:** 60 kbps DL, 30 kbps UL
- **GPS:** Integrado
- **Voltaje:** 3.3-4.3V
- **Consumo:** 
  - PSM (sleep): ~3 µA
  - Idle: ~5 mA
  - Transmitiendo: ~500 mA (menos picos que Cat-1)
- **Costo:** $18-30

#### Compatibilidad en Chile
⚠️ **Verificar cobertura NB-IoT/LTE-M:**
- **Entel:** LTE-M disponible
- **Movistar/Claro:** Verificar

#### Ventajas
- ✅ **Bajo consumo** - Ideal para batería
- ✅ **PSM mode** - Micro-amperios en sleep
- ✅ **Costo menor** que Cat-1

#### Desventajas
- ⚠️ **Velocidad baja** - Suficiente para QR codes, no para video
- ⚠️ **Cobertura limitada** - NB-IoT no en todas partes

---

### Quectel EC25 / EC20

#### Descripción
Módulos LTE Cat-4, mayor velocidad que SIM7600.

#### Especificaciones
- **LTE Cat-4:** Hasta 150 Mbps DL, 50 Mbps UL
- **Interfaz:** USB (principal) o UART
- **Voltaje:** 3.3-4.3V
- **Consumo:** Mayor que Cat-1
- **Costo:** $30-50

#### Compatibilidad

| Módulo Base | Compatibilidad | Notas |
|-------------|----------------|-------|
| **ESP32-DevKit** | ❌ **No** | USB principal, no host en ESP32 |
| **ESP32-S3** | ⚠️ **Limitado** | USB OTG teórico |
| **Raspberry Pi Zero 2W** | ✅ **Excelente** | USB nativo, drivers Linux |

---

## Módulos combinados GSM+GPS

Ver sección en [módulos GPS](gps.md#módulos-gsmgps-combinados):
- **A9G** (2G + GPS) - $10-15
- **SIM868** (2G + GPS + BT) - $15-20
- **SIM7600** (4G + GPS) - $25-40

---

## Dongles USB 4G

### Descripción
Módems USB 4G comerciales (Huawei, ZTE, etc.) reutilizados como módems IoT.

### Modelos comunes
- **Huawei E3372:** LTE Cat-4, ~$30-50
- **ZTE MF823:** LTE Cat-4, ~$25-40
- **Huawei E3276:** LTE Cat-4, ~$30-45

### Ventajas
- ✅ Plug-and-play en Raspberry Pi (drivers incluidos)
- ✅ Alta velocidad (Cat-4)
- ✅ Incluyen carcasa y conector SIM

### Desventajas
- ❌ Solo compatible con Raspberry Pi (USB host requerido)
- ⚠️ Consumo alto
- ⚠️ Tamaño grande

### Compatibilidad

| Módulo Base | Compatibilidad |
|-------------|----------------|
| **ESP32-DevKit** | ❌ No |
| **ESP32-S3** | ❌ No |
| **Raspberry Pi Zero 2W** | ✅ Excelente |

---

## Comparativa de costos y tecnología

| Módulo | Tecnología | Precio (USD) | Velocidad | Estado | Recomendación |
|--------|------------|--------------|-----------|--------|---------------|
| SIM800L | 2G GSM/GPRS | 4-8 | 85 kbps | ❌ Obsoleto | ❌ Evitar |
| SIM5320 | 3G HSPA+ | 15-25 | 7.2 Mbps | ⚠️ Descontinuando | ❌ Evitar |
| SIM7000 | NB-IoT/LTE-M | 18-30 | 375 kbps | ✅ Actual | ✅ IoT bajo consumo |
| SIM7600 | LTE Cat-1 | 25-40 | 10 Mbps | ✅ Actual | ✅ **Recomendado** |
| EC25 | LTE Cat-4 | 30-50 | 150 Mbps | ✅ Actual | ⚠️ Solo RPi |
| Dongle USB | LTE Cat-4 | 30-50 | 150 Mbps | ✅ Actual | ⚠️ Solo RPi |

---

## Recomendaciones por módulo base

### Para ESP32-DevKit
✅ **SIM7600SA-H** ($30-40)
- UART2 para comandos AT
- Fuente externa 5V/3A
- Regulador 4V/2A para SIM7600
- Condensadores 1000µF + 100µF
- ⚠️ **Advertencia:** Gestión de energía compleja

### Para ESP32-S3
✅ **SIM7600SA-H** ($30-40)
- Igual que ESP32-DevKit

### Para Raspberry Pi Zero 2W
✅ **Opción 1:** Dongle USB 4G ($30-50)
- Plug-and-play
- Más simple que módulo UART

✅ **Opción 2:** SIM7600 via USB ($30-40)
- Si necesitas GPS integrado

---

## Proveedores Chile

### SIM Cards IoT/M2M
- **Entel IoT**
- **Movistar M2M**
- **Claro IoT**
- **WOM** (verificar cobertura rural)

### Planes típicos
- **Prepago:** ~$3,000-5,000 CLP/mes (500 MB - 1 GB)
- **Pospago IoT:** Desde $2,000 CLP/mes (planes bajos datos)

---

## Configuración típica (ESP32 + SIM7600)

### Hardware crítico
```
Fuente 5V/3A
    ├→ Buck 4V/2A → SIM7600 (VCC + capacitores)
    └→ Buck 3.3V/1A → ESP32

ESP32 <--UART--> SIM7600
      (GPIO 16/17)

Capacitores en SIM7600:
- 1000µF electrolítico (cerca de VCC)
- 100µF cerámico
- 10µF cerámico
```

### Software (Arduino)
```cpp
#include <HardwareSerial.h>

HardwareSerial SIM(2); // UART2

void setup() {
  Serial.begin(115200);
  SIM.begin(115200, SERIAL_8N1, 16, 17); // RX=16, TX=17
  
  delay(3000); // Esperar inicialización del módulo
  
  // Test AT
  SIM.println("AT");
  delay(1000);
  while(SIM.available()) {
    Serial.write(SIM.read());
  }
  
  // Conectar a red
  SIM.println("AT+CGATT=1"); // Attach GPRS
  delay(2000);
  
  // Configurar APN (ejemplo Entel Chile)
  SIM.println("AT+CGDCONT=1,\"IP\",\"imovil.entelpcs.cl\"");
  delay(1000);
  
  // Activar contexto PDP
  SIM.println("AT+CGACT=1,1");
  delay(5000);
  
  Serial.println("4G conectado!");
}

void loop() {
  // HTTP request via AT commands...
}
```

---

## Consideraciones críticas

### Fuente de alimentación
- ⚠️ **Nunca alimentar módulo LTE desde pin 3.3V/5V del ESP32**
- ✅ Usar fuente externa con regulador dedicado
- ✅ Capacitores grandes cerca del módulo (1000µF mínimo)
- ✅ Cables cortos y gruesos (AWG 22 o menor)

### Antena
- ✅ **Usar antena externa** - Carcasa metálica bloquea señal
- **Ganancia:** 3-5 dBi típico
- **Tipo:** SMA o U.FL según módulo
- **Ubicación:** Fuera de carcasa metálica

### Consumo
- ⚠️ **Picos de 2A** - Dimensionar fuente y baterías
- ✅ Usar PSM (Power Saving Mode) cuando sea posible
- ✅ Desconectar módulo si no se usa (relay o MOSFET)

---

## Disponibilidad (Chile)
- **AliExpress:** $20-50, envío 4-6 semanas
- **Amazon:** $30-60, envío 2-3 semanas
- **MercadoLibre Chile:** $40-80, disponible local

---

**Última actualización:** Diciembre 2025
**Recomendación principal:** **SIM7600SA-H** para proyectos en Chile con ESP32
