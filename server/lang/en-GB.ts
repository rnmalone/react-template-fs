import { LanguageData } from "../../types";

const enGB: LanguageData = {
    meta: {
        language: 'English',
        countryCode: 'GB',
        localeCode: 'en-GB'
    },
    messages: {
        'app.title': 'Template App',

        'nav.link.todos': 'Todos',
        'nav.link.counter': 'Counter',

        'pages.todos.title': 'Todos',
        'pages.todos.item.client.title': 'React app',
        'pages.todos.item.client.description': 'Edit the contents of the client folder.',
        'pages.todos.item.server.title': 'GraphQL Server',
        'pages.todos.item.server.description': 'Edit the contents of the server folder.',

        'pages.counter.title': 'Counter Example',

        'pages.error.title': 'Something has gone wrong!',

        'footer.text': '© Your Company 2021'
    }
}

export default enGB;
