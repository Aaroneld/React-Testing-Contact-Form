import React from 'react'
import ContactForm from './ContactForm'
import { render, fireEvent } from '@testing-library/react'
import { act } from 'react-dom/test-utils';



test("renders contact form", () => {
    render(<ContactForm />)
});

test('inputs exist', () => {

    const { getByLabelText } =  render(<ContactForm />);

    const fnInput = getByLabelText(/first name\*/i);
    const lnInput = getByLabelText(/last name\*/i);
    const emailInp = getByLabelText(/email\*/i)
    const mesInp = getByLabelText(/message/i);

    expect(fnInput).toBeTruthy();
    expect(lnInput).toBeTruthy();
    expect(emailInp).toBeTruthy();
    expect(mesInp).toBeTruthy();  
});

test('throws error on first name on input blur if value is empty', async () => {

    const { getByLabelText, queryByTestId } =  render(<ContactForm />);

    const fNameInp = getByLabelText(/first name/i);

    await act(async () => {
        fireEvent.focus(fNameInp);
        fireEvent.blur(fNameInp);
    });

    expect(queryByTestId("first-name-error")).toBeTruthy();

})

test('Allows first name input of more then three characters without error', async () => {

    const { getByLabelText, queryByTestId } =  render(<ContactForm />);
    const fNameInp = getByLabelText(/first name/i);

    await act(async () => {
        fireEvent.focus(fNameInp);
        fireEvent.change(fNameInp, { target: { value: "Aaron"}});
        fireEvent.blur(fNameInp);
    });
   
    expect(queryByTestId("first-name-error")).toBeNull()
});