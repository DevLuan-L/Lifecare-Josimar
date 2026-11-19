
// =================================
// 1. ELEMENTOS DO HTML
// =================================

const botaoNovo = document.getElementById("novo");
const modal = document.getElementById("modal-paciente");
const formulario = document.getElementById("form-paciente");

const lista = document.getElementById("lista-pacientes");
const conteudo = document.getElementById("conteudo-paciente");
const quantidade = document.getElementById("quantidade-pacientes");


// =================================
// 2. PACIENTES CADASTRADOS
// =================================

let pacientes = [

    {
        nome: "Maria de Lourdes Silva",
        nascimento: "1958-04-11",
        convenio: "Unimed Goiânia",
        leito: "Leito 204",
        alergia: "Dipirona, Látex",
        sangue: "O+",
        condicoes: ["Pneumonia comunitária", "Hipertensão arterial"],
        medicacoes: ["Ceftriaxona 1 g", "Losartana 50 mg"],
        plano: "Manter antibioticoterapia venosa, fisioterapia respiratória duas vezes ao dia e controle de saturação a cada 4 horas."
    },

    {
        nome: "João Pedro Ferreira",
        nascimento: "",
        convenio: "",
        leito: "Leito 08",
        alergia: "",
        sangue: "Não informado",
        condicoes: [],
        medicacoes: [],
        plano: "Nenhum plano registrado."
    },

    {
        nome: "Camila Nunes Ribeiro",
        nascimento: "",
        convenio: "",
        leito: "Em acompanhamento",
        alergia: "",
        sangue: "Não informado",
        condicoes: [],
        medicacoes: [],
        plano: "Nenhum plano registrado."
    }

];

let pacienteSelecionado = pacientes[0];


// =================================
// 3. ABRIR E FECHAR MODAL
// =================================

botaoNovo.addEventListener("click", function() {

    modal.style.display = "flex";

});

document.getElementById("fechar-modal").addEventListener("click", function() {

    modal.style.display = "none";

});

document.getElementById("cancelar").addEventListener("click", function() {

    modal.style.display = "none";

});


// =================================
// 4. MOSTRAR LISTA DE PACIENTES
// =================================

function mostrarLista() {

    lista.innerHTML = "";

    for (let i = 0; i < pacientes.length; i++) {

        let paciente = pacientes[i];

        let partes = paciente.nome.split(" ");
        let iniciais = partes[0][0] + partes[partes.length - 1][0];

        let item = document.createElement("div");
        item.classList.add("paciente");

        let avatar = document.createElement("div");
        avatar.classList.add("avatar");
        avatar.textContent = iniciais.toUpperCase();

        let informacoes = document.createElement("div");

        let nome = document.createElement("strong");
        nome.textContent = paciente.nome;

        let leito = document.createElement("p");
        leito.textContent = paciente.leito;

        informacoes.appendChild(nome);
        informacoes.appendChild(leito);

        item.appendChild(avatar);
        item.appendChild(informacoes);

        // Selecionar paciente ao clicar

        item.addEventListener("click", function() {

            pacienteSelecionado = paciente;

            mostrarLista();
            mostrarProntuario();

        });

        // Destacar paciente selecionado

        if (paciente === pacienteSelecionado) {

            item.classList.add("selecionado");

        }

        lista.appendChild(item);

    }

    quantidade.textContent = pacientes.length + " registros encontrados";

}


// =================================
// 5. MOSTRAR PRONTUÁRIO
// =================================

