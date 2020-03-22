import RingBuffer from './RingBuffer'

describe('ring buffer', () => {
  const capacity = 3
  const rb = new RingBuffer(capacity)

  const testTable = [
    {
      desc: 'Empty',
      exec: () => {},
      expCurrent: null,
      expList: [],
    },
    {
      desc: 'Add one item',
      exec: () => {
        rb.add(1)
      },
      expCurrent: 1,
      expList: [
        {globalIndex: 0, item: 1},
      ],
    },
    {
      desc: 'Add as to exceed capacity',
      exec: () => {
        rb.add(2)
        rb.add(3)
        rb.add(4) /* oldest item should be removed */
      },
      expCurrent: 4,
      expList: [
        {globalIndex: 1, item: 2},
        {globalIndex: 2, item: 3},
        {globalIndex: 3, item: 4},
      ],
    },
    {
      desc: 'Error: Set caret but out of index (1)',
      exec: () => {
        rb.setCaretByGlobalIndex(0)
      },
      expErrMsg: /the range of global index/,
    },
    {
      desc: 'Error: Set caret but out of index (2)',
      exec: () => {
        rb.setCaretByGlobalIndex(4)
      },
      expErrMsg: /the range of global index/,
    },
    {
      desc: 'Set caret to first item',
      exec: () => {
        rb.setCaretByGlobalIndex(1)
      },
      expCurrent: 2,
      /* Currently all items should be available */
      expList: [
        {globalIndex: 1, item: 2},
        {globalIndex: 2, item: 3},
        {globalIndex: 3, item: 4},
      ],
    },
    {
      desc: 'Add item after set caret',
      exec: () => {
        rb.add(5)
      },
      expCurrent: 5,
      /* Items after caret should be removed */
      expList: [
        {globalIndex: 1, item: 2},
        {globalIndex: 2, item: 5},
      ],
    },
  ]

  testTable.forEach(tt => {
    test(tt.desc, () => {
      if (tt.expErrMsg) {
        expect(tt.exec).toThrow(tt.expErrMsg)
      } else {
        tt.exec()
        expect(rb.getCurrent()).toEqual(tt.expCurrent)
        expect(rb.getListWithGlobalIndex()).toEqual(tt.expList)

        const len = tt.expList.length
        if (len > 0) {
          expect(rb.getMinGlobalIndex()).toEqual(tt.expList[0].globalIndex)
          expect(rb.getMaxGlobalIndex()).toEqual(tt.expList[len - 1].globalIndex)
        }
      }
    })
  })
})
