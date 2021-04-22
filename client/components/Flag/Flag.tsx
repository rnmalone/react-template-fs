import React from 'react';

import './Flag.scss';

export default function Flag({ countryCode }: { countryCode: string }) {
    return (
        <div className="Flag">
            <img
                src={ `/assets/images/flags/${countryCode}` }
                alt={ countryCode }
                height={30}
            />
        </div>
    )
}
