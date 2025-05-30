const users = [
  {
    email: "maayan",
    passwordHash: "75e991e677b7e70cee5fb2517fd1a24b667048c5084fff25f745913c569b0683" // hash של 'password'
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
