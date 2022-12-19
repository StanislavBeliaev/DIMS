import React from 'react';
import { ModalCreate } from './ModalCreate';
import { render } from '@testing-library/react';

describe('ModalWindow', () => {
    it('should not render children', () => {
        const { queryByText } = render(<ModalCreate showModal={false}>Hello World!</ModalCreate>);
        const ModalCreateText = queryByText('Hello World!');
        expect(ModalCreateText).not.toBeInTheDocument();
    });

    it('should render children', () => {
        const { getByText } = render(<ModalCreate showModal={true}>Hello World!</ModalCreate>);
        const ModalCreateText = getByText('Hello World!');
        expect(ModalCreateText).toBeInTheDocument();
        expect(ModalCreateText).toBeVisible();
    });
});
