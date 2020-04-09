interface itemWithGlobalIndex<T> {
  globalIndex: number;
  item: T;
}

export default class RingBuffer<T>{
  _arr: T[]
  _caret: number
  _count: number
  _basicGlobalIndex: number
  
  constructor(size: number) {
    this._arr = Array(size)
    this._caret = 0
    this._count = 0
    this._basicGlobalIndex = 0
  }

  add(item: T) {
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

  clone(cloneItem: (x: T) => T = x => x): RingBuffer<T> {
    /* Not tested */
    const res = new RingBuffer<T>(this._arr.length)
    for (let i = 0; i < res._arr.length; i++) {
      res._arr[i] = cloneItem(this._arr[i])
    }
    res._caret = this._caret
    res._count = this._count
    res._basicGlobalIndex = this._basicGlobalIndex
    return res
  }

  getCapacity(): number {
    return this._arr.length
  }

  setCaretByGlobalIndex(index: number) {
    const min = this._basicGlobalIndex
    const max = min + this._count - 1
    if (index < min || index > max) {
      throw new Error(`the range of global index is [${min}, ${max}], but got ${index}`)
    }
    this._caret = index % this.getCapacity()
  }

  getCurrent(): T | null {
    return this._count > 0 ? this._arr[this._caret] : null
  }

  getCurrentGlobalIndex(): number {
    return this._count > 0 ?
      this._basicGlobalIndex + this._countFromBasic(this._caret) - 1 :
      -1
  }

  getMinGlobalIndex(): number {
    return this._basicGlobalIndex
  }

  getMaxGlobalIndex(): number {
    return this._basicGlobalIndex + this._count - 1
  }

  getListWithGlobalIndex(): itemWithGlobalIndex<T>[] {
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

  _getBasicIndex(): number {
    return this._basicGlobalIndex % this.getCapacity()
  }

  _getNextIndex(index: number): number {
    return (index < this.getCapacity() - 1) ? index + 1: 0
  }

  _countFromBasic(index: number): number {
    const basicIndex = this._getBasicIndex()
    return (basicIndex > index) ?
      (index + this.getCapacity()) - basicIndex + 1:
      index - basicIndex + 1
  }
}
