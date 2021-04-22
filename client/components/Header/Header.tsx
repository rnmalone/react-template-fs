import React from 'react';
import { PageCentered } from "../../layouts";
import { str } from "../../lib";

import './Header.scss';

export default function Header() {
    return (
        <header role="banner">
            <PageCentered>
                <h1>{str('app.title')}</h1>
            </PageCentered>
        </header>
    )
}