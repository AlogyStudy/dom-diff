class _Element {
    constructor (type, props, children) {
        this.type = type
        this.props = props
        this.children = children
    }
}

function createElement (type, props, children) {
    return new _Element(type, props, children)
}

/**
 * 设置属性值
 * @param node 
 * @param key 
 * @param value 
 */
function setAttrs (node, key, value) {
    switch (key) {
        case 'value': // node是一个input或者textarea
            if (node.tagName.toUpperCase() === 'INPUT' || node.tagName.toUpperCase() === 'TEXTAREA') {
                node.value = value
            } else {
                node.setAttribute(key, value)
            }
        break
        case 'style':
            node.style.cssText = value
        break
        default:
            node.setAttribute(key, value)
        break
    }
}

// render方法将vnode转化成真实dom
function render (vnode) {
    console.log(vnode, 'vnode')
    let el = document.createElement(vnode.type)
    for (let key in vnode.props) {
        setAttrs(el, key, vnode.props[key])
    }
    vnode.children.forEach((child) => {
        console.log(child, 'child')
        let ret = (child instanceof Element) ? render(child) : document.createTextNode(child)
        // render(child)
        // let ret = (child instanceof Element) ? render(child) : document.createTextNode(child.children)
        console.log(ret, 'ret')
        // el.appendChild(ret)
    })
    return el
}

function renderDom (el, target) {
    target.appendChild(el)
}

export { createElement, render, _Element, renderDom }
