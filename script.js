const carros = [
    {
      marca: "Jeep",
      modelo: "Renegade",
      km: 24000,
      preco: 210000,
      motor: "combustao",
      foto: "https://quatrorodas.abril.com.br/wp-content/uploads/2016/11/5658ca1cde40d64c2040e52f668-renegade-011.jpeg?quality=70&strip=all"
    },
    {
      marca: "Chevrolet",
      modelo: "Onix 26/27",
      km: 26000,
      preco: 250000,
      motor: "combustao",
      foto: "https://pcdshop.com.br/site-2020/wp-content/uploads/2020/11/Captura-de-Tela-2020-11-24-a%CC%80s-15.40.12.png"
    },
    {
      marca: "Volkswagen",
      modelo: "T-Cross 25/26",
      km: 27000,
      preco: 200000,
      motor: "combustao",
      foto: "https://cloudfront.alpes.one/public/6a7/488/073/6a7488073b3ae925458768.png"
    },
    {
      marca: "Volkswagen",
      modelo: "Jetta GLI",
      km: 20000,
      preco: 220000,
      motor: "combustao",
      foto: "https://promotive-public-images.s3.sa-east-1.amazonaws.com/a_fotos_vehiculos/m_vw%20jetta%20gli%2022.jpg",
      marca: "Dodge",
      modelo: "RAM 3500",
      km: 1000,
      preco: 230000,
      motor: "hibrido",
      foto: "https://production.autoforce.com/uploads/version/profile_image/10353/model_main_webp_comprar-laramie_f10f4f75c7.png.webp"
    },
    {
      marca: "Fiat",
      modelo: "Toro",
      km: 23000,
      preco: 350000,
      motor: "combustao",
      foto: "https://production.autoforce.com/uploads/version/profile_image/4927/comprar-volcano-2-0-at9-4x4-diesel_6fd0afc6dd.png"
    },
    {
      marca: "Toyota",
      modelo: "SW4",
      km: 22000,
      preco: 400000,
      motor: "combustao",
      foto: "https://images.unsplash.com/photo-151SUV-placeholder?auto=format&fit=crop&w=600&q=80"
    },
    {
      marca: "BYD",
      modelo: "Dolphin",
      km: 30000,
      preco: 300000,
      motor: "eletrico",
      foto: "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=600&q=80"
    }
  ];
  
  const campos = ["marca", "modelo", "preco", "motor"];
  
  // ===== FUNÇÃO PARA FILTRAR E RENDERIZAR CARROS =====
  function mostrarCarros() {
    const v = {};
    
    campos.forEach(c => {
      const el = document.getElementById(c);
      v[c] = el ? el.value.toLowerCase().trim() : "";
    });
  
    const filtrados = carros.filter(c => {
      const matchMarca = !v.marca || c.marca.toLowerCase().includes(v.marca) || v.marca.includes(c.marca.toLowerCase());
      const matchModelo = !v.modelo || c.modelo.toLowerCase().includes(v.modelo);
      const matchPreco = !v.preco || c.preco <= Number(v.preco);
      const matchMotor = !v.motor || c.motor.toLowerCase() === v.motor;
  
      return matchMarca && matchModelo && matchPreco && matchMotor;
    });
  
    const lista = document.getElementById("lista");
    if (!lista) return;
  
    lista.innerHTML = filtrados.length
      ? filtrados.map(c => `
          <div class="card" style="background:var(--cinza-card,#161a1d); border-radius:8px; border:1px solid var(--cinza-borda,#2e353b); overflow:hidden; display:flex; flex-direction:column;">
            <div class="foto" style="width:100%; height:200px; overflow:hidden;">
              <img src="${c.foto}" alt="${c.marca} ${c.modelo}" loading="lazy" style="width:100%; height:100%; object-fit:cover; transition: transform 0.3s ease;">
            </div>
            <div class="info" style="padding:1.5rem; display:flex; flex-direction:column; flex:1;">
              <h3 style="color:#fff; margin-bottom:0.5rem; font-size:1.2rem;">${c.marca} ${c.modelo}</h3>
              <p style="color:var(--cinza-texto-secundario,#a0a6ac); font-size:0.9rem;">
                ${Number(c.km).toLocaleString("pt-BR")} km · Motor ${c.motor.charAt(0).toUpperCase() + c.motor.slice(1)}
              </p>
              <div class="preco" style="color:var(--vermelho,#e50914); font-size:1.4rem; font-weight:bold; margin:1rem 0;">
                R$ ${Number(c.preco).toLocaleString("pt-BR")}
              </div>
              <a class="btn" target="_blank" style="display:block; text-align:center; margin-top:auto;"
                 href="https://wa.me/5579999990000?text=Tenho%20interesse%20no%20${encodeURIComponent(c.marca + ' ' + c.modelo)}">
                 Ver Detalhes
              </a>
            </div>
          </div>`).join("")
      : "<p style='grid-column: 1/-1; text-align:center; color:#a0a6ac; padding: 2rem;'>Nenhum veículo encontrado para os filtros selecionados.</p>";
  }
  
  // ===== EVENT LISTENERS =====
  document.addEventListener("DOMContentLoaded", () => {
    campos.forEach(c => {
      const el = document.getElementById(c);
      if (el) {
        el.addEventListener("change", mostrarCarros);
        el.addEventListener("input", mostrarCarros);
      }
    });
  
    mostrarCarros();
  
    // ===== LOGIN / CADASTRO =====
    const abaEntrar = document.getElementById("abaEntrar");
    const abaCriar = document.getElementById("abaCriar");
    const enviar = document.getElementById("enviar");
    const form = document.getElementById("form");
    const msg = document.getElementById("msg");
    const email = document.getElementById("email");
    const senha = form ? form.querySelector('input[type="password"]') : null;
  
    let criando = false;
  
    function trocarAba(criar) {
      criando = criar;
      if (abaEntrar) abaEntrar.classList.toggle("ativa", !criar);
      if (abaCriar) abaCriar.classList.toggle("ativa", criar);
      if (enviar) enviar.textContent = criar ? "Criar Conta" : "Entrar";
      if (msg) msg.textContent = "";
    }
  
    if (abaEntrar) abaEntrar.onclick = e => { e.preventDefault(); trocarAba(false); };
    if (abaCriar) abaCriar.onclick = e => { e.preventDefault(); trocarAba(true); };
  
    if (form) {
      form.onsubmit = e => {
        e.preventDefault();
        const emailOk = email && /^\S+@\S+\.\S+$/.test(email.value);
        const senhaOk = senha && senha.value.length >= 6;
  
        if (email) email.style.borderColor = emailOk ? "green" : "var(--vermelho, red)";
        if (senha) senha.style.borderColor = senhaOk ? "green" : "var(--vermelho, red)";
  
        if (msg) {
          msg.style.color = emailOk && senhaOk ? "#4CAF50" : "#E50914";
          msg.style.marginTop = "10px";
          msg.textContent = emailOk && senhaOk
            ? (criando ? "Conta criada com sucesso!" : "Login efetuado com sucesso!")
            : "Confira se o e-mail é válido e a senha tem no mínimo 6 dígitos.";
        }
      };
    }
  
    // ===== SISTEMA DE NAVEGAÇÃO ENTRE ABAS (#inicio, #faq, #login) =====
    function mostrarPagina() {
      let id = location.hash.slice(1);
      if (id === "consulta" || !id) id = "inicio";
      if (id === "duvidas") id = "faq";
  
      document.querySelectorAll(".pagina").forEach(p => {
        p.style.display = (p.id === id) ? "block" : "none";
      });
    }
  
    window.addEventListener("hashchange", mostrarPagina);
    mostrarPagina();
  });