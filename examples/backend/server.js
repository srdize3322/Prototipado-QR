/**
 * Ejemplo de servidor backend Node.js con Express y MQTT
 * 
 * NOTA: Este es un ejemplo educativo con propósitos de demostración.
 * Para producción:
 * - Use variables de entorno para todas las credenciales (process.env)
 * - Implemente MQTTS (puerto 8883) en lugar de MQTT sin cifrar
 * - Use un gestor de secretos (AWS Secrets Manager, HashiCorp Vault)
 * - Implemente autenticación y autorización robusta
 * - Use HTTPS con certificados válidos
 * - Implemente rate limiting (express-rate-limit) en todos los endpoints
 * - Implemente validación de entrada completa
 * - Use helmet.js para headers de seguridad
 * 
 * Instalación:
 * npm install express mqtt body-parser pg dotenv
 * 
 * Para producción adicional:
 * npm install express-rate-limit helmet express-validator
 */

const express = require('express');
const mqtt = require('mqtt');
const bodyParser = require('body-parser');
const { Pool } = require('pg');

const app = express();
const PORT = process.env.PORT || 3000;

// Configuración de base de datos PostgreSQL
// PRODUCCIÓN: Usar process.env para todas estas variables
const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'qr_totem',
  password: process.env.DB_PASSWORD || 'password',  // CAMBIAR EN PRODUCCIÓN
  port: parseInt(process.env.DB_PORT) || 5432,
});

// Configuración MQTT
// PRODUCCIÓN: Usar MQTTS (mqtts://) y variables de entorno
const mqttClient = mqtt.connect(process.env.MQTT_URL || 'mqtt://broker.ejemplo.com:1883', {
  username: process.env.MQTT_USER || 'usuario',
  password: process.env.MQTT_PASSWORD || 'password'  // CAMBIAR EN PRODUCCIÓN
});

// Middleware
app.use(bodyParser.json());

// Conectar a MQTT
mqttClient.on('connect', () => {
  console.log('Conectado a broker MQTT');
  mqttClient.subscribe('totem/lecturas', (err) => {
    if (!err) {
      console.log('Suscrito a totem/lecturas');
    }
  });
});

// Manejar mensajes MQTT
mqttClient.on('message', async (topic, message) => {
  try {
    const data = JSON.parse(message.toString());
    console.log('Mensaje MQTT recibido:', data);
    
    // Procesar lectura QR
    const resultado = await procesarLecturaQR(data);
    
    // Enviar respuesta al dispositivo
    const respuesta = {
      type: 'scan_result',
      status: resultado.valido ? 'success' : 'error',
      message: resultado.mensaje,
      led_action: resultado.valido ? 'success' : 'error'
    };
    
    mqttClient.publish(`totem/respuesta/${data.device_id}`, JSON.stringify(respuesta));
    
  } catch (error) {
    console.error('Error procesando mensaje MQTT:', error);
  }
});

// API REST - Recibir lectura QR
app.post('/api/qr/scan', async (req, res) => {
  try {
    const { device_id, data } = req.body;
    const qr_code = data.qr_code;
    
    console.log(`Lectura QR de dispositivo ${device_id}: ${qr_code}`);
    
    // Procesar lectura
    const resultado = await procesarLecturaQR(req.body);
    
    res.json({
      success: resultado.valido,
      message: resultado.mensaje,
      data: resultado.data
    });
    
  } catch (error) {
    console.error('Error procesando lectura QR:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
});

// API REST - Obtener estadísticas
// PRODUCCIÓN: Implementar rate limiting (ej: express-rate-limit)
app.get('/api/stats', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        COUNT(*) as total_lecturas,
        COUNT(DISTINCT dispositivo_id) as dispositivos_activos,
        COUNT(CASE WHEN resultado = 'valido' THEN 1 END) as lecturas_exitosas,
        COUNT(CASE WHEN timestamp > NOW() - INTERVAL '24 hours' THEN 1 END) as lecturas_24h
      FROM lecturas_qr
    `);
    
    res.json({
      success: true,
      data: result.rows[0]
    });
    
  } catch (error) {
    console.error('Error obteniendo estadísticas:', error);
    res.status(500).json({
      success: false,
      message: 'Error obteniendo estadísticas'
    });
  }
});

// API REST - Obtener lecturas recientes
// PRODUCCIÓN: Implementar rate limiting y autenticación
app.get('/api/lecturas/recientes', async (req, res) => {
  try {
    const limit = req.query.limit || 50;
    const result = await pool.query(
      'SELECT * FROM lecturas_qr ORDER BY timestamp DESC LIMIT $1',
      [limit]
    );
    
    res.json({
      success: true,
      data: result.rows
    });
    
  } catch (error) {
    console.error('Error obteniendo lecturas:', error);
    res.status(500).json({
      success: false,
      message: 'Error obteniendo lecturas'
    });
  }
});

// Función para procesar lectura QR
async function procesarLecturaQR(mensaje) {
  const { device_id, data, timestamp } = mensaje;
  const qr_code = data.qr_code;
  
  // Validar código QR (lógica de negocio personalizada)
  const valido = validarCodigoQR(qr_code);
  
  // Guardar en base de datos
  try {
    await pool.query(
      `INSERT INTO lecturas_qr (dispositivo_id, codigo_qr, timestamp, resultado, metadata)
       VALUES ($1, $2, to_timestamp($3), $4, $5)`,
      [
        device_id,
        qr_code,
        timestamp,
        valido ? 'valido' : 'invalido',
        JSON.stringify(data)
      ]
    );
    
    return {
      valido: valido,
      mensaje: valido ? 'Código QR válido' : 'Código QR inválido',
      data: {
        timestamp: timestamp,
        device_id: device_id
      }
    };
    
  } catch (error) {
    console.error('Error guardando en BD:', error);
    throw error;
  }
}

// Función de validación de QR (ejemplo)
function validarCodigoQR(qr_code) {
  // Implementar lógica de validación según caso de uso
  // Ejemplo: validar formato, verificar en BD, etc.
  
  // Por ahora, validación simple
  if (!qr_code || qr_code.length < 5) {
    return false;
  }
  
  // Validar formato URL o patrón específico
  const urlPattern = /^https?:\/\/.+/;
  return urlPattern.test(qr_code);
}

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    mqtt_connected: mqttClient.connected
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en puerto ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
});

// Manejo de errores
process.on('SIGINT', () => {
  console.log('\nCerrando servidor...');
  mqttClient.end();
  pool.end();
  process.exit(0);
});
