import React from 'react';
import { shallow } from 'enzyme';
import ExampleWork, { ExampleWorkBubble } from '../js/example-work';

const myWork = [
  {
    'title': "Work Example",
    'image': {
      'desc':"example screenshot of  a project involving code",
      'src': "images/example1.png",
      'comment': ""
    }
  },
  {
    'title': "Portfolio Boilerplate",
    'image': {
      'desc':"A Serverless Portfolio",
      'src': "images/example2.png",
      'comment': ""
    }
  }
];
describe("ExampleWork component", () => {
  let component = shallow(<ExampleWork work={myWork}/>);

  it("Should be a 'section' element", () => {
    {/* console.log(component.debug) */}
    expect(component.type()).toEqual('section');

  });
  it("Should contain as many children as there are work examples", () => {
    {/* find (SEARCHES CHILDREN) WHICH RETURNS AN ARRAY = LENGTH OF ARRAY MYWORK */}
    expect(component.find("ExampleWorkBubble").length).toEqual(myWork.length);

  });

});

describe("ExampleWorkBubble component", () => {
  {/* need to import exampleworkbubble in order to test from example-work.js
      also need to give it's own prop, example={myWork[1]}
    */}
  let component = shallow(<ExampleWorkBubble example={myWork[1]}/>);
  {/* test if can find image    */}
  let images = component.find("img");

  it("Should contain a single 'img' element", () => {
    expect(images.length).toEqual(1);
  });

  it("Should have the image source set correctly", () => {
    expect(images.node.props.src).toEqual(myWork[1].image.src);
  });
});
