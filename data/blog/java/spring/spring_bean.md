---
title: '[ Spring ] Bean'
date: '2023-06-28'
tags: ['spring', 'bean']
draft: false
summary: 스프링 bean
---

## Spring Bean?

스프링 IoC 컨테이너가 관리하는 객체

- `스프링 IoC 컨테이너`: 빈을 관리하는 객체

## [빈과 의존성 주입](/blog/java/spring/IOC-DI)

의존성 주입은 객체가 많아지면 복잡해진다.
따라서 의존성 주입이 필요한 객체들을 스프링에서 빈을 등록한다. 그렇게 되면 스프링 프레임워크에서 관리를 해주게 된다.

## 빈과 싱글턴

객체에 싱글턴 패턴을 적용할 때 단점

- 다형성을 활용하지 못한다.
- 안정성이 중요한 어플리케이션에서 단위테스트가 힘들어진다.

## 스프링 IoC컨테이너는 빈을 어떻게 관리하는가?

<p align="center">
    <img alt="image" width="600" src="https://github.com/speculatingwook/blog-full-of-desire/assets/105579811/32e415ac-8b1c-4db7-9aa4-30104f9cd30a"/>
</p>

1. 객체 생성 + property 설정
<p align="center">
    <img alt="image" width="600" src="https://github.com/speculatingwook/blog-full-of-desire/assets/105579811/f927b4b8-22f7-48be-8751-488c50d43b68"/>
</p>

2. 의존 설정
3. 초기화
4. 사용
5. 소멸

## 빈 설정시 주의점

**참고자료**

- [[10분 테코톡] 주디의 Spring Bean](https://www.youtube.com/watch?v=3gURJvJw_T4&t=395s)
