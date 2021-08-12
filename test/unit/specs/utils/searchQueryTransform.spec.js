import {
  filtersToQueryData,
  queryToFilterData,
  queryStringToQueryData,
} from '~/utils/searchQueryTransform'
import { filterData } from '~/store-modules/filter-store'

describe('searchQueryTransform', () => {
  it('converts initial filters to query data', () => {
    const filters = {
      ...filterData,
    }

    const result = filtersToQueryData(filters)
    expect(result).toEqual({}) // toEqual checks for value equality
  })
  it('converts filter to query data', () => {
    const filters = {
      ...filterData,
      mature: true,
    }
    const result = filtersToQueryData(filters)
    expect(result).toEqual({ mature: true }) // toEqual checks for value equality
  })
  it('converts all filters to query data', () => {
    const filters = {
      licenses: [
        { code: 'cc0', name: 'filters.licenses.cc0', checked: true },
        { code: 'pdm', name: 'filters.licenses.pdm', checked: false },
        { code: 'by', name: 'filters.licenses.by', checked: false },
        { code: 'by-sa', name: 'filters.licenses.by-sa', checked: false },
        { code: 'by-nc', name: 'filters.licenses.by-nc', checked: false },
        { code: 'by-nd', name: 'filters.licenses.by-nd', checked: false },
        { code: 'by-nc-sa', name: 'filters.licenses.by-nc-sa', checked: false },
        { code: 'by-nc-nd', name: 'filters.licenses.by-nc-nd', checked: false },
      ],
      licenseTypes: [
        {
          code: 'commercial',
          name: 'filters.license-types.commercial',
          checked: true,
        },
        {
          code: 'modification',
          name: 'filters.license-types.modification',
          checked: false,
        },
      ],
      categories: [
        {
          code: 'photograph',
          name: 'filters.categories.photograph',
          checked: true,
        },
        {
          code: 'illustration',
          name: 'filters.categories.illustration',
          checked: false,
        },
        {
          code: 'digitized_artwork',
          name: 'filters.categories.digitized-artwork',
          checked: false,
        },
      ],
      extensions: [
        { code: 'jpg', name: 'filters.extensions.jpg', checked: true },
        { code: 'png', name: 'filters.extensions.png', checked: false },
        { code: 'gif', name: 'filters.extensions.gif', checked: false },
        { code: 'svg', name: 'filters.extensions.svg', checked: false },
      ],
      aspectRatios: [
        { code: 'tall', name: 'filters.aspect-ratios.tall', checked: true },
        { code: 'wide', name: 'filters.aspect-ratios.wide', checked: false },
        {
          code: 'square',
          name: 'filters.aspect-ratios.square',
          checked: false,
        },
      ],
      sizes: [
        { code: 'small', name: 'filters.sizes.small', checked: false },
        { code: 'medium', name: 'filters.sizes.medium', checked: true },
        { code: 'large', name: 'filters.sizes.large', checked: false },
      ],
      providers: [
        { code: 'animaldiversity', checked: true },
        { code: 'brooklynmuseum', checked: true },
      ],
      searchBy: { creator: true },
      mature: true,
    }
    const expectedQueryData = {
      aspect_ratio: 'tall',
      categories: 'photograph',
      extension: 'jpg',
      license: 'cc0',
      license_type: 'commercial',
      mature: true,
      searchBy: 'creator',
      size: 'medium',
      source: 'animaldiversity,brooklynmuseum',
    }
    const result = filtersToQueryData(filters)
    expect(result).toEqual(expectedQueryData) // toEqual checks for value equality
  })
  it('queryToFilterData blank', () => {
    const filters = {
      ...filterData,
    }
    const query = ''

    const result = queryToFilterData(query)
    expect(result).toEqual(filters) // toEqual checks for value equality
  })
  it('queryToFilterData all filters', () => {
    const filters = {
      licenses: [
        { code: 'cc0', name: 'filters.licenses.cc0', checked: true },
        { code: 'pdm', name: 'filters.licenses.pdm', checked: false },
        { code: 'by', name: 'filters.licenses.by', checked: false },
        { code: 'by-sa', name: 'filters.licenses.by-sa', checked: false },
        { code: 'by-nc', name: 'filters.licenses.by-nc', checked: false },
        { code: 'by-nd', name: 'filters.licenses.by-nd', checked: false },
        { code: 'by-nc-sa', name: 'filters.licenses.by-nc-sa', checked: false },
        { code: 'by-nc-nd', name: 'filters.licenses.by-nc-nd', checked: false },
      ],
      licenseTypes: [
        {
          code: 'commercial',
          name: 'filters.license-types.commercial',
          checked: true,
        },
        {
          code: 'modification',
          name: 'filters.license-types.modification',
          checked: false,
        },
      ],
      categories: [
        {
          code: 'photograph',
          name: 'filters.categories.photograph',
          checked: true,
        },
        {
          code: 'illustration',
          name: 'filters.categories.illustration',
          checked: false,
        },
        {
          code: 'digitized_artwork',
          name: 'filters.categories.digitized-artwork',
          checked: false,
        },
      ],
      extensions: [
        { code: 'jpg', name: 'filters.extensions.jpg', checked: true },
        { code: 'png', name: 'filters.extensions.png', checked: false },
        { code: 'gif', name: 'filters.extensions.gif', checked: false },
        { code: 'svg', name: 'filters.extensions.svg', checked: false },
      ],
      aspectRatios: [
        { code: 'tall', name: 'filters.aspect-ratios.tall', checked: true },
        { code: 'wide', name: 'filters.aspect-ratios.wide', checked: false },
        {
          code: 'square',
          name: 'filters.aspect-ratios.square',
          checked: false,
        },
      ],
      sizes: [
        { code: 'small', name: 'filters.sizes.small', checked: false },
        { code: 'medium', name: 'filters.sizes.medium', checked: true },
        { code: 'large', name: 'filters.sizes.large', checked: false },
      ],
      providers: [
        { code: 'animaldiversity', checked: true },
        { code: 'brooklynmuseum', checked: true },
      ],
      searchBy: { creator: true },
      mature: true,
    }
    const queryString =
      'http://localhost:8443/search/image?q=cat&license=cc0&license_type=commercial&categories=photograph&extension=jpg&aspect_ratio=tall&size=medium&source=animaldiversity,brooklynmuseum&searchBy=creator&mature=true'

    const result = queryToFilterData(queryString)
    expect(result).toEqual(filters) // toEqual checks for value equality
  })
  it('queryStringToQueryData', () => {
    const filters = {
      license: 'cc0',
      license_type: 'commercial',
      categories: 'photograph',
      extension: 'jpg',
      aspect_ratio: 'tall',
      size: 'medium',
      source: 'animaldiversity,brooklynmuseum',
      q: 'cat',
      searchBy: 'creator',
      mature: 'true',
    }
    const queryString =
      'http://localhost:8443/search/image?q=cat&license=cc0&license_type=commercial&categories=photograph&extension=jpg&aspect_ratio=tall&size=medium&source=animaldiversity,brooklynmuseum&searchBy=creator&mature=true'
    const result = queryStringToQueryData(queryString)
    expect(result).toEqual(filters)
  })
})