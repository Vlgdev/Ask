export default class Question {
  static create(question) {
    return fetch('https://native-app-c7210.firebaseio.com/questions.json', {
      method: 'POST',
      body: JSON.stringify(question),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((res) => ({ ...question, id: res, name }))
      .then(addToLocaleStorage)
      .then(Question.render)
  }

  static fetchAll(token) {
    if (!token) {
      return Promise.resolve({
        title: 'Ошибка',
        content: `<p class="modal-error">У вас нет токена</p>`,
      })
    }

    return fetch(
      `https://native-app-c7210.firebaseio.com/questions.json?auth=${token}`
    )
      .then((res) => res.json())
      .then((data) =>
        data ? Object.keys(data).map((k) => ({ ...data[k], id: k })) : []
      )
      .then((questions) => ({
        title: 'Список вопросов',
        content: renderModalList(questions),
      }))
  }

  static render() {
    const questions = getFormLocaleStorage()
    const box = document.getElementById('questions-box')

    const html = questions.length
      ? questions.map(toCard).join('')
      : `<p>Вы пока не задавали вопросов</p>`

    box.innerHTML = html
  }
}

function addToLocaleStorage(question) {
  const questions = getFormLocaleStorage()
  questions.push(question)
  localStorage.setItem('questions', JSON.stringify(questions))
}

function getFormLocaleStorage() {
  return JSON.parse(localStorage.getItem('questions') || '[]')
}

function toCard(q) {
  return `
  <div class="question">
    <div class="question-date">
      ${new Date(q.date).toLocaleDateString()} 
      ${new Date(q.date).toLocaleTimeString()}
    </div>
    <div class="question-body">
      ${q.content}
    </div>
  </div>
  `
}

function renderModalList(questions) {
  return questions.length ? questions.map(toCard).join('') : '<p>Вопросов пока нет</p>'
}
