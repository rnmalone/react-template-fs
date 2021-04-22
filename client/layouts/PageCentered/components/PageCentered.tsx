import React, { ReactChild } from 'react';

import '../styles/PageCentered.scss'

/**
 * Centres the content
 *
 * @param children
 * @constructor
 */
export default function PageCentered({ children }: { children: ReactChild | ReactChild[] }) {
    return (
        <div className="PageCentered">
            <div>
                {children}
            </div>
        </div>
    )
}