#include <WiFi.h>
#include <HTTPClient.h>
#include <SPI.h>
#include <MFRC522.h>
#include <LiquidCrystal_I2C.h>

LiquidCrystal_I2C lcd(0x27, 16, 2);
#define SS_PIN 5   // Pino SDA conectado ao GPIO 5 do ESP32
#define RST_PIN 22 // Pino RST conectado ao GPIO 22 do ESP32

int ledAzul = 15;
int ledVerde = 2;
int ledVermelha = 4;
int buzzer = 14;
int botao = 12;

MFRC522 mfrc522(SS_PIN, RST_PIN); // Cria a instância do RC522

const char *ssid = "WIFI_DEV_CONVIDADO";
const char *password = "aula0411";
const char *serverCadastro = "http://192.168.0.227:3000/presenca";
const char *serverLeitura = "http://192.168.0.227:3000/presenca";

void setup()
{
  Serial.begin(115200); // Inicializa a comunicação serial
  pinMode(ledAzul, OUTPUT);
  pinMode(ledVerde, OUTPUT);
  pinMode(ledVermelha, OUTPUT);
  pinMode(buzzer, OUTPUT);
  pinMode(botao, INPUT_PULLUP);
  Wire.begin();
  lcd.init();
  lcd.backlight();
  //lcd.setCursor(0, 0);
  //lcd.print("Iniciando");
  delay(1000);
  SPI.begin(18, 19, 23, 5); // SCK=18, MISO=19, MOSI=23, SS=5 (SPI com ESP32)
  mfrc522.PCD_Init();       // Inicializa o RC522
  Serial.println("Aproxime um cartão RFID...");

  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED)
  {
    delay(500);
    Serial.print(".");
  }
  lcd.setCursor(0, 0);
  Serial.println("Wi-Fi conectado!");
  lcd.print("Wifi Conectado");
  Serial.println(WiFi.localIP());
  lcd.setCursor(0, 1);
  lcd.print(WiFi.localIP());
}

void loop()
{
  if (digitalRead(botao) == LOW)
  {
    digitalWrite(ledVermelha, HIGH);
    digitalWrite(ledAzul, LOW);
    digitalWrite(ledVerde, LOW);
  }
  else
  {
    digitalWrite(ledAzul, HIGH);
    digitalWrite(ledVerde, LOW);
    digitalWrite(ledVermelha, LOW);
  }

  // Verifica se há um cartão/tag presente
  if (!mfrc522.PICC_IsNewCardPresent())
  {
    return;
  }

  // Tenta ler o cartão/tag
  if (!mfrc522.PICC_ReadCardSerial())
  {
    return;
  }

  String uid = "";
  // Exibe o UID do cartão/tag
  for (byte i = 0; i < mfrc522.uid.size; i++)
  {
    uid += String(mfrc522.uid.uidByte[i], HEX);
  }
  Serial.print("UID do Cartão: ");
  Serial.println(uid);
  lcd.setCursor(0, 0);
  lcd.print("Cartao Lido:");
  lcd.setCursor(0, 1);
  lcd.print(uid);

  tone(buzzer, 1000, 500);

  if (WiFi.status() == WL_CONNECTED)
  {
    digitalWrite(ledAzul, LOW);
    digitalWrite(ledVerde, HIGH);

    HTTPClient http;
    String servidor;
    if (digitalRead(botao) == LOW)
    {
      servidor = serverCadastro;
    }
    else
    {
      servidor = serverLeitura;
    }
    http.begin(servidor);
    http.addHeader("Content-Type", "application/json");

    String jsonPayload = "{\"uid\": \"" + uid + "\"}";
    int httpResponseCode = http.POST(jsonPayload);

    if (httpResponseCode > 0)
    {
      Serial.println("UID enviado com sucesso!");
    }
    else
    {
      Serial.print("Erro ao enviar UID: ");
      Serial.println(httpResponseCode);
    }
    http.end();
  }

  delay(500); // Pequena pausa para evitar leituras duplicadas
}
