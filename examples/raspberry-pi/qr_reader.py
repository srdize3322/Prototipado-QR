#!/usr/bin/env python3
"""
Ejemplo básico de lectura QR con Raspberry Pi y webcam USB

NOTA: Este es un ejemplo educativo con propósitos de demostración.
Para producción:
- Cargue credenciales desde variables de entorno (os.getenv())
- Use archivos de configuración seguros (config.ini, .env)
- Implemente manejo de errores robusto
- Use logging en lugar de print
- Haga el debounce_time configurable

Requiere: OpenCV, ZBar, requests

Instalación:
sudo apt-get install libzbar0 python3-opencv
pip3 install pyzbar requests
"""

import cv2
import time
import requests
from pyzbar import pyzbar
from gpiozero import LED
from datetime import datetime

# Configuración (CAMBIAR PARA PRODUCCIÓN - usar variables de entorno)
DEVICE_ID = "TOTEM_001"
API_URL = "https://api.ejemplo.com/qr/scan"
API_TOKEN = "tu_token_aqui"  # Usar os.getenv('API_TOKEN') en producción
CAMERA_INDEX = 0
DEBOUNCE_TIME = 3  # Segundos entre lecturas del mismo QR

# LEDs en GPIO
led_verde = LED(17)
led_amarillo = LED(27)
led_rojo = LED(22)
led_azul = LED(23)

class QRReader:
    def __init__(self):
        self.camera = cv2.VideoCapture(CAMERA_INDEX)
        self.camera.set(cv2.CAP_PROP_FRAME_WIDTH, 640)
        self.camera.set(cv2.CAP_PROP_FRAME_HEIGHT, 480)
        self.ultimo_qr = None
        self.ultimo_tiempo = 0
        
    def leer_qr(self):
        """Lee un código QR de la cámara"""
        ret, frame = self.camera.read()
        if not ret:
            return None
            
        # Decodificar códigos QR
        codigos = pyzbar.decode(frame)
        
        for codigo in codigos:
            qr_data = codigo.data.decode('utf-8')
            
            # Evitar lecturas duplicadas (debounce)
            tiempo_actual = time.time()
            if qr_data == self.ultimo_qr and (tiempo_actual - self.ultimo_tiempo) < DEBOUNCE_TIME:
                continue
                
            self.ultimo_qr = qr_data
            self.ultimo_tiempo = tiempo_actual
            return qr_data
            
        return None
    
    def cerrar(self):
        """Liberar recursos de la cámara"""
        self.camera.release()

def estado_listo():
    """LED verde fijo - Listo para escanear"""
    led_verde.on()
    led_amarillo.off()
    led_rojo.off()
    led_azul.off()

def estado_leyendo():
    """LED azul parpadeando - Procesando"""
    led_verde.off()
    led_amarillo.off()
    led_rojo.off()
    led_azul.on()

def estado_exito():
    """LED verde parpadeando 3 veces - Éxito"""
    for _ in range(3):
        led_verde.on()
        time.sleep(0.2)
        led_verde.off()
        time.sleep(0.2)
    estado_listo()

def estado_error():
    """LED rojo parpadeando 2 veces - Error"""
    for _ in range(2):
        led_rojo.on()
        time.sleep(0.3)
        led_rojo.off()
        time.sleep(0.3)
    estado_listo()

def enviar_a_servidor(qr_code):
    """Envía el código QR al servidor"""
    payload = {
        "type": "qr_scan",
        "device_id": DEVICE_ID,
        "timestamp": int(time.time()),
        "data": {
            "qr_code": qr_code
        }
    }
    
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {API_TOKEN}"
    }
    
    try:
        response = requests.post(API_URL, json=payload, headers=headers, timeout=5)
        return response.status_code == 200
    except requests.exceptions.RequestException as e:
        print(f"Error al enviar al servidor: {e}")
        return False

def main():
    """Función principal"""
    print("Iniciando lector QR...")
    reader = QRReader()
    estado_listo()
    
    print("Sistema listo. Esperando códigos QR...")
    
    try:
        while True:
            qr_code = reader.leer_qr()
            
            if qr_code:
                print(f"[{datetime.now().strftime('%Y-%m-%d %H:%M:%S')}] QR detectado: {qr_code}")
                estado_leyendo()
                
                # Enviar al servidor
                if enviar_a_servidor(qr_code):
                    print("Enviado exitosamente")
                    estado_exito()
                else:
                    print("Error al enviar")
                    estado_error()
            
            # Pequeña pausa para no saturar CPU
            time.sleep(0.1)
            
    except KeyboardInterrupt:
        print("\nDeteniendo lector QR...")
    finally:
        reader.cerrar()
        # Apagar todos los LEDs
        led_verde.off()
        led_amarillo.off()
        led_rojo.off()
        led_azul.off()
        print("Lector QR detenido")

if __name__ == "__main__":
    main()
