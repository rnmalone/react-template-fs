import { connect } from 'react-redux';
import Counter from "../components/Counter";
import { IAppState } from "../../../modules";
import { setValue } from "../../../modules/counter";

const mapDispatchToProps = {
    setCounterValue: setValue
}

const mapStateToProps = (state: IAppState) => ({
    counterValue: state.counter.value
})

export default connect(mapStateToProps, mapDispatchToProps)(Counter)