const changeOpenMobileMenu = () => {
	const button = document.querySelector('.burger')
	const header = document.querySelector('.header')
	const menuWrapper = document.querySelector('.mobile-menu-list-wrapper')
	const menu = document.querySelector('.mobile-menu')

	menuWrapper.style.top = `${header.clientHeight}px`

	const onClickButton = () => {
		if (!button.classList.contains('active')) {
			button.classList.add('active')
			menuWrapper.style.translate = `0`
		} else {
			button.classList.remove('active')
			menuWrapper.style.translate = `0 -100%`
		}
	}

	button.addEventListener('click', onClickButton)
}
changeOpenMobileMenu()

const combobox = () => {
	const parentEls = document.querySelectorAll('.combobox')

	const setOpen = (parentEl) => {
		parentEl.classList.add('active')
	}
	const setClose = () => {
		parentEls.forEach(item => {
			item.classList.remove('active')
		})

	}

	parentEls.forEach(parentEl => {
		const input = parentEl.querySelector('.input')
		const list = parentEl.querySelector('.combobox-list')

		parentEl.addEventListener('click', (e) => {
			if (e.target.closest('.input')) {
				if (!parentEl.classList.contains('active')) {
					setClose()
					setOpen(parentEl)
				} else {
					setClose()
				}
			}

			if (e.target.closest('.combobox-item')) {
				input.value = e.target.innerText
				setClose()
			}
		})


	})

	document.addEventListener('click', (e) => {
		if (!e.target.closest('.combobox')) {
			setClose()
		}
	})

	document.addEventListener('keydown', (e) => {
		if (e.key === 'Escape') {
			setClose()
		}
	})
}
combobox()

new AirDatepicker('.date-picker', {
	isMobile: window.innerWidth <= 575 && true,
})

const forms = document.querySelectorAll('.form')

forms.forEach(form => {
	const inputs = form.querySelectorAll('.input')
	const inputsRequired = form.querySelectorAll('.required')
	const button = form.querySelector('.form-button')

	const inputValidate = (input => {

		if (!input.value) {
			input.classList.remove('valid')
			input.classList.add('not-valid')
		} else {
			input.classList.add('valid')
			input.classList.remove('not-valid')
		}
		if (input.name === 'phone') {
			if (input.value.length <= 2) {
				input.classList.remove('valid')
				input.classList.add('not-valid')
			} else {
				input.classList.add('valid')
				input.classList.remove('not-valid')
			}
		}
	})

	inputs.forEach(input => {
		input.addEventListener('input', () => {
			inputValidate(input)
		})

		input.addEventListener('change', () => {
			inputValidate(input)
		})
	})


	form.addEventListener('submit', async function (e) {
		e.preventDefault()


		const isAllInputsValid = Array.from(inputsRequired).every(input => input.classList.contains('valid'))

		if (isAllInputsValid) {
			const formData = new FormData(form)
			try {
				const response = await fetch('/mail.php', {
					method: 'POST',
					body: formData
				})

				const result = await response.text(); // или response.json() если ты возвращаешь JSON
				console.log(result);
			} catch (error) {
				console.error('Ошибка:', error);
			}
		} else {
			inputsRequired.forEach(input => {
				inputValidate(input)
			})
		}
	})
})

IMask(
	document.querySelector('.input-phone'),
	{
		mask: '+{7}(000)000-00-00'
	}
)

const accordion = () => {
	const parentEls = document.querySelectorAll('.accordion')

	const setOpen = (element, content, contentInner) => {
		element.classList.add('active')
		content.style.height = `${contentInner.clientHeight}px`
	}
	const setClose = (elements, contents) => {
		elements.forEach(element => {
			element.classList.remove('active')
		})
		contents.forEach(content => {
			content.style.height = 0
		})

	}

	parentEls.forEach(parentEl => {
		parentEl.addEventListener('click', (e) => {
			const triggers = parentEl.querySelectorAll('.accordion-item-title')
			const contents = parentEl.querySelectorAll('.accordion-item-content')

			if (e.target.closest('.accordion-item-title')) {
				const target = e.target
				const content = target.parentNode.querySelector('.accordion-item-content')
				const contentInner = target.parentNode.querySelector('.accordion-item-content-inner')

				if (!target.classList.contains('active')) {
					setClose(triggers, contents)
					setOpen(target, content, contentInner)
				} else {
					setClose(triggers, contents)
				}
			}
		})
	})
}
accordion()

const swiperReviews = new Swiper(".reviews .swiper", {
	navigation: {
		nextEl: ".reviews .swiper-button-next",
		prevEl: ".reviews .swiper-button-prev",
	},
	pagination: {
		el: ".reviews .swiper-pagination",
	},
})

const swiperEmployees = new Swiper(".employees .swiper", {
	slidesPerView: 3,
	spaceBetween: 65,
	navigation: {
		nextEl: ".employees .swiper-button-next",
		prevEl: ".employees .swiper-button-prev",
	},
	pagination: {
		el: ".employees .swiper-pagination",
	},
	breakpoints: {
		// when window width is >= 320px
		320: {
			slidesPerView: 1,
			spaceBetween: 15
		},
		// when window width is >= 480px
		500: {
			slidesPerView: 2,
			spaceBetween: 30
		},
		// when window width is >= 640px
		991: {
			slidesPerView: 3,
			spaceBetween: 30
		},
		1199: {
			slidesPerView: 3,
			spaceBetween: 65
		}
	}
})

const modal = {
	modalElements: document.querySelectorAll('.modal'),
	modalContainerElements: document.querySelectorAll('.modal-container'),
	animationSpeed: 200,
	open(modalId) {
		if (modalId) {
			const modalElement = document.querySelector(`#${modalId}`)
			modalElement.classList.add('show')
			document.documentElement.style.scrollbarGutter = 'stable'
			document.body.style.overflow = 'hidden'

			setTimeout(() => {
				modalElement.querySelector('.modal-container').classList.add('fade')
			}, 1);
		}
	},
	close() {
		this.modalElements.forEach(modalElement => {
			modalElement.querySelector('.modal-container').classList.remove('fade')

			setTimeout(() => {
				modalElement.classList.remove('show')
				document.documentElement.style.scrollbarGutter = ''
				document.body.style.overflow = ''
			}, this.animationSpeed);
		})
	}
}


const modals = document.querySelectorAll('.modal')
const modalOpenTriggers = document.querySelectorAll('[data-modal]')
const modalCloseTriggers = document.querySelectorAll('[data-modal-close]')

modalOpenTriggers.forEach(modalOpenTrigger => {
	modalOpenTrigger.addEventListener('click', () => {
		modal.open(modalOpenTrigger.dataset.modal)
	})
})

modalCloseTriggers.forEach(modalCloseTrigger => {
	modalCloseTrigger.addEventListener('click', () => {
		modal.close()
	})
})

modals.forEach(item => {
	item.querySelector('.modal-container').style.transition = `${modal.animationSpeed * 0.001}s`
	item.addEventListener('click', e => {
		e.target === item ? modal.close() : null
	})
})

document.addEventListener('keydown', e => {
	if (e.key === 'Escape') {
		modal.close()
	}
})