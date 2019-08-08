import React from "react";
import { mount, shallow } from "enzyme";

import App from "./app";
import BrandSelector from "./brand";

function carServiceReturning(options) {
  const stubValues = Object.assign(
    {
      fetchAllBrandNames: Promise.resolve([])
    },
    options
  );

  const carService = { fetchAllBrandNames: jest.fn() };
  carService.fetchAllBrandNames.mockReturnValue(stubValues.fetchAllBrandNames);
  return carService;
}

describe("<App />", () => {
  it("has a greeting", () => {
    const appWrapper = shallow(<App carService={carServiceReturning()} />);
    const greeting = appWrapper.find(".app__greeting");
    expect(greeting.text()).toEqual("Find Your Auto Parts");
  });

  it("has a <BrandSelector /> with an appropriate heading", () => {
    const appWrapper = shallow(<App carService={carServiceReturning()} />);
    const brandWrapper = appWrapper.find(BrandSelector);
    expect(brandWrapper.exists()).toBe(true);

    const brandHeading = appWrapper.find(".app__brand-heading");
    expect(brandHeading.text()).toEqual("Select a car make");
  });

  it("fetches known car brands and passes them to BrandSelector.brands", async() => {
    const carService = carServiceReturning({
      fetchAllBrandNames: Promise.resolve([{ id: "bentley", name: "Bentley" }])
    });

    const appWrapper = await mount(<App carService={carService} />);
    appWrapper.update();
    expect(carService.fetchAllBrandNames).toBeCalled();

    const brandSelectorWrapper = appWrapper.find(BrandSelector);
    expect(brandSelectorWrapper.prop("brands")).toContainEqual({
      id: "bentley",
      name: "Bentley"
    });
  });
});
