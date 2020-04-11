import {Direction} from './StringCells'
import StrCells from './StringCells'
import Cells from './Cells'

describe('fillSpace', () => {
  const testTable = [
    {
      desc: 'Empty string',
      input: '',
      expect: '',
    },
    {
      desc: 'One line',
      input: '□■□',
      expect: '□■□',
    },
    {
      desc: 'One line with various characters',
      input: '□■aa□01 bb',
      expect: '□■□□■□',
    },
    {
      desc: 'Multi lines',
      input: '□■□\n□■\n□■□■',
      expect: '□■□□\n□■□□\n□■□■',
    },
    {
      desc: 'Multi lines with various characters',
      input: '0■aaa□\nbb ■\nccccc□■□■',
      expect: '□■□□\n□■□□\n□■□■',
    },
  ]

  testTable.forEach(tt => {
    test(tt.desc, () => {
      expect(StrCells.fillSpace(tt.input)).toEqual(tt.expect)
    })
  })
})

interface addLineParams {
  desc: string;
  input: string;
  dir: Direction;
  expect: string;
  expErrMsg?: string;
}

describe('addLine', () => {
  const testTable: addLineParams[] = [
    {
      desc: 'Empty string',
      input: '',
      dir: 'top',
      expect: '□',
    },
    {
      desc: 'Add to left',
      input: '□□■\n■□■',
      dir: 'left',
      expect: '□□□■\n□■□■',
    },
    {
      desc: 'Add to right',
      input: '□□■\n■□■',
      dir: 'right',
      expect: '□□■□\n■□■□',
    },
    {
      desc: 'Add to top',
      input: '□□■\n■□■',
      dir: 'top',
      expect: '□□□\n□□■\n■□■',
    },
    {
      desc: 'Add to bottom',
      input: '□□■\n■□■',
      dir: 'bottom',
      expect: '□□■\n■□■\n□□□',
    },
  ]

  testTable.forEach(tt => {
    test(tt.desc, () => {
      if (!tt.expErrMsg) {
        expect(StrCells.addLine(tt.input, tt.dir as Direction)).toEqual(tt.expect)
      } else {
        expect(() => StrCells.addLine(tt.input, tt.dir)).toThrow(tt.expErrMsg)
      }
    })
  })
})

interface removeLineParams {
  desc: string;
  input: string;
  dir: Direction;
  expect: string;
  expErrMsg?: string;
}

describe('removeLine', () => {
  const testTable: removeLineParams[] = [
    {
      desc: 'Empty string',
      input: '',
      dir: 'top',
      expect: '',
    },
    {
      desc: 'Remove from left',
      input: '□□■\n■□■',
      dir: 'left',
      expect: '□■\n□■',
    },
    {
      desc: 'Remove from right',
      input: '□□■\n■□■',
      dir: 'right',
      expect: '□□\n■□',
    },
    {
      desc: 'Remove from top',
      input: '□□■\n■□■',
      dir: 'top',
      expect: '■□■',
    },
    {
      desc: 'Remove from bottom',
      input: '□□■\n■□■',
      dir: 'bottom',
      expect: '□□■',
    },
  ]

  testTable.forEach(tt => {
    test(tt.desc, () => {
      if (!tt.expErrMsg) {
        expect(StrCells.removeLine(tt.input, tt.dir)).toEqual(tt.expect)
      } else {
        expect(() => StrCells.removeLine(tt.input, tt.dir)).toThrow(tt.expErrMsg)
      }
    })
  })
})

test('fromCells', () => {
  /*
    tft
    ftf
   */
  const cells = Cells.init(3, 2)
  cells.setCellMod(0, 0, true)
  cells.setCellMod(2, 0, true)
  cells.setCellMod(1, 1, true)

  expect(StrCells.fromCells(cells)).toEqual("■□■\n□■□")
})

describe('toCells', () => {
  const t = true
  const f = false

  const testTable = [
    {
      desc: 'Empty string',
      input: '',
      output: [[f]],
    },
    {
      desc: 'Some string',
      input: '□□■\n□■□',
      output: [
        [f, f, t],
        [f, t, f],
      ],
    },
  ]

  testTable.forEach(tt => {
    test(tt.desc, () => {
      const output = StrCells.toCells(tt.input)
      const width = tt.output[0].length
      const height = tt.output.length

      expect(output.getWidth()).toEqual(width)
      expect(output.getHeight()).toEqual(height)
      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          expect(output.getCellState(x, y)).toEqual(tt.output[y][x])
        }
      }
    })
  })
})
