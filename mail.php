<?php

$name = trim($_POST["name"]) ?? '';
$phone = trim($_POST["phone"]) ?? '';
$filller = trim($_POST["filller"]) ?? '';
$date = trim($_POST["date"]) ?? '';

$to = 'lampezhev86@gmail.com';
$subject = 'Новое сообщение с сайта';
$body = "Имя: $name \nТелефон: $phone \nEmail: $email \nФиллерilller: $filller \nДата: $date";
$headers = "From: $email";

if (mail($to, $subject, $body, $headers)) {
  echo 'Сообщение отправлено!';
} else {
  echo 'Ошибка отправки.';
}