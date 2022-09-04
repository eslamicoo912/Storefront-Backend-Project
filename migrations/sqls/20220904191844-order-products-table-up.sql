/* Replace with your SQL commands */
CREATE TABLE order_products(
    id SERIAL PRIMARY KEY,
    orderId BIGINT REFERENCES orders(id),
    productId BIGINT REFERENCES products(id)
)