const React = require('react')
const expect= global.expect
const mount= global.mount

describe('Buttons', function () {
  this.timeout(100)

  it("should render custom form buttons", async () => {   
    
    const {useForm} = global.formigaPkg
    const App = () => {
      const [formRef, _valid, _readElements] = useForm()

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
          <form ref = {formRef}>
            <button id="test-btn-cancel">Cancel</button>
            <button id="test-btn-save">Save</button>
          </form>
        </div>
      )
    }
    const wrapper= mount(<App/>)

    const btnCancelNode= wrapper.find('button#test-btn-cancel').getDOMNode()
    const btnSaveNode= wrapper.find('button#test-btn-save').getDOMNode()

    expect(btnCancelNode.innerHTML).to.equal('Cancel')
    expect(btnSaveNode.innerHTML).to.equal('Save')

    wrapper.unmount()
  })  
})


