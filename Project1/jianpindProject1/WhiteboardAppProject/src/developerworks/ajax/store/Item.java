// package information
package developerworks.ajax.store;

// In business calculations, we require high numerical accuracy and must use the BigInteger class and BigDecimal class,
// which supports fixed points of any precision and can be used to accurately calculate currency values.
import java.math.BigDecimal;

/**
 * Class used for recording the properties of items
 */
public class Item {
    /**
     * The value is used for identifying items
     */
    private String code;
    /**
     * The name of the item
     */
    private String name;
    /**
     * The description of the item
     */
    private String description;
    /**
     * The price of the item
     */
    private int price;

    /**
     * Construction method with parameters. Usually used to initiate objects.
     * @param code Unique code to identify different items
     * @param name The name of a specific item
     * @param description The description of corresponding item
     * @param price The price of corresponding item
     */
    public Item(String code, String name, String description, int price) {
        this.code = code;
        this.name = name;
        this.description = description;
        this.price = price;
    }

    /**
     * @return The code of the item
     */
    public String getCode() {
        return code;
    }

    /**
     * @return The name of the item
     */
    public String getName() {
        return name;
    }

    /**
     * @return The description of the item
     */
    public String getDescription() {
        return description;
    }

    /**
     * @return The price of the item (Original input, no decimal)
     */
    public int getPrice() {
        return price;
    }

    /**
     * Move the decimal point two places left.
     * @return The price of the item (Decimal format)
     */
    public String getFormattedPrice() {
        return "$" + new BigDecimal(price).movePointLeft(2);
    }

    /**
     * Rewrite the equals method
     * @param o An object
     * @return Returns true if both objects have the same memory address; Return false if they don't.
     */
    public boolean equals(Object o) {
        if (this == o) return true;
        if (this == null) return false;
        if (!(o instanceof Item)) return false;
        return ((Item) o).getCode().equals(this.code);
    }
}

