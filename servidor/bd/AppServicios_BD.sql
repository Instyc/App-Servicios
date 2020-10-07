-- MySQL Script generated by MySQL Workbench
-- Tue Oct  6 20:39:17 2020
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema AppServicios_BD
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `AppServicios_BD` ;

-- -----------------------------------------------------
-- Schema AppServicios_BD
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `AppServicios_BD` DEFAULT CHARACTER SET utf8 ;
USE `AppServicios_BD` ;

-- -----------------------------------------------------
-- Table `AppServicios_BD`.`Usuarios`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `AppServicios_BD`.`Usuarios` ;

CREATE TABLE IF NOT EXISTS `AppServicios_BD`.`Usuarios` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nom_usuario` VARCHAR(20) NOT NULL,
  `nombre` VARCHAR(35) NOT NULL,
  `apellido` VARCHAR(30) NOT NULL,
  `ubicacion` VARCHAR(100) NULL,
  `contrasena` VARCHAR(255) NOT NULL,
  `correo` VARCHAR(30) NOT NULL,
  `telefono` VARCHAR(15) NULL,
  `url_imagen` VARCHAR(255) NULL,
  `tipo` TINYINT NOT NULL,
  `permiso` TINYINT NULL,
  `estado` TINYINT NULL,
  `dni` VARCHAR(8) NULL,
  `fecha_creacion` DATETIME NOT NULL,
  `mostrar_telefono` TINYINT NULL,
  `descripcion` VARCHAR(510) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `AppServicios_BD`.`Categorias`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `AppServicios_BD`.`Categorias` ;

CREATE TABLE IF NOT EXISTS `AppServicios_BD`.`Categorias` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `AppServicios_BD`.`Servicios`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `AppServicios_BD`.`Servicios` ;

CREATE TABLE IF NOT EXISTS `AppServicios_BD`.`Servicios` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(50) NOT NULL,
  `Categorias_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_Servicios_Categorias1_idx` (`Categorias_id` ASC) VISIBLE,
  CONSTRAINT `fk_Servicios_Categorias1`
    FOREIGN KEY (`Categorias_id`)
    REFERENCES `AppServicios_BD`.`Categorias` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `AppServicios_BD`.`Solicitudes`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `AppServicios_BD`.`Solicitudes` ;

CREATE TABLE IF NOT EXISTS `AppServicios_BD`.`Solicitudes` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `titulo` VARCHAR(50) NOT NULL,
  `descripcion` TEXT NOT NULL,
  `precio_estimado` FLOAT NULL,
  `tipo` TINYINT NOT NULL,
  `estado` TINYINT NOT NULL,
  `Usuarios_id` INT NOT NULL,
  `Servicios_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_Solicitudes_Usuarios1_idx` (`Usuarios_id` ASC) VISIBLE,
  INDEX `fk_Solicitudes_Servicios1_idx` (`Servicios_id` ASC) VISIBLE,
  CONSTRAINT `fk_Solicitudes_Usuarios1`
    FOREIGN KEY (`Usuarios_id`)
    REFERENCES `AppServicios_BD`.`Usuarios` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Solicitudes_Servicios1`
    FOREIGN KEY (`Servicios_id`)
    REFERENCES `AppServicios_BD`.`Servicios` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `AppServicios_BD`.`Reportes_Solicitudes`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `AppServicios_BD`.`Reportes_Solicitudes` ;

CREATE TABLE IF NOT EXISTS `AppServicios_BD`.`Reportes_Solicitudes` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `fecha` DATETIME NOT NULL,
  `descripcion` VARCHAR(255) NULL,
  `estado` TINYINT NOT NULL,
  `accion` TINYINT NOT NULL,
  `Administrador_id` INT NOT NULL,
  `Solicitudes_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_Reportes_Solicitudes_Usuarios_idx` (`Administrador_id` ASC) VISIBLE,
  INDEX `fk_Reportes_Solicitudes_Solicitudes1_idx` (`Solicitudes_id` ASC) VISIBLE,
  CONSTRAINT `fk_Reportes_Solicitudes_Usuarios`
    FOREIGN KEY (`Administrador_id`)
    REFERENCES `AppServicios_BD`.`Usuarios` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Reportes_Solicitudes_Solicitudes1`
    FOREIGN KEY (`Solicitudes_id`)
    REFERENCES `AppServicios_BD`.`Solicitudes` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `AppServicios_BD`.`Reportes_Proveedores`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `AppServicios_BD`.`Reportes_Proveedores` ;

CREATE TABLE IF NOT EXISTS `AppServicios_BD`.`Reportes_Proveedores` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `fecha` DATETIME NOT NULL,
  `descripcion` VARCHAR(255) NULL,
  `estado` TINYINT NOT NULL,
  `accion` TINYINT NOT NULL,
  `Administrador_id` INT NOT NULL,
  `Proveedor_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_Reportes_Proveedores_Usuarios1_idx` (`Administrador_id` ASC) VISIBLE,
  INDEX `fk_Reportes_Proveedores_Usuarios2_idx` (`Proveedor_id` ASC) VISIBLE,
  CONSTRAINT `fk_Reportes_Proveedores_Usuarios1`
    FOREIGN KEY (`Administrador_id`)
    REFERENCES `AppServicios_BD`.`Usuarios` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Reportes_Proveedores_Usuarios2`
    FOREIGN KEY (`Proveedor_id`)
    REFERENCES `AppServicios_BD`.`Usuarios` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `AppServicios_BD`.`Motivos`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `AppServicios_BD`.`Motivos` ;

