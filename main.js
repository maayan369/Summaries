const users = [
  {
    email: "user1",
    passwordHash: "5994471abb01112afcc18159f6cc74b4f511b99806da59b3caf5a9c173cacfc5" // hash של 'password'
  },
  {
    email: "user2",
    passwordHash: "0c7489c79a5ab44c3f569653b23a0a4a5c73d805ea5ab1e2db410417560add81" // hash של 'password'
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
