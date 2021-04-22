import React from 'react';
import { PageCentered } from "../../../layouts";
import { NAV_ROUTES } from "../../../config/navigation";
import { Link, useLocation } from 'react-router-dom';
import { str } from "../../../lib";
import shortid from "shortid";
import cx from 'classnames';

import '../styles/Navigation.scss'

export default function Navigation() {
    const location = useLocation();

    return (
        <div className="Navigation">
            <PageCentered>
                <div className="Navigation__routes">
                    {
                        NAV_ROUTES.map((route) => (
                            <Link
                                className={cx('Navigation__link', {
                                    'Navigation__link--selected': location.pathname.includes(route.route)
                                })}
                                key={shortid()}
                                to={route.route}
                            >
                                {str(route.displayName)}
                            </Link>
                        ))
                    }
                </div>
            </PageCentered>
        </div>
    )
}