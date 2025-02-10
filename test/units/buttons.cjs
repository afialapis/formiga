const React = require('react')
const expect= global.expect
const render= global.render

describe('Buttons', function () {
  this.timeout(100)

  it("should render custom form buttons", async () => {   
    
    const {useForm} = global.formiga
    const App = () => {
      const form = useForm()
      
      // const renderButtons= (_valid, _elements) => {
      //   return (
      //     <>
      //       <button id="test-btn-cancel">Cancel</button>
      //       <button id="test-btn-save">Save</button>
      //     </>
      //   )
      // }

      return (
        <div>
          <form ref = {form.ref}>
            <button data-testid="test-btn-cancel">Cancel</button>
            <button data-testid="test-btn-save">Save</button>
          </form>
        </div>
      )
    }
    const {getByTestId} = render(<App/>)

    const btnCancelNode= getByTestId('test-btn-cancel')
    const btnSaveNode= getByTestId('test-btn-save')

    expect(btnCancelNode.innerHTML).to.equal('Cancel')
    expect(btnSaveNode.innerHTML).to.equal('Save')
  })  
})


