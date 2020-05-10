<?php
// include_once('classes/config/db.php');
include_once('classes/User.php');


if(isset($_POST["buttonSubmit"])){
  $code = $_POST["code"];
  $password = $_POST["password"];

  $newUser = new User($con);

  $result = $newUser->login($code, $password);

  echo $result;
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
  
  <h2>Inicio de sesión </h2>
  
  <form action="signIn.php" method="POST">
    <input name="code" type="text" placeholder="código" >
    <input name="password" type="password" placeholder="Clave 6 digitos" >
    <button name="buttonSubmit" type="submit">Ingresar</button>
  </form>

  <p>Si no tienes cuenta abre uno simple <a href="signUp.html">Aquí</a></p>
</body>
</html>