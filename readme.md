# Custom cursor

[Демо страница](https://sulky-cat.github.io/custom-cursor/demo)

---

## JS

### Инициализация
Создать экземпляр класса. По необходимости изменить параметры
```js
new Cursor()
```

### Параметры
* `element` - элемент, который будет создаваться для курсора (если нет объекста в html). По умолчанию `'div'`;
* `classElement` - класс элемента курсора. По умолчанию `'cursor'`;
* `classMouseOverDocument` - класс, который добавляется элементу `body`, когда мышь уходит за пределы экрана. По умолчанию `'_mouse-over-document_'`;
* `selectorHoverElement` - селектор, при котором будет срабатывать ховер и добавляться необходимые классы. По умолчанию `'[data-hover]'`;
* `onfocus` - функция при наведении на элемент;
* `onblur` - функция при покидании мышью определенного элемента.

### Свойства класса
* `element` - элемент курсора;
* `targetElement` - елемент, над которым находится курсор;
* `hoverElement` - элемент, над которым находится курсор, указанный в настройке `selectorHoverElement`. Если курсор не над этим элементом, то это свойство равно `false`

Пример 
```js
const cursor = new Cursor({
	selectorHoverElement: 'a, [data-hover], button, input',
	onfocus: (e) => {
		console.log('focus')

		cursor.hoverElement.classlist.add('new-hover-class')
	},
	onblur: (e) => {
		console.log('blur')

		if (cursor.hoverElement) {
			cursor.hoverElement.classlist.remove('new-hover-class')
		}
	}
})

console.log(cursor.element) // Елемент кастомного курсора
```

Елемент создается автоматически в конце элемента `body`. Также можно создать свой курсор и задать ему класс, который указывается в настройке `classElement`
```html
<div class="cursor"></div>
``` 

### Принцип работы
При движении мыши, для объекта нового курсора в css записываются переменные `--top` и `--left` в пикселях.