import clsx from 'clsx';

import { headingStyles, linkTextStyles, textStyles } from './typography.css';

import type { UtilityStyles } from '~/theme/utils.css';
import { utilityStyles } from '~/theme/utils.css';

type HeadingProps = Pick<UtilityStyles, 'color'> & {
  level: keyof typeof headingStyles;
};

export function Heading({
  children,
  color = 'theme.textOnBackground',
  level,
}: React.PropsWithChildren<HeadingProps>) {
  const Component = level;
  return (
    <Component className={clsx(utilityStyles({ color }), headingStyles[level])}>
      {children}
    </Component>
  );
}

type TextProps = Pick<UtilityStyles, 'color'> & {
  as?: 'div' | 'figcaption' | 'label' | 'li' | 'p' | 'span';
  variant?: keyof typeof textStyles;
};
export function Text({
  as = 'div',
  children,
  color = 'theme.textOnBackground',
  variant = 'regular',
}: React.PropsWithChildren<TextProps>) {
  const Component = as;
  return (
    <Component className={clsx(utilityStyles({ color }), textStyles[variant])}>
      {children}
    </Component>
  );
}

type LinkTextProps = Pick<UtilityStyles, 'color'> & {
  as?: 'div' | 'figcaption' | 'label' | 'li' | 'p' | 'span';
  isUnderlined?: boolean;
};
export function LinkText({
  as = 'span',
  children,
  color = 'theme.linkText',
  isUnderlined = true,
}: React.PropsWithChildren<LinkTextProps>) {
  const Component = as;
  return (
    <Component
      className={clsx(
        utilityStyles({ color }),
        isUnderlined ? linkTextStyles.withUnderline : linkTextStyles.withoutUnderline,
      )}
    >
      {children}
    </Component>
  );
}
