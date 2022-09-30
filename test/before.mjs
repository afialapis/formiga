before(async function(){
  // console.log('Preloading functions (ESM) for being used in test units (CJS)')
  const formiga= await import( "../src/index.mjs")

  global.formiga = formiga
})