function mostrarProntuario() {

    if (pacienteSelecionado === null) {

        conteudo.innerHTML = "<h2>Nenhum paciente cadastrado.</h2>";

        return;

    }

    let paciente = pacienteSelecionado;

    // Estrutura do prontuário

    conteudo.innerHTML = `

        <header class="cabecalho-paciente">

            <div>
                <h2 id="nome-prontuario"></h2>
                <p id="convenio-prontuario"></p>
            </div>

            <div class="acoes">

    <button id="remover-paciente" type="button">
        <i class="fi fi-rr-trash"></i>
        Excluir paciente
    </button>

</div>

        </header>

        <div class="alerta">

            <strong>
                <i class="fi fi-rr-exclamation"></i>
                ATENÇÃO CLÍNICA
            </strong>

            <p id="alergia-prontuario"></p>

        </div>

        <nav class="abas">

            <span>Resumo clínico</span>
            <span>Histórico</span>
            <span>Exames</span>

        </nav>

        <div class="dashboard">

            <article class="card">

                <h3>
                    <i class="fi fi-rr-ballot"></i>
                    Plano de tratamento
                </h3>

                <p id="plano-prontuario"></p>

            </article>

            <article class="card">

                <h3>
                    <i class="fi fi-rr-hospital"></i>
                    Condições ativas
                </h3>

                <div id="condicoes-prontuario"></div>

            </article>

            <article class="card">

                <h3>
                    <i class="fi fi-rr-document-signed"></i>
                    Medicações em uso
                </h3>

                <div id="medicacoes-prontuario"></div>

            </article>

            <article class="card">

                <h3>
                    <i class="fi fi-rr-user"></i>
                    Dados do atendimento
                </h3>

                <p id="nascimento-prontuario"></p>
                <p id="sangue-prontuario"></p>
                <p id="leito-prontuario"></p>

            </article>

        </div>

    `;


    // Preencher informações

    document.getElementById("nome-prontuario").textContent =
        paciente.nome;

    document.getElementById("convenio-prontuario").textContent =
        paciente.convenio || "Convênio não informado";

    document.getElementById("alergia-prontuario").textContent =
        paciente.alergia || "Nenhuma alergia registrada.";

    document.getElementById("plano-prontuario").textContent =
        paciente.plano;

    document.getElementById("nascimento-prontuario").textContent =
        "Nascimento: " + (paciente.nascimento || "Não informado");

    document.getElementById("sangue-prontuario").textContent =
        "Tipo sanguíneo: " + paciente.sangue;

    document.getElementById("leito-prontuario").textContent =
        "Leito: " + paciente.leito;


    // Mostrar condições

    let condicoes = document.getElementById("condicoes-prontuario");

    if (paciente.condicoes.length === 0) {

        condicoes.textContent = "Nenhuma condição registrada.";

    } else {

        for (let i = 0; i < paciente.condicoes.length; i++) {

            let paragrafo = document.createElement("p");

            paragrafo.textContent = paciente.condicoes[i];

            condicoes.appendChild(paragrafo);

        }

    }


    // Mostrar medicações

    let medicacoes = document.getElementById("medicacoes-prontuario");

    if (paciente.medicacoes.length === 0) {

        medicacoes.textContent = "Nenhuma medicação registrada.";

    } else {

        for (let i = 0; i < paciente.medicacoes.length; i++) {

            let paragrafo = document.createElement("p");

            paragrafo.textContent = paciente.medicacoes[i];

            medicacoes.appendChild(paragrafo);

        }

    }


    // =================================
    // 6. REMOVER PACIENTE
    // =================================

    document.getElementById("remover-paciente").addEventListener("click", function() {

        let confirmar = confirm("Deseja remover este paciente?");

        if (confirmar) {

            let indice = pacientes.indexOf(pacienteSelecionado);

            pacientes.splice(indice, 1);

            if (pacientes.length > 0) {

                pacienteSelecionado = pacientes[0];

            } else {

                pacienteSelecionado = null;

            }

            mostrarLista();
            mostrarProntuario();

        }

    });

}


// =================================
// 7. CADASTRAR NOVO PACIENTE
// =================================

formulario.addEventListener("submit", function(event) {

    event.preventDefault();

    let novoPaciente = {

        nome: document.getElementById("nome").value,
        nascimento: document.getElementById("nascimento").value,
        convenio: document.getElementById("convenio").value,
        leito: document.getElementById("leito").value,
        alergia: document.getElementById("alergia").value,
        sangue: document.getElementById("sangue").value,

        condicoes: [],
        medicacoes: [],

        plano: "Nenhum plano de tratamento registrado."

    };

    pacientes.push(novoPaciente);

    pacienteSelecionado = novoPaciente;

    mostrarLista();
    mostrarProntuario();

    formulario.reset();

    modal.style.display = "none";

});


// =================================
// 8. INICIAR SISTEMA
// =================================

mostrarLista();
mostrarProntuario();
