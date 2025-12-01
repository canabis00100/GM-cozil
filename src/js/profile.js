import auth from "./utils/auth";

document.addEventListener("DOMContentLoaded", () => {
  // Proteção de rotas
  if (!auth.requireAuth()) {
    return;
  }

  // Carregar dados do usuário
  const user = auth.getCurrentUser();
  if (user) {
    // Atualizar nome no perfil
    const profileName = document.getElementById("profile-name");
    const profileEmail = document.getElementById("profile-email");
    const profileInfoName = document.getElementById("profile-info-name");
    const profileInfoEmail = document.getElementById("profile-info-email");
    const profileInfoRole = document.getElementById("profile-info-role");

    if (profileName) profileName.textContent = user.name;
    if (profileEmail) profileEmail.textContent = user.email;
    if (profileInfoName) profileInfoName.textContent = user.name;
    if (profileInfoEmail) profileInfoEmail.textContent = user.email;
    if (profileInfoRole) {
      profileInfoRole.textContent = user.role === "admin" ? "Administrador" : "Usuário";
    }
  }
});

