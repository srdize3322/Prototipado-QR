# LTE/Celular - Conectividad Móvil

Módulo opcional para dispositivos sin cobertura Wi-Fi. Requiere plan de datos mensual, SIM card y antena externa.

---

## Opciones

| Módulo | Precio | Interface | Consumo | Uso |
|--------|--------|-----------|---------|-----|
| **USB 4G Dongle** | $30-50 | USB | 500mA | Recomendado RPi/OPi |
| **SIM7600 (4G)** | $25-35 | UART | 2A peak | Complejo, requiere fuente externa |
| **SIM7070G (NB-IoT)** | $15-20 | UART | 500mA | IoT bajo consumo |

---

## Implementación

**Raspberry Pi / Orange Pi:**  
USB 4G Dongle (Huawei E3372, ZTE MF823): plug & play con NetworkManager. Costo $30-50.

**ESP32:**  
SIM7600 UART: requiere fuente 5V/3A externa, buck converter 3.8V y comandos AT manuales. No recomendado para MVP.

---

## Costos

| Config | Hardware | Datos/mes | Total |
|--------|----------|-----------|-------|
| RPi + Dongle | $80 | $5-15 | $85-95 |
| ESP32 + SIM7600 | $95 | $5-15 | $100-110 |

Estimación consumo: ~2KB por scan → 1000 scans = 2MB/mes

---

## Recomendación

**Para MVP:** No incluir LTE - Wi-Fi suficiente  
**Para producción móvil:** RPi + USB 4G Dongle  
**Evitar:** SIM800L (2G obsoleto), SIM7600 + ESP32 (muy complejo)
