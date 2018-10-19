import React from 'react';

import HomeScreen from '../components/HomeScreen/index';
import renderer from 'react-test-renderer';
import moment from 'moment';


test('renders correctly', ()=> {
   let props = {
      currentDay: moment("2018-10-19 13:13:00").format("MMMM Do YYYY h:mm:ss a")
   };
      const tree = renderer.create(<HomeScreen {...props}/>).toJSON();
   expect(tree).toMatchSnapshot();
});
