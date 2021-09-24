import { Provider } from './providerModel'

const MockProviders: Provider[] = [
  { id: '1', name: 'first', countries: [] },
  { id: '3', name: 'third', countries: [] },
  { id: '9', name: 'ninth', countries: [] },
  { id: '21', name: 'twenty-first', countries: [] }
]

export async function fetchList () {
  return await new Promise<{ data: Provider[] }>((resolve) =>
    setTimeout(() => resolve({ data: MockProviders }), 1000)
  )
}

export async function update (provider: Provider) {
  return await new Promise<{ data: Provider }>((resolve) =>
    setTimeout(() => resolve({ data: { ...provider, name: `${provider.name} - Updated` } }), 1000)
  )
}
