<?php
$correo = $_GET['correo'];

$server = 'localhost';
$user = 'u537997648_jorge98';
$passwordb = 'INNIcucei21dbpro%';
$dbname = 'u537997648_datos';

$conn = mysqli_connect($server,$user,$passwordb,$dbname);
if(!$conn){
    die("Error en la conexión");
}
$sql = "SELECT * FROM Usuario WHERE Correo='$correo'";
$result = mysqli_query($conn,$sql);
$datos = array();
if(mysqli_num_rows($result) > 0){
    if($row = mysqli_fetch_assoc($result)){
        $datos[] = array('Nombre'=>$row['Nombre'],'Correo'=>$row['Correo'], 'Password'=>$row['Password'],'Imagen'=>$row['Imagen'],'FechaNacimiento'=>$row['FechaNacimiento'],'Saldo'=>$row['Saldo']);
    }
}else{
    echo "0";
}
mysqli_close($conn);
$salida = json_encode($datos);
echo $salida;
?>