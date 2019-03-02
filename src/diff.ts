import { _Element } from './element'

const ATTRS = 'ATTRS'
const REMOVE = 'REMOVE'
const TEXT = 'TEXT'
const REPLACE = 'REPLACE'

// diff规则，属性，节点，文本
// 当节点类型相同时，对比属性是否相同，产生一个属性都补丁包 {type: 'ATTRS', attrs: {class: 'list-group'}}}
// 新的节点不存在 {type: 'REMOVE', index: xxx}
// 节点类型不同，直接采用替换模式{type: 'REPLACE', newNode: newNode}
// 文本的变化 {type: 'TEXT', text: 1}

/**
 * 区分二棵树的异同点
 * @param oldTree 老树
 * @param newTree 新树
 * @returns { Object } 返回更新后的补丁包
 */
function diff (oldTree: _Element, newTree: _Element): Object {
    let patches = {} // 补丁
    let index = 0
    // 递归树，比较后的结果放到补丁包中
    walk(oldTree, newTree, index, patches)
    return patches
}

/**
 * 当前节点的判断
 * @param oldNode 新节点
 * @param newNode 老节点
 * @param index 递归层级
 * @param patches 补丁包
 */
function walk (oldNode: _Element, newNode: _Element, index: number, patches: {[key: string]: any}) {
    let currentPatch = [] // 每个元素的补丁对象
    if (!newNode) { // 是否删除节点
        currentPatch.push({type: REMOVE, index})
    } else if (isString(oldNode) && isString(newNode)) {
        if (oldNode !== newNode) { // 文本是否相同
            currentPatch.push({type: TEXT, text: newNode})
        }
    } else if (oldNode.type === newNode.type) { // 节点类型是否相同
        let attrs = diffAttrs(oldNode.props, newNode.props)
        if (Object.keys(attrs).length > 0) {
            currentPatch.push({type: ATTRS, attrs})
        }
        // 比较children
        diffChildren(oldNode.children, newNode.children, index, patches)
    } else { // 节点替换
        currentPatch.push({type: REPLACE, newNode})
    }
    if (currentPatch.length > 0) {
        // 将元素和补丁包对应起来，放到大补丁包中
        patches[index] = currentPatch
    }
}

function isString (node: any): boolean {
    return Object.prototype.toString.call(node) === '[object String]'
}

/**
 * 对比children节点
 * @param oldChildren 子老节点 
 * @param newChildren 子新节点
 */
let Index: number = 0
function diffChildren (oldChildren: Array<any>, newChildren: Array<any>, index: number, patches: {[key: string]: any}) {
    oldChildren.forEach((children, idx) => {
        // index 每次传递给walk时， index是递增，都基于一个索引来实现。
        walk(children, newChildren[idx], ++Index, patches)
    })
}

/**
 * 节点属性的diff
 * @param oldAttrs 旧属性 
 * @param newAttrs 新属性
 */
function diffAttrs (oldAttrs: any, newAttrs: any) {
    // 1. 新老属性的关系
    // 2. 新增属性
    let patch: {[key: string]: any} = {}
    // 判断老的属性中和新都属性的关系
    for (let key in oldAttrs) {
        if (oldAttrs[key] !== newAttrs[key]) {
            patch[key] = newAttrs[key] // 有可能是undefined
        }
    }
    // 新增
    for (let key in newAttrs) {
        if (!oldAttrs.hasOwnProperty(key)) {
            patch[key] = newAttrs[key]
        }
    }
    return patch
}

export default diff
