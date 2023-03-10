<?php
$nombre = $_GET['nombre'];
$nombreUsuario = $_GET['nombreUsuario'];

$server = 'localhost';
$user = 'u537997648_jorge98';
$passwordb = 'INNIcucei21dbpro%';
$dbname = 'u537997648_datos';

$conn = mysqli_connect($server,$user,$passwordb,$dbname);
if(!$conn){
    die('Error al conectarse a la base de datos');
}

$sql = "DELETE FROM Producto WHERE Nombre='$nombre' AND NombreUsuario='$nombreUsuario'";
if(mysqli_query($conn,$sql)){
    unlink($row['Imagen']);
    echo "1";
}else{
    echo "0";
}
mysqli_close($conn);
?>