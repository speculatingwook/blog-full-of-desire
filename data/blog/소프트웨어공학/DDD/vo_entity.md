---
title: '[ DDD ] VO(Value Object)와 Entity'
date: '2023-09-07'
tags: ['SOFTWARE_ENGINEERING']
draft: false
summary: '도메인 주도 개발에서의 주요 개념인 VO와 엔티티'
---

## VO(Value Object)

개념적 식별성을 갖지 않으면서 도메인의 서술적 측면을 나타내는 객체를 VO(Value Object)라 한다. VO(Value Object)는 설계 요소를 표현할 목적으로 인스턴스화되는데, 우리는 이러한 설계 요소가 **어느것인지에** 대해서는 관심이 없고 오직 해당 요소가 **무엇인지에** 대해서만 관심이 있다.

VO는 도메인 모델에서 특정한 값을 `표현`하고 `캡슐화`하는 데 사용된다.

주택 설계 소프트웨어는 창문 양식마다 그것에 해당하는 객체를 만들어 낼 수도 있다. "창문 양식"은 높이/너비와 함께 "창문" 객체에 통합될 수 있다. 이러한 창문은 다른 여러 VO(Value Object)로 구성된 복합적인 VO에 해당한다. 그 다음에는 이 같은 VO가 "벽" 객체처럼 주택 설계 계획에서 더 규모가 큰 요소에 통합될 것이다.

## VO의 특징

1. 불변성(Immutability)

- VO는 한 번 생성되면 값을 변경할 수 없는 **불변 객체**여야 한다. 이건 값의 일관성을 보장하고 도메인 모델의 안정성을 높이는 데 도움이 된다.

2. 식별성 없음(No Identity)

- **VO는 고유한 식별자를 갖지 않는다.** 대신, 값 자체가 중요하며 서로 다른 VO 객체가 동일한 값을 갖으면 동등하다고 간주된다.

3. 값 기반 비교(Value-Based Equality)

- VO 객체들은 값에 기반하여 동등성을 비교한다. 즉, 두 VO 객체가 동일한 값을 가지면 동등하다고 간주된다. 객체 비교가 아니라 값 비교임

4. 재사용 가능성(Reusability)

- VO는 동일한 값이 반복적으로 사용되는 상황에서 재사용될 수 있음.

> 모델에 포함된 어떤 요소의 속성에만 관심이 있다면 그것을 VO로 분류해라.
> VO에서 해당 VO가 전하는 속성의 의미를 표현하게 하고 관련 기능을 부여하라. 또한 VO는 불변적(immutable)으로 다뤄라. VO에는 아무런 식별성도 부여하지 말고 Entity를 유지하는 데 필요한 설계의 복잡성을 피하라.
>
> 도메인 주도 설계 - 에릭 에반스

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

## VO의 설계

여러 VO의 인스턴스 가운데 어느 것을 사용하는지는 중요하지 않다. 이런 식으로 제약조건이 줄어들면 설계 단순화나 성능 최적화를 꾀할 수 있다. 하지만 여기에는 **복사**, **공유**, **불변성**에 관한 의사결정이 따른다.

한 객체가 해당 객체의 속성을 인자나 반환값으로 다른 객체에 전달할 때 동일한 문제가 일어난다. 객체의 소유자가 제어하지 못하는 떠돌이 객체에서는 무슨 일이 일어날지 알 수가 없다. Value는 소유자의 불변식(invariant)을 위반해 소유자가 손상되게끔 변경될 수도 있다. 이러한 문제는 전달된 객체를 불변적으로 만들거나 객체의 사본을 전달해서 방지할 수 있다.

복사와 공유간에도 어느 것이 경제성 면에서 더 나은지는 구현 환경에 따라서 달라진다. 복사의 경우 객체의 개수가 굉장히 많아져 시스템이 무거워질 수도 있지만 공유 또한 분산 시스템에서는 느려질 수 있다. 두 장비 간에 객체의 복사본이 전달되는 경우, 한 메시지가 전달되면 해당 메시지의 복사본은 메세지를 받는 쪽에 독립적으로 남는다. 그러나 한 인스턴스를 공유하는 경우에는 객체 참조만 전달되므로 상호작용이 발생할 때마다 메시지가 해당 객체로 되돌아와야 한다.

## VO를 포함한 연관관계 설계

Entity간의 양방향 연관관계는 유지하기는 어려울 수 있는 반면 두 VO 간의 양방향 연관관계는 논리적으로 타당하지 않다. 어떤 객체가 식별성 없이 자신을 가리키는 동일한 VO를 역으로 가리키는 것은 아무런 의미가 없다. 기껏해야 한 객체가 자신을 가리키고 있는 것과 내용이 같은 어떤 객체를 가리키고 있다는 것에 불과하며, 어딘가에서는 해당 객체의 불변식을 이행해야 할 것이다.
