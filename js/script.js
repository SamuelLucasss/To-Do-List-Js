//Seleção de Elementos
const todoForm = document.getElementById("todo-form-container");
const todoInput = document.getElementById("todo-input");
const editForm = document.getElementById("edit-form-container");
const editInput = document.getElementById("edit-input");
const cancelEditBtn = document.getElementById("edit-cancel-btn");
const pesquisarInput = document.getElementById("pesquisar-input");
const apagarBtnPesquisar = document.querySelector(".apagar-btn-pesquisar");
const filtroSelect = document.getElementById("filtro-select");
const ferramentas = document.getElementById("esconder-ferramentas");
const todoList = document.getElementById("todo-list");

let oldTitleTodo;

// Funções
const addTodo = (tarefa) => {
    const todo = document.createElement("div");
    todo.classList.add("todo");

    const titleTodo = document.createElement("h3");
    titleTodo.innerText = tarefa;
    todo.appendChild(titleTodo);

    const todoFinish = document.createElement("button");
    todoFinish.classList.add("tarefa-finalizada");
    todoFinish.innerHTML = '<i class="fa-solid fa-check"></i>';
    todo.appendChild(todoFinish);

    const todoEdit = document.createElement("button");
    todoEdit.classList.add("tarefa-finalizada");
    todoEdit.innerHTML = '<i class="fa-solid fa-pen"></i>';
    todo.appendChild(todoEdit);

    const excluirTodo = document.createElement("button");
    excluirTodo.classList.add("tarefa-finalizada");
    excluirTodo.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    todo.appendChild(excluirTodo);

    todoList.appendChild(todo);

    todoInput.value = "";
    todoInput.focus();
};

const alternarForms = () => {
    todoForm.classList.toggle("hide");
    editForm.classList.toggle("hide");
    todoList.classList.toggle("hide");
    ferramentas.classList.toggle("hide");
};

const atualizarTodo = (novaTarefa) => {
    const todos = document.querySelectorAll(".todo")

    todos.forEach((todo) => {
        let titleTodo = todo.querySelector("h3");
         
        if(titleTodo.innerText === oldTitleTodo) {
            titleTodo.innerText = novaTarefa;
        };
    });
};

const filtrarTodo = (filterValue) => {
    const todos = document.querySelectorAll(".todo");

    switch(filterValue) {
        case "todos":
            todos.forEach((todo) => (todo.style.display = "flex"));
            break;

        case "feitos":
            todos.forEach((todo) => {
                todo.classList.contains("feito")
                ? (todo.style.display = "flex")
                : (todo.style.display = "none");
            });
            break;

        case "afazer":
            todos.forEach((todo) => {
                !todo.classList.contains("feito")
                ? (todo.style.display = "flex")
                : (todo.style.display = "none");
            });
    };
};

const pesquisarTodo = (pesquisa) => {
    const todos = document.querySelectorAll(".todo");

    todos.forEach((todo) => {
        const titleTodo = todo.querySelector("h3").innerText;

        todo.style.display = "flex";

        if(!titleTodo.includes(pesquisa)) {
            todo.style.display = "none";
        };
    });
};

// Eventos
todoForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const todoValue = todoInput.value;

    addTodo(todoValue);
});

document.addEventListener('click', (e) => {
    const targetEl = e.target;
    const parentEl = targetEl.closest("div");
    let titleTodo;

    if(targetEl.classList.contains("tarefa-finalizada")) {
        parentEl.classList.toggle("feito");
    };

    if(targetEl.classList.contains("excluir-tarefa")) {
        parentEl.remove();
    };

    if(parentEl && parentEl.querySelector("h3")) {
        titleTodo = parentEl.querySelector("h3").innerText;
    };

    if(targetEl.classList.contains("editar-tarefa")) {
        alternarForms();
        
        editInput.value = titleTodo;
        oldTitleTodo = titleTodo;
    };
});

cancelEditBtn.addEventListener('click', (e) => {
    e.preventDefault();

    alternarForms();
});

editForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const editInputValue = editInput.value;

    if(editInputValue) {
        atualizarTodo(editInputValue);
    };

    alternarForms();
});

filtroSelect.addEventListener('change', (e) => {
    const filtroValue = e.target.value;

    filtrarTodo(filtroValue);
});

pesquisarInput.addEventListener('keyup', (e) => {
    const pesquisa = e.target.value;

    pesquisarTodo(pesquisa);
});

apagarBtnPesquisar.addEventListener('click', (e) => {
    e.preventDefault();

    pesquisarInput.value = "";

    pesquisarInput.dispatchEvent(new Event("keyup"));
});
