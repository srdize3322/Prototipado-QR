# Prototipado-QR

Investigación y desarrollo de un módulo base lector de QR con Wi-Fi para sistema de tótem de control de acceso y validación.

## 📋 Descripción del Proyecto

Este repositorio contiene la investigación completa y recomendaciones técnicas para el diseño e implementación de un módulo lector de códigos QR con las siguientes características:

- **Lectura de códigos QR**: Detección y decodificación confiable
- **Conectividad Wi-Fi**: Envío de eventos a servidor remoto
- **Retroalimentación visual**: LEDs de estado para indicar resultados
- **Modularidad futura**: Preparado para agregar LTE, GPS y batería

## 🎯 Objetivo

Diseñar y proponer un módulo base capaz de:
1. Leer códigos QR de forma confiable
2. Enviar cada evento de lectura a un servidor
3. Mostrar el resultado mediante LEDs de estado
4. Ser escalable y modular para funcionalidades futuras

## 📚 Documentación

La investigación está organizada en los siguientes documentos:

1. **[Introducción](docs/01-introduccion.md)**: Objetivos, alcance y metodología
2. **[Evaluación de Plataformas](docs/02-evaluacion-plataformas.md)**: Análisis de Raspberry Pi, ESP32, Arduino y alternativas
3. **[Lectores QR](docs/03-lectores-qr.md)**: Evaluación de opciones de hardware y software para lectura QR
4. **[Protocolos de Comunicación](docs/04-protocolos-comunicacion.md)**: Análisis de HTTP, MQTT, WebSocket y CoAP
5. **[Análisis de Costos](docs/05-analisis-costos.md)**: Evaluación económica y TCO de diferentes configuraciones
6. **[Arquitectura del Sistema](docs/06-arquitectura-sistema.md)**: Diseño técnico y flujos de operación
7. **[Modularidad Futura](docs/07-modularidad-futura.md)**: Planes de expansión (LTE, GPS, batería)
8. **[Recomendación Final](docs/08-recomendacion-final.md)**: Conclusiones y configuración recomendada

## 🏆 Recomendación Principal

Después de evaluar múltiples opciones, la configuración recomendada es:

### Para Prototipo
- **Plataforma**: Raspberry Pi Zero 2W
- **Lector QR**: Webcam USB
- **Protocolo**: HTTP/REST
- **Costo**: ~$49 USD
- **Ventaja**: Desarrollo rápido y flexible

### Para Producción
- **Plataforma**: ESP32 DevKit
- **Lector QR**: Módulo GM65/GM67 (UART)
- **Protocolo**: MQTT (con fallback HTTP)
- **Costo**: ~$45 USD por unidad
- **Ventajas**: Balance óptimo costo/confiabilidad/consumo

## 💡 Características Principales

### Funcionalidades Básicas
- ✅ Lectura de códigos QR 1D y 2D
- ✅ Conectividad Wi-Fi 2.4GHz
- ✅ Comunicación segura con servidor (TLS)
- ✅ Sistema de LEDs multi-estado
- ✅ Reconexión automática
- ✅ Cola local de eventos (offline)
- ✅ Actualizaciones OTA

### Módulos Futuros (Opcional)
- 📡 Conectividad LTE/4G
- 📍 Geolocalización GPS
- 🔋 Operación con batería
- ☀️ Carga solar

## 📊 Comparativa Rápida

| Configuración | Costo | Consumo | Autonomía* | Confiabilidad | Uso Recomendado |
|---------------|-------|---------|------------|---------------|-----------------|
| Rpi Zero 2W + Webcam | $49 | Alto | 2-4h | Media-Alta | Prototipo/desarrollo |
| ESP32-CAM | $20 | Bajo | 8-12h | Media | POC económico |
| ESP32 + GM65 | $45 | Bajo | 8-12h | Alta | **Producción** ⭐ |
| Rpi 4 + Camera | $105 | Muy Alto | 2-4h | Alta | Aplicaciones complejas |

*Con batería 2500mAh

## 🚀 Roadmap de Implementación

### Fase 1: POC (3-4 semanas)
- [ ] Prototipo con Raspberry Pi
- [ ] Backend básico (HTTP/REST)
- [ ] LEDs de estado
- [ ] Demo funcional

### Fase 2: Piloto (8-12 semanas)
- [ ] Migración a ESP32 + GM65
- [ ] Implementación MQTT
- [ ] Dashboard de monitoreo
- [ ] 10-20 unidades en campo

### Fase 3: Producción (Continuo)
- [ ] PCB personalizado
- [ ] Carcasa profesional
- [ ] Certificaciones
- [ ] Escalamiento

## 💰 Análisis de Costos

### Inversión Inicial (POC + Piloto)
- Hardware: ~$1,000
- Desarrollo: ~$12,000 (400 horas)
- Infraestructura: ~$180 (6 meses servidor)
- **Total**: ~$16,000

### Producción (100 unidades)
- Hardware: $38-45 por unidad
- Costo total con desarrollo: ~$26,000
- **Costo unitario amortizado**: $217

### ROI Esperado
- Payback period: 2-4 meses
- ROI año 1: 500%+ (aplicaciones de control de acceso)

## 🔧 Stack Tecnológico

### Hardware
```
- MCU: ESP32-WROOM-32
- QR Reader: GM65/GM67
- LEDs: 4x (Verde, Amarillo, Rojo, Azul)
- Power: 5V 2A USB-C
```

### Firmware
```
- Lenguaje: C++ (Arduino Framework)
- IDE: PlatformIO / Arduino IDE
- Librerías: WiFi, PubSubClient, ArduinoJson
```

### Backend
```
- API: Node.js + Express
- MQTT Broker: Mosquitto
- Database: PostgreSQL
- Monitoring: Grafana + Prometheus
```

## 📖 Casos de Uso

- 🎫 **Control de acceso**: Validación de tickets en eventos
- 🏢 **Registro de asistencia**: Control de personal
- 📦 **Trazabilidad**: Seguimiento de productos
- 🎟️ **Validación de cupones**: Sistemas de descuentos
- 🚪 **Control de acceso**: Edificios y áreas restringidas

## 🤝 Contribuciones

Este es un proyecto de investigación abierto. Las contribuciones son bienvenidas:

1. Fork el repositorio
2. Crea una rama para tu funcionalidad
3. Commit tus cambios
4. Push a la rama
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo licencia MIT. Ver archivo `LICENSE` para más detalles.

## 📧 Contacto

Para preguntas o consultas sobre este proyecto, por favor abre un issue en el repositorio.

---

**Nota**: Este repositorio contiene únicamente la investigación y documentación. La implementación del código estará en repositorios separados para firmware y backend.
