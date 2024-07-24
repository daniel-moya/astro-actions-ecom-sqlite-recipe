CREATE TABLE
  users (
    id integer PRIMARY KEY,
    full_name text,
    email text UNIQUE NOT NULL,
    avatar_url text,
    billing_address JSON,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

CREATE TABLE
  products (
    id text UNIQUE NOT NULL PRIMARY KEY,
    active boolean,
    name text,
    description text,
    image text,
    metadata JSON
  );

CREATE TABLE
  prices (
    id text UNIQUE NOT NULL PRIMARY KEY,
    product_id text,
    active boolean,
    description text,
    unit_amount integer,
    currency text,
    type integer,
    FOREIGN KEY (product_id) REFERENCES products (id)
  );
CREATE INDEX idx_prices_product_id ON prices (product_id);

CREATE TABLE
  cart_items (
    id integer UNIQUE NOT NULL PRIMARY KEY AUTOINCREMENT,
    user_id integer,
    price_id text,
    quantity integer NOT NULL CHECK (quantity > 0),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (id),
    FOREIGN KEY (price_id) REFERENCES prices (id)
  );
CREATE INDEX idx_cart_items_price_id ON cart_items (price_id);

CREATE TABLE
  orders (
    id integer UNIQUE NOT NULL PRIMARY KEY AUTOINCREMENT,
    user_id integer,
    shipping_email text NOT NULL,
    total_price float NOT NULL,
    order_status integer NOT NULL DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (id)
  );
CREATE INDEX idx_orders_user_id ON orders (user_id);

CREATE TABLE
  order_items (
    id integer UNIQUE NOT NULL PRIMARY KEY AUTOINCREMENT,
    order_id integer NOT NULL,
    product_id text NOT NULL,
    quantity int NOT NULL CHECK (quantity > 0),
    price_at_purchase NUMERIC NOT NULL,
    created_at timestamp,
    FOREIGN KEY (order_id) REFERENCES orders (id),
    FOREIGN KEY (product_id) REFERENCES products (id)
  );
CREATE INDEX idx_order_item_product_id ON order_items (product_id);
CREATE INDEX idx_order_item_order_id ON order_items (order_id);

CREATE TABLE
  customers (
    id integer UNIQUE NOT NULL PRIMARY KEY AUTOINCREMENT,
    stripe_customer_id text
  );


