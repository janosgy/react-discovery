export interface CountrySettings {
  id: string
  inboundNumber: string
  fee: string
  testNumber: string
}

export interface Provider {
  id: string
  name: string
  countries: CountrySettings[]
}


export const countries = [{ id: 'HU', label: 'Hungary' }, { id: 'AT', label: 'Austria' }]
