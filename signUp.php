<?php

include_once('classes/config/db.php');
include_once('classes/User.php');

if(isset($_POST["buttonSubmit"])){
  $name= $_POST["name"];
  $code= $_POST["code"];
  $password= $_POST["password"];
  $password_confirm= $_POST["password_confirm"];


  $newUser = new User($con);

  $result = $newUser->register($name, $code, $password, $password_confirm);

 
  if($result){
    echo "listo";
  }else {
    echo ".l.";
  }
 
}

?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Sign In</title>

  <link rel="stylesheet" href="./css/stylesSignIn.css">

</head>
<body>
  <div class="headerSignin">
    <h1>Transactions Code</h1>
    <video src="./assets/logo.mp4" autoplay loop></video>
  </div>
  
  <h2>Registro</h2>
  
  <form action="signUp.php" method="post">
    <input name="name" type="text" placeholder="Nombre completo">
    <input name="code" type="text" placeholder="código">
    <input name="password" type="password" placeholder="Clave 6 digitos" >
    <input name="password_confirm" type="password" placeholder="Confirme su clave" >
    <button name="buttonSubmit" type="submit">Registrarme</button>
  </form>

  <p>Ya tienes una cuenta? Inicia sesión <a href="signIn.html">Aquí</a></p>
</body>
</html>