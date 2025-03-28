CREATE TABLE roles (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(50) UNIQUE NOT NULL
);

INSERT INTO roles (nombre) VALUES ('Administrador'), ('Asesor');

CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    email VARCHAR(50) UNIQUE NOT NULL CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
    password TEXT NOT NULL,
    rol_id INT REFERENCES roles(id) NOT NULL,
    fecha_creacion TIMESTAMP DEFAULT NOW(),
    fecha_actualizacion TIMESTAMP DEFAULT NOW()
);

CREATE TABLE ventas (
    id SERIAL PRIMARY KEY,
    producto VARCHAR(50) NOT NULL CHECK (producto IN ('Credito de Consumo', 'Libranza Libre Inversión', 'Tarjeta de Credito')),
    cupo_solicitado NUMERIC(15,2) NOT NULL,
    franquicia VARCHAR(20) CHECK (franquicia IN ('AMEX', 'VISA', 'MASTERCARD')),
    tasa NUMERIC(4,2),
    estado VARCHAR(20) NOT NULL DEFAULT 'Abierto' CHECK (estado IN ('Abierto', 'En Proceso', 'Finalizado')),
    fecha_creacion TIMESTAMP DEFAULT NOW(),
    usuario_creacion INT REFERENCES usuarios(id) NOT NULL,
    fecha_actualizacion TIMESTAMP DEFAULT NOW(),
    usuario_actualizacion INT REFERENCES usuarios(id) NOT NULL
);
