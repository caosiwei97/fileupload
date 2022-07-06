class Foo {
  constructor(name) {
    this.name = name
  }
  get [Symbol.toStringTag]() {
    return 'Foo'
  }
  bar() {}
}

console.log(Object.prototype.toString.call(new Foo()))
