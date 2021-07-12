import fetch from 'unfetch'
import { fetchJson, insertParams, stringifyQuery } from '../src/utils'

jest.mock('unfetch')

describe('utils', () => {
  describe('insertParams', () => {
    it('should insert a param into a string', () => {
      expect(
        insertParams('/{network}/safe/{address}', { address: '0x0' })
      ).toBe(
        '/{network}/safe/0x0'
      )
    })

    it('should insert several params into a string', () => {
      expect(
        insertParams('/{network}/safe/{address}', { address: '0x0', network: 'rinkeby' })
      ).toBe(
        '/rinkeby/safe/0x0'
      )
    })
  })

  describe('fetchJson', () => {
    it('should fetch a simple url', () => {
      fetch.mockImplementation(() => {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ success: true })
        })
      })

      expect(fetchJson('/test/safe?q=123')).resolves.toEqual({ success: true })
      expect(fetch).toHaveBeenCalledWith('/test/safe?q=123')
    })

    it('should throw if response is not OK', () => {
      fetch.mockImplementation(() => {
        return Promise.resolve({
          ok: false,
          statusText: 'Failed'
        })
      })

      expect(fetchJson('/test/safe?q=123')).rejects.toThrow('Failed')
      expect(fetch).toHaveBeenCalledWith('/test/safe?q=123')
    })
  })
})