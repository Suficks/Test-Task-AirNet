import { userEvent } from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import { Calendar } from '../ui/Calendar';

describe('widgets/Calendar', () => {
  test('При клике на день должно открываться модальное окно', async () => {
    render(<Calendar selectedDate={new Date()} selectDate={() => { }} />)
    await userEvent.click(
      screen.getAllByTestId('day')[0],
    );
    expect(
      screen.getByTestId('modal'),
    ).toBeInTheDocument();
  });
})