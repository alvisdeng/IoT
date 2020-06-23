package developerworks.ajax.particle;


public class Photon {
    /**
    id of the photon
     */
    private String id;
    /**
    the time of last beat of photon
     */
    private String lastBeat;
    /**
    the state information about the connection between photon and our servlet
     */
    private String state;

    /**
     * Empty construction method
     */
    public Photon() {}

    /**
     * Construction method with parameters
     *
     * @param id photon id
     * @param lastBeat time of last heartbeat
     * @param state state information about the connection
     */
    public Photon(String id, String lastBeat, String state) {
        this.id = id;
        this.lastBeat = lastBeat;
        this.state = state;
    }

    /**
     * @return the id of photon
     */
    public String getID() {
        return id;
    }

    /**
     * Set the id of photon
     *
     * @param id photon id
     */
    public void setID(String id) {
        this.id = id;
    }

    /**
     * @return the time of last heartbeat
     */
    public String getLastBeat() {
        return lastBeat;
    }

    /**
     * Set the time of last heartbeat of photon objext
     *
     * @param lastBeat time of last heartbeat
     */
    public void setLastBeat(String lastBeat) {
        this.lastBeat = lastBeat;
    }

    /**
     * @return the state of connection
     */
    public String getState() {
        return state;
    }

    /**
     * Set the connection information to be sent to client
     *
     * @param state the state of connection between photon and servlet
     */
    public void setState(String state) {
        this.state = state;
    }

    /**
     * @return The encoded photon object
     */
    public String toJson() {
        StringBuilder json = new StringBuilder();
        json.append("{\n");
        json.append("\"generated\":" + "\"" + System.currentTimeMillis() + "\",\n");
        json.append("\"photonId\":" + "\"" + getID() + "\",\n");
        json.append("\"stateInfo\":" + "\"" + getState() + "\",\n");
        json.append("\"lastBeat\":" + "\"" + getLastBeat() + "\"\n");
        json.append("}");

        return json.toString();
    }
}
