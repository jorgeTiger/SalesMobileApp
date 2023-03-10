<?php
$nombre = $_GET['nombre'];
$correo = $_GET['correo'];
$correoNuevo = $_GET['correoNuevo'];
$password = $_GET['password'];
$nuevoPassword = $_GET['nuevoPassword'];
$imagen = $_GET['imagen'];
$fechaNacimiento = $_GET['fechaNacimiento'];

$server = 'localhost';
$user = 'u537997648_jorge98';
$passwordb = 'INNIcucei21dbpro%';
$dbname = 'u537997648_datos';

$conn = mysqli_connect($server,$user,$passwordb,$dbname);
if(!$conn){
    die('Error al conectarse a la base de datos');
}

$sql = "UPDATE Usuario SET Nombre='$nombre', Correo='$correoNuevo', Password='$nuevoPassword', Imagen='$imagen', FechaNacimiento='$fechaNacimiento' WHERE Correo='$correo' AND Password='$password'";
if(mysqli_query($conn,$sql)){
    echo "1";
}else{
    echo "0";
}
mysqli_close($conn);
?>