class Greeter {
  sayHello() {
    return 'Hello world!';
  }
}

describe('Greeter', () => {
  let subject: Greeter;
  let returned: string;

  it('greets everyone', () => {
    subject = new Greeter();
    returned = subject.sayHello();
    expect(returned).toEqual('Hello world!');
  });
});
