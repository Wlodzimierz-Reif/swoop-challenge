import { FC, ReactNode, useEffect } from 'react';
import { Theme, ThemeProps } from '@radix-ui/themes';

interface ThemeProviderProps extends Partial<ThemeProps> {
  children: ReactNode;
}

export const ThemeProvider: FC<ThemeProviderProps> = ({
  children,
  ...rest
}: ThemeProviderProps) => {
  useEffect(() => {
    switch ((rest as Partial<ThemeProps>).appearance) {
      case 'light': {
        if (document?.body) {
          document.body.classList.remove('light', 'dark');
          document.body.classList.add('light');
        }
        break;
      }
      case 'dark': {
        if (document?.body) {
          document.body.classList.remove('light', 'dark');
          document.body.classList.add('dark');
        }
        break;
      }
      default: {
        if (document?.body) {
          document.body.classList.remove('light', 'dark');
          document.body.classList.add('light');
        }
      }
    }
  }, [rest.appearance]);

  return <Theme {...rest}>{children}</Theme>;
};
