import { useInfiniteQuery } from '@tanstack/react-query'
import { RepositoryResponse } from '../types/repository'
import { axiosClient } from '../utils/axios-client'

export const useRepositories = (searchQuery = 'react') => {
  return useInfiniteQuery(
    ['repositories', searchQuery],
    ({ pageParam = 1 }) =>
      axiosClient
        .get<RepositoryResponse>(
          `/search/repositories?q=${searchQuery}&page=${pageParam}`
        )
        .then(response => response.data),
    {
      getNextPageParam: (lastpage, pages) => {
        const maxPages = lastpage.total_count / 30
        const nextPage = pages.length + 1
        return nextPage <= maxPages ? nextPage : undefined
      },
    }
  )
}
