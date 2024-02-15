import React from 'react';

import { utilityStyles, type UtilityStyles } from '~/theme/utils.css';

export type BoxProps = UtilityStyles & {
  /** Element to render as */
  as?: React.ElementType;
  /** React children */
  children?: React.ReactNode;
  /** On click event handler */
  onClick?: React.MouseEventHandler<HTMLElement>;
};

export const Box = React.forwardRef<HTMLElement, BoxProps>(
  ({ as = 'div', children, color = 'theme.textOnBackground', onClick, ...styleProps }, ref) => {
    const Component = as;

    return (
      <Component className={utilityStyles({ color, ...styleProps })} onClick={onClick} ref={ref}>
        {children}
      </Component>
    );
  },
);

Box.displayName = 'Box';
