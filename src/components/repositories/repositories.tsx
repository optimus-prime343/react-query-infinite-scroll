import style from './repositories.module.css'
import { useRepositories } from '../../hooks/use-repositories'
import { useInView } from '../../hooks/use-in-view'

import { useMemo } from 'react'
import { ClipLoader } from 'react-spinners'
import { FullPageLoader } from '../full-page-loader'

export const Repositories = () => {
  const {
    data: repositoriesPages,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
  } = useRepositories()
  const { ref } = useInView<HTMLLIElement>(() => {
    if (hasNextPage && !isFetchingNextPage) {
      console.log('fetching next page')
      fetchNextPage()
    }
  })

  const combinedRepositories = useMemo(
    () => repositoriesPages?.pages.map(page => page.items).flat() ?? [],
    [repositoriesPages]
  )
  const totalRepositories = combinedRepositories.length

  const isLastRepository = (index: number) => index === totalRepositories - 1

  if (isLoading) return <FullPageLoader />
  return (
    <div className={style.container}>
      <h1 className={style.title}>
        React Infinite scroll demo using React query and Github API
      </h1>
      <ul className={style.items}>
        {combinedRepositories.map((combinedRepository, index) => (
          <li
            ref={isLastRepository(index) ? ref : null}
            key={`${combinedRepository.id}-${index}`}
            className={style.item}
          >
            <a href={combinedRepository.html_url}>
              <h4 className={style.heading}>{combinedRepository.full_name}</h4>
            </a>
            <p className={style.description}>{combinedRepository.description}</p>
          </li>
        ))}
      </ul>
      {isFetchingNextPage && (
        <div className={style.loader}>
          <ClipLoader color='#000' size={50} />
        </div>
      )}
    </div>
  )
}
