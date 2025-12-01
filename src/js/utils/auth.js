// Sistema de Autenticação
class Auth {
  constructor() {
    this.currentUser = null;
    this.init();
  }

  init() {
    // Verificar se há usuário logado no localStorage
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      this.currentUser = JSON.parse(savedUser);
    }
  }

  // Usuários padrão (em produção, isso viria de um backend)
  users = [
    {
      id: 1,
      email: 'admin@cozil.com',
      password: 'admin123',
      name: 'Administrador',
      role: 'admin'
    },
    {
      id: 2,
      email: 'usuario@cozil.com',
      password: 'user123',
      name: 'Usuário',
      role: 'user'
    }
  ];

  login(email, password, rememberMe = false) {
    // Validar email e senha
    if (!email || !password) {
      return { success: false, message: 'Email e senha são obrigatórios' };
    }

    // Buscar usuário
    const user = this.users.find(u => u.email === email && u.password === password);

    if (!user) {
      return { success: false, message: 'Email ou senha incorretos' };
    }

    // Criar sessão
    this.currentUser = {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role
    };

    // Salvar no localStorage
    if (rememberMe) {
      localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
      localStorage.setItem('rememberMe', 'true');
    } else {
      sessionStorage.setItem('currentUser', JSON.stringify(this.currentUser));
    }

    return { success: true, user: this.currentUser };
  }

  logout() {
    this.currentUser = null;
    localStorage.removeItem('currentUser');
    localStorage.removeItem('rememberMe');
    sessionStorage.removeItem('currentUser');
    window.location.href = 'signin.html';
  }

  isAuthenticated() {
    // Verificar localStorage primeiro (remember me)
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      this.currentUser = JSON.parse(savedUser);
      return true;
    }

    // Verificar sessionStorage
    const sessionUser = sessionStorage.getItem('currentUser');
    if (sessionUser) {
      this.currentUser = JSON.parse(sessionUser);
      return true;
    }

    return false;
  }

  getCurrentUser() {
    if (!this.currentUser) {
      const savedUser = localStorage.getItem('currentUser') || sessionStorage.getItem('currentUser');
      if (savedUser) {
        this.currentUser = JSON.parse(savedUser);
      }
    }
    return this.currentUser;
  }

  requireAuth() {
    // Evitar loop de redirecionamento
    if (window.location.pathname.includes('signin.html')) {
      return true;
    }
    
    if (!this.isAuthenticated()) {
      window.location.href = 'signin.html';
      return false;
    }
    return true;
  }
}

// Instância global
const auth = new Auth();

export default auth;

