
-- Script SQL para criação das tabelas do sistema PDV
-- Sistema modular para bares, restaurantes, distribuidoras e aluguel de festa

-- Criação do banco de dados
CREATE DATABASE IF NOT EXISTS pdv_system CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE pdv_system;

-- Tabela de empresas
CREATE TABLE companies (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    name VARCHAR(255) NOT NULL,
    cnpj VARCHAR(18) UNIQUE,
    address TEXT,
    phone VARCHAR(20),
    email VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabela de usuários
CREATE TABLE users (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    role ENUM('admin_sistema', 'admin_empresa', 'gerente', 'supervisor', 'caixa', 'atendente') NOT NULL,
    company_id VARCHAR(36) NOT NULL,
    active BOOLEAN DEFAULT TRUE,
    last_login TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE CASCADE
);

-- Tabela de categorias de produtos
CREATE TABLE categories (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    company_id VARCHAR(36) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE CASCADE
);

-- Tabela de produtos
CREATE TABLE products (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    cost_price DECIMAL(10,2) NOT NULL,
    barcode VARCHAR(100) UNIQUE,
    category_id VARCHAR(36) NOT NULL,
    stock_quantity INT DEFAULT 0,
    min_stock INT DEFAULT 0,
    active BOOLEAN DEFAULT TRUE,
    company_id VARCHAR(36) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE RESTRICT,
    FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE CASCADE
);

-- Tabela de mesas
CREATE TABLE tables_restaurant (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    number INT NOT NULL,
    capacity INT NOT NULL,
    status ENUM('available', 'occupied', 'reserved', 'cleaning') DEFAULT 'available',
    current_order_id VARCHAR(36) NULL,
    company_id VARCHAR(36) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE CASCADE,
    UNIQUE KEY unique_table_company (number, company_id)
);

-- Tabela de pedidos
CREATE TABLE orders (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    table_id VARCHAR(36) NULL,
    customer_name VARCHAR(255),
    status ENUM('open', 'preparing', 'ready', 'completed', 'cancelled') DEFAULT 'open',
    total DECIMAL(10,2) DEFAULT 0.00,
    payment_method VARCHAR(50),
    user_id VARCHAR(36) NOT NULL,
    company_id VARCHAR(36) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (table_id) REFERENCES tables_restaurant(id) ON DELETE SET NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE RESTRICT,
    FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE CASCADE
);

-- Tabela de itens do pedido
CREATE TABLE order_items (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    order_id VARCHAR(36) NOT NULL,
    product_id VARCHAR(36) NOT NULL,
    quantity INT NOT NULL,
    unit_price DECIMAL(10,2) NOT NULL,
    subtotal DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE RESTRICT
);

-- Tabela de vendas diretas (PDV)
CREATE TABLE sales (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    total DECIMAL(10,2) NOT NULL,
    payment_method VARCHAR(50) NOT NULL,
    user_id VARCHAR(36) NOT NULL,
    company_id VARCHAR(36) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE RESTRICT,
    FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE CASCADE
);

-- Tabela de itens da venda
CREATE TABLE sale_items (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    sale_id VARCHAR(36) NOT NULL,
    product_id VARCHAR(36) NOT NULL,
    quantity INT NOT NULL,
    unit_price DECIMAL(10,2) NOT NULL,
    subtotal DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (sale_id) REFERENCES sales(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE RESTRICT
);

-- Tabela de itens para aluguel
CREATE TABLE rental_items (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    daily_price DECIMAL(10,2) NOT NULL,
    category VARCHAR(100) NOT NULL,
    available_quantity INT DEFAULT 0,
    total_quantity INT DEFAULT 0,
    company_id VARCHAR(36) NOT NULL,
    image_url VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE CASCADE
);

-- Tabela de aluguéis
CREATE TABLE rentals (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    customer_name VARCHAR(255) NOT NULL,
    customer_phone VARCHAR(20) NOT NULL,
    customer_email VARCHAR(255),
    event_date DATE NOT NULL,
    pickup_date DATE NOT NULL,
    return_date DATE NOT NULL,
    status ENUM('reserved', 'picked_up', 'returned', 'cancelled') DEFAULT 'reserved',
    total DECIMAL(10,2) NOT NULL,
    payment_status ENUM('pending', 'partial', 'paid') DEFAULT 'pending',
    user_id VARCHAR(36) NOT NULL,
    company_id VARCHAR(36) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE RESTRICT,
    FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE CASCADE
);

-- Tabela de itens do aluguel
CREATE TABLE rental_item_orders (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    rental_id VARCHAR(36) NOT NULL,
    rental_item_id VARCHAR(36) NOT NULL,
    quantity INT NOT NULL,
    daily_price DECIMAL(10,2) NOT NULL,
    days INT NOT NULL,
    subtotal DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (rental_id) REFERENCES rentals(id) ON DELETE CASCADE,
    FOREIGN KEY (rental_item_id) REFERENCES rental_items(id) ON DELETE RESTRICT
);

-- Tabela de movimentações de estoque
CREATE TABLE stock_movements (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    product_id VARCHAR(36) NOT NULL,
    type ENUM('entrada', 'saida', 'ajuste') NOT NULL,
    quantity INT NOT NULL,
    reason VARCHAR(255),
    user_id VARCHAR(36) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE RESTRICT
);

-- Atualizar foreign key na tabela tables_restaurant
ALTER TABLE tables_restaurant 
ADD CONSTRAINT fk_table_current_order 
FOREIGN KEY (current_order_id) REFERENCES orders(id) ON DELETE SET NULL;

-- Criar índices para melhor performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_company ON users(company_id);
CREATE INDEX idx_products_barcode ON products(barcode);
CREATE INDEX idx_products_company ON products(company_id);
CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_orders_table ON orders(table_id);
CREATE INDEX idx_orders_user ON orders(user_id);
CREATE INDEX idx_orders_company ON orders(company_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_sales_user ON sales(user_id);
CREATE INDEX idx_sales_company ON sales(company_id);
CREATE INDEX idx_rentals_company ON rentals(company_id);
CREATE INDEX idx_rentals_status ON rentals(status);
CREATE INDEX idx_stock_movements_product ON stock_movements(product_id);

-- Inserir dados iniciais
-- Empresa padrão
INSERT INTO companies (id, name, cnpj, address, phone, email) VALUES 
('company-1', 'Empresa Demo PDV', '12.345.678/0001-90', 'Rua Demo, 123', '(11) 99999-9999', 'contato@empresademo.com');

-- Usuário administrador inicial
INSERT INTO users (id, email, password_hash, name, role, company_id) VALUES 
('user-1', 'alesxandrocosta@gmail.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Alesxandro Costa', 'admin_sistema', 'company-1');

-- Categorias padrão
INSERT INTO categories (id, name, description, company_id) VALUES 
('cat-1', 'Bebidas', 'Bebidas em geral', 'company-1'),
('cat-2', 'Pratos', 'Pratos e comidas', 'company-1'),
('cat-3', 'Sobremesas', 'Sobremesas e doces', 'company-1'),
('cat-4', 'Petiscos', 'Petiscos e aperitivos', 'company-1');

-- Produtos de exemplo
INSERT INTO products (id, name, description, price, cost_price, barcode, category_id, stock_quantity, min_stock, company_id) VALUES 
('prod-1', 'Cerveja Heineken 600ml', 'Cerveja premium importada', 25.00, 18.00, '7891234567890', 'cat-1', 150, 20, 'company-1'),
('prod-2', 'Hambúrguer Especial', 'Hambúrguer artesanal 200g', 30.00, 15.00, '7891234567891', 'cat-2', 50, 10, 'company-1'),
('prod-3', 'Refrigerante Coca-Cola 350ml', 'Refrigerante gelado', 6.00, 3.50, '7891234567892', 'cat-1', 8, 15, 'company-1'),
('prod-4', 'Batata Frita', 'Porção de batata frita', 15.00, 8.00, '7891234567893', 'cat-4', 30, 5, 'company-1'),
('prod-5', 'Pudim de Leite', 'Pudim caseiro', 12.00, 6.00, '7891234567894', 'cat-3', 20, 5, 'company-1');

-- Mesas de exemplo
INSERT INTO tables_restaurant (id, number, capacity, company_id) VALUES 
('table-1', 1, 4, 'company-1'),
('table-2', 2, 4, 'company-1'),
('table-3', 3, 6, 'company-1'),
('table-4', 4, 2, 'company-1'),
('table-5', 5, 8, 'company-1'),
('table-6', 6, 4, 'company-1'),
('table-7', 7, 4, 'company-1'),
('table-8', 8, 6, 'company-1');

-- Itens para aluguel de exemplo
INSERT INTO rental_items (id, name, description, daily_price, category, available_quantity, total_quantity, company_id) VALUES 
('rental-1', 'Cadeira Plástica Branca', 'Cadeira plástica para eventos', 3.00, 'Mobiliário', 100, 100, 'company-1'),
('rental-2', 'Mesa Redonda 1,5m', 'Mesa redonda para 8 pessoas', 25.00, 'Mobiliário', 20, 20, 'company-1'),
('rental-3', 'Toalha de Mesa Branca', 'Toalha de mesa para eventos', 8.00, 'Decoração', 50, 50, 'company-1'),
('rental-4', 'Copo de Vidro 300ml', 'Copo de vidro para eventos', 1.50, 'Utensílios', 200, 200, 'company-1'),
('rental-5', 'Prato de Vidro', 'Prato de vidro para eventos', 2.00, 'Utensílios', 150, 150, 'company-1');

-- Usuários adicionais de exemplo
INSERT INTO users (id, email, password_hash, name, role, company_id) VALUES 
('user-2', 'gerente@empresademo.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Maria Silva', 'gerente', 'company-1'),
('user-3', 'caixa1@empresademo.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'João Santos', 'caixa', 'company-1'),
('user-4', 'atendente1@empresademo.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Ana Costa', 'atendente', 'company-1');
