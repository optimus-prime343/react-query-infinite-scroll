import styles from './repositories.module.css'
import { useRepositories } from '../../hooks/use-repositories'
import { useInView } from '../../hooks/use-in-view'
import { useMemo } from 'react'

export const Repositories = () => {
  const {
    data: repositoriesPages,
    hasNextPage,
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

  return (
    <div>
      <ul className={styles.container}>
        {combinedRepositories.map((combinedRepository, index) => (
          <li
            ref={isLastRepository(index) ? ref : null}
            key={combinedRepository.id}
            className={styles.item}
          >
            <a href={combinedRepository.html_url}>{combinedRepository.name}</a>
          </li>
        ))}
      </ul>
      {isFetchingNextPage && <div>Loading...</div>}
    </div>
  )
}
