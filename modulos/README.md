# Módulos Periféricos

Componentes que expanden las capacidades del módulo base.

---

## Módulos Disponibles

| Módulo | Función | Precio | Prioridad MVP | Complejidad |
|--------|---------|--------|---------------|-------------|
| [Lector QR](lector-qr.md) | Escaneo códigos 2D | $28-66 | ✅ **Esencial** | ⭐ Fácil |
| [Wi-Fi](wifi.md) | Conectividad (integrado) | $0 | ✅ **Esencial** | ⭐ Fácil |
| [LEDs](led-indicadores.md) | Indicadores estado | $0.50-5 | ✅ **Esencial** | ⭐ Fácil |
| [Comunicación](comunicacion.md) | Protocolos HTTP/MQTT | $0 | ✅ **Esencial** | ⭐⭐ Media |
| [GPS](gps.md) | Geolocalización | $8-30 | ⚠️ Opcional | ⭐⭐ Media |
| [LTE](lte.md) | Conectividad móvil | $25-50 | ⚠️ Opcional | ⭐⭐⭐⭐ Difícil |

---

## Compatibilidad Rápida

| Periférico | ESP32 | ESP32-S3 | Orange Pi | RPi Zero 2W | Arduino MKR |
|------------|-------|----------|-----------|-------------|-------------|
| QR UART | ✅ | ✅ | ✅ | ✅ | ⚠️ |
| GPS UART | ✅ | ✅ | ✅ | ✅ | ⚠️ |
| LTE | ⚠️ | ⚠️ | ✅ USB | ✅ USB | ❌ |
| LEDs | ✅ | ✅ | ✅ | ✅ | ✅ |

**Leyenda:** ✅ Compatible directo | ⚠️ Con consideraciones | ❌ No recomendado

---

## Escalado por Fases

### Fase 1 - MVP ($45-55):
- ESP32-DevKit
- GM67 Lector QR UART
- 2 LEDs indicadores
- Wi-Fi integrado

### Fase 2 - +Geolocalización ($60-70):
- Anterior + NEO-M8N GPS

### Fase 3 - +Conectividad Móvil ($90-110):
- Anterior + SIM7600 LTE (complejo)
- **O migrar a:** RPi + USB 4G dongle (más simple)

---

## Prioridad Implementación

1. **Esenciales MVP:** Lector QR + Wi-Fi + LEDs + Protocolo HTTP
2. **Expansión 1:** GPS (si geolocalización requerida)
3. **Expansión 2:** LTE (solo si movilidad sin Wi-Fi)

Ver cada archivo para detalles técnicos y configuración.
