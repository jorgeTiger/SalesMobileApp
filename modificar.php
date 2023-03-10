<?php
$nombre = $_GET['nombre'];
$codigo = $_GET['codigo'];
$password = $_GET['password'];
$centro = $_GET['centro'];
$imagen = $_GET['imagen'];

$passhash = password_hash($password,PASSWORD_DEFAULT);

$server = 'localhost';
$user = 'u537997648_jorge98';
$passwordb = 'INNIcucei21dbpro%';
$dbname = 'u537997648_datos';

$conn = mysqli_connect($server,$user,$passwordb,$dbname);
if(!$conn){
    die('Error al conectarse a la base de datos');
}

$sql = "UPDATE DatosUsuario SET Nombre='$nombre', Password='$passhash', Centro='$centro', Imagen='$imagen' WHERE Codigo='$codigo'";
if(mysqli_query($conn,$sql)){
    echo "1";
}else{
    echo "0";
}
mysqli_close($conn);
?>