class _Element {
    private type: string
    private props: object
    private children: Array<any>
    constructor (type: string, props: object, children: Array<any>) {
        this.type = type
        this.props = props
        this.children = children
    }
}

function createElement (type: string, props: object, children: Array<any>) {
    return new _Element(type, props, children)
}

/**
 * 设置属性值
 * @param node 
 * @param key 
 * @param value 
 */
function setAttrs (node: Element, key: string, value: string) {
    switch (key) {
        case 'value': // node是一个input或者textarea
            if (node.tagName.toUpperCase() === 'INPUT' || node.tagName.toUpperCase() === 'TEXTAREA') {
                (<any>node).value = value
            } else {
                node.setAttribute(key, value)
            }
        break
        case 'style':
            (<any>node).style.cssText = value
        break
        default:
            node.setAttribute(key, value)
        break
    }
}

// render方法将vnode转化成真实dom
function render (eleObj: any): Element {
    let el = document.createElement(eleObj.type)
    for (let key in eleObj.props) {
        setAttrs(el, key, eleObj.props[key])
    }
    eleObj.children.forEach((child: any) => {
        let ret = (child instanceof _Element) ? render(child) : document.createTextNode(child)
        console.log(ret, 'ret')
        el.appendChild(ret)
    })
    return el
}

function renderDom (el: Element, target: Element) {
    target.appendChild(el)
}

export { createElement, render, _Element, renderDom }
