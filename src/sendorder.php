<?php
require_once 'config.php';

$data = json_decode(file_get_contents('php://input'), true);

if ($data) {
    $conn = new mysqli($servername, $username, $password, $dbname);

    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    $name = $data['name'];
    $email = $data['email'];
    $address = $data['address'];
    $phone = $data['phone'];
    $payment = $data['payment'];
    $confirm = $data['confirm'];

    // SQL запрос
    $sql = "INSERT INTO your_table_name (name, email, address, phone, payment, confirm) VALUES ('$name', '$email', '$address', '$phone', '$payment', '$confirm')";

    if ($conn->query($sql) === TRUE) {
        // Успешно
        $response = ['status' => 'success', 'message' => 'Data saved successfully.'];
        echo json_encode($response);
    } else {
        // Ошибка при сохранении
        $response = ['status' => 'error', 'message' => 'Error saving data: ' . $conn->error];
        echo json_encode($response);
    }

    $conn->close();
} else {
    // Если данные не были получены
    $response = ['status' => 'error', 'message' => 'Data not received.'];
    echo json_encode($response);
}
?>
