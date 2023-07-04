---
title: m1 mac에서 pintos 돌리기
date: '2023-07-04'
tags: ['operating-system', 'side-project']
draft: false
summary: 하,,,,,,
---

## 들어가며

mac 환경에서 pintos 프로젝트가 빌드가 되지 않았습니다. 그래서 이 문제를 해결하는데 3일은 쓴 것 같은 느낌이 듭니다. 결론부터 말하면 mac에서 pintos를 돌리기 위해서는 amd64 환경에서 돌려야 합니다. 이 글에서는 이 문제를 해결하는 과정을 기록하고자 합니다.

## Docker를 사용하자

개인적으로 가상머신을 돌리고 싶지는 않았습니다. 그래서 여러 방법을 시도하고(aws 서버에서 돌리기, 회사 서버에서 돌리기) 결국 docker를 사용하기로 했습니다. docker를 사용하면 컴퓨터에 직접적으로 영향을 주지 않고, 컨테이너를 사용하기 때문에 가상머신보다는 가볍습니다.

## DockerHub에서 이미지 받기

제가 개인적으로 커스텀하여 만든 도커 이미지입니다. [여기](https://hub.docker.com/r/speculatingwook/pintosm1)에서 확인하실 수 있습니다.
혹은

```shell
  docker pull speculatingwook/pintosm1
```

## Doker Container 생성하기

    ```shell
    docker run -it --name [원하는 컨테이너 이름] -p [포트]:[포트] ~/[개인 로컬 컴퓨터에서 저장하고 싶은 위치]/[저장하고싶은 디렉토리 이름]:/home/linuxbrew/[저장하고싶은 디렉토리 이름] speculatingwook/pintosm1 /bin/bash
    ```

이거 하나 치면 만들어집니다.

## pintos 빌드하기

pintos를 깃으로 받고, 내부 루트 디렉토리에서 다음 명령어를 실행합니다.

```shell
source ./activate
```

그리고 `threads` 디렉토리에 들어가서

```shell
make
```

명령어를 실행하면 빌드가 됩니다.

## 어떻게 사용하면 되나?

이제 로컬 컴퓨터 환경에서 개인 idle를 사용해서 코드를 수정하면 됩니다. 그리고 컨테이너에서 빌드와 실행하면 됩니다.

## 진짜,, 세팅하는데 3일 걸렸습니다.

빨리 플젝하러 가겠습니다.
