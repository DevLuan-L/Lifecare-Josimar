document.getElementById("login-form").addEventListener("submit" ,function(event){
    event.preventDefault();

    const selecionar = document.getElementById("selecionar").value;
    const usuario = document.getElementById("usuario").value.trim();
    const senha = document.getElementById("senha").value.trim();

    const users ={
        Doutor : {usuario:"Doutor" , senha: "Doutor", page:"Doutor.html"},
        Enfermeiro : {usuario:"Enfermeiro" , senha: "Enfermeiro", page:"Enfermeiro.html"},
        Recepcionista: {usuario:"Recepcionista" , senha: "Recepcionista", page:"Recepcionista.html"},
    }
    
    if (users[selecionar].usuario === usuario && users[selecionar].senha === senha) {
        window.location.href = users [selecionar].page;
    }
});