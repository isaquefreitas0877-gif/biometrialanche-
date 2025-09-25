// Utilitário para gerar números aleatórios (ids fake de credenciais)
function randomBase64(len = 32) {
  const array = new Uint8Array(len);
  window.crypto.getRandomValues(array);
  return btoa(String.fromCharCode.apply(null, array));
}

// Armazena usuários no localStorage
function getUsers() {
  return JSON.parse(localStorage.getItem("users") || "[]");
}
function saveUsers(users) {
  localStorage.setItem("users", JSON.stringify(users));
}

// ---------- REGISTRO ----------
async function registerUser() {
  try {
    // Gera desafio
    const challenge = new Uint8Array(32);
    crypto.getRandomValues(challenge);

    // Pede credencial biométrica (WebAuthn)
    const credential = await navigator.credentials.create({
      publicKey: {
        challenge,
        rp: { name: "Meu Site Biométrico" },
        user: {
          id: new TextEncoder().encode(randomBase64(8)),
          name: "user" + Date.now(),
          displayName: "Usuário"
        },
        pubKeyCredParams: [{ type: "public-key", alg: -7 }],
        authenticatorSelection: { authenticatorAttachment: "platform", userVerification: "required" },
        timeout: 60000,
        attestation: "none"
      }
    });

    // Pede imagem do usuário
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";
    fileInput.click();

    fileInput.onchange = () => {
      const file = fileInput.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        const imageData = reader.result;

        const users = getUsers();
        users.push({
          id: btoa(String.fromCharCode(...new Uint8Array(credential.rawId))),
          image: imageData
        });
        saveUsers(users);

        alert("Usuário cadastrado com sucesso!");
      };
      reader.readAsDataURL(file);
    };
  } catch (err) {
    alert("Erro ao cadastrar: " + err);
  }
}

// ---------- LOGIN ----------
async function loginUser() {
  try {
    const users = getUsers();
    if (users.length === 0) {
      alert("Nenhum usuário cadastrado!");
      return;
    }

    const challenge = new Uint8Array(32);
    crypto.getRandomValues(challenge);

    const assertion = await navigator.credentials.get({
      publicKey: {
        challenge,
        allowCredentials: users.map(u => ({
          type: "public-key",
          id: Uint8Array.from(atob(u.id), c => c.charCodeAt(0))
        })),
        userVerification: "required",
        timeout: 60000
      }
    });

    // Acha usuário pelo id da credencial
    const credId = btoa(String.fromCharCode(...new Uint8Array(assertion.rawId)));
    const user = users.find(u => u.id === credId);

    if (user) {
      const img = document.getElementById("userPhoto");
      img.src = user.image;

      document.getElementById("main").classList.add("hidden");
      document.getElementById("photoContainer").classList.remove("hidden");

      setTimeout(() => {
        document.getElementById("photoContainer").classList.add("hidden");
        document.getElementById("main").classList.remove("hidden");
      }, 4000);
    } else {
      alert("Usuário não encontrado!");
    }
  } catch (err) {
    alert("Falha na autenticação: " + err);
  }
}

// ---------- EVENTOS ----------
document.getElementById("btnRegister").addEventListener("click", registerUser);
document.getElementById("btnLogin").addEventListener("click", loginUser);