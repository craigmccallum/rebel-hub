import { render } from '@testing-library/react';

import { Box } from './box';

describe('Box', () => {
  const BOX_CONTENT = 'hey there';

  describe('Default', () => {
    it('should render correctly', () => {
      const { baseElement, getByText } = render(<Box>{BOX_CONTENT}</Box>);
      expect(baseElement).toBeTruthy();

      expect(getByText(BOX_CONTENT)).toBeVisible();
    });

    it('should render the correct element type', () => {
      const { container } = render(<Box as="span">{BOX_CONTENT}</Box>);

      expect(container.getElementsByTagName('span').length).toBe(1);
    });
  });
});
