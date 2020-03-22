export default class RingBuffer{
  constructor(size) {
    this._arr = Array(size)
    this._caret = 0
    this._count = 0
    this._basicGlobalIndex = 0
  }

  add(item) {
    if (this._count === 0) {
      this._arr[0] = item
      this._count = 1
      return
    }

    const caret = this._caret
    const nextCaret = this._getNextIndex(caret)

    this._arr[nextCaret] = item

    this._caret = nextCaret
    const basicIndex = this._getBasicIndex()
    if (basicIndex === nextCaret) {
      this._basicGlobalIndex++
    }
    this._count = this._countFromBasic(nextCaret)
  }

  clone(cloneItem = x => x) {
    /* Not tested */
    const res = new RingBuffer()
    res._arr = Array(this._arr.length)
    for (let i = 0; i < res._arr.length; i++) {
      res._arr[i] = cloneItem(this._arr[i])
    }
    res._caret = this._caret
    res._count = this._count
    res._basicGlobalIndex = this._basicGlobalIndex
    return res
  }

  getCapacity() {
    return this._arr.length
  }

  setCaretByGlobalIndex(index) {
    const min = this._basicGlobalIndex
    const max = min + this._count - 1
    if (index < min || index > max) {
      throw new Error(`the range of global index is [${min}, ${max}], but got ${index}`)
    }
    this._caret = index % this.getCapacity()
  }

  getCurrent() {
    return this._count > 0 ? this._arr[this._caret] : null
  }

  getCurrentGlobalIndex() {
    return this._count > 0 ?
      this._basicGlobalIndex + this._countFromBasic(this._caret) - 1 :
      -1
  }

  getMinGlobalIndex() {
    return this._basicGlobalIndex
  }

  getMaxGlobalIndex() {
    return this._basicGlobalIndex + this._count - 1
  }

  getListWithGlobalIndex() {
    let res = []
    for (let i = 0; i < this._count; i++) {
      const globalIndex = this._basicGlobalIndex + i
      res.push({
        globalIndex: globalIndex,
        item: this._arr[globalIndex % this.getCapacity()],
      })
    }
    return res
  }

  _getBasicIndex() {
    return this._basicGlobalIndex % this.getCapacity()
  }

  _getNextIndex(index) {
    return (index < this.getCapacity() - 1) ? index + 1: 0
  }

  _countFromBasic(index) {
    const basicIndex = this._getBasicIndex()
    return (basicIndex > index) ?
      (index + this.getCapacity()) - basicIndex + 1:
      index - basicIndex + 1
  }
}
