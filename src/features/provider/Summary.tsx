import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { saveProvider, selectProviderById } from './providerSlice'
import {
  useParams
} from 'react-router-dom'

export function Summary () {
  const { id } = useParams<{ id: string }>()

  const provider = useAppSelector(selectProviderById(id))
  const dispatch = useAppDispatch()
  let button = null

  if (provider != null) {
    button = <button className="e-btn" onClick={() => dispatch(saveProvider(provider))}>Finalize</button>
  }

  return (
    <div>
      {button}
    </div>
  )
}
