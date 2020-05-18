class Loader {
	constructor(container) {
		this.container = document.querySelector(container);
	}

	createLoaderTemplate() {
		return `
			<div class="loader">
				<span class="loader__item loader__item-1"></span>
				<span class="loader__item loader__item-2"></span>
				<span class="loader__item loader__item-3"></span>
				<span class="loader__item loader__item-4"></span>
				<span class="loader__item loader__item-5"></span>
			</div>
		`;
	}

	setLoader() {
		this.container.innerHTML = this.createLoaderTemplate();
	}
	
	removeLoader() {
		this.container.innerHTML = '';
	}
};

const loader = new Loader('.js-todoList');

export { loader };