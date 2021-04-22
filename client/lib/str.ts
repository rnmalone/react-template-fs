import {useIntl} from 'react-intl'

/**
 * Gets the configured string for the message key based on the current language
 *
 * @param msgCode
 * @param values
 * @param options
 */
export default function str(msgCode: string, values?: { [key: string]: any }, options?: { [key: string]: any }) {
    const intl = useIntl()

    return intl.formatMessage(Object.assign({id: msgCode}, options), values)
}