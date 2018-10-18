import React from 'react';

import Calendar from '../components/Calendar/index';
import renderer from 'react-test-renderer';


test('renders correctly', ()=> {
   const tree = renderer.create(<Calendar/>).toJSON();
   expect(tree).toMatchSnapshot();
});
