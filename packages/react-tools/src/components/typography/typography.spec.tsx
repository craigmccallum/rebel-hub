import { render } from '@testing-library/react';

import { Heading, Text } from './typography';

describe('Typography', () => {
  describe('Headings', () => {
    const TYPOGRAPHY_CONTENT = 'hey there';

    it('should render successfully', () => {
      const { baseElement } = render(<Heading level="h1">{TYPOGRAPHY_CONTENT}</Heading>);
      expect(baseElement).toBeTruthy();
    });
  });

  describe('Text', () => {
    const TYPOGRAPHY_CONTENT = 'hey there';

    it('should render successfully', () => {
      const { baseElement } = render(
        <Text as="p" variant="regular">
          {TYPOGRAPHY_CONTENT}
        </Text>,
      );
      expect(baseElement).toBeTruthy();
    });
  });
});
