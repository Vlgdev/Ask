import Question from './question'
import Modal from './modal'
import { inputValid } from './utils'
import './assets/css/style.css'

const askForm = document.getElementById('ask-form')
const askInput = askForm.querySelector('#question')
const askBtn = askForm.querySelector('.ask-form__btn')
const btnModal = document.getElementById('btn-modal')
const modal = document.getElementById('modal')

const modalInstance = M.Modal.init(modal)
window.addEventListener('load', Question.render)
askForm.addEventListener('submit', submitHandler)
askInput.addEventListener('input', inputHandler)
btnModal.addEventListener('click', openModal)

function inputHandler(event) {
  askBtn.disabled = !inputValid(event.target.value)
}

function submitHandler(event) {
  event.preventDefault()

  if (inputValid(askInput.value)) {
    askBtn.disabled = true
    Question.create({
      content: askInput.value,
      date: new Date().toJSON(),
    }).then((q) => {
      askInput.value = ''
    })
  }
}

function openModal(event) {
  event.preventDefault()

  modal.innerHTML = Modal.getHTML(Modal.getAuth())

  modalInstance.open()
  document
    .getElementById('auth-form')
    .addEventListener('submit', authHandler)
}

function authHandler(event) {
  event.preventDefault()

  console.log(event.target.email.value, event.target.password.value);
}
