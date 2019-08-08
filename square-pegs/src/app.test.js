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
    const makeWrapper = appWrapper.find(BrandSelector);
    expect(makeWrapper.exists()).toBe(true);

    const makeHeading = appWrapper.find(".app__make-heading");
    expect(makeHeading.text()).toEqual("Select a car make");
  });

  it("fetches known car makes and passes them to BrandSelector.brands", async() => {
    const carService = carServiceReturning({
      fetchAllBrandNames: Promise.resolve([{ id: "bentley", name: "Bentley" }])
    });

    const appWrapper = await mount(<App carService={carService} />);
    appWrapper.update();
    expect(carService.fetchAllBrandNames).toBeCalled();

    const makeSelectorWrapper = appWrapper.find(BrandSelector);
    expect(makeSelectorWrapper.prop("brands")).toContainEqual({
      id: "bentley",
      name: "Bentley"
    });
  });
});
