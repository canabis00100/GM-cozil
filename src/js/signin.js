import "../css/style.css";
import auth from "./utils/auth";

document.addEventListener("DOMContentLoaded", () => {
  // Aguardar Alpine.js inicializar
  setTimeout(() => {
    const loginForm = document.getElementById("login-form");
    const errorDiv = document.getElementById("login-error");
    const loginButton = document.getElementById("login-button");
    const loginButtonText = document.getElementById("login-button-text");
    const loginButtonLoading = document.getElementById("login-button-loading");

    // Se já estiver logado, redirecionar
    if (auth.isAuthenticated()) {
      window.location.href = "index.html";
      return;
    }

  if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      // Mostrar loading
      loginButton.disabled = true;
      loginButtonText.classList.add("hidden");
      loginButtonLoading.classList.remove("hidden");
      errorDiv.classList.add("hidden");

      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      const rememberMe = document.getElementById("checkboxLabelOne")?.checked || false;

      // Simular delay de requisição
      await new Promise((resolve) => setTimeout(resolve, 500));

      const result = auth.login(email, password, rememberMe);

      if (result.success) {
        // Redirecionar para o dashboard
        window.location.href = "index.html";
      } else {
        // Mostrar erro
        errorDiv.textContent = result.message;
        errorDiv.classList.remove("hidden");
        loginButton.disabled = false;
        loginButtonText.classList.remove("hidden");
        loginButtonLoading.classList.add("hidden");
      }
    });
    }
  }, 100);
});

