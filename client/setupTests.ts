import * as enzyme from 'enzyme';
import 'jest-enzyme';

import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

enzyme.configure({ adapter: new Adapter() });
declare let global: any;

global.define = (a: any) => a;
global.document = {};

