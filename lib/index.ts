import select from 'select'

interface Options {
  fakeId: string
}

class Clipboard {
  fakeId: string
  version: string
  fakeElem: HTMLTextAreaElement | null
  target: Node | null
  selectedText: string

  constructor() {
    this.version = '__VERSION__'
    this.fakeElem = null
    this.target = null
    this.selectedText = ''
  }

  createFake(text: string) {
    if (!this.fakeElem) {
      const fakeElem = document.createElement('textarea')
      fakeElem.style.fontSize = '12pt'
      fakeElem.style.border = '0'
      fakeElem.style.padding = '0'
      fakeElem.style.margin = '0'
      fakeElem.style.position = 'absolute'
      fakeElem.style.left = '-9999px'
      fakeElem.setAttribute('readonly', '')
      document.body.appendChild(fakeElem)
      this.fakeElem = fakeElem
    }

    if (this.fakeId) {
      this.fakeElem.id = this.fakeId
    }

    this.fakeElem.value = text
    return this.fakeElem
  }

  removeFake() {
    if (this.fakeElem) {
      this.fakeElem.parentNode!.removeChild(this.fakeElem)
      this.fakeElem = null
    }
  }

  selectTarget(arg: any) {
    const tempArg = typeof arg === 'function' ? arg() : arg

    if (typeof tempArg === 'string') {
      this.target = this.createFake(tempArg)
    } else if (tempArg instanceof window.Node) {
      this.target = tempArg
    } else {
      throw new Error('Unsupported parameter type!')
    }

    this.selectedText = select(this.target)
  }

  copyText(action: string) {
    return new Promise((resolve, reject) => {
      const { selectedText } = this

      try {
        document.execCommand(action)
        resolve({
          action,
          selectedText
        })
      } catch (error) {
        reject({
          error,
          selectedText
        })
      }

      this.clearSelection()
    })
  }

  clearSelection() {
    window.getSelection() && window.getSelection()!.removeAllRanges()
  }

  // 修改options
  options(options: Options) {
    this.fakeId = options.fakeId
  }

  // 对外暴露的方法
  cut(arg: any) {
    this.selectTarget(arg)
    return this.copyText('cut')
  }

  copy(arg: any) {
    this.selectTarget(arg)
    return this.copyText('copy')
  }

  destroy() {
    this.removeFake()
  }
}

export default new Clipboard()
