export default class CarService {
  fetchAllBrandNames() {
    return Promise.resolve([
      {
        id: "aston-martin",
        name: "Aston Martin"
      },
      {
        id: "bentley",
        name: "Bentley"
      },
      {
        id: "chrysler",
        name: "Chrysler"
      }
    ]);
  }
}
