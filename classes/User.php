<?php

class User {

  private $con;

  public function __construct($con)
  {
      $this->con = $con;
  }

  public function register($name, $code, $password, $password_confirm){

    $validate = $this->validatePassword($password, $password_confirm);

    if($validate === false) return 'Incorrect password';

    return $this->registerDB($name, $code, $password, $password_confirm);


  }

  private function registerDB($name, $code, $password, $password_confirm){
    $option = array(
      'cost' => 10
    );

    $passHashed = password_hash($password, PASSWORD_BCRYPT, $option);
    $profilePic = "assets/img/users/default.png";
    $role = 2;

    $query = $this->con->prepare("INSERT INTO users(name, password, role_id, avatar) VALUES(:name, :password, :role_id, :avatar)");
    $query->bindParam(":name", $code);
    $query->bindParam(":password", $passHashed);
    $query->bindParam(":role_id", $role);
    $query->bindParam(":avatar", $profilePic);
    
    return $query->execute();
  }

  private function validatePassword($password, $password_confirm){
    if(trim($password) !== trim($password_confirm)){
      return false;
    } 
  }
  
}