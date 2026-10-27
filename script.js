const carros = [
  { marca: "Jeep", modelo: "Renegade", km: 24000, preco: 210000, motor: "combustao",
    foto: "https://quatrorodas.abril.com.br/wp-content/uploads/2016/11/5658ca1cde40d64c2040e52f668-renegade-011.jpeg?quality=70&strip=all&w=600" },
  { marca: "Chevrolet", modelo: "Onix 26/27", km: 26000, preco: 250000, motor: "combustao",
    foto: "https://pcdshop.com.br/site-2020/wp-content/uploads/2020/11/Captura-de-Tela-2020-11-24-a%CC%80s-15.40.12.png" },
  { marca: "Volkswagen", modelo: "T-Cross 25/26", km: 27000, preco: 200000, motor: "combustao",
    foto: "https://cloudfront.alpes.one/public/6a7/488/073/6a7488073b3ae925458768.png" },
  { marca: "Volkswagen", modelo: "Jetta GLI", km: 20000, preco: 220000, motor: "combustao",
    foto: "https://promotive-public-images.s3.sa-east-1.amazonaws.com/a_fotos_vehiculos/m_vw%20jetta%20gli%2022.jpg" },
  { marca: "Dodge", modelo: "RAM 3500", km: 1000, preco: 230000, motor: "hibrido",
    foto: "https://production.autoforce.com/uploads/version/profile_image/10353/model_main_webp_comprar-laramie_f10f4f75c7.png.webp" },
  { marca: "Fiat", modelo: "Toro", km: 23000, preco: 350000, motor: "combustao",
    foto: "https://production.autoforce.com/uploads/version/profile_image/4927/comprar-volcano-2-0-at9-4x4-diesel_6fd0afc6dd.png" },
  { marca: "Toyota", modelo: "SW4", km: 22000, preco: 400000, motor: "combustao",
    foto: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=600&q=70&fm=webp" },
  { marca: "BYD", modelo: "Dolphin", km: 30000, preco: 300000, motor: "eletrico",
    foto: "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=600&q=70&fm=webp" }
];
 
const campos = ["marca", "modelo", "preco", "motor"];
const esc = s => String(s).replace(/[&<>"']/g, ch => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch]));
 
function mostrarCarros() {
  const v = {};
  campos.forEach(c => {
    const el = document.getElementById(c);
    v[c] = el ? el.value.toLowerCase().trim() : "";
  });
 
  const filtrados = carros.filter(c =>
    (!v.marca  || c.marca.toLowerCase() === v.marca) &&
    (!v.modelo || c.modelo.toLowerCase().includes(v.modelo)) &&
    (!v.preco  || c.preco <= Number(v.preco)) &&
    (!v.motor  || c.motor === v.motor)
  );
 
  const lista = document.getElementById("lista");
  if (!lista) return;
 
  lista.innerHTML = filtrados.length
    ? filtrados.map((c, i) => {
        const nome = esc(c.marca + " " + c.modelo);
        const motor = c.motor.charAt(0).toUpperCase() + c.motor.slice(1);
        // 1ª imagem com prioridade; demais com lazy-load
        const imgAttrs = i === 0 ? 'fetchpriority="high"' : 'loading="lazy"';
        return `
        <div class="card">
          <div class="foto">
            <img src="${esc(c.foto)}" alt="${nome}" width="600" height="400" ${imgAttrs} decoding="async" referrerpolicy="no-referrer">
          </div>
          <div class="info">
            <h3>${nome}</h3>
            <p>${c.km.toLocaleString("pt-BR")} km · Motor ${motor}</p>
            <div class="preco">R$ ${c.preco.toLocaleString("pt-BR")}</div>
            <a class="btn" target="_blank" rel="noopener"
               href="https://wa.me/5579999990000?text=${encodeURIComponent("Tenho interesse no " + c.marca + " " + c.modelo)}">Ver Detalhes</a>
          </div>
        </div>`;
      }).join("")
    : "<p class='vazio'>Nenhum veículo encontrado para os filtros selecionados.</p>";
}
 
// O script tem "defer": o DOM já está pronto quando ele roda.
function iniciar() {
  campos.forEach(c => {
    const el = document.getElementById(c);
    if (el) el.addEventListener("change", mostrarCarros);
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
    abaEntrar && abaEntrar.classList.toggle("ativa", !criar);
    abaCriar && abaCriar.classList.toggle("ativa", criar);
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
          : "Confira se o e-mail é válido e a senha tem no mínimo 6 caracteres.";
      }
    };
  }
 
  // ===== NAVEGAÇÃO ENTRE SEÇÕES =====
  function mostrarPagina() {
    let id = location.hash.slice(1);
    if (id === "consulta" || !id) id = "inicio";
    if (id === "duvidas") id = "faq";
    document.querySelectorAll(".pagina").forEach(p => {
      p.style.display = p.id === id ? "block" : "none";
    });
  }
  window.addEventListener("hashchange", mostrarPagina);
  mostrarPagina();
}
iniciar();
 
