import React from "react";
import { shallow } from "enzyme";

import BrandSelector, { Brand } from "./brand";

describe("<BrandSelector />", () => {
  it("renders", () => {
    const makeWrapper = shallow(
      <BrandSelector onBrandClicked={() => { }} selection={false} />
    );
    expect(makeWrapper.exists()).toBe(true);
  });

  it("renders a <Brand /> for each given brand", () => {
    const makeWrapper = shallow(
      <BrandSelector
        brands={[
          { id: "cheap", name: "Cheap" },
          { id: "expensive", name: "Expensive" }
        ]}
        onBrandClicked={() => { }}
        selection={false}
      />
    );

    const brandWrappers = makeWrapper.find(Brand);
    expect(brandWrappers.length).toEqual(2);
    expect(brandWrappers.at(0).props()).toEqual(
      expect.objectContaining({
        id: "cheap",
        name: "Cheap"
      })
    );
  });
});
