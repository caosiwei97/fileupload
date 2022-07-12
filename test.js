function deepClone(target, map = new WeakMap()) {
  // 1.非对象不参与拷贝，因为拷贝只针对引用类型（过滤掉所有基本类型）
  if (typeof target !== 'object' || target === null) {
    return target
  }

  // 2. 传入的是 Date、RegExp、function 要特殊处理
  if (target instanceof Date) {
    return new Date(target)
  }

  if (target instanceof RegExp) {
    return new RegExp(target.source, target.flags)
  }

  if (target instanceof Function) {
    return function () {
      return target.apply(this, ...arguments)
    }
  }

  // 3. 传入的是普通对象 or 内置对象

  // 3.1 使用 map 存着 - 防止循环引用
  if (map.has(target)) {
    return map.get(target)
  }

  // 3.2 利用该对象的构造器创建一个新对象
  const clonedObj = new target.constructor()

  // 3.3 把当前克隆的对象存起来
  map.set(target, clonedObj)

  // 3.4 遍历 target 自身可枚举属性
  Reflect.ownKeys(target).forEach((key) => {
    clonedObj[key] = deepClone(target[key], map)
  })

  return clonedObj
}

const target = {
  a: 1,
  b: undefined,
  c: {
    d: 'd',
  },
  e: [2, 4, 8],
  f: new Date(),
  g: function () {},
  h: /abc/,
  i: Symbol('i'),
}

target.j = target

const clonedObj = deepClone(target)

console.log(clonedObj)
console.log(clonedObj === target)
console.log(clonedObj.c === target.c)
console.log(clonedObj.e === target.e)
console.log(clonedObj.j === target.j)
