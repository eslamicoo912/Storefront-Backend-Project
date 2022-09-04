/* Replace with your SQL commands */
CREATE TABLE orders(
    id SERIAL PRIMARY KEY,
    productId BIGINT REFERENCES products(id) NOT NULL,
    quantity INTEGER,
    userId BIGINT REFERENCES users(id) NOT NULL,
    status VARCHAR(64)
)