import { render } from '@testing-library/react';

import Button from './button';

describe('Button', () => {
  const BUTTON_CONTENT = 'hey there';

  it('should render successfully', () => {
    const { baseElement } = render(<Button>{BUTTON_CONTENT}</Button>);
    expect(baseElement).toBeTruthy();
  });
});
