document.addEventListener("alpine:init", () => {
  Alpine.data("products", () => ({
    items: [
      { id: 1, name: "Threesretto Arabica", img: "1.jpg", price: 127000 },
      { id: 2, name: "Threesretto Robusta", img: "2.jpg", price: 117000 },
      { id: 3, name: "Threesretto Blend", img: "3.jpg", price: 132000 },
      { id: 4, name: "Threesretto Liberica", img: "4.jpg", price: 135000 },
      { id: 5, name: "Threesretto Excelsa", img: "5.jpg", price: 122000 },
    ],
  }));

  Alpine.store("cart", {
    items: [],
    total: 0,
    quantity: 0,
    add(newItem) {
      // Check if there is a same product in a cart
      const cartItem = this.items.find((item) => item.id === newItem.id);

      // If not
      if (!cartItem) {
        this.items.push({ ...newItem, quantity: 1, total: newItem.price });
        this.quantity++;
        this.total += newItem.price;
      } else {
        // If the item is available, check whether the item is different or the same as the one in the cart
        this.items = this.items.map((item) => {
          // If the item are different
          if (item.id !== newItem.id) {
            return item;
          } else {
            // If the item already exists, add quantity and total
            item.quantity++;
            item.total = item.price * item.quantity;
            this.quantity++;
            this.total += item.price;
            return item;
          }
        });
      }
    },
    remove(id) {
      // Take the item you want to remove based on its ID
      const cartItem = this.items.find((item) => item.id === id);

      // If item is more than 1
      if (cartItem.quantity > 1) {
        // Browse one by one
        this.items = this.items.map((item) => {
          // If not the item you clicked on
          if (item.id !== id) {
            return item;
          } else {
            item.quantity--;
            item.total = item.price * item.quantity;
            this.quantity--;
            this.total -= item.price;
            return item;
          }
        });
      } else if (cartItem.quantity === 1) {
        // If there is 1 item remaining
        this.items = this.items.filter((item) => item.id !== id);
        this.quantity--;
        this.total -= cartItem.price;
      }
    },
  });
});

// Convert to Rupiah
const rupiah = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(number);
};
