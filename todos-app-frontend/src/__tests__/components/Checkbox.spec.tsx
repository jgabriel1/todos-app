import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Checkbox } from '../../components/Checkbox';
import { render } from '../__utils__/render';

describe('<Checkbox />', () => {
  it('shows only spinner when loading', () => {
    render(<Checkbox isLoading onChange={() => {}} />);

    expect(
      screen.queryByTestId('checkbox-loading-spinner')
    ).toBeInTheDocument();
    expect(screen.queryByTestId('checkbox-checked')).not.toBeInTheDocument();
    expect(screen.queryByTestId('checkbox-unchecked')).not.toBeInTheDocument();
  });

  it('shows only checked icon when checked', () => {
    render(<Checkbox isChecked onChange={() => {}} />);

    expect(screen.queryByTestId('checkbox-checked')).toBeInTheDocument();
    expect(screen.queryByTestId('checkbox-unchecked')).not.toBeInTheDocument();
    expect(
      screen.queryByTestId('checkbox-loading-spinner')
    ).not.toBeInTheDocument();
  });

  it('shows only unchecked icon when unchecked', () => {
    render(<Checkbox onChange={() => {}} />);

    expect(screen.queryByTestId('checkbox-checked')).not.toBeInTheDocument();
    expect(screen.queryByTestId('checkbox-unchecked')).toBeInTheDocument();
    expect(
      screen.queryByTestId('checkbox-loading-spinner')
    ).not.toBeInTheDocument();
  });

  it('is not clickable while loading', async () => {
    const changeCallback = jest.fn();
    render(<Checkbox isLoading onChange={changeCallback} />);

    expect(changeCallback).not.toHaveBeenCalled();
  });

  describe('calls onChange callback passing the opposite of isChecked when clicked', () => {
    it('calls with false when passing true', async () => {
      const changeCallback = jest.fn();
      render(<Checkbox isChecked={true} onChange={changeCallback} />);

      await userEvent.click(screen.getByTestId('checkbox-button'));

      expect(changeCallback).toHaveBeenCalledWith(false);
    });

    it('calls with true when passing false', async () => {
      const changeCallback = jest.fn();
      render(<Checkbox isChecked={false} onChange={changeCallback} />);

      await userEvent.click(screen.getByTestId('checkbox-button'));

      expect(changeCallback).toHaveBeenCalledWith(true);
    });
  });
});
