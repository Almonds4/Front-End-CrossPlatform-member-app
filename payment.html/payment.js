// Sample courses and exams with potential promotions. The actual list to be obtained from Courses table in the database.
const items = [
    { id: 1, name: "Math Course", price: 499, promotion: "10% Off", quantity: 1 },
    { id: 2, name: "Science Course", price: 499, promotion: "5% Off", quantity: 1 },
    { id: 3, name: "Math Exam", price: 499, promotion: "No Promotion", quantity: 1 },
    { id: 4, name: "Science Exam", price: 499, promotion: "No Promotion", quantity: 1 }
];

const cartItems = [];
const taxRate = 0.13;
const clientId = "YOUR_PAYPAL_CLIENT_ID";

// Update cart display
function updateCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = '';

    let subTotal = 0;
    let totalPromotions = 0;

    cartItems.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('item');

        itemDiv.innerHTML = `
            <span>${item.name}</span>
            <span>Price: $${item.price.toFixed(2)}</span>
            <span>Quantity: ${item.quantity}</span>
            <span>Promotion: ${item.promotion}</span>
            <span>Total: $${(item.price * item.quantity).toFixed(2)}</span>
        `;

        cartItemsContainer.appendChild(itemDiv);
        subTotal += item.price * item.quantity;

        if (item.promotion !== "No Promotion") {
            let discount = 0;
            if (item.promotion.includes('%')) {
                discount = parseFloat(item.promotion) / 100 * item.price * item.quantity;
            } else if (item.promotion.includes('$')) {
                discount = parseFloat(item.promotion.replace('$', '')) * item.quantity;
            }
            return acc + discount;
        }
        
    });

    const tax = (subTotal - totalPromotions) * taxRate;
    const finalTotal = subTotal - totalPromotions + tax;

    document.getElementById('sub-total').textContent = subTotal.toFixed(2);
    document.getElementById('promotions').textContent = totalPromotions.toFixed(2);
    document.getElementById('tax').textContent = tax.toFixed(2);
    document.getElementById('total').textContent = finalTotal.toFixed(2);

    // Save updated cart to localStorage -- The cart items remain intact even if the page reloads.
    localStorage.setItem("cart", JSON.stringify(cartItems));

    // Re-render PayPal buttons with updated total
    renderPayPalButton(finalTotal);
}

// Add item to cart when clicking on the "Edit Cart" button
document.getElementById('edit-cart-btn').addEventListener('click', () => {
    const randomItem = items[Math.floor(Math.random() * items.length)];
    cartItems.push(randomItem);
    updateCart();
});

// PayPal button integration
paypal.Buttons({
    createOrder: function(data, actions) {
        const subTotalAmount = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
        const totalPromotions = cartItems.reduce((acc, item) => {
            if (item.promotion !== "No Promotion") {
                const discount = item.promotion.includes('%') ? parseFloat(item.promotion) / 100 : 0;
                return acc + item.price * item.quantity * discount;
            }
            return acc;
        }, 0); 

        
        const tax = (subTotalAmount - totalPromotions) * taxRate;
        const finalTotal = subTotalAmount - totalPromotions + tax;

        return actions.order.create({
            purchase_units: [{
                amount: {
                    value: finalTotal.toFixed(2)
                }
            }]
        });
    },
    onApprove: function(data, actions) {
        return actions.order.capture().then(function(details) {
            alert('Payment Successful! Thank you for your purchase, ' + details.payer.name.given_name);
            cartItems.length = 0; // Empty cart
            updateCart();
        });
    },
    onError: function(err) {
        alert('Payment failed. Please try again.');
    }
}).render('#paypal-button-container');


    const orderSummary = `
        Sub Total: $${document.getElementById('sub-total').textContent}
        Promotions: -$${document.getElementById('promotions').textContent}
        Tax (13%): $${document.getElementById('tax').textContent}
        Total: $${document.getElementById('total').textContent}
    `;

<script src="https://www.paypal.com/sdk/js?client-id=YOUR_CLIENT_ID&currency=CAD">
</script>
