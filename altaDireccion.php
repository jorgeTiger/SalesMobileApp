<?php
$nombreUsuario = $_GET['nombreUsuario'];
$calle = $_GET['calle'];
$numero = $_GET['numero'];
$colonia = $_GET['colonia'];
$codigoPostal = $_GET['codigoPostal'];
$municipio = $_GET['municipio'];
$estado = $_GET['estado'];
$pais = $_GET['pais'];
$telefono = $_GET['telefono'];

$server = 'localhost';
$user = 'u537997648_jorge98';
$passwordb = 'INNIcucei21dbpro%';
$dbname = 'u537997648_datos';

$conn = mysqli_connect($server,$user,$passwordb,$dbname);
if(!$conn){
    die('Error al conectarse a la base de datos');
}

$sql = "INSERT INTO Direccion (NombreUsuario,Calle,Numero,Colonia,CodigoPostal,Municipio,Estado,Pais,Telefono) VALUES('$nombreUsuario','$calle','$numero','$colonia','$codigoPostal','$municipio','$estado','$pais','$telefono')";
if(mysqli_query($conn,$sql)){
    echo "1";
}else{
    echo "0";
}
mysqli_close($conn);
?>