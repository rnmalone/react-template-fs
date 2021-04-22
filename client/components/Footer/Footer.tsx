import React from 'react';
import { str } from "../../lib";
import { PageCentered } from "../../layouts";

import './Footer.scss';

export default function Footer() {
    return (
        <footer>
            <PageCentered>
                {str('footer.text')}
            </PageCentered>
        </footer>
    )
}