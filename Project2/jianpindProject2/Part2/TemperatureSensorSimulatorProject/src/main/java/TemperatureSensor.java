import org.eclipse.paho.client.mqttv3.MqttClient;
import org.eclipse.paho.client.mqttv3.MqttConnectOptions;
import org.eclipse.paho.client.mqttv3.MqttException;
import org.eclipse.paho.client.mqttv3.MqttMessage;
import org.eclipse.paho.client.mqttv3.persist.MemoryPersistence;

import java.util.Date;
import java.util.Random;

public class TemperatureSensor {


    public static void main(String[] args) throws MqttException, InterruptedException {
        // Used to create random number
        Random random = new Random();

        // Random temperature
        int temperature;

        // Cold, Nice or Hot
        String weather;

        // pittsburgh/temperature/coldTemps || pittsburgh/temperature/niceTemps || pittsburgh/temperature/hotTemps
        String topic = "";

        // Use local mosquitto
        String broker = "tcp://localhost:1883";

        // clientId used when visit the broker
        String clientId = "TemperatureSensor";

        // MemoryPersistence sets how the clientid is saved, the default is in memory.
        MemoryPersistence persistence = new MemoryPersistence();

        // Create client
        MqttClient client = new MqttClient(broker, clientId, persistence);

        // Create connection parameters
        MqttConnectOptions mqtt = new MqttConnectOptions();

        // Forget status on reboot and reconnection
        mqtt.setCleanSession(true);

        System.out.println("Connecting to broker: "+broker);
        client.connect(mqtt);
        System.out.println("Connected");

        while (true) {
            // random number
            temperature = (int)(random.nextDouble()*100);

            if (temperature >= 0 && temperature <= 45) {
                topic = "pittsburgh/temperature/coldTemps";
                weather = "cold";
            } else if (temperature > 45 && temperature <= 80) {
                topic = "pittsburgh/temperature/niceTemps";
                weather = "nice";
            } else {
                topic = "pittsburgh/temperature/hotTemps";
                weather = "hot";
            }

            // record timestamp
            long time = System.currentTimeMillis();
            String timeStamp = new Date(time).toString();

            // transfer message into json format
            String information = "{\"temperature\": \"" + temperature + "\", \"time\": \"" + timeStamp + "\"}";

            // output
            System.out.println("Sending a " + weather  + " temp message to topic " + topic);

            // transfer json into binary byte
            MqttMessage message = new MqttMessage(information.getBytes());

            // send message in QoS of 1
            message.setQos(1);

            System.out.println("Publishing message: It is " + weather +" out " + temperature +"Farenhite degrees at time: " + timeStamp);
            //publish the information into MQTT broker
            client.publish(topic, message);
            System.out.println("Message published");
            //send message 5 seconds per time
            Thread.sleep(5000);
        }
    }
}
