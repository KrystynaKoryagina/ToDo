import { TODO_STATUS } from './tabs';

class Form {
	constructor(formSelector) {
		this.form = document.querySelector(formSelector);
		this.formInputs = this.form.elements;
		this.formButton = this.form.querySelector('.js-formButton');
	}

	checkInputs({target}) {
		if(target.classList.contains('js-formInput')) {
			if(target.value) {
				this.formButton.removeAttribute('disabled');
			} else {
				this.formButton.setAttribute('disabled', true);
			}
		}
	}

	init() {
		this.formInputs.forEach(input => {
			input.addEventListener('input', this.checkInputs.bind(this));
		});
	}
}

class AddForm extends Form {
	constructor(formName) {
		super(formName);

		this.addNewTask = null;
		this.form.addEventListener('submit', this.onAddTaskFormHandler.bind(this));
	}

	onAddTaskFormHandler(e) {
		e.preventDefault();

		let taskData = {
			id: Date.now(),
			title: this.formInputs.title.value,
			description: this.formInputs.description.value,
			status: TODO_STATUS.pending
		}

		if (taskData.title && taskData.description) {
			if (this.addNewTask) {
				this.addNewTask(taskData);
				this.form.reset();
			}
		} 
	}
}

class SearchForm extends Form {
	constructor(formName) {
		super(formName);

		this.clearInputButton = this.form.querySelector('.js-clearInputButton');
		this.searchTask = null;

		this.clearInputButton.addEventListener('click', this.onClearInputClickHandler.bind(this));
		this.form.addEventListener('submit', this.onSearchTaskFormHandler.bind(this));
	}

	onClearInputClickHandler() {
		Array.from(this.formInputs).map(input => input.value = '');
	}

	onSearchTaskFormHandler(e) {
		e.preventDefault();

		const searchValue = this.formInputs.search.value.trim();

		if (searchValue) {
			if (this.searchTask) {
				this.searchTask(searchValue);
				this.form.reset();
			}
		}
	}
}

export { AddForm, SearchForm };