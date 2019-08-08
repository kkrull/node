import React from "react";
import { shallow } from "enzyme";

import BrandSelector, { Brand } from "./brand";

describe("<BrandSelector />", () => {
  it("renders", () => {
    const brandWrapper = shallow(
      <BrandSelector
        onBrandClicked={() => { }}
        selection={false}
      />
    );
    expect(brandWrapper.exists()).toBe(true);
  });

  it("renders a <Brand /> for each given brand", () => {
    const brandWrapper = shallow(
      <BrandSelector
        brands={[
          { id: "cheap", name: "Cheap" },
          { id: "expensive", name: "Expensive" }
        ]}
        onBrandClicked={() => { }}
        selection={false}
      />
    );

    const brandWrappers = brandWrapper.find(Brand);
    expect(brandWrappers.length).toEqual(2);
    expect(brandWrappers.at(0).props()).toEqual(
      expect.objectContaining({
        id: "cheap",
        name: "Cheap"
      })
    );
  });

  describe('.onChange', async() => {
    it('clicking a <Brand /> calls .onChange, if it was not already selected', () => {
      const onBrandChanged = jest.fn();
      const selectorWrapper = shallow(
        <BrandSelector
          brands={[{ id: '1', name: 'unselected' }]}
          onBrandClicked={() => {}}
          selection={false}
        />
      );

      const brandWrapper = selectorWrapper.find(Brand);
      brandWrapper.simulate('click');
      // selectorWrapper.update();
      expect(onBrandChanged).toBeCalled();
    });
  });
});
