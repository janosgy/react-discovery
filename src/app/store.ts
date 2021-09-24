import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import provideReducer from '../features/provider/providerSlice'

export const store = configureStore({
  reducer: {
    provider: provideReducer
  }
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType,
  RootState,
  unknown,
  Action<string>>
