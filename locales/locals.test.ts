import { describe, expect, it } from '@jest/globals'
import fs from 'fs'
import path from 'path'

const localesDir = path.join(__dirname, '../locales')
const localeFolders: string[] = ['ar', 'en', 'fr']

const getAllLocaleFiles = (localeDir: string): string[] => {
  return fs.readdirSync(localeDir).filter(file => file.endsWith('.json'))
}

const getLocaleKeys = (locale: string, fileName: string): Set<string> => {
  const filePath = path.join(localesDir, locale, fileName)
  const fileContent = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
  const keys = new Set<string>()

  const extractKeys = (obj: any, prefix = ''): void => {
    Object.keys(obj).forEach(key => {
      const fullKey = prefix ? `${prefix}.${key}` : key
      keys.add(fullKey)
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        extractKeys(obj[key], fullKey)
      }
    })
  }

  extractKeys(fileContent)
  return keys
}

describe('Locale Keys', () => {
  const localeFiles = getAllLocaleFiles(path.join(localesDir, localeFolders[0]))

  localeFiles.forEach(fileName => {
    it(`should have the same keys across all locale files for ${fileName}`, () => {
      const referenceKeys = getLocaleKeys(localeFolders[0], fileName)
      localeFolders.forEach(locale => {
        const localeKeys = getLocaleKeys(locale, fileName)
        expect(localeKeys).toEqual(referenceKeys)
      })
    })
  })
})
