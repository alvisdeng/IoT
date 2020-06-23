// package information
package developerworks.ajax.store;

// In order to HashMap
import java.util.*;

/**
 * Class used to register the products
 */
public class Catalog {
    /**
     * We used hashmap to store the instances of items. The key is the item.code, the value is the instance.
     */
    private static Map<String, Item> items;

    /** static{} is executed once when the class is loaded. Used to register the items */
    static {
        items = new HashMap<String, Item>();
        items.put("hat001", new Item("hat001", "Hat", "Stylish bowler hat (SALE!)", 1999));
        items.put("dog001", new Item("dog001", "Dog", "Chocolate labrador puppy", 7999));
        items.put("sou001", new Item("sou001", "Soup", "Can of tasty tomato soup", 199));
        items.put("cha001", new Item("cha001", "Chair", "Swivelling office chair", 4999));
        items.put("str001", new Item("str001", "String", "Metric tonne of bailing twine", 1999));
        items.put("qua001", new Item("qua001", "Quark", "Everyone's favorite sub-atomic particle", 49));
    }

    /**
     * @return All items included
     */
    public Collection<Item> getAllItems() {
        return items.values();
    }

    /**
     * @param itemCode The unique code of an item
     * @return Return true if the input item is in the items hashmap
     */
    public boolean containsItem(String itemCode) {
        return items.containsKey(itemCode);
    }

    /**
     * @param itemCode The unique code of an item
     * @return Return the item object for the specified item code
     */
    public Item getItem(String itemCode) {
        return items.get(itemCode);
    }

}
