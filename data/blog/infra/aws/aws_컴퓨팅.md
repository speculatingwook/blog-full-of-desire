---
title: 'AWS 컴퓨팅'
date: '2023-04-26'
tags: ['AWS', 'INFRA']
draft: false
summary: 'AWS에서 직접 듣고 와서 정리하는 AWS 기초 개념'
---

## 가용영역(AZ)

<p align="center">
    <img width="756" alt="image" src="https://user-images.githubusercontent.com/105579811/234524738-f9a977cf-b8c3-462c-8303-4100c91ab30f.png"/>
</p>

가용 영역(AZ)은 독립된 데이터 센터로 구성되어 있으며, 같은 지역 내에서 서로 물리적으로 분리되어 있다. 이러한 가용 영역들은 하나의 리전 내에서 다양한 서비스들을 제공하고 있다.

가용 영역(AZ)은 지역 내에서 장애가 발생했을 경우에도 다른 가용 영역에서 서비스를 계속할 수 있도록 고안되었다. 즉, 다른 가용 영역으로 바로 전환하여 서비스 중단 없이 지속적인 서비스를 제공할 수 있다.

가용영역(AZ)은 중복전력, 네트워킹 및 연결기능을 갖춘 하나 이상의 데이터센터로 구성된다. 고객은 AZ를 통해 가용성과 내결함성, 확장성이 우수한 애플리케이션과 데이터베이스를 운영할수 있다.

## 엣지 로케이션

<p align="center">
    <img width="583" alt="image" src="https://user-images.githubusercontent.com/105579811/234526517-ee905e16-7d69-4aaa-bafe-46d7625b6908.png"/>
</p>
AWS(Amazon Web Services) 엣지 로케이션은 AWS의 글로벌 인프라 중 가장 가까운 지역에 위치한 콘텐츠 전송 네트워크(CDN, Content Delivery Network)이다. 엣지 로케이션은 AWS의 전 세계적인 사용자들에게 더 빠르고 안정적인 웹 애플리케이션과 콘텐츠 전송을 제공한다.

엣지 로케이션은 AWS의 주요 서비스 중 하나인 Amazon CloudFront와 연계되어 있다. Amazon CloudFront는 CDN 서비스로, AWS의 글로벌 네트워크를 이용하여 콘텐츠를 전송하고, 엣지 로케이션에서 콘텐츠를 캐시하고 전송한다. 이를 통해 사용자는 가까운 엣지 로케이션으로부터 콘텐츠를 받아 빠른 속도로 콘텐츠를 로드할 수 있다.

또한, AWS의 다른 서비스들도 엣지 로케이션을 이용하여 더 빠르고 안정적인 서비스를 제공한다. 예를 들어, AWS Lambda@Edge 서비스를 이용하면 엣지 로케이션에서 AWS Lambda 함수를 실행하여 빠르게 응답할 수 있다.
