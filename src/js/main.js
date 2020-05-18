import { Tabs } from './modules/tabs';
import { Todo } from './modules/todo';
import { AddForm, SearchForm } from './modules/form';

window.addEventListener('DOMContentLoaded', () => {
	'use strict';

	const tabs = new Tabs({
		container: '.js-todoTabs',
		buttons: '.js-todoTabsButton',
		items: '.js-todoTabsItem'
	});
	tabs.init();

	const todos = new Todo('.js-todoList');
	todos.init();

	const addForm = new AddForm('.js-addForm');
	addForm.init();
	addForm.addNewTask = todos.addTask.bind(todos);

	const searchForm = new SearchForm('.js-searchForm');
	searchForm.init();
	searchForm.searchTask = todos.searchTasks.bind(todos);

});