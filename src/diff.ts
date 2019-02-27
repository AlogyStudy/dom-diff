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

function diff (oldTree: _Element, newTree: _Element): object {
    let patches = {}
    let index = 0
    // 递归树，比较后的结果放到补丁包中
    walk(oldTree, newTree, index, patches)
    return patches
}

function walk (oldNode: _Element, newNode: _Element, index: number, patches: {[key: string]: any}) {
    let currentPatch = []
    if (oldNode.type === newNode.type) {
        let attrs = diffAttrs(oldNode.props, newNode.props)
        if (Object.keys(attrs).length > 0) {
            currentPatch.push({type: ATTRS, attrs})
        }
    }
    if (currentPatch.length > 0) {
        // 将元素和补丁包对应起来，放到大补丁包中
        patches[index] = currentPatch
        console.log(patches, 'patches')
    }
}

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
