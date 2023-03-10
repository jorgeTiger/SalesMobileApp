<?php
$nombre = $_GET['nombre'];
$correo = $_GET['correo'];
$password = $_GET['password'];
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

$sql = "INSERT INTO Usuario (Nombre,Correo,Password,Imagen,FechaNacimiento) VALUES('$nombre','$correo','$password','$imagen','$fechaNacimiento')";
if(mysqli_query($conn,$sql)){
    echo "1";
}else{
    echo "0";
}
mysqli_close($conn);
?>