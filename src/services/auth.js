export function login(email, password) {
  // Aqui podes conectar a uma API real
  return email && password; // Simulação simples
}

export function logout() {
  localStorage.removeItem('auth');
}

export function isAuthenticated() {
  return !!localStorage.getItem('auth');
}
