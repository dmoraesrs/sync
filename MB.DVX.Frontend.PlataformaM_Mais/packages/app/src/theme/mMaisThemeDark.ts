import {
    createBaseThemeOptions,
    createUnifiedTheme,
    genPageTheme,
    pageTheme,
    palettes,
    shapes,
  } from '@backstage/theme';
  
  export const mMaisThemeDark = createUnifiedTheme({
    ...createBaseThemeOptions({
      palette: {
        ...palettes.dark,
        primary: {
          main: '#0066fc',
        },
      },
    }),
    defaultPageTheme: 'home',
    pageTheme: {
        ...pageTheme,
        home: genPageTheme({ colors: ['#1526ff', '#01139b'], shape: shapes.wave }),
        documentation: genPageTheme({
            colors: ['#1526ff', '#01139b'],
            shape: shapes.wave2,
          }),
          tool: genPageTheme({ colors: ['#1526ff', '#01139b'], shape: shapes.round }),
          service: genPageTheme({
            colors: ['#1526ff', '#01139b'],
            shape: shapes.wave,
          }),
          website: genPageTheme({
            colors: ['#1526ff', '#01139b'],
            shape: shapes.wave,
          }),
          library: genPageTheme({
            colors: ['#1526ff', '#01139b'],
            shape: shapes.wave,
          }),
          other: genPageTheme({ colors: ['#1526ff', '#01139b'], shape: shapes.wave }),
          app: genPageTheme({ colors: ['#1526ff', '#01139b'], shape: shapes.wave }),
          apis: genPageTheme({ colors: ['#1526ff', '#01139b'], shape: shapes.wave2 }),
    },
  });