import Greeter from './greeter';

describe('Greeter', () => {
  let subject: Greeter;
  let returned: string;

  it('greets everyone, given no name', () => {
    subject = new Greeter();
    returned = subject.sayHello();
    expect(returned).toEqual('Hello world!');
  });

  it('greets a person, given a name', () => {
    subject = new Greeter();
    returned = subject.sayHello('George');
    expect(returned).toEqual('Hello George!');
  });
});
