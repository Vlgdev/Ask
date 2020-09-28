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
  document.getElementById('auth-form').addEventListener('submit', authHandler)
}

function authHandler(event) {
  event.preventDefault()

  const btn = event.target.querySelector('button')
  btn.disabled = true

  const email = event.target.email.value
  const password = event.target.password.value

  const formData = {
    email,
    password,
  }

  const apiKey = process.env.JS_APP_API_KEY
  fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`,
    {
      method: 'POST',
      body: JSON.stringify({ ...formData, returnSecureToken: true }),
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )
    .then((response) => response.json())
    .then((res) => res.idToken)
    .then(Question.fetchAll)
    .then((content) => {
      modal.innerHTML = Modal.getHTML(content)
    })
    .catch(e => {btn.disabled = false})
}
