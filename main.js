// =================================
// 1. ELEMENTOS DO HTML
// =================================

const botaoNovo = document.getElementById("novo");
const modal = document.getElementById("modal-paciente");
const formulario = document.getElementById("form-paciente");

const lista = document.getElementById("lista-pacientes");
const conteudo = document.getElementById("conteudo-paciente");
const quantidade = document.getElementById("quantidade-pacientes");

let editando = false;


// =================================
// 2. PACIENTES INICIAIS
// =================================

const pacientesIniciais = [
    {
        nome: "Maria de Lourdes Silva",
        nascimento: "1958-04-11",
        cpf: "",
        sexo: "Não informado",
        telefone: "",
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
        cpf: "",
        sexo: "Não informado",
        telefone: "",
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
        cpf: "",
        sexo: "Não informado",
        telefone: "",
        convenio: "",
        leito: "Em acompanhamento",
        alergia: "",
        sangue: "Não informado",
        condicoes: [],
        medicacoes: [],
        plano: "Nenhum plano registrado."
    }
];


// Carregar pacientes salvos no navegador.
// Se ainda não houver dados salvos, usar os pacientes iniciais.

let pacientesSalvos = localStorage.getItem("pacientesLifeCare");

let pacientes = pacientesSalvos
    ? JSON.parse(pacientesSalvos)
    : pacientesIniciais;

if (!pacientesSalvos) {
    localStorage.setItem("pacientesLifeCare", JSON.stringify(pacientes));
}

let pacienteSelecionado = pacientes.length > 0 ? pacientes[0] : null;


// Salvar a lista principal no navegador.

function salvarPacientes() {
    localStorage.setItem("pacientesLifeCare", JSON.stringify(pacientes));
}


// =================================
// 3. ABRIR E FECHAR O FORMULÁRIO
// =================================

