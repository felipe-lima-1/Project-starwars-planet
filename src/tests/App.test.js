import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('Testa o app', () => {
  it('Verifica se é renderizado', () => {
    render(<App />);

    const textboxes = screen.getAllByRole('textbox');
    const comoboxes = screen.getAllByRole('combobox');
    const button = screen.getByRole('button', {
      name: /adicionar filtro/i,
    });

    expect(textboxes.length).toBe(1);
    expect(comoboxes.length).toBe(2);
    expect(button).toBeInTheDocument();
  });

  it('Verifica o filtro', async () => {
    render(<App />);

    const planet = screen.getByPlaceholderText('planet');
    const valueFilter = screen.getByTestId('value-filter');
    const buttonFilter = screen.getByRole('button', {
      name: /adicionar filtro/i,
    });

    expect(planet).toBeInTheDocument();
    expect(valueFilter).toBeInTheDocument();

    userEvent.type(planet, 'Dagobah');
    userEvent.type(valueFilter, '10');

    userEvent.click(buttonFilter);

    const planetsTest = await screen
      .findAllByTestId('planets', undefined, { timeout: 2000 });

    expect(planetsTest.length).toBe(1);
  });
});