import 'styled-components';
import { ThemeType } from '../app/styles/styled-components/styled-theme/styled-theme';

declare module 'styled-components' {
  export interface DefaultTheme extends ThemeType {}
}

