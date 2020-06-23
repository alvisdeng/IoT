import org.eclipse.paho.client.mqttv3.MqttClient;
import org.eclipse.paho.client.mqttv3.MqttConnectOptions;
import org.eclipse.paho.client.mqttv3.MqttException;
import org.eclipse.paho.client.mqttv3.MqttMessage;
import org.eclipse.paho.client.mqttv3.persist.MemoryPersistence;

import java.util.Random;

public class DiceRollingClient {
    public static void main(String[] args) throws MqttException, InterruptedException {
        // use to generate random number
        Random random = new Random();

        // used to store the result of first roll
        int firstRoll;

        // used to store the result of second roll
        int secondRoll;

        // the topic sent to the broker
        String topic = "DiceRolling";

        // here we use a local mosquitto
        String broker = "tcp://localhost:1883";

        // clientId used to visit the broker
        String clientId = "jianpindPub";

        // set the ways to store clientId
        MemoryPersistence persistence = new MemoryPersistence();

        // create a ne MQTT client
        MqttClient client = new MqttClient(broker, clientId, persistence);

        // create connection parameters
        MqttConnectOptions mqtt = new MqttConnectOptions();

        // forget the status when restart or reconnect
        mqtt.setCleanSession(true);
        System.out.println("Connecting to broker: " + broker);
        client.connect(mqtt);
        System.out.println("Connected");

        while (true) {
            // the result of first roll
            firstRoll = random.nextInt(6) + 1;
            // the result of second roll
            secondRoll = random.nextInt(6) + 1;

            // transfer the result into json format
            String information = "{\"Die1\": \"" + firstRoll + "\", \"Die2\": \"" + secondRoll + "\"}";
            System.out.println("Sending a rolling message to topic " + topic);
            // transfer the json format into binary bytes
            MqttMessage message = new MqttMessage(information.getBytes());
            //send message in qos 1
            message.setQos(1);
            //publish the information into MQTT broker
            System.out.println("Publishing message: " + information);
            client.publish(topic, message);
            System.out.println("Message published");
            //send message 1 second per time
            Thread.sleep(1000);
        }
    }
}