-- phpMyAdmin SQL Dump
-- version 4.9.5
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 09-12-2021 a las 22:52:27
-- Versión del servidor: 10.5.12-MariaDB-cll-lve
-- Versión de PHP: 7.2.34

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `u537997648_datos`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `DatosUsuario`
--

CREATE TABLE `DatosUsuario` (
  `Id` int(11) NOT NULL,
  `Nombre` varchar(80) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Codigo` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Password` blob NOT NULL,
  `Centro` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Imagen` varchar(160) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `DatosUsuario`
--

INSERT INTO `DatosUsuario` (`Id`, `Nombre`, `Codigo`, `Password`, `Centro`, `Imagen`) VALUES
(1, 'Jorge Luis Salas', '214431276', 0x243279243130245546597a535249746c645854354a62465a356b7a7a2e41736934412e2e6f7154747a4135485368475546614b58364f756152477647, 'CUCEI', 'http://sitio1pro.online/imagenes/61a3e16898992.png'),
(2, 'Daniela Torres', '268403125', 0x243279243130246e62787675616764627a553134416238725572674d654d7941656350453541666e616630424b687277586578452f707755745a5671, 'CUCEA', 'https://sitio1pro.online/imagenes/61b12d0df2b0d.png'),
(3, 'Roberto Gonzalez', '238145970', 0x24327924313024394c46666651375a487a4c7544685376794f3250412e517330496e564b38562e645654584637414b35744b2f3278325a526e4a5543, 'CUTLAJOMULCO', 'http://sitio1pro.online/imagenes/61a3eb8c12e5b.png'),
(4, 'Ricardo Luna', '291075896', 0x243279243130246a70714a6f6e76547176694951784a474a713642412e54757549616b4d6e6d4177336d4e575877337034776b41666a623353416d57, 'CUTONALA', 'http://sitio1pro.online/imagenes/61a3ee12b68ea.png'),
(5, 'Juan Lopez', '297401356', 0x243279243130246b6d6d486b58666765353846536e6a612e5375696965346a6638535739753968416338554b43636b524c5a4a364b47335870586d4f, 'CUCSH', 'https://sitio1pro.online/imagenes/61b12af252518.png');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Direccion`
--

CREATE TABLE `Direccion` (
  `Id` int(11) NOT NULL,
  `NombreUsuario` varchar(80) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Calle` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Numero` int(11) NOT NULL,
  `Colonia` varchar(80) COLLATE utf8mb4_unicode_ci NOT NULL,
  `CodigoPostal` int(5) NOT NULL,
  `Municipio` varchar(80) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Estado` varchar(80) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Pais` varchar(80) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Telefono` bigint(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `Direccion`
--

INSERT INTO `Direccion` (`Id`, `NombreUsuario`, `Calle`, `Numero`, `Colonia`, `CodigoPostal`, `Municipio`, `Estado`, `Pais`, `Telefono`) VALUES
(1, 'Jorge Luis Salas', 'Av. Revolucion', 1234, 'Analco', 44120, 'Guadalajara', 'Jalisco', 'Mexico', 3332569259),
(2, 'Roberto González', 'Independencia', 920, 'Santa Maria Tequepexpan', 45609, 'San Pedro Tlaquepaque', 'Jalisco', 'Mexico', 3351978401),
(3, 'Daniela Torres', 'Bolivia', 2836, 'Fraccionamiento Colón', 44230, 'Guadalajara', 'Jalisco', 'Mexico', 3318267905),
(4, 'Pepe', 'Pepo', 36, 'Pop', 56899, 'Pp', 'P', 'P', 63669);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Pago`
--

CREATE TABLE `Pago` (
  `Id` int(11) NOT NULL,
  `NumeroTarjeta` bigint(20) NOT NULL,
  `NombreUsuario` varchar(80) COLLATE utf8mb4_unicode_ci NOT NULL,
  `TipoTarjeta` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `MarcaTarjeta` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `NombreBanco` varchar(80) COLLATE utf8mb4_unicode_ci NOT NULL,
  `NombreProducto` varchar(80) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Monto` decimal(60,0) NOT NULL,
  `Fecha` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `Pago`
--

INSERT INTO `Pago` (`Id`, `NumeroTarjeta`, `NombreUsuario`, `TipoTarjeta`, `MarcaTarjeta`, `NombreBanco`, `NombreProducto`, `Monto`, `Fecha`) VALUES
(1, 2147648364701127, 'Jorge Luis Salas', 'Debito', 'American Express', 'BBVA', 'Samsung Galaxy A02', '2199', '2021-11-26'),
(2, 1930193972938227, 'Roberto Gonzalez', 'Regalo', 'Union Pay', 'OXXO', 'Playera Cuidado con el Perro Cheems Mediana', '200', '2021-11-15');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Producto`
--

CREATE TABLE `Producto` (
  `Id` int(11) NOT NULL,
  `Nombre` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Tipo` varchar(80) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Marca` varchar(80) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Precio` decimal(60,0) NOT NULL,
  `Descripcion` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `Imagen` varchar(160) COLLATE utf8mb4_unicode_ci NOT NULL,
  `FechaPublicacion` date NOT NULL,
  `NombreUsuario` varchar(80) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `Producto`
--

INSERT INTO `Producto` (`Id`, `Nombre`, `Tipo`, `Marca`, `Precio`, `Descripcion`, `Imagen`, `FechaPublicacion`, `NombreUsuario`) VALUES
(1, 'Nintendo Switch 32GB Standard', 'Consolas y Videojuegos', 'Nintendo', '6799', 'Incluye 2 controles inalámbricos, Resolución de 1920 px x 1080 px, Memoria RAM de 4GB, Display de 6.2\", Tiene pantalla táctil, Cuenta con: 1 joy-con grip, 2 correas para joy-con, 1 dock, 1 cable hdmi, 1 adaptador de corriente.', 'https://www.freeki.com/uploads/products/60421bffb9a8b1614945279.jpg', '2021-11-05', 'Roberto Gonzalez'),
(2, 'Samsung Galaxy A02', 'Celulares', 'Samsung', '2199', 'Memoria interna: 32 GB, Colores: Negro, Azul, Gris, Negro y Rojo, Pantalla PLS de 6.5\", Tiene 2 cámaras traseras de 13Mpx/2Mpx, Cámara delantera de 5Mpx, Procesador MediaTek MT6739W Quad-Core de 1.5GHz con 2GB de RAM, Batería de 5000mAh, Apto para tarjeta SD de 1TB', 'https://static.nb.com.ar/i/nb_samsung-telefono-celular-galaxy-a02-64gb-black_ver_68098cb97a8d428278b4484850bb39cb.jpg', '2021-11-03', 'Daniela Torres'),
(3, 'Casco Denver Broncos Mediano', 'Ropa Deportiva', 'Nike', '8000', 'Gran comodidad y protección, estilo increíble, para adultos talla mediana', 'http://sitio1pro.online/imagenes/61a2d19172363.png', '2021-11-27', 'Jorge Luis Salas'),
(4, 'Playera Cuidado con el Perro Cheems Mediana', 'Playera', 'Cuidado con el Perro', '200', 'Playera Talla Mediana con imagen de Cheems, perrito de los memes famosos', 'http://sitio1pro.online/imagenes/61a2d9fce78ef.png', '2021-11-12', 'Daniela Torres'),
(5, 'Laptop Huawei Matebook D15', 'Laptops y Accesorios', 'Huawei', '11999', 'El HUAWEI MateBook D 15 es un portátil ultra delgado de 15.6 pulgadas con pantalla FullView y un nuevo procesador Intel® Core ™ i3-10110U de 10ma generación. Con un acabado metálico y un grosor de 16.9 mm, el MateBook D 15 es una computadora personal premium y liviana que no querrá perderse. -Resolución de 1920 × 1080 píxeles, antideslumbrante IPS y brillo de pantalla de hasta 250 nits (típico). -Relación pantalla-cuerpo del 87%, y ángulo de visión que puede alcanzar unos impresionantes 178 grados. -Está equipada con una Cámara empotrada HD 720 P -Esta equipada con Eye Care Certificación TÜV Rheinland Low Blue Light y Certificación TÜV Rheinland Flicker Free. -Es compatible con Huawei Share OneHop. El MateBook D 15 es un asistente inteligente que viene con el software oficial de Microsoft y la reproducción de video Full HD para que la disfrutes al máximo.', 'https://ksd-images.lt/display/aikido/store/707ad2db59767993351114a77f45f538.jpg', '2021-11-30', 'Juan Lopez');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Usuario`
--

CREATE TABLE `Usuario` (
  `Id` int(11) NOT NULL,
  `Nombre` varchar(80) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Correo` varchar(80) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Password` blob NOT NULL,
  `Imagen` varchar(160) COLLATE utf8mb4_unicode_ci NOT NULL,
  `FechaNacimiento` date NOT NULL,
  `Saldo` decimal(60,0) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `Usuario`
--

INSERT INTO `Usuario` (`Id`, `Nombre`, `Correo`, `Password`, `Imagen`, `FechaNacimiento`, `Saldo`) VALUES
(1, 'Jorge Luis Salas', 'jorge98.2@outlook.com', 0x6a6c7332313970726f, 'http://sitio1pro.online/imagenes/61a13e6371323.png', '1998-05-21', '0'),
(2, 'Roberto Gonzalez', 'roberto.glz129@gmail.com', 0x7262313239676c7a, 'http://sitio1pro.online/imagenes/61a2bbee1e065.png', '1985-04-11', '0'),
(3, 'Daniela Torres', 'dani.tor208@yahoo.com.mx', 0x64616e69323038746f72, 'http://sitio1pro.online/imagenes/61a2bd71652c7.png', '2003-07-04', '0'),
(4, 'Juan Lopez', 'juan.lopez1082@hotmail.com', 0x6a75616e313038326c, 'https://sitio1pro.online/imagenes/61b033b165684.png', '1992-06-12', '8000'),
(6, 'Pepo', 'Pepo', 0x7065706f, '', '2008-12-03', '0');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `DatosUsuario`
--
ALTER TABLE `DatosUsuario`
  ADD PRIMARY KEY (`Id`);

--
-- Indices de la tabla `Direccion`
--
ALTER TABLE `Direccion`
  ADD PRIMARY KEY (`Id`);

--
-- Indices de la tabla `Pago`
--
ALTER TABLE `Pago`
  ADD PRIMARY KEY (`Id`);

--
-- Indices de la tabla `Producto`
--
ALTER TABLE `Producto`
  ADD PRIMARY KEY (`Id`);

--
-- Indices de la tabla `Usuario`
--
ALTER TABLE `Usuario`
  ADD PRIMARY KEY (`Id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `DatosUsuario`
--
ALTER TABLE `DatosUsuario`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `Direccion`
--
ALTER TABLE `Direccion`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `Pago`
--
ALTER TABLE `Pago`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `Producto`
--
ALTER TABLE `Producto`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `Usuario`
--
ALTER TABLE `Usuario`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
