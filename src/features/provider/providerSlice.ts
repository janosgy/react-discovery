import { createAsyncThunk, createEntityAdapter, createSelector, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
import { Provider } from './providerModel'
import { fetchList, update } from './providerAPI'

export const saveProvider = createAsyncThunk(
  'provider/save',
  async (provider: Provider) => {
    const response = await update(provider)
    // The value we return becomes the `fulfilled` action payload
    return response.data
  }
)

export const fetchProviders = createAsyncThunk(
  'provider/fetch',
  async () => {
    const response = await fetchList()
    // The value we return becomes the `fulfilled` action payload
    return response.data
  }
)

const ProvidersAdapter = createEntityAdapter<Provider>()

const providersSlice = createSlice({
  name: 'providers',
  initialState: ProvidersAdapter.getInitialState({
    status: 'idle'
  }),
  reducers: {
    providerAdded: ProvidersAdapter.addOne,
    providerUpdated: ProvidersAdapter.updateOne
  },
  extraReducers: (builder) => {
    builder
      .addCase(saveProvider.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(saveProvider.fulfilled, (state, action) => {
        console.log(action.payload)

        ProvidersAdapter.updateOne(state, { id: action.payload.id, changes: action.payload })
        state.status = 'succeeded'
      })
      .addCase(saveProvider.rejected, (state, action) => {
        state.status = 'failed'
        console.error(action.payload)
      })
      .addCase(fetchProviders.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchProviders.fulfilled, (state, action) => {
        ProvidersAdapter.setAll(state, action.payload)
        state.status = 'succeeded'
      })
      .addCase(fetchProviders.rejected, (state, action) => {
        state.status = 'failed'
        console.error(action.payload)
      })
  }
})

export default providersSlice.reducer

export const { providerAdded, providerUpdated } = providersSlice.actions

// Can create a set of memoized selectors based on the location of this entity state
const providerSelectors = ProvidersAdapter.getSelectors<RootState>(
  (state) => state.provider
)

// And then use the selectors to retrieve values
export const allProviders = providerSelectors.selectAll

export const selectProviderById = (id: string) => createSelector([allProviders], (providers: Provider[]) =>
  providers.find(provider => provider.id === id)
)

export const selectStatus = (state: RootState) => state.provider.status
