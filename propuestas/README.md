# Propuestas de Módulos Base ("Cerebros")

## Recomendación Principal

### 🥇 Raspberry Pi Zero 2W - **RECOMENDADO**
**Por qué:** Sistema más robusto, múltiples periféricos sin conflictos, escalable.

| Aspecto | Detalle |
|---------|---------|
| **Precio** | $20 (real) |
| **MVP Completo** | $60-130 según periféricos |
| **USB Host** | ✅ Real - QR + LTE + GPS simultáneos |
| **Desarrollo** | Fácil - Linux, SSH, logs nativos |
| **Riesgo** | 🟢 Bajo - drivers probados |
| **Cuándo usar** | Múltiples periféricos, producción, escalabilidad |

### 🥈 ESP32-DevKit - Alternativa Económica
**Por qué:** Solo para MVP simple sin expansión compleja.

| Aspecto | Detalle |
|---------|---------|
| **Precio** | $8 |
| **MVP Simple** | $45 (solo QR + Wi-Fi) |
| **USB Host** | ❌ Limitado |
| **Desarrollo** | Medio - firmware manual |
| **Riesgo** | 🔴 Alto con múltiples periféricos |
| **Cuándo usar** | Solo QR + Wi-Fi, presupuesto mínimo |

---

## Configuración Wi-Fi Inicial (Todas las Plataformas)

**IMPORTANTE:** Todos los dispositivos pueden crear su propia red Wi-Fi temporal para configuración inicial.

### Funcionamiento:
1. **Primera vez:** Dispositivo crea red Wi-Fi propia (ej: "QR-Setup-ABC123")
2. **Usuario conecta** con teléfono/laptop a esa red
3. **Portal web** aparece automáticamente (captive portal)
4. **Usuario ingresa:** Nombre de red Wi-Fi y contraseña definitiva
5. **Dispositivo guarda** credenciales y se reconecta a red objetivo
6. **Listo:** Funciona normal con Wi-Fi configurado

### Implementación por Plataforma:

| Plataforma | Método | Complejidad | Código Disponible |
|------------|--------|-------------|-------------------|
| **Raspberry Pi** | hostapd + web server | Fácil | ✓ Librerías Python/Flask |
| **ESP32** | WiFi.softAP() + WebServer | Fácil | ✓ Ejemplos Arduino abundantes |
| **Orange Pi** | NetworkManager AP mode | Fácil | ✓ Scripts bash estándar |

**Conclusión:** Configuración Wi-Fi inicial es **trivial en todas las opciones**. No es factor diferenciador.

---

## Diferencia Clave: MCU vs SBC

### ESP32 (Microcontrolador)
- Una app, sin OS completo
- 3 UART compartidos
- QR + LTE + GPS = **conflicto de puertos**

### Raspberry Pi (Computador Linux)
- Linux completo, múltiples procesos
- USB host real
- QR + LTE + GPS = **plug & play simultáneo**

---

## Tabla de Decisión Final

| Tu Caso | Plataforma | Costo | Justificación |
|---------|------------|-------|---------------|
| **QR + Wi-Fi básico** | ESP32 | $45 | Suficiente, económico |
| **QR + GPS** | **RPi Zero 2W** | $75 | USB flexible |
| **QR + LTE** | **RPi Zero 2W** | $90 | Módem USB estable |
| **QR + LTE + GPS** | **RPi Zero 2W** | $130 | Única opción práctica |
| **Producción/Escalable** | **RPi Zero 2W** | $60-130 | Menor riesgo técnico |

### Riesgos Técnicos:

| Riesgo | ESP32 | RPi Zero 2W |
|--------|-------|-------------|
| Múltiples periféricos | Alto | Bajo |
| Debug en campo | Alto | Bajo |
| Escalabilidad | Alto | Bajo |

**Diferencia de costo:** +$15-30 → **Elimina riesgos críticos**

---

## Plataformas Disponibles

| Plataforma | Precio | Uso Recomendado |
|------------|--------|-----------------|
| **Raspberry Pi Zero 2W** | $20 | 1ª opción - Producción/múltiples periféricos |
| **ESP32-DevKit** | $8 | 2ª opción - MVP mínimo sin expansión |
| **Orange Pi Zero2** | $19 | Alternativa a RPi si no disponible |
| **Arduino MKR 1010** | $45 | Solo si batería integrada crítica |

---

## Archivos Detallados

- [Raspberry Pi Zero 2W](raspberry-pi-zero-2w.md) - Recomendado
- [ESP32-DevKit](esp32-devkit.md) - Alternativa económica
- [Orange Pi Zero2](orange-pi-zero2.md) - Alternativa Linux
- [ESP32-S3](esp32-s3.md) - Avanzado (no recomendado para múltiples periféricos)
- [Arduino MKR WiFi 1010](arduino-mkr-wifi-1010.md) - Batería integrada
- ❌ Boot lento (20-40 seg)
- ❌ Costo mayor
- ❌ Más complejo (SD, OS, etc.)

**Usar si:** Necesitas procesamiento pesado, Python mandatorio, o múltiples servicios concurrentes

---

## Matriz de compatibilidad

### Con módulos de comunicación
| Módulo Base | Wi-Fi | Lector QR UART | GPS UART | LTE UART | USB Devices |
|-------------|-------|----------------|----------|----------|-------------|
| ESP32-DevKit | ✅ Int | ✅ Excelente | ✅ Excelente | ⚠️ Complejo | ❌ No |
| ESP32-S3 | ✅ Int | ✅ Excelente | ✅ Excelente | ⚠️ Complejo | ⚠️ Limitado |
| RPi Zero 2W | ✅ Int | ⚠️ Via USB mejor | ✅ Via USB mejor | ✅ Buena | ✅ Excelente |

**Leyenda:** Int = Integrado

### Con indicadores
| Módulo Base | LEDs | LED RGB | OLED I2C | TFT SPI | HDMI |
|-------------|------|---------|----------|---------|------|
| ESP32-DevKit | ✅ | ✅ | ✅ | ⚠️ RAM limitada | ❌ |
| ESP32-S3 | ✅ | ✅ | ✅ | ✅ Mejor | ❌ |
| RPi Zero 2W | ✅ | ✅ | ✅ | ✅ | ✅ |

---

## Próximos pasos

1. **Elegir módulo base** según requisitos del proyecto
2. **Revisar módulos disponibles** en carpeta `/modulos/`
3. **Validar compatibilidad** entre módulo base y módulos periféricos
4. **Calcular costo total** de la configuración elegida
5. **Verificar disponibilidad** en Chile

---

## Enlaces útiles

### Documentación módulos base
- [ESP32-DevKit](esp32-devkit.md) - Detalles completos
- [ESP32-S3](esp32-s3.md) - Detalles completos
- [Raspberry Pi Zero 2W](raspberry-pi-zero-2w.md) - Detalles completos

### Módulos periféricos
- [Lectores QR](../modulos/lector-qr.md)
- [Módulos Wi-Fi](../modulos/wifi.md)
- [Módulos GPS](../modulos/gps.md)
- [Módulos LTE](../modulos/lte.md)
- [Indicadores LED](../modulos/led-indicadores.md)

### README principal
- [Volver al inicio](../README.md)

---

**Última actualización:** Diciembre 2025
