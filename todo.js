var listElement = document.querySelector('#app ul');
var inputElement = document.querySelector('#app input');
var btnElement = document.querySelector('#app button');

var todos = JSON.parse(localStorage.getItem('list_todos')) || [];

function renderTodos() {

	listElement.innerHTML = ''; //limpar a lista para adicionar apenas o novo todo
	for (todo of todos) {
		/*console.log(todo); Mostrar todo os valores do array*/
		var todoElement = document.createElement('li');
		var todoText = document.createTextNode(todo);

		var linkElement = document.createElement('a');
		
		linkElement.setAttribute('href','#');

		var posicao = todos.indexOf(todo);
		linkElement.setAttribute('onclick', 'deleteTodo(' +posicao+ ')' );
		
		var linkText = document.createTextNode('Excluir')

		linkElement.appendChild(linkText);

		todoElement.appendChild(todoText); //adicionar o texto ao li
		todoElement.appendChild(linkElement); //adicionar o link para exlcuir

		listElement.appendChild(todoElement); //adicionar o li ao ul
	}
}

renderTodos();

//Funcão para adicionar todo a lista
function addTodo () {

	var todoText = inputElement.value;

	if (todoText != "") 
	{
		todos.push(todoText); //adicona no array
		inputElement.value =''; //limpar depois de adicionar
		renderTodos();
		saveToStorage();
	}else {
		alert("Campo Vazio-Digite um todo!");
	}
}

btnElement.onclick = addTodo;

//Função para excluir todo
function deleteTodo (posicao) {
	todos.splice(posicao, 1);
	renderTodos();
	saveToStorage();
}

function saveToStorage () {
	//A Storage só armazena strings(chave:valor) , não grava nem array nem objeto
	localStorage.setItem('list_todos', JSON.stringify(todos));
}