import React, { ReactChild } from 'react';
import './CoreLayout.scss';
import { Footer, Header, Navigation } from "../../components";
import { PageCentered } from "../index";

export default function CoreLayout({children}: { children: ReactChild | ReactChild[] }) {

    return (
        <>
            <Header />
            <Navigation />
            <main role="main">
                <PageCentered>
                    {children}
                </PageCentered>
            </main>
            <Footer />
        </>
    )
}
