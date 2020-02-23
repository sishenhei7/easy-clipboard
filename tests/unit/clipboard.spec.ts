// import { shallowMount } from "@vue/test-utils";
import clipboard from '../../lib'

let dom: any
const text = 'test'
const id = 'js-test'

// mock
Object.defineProperty(window, 'getSelection', {
  writable: true,
  value: jest.fn().mockImplementation(() => ({
    removeAllRanges: jest.fn(),
    addRange: jest.fn(),
    toString: jest.fn().mockImplementation(() => text)
  }))
})

Object.defineProperty(document, 'createRange', {
  writable: true,
  value: jest.fn().mockImplementation(() => ({
    selectNodeContents: jest.fn()
  }))
})

document.execCommand = jest.fn()

describe('clipboard', () => {
  beforeAll(() => {
    dom = document.createElement('div')
    dom.id = id
    dom.innerText = text
    document.body.append(dom)
  })

  afterAll(() => {
    dom && document.body.removeChild(dom)
    dom = null
  })

  it('it should copy a string successfully', () => {

    expect.assertions(3)

    return clipboard
      .copy(text)
      .then((res: any) => {
        const { selectedText, action } = res

        expect(selectedText).toEqual(text)
        expect(action).toEqual('copy')
        expect(document.execCommand).toHaveBeenCalled()
      })
  })

  it('it should copy a Node successfully', () => {

    expect.assertions(3)

    return clipboard
      .copy(dom)
      .then((res: any) => {
        const { selectedText, action } = res

        expect(selectedText).toEqual(text)
        expect(action).toEqual('copy')
        expect(document.execCommand).toHaveBeenCalled()
      })
  })

  it('it should copy from a function successfully', () => {

    expect.assertions(3)

    return clipboard
      .copy(() => dom)
      .then((res: any) => {
        const { selectedText, action } = res

        expect(selectedText).toEqual(text)
        expect(action).toEqual('copy')
        expect(document.execCommand).toHaveBeenCalled()
      })
  })

  it('it should throw error when copy unsupported parameter type', () => {
    function copyByObject() {
      clipboard.copy({ test: 1 })
    }

    function copyByArray() {
      clipboard.copy([1])
    }

    function copyByBoolean() {
      clipboard.copy(true)
    }

    expect(copyByObject).toThrowError(/^Unsupported parameter type!$/)
    expect(copyByArray).toThrowError(/^Unsupported parameter type!$/)
    expect(copyByBoolean).toThrowError(/^Unsupported parameter type!$/)
  })

  it('it should cut a string successfully', () => {

    expect.assertions(3)

    return clipboard
      .cut(text)
      .then((res: any) => {
        const { selectedText, action } = res

        expect(selectedText).toEqual(text)
        expect(action).toEqual('cut')
        expect(document.execCommand).toHaveBeenCalled()
      })
  })

  it('it should modify options successfully', () => {

    const fakeId = 'js-test-fake'
    clipboard.options({ fakeId })

    expect.assertions(1)

    clipboard
      .copy(text)
      .then(() => {
        expect(clipboard.fakeElem.id).toEqual(fakeId)
      })
  })

  it('it should throw error in unsupported browsers', () => {
    const fn = document.execCommand
    document.execCommand = () => {
      throw new Error('document.execCommand is not a function');
    }

    clipboard
      .copy(text)
      .catch((error) => {
        expect(error.selectedText).not.toBeUndefined()
        expect(error.error).not.toBeUndefined()
        document.execCommand = fn
      })
  })

  it('it should destroy successfully', () => {
    clipboard.destroy()
    expect(clipboard.fakeElem).toBeNull()
  })
})
