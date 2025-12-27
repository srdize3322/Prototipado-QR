# ESP32-S3 - MCU Avanzado

## Specs Clave
- **CPU:** Dual-core Xtensa LX7 @ 240MHz
- **RAM:** 512KB | **Flash:** 8MB
- **Wi-Fi:** 2.4GHz | **BT:** 5.0 BLE
- **GPIO:** 45 (3× UART)
- **USB:** Nativo (debugging directo)
- **Precio:** $12-15

---

## vs ESP32 Estándar

| Feature | ESP32 | ESP32-S3 |
|---------|-------|----------|
| **Precio** | $8 | $12-15 |
| **USB** | Vía bridge | ✅ **Nativo** |
| **BT** | 4.2 | ✅ **5.0** |
| **GPIO** | 30+ | ✅ **45** |
| **Cámara** | Básico | ✅ **Mejor** |

---

## Cuándo Usar S3

✅ Necesitas cámara + procesamiento  
✅ Requieres >30 GPIO simultáneos  
✅ USB nativo simplifica debugging  

---

## Cuándo NO Usar

❌ MVP simple (QR UART + Wi-Fi)  
❌ Presupuesto ajustado  
❌ GPIO suficientes (30 pines)

---

## Recomendación
➡️ **Usar solo si** proyecto escalará a procesamiento imagen o multi-sensores complejos  
➡️ **Para MVP básico:** ESP32 estándar es más económico
