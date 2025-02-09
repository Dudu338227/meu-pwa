document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const loginContainer = document.getElementById('login-container');
    const mainContainer = document.getElementById('main-container');

    // Verificar se o usuário está logado
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

    // Exibir a tela correta com base no estado de login
    if (isLoggedIn) {
        loginContainer.style.display = 'none';
        mainContainer.style.display = 'block';
    } else {
        loginContainer.style.display = 'block';
        mainContainer.style.display = 'none';
    }

    // Função de Login
    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        if (email && password) {
            localStorage.setItem('isLoggedIn', 'true'); // Marcar como logado
            loginContainer.style.display = 'none';
            mainContainer.style.display = 'block';
        } else {
            alert('Por favor, preencha todos os campos.');
        }
    });

    // Função de Logout
    window.logout = () => {
        localStorage.setItem('isLoggedIn', 'false'); // Marcar como não logado
        window.location.href = 'index.html'; // Recarregar a página para exibir o login
    };

    // Função para adicionar entrada
    const entryForm = document.getElementById('entry-form');
    entryForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const setor = document.getElementById('setor').value;
        const nome = document.getElementById('nome').value;
        const data = document.getElementById('data').value;
        const descricao = document.getElementById('descricao').value;
        const status = document.getElementById('status').value;

        // Criar a nova entrada
        const newEntry = {
            setor: setor,
            nome: nome,
            data: data,
            descricao: descricao,
            status: status
        };

        // Salvar a entrada no localStorage
        const entries = JSON.parse(localStorage.getItem('entries')) || {};
        entries[setor] = newEntry;
        localStorage.setItem('entries', JSON.stringify(entries));

        alert('Entrada adicionada com sucesso!');
        entryForm.reset();
    });

    // Função para alternar status
    window.toggleStatus = (button) => {
        const statusSpan = button.previousElementSibling.querySelector('span');
        if (statusSpan.textContent === 'Pendente') {
            statusSpan.textContent = 'Feito';
            statusSpan.className = 'feito';
            button.textContent = 'Trocar para Pendente';
        } else {
            statusSpan.textContent = 'Pendente';
            statusSpan.className = 'pendente';
            button.textContent = 'Trocar para Feito';
        }
        saveEntries(); // Atualiza o localStorage após a mudança
    };

    // Função para salvar entradas
    function saveEntries() {
        const entries = {
            recebimento: document.getElementById('recebimento').innerHTML,
            expedicao: document.getElementById('expedicao').innerHTML,
            separacao: document.getElementById('separacao').innerHTML
        };
        localStorage.setItem('entries', JSON.stringify(entries));
    }
});