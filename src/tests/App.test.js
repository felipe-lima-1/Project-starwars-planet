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

    const bespin = await screen.findByText(/Bespin/i, {}, { timeout: 15000 }); 
    const planet = screen.getByPlaceholderText('planet');
    const valueFilter = screen.getByTestId('value-filter');
    const valueComparison = screen.getByTestId('column-filter');
    const compFilter = screen.getByTestId('comparison-filter');
    const buttonFilter = screen.getByRole('button', {
      name: /adicionar filtro/i,
    });
    
    expect(planet).toBeInTheDocument();
    expect(valueFilter).toBeInTheDocument();
    expect(valueComparison).toBeInTheDocument();
    expect(bespin).toBeInTheDocument();
    

    userEvent.type(planet, 'Dagobah');
    userEvent.selectOptions(valueComparison, 'population');
    userEvent.selectOptions(compFilter, 'maior que');
    userEvent.type(valueFilter, '0');
    userEvent.click(buttonFilter);
    userEvent.selectOptions(compFilter, 'menor que');
    userEvent.click(buttonFilter);
    userEvent.selectOptions(compFilter, 'igual a');
    userEvent.click(buttonFilter);

  });
});