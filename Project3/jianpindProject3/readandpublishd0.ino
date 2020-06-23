int led1 = D7;

void setup() {
    // enable the light on when msg is sent
    pinMode(led1, OUTPUT);
    // used to read value from pin
    pinMode(D0,INPUT_PULLDOWN);
}

void loop() {
    if(digitalRead(D0) == LOW){
        // publish 1 when the value of D0 is low
        Particle.publish("OnOrOffValue", "0", PRIVATE);
    } else {
        // publish 1 when the value of D0 is high
        Particle.publish("OnOrOffValue", "1", PRIVATE);
    }
    // light on
    digitalWrite(led1, HIGH);
    delay(1000);
    // light off
    digitalWrite(led1, LOW);
    delay(29000);
}
