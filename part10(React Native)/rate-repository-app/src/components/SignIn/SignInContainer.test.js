import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react-native';
import SignInForm from './SignInForm';

describe('SignIn', () => {
    describe('SignInContainer', () => {
        it('calls onSubmit with correct arguments when a valid form is submitted', async () => {
            const onSubmit = jest.fn();

            await render(<SignInForm onSubmit={onSubmit} />);

            await fireEvent.changeText(
                screen.getByPlaceholderText('Username'),
                'kalle'
            );

            await fireEvent.changeText(
                screen.getByPlaceholderText('Password'),
                'password'
            );

            await fireEvent.press(screen.getByText('Sign in'));

            await waitFor(() => {
                expect(onSubmit).toHaveBeenCalledTimes(1);

                expect(onSubmit.mock.calls[0][0]).toEqual({
                    username: 'kalle',
                    password: 'password',
                });
            });
        });
    });
});