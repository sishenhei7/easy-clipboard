// import { shallowMount } from "@vue/test-utils";
import clipboard from "../../lib";

let dom: any;
const text = 'test';
const id = 'js-test';

// mock
Object.defineProperty(window, 'getSelection', {
  writable: true,
  value: jest.fn().mockImplementation(() => ({
    removeAllRanges: jest.fn(),
    addRange: jest.fn(),
    toString: jest.fn().mockImplementation(() => text),
  })),
});

Object.defineProperty(document, 'createRange', {
  writable: true,
  value: jest.fn().mockImplementation(() => ({
    selectNodeContents: jest.fn(),
  })),
});

document.execCommand = jest.fn()

describe("clipboard", () => {
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

  it("it should copy a string successfully", () => {
    return clipboard.copy(text)
      .then((res: any) => {
        const { selectedText, action } = res

        expect(selectedText).toEqual(text)
        expect(action).toEqual('copy')
        expect(document.execCommand).toHaveBeenCalled()
      })
  })

  it("it should copy a Node successfully", () => {
    return clipboard.copy(dom)
      .then((res: any) => {
        const { selectedText, action } = res

        expect(selectedText).toEqual(text)
        expect(action).toEqual('copy')
        expect(document.execCommand).toHaveBeenCalled()
      })
  })

  it("it should copy from a function successfully", () => {
    return clipboard.copy(() => dom)
      .then((res: any) => {
        const { selectedText, action } = res

        expect(selectedText).toEqual(text)
        expect(action).toEqual('copy')
        expect(document.execCommand).toHaveBeenCalled()
      })
  })
});
