export default class Modal {

  static getHTML({title, content}) {
    return `
      <h4 class="modal__title">${title}</h4>
      <div class="modal__content">${content}</div>
    `
  }

  static getAuth() {
    return {
      title: 'Авторизация',
      content: `
      <form class="auth-form" id="auth-form">
        <label for="auth-email">Email</label>
        <input type="email" name="email" id="auth-email" />
        <label for="auth-password">Пароль</label>
        <input type="password" name="password" id="auth-password"/>
        <button
          type="submit"
          class="auth-form__btn waves-effect waves-light btn indigo lighten-2"
        >
          Войти
        </button>
      </form>
      `,
    }
  }
}
