const API_URL = "https://69157c1f84e8bd126afa0016.mockapi.io/api/usuarios";

// --- REGISTRO ---
async function registrarUsuario(event) {
  event.preventDefault();

  const nombre = document.getElementById("register-nombre").value.trim();
  const email = document.getElementById("register-email").value.trim();
  const password = document.getElementById("register-password").value.trim();

  if (!nombre || !email || !password) {
    alert("Por favor completá todos los campos");
    return;
  }

  try {
    const res = await fetch(API_URL);
    const usuarios = await res.json();

    const existe = usuarios.find(u => u.email === email);
    if (existe) {
      alert("Este email ya está registrado");
      return;
    }

    const nuevoUsuario = { nombre, email, password };

    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(nuevoUsuario)
    });

    alert("Usuario registrado con éxito ✅");
  } catch (error) {
    console.error("Error al registrar usuario:", error);
    alert("Hubo un error al registrarse.");
  }
}

// --- LOGIN ---
async function iniciarSesion(event) {
  event.preventDefault();

  const email = document.getElementById("login-email").value.trim();
  const password = document.getElementById("login-password").value.trim();

  if (!email || !password) {
    alert("Por favor completá todos los campos");
    return;
  }

  try {
    const res = await fetch(API_URL);
    const usuarios = await res.json();

    const user = usuarios.find(u => u.email === email && u.password === password);

    if (user) {
      alert(`Bienvenido ${user.nombre}!`);
      localStorage.setItem("usuarioActivo", JSON.stringify(user));
      
      // A que pagina se redirige al abrir sesion:
      window.location.href = "dashboard.html";
    } else {
      alert("Email o contraseña incorrectos");
    }
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    alert("Hubo un error al iniciar sesión.");
  }
}