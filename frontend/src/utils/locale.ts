import { useLocation } from 'react-router-dom'

export function getLocalePrefix(pathname: string) {
  return pathname === '/cz' || pathname.startsWith('/cz/') ? '/cz' : ''
}

export function withoutLocalePrefix(pathname: string) {
  if (pathname === '/cz') {
    return '/'
  }

  if (pathname.startsWith('/cz/')) {
    return pathname.slice(3) || '/'
  }

  return pathname
}

export function useLocalePath() {
  const location = useLocation()
  const localePrefix = getLocalePrefix(location.pathname)

  return (to: string) => {
    if (!to.startsWith('/')) {
      return to
    }

    return `${localePrefix}${to === '/' ? '' : to}` || '/'
  }
}

export function useLanguageLinks() {
  const location = useLocation()
  const unprefixedPath = withoutLocalePrefix(location.pathname)
  const pathWithSearch = `${unprefixedPath}${location.search}${location.hash}`

  return {
    enPath: pathWithSearch,
    czPath: `/cz${unprefixedPath === '/' ? '' : unprefixedPath}${location.search}${location.hash}`,
  }
}
