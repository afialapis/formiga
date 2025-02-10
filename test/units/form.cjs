const React = require('react')
const expect= global.expect
const render= global.render

describe('Forms', function () {
  this.timeout(100)

  it("should render an empty Form", () => {   
    const {useForm} = global.formiga

    const fid= 'formiga_empty_form'
    const App = () => {
      const form = useForm()

      return (
        <div>
          <form ref = {form.ref}
                data-testid  = {fid}
                className= 'formiga-form'>
            <div/>
          </form>
        </div>
      )
    }

    const {getByTestId} = render(<App/>)

    const theForm= getByTestId(fid)

    expect(theForm.classList.contains('formiga-form')).to.equal(true)
  })  
})