document.addEventListener("DOMContentLoaded", function() {
    AOS.init(); // Inicializa animações

    // Scroll animado ao clicar no botão
    window.scrollToContact = function() {
        document.getElementById('contato').scrollIntoView({ behavior: 'smooth' });
    };

    // Animação do título
    gsap.from(".hero-content h1", { duration: 1, x: -100, opacity: 0 });
    gsap.from(".hero-content p", { duration: 1, delay: 0.5, x: -100, opacity: 0 });
    gsap.from(".hero-content button", { duration: 1, delay: 1, y: 20, opacity: 0 });
    gsap.from(".hero-image img", { duration: 1, x: 100, opacity: 0 });
});

//SCROLL SUAVE PARA CONTATO
document.querySelector(".botao-contato").addEventListener("click", function() {
    document.getElementById("contato").scrollIntoView({ behavior: "smooth" });
});

//SCROLL SUAVE PARA IR AO INICIO
document.getElementById("ir-ao-inicio").addEventListener("click", function() {
    document.getElementById("inicio").scrollIntoView({
        behavior: "smooth"
    });
});

// Função para alterar o placeholder dinamicamente
document.getElementById('pais-selecionado').addEventListener('click', function () {
    document.getElementById('lista-paises').style.display = 'block';
});

// Lista de estados organizados por país (código DDD)
const estadosPorPais = {
    "+55": ["São Paulo", "Rio de Janeiro", "Minas Gerais", "Bahia"],
    "+1": ["Califórnia", "Texas", "Nova York", "Flórida"],
    "+44": ["Inglaterra", "Escócia", "País de Gales"],
    "+33": ["Île-de-France", "Provence", "Normandia"],
    "+91": ["Maharashtra", "Tamil Nadu", "Kerala"]
};

// Lista de cidades organizadas por estado
const cidadesPorEstado = {
    "São Paulo": ["São Paulo", "Campinas", "Santos"],
    "Rio de Janeiro": ["Rio de Janeiro", "Niterói", "Petrópolis"],
    "Minas Gerais": ["Belo Horizonte", "Uberlândia", "Juiz de Fora"],
    "Bahia": ["Salvador", "Feira de Santana", "Ilhéus"],
    "Califórnia": ["Los Angeles", "San Francisco", "San Diego"],
    "Texas": ["Houston", "Dallas", "Austin"],
    "Nova York": ["Nova York", "Buffalo", "Rochester"],
    "Flórida": ["Miami", "Orlando", "Tampa"]
};

// Quando um país for selecionado, carrega os estados correspondentes
document.querySelectorAll('.pais-item').forEach(item => {
    item.addEventListener('click', function () {
        let bandeira = this.getAttribute('data-bandeira');
        let ddd = this.getAttribute('data-ddd');
        let paisSelecionado = ddd; // Agora está correto ✅

        // Atualiza a bandeira e o placeholder do telefone
        document.getElementById('icone-bandeira').src = bandeira;
        document.getElementById('telefone').placeholder = ddd;

        // Atualiza os estados disponíveis
        let listaEstados = document.getElementById('lista-estados');
        listaEstados.innerHTML = ""; // Limpa os estados anteriores
        let estados = estadosPorPais[paisSelecionado] || []; // Obtém os estados do país selecionado

        if (estados.length > 0) {
            estados.forEach(estado => {
                let li = document.createElement("li");
                li.textContent = estado;
                li.addEventListener("click", function () {
                    document.getElementById("estado").value = estado; // Preenche o input
                    listaEstados.style.display = "none"; // Esconde a lista

                    // Limpa e reseta a cidade ao mudar o estado
                    document.getElementById("cidade").value = "";
                    atualizarCidades(estado);
                });
                listaEstados.appendChild(li);
            });
        } else {
            let li = document.createElement("li");
            li.textContent = "Nenhum estado disponível";
            li.style.color = "gray";
            listaEstados.appendChild(li);
        }

        // Esconde a lista de países após a seleção
        document.getElementById('lista-paises').style.display = 'none';
    });
});

// Função para atualizar a lista de cidades com base no estado selecionado
function atualizarCidades(estadoSelecionado) {
    let listaCidades = document.getElementById('lista-cidades');
    listaCidades.innerHTML = ""; // Limpa as cidades anteriores
    let cidades = cidadesPorEstado[estadoSelecionado] || [];

    if (cidades.length > 0) {
        cidades.forEach(cidade => {
            let li = document.createElement("li");
            li.textContent = cidade;
            li.addEventListener("click", function () {
                document.getElementById("cidade").value = cidade; // Preenche o input
                listaCidades.style.display = "none"; // Esconde a lista
            });
            listaCidades.appendChild(li);
        });
    } else {
        let li = document.createElement("li");
        li.textContent = "Nenhuma cidade disponível";
        li.style.color = "gray";
        listaCidades.appendChild(li);
    }
}

// Abre e fecha a lista de estados ao clicar na seta
document.getElementById('abrir-estados').addEventListener('click', function (event) {
    let lista = document.getElementById('lista-estados');
    lista.style.display = lista.style.display === "block" ? "none" : "block";
    event.stopPropagation();
});

// Esconde a lista de estados ao clicar fora
document.addEventListener('click', function (event) {
    let dropdown = document.getElementById('lista-estados');
    let trigger = document.getElementById('abrir-estados');

    if (!dropdown.contains(event.target) && !trigger.contains(event.target)) {
        dropdown.style.display = 'none';
    }
});

// Abre e fecha a lista de cidades ao clicar na seta
document.getElementById('abrir-cidades').addEventListener('click', function (event) {
    let lista = document.getElementById('lista-cidades');
    lista.style.display = lista.style.display === "block" ? "none" : "block";
    event.stopPropagation();
});

// Esconde a lista de cidades ao clicar fora
document.addEventListener('click', function (event) {
    let dropdown = document.getElementById('lista-cidades');
    let trigger = document.getElementById('abrir-cidades');

    if (!dropdown.contains(event.target) && !trigger.contains(event.target)) {
        dropdown.style.display = 'none';
    }
});


