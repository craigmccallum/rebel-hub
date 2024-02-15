import { render } from '@testing-library/react';

import { Svg } from './svg';
import Actions from '../../assets/icons/misc/actions.svg';

describe('Svg', () => {
  it('should render svg correctly', () => {
    const { baseElement } = render(<Svg component={Actions} />);

    expect(baseElement).toBeTruthy();
  });
});
