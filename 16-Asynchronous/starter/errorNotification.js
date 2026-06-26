class ErrorNotification {
  _toast = document.getElementById('errorToast');
  _msg = document.getElementById('errorMsg');
  _bar = document.getElementById('errorBar');
  _timer;

  constructor() {
    // 'this.hideError' works without .bind() because hideError
    // is an arrow function class field — 'this' is auto-bound
    this._toast
      .querySelector('.toast-close')
      .addEventListener('click', this.hideError);
  }

  showError = text => {
    this._msg.textContent = text;
    clearTimeout(this._timer);
    this._bar.classList.remove('running');
    void this._bar.offsetWidth;
    this._toast.classList.remove('hidden');
    this._bar.classList.add('running');
    this._timer = setTimeout(this.hideError, 4000);
  };

  hideError = () => {
    clearTimeout(this._timer);
    this._toast.classList.add('hidden');
  };
}

// Export ONE shared instance, not the class itself —
// prevents accidentally creating multiple toasts elsewhere
export const errorNotification = new ErrorNotification();