CREATE TABLE IF NOT EXISTS `AppServicios_BD`.`Motivos` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(20) NOT NULL,
  `tipo` TINYINT NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `AppServicios_BD`.`Motivos_Reportes_Solicitudes`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `AppServicios_BD`.`Motivos_Reportes_Solicitudes` ;

CREATE TABLE IF NOT EXISTS `AppServicios_BD`.`Motivos_Reportes_Solicitudes` (
  `Reportes_Solicitudes_id` INT NOT NULL,
  `Motivos_id` INT NOT NULL,
  INDEX `fk_Motivos_Reportes_Solicitudes_Reportes_Solicitudes1_idx` (`Reportes_Solicitudes_id` ASC) VISIBLE,
  INDEX `fk_Motivos_Reportes_Solicitudes_Motivos1_idx` (`Motivos_id` ASC) VISIBLE,
  CONSTRAINT `fk_Motivos_Reportes_Solicitudes_Reportes_Solicitudes1`
    FOREIGN KEY (`Reportes_Solicitudes_id`)
    REFERENCES `AppServicios_BD`.`Reportes_Solicitudes` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Motivos_Reportes_Solicitudes_Motivos1`
    FOREIGN KEY (`Motivos_id`)
    REFERENCES `AppServicios_BD`.`Motivos` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `AppServicios_BD`.`Motivos_Reportes_Proveedores`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `AppServicios_BD`.`Motivos_Reportes_Proveedores` ;

CREATE TABLE IF NOT EXISTS `AppServicios_BD`.`Motivos_Reportes_Proveedores` (
  `Reportes_Proveedores_id` INT NOT NULL,
  `Motivos_id` INT NOT NULL,
  INDEX `fk_Motivos_Reportes_Proveedores_Reportes_Proveedores1_idx` (`Reportes_Proveedores_id` ASC) VISIBLE,
  INDEX `fk_Motivos_Reportes_Proveedores_Motivos1_idx` (`Motivos_id` ASC) VISIBLE,
  CONSTRAINT `fk_Motivos_Reportes_Proveedores_Reportes_Proveedores1`
    FOREIGN KEY (`Reportes_Proveedores_id`)
    REFERENCES `AppServicios_BD`.`Reportes_Proveedores` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Motivos_Reportes_Proveedores_Motivos1`
    FOREIGN KEY (`Motivos_id`)
    REFERENCES `AppServicios_BD`.`Motivos` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `AppServicios_BD`.`Notificaciones`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `AppServicios_BD`.`Notificaciones` ;

CREATE TABLE IF NOT EXISTS `AppServicios_BD`.`Notificaciones` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `emisor` INT NOT NULL,
  `nombre_publicacion_proveedor` VARCHAR(65) NULL,
  `tipo` INT NOT NULL,
  `leido` TINYINT NOT NULL,
  `Usuarios_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_Notificaciones_Usuarios1_idx` (`Usuarios_id` ASC) VISIBLE,
  CONSTRAINT `fk_Notificaciones_Usuarios1`
    FOREIGN KEY (`Usuarios_id`)
    REFERENCES `AppServicios_BD`.`Usuarios` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `AppServicios_BD`.`Mensajes`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `AppServicios_BD`.`Mensajes` ;

CREATE TABLE IF NOT EXISTS `AppServicios_BD`.`Mensajes` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre_chat` VARCHAR(50) NOT NULL,
  `contenido` TEXT NULL,
  `fecha` DATETIME NOT NULL,
  `Emisor_id` INT NOT NULL,
  `Receptor_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_Mensajes_Usuarios1_idx` (`Emisor_id` ASC) VISIBLE,
  INDEX `fk_Mensajes_Usuarios2_idx` (`Receptor_id` ASC) VISIBLE,
  CONSTRAINT `fk_Mensajes_Usuarios1`
    FOREIGN KEY (`Emisor_id`)
    REFERENCES `AppServicios_BD`.`Usuarios` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Mensajes_Usuarios2`
    FOREIGN KEY (`Receptor_id`)
    REFERENCES `AppServicios_BD`.`Usuarios` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `AppServicios_BD`.`Imagenes_Proveedor`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `AppServicios_BD`.`Imagenes_Proveedor` ;

CREATE TABLE IF NOT EXISTS `AppServicios_BD`.`Imagenes_Proveedor` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `url` VARCHAR(255) NOT NULL,
  `Proveedor_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_Imagenes_Proveedor_Usuarios1_idx` (`Proveedor_id` ASC) VISIBLE,
  CONSTRAINT `fk_Imagenes_Proveedor_Usuarios1`
    FOREIGN KEY (`Proveedor_id`)
    REFERENCES `AppServicios_BD`.`Usuarios` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `AppServicios_BD`.`Imagenes_Solicitud`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `AppServicios_BD`.`Imagenes_Solicitud` ;

CREATE TABLE IF NOT EXISTS `AppServicios_BD`.`Imagenes_Solicitud` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `url` VARCHAR(255) NOT NULL,
  `Solicitudes_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_Imagenes_Solicitud_Solicitudes1_idx` (`Solicitudes_id` ASC) VISIBLE,
  CONSTRAINT `fk_Imagenes_Solicitud_Solicitudes1`
    FOREIGN KEY (`Solicitudes_id`)
    REFERENCES `AppServicios_BD`.`Solicitudes` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `AppServicios_BD`.`Lista_Servicios`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `AppServicios_BD`.`Lista_Servicios` ;

CREATE TABLE IF NOT EXISTS `AppServicios_BD`.`Lista_Servicios` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `Usuarios_id` INT NOT NULL,
  `Servicios_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_Lista_Servicios_Usuarios1_idx` (`Usuarios_id` ASC) VISIBLE,
  INDEX `fk_Lista_Servicios_Servicios1_idx` (`Servicios_id` ASC) VISIBLE,
  CONSTRAINT `fk_Lista_Servicios_Usuarios1`
    FOREIGN KEY (`Usuarios_id`)
    REFERENCES `AppServicios_BD`.`Usuarios` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Lista_Servicios_Servicios1`
    FOREIGN KEY (`Servicios_id`)
    REFERENCES `AppServicios_BD`.`Servicios` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `AppServicios_BD`.`Resena`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `AppServicios_BD`.`Resena` ;

CREATE TABLE IF NOT EXISTS `AppServicios_BD`.`Resena` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `titulo` VARCHAR(50) NULL,
  `descripcion` VARCHAR(255) NULL,
  `recomendacion` TINYINT NOT NULL,
  `fecha` DATETIME NOT NULL,
  `votos_positivos` INT NOT NULL,
  `votos_negativos` INT NOT NULL,
  `Usuarios_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_Resena_Usuarios1_idx` (`Usuarios_id` ASC) VISIBLE,
  CONSTRAINT `fk_Resena_Usuarios1`
    FOREIGN KEY (`Usuarios_id`)
    REFERENCES `AppServicios_BD`.`Usuarios` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `AppServicios_BD`.`Resena_Solicitud`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `AppServicios_BD`.`Resena_Solicitud` ;

CREATE TABLE IF NOT EXISTS `AppServicios_BD`.`Resena_Solicitud` (
  `Solicitudes_id` INT NOT NULL,
  `Resena_id` INT NOT NULL,
  INDEX `fk_Resena_Solicitud_Solicitudes1_idx` (`Solicitudes_id` ASC) VISIBLE,
  INDEX `fk_Resena_Solicitud_Resena1_idx` (`Resena_id` ASC) VISIBLE,
  CONSTRAINT `fk_Resena_Solicitud_Solicitudes1`
    FOREIGN KEY (`Solicitudes_id`)
    REFERENCES `AppServicios_BD`.`Solicitudes` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Resena_Solicitud_Resena1`
    FOREIGN KEY (`Resena_id`)
    REFERENCES `AppServicios_BD`.`Resena` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `AppServicios_BD`.`Mensajes_Reporte_Proveedor`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `AppServicios_BD`.`Mensajes_Reporte_Proveedor` ;

CREATE TABLE IF NOT EXISTS `AppServicios_BD`.`Mensajes_Reporte_Proveedor` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre_chat` VARCHAR(50) NOT NULL,
  `contenido` TEXT NULL,
  `fecha` DATETIME NOT NULL,
  `Reportes_Proveedores_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_Mensajes_Reporte_Proveedor_Reportes_Proveedores1_idx` (`Reportes_Proveedores_id` ASC) VISIBLE,
  CONSTRAINT `fk_Mensajes_Reporte_Proveedor_Reportes_Proveedores1`
    FOREIGN KEY (`Reportes_Proveedores_id`)
    REFERENCES `AppServicios_BD`.`Reportes_Proveedores` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `AppServicios_BD`.`Mensajes_Reporte_Solicitud`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `AppServicios_BD`.`Mensajes_Reporte_Solicitud` ;

CREATE TABLE IF NOT EXISTS `AppServicios_BD`.`Mensajes_Reporte_Solicitud` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre_chat` VARCHAR(50) NOT NULL,
  `contenido` TEXT NULL,
  `fecha` DATETIME NOT NULL,
  `Reportes_Solicitudes_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_Mensajes_Reporte_Solicitud_Reportes_Solicitudes1_idx` (`Reportes_Solicitudes_id` ASC) VISIBLE,
  CONSTRAINT `fk_Mensajes_Reporte_Solicitud_Reportes_Solicitudes1`
    FOREIGN KEY (`Reportes_Solicitudes_id`)
    REFERENCES `AppServicios_BD`.`Reportes_Solicitudes` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

SET SQL_MODE = '';
DROP USER IF EXISTS admin;
SET SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';
CREATE USER 'admin' IDENTIFIED BY 'admin';

GRANT ALL ON `AppServicios_BD`.* TO 'admin';

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
