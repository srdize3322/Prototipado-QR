# Ejemplos de Código

Este directorio contiene ejemplos de código de referencia para implementar el módulo lector QR.

## ⚠️ Aviso Importante

**Estos son ejemplos educativos con fines de demostración y aprendizaje.**

Para implementaciones de producción, debe:
- ❌ **NO usar credenciales hardcodeadas** en el código
- ✅ Usar variables de entorno para configuración sensible
- ✅ Implementar protocolos seguros (HTTPS, MQTTS)
- ✅ Usar gestores de secretos (AWS Secrets Manager, HashiCorp Vault)
- ✅ Implementar autenticación y autorización robusta
- ✅ Validar y sanitizar todas las entradas
- ✅ Implementar manejo de errores completo
- ✅ Usar logging estructurado
- ✅ Implementar rate limiting

## Estructura

- `esp32/`: Ejemplos para ESP32 con módulo QR GM65
- `raspberry-pi/`: Ejemplos para Raspberry Pi con webcam USB
- `backend/`: Ejemplos de código backend (Node.js + Express + MQTT)
- `schemas/`: Esquemas JSON para formatos de mensajes

## Cómo Usar

1. **Revisar el código**: Lea el código para entender la estructura básica
2. **Adaptar a su caso**: Modifique según sus necesidades específicas
3. **Securizar**: Implemente las prácticas de seguridad mencionadas arriba
4. **Probar**: Pruebe exhaustivamente antes de desplegar

## Nota

Para implementaciones de producción completas, consultar los repositorios específicos de firmware y backend que implementan todas las mejores prácticas de seguridad y calidad de código.
