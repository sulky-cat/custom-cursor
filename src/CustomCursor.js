class Cursor {
	// Элемент, курсор
	element
	targetElement
	hoverElement
	constructor(properties) {
		// Настрйоки по умолчанию
		let defaultOptions = {
			element: 'div',
			classElement: 'cursor',
			classMouseOverDocument: '_mouse-over-document_',
			selectorHoverElement: '[data-hover]',
			onfocus: (e) => { },
			onblur: (e) => { },
		}
		this.options = Object.assign(defaultOptions, properties)

		// Инициализация
		this.init()
	}
	// Инициализация
	init() {
		// Проверка на наличие элемента в html
		this.element = document.querySelector(`.${this.options.classElement}`)
		// Если курсора нет - создать и вставить в концу тега <body>
		if (!this.element) {
			// Создание html элемента
			this.createElement()
			// Вставка элемента
			this.pasteElement()
		}

		this.mouseMove = this.mouseMove.bind(this)
		this.mouseEnter = this.mouseEnter.bind(this)
		this.mouseLeave = this.mouseLeave.bind(this)
		this.mousedown = this.mousedown.bind(this)
		this.mouseup = this.mouseup.bind(this)

		document.addEventListener('mouseenter', this.mouseEnter)
	}
	// Создание html элемента
	createElement() {
		this.element = document.createElement(this.options.element)
		this.element.classList.add(this.options.classElement)
	}
	// Вставка элемента
	pasteElement() {
		document.body.append(this.element)
	}
	// Мышь над документом
	mouseEnter() {
		// Добавление класса, когда мышь над сайтом
		document.body.classList.add(this.options.classMouseOverDocument)
		// Добавление и удаление событий
		document.removeEventListener('mouseenter', this.mouseEnter)
		document.addEventListener('mousemove', this.mouseMove)
		document.addEventListener('mouseleave', this.mouseLeave)
		document.addEventListener('mousedown', this.mousedown)
		document.addEventListener('mouseup', this.mouseup)
	}
	// Мышь ушла с документа
	mouseLeave() {
		// Удаление класса, когда мышь над сайтом
		document.body.classList.remove(this.options.classMouseOverDocument)
		// Добавление и удаление событий
		document.addEventListener('mouseenter', this.mouseEnter)
		document.removeEventListener('mousemove', this.mouseMove)
		document.removeEventListener('mouseleave', this.mouseLeave)
		document.removeEventListener('mousedown', this.mousedown)
		document.removeEventListener('mouseup', this.mouseup)
	}
	// Движение мыши
	mouseMove(e) {
		this.setPosition(e)

		this.targetElement = e.target
		const hoverElement = this.targetElement.closest(this.options.selectorHoverElement)
		if (hoverElement) {
			this.hoverElement = hoverElement
			// Создание события
			this.options.onfocus(e)
			this.element.classList.add('_hover_')
			document.body.classList.add('_hover-element_')
		} else if (this.hoverElement) {
			// Создание события
			this.options.onblur(e)
			this.element.classList.remove('_hover_')
			document.body.classList.remove('_hover-element_')

			this.hoverElement = false
		}
	}
	// Нажатие клавиши мыши
	mousedown() {
		this.element.classList.add('_mousedown_')
	}
	mouseup() {
		this.element.classList.remove('_mousedown_')
	}
	// Установка позиции элемента
	setPosition(e) {
		const top = e.clientY
		const left = e.clientX

		this.element.style.setProperty('--top', `${top}px`)
		this.element.style.setProperty('--left', `${left}px`)
	}

}