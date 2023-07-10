---
title: '[Network] CORS'
date: '2023-06-23'
tags: ['CORS']
draft: false
summary:
---

## SOP(Same Origin Policy)

다른 출처의 리소소를 사용하는 것에 제한하는 보안방식

<p align="center">
    <img width="684" alt="image" src="https://github.com/speculatingwook/blog-full-of-desire/assets/105579811/85de5cad-a77b-4749-91c0-3b83d1b37e72"/>
</p>

- `출처(origin)`: 프로토콜과 호스트까지

만약 다른 출처에서 요청을 보내온다면 해킹의 가능성이 있기 때문에 막아야 함. 다시 말해 Cross Origin을 차단함.
그렇다면 다른 출처의 리소스가 필요하다면 어떻게 해야 할까? -> CORS

## CORS(Cross-Origin Resource Sharing)

다른 출처의 자원을 공유한다!

교차 출처 리소스 공유(CORS)는 추가 HTTP 헤더를 사용하여, 한 출처에서 실행중인 웹 애플리케이션이 다른 출처의 선택한 자원에 접근할 수 있는 권한을 부여하도록 브라우저에 알려주는 체제이다.

## CORS 접근제어 시나리오

- 프리플라이트 요청(Preflight Request)
- 단순 요청(Simple Request)
- 인증정보 포함 요청(Credentialed Request)

## Preflight

<p align="center">
    <img width="547" alt="image" src="https://github.com/speculatingwook/blog-full-of-desire/assets/105579811/0ec95a19-7e8f-4191-9567-a89000ad5c09"/>
    <img width="275" alt="image" src="https://github.com/speculatingwook/blog-full-of-desire/assets/105579811/abaaf0a5-1abb-4d65-8b92-f9f0a3b3f1c8"/>
</p>

1. OPTIONS 메서드를 통해 다른 도메인의 리소스에 요청이 가능한 지 확인 작업
2. 요청이 가능하다면 실제 요청(Actual Request)을 보낸다.

### Preflight Request

- Origin: 요청 출처
- Access-Control-Request-Method: 실제 요청의 메서드
- Access-Control-Request-Headers: 실제 요청의 추가 헤더

<p align="center">
    <img width="468" alt="image" src="https://github.com/speculatingwook/blog-full-of-desire/assets/105579811/9409d6f6-3f46-4e8b-afb2-bb4f5468f25b"/>
</p>

### Preflight Response

- Access-Control-Allow-Origin: 서버 측 허가 출처
- Access-Control-Allow-Methods: 서버 측 허가 메서드
- Access-Control-Allow-Headers: 서버 측 허가 헤더
- Access-Control-Max-Age: Preflight 응답 캐시 기간

<p align="center">
    <img width="472" alt="image" src="https://github.com/speculatingwook/blog-full-of-desire/assets/105579811/b37d07f2-1a68-4ff4-b8b2-5d3f81d660c7"/>
</p>

매번 응답을 하면 리소스적으로는 비효율적임. 따라서 preflight를 캐싱해둔다.

### Preflight Response가 가져야 하는 특징

- 응답 코드는 200대여야 한다.
- 응답 바디는 비어있는 것이 좋다.

## Simple Request

Preflight 요청 없이 바로 요청을 날린다.
다음 조건을 모두 만족해야 한다.

- GET, POST, HEAD 메서스

- Content-Type

  - A. application/x-www-form-urlencoded
  - B. multipart/form-data
  - C. text/plain

- 헤더는 Accept, Accept-Language, Content-Language, Content-Type만 허용된다.

## Preflight를 하는 이유

CORS를 모르는 서버를 위해 있다.

## Credentialed Request

인증 관련 헤더를 포함할 때 사용하는 요청이다.

- 클라이언트측
  - credentials: include
- 서버 측
  - Access-Control-Allow-Credentials: true(Access-Control-Allow-Origin: \*은 안된다.)

\***\*출처\*\***

- [나봄의 CORS](https://www.youtube.com/watch?v=-2TgkKYmJt4&list=WL&index=22&t=81s)
