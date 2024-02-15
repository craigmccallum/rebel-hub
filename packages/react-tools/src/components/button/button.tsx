import clsx from 'clsx';

import { buttonStyles } from './button.css';

import { type UtilityStyles, utilityStyles } from '~/theme/utils.css';

export type ButtonProps = Pick<UtilityStyles, 'width' | 'maxWidth' | 'minWidth'> & {
  /** The button name */
  name?: string;
  /** On click event handler */
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  /** The button type */
  type?: 'button' | 'submit';
  /** The button value */
  value?: string;
  /** The button variant */
  variant?: keyof typeof buttonStyles;
};

export function Button({
  children,
  name,
  onClick,
  type = 'submit',
  value,
  variant = 'primary',
  ...styleProps
}: React.PropsWithChildren<ButtonProps>) {
  return (
    <button
      className={clsx(utilityStyles(styleProps), buttonStyles[variant])}
      name={name}
      onClick={onClick}
      value={value}
    >
      {children}
    </button>
  );
}

export default Button;
