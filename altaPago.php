<?php
$numeroTarjeta = $_GET['numeroTarjeta'];
$nombreUsuario = $_GET['nombreUsuario'];
$tipoTarjeta = $_GET['tipoTarjeta'];
$marcaTarjeta = $_GET['marcaTarjeta'];
$nombreBanco = $_GET['nombreBanco'];
$nombreProducto = $_GET['nombreProducto'];
$monto = $_GET['monto'];
$fecha = $_GET['fecha'];

$server = 'localhost';
$user = 'u537997648_jorge98';
$passwordb = 'INNIcucei21dbpro%';
$dbname = 'u537997648_datos';

$conn = mysqli_connect($server,$user,$passwordb,$dbname);
if(!$conn){
    die('Error al conectarse a la base de datos');
}

$sql = "INSERT INTO Pago (NumeroTarjeta,NombreUsuario,TipoTarjeta,MarcaTarjeta,NombreBanco,NombreProducto,Monto,Fecha) VALUES('$numeroTarjeta','$nombreUsuario','$tipoTarjeta','$marcaTarjeta','$nombreBanco','$nombreProducto','$monto','$fecha')";
if(mysqli_query($conn,$sql)){
    echo "1";
}else{
    echo "0";
}
mysqli_close($conn);
?>