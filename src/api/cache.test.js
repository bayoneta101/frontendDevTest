import { describe, it, expect, beforeEach, vi } from 'vitest'
import { cached } from './cache.js'

describe('cached', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.restoreAllMocks()
  })

  it('devuelve el valor cacheado sin refetch dentro del TTL', async () => {
    const fetcher = vi.fn().mockResolvedValue('fresh')
    expect(await cached('k', fetcher)).toBe('fresh')
    expect(await cached('k', fetcher)).toBe('fresh')
    expect(fetcher).toHaveBeenCalledTimes(1)
  })

  it('refetcha cuando la entrada ha caducado', async () => {
    const now = vi.spyOn(Date, 'now').mockReturnValue(0)
    const fetcher = vi
      .fn()
      .mockResolvedValueOnce('a')
      .mockResolvedValueOnce('b')

    expect(await cached('k', fetcher)).toBe('a')
    now.mockReturnValue(60 * 60 * 1000 + 1) // pasada 1h
    expect(await cached('k', fetcher)).toBe('b')
    expect(fetcher).toHaveBeenCalledTimes(2)
  })
})
