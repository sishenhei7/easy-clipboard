/*!
 * easy-clipboard.js v1.0.4
 * (c) 2019-2020 Yangzhou
 * https: //github.com/sishenhei7/easy-clipboard
 * Released under the MIT License.
 */
(function () {
    'use strict';

    function select(element) {
        var selectedText;

        if (element.nodeName === 'SELECT') {
            element.focus();

            selectedText = element.value;
        }
        else if (element.nodeName === 'INPUT' || element.nodeName === 'TEXTAREA') {
            var isReadOnly = element.hasAttribute('readonly');

            if (!isReadOnly) {
                element.setAttribute('readonly', '');
            }

            element.select();
            element.setSelectionRange(0, element.value.length);

            if (!isReadOnly) {
                element.removeAttribute('readonly');
            }

            selectedText = element.value;
        }
        else {
            if (element.hasAttribute('contenteditable')) {
                element.focus();
            }

            var selection = window.getSelection();
            var range = document.createRange();

            range.selectNodeContents(element);
            selection.removeAllRanges();
            selection.addRange(range);

            selectedText = selection.toString();
        }

        return selectedText;
    }

    var select_1 = select;

    class Clipboard {
        constructor(options) {
            this.fakeId = options && options.fakeId;
            this.version = '1.0.4';
            this.fakeElem = null;
            this.target = null;
            this.selectedText = '';
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
                this.fakeElem.id = this.fakeId;
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
            }
            else if (tempArg instanceof window.Node) {
                this.target = tempArg;
            }
            else {
                throw new Error('Unsupported parameter type!');
            }
            this.selectedText = select_1(this.target);
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
                }
                catch (error) {
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

    return Clipboard;

}());
