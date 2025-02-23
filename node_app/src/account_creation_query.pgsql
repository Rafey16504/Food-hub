CREATE TABLE user_account (
    id SERIAL PRIMARY KEY,  -- Unique identifier for the user
    name VARCHAR(255) NOT NULL,  -- User's full name
    age INT CHECK (age >= 0),  -- Age must be non-negative
    date_of_birth DATE,  -- User's date of birth
    gender VARCHAR(10) CHECK (gender IN ('Male', 'Female', 'Other')),  -- Restrict gender values
    email VARCHAR(255) UNIQUE NOT NULL,  -- Unique email for login
    phone_number VARCHAR(20) UNIQUE NOT NULL,  -- User's phone number (must be unique)
    address TEXT,  -- Full address of the user
    roll_number VARCHAR(50) UNIQUE NOT NULL,  -- Unique roll number (if used in an institution)
    password_hash TEXT NOT NULL,  -- Hashed password for security
    code VARCHAR(50) UNIQUE,  -- Some unique code associated with the user
    total_orders INT DEFAULT 0,  -- Count of total orders placed
    order_history INT[],  -- Array to store previous order IDs
    current_order_id INT,  -- ID of the current order
    status VARCHAR(20) DEFAULT 'Active' CHECK (status IN ('Active', 'Suspended', 'Banned')),  -- Account status
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
