const React = require('react')
const expect= global.expect
const mount= global.mount

describe('Forms', function () {
  this.timeout(100)

  it("should render an empty Form", () => {   
    const {useForm} = global.formigaPkg

    const fid= 'formiga_empty_form'
    const App = () => {
      const [formRef, _valid, _readElements] = useForm()

      return (
        <div>
          <form ref = {formRef}
                id  = {fid}
                className= 'formiga-form'>
            <div/>
          </form>
        </div>
      )
    }

    const wrapper= mount(<App/>)

    const theForm= wrapper.find(`form#${fid}`)
    const theFormNode= theForm.getDOMNode()

    expect(theForm.length).to.equal(1)
    expect(theFormNode.classList.contains('formiga-form')).to.equal(true)

    wrapper.unmount()
  })  
})