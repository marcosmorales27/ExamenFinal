CREATE DATABASE IF NOT EXISTS techinventory;
USE techinventory;

CREATE TABLE equipos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  categoria VARCHAR(50),
  descripcion TEXT,
  numero_serie VARCHAR(100) UNIQUE,
  estado ENUM('disponible','prestado','mantenimiento') DEFAULT 'disponible',
  imagen_url VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE prestamos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  equipo_id INT NOT NULL,
  nombre_solicitante VARCHAR(100) NOT NULL,
  fecha_prestamo DATETIME DEFAULT CURRENT_TIMESTAMP,
  fecha_devolucion_estimada DATETIME,
  fecha_devolucion_real DATETIME NULL,
  observaciones TEXT,
  FOREIGN KEY (equipo_id) REFERENCES equipos(id)
);

-- Datos de prueba
INSERT INTO equipos (nombre, categoria, numero_serie, estado) VALUES
('Laptop Dell XPS 13', 'laptop', 'SN-0001', 'disponible'),
('Proyector Epson X05', 'proyector', 'SN-0002', 'disponible');