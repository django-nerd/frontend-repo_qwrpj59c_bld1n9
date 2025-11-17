-- SQL migration (simplified); prefer Prisma migrate for full generation
CREATE TABLE IF NOT EXISTS users (
  id text PRIMARY KEY,
  email text UNIQUE NOT NULL,
  password text NOT NULL,
  name text,
  role text DEFAULT 'CUSTOMER',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS categories (
  id text PRIMARY KEY,
  name text NOT NULL,
  slug text UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS products (
  id text PRIMARY KEY,
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  type text NOT NULL,
  short_description text,
  description text,
  price numeric(10,2) NOT NULL,
  sku text UNIQUE NOT NULL,
  stock int DEFAULT 0,
  potency_mg int,
  category_id text REFERENCES categories(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS product_images (
  id text PRIMARY KEY,
  url text NOT NULL,
  alt text,
  product_id text REFERENCES products(id)
);

CREATE TABLE IF NOT EXISTS coas (
  id text PRIMARY KEY,
  url text NOT NULL,
  lab text,
  test_date timestamptz,
  product_id text REFERENCES products(id)
);

CREATE TABLE IF NOT EXISTS reviews (
  id text PRIMARY KEY,
  rating int NOT NULL,
  title text,
  body text,
  author text,
  product_id text REFERENCES products(id),
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS promo_codes (
  id text PRIMARY KEY,
  code text UNIQUE NOT NULL,
  amount_off numeric(10,2),
  percent_off int,
  starts_at timestamptz,
  ends_at timestamptz,
  active boolean DEFAULT true
);
