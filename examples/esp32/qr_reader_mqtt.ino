/*
 * Ejemplo básico de lectura QR con ESP32 y módulo GM65
 * 
 * NOTA: Este es un ejemplo educativo con propósitos de demostración.
 * Para producción:
 * - Use WiFiManager para configuración de credenciales
 * - Almacene credenciales en EEPROM/SPIFFS
 * - Use variables de entorno o configuración segura
 * - Implemente MQTTS (puerto 8883) en lugar de MQTT sin cifrar
 * - Use NTP para timestamps reales en lugar de millis()
 * 
 * Hardware:
 * - ESP32 DevKit
 * - Módulo GM65 conectado a UART2
 * - LEDs en pines 2, 4, 5, 18
 * 
 * Librerías necesarias:
 * - WiFi.h
 * - PubSubClient.h (MQTT)
 * - ArduinoJson.h
 */

#include <WiFi.h>
#include <PubSubClient.h>
#include <ArduinoJson.h>

// Configuración Wi-Fi (CAMBIAR PARA PRODUCCIÓN - usar WiFiManager o EEPROM)
const char* ssid = "TU_SSID";
const char* password = "TU_PASSWORD";

// Configuración MQTT (CAMBIAR PARA PRODUCCIÓN - usar variables de entorno)
const char* mqtt_server = "broker.ejemplo.com";
const int mqtt_port = 1883;  // Usar 8883 para MQTTS en producción
const char* mqtt_user = "usuario";
const char* mqtt_pass = "password";
const char* mqtt_topic_publish = "totem/lecturas";
const char* mqtt_topic_subscribe = "totem/comandos";

// Pines de LEDs
const int LED_VERDE = 2;
const int LED_AMARILLO = 4;
const int LED_ROJO = 5;
const int LED_AZUL = 18;

// UART para módulo GM65
HardwareSerial GM65Serial(2);  // UART2
const int RX_PIN = 16;
const int TX_PIN = 17;

// Clientes
WiFiClient espClient;
PubSubClient mqttClient(espClient);

// Variables globales
String deviceID = "TOTEM_001";
unsigned long lastReconnectAttempt = 0;

void setup() {
  Serial.begin(115200);
  
  // Configurar LEDs
  pinMode(LED_VERDE, OUTPUT);
  pinMode(LED_AMARILLO, OUTPUT);
  pinMode(LED_ROJO, OUTPUT);
  pinMode(LED_AZUL, OUTPUT);
  
  // Inicializar UART para GM65
  GM65Serial.begin(9600, SERIAL_8N1, RX_PIN, TX_PIN);
  
  // Conectar Wi-Fi
  conectarWiFi();
  
  // Configurar MQTT
  mqttClient.setServer(mqtt_server, mqtt_port);
  mqttClient.setCallback(mqttCallback);
  
  estadoListo();
}

void loop() {
  // Mantener conexión MQTT
  if (!mqttClient.connected()) {
    unsigned long now = millis();
    if (now - lastReconnectAttempt > 5000) {
      lastReconnectAttempt = now;
      if (reconnectMQTT()) {
        lastReconnectAttempt = 0;
      }
    }
  } else {
    mqttClient.loop();
  }
  
  // Leer código QR del módulo GM65
  if (GM65Serial.available()) {
    estadoLeyendo();
    String qrCode = GM65Serial.readStringUntil('\n');
    qrCode.trim();
    
    if (qrCode.length() > 0) {
      Serial.println("QR leído: " + qrCode);
      procesarQR(qrCode);
    }
  }
}

void conectarWiFi() {
  Serial.print("Conectando a Wi-Fi");
  WiFi.begin(ssid, password);
  
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
    parpadearLED(LED_AZUL, 100);
  }
  
  Serial.println("\nWi-Fi conectado");
  Serial.println("IP: " + WiFi.localIP().toString());
}

boolean reconnectMQTT() {
  Serial.print("Intentando conexión MQTT...");
  
  if (mqttClient.connect(deviceID.c_str(), mqtt_user, mqtt_pass)) {
    Serial.println("conectado");
    mqttClient.subscribe(mqtt_topic_subscribe);
    estadoListo();
    return true;
  } else {
    Serial.print("falló, rc=");
    Serial.println(mqttClient.state());
    estadoError();
    return false;
  }
}

void mqttCallback(char* topic, byte* payload, unsigned int length) {
  Serial.print("Mensaje recibido [");
  Serial.print(topic);
  Serial.print("]: ");
  
  String message;
  for (int i = 0; i < length; i++) {
    message += (char)payload[i];
  }
  Serial.println(message);
  
  // Procesar comandos del servidor
  StaticJsonDocument<200> doc;
  DeserializationError error = deserializeJson(doc, message);
  
  if (!error) {
    const char* cmd = doc["command"];
    if (strcmp(cmd, "reiniciar") == 0) {
      ESP.restart();
    }
  }
}

void procesarQR(String qrCode) {
  // Crear mensaje JSON
  StaticJsonDocument<300> doc;
  doc["type"] = "qr_scan";
  doc["device_id"] = deviceID;
  doc["timestamp"] = millis() / 1000;
  doc["data"]["qr_code"] = qrCode;
  doc["data"]["signal_strength"] = WiFi.RSSI();
  
  String jsonString;
  serializeJson(doc, jsonString);
  
  // Publicar por MQTT
  if (mqttClient.connected()) {
    if (mqttClient.publish(mqtt_topic_publish, jsonString.c_str())) {
      Serial.println("Mensaje enviado exitosamente");
      estadoExito();
    } else {
      Serial.println("Error al enviar mensaje");
      estadoError();
    }
  } else {
    Serial.println("MQTT no conectado");
    estadoError();
  }
}

// Funciones de control de LEDs
void estadoListo() {
  apagarTodosLEDs();
  digitalWrite(LED_VERDE, HIGH);
}

void estadoLeyendo() {
  apagarTodosLEDs();
  digitalWrite(LED_AZUL, HIGH);
}

void estadoExito() {
  apagarTodosLEDs();
  for (int i = 0; i < 3; i++) {
    digitalWrite(LED_VERDE, HIGH);
    delay(200);
    digitalWrite(LED_VERDE, LOW);
    delay(200);
  }
  estadoListo();
}

void estadoError() {
  apagarTodosLEDs();
  for (int i = 0; i < 2; i++) {
    digitalWrite(LED_ROJO, HIGH);
    delay(300);
    digitalWrite(LED_ROJO, LOW);
    delay(300);
  }
  estadoListo();
}

void apagarTodosLEDs() {
  digitalWrite(LED_VERDE, LOW);
  digitalWrite(LED_AMARILLO, LOW);
  digitalWrite(LED_ROJO, LOW);
  digitalWrite(LED_AZUL, LOW);
}

void parpadearLED(int pin, int duracion) {
  digitalWrite(pin, HIGH);
  delay(duracion);
  digitalWrite(pin, LOW);
}
