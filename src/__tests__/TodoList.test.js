import React from 'react';

import TodoList from `../components/TodoList/index`;
// impoort renderer from 'react-test-renderer';

test('renders correctly', ()=> {
   const tree = renderer.create(<TodoList/>).toJSON();
   expect(tree).toMatchSnapshot();
})
