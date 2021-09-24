import { allProviders } from './providerSlice'
import { useAppSelector } from '../../app/hooks'

export function List () {
  const providers = useAppSelector(allProviders).map(provider => ({
    ...provider,
    editUrl: `/providers/${provider.id}`
  }))

  return (
    <e-datagrid
      data={JSON.stringify(providers)}>
      <e-datagrid-column head="ID" content-key="id"></e-datagrid-column>
      <e-datagrid-column head="Name" content-key="name"></e-datagrid-column>
      <e-datagrid-item-action icon="pencil" tooltip="Edit" url-key="editUrl"></e-datagrid-item-action>
    </e-datagrid>
  )
}
