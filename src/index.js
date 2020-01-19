import select from 'select';

class Clipboard {
  constructor(options = {}) {
    const {
      fakeId,
    } = options;

    this.selectedText = null;
    this.fakeId = fakeId;
  }

  createFake(text) {
    if (!this.fakeElem) {
      const fakeElem = document.createElement('textarea');
      fakeElem.style.fontSize = '12pt';
      fakeElem.style.border = '0';
      fakeElem.style.padding = '0';
      fakeElem.style.margin = '0';
      fakeElem.style.position = 'absolute';
      fakeElem.style.left = '-9999px';
      fakeElem.setAttribute('readonly', '');
      document.body.appendChild(fakeElem);
      this.fakeElem = fakeElem;
    }

    if (this.fakeId) {
      fakeElem.id = this.fakeId;
    }

    this.fakeElem.value = text;
    return this.fakeElem;
  }

  removeFake() {
    if (this.fakeElem) {
      this.fakeElem.parentNode.removeChild(this.fakeElem);
      this.fakeElem = null;
    }
  }

  selectTarget(arg) {
    const tempArg = typeof arg === 'function' ? arg() : arg;

    if (typeof tempArg === 'string') {
      this.target = this.createFake(tempArg);
    } else if (tempArg instanceof window.node) {
      this.target = tempArg;
    } else {
      throw new Error('Unsupported parameter type!');
    }

    this.selectedText = select(this.target);
  }

  copyText(action) {
    return new Promise((resolve, reject) => {
      const { selectedText } = this;
      try {
        document.execCommand(action);
        resolve({
          action,
          selectedText,
        });
      } catch (error) {
        reject({
          error,
          selectedText,
        });
      }
    });
  }

  clearSelection() {
    window.getSelection().removeAllRanges();
  }

  // 对外暴露的方法
  cut(arg) {
    this.selectTarget(arg);
    this.copyText('cut');
    this.clearSelection();
  }

  copy(arg) {
    this.selectTarget(arg);
    this.copyText('copy');
    this.clearSelection();
  }

  destroy() {
    this.removeFake();
  }
}

export default Clipboard;
