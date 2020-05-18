export class Tabs {
	constructor({container = '', buttons = '', items = ''} = {}) {
		this.container = document.querySelector(container);
		this.buttons = this.container.querySelectorAll(buttons);
		this.items = this.container.querySelectorAll(items);
		this.tabsCloseButtons = document.querySelectorAll('.js-tabsClose');
	}

	showTabs(idx) {
		this.buttons[idx].classList.add('active');
		this.items[idx].classList.add('active');
	}

	hideTabs() {
		this.buttons.forEach(button => button.classList.remove('active'));
		this.items.forEach(item => item.classList.remove('active'));
	}

	getCurrentButtonIndex(element) {
		return Array.from(this.buttons).findIndex(button => button === element);
	}

	onTabsClickHandler({target}) {
		if(target.matches('.js-todoTabsButton')) {
			const buttonIndex = this.getCurrentButtonIndex(target);

			this.hideTabs();
			this.showTabs(buttonIndex);			
		}

		if (target.matches('.js-tabsClose')) {
			this.hideTabs();
		}
	}

	init() {
		this.hideTabs();
		this.container.addEventListener('click', this.onTabsClickHandler.bind(this));
	}
};
