async function validateForm(event) {
  event.preventDefault(); // Impede o envio do formulário

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const message = document.getElementById('message').value.trim();

  let valid = true;

  // Limpar mensagens de erro anteriores
  document.querySelectorAll('.error').forEach(el => el.innerHTML = "");

  if (name.length < 3) {
    alert('O nome deve ter pelo menos 3 caracteres.');
    valid = false;
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    alert('Por favor, insira um endereço de email válido.');
    valid = false;
  }

  const phonePattern = /^\(\d{2}\) \d{5}-\d{4}$/;
  if (!phonePattern.test(phone)) {
    alert('Por favor, insira um número de telefone válido no formato (99) 99999-9999.');
    valid = false;
  }

  if (message.length < 10) {
    alert('A mensagem deve ter pelo menos 10 caracteres.');
    valid = false;
  }

  if (valid) {
    const formData = new FormData(event.target);

    const response = await fetch('routes/process.php', {
      method: 'POST',
      body: formData
    });

    if (response.ok) {
      alert('Formulário enviado com sucesso!');
      document.getElementById('contactForm').reset(); // Limpar o formulário
    } else {
      alert('Erro ao enviar o formulário.');
    }
  }

  return valid;
}

function mascaraTelefone(input) {
  let phone = input.value.replace(/\D/g, ''); // Remove tudo que não for número
  phone = phone.replace(/^(\d{2})(\d)/g, '($1) $2'); // Adiciona o parêntese após os dois primeiros números
  phone = phone.replace(/(\d)(\d{4})$/, '$1-$2'); // Adiciona o hífen após o número
  input.value = phone;
}