botaoNovo.addEventListener("click", function() {

    editando = false;
    formulario.reset();

    document.querySelector(".modal-conteudo h2").textContent =
        "Registrar novo paciente";

    formulario.querySelector('button[type="submit"]').textContent =
        "Registrar paciente";

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

        let partes = paciente.nome.trim().split(" ");
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
        leito.textContent = paciente.leito || "Leito não informado";

        informacoes.appendChild(nome);
        informacoes.appendChild(leito);

        item.appendChild(avatar);
        item.appendChild(informacoes);

        item.addEventListener("click", function() {
            pacienteSelecionado = paciente;
            mostrarLista();
            mostrarProntuario();
        });

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

    conteudo.innerHTML = `
        <header class="cabecalho-paciente">
            <div>
                <h2 id="nome-prontuario"></h2>
                <p id="convenio-prontuario"></p>
            </div>

            <div class="acoes">
                <button id="editar-paciente" type="button">
                    <i class="fi fi-rr-edit"></i>
                    Atualizar dados
                </button>

                <button id="arquivar-paciente" type="button">
                    <i class="fi fi-rr-folder"></i>
                    Arquivar paciente
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
                <p id="cpf-prontuario"></p>
                <p id="sexo-prontuario"></p>
                <p id="telefone-prontuario"></p>
                <p id="sangue-prontuario"></p>
                <p id="leito-prontuario"></p>
            </article>

        </div>
    `;

    // Preencher os dados do paciente.

    document.getElementById("nome-prontuario").textContent =
        paciente.nome;

    document.getElementById("convenio-prontuario").textContent =
        paciente.convenio || "Convênio não informado";

    document.getElementById("alergia-prontuario").textContent =
        paciente.alergia || "Nenhuma alergia registrada.";

    document.getElementById("plano-prontuario").textContent =
        paciente.plano || "Nenhum plano registrado.";

    document.getElementById("nascimento-prontuario").textContent =
        "Nascimento: " + (paciente.nascimento || "Não informado");

    document.getElementById("cpf-prontuario").textContent =
        "CPF: " + (paciente.cpf || "Não informado");

    document.getElementById("sexo-prontuario").textContent =
        "Sexo: " + (paciente.sexo || "Não informado");

    document.getElementById("telefone-prontuario").textContent =
        "Telefone: " + (paciente.telefone || "Não informado");

    document.getElementById("sangue-prontuario").textContent =
        "Tipo sanguíneo: " + (paciente.sangue || "Não informado");

    document.getElementById("leito-prontuario").textContent =
        "Leito: " + (paciente.leito || "Não informado");


    // Mostrar condições ativas.

    let condicoes = document.getElementById("condicoes-prontuario");

    if (!paciente.condicoes || paciente.condicoes.length === 0) {
        condicoes.textContent = "Nenhuma condição registrada.";
    } else {
        for (let i = 0; i < paciente.condicoes.length; i++) {
            let paragrafo = document.createElement("p");
            paragrafo.textContent = paciente.condicoes[i];
            condicoes.appendChild(paragrafo);
        }
    }


    // Mostrar medicações.

    let medicacoes = document.getElementById("medicacoes-prontuario");

    if (!paciente.medicacoes || paciente.medicacoes.length === 0) {
        medicacoes.textContent = "Nenhuma medicação registrada.";
    } else {
        for (let i = 0; i < paciente.medicacoes.length; i++) {
            let paragrafo = document.createElement("p");
            paragrafo.textContent = paciente.medicacoes[i];
            medicacoes.appendChild(paragrafo);
        }
    }


    // =================================
    // 6. ATUALIZAR DADOS DO PACIENTE
    // =================================

    document.getElementById("editar-paciente").addEventListener("click", function() {

        editando = true;

        document.getElementById("nome").value = paciente.nome;
        document.getElementById("nascimento").value = paciente.nascimento || "";
        document.getElementById("cpf").value = paciente.cpf || "";
        document.getElementById("sexo").value = paciente.sexo || "Não informado";
        document.getElementById("sangue").value = paciente.sangue || "Não informado";
        document.getElementById("telefone").value = paciente.telefone || "";
        document.getElementById("convenio").value = paciente.convenio || "";
        document.getElementById("leito").value = paciente.leito || "";
        document.getElementById("alergia").value = paciente.alergia || "";

        document.querySelector(".modal-conteudo h2").textContent =
            "Atualizar dados do paciente";

        formulario.querySelector('button[type="submit"]').textContent =
            "Salvar alterações";

        modal.style.display = "flex";
    });


    // =================================
    // 7. ARQUIVAR PACIENTE
    // =================================

    document.getElementById("arquivar-paciente").addEventListener("click", function() {

        let confirmar = confirm("Deseja arquivar este paciente?");

        if (confirmar) {

            let arquivos = JSON.parse(localStorage.getItem("pacientesArquivados")) || [];

            arquivos.push(pacienteSelecionado);

            localStorage.setItem("pacientesArquivados", JSON.stringify(arquivos));

            let indice = pacientes.indexOf(pacienteSelecionado);

            pacientes.splice(indice, 1);

            salvarPacientes();

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
// 8. CADASTRAR E SALVAR ALTERAÇÕES
// =================================

formulario.addEventListener("submit", function(event) {

    event.preventDefault();

    if (editando) {

        // Atualiza o paciente que já estava selecionado.

        pacienteSelecionado.nome = document.getElementById("nome").value;
        pacienteSelecionado.nascimento = document.getElementById("nascimento").value;
        pacienteSelecionado.cpf = document.getElementById("cpf").value;
        pacienteSelecionado.sexo = document.getElementById("sexo").value;
        pacienteSelecionado.sangue = document.getElementById("sangue").value;
        pacienteSelecionado.telefone = document.getElementById("telefone").value;
        pacienteSelecionado.convenio = document.getElementById("convenio").value;
        pacienteSelecionado.leito = document.getElementById("leito").value;
        pacienteSelecionado.alergia = document.getElementById("alergia").value;

        editando = false;

    } else {

        // Cria um novo paciente.

        let novoPaciente = {
            nome: document.getElementById("nome").value,
            nascimento: document.getElementById("nascimento").value,
            cpf: document.getElementById("cpf").value,
            sexo: document.getElementById("sexo").value,
            sangue: document.getElementById("sangue").value,
            telefone: document.getElementById("telefone").value,
            convenio: document.getElementById("convenio").value,
            leito: document.getElementById("leito").value,
            alergia: document.getElementById("alergia").value,
            condicoes: [],
            medicacoes: [],
            plano: "Nenhum plano de tratamento registrado."
        };

        pacientes.push(novoPaciente);
        pacienteSelecionado = novoPaciente;
    }

    salvarPacientes();

    mostrarLista();
    mostrarProntuario();

    formulario.reset();
    modal.style.display = "none";

    document.querySelector(".modal-conteudo h2").textContent =
        "Registrar novo paciente";

    formulario.querySelector('button[type="submit"]').textContent =
        "Registrar paciente";

});


// =================================
// 9. INICIAR SISTEMA
// =================================

mostrarLista();
mostrarProntuario();
