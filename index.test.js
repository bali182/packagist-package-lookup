var packagist = require('./index')

describe('packagist-package-lookup tests', function () {
  it('should find packages by name', function () {
    return packagist.searchByName('monolog').then(function (result) {
      expect(result).toBeInstanceOf(Array)
      expect(result.length).toBeGreaterThan(0)
      result.forEach(function (element) {
        expect(typeof element.name).toBe('string')
        expect(typeof element.description).toBe('string')
        expect(typeof element.url).toBe('string')
        expect(typeof element.repository).toBe('string')
      })
    })
  })

  it('should find packages by vendor', function () {
    return packagist.searchByVendor('monolog').then(function (result) {
      expect(result).toBeInstanceOf(Array)
      expect(result.length).toBeGreaterThan(0)
      result.forEach(function (element) {
        expect(typeof element).toBe('string')
      })
    })
  })

  it('should list package versions', function () {
    return packagist.versions('monolog/monolog').then(function (result) {
      expect(result).toBeInstanceOf(Array)
      expect(result.length).toBeGreaterThan(0)
      result.forEach(function (element) {
        expect(typeof element).toBe('string')
      })
    })
  })
})
