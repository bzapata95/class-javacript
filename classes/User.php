<?php

class User {

  private $con;

  public function __construct($con)
  {
      $this->con = $con;
  }

  public function getValues($code, $password){
    return $code . ' ' . $password;
  }

  public function register($name, $code, $password, $password_confirm){

    $validate = $this->validatePassword($password, $password_confirm);

    if(!$validate) return 'Incorrect password';

    
    $option = array(
      'cost' => 10
    );
    $passHashed = password_hash($password, PASSWORD_BCRYPT, $option);
    $profilePic = "assets/img/users/default.png";
    $role = 2;

    $query = $this->con->prepare("INSERT INTO users (name, password, avatar, role_id) VALUES (:name, :password, :avatar, :role_id)");
    $query->bindParam(":name", $code);
    $query->bindParam(":password", $passHashed);
    $query->bindParam(":avatar", $profilePic );
    $query->bindParam(":role_id", $role);
    

    return $query->execute();

   

  }

  private function validatePassword($password, $password_confirm){
    if(trim($password) !== trim($password_confirm)){
      return false;
    } 
  }
  
}