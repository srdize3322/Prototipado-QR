# Introducción al Proyecto

## Objetivo General

Diseñar y proponer un módulo base lector de QR con Wi-Fi, capaz de leer códigos, enviar cada evento a un servidor y mostrar el resultado con LEDs de estado.

## Alcance del Prototipo

El prototipo contempla las siguientes características fundamentales:

### Funcionalidades Básicas
- **Lectura de Códigos QR**: Capacidad de detectar y decodificar códigos QR de forma confiable
- **Conectividad Wi-Fi**: Comunicación inalámbrica para envío de eventos
- **Comunicación con Servidor**: Transmisión de datos de lectura a servidor remoto
- **Retroalimentación Visual**: Sistema de LEDs para indicar estados (lectura exitosa, error, procesando, etc.)

### Consideraciones Futuras (Modularidad)
- **Conectividad LTE**: Opción de comunicación celular para ubicaciones sin Wi-Fi
- **GPS**: Geolocalización de eventos de lectura
- **Batería**: Operación autónoma sin conexión constante a corriente eléctrica

## Contexto de Uso

Este módulo está diseñado como base para un sistema de tótem lector de QR, típicamente utilizado en:
- Control de acceso
- Validación de tickets/entradas
- Registro de asistencia
- Trazabilidad de productos
- Sistemas de pago o validación

## Metodología de Investigación

La investigación se estructura en las siguientes fases:

1. **Evaluación de Plataformas**: Análisis comparativo de 2-4 plataformas de hardware
2. **Selección de Lectores QR**: Evaluación de opciones de hardware de lectura
3. **Protocolos de Comunicación**: Análisis de opciones para transmisión de datos
4. **Análisis de Costos**: Evaluación económica de cada alternativa
5. **Recomendación Final**: Conclusión fundamentada con la mejor opción

## Criterios de Evaluación

Cada componente será evaluado considerando:
- **Desempeño**: Velocidad, confiabilidad, precisión
- **Costo**: Inversión inicial y operativa
- **Disponibilidad**: Facilidad de adquisición en el mercado local
- **Documentación**: Recursos y soporte de la comunidad
- **Escalabilidad**: Capacidad de crecimiento futuro
- **Consumo Energético**: Importante para operación con batería
- **Modularidad**: Facilidad para agregar funcionalidades futuras
