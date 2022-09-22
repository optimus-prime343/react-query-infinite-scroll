import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Repositories } from './components/repositories'

const App = () => {
  const client = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
  })

  return (
    <QueryClientProvider client={client}>
      <Repositories />
    </QueryClientProvider>
  )
}

export default App
