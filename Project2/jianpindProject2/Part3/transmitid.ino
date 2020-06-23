// This #include statement was automatically added by the Particle IDE.
#include <MQTT.h>

// the bubble will light
int led1 = D7;

void callback(char* topic, byte* payload, unsigned int length);

MQTT client("broker.hivemq.com", 1883, callback);

// this function handle received message
void callback(char* topic, byte* payload, unsigned int length) {
}


void setup() {
    // set as output
    pinMode(led1, OUTPUT);
    // connect to the server
    client.connect("jianpindPub");
}

// This function runs over and over again in a continuous loop
void loop() {
    // send info every 5 seconds
    delay(5000);
    
    if (client.isConnected()){
        // publish the info to the broker
        client.publish("student/id","{\"name\":\"Jianping Deng\",\"URL\":\"http://www.andrew.cmu.edu/user/jianpind\"}");
        // light on
        digitalWrite(led1, HIGH);
        // light lasts for one second
        delay(1000);
        // light off
        digitalWrite(led1, LOW);
        // continue loops
        client.loop();
    }
}