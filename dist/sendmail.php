<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST["name"];
    $phone = $_POST["phone"];

    $to = "mister.slaus@gmail.com";

    $subject = "New Order from Landing Page";

    $message = "Name: " . $name . "\nPhone: " . $phone;

    $headers = "From: sender@example.com" . "\r\n" .
               "Reply-To: sender@example.com" . "\r\n" .
               "X-Mailer: PHP/" . phpversion();

    if (mail($to, $subject, $message, $headers)) {
        echo json_encode(array("status" => "success", "message" => "Message sent successfully!"));
    } else {
        echo json_encode(array("status" => "error", "message" => "Failed to send message."));
    }
}
?>
