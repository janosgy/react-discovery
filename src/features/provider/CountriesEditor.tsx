import { Formik, Field, Form, FieldArray, ErrorMessage } from 'formik'
import * as Yup from 'yup'

import { countries, CountrySettings } from './providerModel'
import { providerUpdated, selectProviderById } from './providerSlice'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { useParams, useHistory } from 'react-router-dom'

const emptyCountry: CountrySettings = {
  id: '',
  inboundNumber: '',
  fee: '',
  testNumber: ''
}

const CountriesFormSchema = Yup.object().shape({
  countries: Yup.array().of(
    Yup.object().shape({
      // id: Yup.string().required('Required'),
      inboundNumber: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
      fee: Yup.number().required('Required'),
      testNumber: Yup.string().required('Required')
    })
  )
})

export function CountriesEditor () {
  const { id } = useParams<{ id: string }>()
  const provider = useAppSelector(selectProviderById(id))

  const initialValues: { countries: CountrySettings[] } = {
    countries: provider?.countries || [{ ...emptyCountry }]
  }
  const dispatch = useAppDispatch()
  const history = useHistory()

  return (
    <section className="e-layout__section e-padding-s">
      <h2>Setup Countries</h2>
      <p>Add countries in which you want to use Channel</p>

      <Formik
        initialValues={initialValues}
        validationSchema={CountriesFormSchema}
        onSubmit={(values) => {
          dispatch(providerUpdated({ id, changes: { countries: values.countries } }))
          history.push('./summary')
        }}
      >
        {({ values, errors, touched }) => (
          <Form>

            <FieldArray name="countries">
              {({ remove, push }) => (
                <div>
                  {values.countries.map((country: CountrySettings, index: number) => (
                    <div key={index}>
                      {RenderCountrySettings(country, index)}
                      <button
                        type="button"
                        className="e-btn"
                        onClick={() => remove(index)}
                      >
                        Remove
                      </button>
                    </div>
                  ))}

                  <div className="e-btn e-btn-link"
                       onClick={() => push(emptyCountry)}>
                    + Add country
                  </div>

                </div>
              )}
            </FieldArray>

            <button
              disabled={!!Object.keys(errors).length}
              className="e-btn"
              type="submit">
              Next
            </button>
          </Form>
        )}
      </Formik>
    </section>
  )
}

function RenderCountrySettings (country: CountrySettings, index: number) {
  const countryOptions = countries.map(country => ({
    type: 'option',
    value: country.id,
    content: country.label
  }))

  return (
    <div>
      <div className="e-row">

        <div className="e-col-6">
          <div className="e-field">
            <label className="e-field__label" htmlFor="country">
              Country
            </label>
            <Field
              name={`countries.${index}.id`}
              render={(fieldProps: any) => (
                // wrapper code for fieldProps.value
                <e-select
                  items={JSON.stringify(countryOptions)}
                  change={($event: any) => {
                    console.log($event)
                    console.log(fieldProps.onChange)

                    return fieldProps.onChange($event.detail)
                  }}/>
              )}
            />
          </div>
        </div>

        <div className="e-col-6">
          <div className="e-field">

            <label htmlFor={`countries.${index}.inboundNumber`}>Inbound number</label>
            <Field
              className="e-input"
              name={`countries.${index}.inboundNumber`}
              type="text"
            />
            <ErrorMessage
              name={`countries.${index}.inboundNumber`}
              component="div"
              className="field-error"
            />
          </div>
        </div>
      </div>

      <div className="e-row">

        <div className="e-col-6">
          <div className="e-field">
            <label htmlFor={`countries.${index}.fee`}>Fee per message</label>
            <Field
              className="e-input"
              name={`countries.${index}.fee`}
              type="text"
            />
            <ErrorMessage
              name={`countries.${index}.fee`}
              component="div"
              className="field-error"
            />
          </div>
        </div>
        <div className="e-col-6">
          <div className="e-field">
            <label htmlFor={`countries.${index}.fee`}>Test message number</label>
            <Field
              className="e-input"
              name={`countries.${index}.testNumber`}
              type="text"
            />
            <ErrorMessage
              name={`countries.${index}.testNumber`}
              component="div"
              className="field-error"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
