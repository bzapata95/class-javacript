<?php


$rules = ["admin", "secretaria", "user"];

$en = json_encode($rules);

$res = json_decode($en);

echo var_dump($res);


// if(in_array('admin', $rules)){
  //   echo "Si existe";
  // }
  
function roles($n)
{
  $user = ['admin'];
  foreach ($user as $role) {
    if($role === $n){
      return true;
    }
  }
} 

// $b = array_map('roles', $rules);

// if($b[0]){
//   echo "permitido";
// }else {
//   echo "no permitido";
// }

// echo '<pre>';
// var_dump($b);
// echo '</pre>';
