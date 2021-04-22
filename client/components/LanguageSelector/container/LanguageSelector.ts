import { connect } from 'react-redux';
import { toggleLanguage } from "../../../modules/locale";
import LanguageSelector from "../component/LanguageSelector";
import { IAppState } from "../../../modules";

const mapDispatchToProps = {
    onToggleLanguage: toggleLanguage
}

const mapStateToProps = (state: IAppState) => ({
    supportedLanguages: state.locale.supportedLanguages
})

export default connect(mapStateToProps, mapDispatchToProps)(LanguageSelector)