---
title: 'DI, IOC'
date: '2023-05-30'
tags: ['spring', '스프링 삼각형']
draft: false
summary: 스프링 삼각형중 IOC에 대한 내용 정리
---

## DI(Dependency Injection)

`DI(Dependency Injection)`은 객체간의 의존관계를 외부에서 설정하여 객체들간의 결합도를 낮추고 유연한 애플리케이션을 개발하기 위한 디자인 패턴이다.

`DI(Dependency Injection)`은 객체 생성 및 의존성 해결을 개발자가 직접 하지 않고 Spring 프레임워크가 대신 처리해준다. 이를 통해 개발자는 객체간의 의존성을 직접 관리하거나 변경해야 하는 번거로움을 줄일 수 있다.

## Spring DI의 핵심 개념

1. `Bean`: DI는 객체를 Bean으로 관리한다. Bean은 Spring 컨테이너에 의해 생성되고 관리되는 객체를 말한다. 일반적으로 개발자가 작성한 클래스를 Bean으로 등록하면 Spring 컨테이너가 해당 클래스의 인스턴스를 생성하고 필요한 곳에서 주입한다.
2. `Injection`: Injection은 의존성을 주입하는 과정을 의미한다. DI는 다음과 같은 방법으로 의존성을 주입한다.
   - Constructor Injection: 생성자를 통해 의존성을 주입한다.
   - Setter Injection: Setter 메서드를 통해 의존성을 주입한다.
   - Field Injection: 필드에 직접 의존성을 주입한다.

## IOC(Inversion of Control)

참고자료

- [DI, IOC 정리](https://velog.io/@gillog/Spring-DIDependency-Injection)
