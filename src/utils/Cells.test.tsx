import Cells from './Cells'

const t = true
const f = false

function checkCells(cells, cellsArray) {
  const width = cellsArray[0].length
  const height = cellsArray.length

  for (let y = 0; y < height; y++) {
    expect(cellsArray[y].length).toEqual(width)
  }

  expect(cells.getWidth()).toEqual(width)
  expect(cells.getHeight()).toEqual(height)
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      expect(cells.getCellState(x, y)).toEqual(cellsArray[y][x])
    }
  }
}

test('static init', () => {
  const cells = Cells.init(2, 3)
  expect(cells.getWidth()).toEqual(2)
  expect(cells.getHeight()).toEqual(3)

  checkCells(cells, [[f, f], [f, f], [f, f]])
})

test('static initRandomly', () => {
  const cells = Cells.initRandomly(2, 3)
  expect(cells.getWidth()).toEqual(2)
  expect(cells.getHeight()).toEqual(3)
})

describe('getCellState/setCell', () => {
  test('in range', () => {
    const cells = Cells.init(2, 3)
    const cells2 = cells.setCell(1, 2, true)

    // Note: getCellState is used in checkCells
    checkCells(cells, [
      [f, f],
      [f, f],
      [f, f],
    ])

    checkCells(cells2, [
      [f, f],
      [f, f],
      [f, t],
    ])
  })

  test('out of range', () => {
    const cells = Cells.init(2, 3)
    expect(() => cells.setCell(2, 0).toThrow('X should be in range'))
    expect(() => cells.setCell(0, 3).toThrow('Y should be in range'))
    expect(() => cells.getCellState(2, 0).toThrow('X should be in range'))
    expect(() => cells.getCellState(0, 3).toThrow('Y should be in range'))
  })
})

describe('setCellMod', () => {
  test('in range', () => {
    const cells = Cells.init(2, 3)
    cells.setCellMod(1, 2, true)
    checkCells(cells, [
      [f, f],
      [f, f],
      [f, t],
    ])
  })

  test('out of range', () => {
    const cells = Cells.init(2, 3)
    expect(() => cells.setCellMod(2, 0).toThrow('X should be in range'))
    expect(() => cells.setCellMod(0, 3).toThrow('Y should be in range'))
  })
})

describe('countAroundLivings', () => {
  test('in range', () => {
    const cells = Cells.init(4, 3)
    cells.setCellMod(0, 1, t)
    cells.setCellMod(1, 0, t)
    cells.setCellMod(1, 1, t)
    cells.setCellMod(3, 2, t)

    checkCells(cells, [
      [f, t, f, f],
      [t, t, f, f],
      [f, f, f, t],
    ])

    const expected = [
      [4, 2, 3, 2],
      [3, 2, 3, 2],
      [4, 3, 3, 1],
    ]

    const width = cells.getWidth()
    const height = cells.getHeight()
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        expect(cells.countAroundLivings(x, y)).toEqual(expected[y][x])
      }
    }
  })

  test('out of range', () => {
    const cells = Cells.init(2, 3)
    expect(() => cells.countAroundLivings(2, 0).toThrow('X should be in range'))
    expect(() => cells.countAroundLivings(0, 3).toThrow('Y should be in range'))
  })
})

describe('cloneWithNewSize', () => {
  const cells = Cells.init(3, 2)
  cells.setCellMod(0, 0, t)
  cells.setCellMod(2, 0, t)
  cells.setCellMod(1, 1, t)

  const before = [
    [t, f, t],
    [f, t, f],
  ]
  checkCells(cells, before)

  const testTable = [
    {
      desc: 'width 0',
      width: 0,
      height: 2,
      expect: [[t],
               [f]],
    },
    {
      desc: 'height 0',
      width: 3,
      height: 0,
      expect: [[t, f ,t]],
    },
    {
      desc: 'decrease size',
      width: 2,
      height: 1,
      expect: [[t, f]],
    },
    {
      desc: 'increase size',
      width: 4,
      height: 3,
      expect: [[t, f, t, f],
               [f, t, f, f],
               [f, f, f, f]],
    },
  ]

  testTable.forEach(tt => {
    test(tt.desc, () => {
      const res = cells.cloneWithNewSize(tt.width, tt.height)
      checkCells(res, tt.expect)
    })
  })
})
