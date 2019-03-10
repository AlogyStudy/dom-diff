import { _Element, render } from './element'

let allPatchs: {[key: string]: any}
let index = 0 // 默认哪个需要打补丁
function patch (node: any, patchs: Object) {
    // 给某个元素打补丁
    allPatchs = patchs
    walk(node)
}

function walk (node: any) {
    let currentPatchs = allPatchs[index++]
    let childNodes = node.childNodes
    childNodes.forEach((child: any) => walk(child)) // 递归，先序深度遍历
    if (currentPatchs) {
        doPatch(node, currentPatchs) // 从子往父打补丁
    }
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

function doPatch (node: any, patchs: {[key: string]: any}) {
    patchs.forEach((patch: {[key: string]: any}) => {
        switch (patch.type) {
            case 'ATTRS':
            for (let key in patch.attrs) {
                let value = patch.attrs[key]
                if (value) {
                    setAttrs(node, key, value)
                } else {
                    node.removeAttribute(key)
                }
            }
        break
            case 'TEXT':
            node.textContent = patch.text
        break
            case 'REPLACE':
            let newNode = (patch.newNode instanceof _Element) ? render(patch.newNode) : document.createTextNode(patch.newNode)
            node.parentNode.replaceChild(newNode, node)
        break
            case 'REMOVE':
            node.parentNode.removeChild(node)
        break
        }
    })
}

export default patch
