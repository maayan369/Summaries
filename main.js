const users = [
  {
    email: "ymaayan2003@gmail.com",
    passwordHash: "4f8b3412ec8d76fcb5ab304378cf5d9b6838528d13e5b1e96b305208d9d9e383" // hash של 'password'
  }
];

async function sha256(text) {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  return [...new Uint8Array(hashBuffer)]
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

async function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const hash = await sha256(password);

  const user = users.find(u => u.email === email && u.passwordHash === hash);
  if (user) {
    sessionStorage.setItem("loggedIn", "true");
    window.location.href = "summaries.html";
  } else {
    document.getElementById("error").textContent = "אימייל או סיסמה שגויים";
  }
}
