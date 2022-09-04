/* Replace with your SQL commands */
CREATE TABLE orders(
    id SERIAL PRIMARY KEY,
    productId BIGINT REFERENCES products(id),
    quantity INTEGER,
    userId BIGINT REFERENCES users(id),
    status VARCHAR(64)
)