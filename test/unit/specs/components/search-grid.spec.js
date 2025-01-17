import SearchGrid from '~/components/SearchGridManualLoad'
import render from '../../test-utils/render'
describe('SearchGrid', () => {
  let options = {}
  let commitMock = null

  beforeEach(() => {
    commitMock = jest.fn()
    options = {
      stubs: {
        SearchRating: true,
        SaferBrowsing: true,
        LoadingIcon: true,
        MetaSearchForm: true,
      },
      propsData: {
        query: { q: 'foo' },
        includeAnalytics: true,
      },
      mocks: {
        $store: {
          state: {
            isFetching: {
              images: false,
            },
            isFetchingError: {
              images: false,
            },
            pageCount: {
              images: 5,
            },
            imagesCount: 100,
            imagePage: 1,
          },
          commit: commitMock,
        },
      },
    }
  })

  it('should render correct contents', () => {
    const wrapper = render(SearchGrid, options)
    expect(wrapper.find('section').element).toBeDefined()
    expect(wrapper.find('.load-more').element).toBeDefined()
  })

  it("doesn't render load more button if not loading images", () => {
    const wrapper = render(SearchGrid, options)
    expect(wrapper.find('.load-more').element).toBeDefined()
  })

  it("doesn't render load more button if is loading images", () => {
    options.mocks.$store.state.isFetching.images = true
    const wrapper = render(SearchGrid, options)
    expect(wrapper.find('.load-more').vm).not.toBeDefined()
  })

  it('shows loading icon if is loading images', () => {
    options.mocks.$store.state.isFetching.images = true

    const wrapper = render(SearchGrid, options)
    expect(wrapper.findComponent({ name: 'LoadingIcon' })).toBeDefined()
  })

  it("doesn't render load more button if not loading images", async () => {
    const wrapper = render(SearchGrid, options)
    const button = wrapper.find('.button')
    await button.trigger('click')

    expect(wrapper.emitted('onLoadMoreImages')[0]).toEqual([
      {
        page: 2,
        shouldPersistMedia: true,
        ...options.propsData.query,
      },
    ])
  })

  it('sets image to empty array on search changed', () => {
    const wrapper = render(SearchGrid, options)
    wrapper.vm.searchChanged()

    expect(commitMock).toHaveBeenCalledWith('SET_MEDIA', {
      media: [],
      page: 1,
    })
  })
})
