![Formiga logo](https://formiga.afialapis.com/logo.png)

[![NPM Version](https://badge.fury.io/js/formiga.svg)](https://www.npmjs.com/package/formiga)
[![NPM Downloads](https://img.shields.io/npm/dm/formiga.svg?style=flat)](https://www.npmjs.com/package/formiga)

The simplest -yet effective- form validator for React: stick to (and empower) web standard ([HTML5 Constraint Validation API](https://developer.mozilla.org/en-US/docs/Web/API/Constraint_validation)) instead of ignore them.


# Install

```
  npm i formiga
```

# Intro

`formiga` aims to provide full `<form>` state and validation functionalities with:

- no dependencies
- no boilerplate: 
  - no wrapping components, just use standard `<form>`, `<input>`, `<textarea>` and `<select>` `HTML` elements
  - no API to learn: just a couple of hooks `useForm` and `useInput`
- HTML validation at our service
  - no over-coded validation logics
  - just stick to standard [_HTML5 Constraint Validation API_](https://developer.mozilla.org/en-US/docs/Web/API/Constraint_validation)
  - validate your input through standard attributes [(`required`, `minLength`, `maxLength`, `pattern`, ...)](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5/Constraint_validation)
  - extend it with a few basic validations that HTML does not provide (`allowedValues`, `disallowedValues`, `doRepeat`, `doNotRepeat` ,`checkValue`), while keeping in sync the element's [ValidityState](https://developer.mozilla.org/en-US/docs/Web/API/ValidityState)
  - empower it with [`prematureValidation`](#premature-validation)

## Premature Validation

[_HTML5 Constraint Validation API_](https://developer.mozilla.org/en-US/docs/Web/API/Constraint_validation) checks for validity changes when the input changes. Depending on the browser, it may mean: when the input's value changes or just when the input loses the focus.

Formiga is here to make your Forms much nicer: with [`prematureValidation`](#premature-validation), the [ValidityState](https://developer.mozilla.org/en-US/docs/Web/API/ValidityState) is updated *always* while typing!


## UI integrations

`formiga` cares just about state and validation of your `<form>` (and its children 
`<input>`, `<textarea>` or `<select>`). But `formiga` renders nothing. UI and, therefore, 
styling are out of scope. 

As shown by our [Demo](#demo), using `formiga` and a few `CSS` lines, you will have nice Forms
with a very simple code.

`formiga`'s simplicity make it easy also to integrate it with any UI library. Existing list is tiny yet:

· [`formiga-reactstrap`](https://github.com/afialapis/formiga-reactstrap)


## Demo

Check a live demo at [formiga.afialapis.com](https://formiga.afialapis.com/demo).

Or run it locally with:

```
  npm run demo
```



# Getting started 

Formiga provides just two hooks: `useForm` and `useInput`.


```javascript
import React, {useState} from 'react'

const FormigaForm = () => {

  const form = useForm()
  const [name, setName]= useState('John Doe')
  const [age, _setAge]= useState('33') 

  const nameInput = useInput({
    disallowedValues: ["John Not Doe"],
    inputFilter: 'latin'
  })
  const ageInput = useInput({
    checkValue: (v) => !isNaN(v) && parseInt(v)>=18,
    inputFilter: 'int'
  })


  const handleSubmit = () => {
    let resume= ''

    form.elements
      .map((el) => {
        resume+= `Input ${el.name} ${el.valid ? 'is' : 'is not'} valid\n`
      })

    console.log(resume)
    //
    // Input name is valid
    // Input age is valid
  }


  return (  

    <form ref = {form.ref}>
        
      {/* A controlled input */}
      <input ref       = {nameInput.ref}
             name      = {'name'}
             className = {nameInput.valid ? 'valid' : 'invalid'}
             required  = {true}
             value     = {name}
             onChange  = {(event) => setName(event.target.value)}/>

      {/* An uncontrolled input */}
      <input ref       = {ageInput.ref}
             name      = {'age'}
             className = {ageInput.valid ? 'valid' : 'invalid'}
             required  = {true}
             defaultValue = {age}/>


      <button
             onClick  ={(_ev) => handleSubmit()}
             disabled = {! form.valid}>
        Save
      </button>

    </form>

  )
}          

```

