import { Component, ReflectiveInjector, Inject } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'test-angular';

  constructor() {
    // ReflectiveInjector.resolveAndCreate 接收一个 perviders 数组，返回对象池 injector
    const injector = ReflectiveInjector.resolveAndCreate([
      // provide 为对象标识(token), useXxxx 是对象构造方式
      { provide: Person, useClass: Person },
      { provide: Id, useFactory: () => Id.getInstance('idcard') },
      { provide: Address, useFactory: () => {
        return new Address('浙江省', '杭州市', '西湖区', '灵隐街道');
      } },
    ]);
    const person = injector.get(Person);
    console.log(person);
  }
}

class Id {
  static type: string;
  static getInstance(type: string): Id {
    type = type;
    return new Id();
  }

}

class Address {
  province: string;
  city: string;
  district: string;
  street: string;

  constructor(province: string, city: string, district: string, street: string) {
    this.province = province;
    this.city = city;
    this.district = district;
    this.street = street;
  }
}

class Person {
  id: Id;
  address: Address;

  constructor(
    // @Inject(token) 注入依赖
    @Inject(Id) id: Id,
    @Inject(Address) address: Address
  ) {
    this.id = id;
    this.address = address;

    console.log(this.id, this.address);
  }
}
