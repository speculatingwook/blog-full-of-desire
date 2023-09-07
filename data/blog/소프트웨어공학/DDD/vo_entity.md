---
title: '[ DDD ] VO(Value Object)와 Entity'
date: '2023-09-07'
tags: ['SOFTWARE_ENGINEERING']
draft: false
summary: '도메인 주도 개발에서의 주요 개념인 VO와 엔티티'
---

## VO(Value Object)

VO는 도메인 모델에서 특정한 값을 `표현`하고 `캡슐화`하는 데 사용된다.

## VO의 특징

1. 불변성(Immutability)

- VO는 한 번 생성되면 값을 변경할 수 없는 **불변 객체**여야 한다. 이건 값의 일관성을 보장하고 도메인 모델의 안정성을 높이는 데 도움이 된다.

2. 식별성 없음(No Identity)

- **VO는 고유한 식별자를 갖지 않는다.** 대신, 값 자체가 중요하며 서로 다른 VO 객체가 동일한 값을 갖으면 동등하다고 간주된다.

3. 값 기반 비교(Value-Based Equality)

- VO 객체들은 값에 기반하여 동등성을 비교한다. 즉, 두 VO 객체가 동일한 값을 가지면 동등하다고 간주된다. 객체 비교가 아니라 값 비교임

4. 재사용 가능성(Reusability)

- VO는 동일한 값이 반복적으로 사용되는 상황에서 재사용될 수 있음.

## Entity와 VO, 코드로 한번에 차이점 이해하기

```java
// 값 객체 (Address) - 불변성을 가짐
public final class Address {
    private final String street;
    private final String city;

    public Address(String street, String city) {
        this.street = street;
        this.city = city;
    }

    public String getStreet() {
        return street;
    }

    public String getCity() {
        return city;
    }
}

// 엔티티 (Person) - 가변성을 가짐
public class Person {
    private String name;
    private Address address;

    public Person(String name, Address address) {
        this.name = name;
        this.address = address;
    }

    public String getName() {
        return name;
    }

    public Address getAddress() {
        return address;
    }

    public void setAddress(Address address) {
        this.address = address;
    }
}
```

```java
// 값 객체 (Address) - 고유한 식별자 없음
public final class Address {
    // ...
}

// 엔티티 (Person) - 고유한 식별자(ID)를 가짐
public class Person {
    private long id; // 고유한 식별자
    // ...
}
```
