<?php

$to = 'lampezhev86@gmail.com';
$subject = 'Новое сообщение с сайта';

// Сбор всех полей, которые пришли в POST
$fields = [
  'Имя' => $_POST['name'] ?? '',
  'Телефон' => $_POST['phone'] ?? '',
  'Email' => $_POST['email'] ?? '',
  'Тип спирали' => $_POST['type'] ?? '',
  'Дата' => $_POST['date'] ?? '',
  'Сообщение' => $_POST['message'] ?? '',
  // Добавь сюда любые другие возможные поля
];

$body = '';
foreach ($fields as $label => $value) {
  if (!empty(trim($value))) {
    $body .= "$label: " . trim($value) . "\n";
  }
}

$from = $_POST['email'] ?? 'noreply@example.com';
$headers = "From: $from";

if (mail($to, $subject, $body, $headers)) {
  echo 'Сообщение отправлено!';
} else {
  echo 'Ошибка отправки.';
}