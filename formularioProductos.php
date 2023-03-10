<body>
    <h1 style='text-align:center'>Alta de Productos</h1>
    <form action='altaProducto.php' method='GET'>
        Nombre: <input type='text' size='60' name='nombre'/>
        <br>
        Tipo: <input type='text' size='30' name='tipo'/>
        <br>
        Marca: <input type='text' size='30' name='marca'/>
        <br>
        Precio: <input type='number' step='0.01' size='10' name='precio'/>
        <br>
        Descripción: <input type='text' size='100' name='descripcion'/>
        <br>
        Ruta de Imagen: <input type='text' size='100' name='imagen'/>
        <br>
        Fecha de Publicación: <input type='date' name='fechaPublicacion'/>
        <br>
        Nombre de Usuario: <input type='text' size='60' name='nombreUsuario'/>
        <br>
        <input type='submit' value='Enviar'/>
        <br>
    </form>
</body>