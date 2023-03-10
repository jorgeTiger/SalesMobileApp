<?php
$nombre = $_GET['nombre'];
$saldo = $_GET['saldo'];

$server = 'localhost';
$user = 'u537997648_jorge98';
$passwordb = 'INNIcucei21dbpro%';
$dbname = 'u537997648_datos';

$conn = mysqli_connect($server,$user,$passwordb,$dbname);
if(!$conn){
    die('Error al conectarse a la base de datos');
}

$sql = "UPDATE Usuario SET Saldo='$saldo' WHERE Nombre='$nombre'";
if(mysqli_query($conn,$sql)){
    echo "1";
}else{
    echo "0";
}
mysqli_close($conn);
?>