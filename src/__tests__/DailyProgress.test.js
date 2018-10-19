import React from 'react';

import DailyProgress from '../screens/DailyProgress/index';
import renderer from 'react-test-renderer';


test('renders correctly', ()=> {
   const tree = renderer.create(<DailyProgress/>).toJSON();
   expect(tree).toMatchSnapshot();
});
