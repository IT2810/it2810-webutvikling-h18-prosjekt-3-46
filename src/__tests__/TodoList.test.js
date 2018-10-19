import React from 'react';

import TodoList from '../screens/TodoList/index';
import renderer from 'react-test-renderer';


test('renders correctly', ()=> {
   const tree = renderer.create(<TodoList/>).toJSON();
   expect(tree).toMatchSnapshot();
});
