<?php
$nombreUsuario = $_GET['nombreUsuario'];

$server = 'localhost';
$user = 'u537997648_jorge98';
$passwordb = 'INNIcucei21dbpro%';
$dbname = 'u537997648_datos';

$conn = mysqli_connect($server,$user,$passwordb,$dbname);
if(!$conn){
    die("Error en la conexión");
}
$sql = "SELECT * FROM Pago WHERE NombreUsuario='$nombreUsuario'";
$result = mysqli_query($conn,$sql);
$datos = array();
if(mysqli_num_rows($result) > 0){
    while($row = mysqli_fetch_assoc($result)){
        $datos[] = array('NumeroTarjeta'=>$row['NumeroTarjeta'],'NombreUsuario'=>$row['NombreUsuario'],'TipoTarjeta'=>$row['TipoTarjeta'],'MarcaTarjeta'=>$row['MarcaTarjeta'],'NombreBanco'=>$row['NombreBanco'],'NombreProducto'=>$row['NombreProducto'],'Monto'=>$row['Monto'],'Fecha'=>$row['Fecha']);
    }
}else{
    echo "No hay datos a mostrar";
}
mysqli_close($conn);
$salida = json_encode($datos);
echo $salida;
?>