# Prototipo módulo lector QR con Wi-Fi

## Idea general
Desarrollar un módulo físico base capaz de leer códigos QR y enviar el resultado a un servidor vía Wi-Fi.  
El servidor procesa la información y responde si el QR es válido o no.  
El dispositivo indica el resultado mediante LEDs.

Este repositorio corresponde **exclusivamente a la etapa de prototipado** y análisis de opciones técnicas.

## Objetivo de esta etapa
- Explorar distintas alternativas de hardware para el módulo
- Comparar costos, complejidad y viabilidad
- Definir una arquitectura base para un prototipo funcional
- Guiar el trabajo del agente en la investigación y comparación

No se busca aún una solución final ni industrial.

## Alcance del prototipo
- Lectura de código QR
- Conexión a red Wi-Fi existente
- Envío de información al servidor (solicitud HTTP u otro mecanismo simple)
- Recepción de respuesta del servidor
- Indicador visual mediante LED (ej.: verde / rojo)
- Alimentación por cable (no batería en esta etapa)

## Fuera de alcance (por ahora)
- LTE / GPS
- Batería
- Diseño industrial
- Seguridad avanzada
- Escalabilidad masiva

## Estructura del repositorio

### 📁 `/propuestas/` - Módulos Base ("Cerebros")
Contiene las opciones de **módulos base** que actúan como cerebro del sistema:
- [ESP32-DevKit](propuestas/esp32-devkit.md) - $5-8, Wi-Fi integrado ⭐ **Recomendado**
- [ESP32-S3](propuestas/esp32-s3.md) - $12-15, más potente
- [Raspberry Pi Zero 2W](propuestas/raspberry-pi-zero-2w.md) - $30-40, Linux completo

Cada módulo base incluye:
- Especificaciones técnicas completas
- Compatibilidad con módulos periféricos
- Ejemplos de configuración
- Pros y contras

### 📁 `/modulos/` - Módulos Periféricos
Catálogo de **componentes** que se conectan al módulo base:
- [📷 Lectores QR](modulos/lector-qr.md) - Escáneres UART, cámaras, USB
- [📡 Wi-Fi](modulos/wifi.md) - Conectividad inalámbrica (integrada)
- [🛰️ GPS](modulos/gps.md) - Geolocalización GNSS
- [📶 LTE/Celular](modulos/lte.md) - Conectividad móvil 4G
- [💡 Indicadores LED](modulos/led-indicadores.md) - LEDs, RGB, pantallas

Cada módulo incluye:
- Modelos disponibles y precios
- **Tabla de compatibilidad** con cada módulo base
- Ejemplos de código
- Recomendaciones de compra

## Enfoque modular

Este proyecto usa un **diseño modular** donde:
1. Eliges un **módulo base** (cerebro) según tus necesidades
2. Conectas **módulos periféricos** según funcionalidades requeridas
3. Cada módulo especifica compatibilidad con los módulos base

### Ejemplo de configuración
```
Módulo Base: ESP32-DevKit ($8)
  ├── Lector QR: Escáner UART ($35) 
  ├── GPS: NEO-M8N ($15)
  ├── Wi-Fi: Integrado
  ├── Indicadores: LED RGB ($0.50)
  └── (Futuro) LTE: SIM7600 ($35)
  
Total base: ~$58
Con LTE futuro: ~$93
```

## Criterios generales
- Componentes disponibles comercialmente
- Idealmente comprables por AliExpress u otro marketplace similar
- Costo total del prototipo preferiblemente bajo USD 150
- Posibilidad de envío a Chile
- Simplicidad de implementación

## Estado del proyecto
Proyecto en fase de **investigación y prototipado**.
