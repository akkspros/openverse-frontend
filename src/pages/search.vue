<template>
  <div class="browse-page">
    <div class="search columns">
      <div class="desk:hidden">
        <AppModal v-if="isFilterVisible" @close="onToggleSearchGridFilter">
          <SearchGridFilter @onSearchFilterChanged="onSearchFormSubmit" />
        </AppModal>
      </div>
      <aside
        v-if="isFilterVisible"
        class="column is-narrow grid-sidebar is-hidden-touch"
      >
        <SearchGridFilter @onSearchFilterChanged="onSearchFormSubmit" />
      </aside>
      <div class="column search-grid-ctr">
        <SearchGridForm @onSearchFormSubmit="onSearchFormSubmit" />
        <SearchTypeTabs />
        <FilterDisplay v-if="shouldShowFilterTags" />
        <NuxtChild :key="$route.path" @onLoadMoreItems="onLoadMoreItems" />
      </div>
    </div>
  </div>
</template>
<script>
import { FETCH_MEDIA, SET_SEARCH_TYPE_FROM_URL } from '~/constants/action-types'
import {
  SET_QUERY,
  SET_FILTER_IS_VISIBLE,
  SET_FILTERS_FROM_URL,
} from '~/constants/mutation-types'
import { queryStringToQueryData } from '~/utils/search-query-transform'
import local from '~/utils/local'
import { screenWidth } from '~/utils/get-browser-info'
import { ALL_MEDIA, IMAGE } from '~/constants/media'
import { mapActions, mapMutations } from 'vuex'

const BrowsePage = {
  name: 'browse-page',
  layout({ store }) {
    return store.state.nav.isEmbedded ? 'embedded' : 'default'
  },
  scrollToTop: false,
  async fetch() {
    const url = this.$route.fullPath
    if (process.server) {
      const query = queryStringToQueryData(url)
      this.setQuery({ query })
    }
    await this.setSearchTypeFromUrl({ url })
    await this.setFiltersFromUrl({ url })
  },
  mounted() {
    const localFilterState = () =>
      local.get(process.env.filterStorageKey)
        ? local.get(process.env.filterStorageKey) === 'true'
        : true

    const MIN_SCREEN_WIDTH_FILTER_VISIBLE_BY_DEFAULT = 800
    const isDesktop = () =>
      screenWidth() > MIN_SCREEN_WIDTH_FILTER_VISIBLE_BY_DEFAULT
    this.setFilterVisibility({
      isFilterVisible: isDesktop() ? localFilterState() : false,
    })
  },
  computed: {
    query() {
      return this.$store.state.query
    },
    isFilterVisible() {
      return this.$store.state.isFilterVisible
    },
    mediaType() {
      // Default to IMAGE until media search/index is generalized
      return this.$store.state.searchType != ALL_MEDIA
        ? this.$store.state.searchType
        : IMAGE
    },
  },
  methods: {
    ...mapActions({
      fetchMedia: FETCH_MEDIA,
      setSearchTypeFromUrl: SET_SEARCH_TYPE_FROM_URL,
    }),
    ...mapMutations({
      setQuery: SET_QUERY,
      setFilterVisibility: SET_FILTER_IS_VISIBLE,
      setFiltersFromUrl: SET_FILTERS_FROM_URL,
    }),
    getMediaItems(params, mediaType) {
      this.fetchMedia({ ...params, mediaType })
    },
    onLoadMoreItems(searchParams) {
      this.getMediaItems(searchParams, this.mediaType)
    },
    onSearchFormSubmit(searchParams) {
      this.setQuery(searchParams)
    },
    onToggleSearchGridFilter() {
      this.setFilterVisibility({
        isFilterVisible: !this.isFilterVisible,
      })
    },
    shouldShowFilterTags() {
      return (
        this.$route.path === '/search/' || this.$route.path === '/search/image'
      )
    },
  },
  watch: {
    query(newQuery) {
      if (newQuery) {
        const newPath = this.localePath({
          path: this.$route.path,
          query: this.$store.state.query,
        })
        this.$router.push(newPath)
        this.getMediaItems(newQuery, this.mediaType)
      }
    },
  },
}

export default BrowsePage
</script>

<style lang="scss" scoped>
@import '~/styles/results-page.scss';
</style>
