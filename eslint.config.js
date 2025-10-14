import {eslintConfig} from 'xeira'


export default [
  // Extiende la configuración base de xeira
  ...eslintConfig,
  
  // Opcional: añade reglas o configuraciones específicas para este proyecto
  {
    files: ['src/**/*.mjs', 'src/**/*.jsx'],
    rules: {
      'no-unused-vars': [
        "warn", // or "error"
        {
          "argsIgnorePattern": "^_",
          "varsIgnorePattern": "^_",
          "caughtErrorsIgnorePattern": "^_"
        }
      ]      
    },
  },
];