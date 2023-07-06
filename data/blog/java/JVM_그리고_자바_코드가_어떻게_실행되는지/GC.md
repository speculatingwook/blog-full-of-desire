---
title: '[ JAVA ] GC(Garbage Collection), Java GC'
date: '2023-06-12'
tags: ['JAVA']
draft: false
summary: 'GC의 정의와 Java GC 알고리즘에 대해 알아봅시다.'
---

## 가비지 컬렉션의 정의

- Garbage Collection은 자동 메모리 관리의 한 형태이며 결과적으로 성능에 영향을 미침

  - Garbage는 더 이상 사용(참조)되지 않는 메모리

- 프로그래머가 메모리 할당/해제 등 수동 관리의 부담을 덜어줌

  - 비슷한 기술로는 스택 할당, 영역 추론, 메모리 소유권 등이 있음

- 일반적으로 네트워크 소켓, DB핸들, 윈도우, 파일 디스크립터 등과 같은 리소스는 GC처리되지 않음 보통 이와 같은 것들은 다른 방법들로(destructures)로

## 가비지 컬렉터가 처리하는 Heap 영역

## Generation GC Process

## GC의 장단점

## GC Roots

## GC Reference Counting

## Heap 영역을 제외한 GC 처리 영역

## GC 종류
