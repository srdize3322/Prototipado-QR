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

## Propuestas técnicas
En la carpeta `proposals/` se presentan distintas propuestas de implementación del prototipo.

Cada propuesta:
- Es independiente
- Describe una posible forma de construir el módulo
- Incluye componentes principales, costos aproximados y pros/cons
- No es definitiva

El objetivo es **compararlas y elegir una para avanzar**.

## Criterios generales
- Componentes disponibles comercialmente
- Idealmente comprables por AliExpress u otro marketplace similar
- Costo total del prototipo preferiblemente bajo USD 150
- Posibilidad de envío a Chile
- Simplicidad de implementación

## Estado del proyecto
Proyecto en fase de **investigación y prototipado**.
