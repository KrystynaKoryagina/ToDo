import { loader } from './loader';

export const TODO_STATUS = {
	hold: 'Hold',
	pending: 'Pending',
	done: 'Done'
};

 export class Todo {
	constructor(tasklist) {
		this.todos = [
			{
				id: 1588967548015,
				title: 'Execution context',
				description: 'Read about Event loop, timers, promise',
				status: TODO_STATUS.pending
			},
			{
				id: 1588967948011,
				title: 'Event loop',
				description: 'Read about Event loop, timers, promise',
				status: 'Pending'
			},
			{
				id: 1588967949012,
				title: 'Prototypes in JavaScript',
				description: 'OOP, prototype and classes',
				status: 'Hold'
			}
		],

		this.taskList = document.querySelector(tasklist);
		this.taskActions = document.querySelector('.js-todoActions');
	}

	getTaskById(taskId) {
		return this.todos.find(todo => todo.id === taskId);
	}

	addTask(task) {
		this.todos.push(task);

		this.setTimer(this.renderTaskList.bind(this, this.todos), 500);
	}

	deleteTask(taskId) {
		const index = this.todos.findIndex(todo => todo.id === taskId);
		this.todos.splice(index, 1);

		this.setTimer(this.renderTaskList.bind(this, this.todos), 500);
	}

	doneTask(taskId) {
		this.setStatus(taskId, TODO_STATUS.done);

		this.setTimer(this.renderTaskList.bind(this, this.todos), 500);
	}

	holdTask(taskId) {
		const task = this.getTaskById(taskId);

		this.hasStatus(task, TODO_STATUS.hold) ? this.setStatus(taskId, TODO_STATUS.pending) 
																					 : this.setStatus(taskId, TODO_STATUS.hold);

		this.setTimer(this.renderTaskList.bind(this, this.todos), 500);
	}

	editTask(taskItem, taskId) {
		const task = this.getTaskById(taskId);
		taskItem.replaceWith(this.createTaskEditTemplate(task));
	}

	saveTask(taskItem, taskId) {
		const task = this.getTaskById(taskId);
		task.title = taskItem.querySelector('.js-todoTitleInput').value;
		task.description = taskItem.querySelector('.js-todoDescriptionInput').value;

		this.setTimer(this.renderTaskList.bind(this, this.todos), 500);
	}

	searchTasks(value) {
		const filterTasks = this.todos.filter(todo => todo.title.toLowerCase().startsWith(value.toLowerCase()));

		this.setTimer(this.renderTaskList.bind(this,filterTasks), 500);
	}
	
  setStatus(taskId, status) {
		const task = this.getTaskById(taskId);
		task.status = status;
	}

	hasStatus(task, status) {
		return task.status === status ? true : false;
	}

	deleteAllTasks() {
		this.todos.length = 0;
 	}
 
	setStatusToAll(status) {
		this.todos.forEach(todo => todo.status = status);
	}

	sortTasksByTitle() {
		const cloneTodos = [...this.todos];
		return cloneTodos.sort( (todoA, todoB) => todoA.title.toLowerCase() > todoB.title.toLowerCase() ? 1 : -1);
	}
 
	sortByStatus() {
		const sortTasks = this.sortTasksByTitle();

		return [...sortTasks.filter(task => task.status === TODO_STATUS.pending), 
						...sortTasks.filter(task => task.status === TODO_STATUS.hold), 
						...sortTasks.filter(task => task.status === TODO_STATUS.done)];
	}
	
	showTaskActionsTrigger() {
		this.taskActions.classList.add('todo__actions--active');
	}

	hideTaskActionsTrigger() {
		this.taskActions.classList.remove('todo__actions--active');
	}

	createTaskTemplate(task) {
		const taskItem = document.createElement('li');
		taskItem.classList.add('todo__item');
		taskItem.dataset.id = `${task.id}`;
	
		const card = `
			<div class="card">
				<div class="card__status card__status--${task.status.toLowerCase()}">${task.status}</div>
				<div class="card__title">${task.title}</div>
				<p class="card__description">${task.description}</p>
				<div class="card__control">
					<div class="btn-group btn-group--row">
						<button class="btn btn--xs js-todoEditButton" ${this.hasStatus(task, TODO_STATUS.pending) ? '' : 'disabled'}>Edit</button>
						<button class="btn btn--xs js-todoHoldButton" ${this.hasStatus(task, TODO_STATUS.pending) ? '' : this.hasStatus(task, TODO_STATUS.hold) ? '' : 'disabled'}>${this.hasStatus(task, TODO_STATUS.hold) ? 'Unhold' : 'Hold'}</button>
						<button class="btn btn--xs js-todoDoneButton" ${this.hasStatus(task, TODO_STATUS.pending) ? '' : 'disabled'}>Done</button>
						<button class="btn btn--xs js-todoDeleteButton" ${this.hasStatus(task, TODO_STATUS.pending) ? '' : this.hasStatus(task, TODO_STATUS.done) ? '' : 'disabled'}>Delete</button>
					</div>
				</div>
			</div>
		`;
	
		taskItem.insertAdjacentHTML('beforeend', card);
	
		return taskItem;
	}

	createTaskEditTemplate(task) {
		const taskItem = document.createElement('li');
		taskItem.classList.add('todo__item');
		taskItem.dataset.id = `${task.id}`;
	
		const card = `
			<div class="card">
				<div class="card__status card__status--${task.status.toLowerCase()}">${task.status}</div>
				<form name="edit-task" class="form form--no-padding">
					<div class="form__group">
						<input name="title" id="todo-title" type="text" class="form__control js-todoTitleInput" autocomplete="off" value="${task.title}">
					</div>
					<textarea name="description" id="todo-description" class="form__control js-todoDescriptionInput">${task.description}</textarea>
				</form>
				<div class="card__control">
					<div class="btn-group btn-group--row">
						<button class="btn btn--xs js-todoSaveButton">Save</button>
						<button class="btn btn--xs js-todoCancelButton">Cancel</button>
					</div>
				</div>
			</div>
		`;
	
		taskItem.insertAdjacentHTML('beforeend', card);
	
		return taskItem;
	}

	createMessageTemplate() {
		return `
			<li class="todo__item">Your task list is empty!</li>
		`;
	}

	getTaskListTemplate(tasks) {
		let taskList = [];

		tasks.map(task => {
			const taskTemplate = this.createTaskTemplate(task);			
			taskList.push(taskTemplate);
		});

		return taskList;
	}

	renderTaskList(tasks) {
		this.taskList.textContent = '';

		if(tasks.length) {
			this.showTaskActionsTrigger();

			const taskListTempalte = this.getTaskListTemplate(tasks);
			this.taskList.append(...taskListTempalte);			
		} else {
			this.hideTaskActionsTrigger();
			this.taskList.innerHTML = this.createMessageTemplate();
		}	
	}
	
	setTimer(callback, delay) {
		loader.setLoader();

		setTimeout(() => {
			loader.removeLoader();
			callback();
		}, delay);
	}

	bulkActionsHandler(target) {
		if(target.matches('.js-allDone')) {
			this.setStatusToAll(TODO_STATUS.done);
		}

		if(target.matches('.js-allHold')) {
			this.setStatusToAll(TODO_STATUS.hold);
		}
		
		if(target.matches('.js-allDelete')) {
			this.deleteAllTasks();
		}

		this.setTimer(this.renderTaskList.bind(this, this.todos), 500);
	}

	sortActionsHandler(target) {
		let sortTasks = [];

		if(target.matches('.js-statusSort')) {
			sortTasks = this.sortByStatus();
			console.log(this.todos);
		}

		if(target.matches('.js-titleSort')) {
			sortTasks = this.sortTasksByTitle();
			console.log(this.todos);
		}

		this.setTimer(this.renderTaskList.bind(this, sortTasks), 500);	
	}
	
	onTaskActionsClickHandler({target}) {

		if (target.closest('.js-bulkActions')) {
			this.bulkActionsHandler(target);
		}

		if (target.closest('.js-sortActions')) {
			this.sortActionsHandler(target);
		}
	}

	onTaskListClickHandler({target}) {
		const taskItem = target.closest('.todo__item'),
					taskItemID = Number(taskItem.dataset.id);

		if (target.matches('.js-todoDeleteButton')) {
			this.deleteTask(taskItemID);
		}

		if (target.matches('.js-todoDoneButton')) {
			this.doneTask(taskItemID);
		}

		if (target.matches('.js-todoHoldButton')) {
			this.holdTask(taskItemID);
		}

		if (target.matches('.js-todoEditButton')) {
			this.editTask(taskItem, taskItemID);
		}

		if (target.matches('.js-todoSaveButton')) {
			this.saveTask(taskItem, taskItemID);
		}

		if (target.matches('.js-todoCancelButton')) {
			this.setTimer(this.renderTaskList.bind(this, this.todos), 500);
		}		
	}

	init() {
		this.setTimer(this.renderTaskList.bind(this, this.todos), 500);
		this.taskActions.addEventListener('click', this.onTaskActionsClickHandler.bind(this))
		this.taskList.addEventListener('click', this.onTaskListClickHandler.bind(this));
	}
};