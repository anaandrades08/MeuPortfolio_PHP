<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $name = htmlspecialchars($_POST['name']);
  $email = htmlspecialchars($_POST['email']);
  $phone = htmlspecialchars($_POST['phone']);
  $message = htmlspecialchars($_POST['message']);

  // Destinatário do email
  $to ="destinatario@seuemail.com"; //substitua seu email

  // Assunto do email
  $subject = "Nova mensagem de contato";

  // Corpo do email
  $body = "Nome: $name\nEmail: $email\nTelefone: $phone\nMensagem:\n$message";

  // Cabeçalhos do email
  $headers = "From: $email\r\n";
  $headers .= "Reply-To: $email\r\n";
  $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

  // Enviar email
  if (mail($to, $subject, $body, $headers)) {
    http_response_code(200);
    echo "Formulário enviado com sucesso!";
  } else {
    http_response_code(500);
    $msg = "Erro ao enviar o email.";
    echo $msg;
    // Debug: Exibir dados recebidos
    error_log("Nome: $name");
    error_log("Email: $email");
    error_log("Telefone: $phone");
    error_log("Mensagem: $message");

    // Verificar se o arquivo pode ser escrito
    if (is_writable("submissions.txt")) {
      $file = fopen("submissions.txt", "a");
      fwrite($file, "Nome: $name\nEmail: $email\nTelefone: $phone\nMensagem: $message\nErro: $msg\n\n");
      fclose($file);
    }
  }
} else {
  http_response_code(400);
  echo "Método de requisição inválido.";
}
?>
