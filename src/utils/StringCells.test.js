import StrCells from './StringCells'

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

describe('addLine', () => {
  const testTable = [
    {
      desc: 'Empty string',
      input: '',
      dir: 'top',
      expect: '□',
    },
    {
      desc: 'Error: Not recognized direction',
      input: '□',
      dir: 'not_a_direction',
      expErrMsg: 'Not recognized direction',
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
        expect(StrCells.addLine(tt.input, tt.dir)).toEqual(tt.expect)
      } else {
        expect(() => StrCells.addLine(tt.input, tt.dir)).toThrow(tt.expErrMsg)
      }
    })
  })
})

describe('removeLine', () => {
  const testTable = [
    {
      desc: 'Empty string',
      input: '',
      dir: 'top',
      expect: '',
    },
    {
      desc: 'Error: Not recognized direction',
      input: '□',
      dir: 'not_a_direction',
      expErrMsg: 'Not recognized direction',
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