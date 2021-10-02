let items = document.querySelectorAll('.item')
let container = document.querySelector('.container')

// for drag and drop you need to know whhat element you're picking up and where you can put it down

items.forEach(item => {
	item.addEventListener('dragstart', () => {
		item.classList.add('dragging')
	})

	item.addEventListener('dragend', () => {
		item.classList.remove('dragging')
	})
})

container.addEventListener('dragover', (e) => {
	e.preventDefault()
	const draggedItem = document.querySelector('.dragging')
	const elementBelow = getItemBelowCursor(container, e.clientY)
	if (elementBelow === null) {
		container.appendChild(draggedItem)
	} else {
		container.insertBefore(draggedItem, elementBelow)
	}
})


// gets element directly below cursor
function getItemBelowCursor(container, mouseY) {

	let items = [...container.querySelectorAll('.item:not(.dragging)')]

	return items.reduce((closestOffset, item) => {
		// returns the rectangle that makes up an item
		const box = item.getBoundingClientRect()
		const offset = mouseY - box.top - box.height / 2
		// offset > closestOffset bc everything is - and we want closet to 0
		if (offset < 0 && offset > closestOffset.offset) {
			return { offset: offset, element: item }
		} else {
			return closestOffset
		}

	}, { offset: Number.NEGATIVE_INFINITY }).element
}
// offset between cursor and element 
