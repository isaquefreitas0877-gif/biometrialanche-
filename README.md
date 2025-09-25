# 🔐 Site de Reconhecimento Biométrico (WebAuthn + LocalStorage)

Este é um protótipo simples de reconhecimento biométrico usando **WebAuthn** no navegador e **localStorage** para armazenar dados.

## 🚀 Funcionalidades
- Cadastrar usuário: cria uma credencial biométrica + salva imagem associada.
- Ler biometria: autentica com WebAuthn e exibe a foto cadastrada por **4 segundos**.
- Armazenamento local no navegador (sem servidor).

## 📂 Estrutura
```
index.html   # Página principal
style.css    # Estilos
script.js    # Lógica WebAuthn + LocalStorage
```

## ⚡ Deploy no Render
1. Crie um repositório no GitHub e envie esses arquivos.
2. No [Render](https://render.com), crie um novo **Static Site**.
3. Conecte ao repositório.
4. Configure:
   - **Build Command**: vazio (não precisa)
   - **Publish Directory**: `.`
5. Clique em **Deploy** 🎉

## ⚠️ Observações
- WebAuthn funciona apenas em **HTTPS** ou em `localhost`.
- Testado em Chrome, Edge, Safari e navegadores móveis modernos.
- É apenas um protótipo para estudo — não deve ser usado em produção sem back-end seguro.
