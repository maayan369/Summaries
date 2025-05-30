const users = [
  {
    email: "user3",
    passwordHash: "137964fec3ecd2fbffd7e5518a2948bc17daa584081c318d0a7cc6531eacc7c9" // hash של 'password'
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
