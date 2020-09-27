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
      .then((res) => ({...question, id: res,name}))
      .then(addToLocaleStorage)
      .then(Question.render)
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
  <div class="questions__item">
    <div class="questions__item-date">
      ${new Date(q.date).toLocaleDateString()} 
      ${new Date(q.date).toLocaleTimeString()}
    </div>
    <div class="questions__item-body">
      ${q.content}
    </div>
  </div>
  `
}