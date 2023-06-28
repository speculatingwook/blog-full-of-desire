---
title: 'DI(의존성 주입), IOC'
date: '2023-05-30'
tags: ['spring', '스프링 삼각형']
draft: false
summary: 스프링 삼각형중 IOC에 대한 내용 정리
---

## DI(Dependency Injection)

스프링 프레임워크에서 의존성 주입(Dependency Injection, DI)은 객체 간의 결합도를 줄이고 코드 재사용성을 높이는 디자인 패턴이다. 의존성 주입은 객체가 동작하는데 필요한 종속성을 외부에서 전달(주입)하도록하는 것으로, 클래스 내부에서 직접 객체 생성이나 조회를 하지 않아도 된다. 이를 통해 클래스 간의 느슨한 결합(loose coupling)을 유지할 수 있다.

스프링 프레임워크에서 의존성 주입은 주로 세 가지 방법으로 이루어진다.

1. 생성자 주입(Constructor Injection): 의존성이 필요한 클래스의 생성자를 통해 주입하는 방식이다. `@Autowired` 또는 `@Inject` 주석을 생성자에 붙여 이 방식을 사용할 수 있다. 생성자 주입은 필수 의존성(composer)의 경우 권장되는 방식이다.

```java
@Service
public class UserService {
    private UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
}
```

2. 필드 주입(Field Injection): `@Autowired` 또는 `@Inject` 주석을 사용하여 클래스의 필드에 의존성을 주입하는 방식이다. 이 방식은 쉽고 간편하게 사용할 수 있지만, 테스트하기 어렵고 불변성을 보장할 수 없기 때문에 생성자 주입을 대신 추천한다.

```java
@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;
}
```

3. 세터 주입(Setter Injection): 의존성을 제공하는 세터 메서드를 통해 주입하는 방식이다. `@Autowired` 또는 `@Inject` 주석을 세터 메서드 앞에 붙이면 세터 주입을 사용할 수 있다. 다만, 선택적(non-composer) 의존성 주입에 대해서만 세터 주입을 사용할까요 관리한다.

```java
@Service
public class UserService {
    private UserRepository userRepository;

    @Autowired
    public void setUserRepository (UserRepository userRepository) {
        this.userRepository = userRepository;
    }
}
```

스프링에서 의존성 주입을 사용하면 클래스 간의 결합도를 줄이고 개방-폐쇄 원칙(Open/Closed Principle)을 따르는 코드를 작성할 수 있다. 이렇게 함으로써 유지보수 및 테스트 작업이 수월해진다.

## Spring DI의 핵심 개념

1. `Bean`: DI는 객체를 Bean으로 관리한다. Bean은 Spring 컨테이너에 의해 생성되고 관리되는 객체를 말한다. 일반적으로 개발자가 작성한 클래스를 Bean으로 등록하면 Spring 컨테이너가 해당 클래스의 인스턴스를 생성하고 필요한 곳에서 주입한다.
2. `Injection`: Injection은 의존성을 주입하는 과정을 의미한다. DI는 다음과 같은 방법으로 의존성을 주입한다.
   - Constructor Injection: 생성자를 통해 의존성을 주입한다.
   - Setter Injection: Setter 메서드를 통해 의존성을 주입한다.
   - Field Injection: 필드에 직접 의존성을 주입한다.

## IOC(Inversion of Control)

참고자료

- [DI, IOC 정리](https://velog.io/@gillog/Spring-DIDependency-Injection)
