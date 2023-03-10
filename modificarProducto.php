<?php
$nombre = $_GET['nombre'];
$nuevoNombre = $_GET['nuevoNombre'];
$tipo = $_GET['tipo'];
$marca = $_GET['marca'];
$precio = $_GET['precio'];
$descripcion = $_GET['descripcion'];
$imagen = $_GET['imagen'];
$fechaPublicacion = $_GET['fechaPublicacion'];
$nombreUsuario = $_GET['nombreUsuario'];
$nuevoNombreUsuario = $_GET['nuevoNombreUsuario'];

$server = 'localhost';
$user = 'u537997648_jorge98';
$passwordb = 'INNIcucei21dbpro%';
$dbname = 'u537997648_datos';

$conn = mysqli_connect($server,$user,$passwordb,$dbname);
if(!$conn){
    die('Error al conectarse a la base de datos');
}

$sql = "UPDATE Producto SET Nombre='$nuevoNombre', Tipo='$tipo', Marca='$marca', Precio='$precio', Descripcion='$descripcion', Imagen='$imagen', FechaPublicacion='$fechaPublicacion', NombreUsuario='$nuevoNombreUsuario' WHERE Nombre='$nombre' AND NombreUsuario='$nombreUsuario'";
if(mysqli_query($conn,$sql)){
    echo "1";
}else{
    echo "0";
}
mysqli_close($conn);
?>