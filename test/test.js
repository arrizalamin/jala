const expect = require('expect')
const objectSwitch = require('../index')

const nodeVersion = parseInt(process.versions.node.substr(0,1))

describe('Test', () => {
  const obj = {
    a: '1',
    b: '2',
    c: '3'
  }
  it('should call callback with no parameter', () => {
    var condition = false
    objectSwitch(obj, () => {
      condition = true
    })

    expect(condition).toEqual(true)
  })

  it('should not call callback with unmatched parameter', () => {
    var condition = true
    objectSwitch(obj, (foo) => {
      condition = false
    })

    expect(condition).toEqual(true)
  })

  it('should call callback with matched parameter', () => {
    var condition = true
    objectSwitch(obj, (a) => {
      condition = false
    })

    expect(condition).toEqual(false)
  })

  it('should call callback with matched parameter and passed with matched property', () => {
    var condition = false
    objectSwitch(obj, (a) => {
      condition = (a === '1') ? true : false
    })

    expect(condition).toEqual(true)
  })

  it('should not call callback with matched parameter but not matched default value', () => {
    var condition = false
    objectSwitch(obj, (a = '2') => {
      condition = (a === '1') ? true : false
    })

    expect(condition).toEqual(false)
  })

  it('should call callback with matched parameter and default value and passed with matched property', () => {
    var condition = false
    objectSwitch(obj, (a = '1') => {
      condition = (a === '1') ? true : false
    })

    expect(condition).toEqual(true)
  })

  it('should call callback with matched parameter and regex default value', () => {
    var condition = false
    objectSwitch(obj, (a = /1/) => {
      condition = (a === '1') ? true : false
    })

    expect(condition).toEqual(true)
  })

  it('should not call callback with matched parameter but not matched regex default value', () => {
    var condition = false
    objectSwitch(obj, (a = /2/) => {
      condition = (a === '1') ? true : false
    })

    expect(condition).toEqual(false)
  })

  it('should call callback with matched parameter but matched regex default value', () => {
    var condition = false
    objectSwitch(obj, (a = /2/) => {
      condition = (a === '1') ? true : false
    })

    expect(condition).toEqual(false)
  })

  if (nodeVersion >= 5) {
    it('should throw exception callback argument is spread operator', () => {
      expect(() => {
        objectSwitch(obj, (a, ...foo) => {
          console.log(foo)
        })
      }).toThrow(/spread/)
    })
  }
})
