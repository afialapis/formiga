# formiga
[![NPM Version](https://badge.fury.io/js/formiga.svg)](https://www.npmjs.com/package/formiga)
[![NPM Downloads](https://img.shields.io/npm/dm/formiga.svg?style=flat)](https://www.npmjs.com/package/formiga)

![Formiga logo](https://www.afialapis.com/os/formiga/logo.png)


---

> **[formiga](https://academia.gal/dicionario/-/termo/formiga)**. substantivo femenino:

> **Pequeno insecto da orde dos himenópteros, polo xeral de cor negra, que vive en colonias moi numerosas organizadas en clases, e do que existen varias especies.**

> _As formigas escavan complexas galerías subterráneas._


---

# Intro

[`formiga`](https://www.afialapis.com/os/formiga) is the simplest -yet effective- form validator for `React`.

Stick to -and empower- web standards ([HTML5 Constraint Validation API](https://developer.mozilla.org/en-US/docs/Web/API/Constraint_validation)) instead of ignore them.


# Table of Contents

1. [Intro](#intro)
2. [Premature Validation](#premature-validation)
3. [UI integrations](#ui-integrations)
4. [Demo](#demo)
5. [Install](#install)
6. [Getting started](#getting-started)

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

# Premature Validation

[_HTML5 Constraint Validation API_](https://developer.mozilla.org/en-US/docs/Web/API/Constraint_validation) checks for validity changes when the input changes. Depending on the browser, it may mean: when the input's value changes or just when the input loses the focus.

Formiga is here to make your Forms much nicer: with [`prematureValidation`](#premature-validation), the [ValidityState](https://developer.mozilla.org/en-US/docs/Web/API/ValidityState) is updated *always* while typing!

# UI integrations

`formiga` cares just about state and validation of your forms. UI and styling is out of scope. That's why you will probably not use `formiga` directly, but some of the integrations with some UI library. List is tiny yet:

· [`formiga-reactstrap`](https://github.com/afialapis/formiga-reactstrap)

Given `formiga` works with native HTML elements (`<form>`, `<input>`, `<textarea>`, `<select>`), you will find pretty easy to couple it with any UI library. Or even just with some custom `CSS` if you go minimalist, as in our [Demo](#demo).


# Demo

Check a live demo at [afialapis.com/os/formiga/](https://www.afialapis.com/os/formiga/demo.html).

Or run it locally with:

```
  npm run demo
```

# Install

```
  npm i formiga
```

# Getting started 

Formiga provides just two hooks: `useForm` and `useInput`.

`VForm` will be the parent element. It just renders a `form` element, and provide a couple of render props (`renderInputs` and `renderButtons`) so you can render the rest.

Then, any input inside the Form that you want to be validated, must be wrapped within a `VInput` element.

## Basic example

Let's check a basic example ([try it at CodePen](https://codepen.io/afialapis/pen/KKwgNWK)):


```javascript
import React, {useState} from 'react'

const FormigaForm = () => {

  const form = useForm()
  const [name, setName]= useState('John Doe')
  const [age, _setAge]= useState('33') 

  const nameInput = useInput({
    type: 'text',
    disallowedValues: ["John Not Doe"],
    inputFilter: 'latin'
  })

  const ageInput = useInput({
    type: 'text',
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

# API

## `useForm()`

`const {ref, node, valid, hasChanged, elements} = useForm()`

· `ref`: React ref for the <form> element you will render
· `node`: the form DOM node element
· `valid`: a boolean indicating if every field in the form is valid
· `hasChanged`: a boolean indicating if any field in the form has changed
· `elements`: an array of objects containing the form elements, where each elemet is like:
- `name`: the name of the element
- `type`: the type of the element
- `valid`: a boolean indicating if the element is valid
- `validationMessage`: the validation message of the element
- `value`: the value of the element
- `originalValue`: the original value of the element
- `hasChanged`: a boolean indicating if the element has changed


## `useInput()`

`const {ref, node, valid, validationMessage, validate, setValue, setValidationMessage, dispatchEvent, originalValue} = useInput(props)`

· `ref`: React ref for the <input> element you will render
· `node`: the input DOM node element
· `valid`: a boolean indicating if the element is valid
· `validationMessage`: the validation message of the element
· `validate`: a function to validate the element
· `setValue`: a function to set the value of the element
· `setValidationMessage`: a function to set the validation message of the element
· `dispatchEvent`: a function to dispatch an event on the element
· `originalValue`: the original value of the element

## properties

· `originalValue`: the original value of the element. `formiga` will catch the input's value on first render, but depending on your component's rendering cycle, you may need several renders to have your component ready. In that cases, you need to force `originalValue`.
· `transformValue`: a function to transform the input's value before validation.
· `checkValue`: a function to perform some custom validation on the input's value.
· `allowedValues`: an array of values that the input's value must be in.
· `disallowedValues`: an array of values that the input's value must not be in.
· `doRepeat`: the name of the input that the input's value must be equal to.
· `doNotRepeat`: the name of the input that the input's value must not be equal to.
· `decimals`: the number of decimals the input's value must have.
· `validationMessage`: the message to show when the input is invalid.
· `inputFilter`: the type of input filter to apply to the input's value.

# Changelog

See [changelog here](https://github.com/afialapis/formiga/blob/main/CHANGELOG.md)
