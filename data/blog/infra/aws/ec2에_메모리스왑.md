---
title: 'ec2 t2.micro에 스왑 공간 만들기, swappiness'
date: '2023-05-10'
tags: ['AWS', 'EC2', 'INFRA']
draft: false
summary: 'ec2 t2.micro에 스왑 공간을 만들어서 우리 지갑을 지켜보자'
---

## 개요

asw ec2 t2.micro를 사용하여 자바 프로젝트를 빌드하려고 하였다. 그런데 오류가 터져서 갑자기 서버가 멈춰서 찾아보니 메모리 부족때문에 생기는 오류라고 한다..
(AWS EC2 프리티어에서 인스턴스 유형 t2.micro 는 RAM이 1GB(GiB) 이다. 용량이 너무 적어....)

그래서 우분투 리눅스 환경에서 메모리 스왑을 활용하여 메모리 부족 문제를 해결해보려고 한다.

## 스왑 공간(swap space)

스왑(Swap) 공간은 컴퓨터 시스템에서 메모리 관리를 위해 사용되는 개념이다. 메모리는 컴퓨터에서 프로그램이 실행되고 데이터가 저장되는 공간으로, 물리적인 RAM(Random Access Memory)과 가상 메모리(Virtual Memory)로 나뉜다.

스왑 공간은 가상 메모리의 일부로, 운영체제가 물리적인 RAM이 부족한 경우에 따라 사용된다. 일반적으로 RAM이 가득 차면 운영체제는 사용하지 않는 메모리 페이지를 하드 디스크의 스왑 공간에 옮기고, 필요한 메모리 페이지를 RAM으로 로드하는 방식으로 동작한다. 이를 통해 시스템이 물리적인 메모리보다 더 큰 가상 메모리 공간을 사용할 수 있게 된다.

스왑 공간은 일반적으로 하드 디스크의 일부 영역을 할당하여 사용한다. 스왑 공간은 일반적으로 느리기 때문에, RAM에 비해 접근 속도가 느리다는 단점이 있다. 따라서 스왑이 발생하는 경우 시스템의 성능이 저하될 수 있다.

스왑 공간의 크기는 운영체제의 설정에 따라 다를 수 있으며, 일반적으로 운영체제가 자동으로 크기를 관리한다. 그러나 경우에 따라 수동으로 스왑 공간의 크기를 조정할 수도 있다.

## AWS EC2 인스턴스에서 스왑(swap)공간을 할당시 주의점

aws가 제공하는 권장 스왑 공간은 다음과 같다.

<p align="center">
    <img width="1100" alt="image" src="https://github.com/EarthDefenseCorps/earth-defense-corps-backend/assets/105579811/28aa0c97-4918-4acd-9d1e-ddd2ce2d2736"/>
</p>

즉, 기본적으로 swap 공간은 최소 32MB는 되야 하며, t2.micro의 경우 RAM이 1GB이기 때문에 2배인 2GB까지 swap 공간을 할당하는 것을 권장한다.

## 스왑 공간 할당 방법

### 스왑공간을 생성하기전 상태 확인

```shell
free -h
```

<p align="center">
    <img width="803" alt="image" src="https://github.com/EarthDefenseCorps/earth-defense-corps-backend/assets/105579811/ed0ac5bc-dcea-4dd9-bc0b-3588b2daca0c"/>
</p>
보면 현재 스왑 공간의 크기가 0이다.

### 1.dd 명령을 사용하여 루트경로에 스왑 파일 생성

```shell
sudo dd if=/dev/zero of=/swapfile bs=128M count=16
```

bs : 블록의 크기 , count : 블록 수

스왑 파일의 크기 = 블록의 크기 \* 블록의 수

즉, 128M \* 16 = 2GB이라서 위와 같이 입력한다. 스왑 파일의 크기가 2GB가 되는 것이다.
swapfile 이름을 가진 이 파일은 최상위 경로에 생성된다.

- 우분투에 처음 접속했을 때, 다음 명령어를 입력하면 최상위 경로로 갈 수 있다.

```shell
cd ..
cd ..
```

### 2. 스왑 파일의 읽기 및 쓰기 권한 업데이트

```shell
sudo chmod 600 /swapfile
```

### 3. 스왑 영역을 위에서 만든 파일로 설정

```shell
sudo mkswap /swapfile
```

### 4. 스왑 공간에 스왑 파일을 추가하여 스왑 파일을 즉시 사용

```shell
sudo swapon /swapfile
```

### 5. 프로시저가 성공적인지 확인

```shell
sudo swapon -s
```

- / 경로의 swapfile 파일에 2GB가 할당된 것을 확인할 수 있다.
-

### 6. /etc/fstab 파일을 편집하여 부팅 시 스왑 파일이 시작되게 하기

```shell
sudo vi /etc/fstab
```

맨 아래줄에 아래 줄 삽입하고 저장하기

```shell
/swapfile swap swap defaults 0 0
```

### 8. 스왑공간이 할당된 것 확인하기

```shell
free -h
```

## swappiness?

`swappiness`는 리눅스 운영 체제에서 가상 메모리 동작을 조정하는 파라미터이다. `swappiness` 값을 조정하여 가상 메모리를 더 적극적으로 사용하도록 설정할 수 있다. 가상 메모리 크기 자체는 `swappiness`로 직접 조정되지 않지만, `swappiness` 값을 높이면 운영 체제가 더 많은 데이터를 가상 메모리로 스왑하려고 시도할 가능성이 높아진다.

`swappiness` 값을 높여서 가상 메모리 할당을 증가시키는 방법은 다음과 같다:

1. 관리자 권한으로 EC2 인스턴스에 로그인한다.
2. 터미널 또는 SSH 세션을 열고 다음 명령을 실행하여 현재 `swappiness` 값을 확인한다:
   ```
   cat /proc/sys/vm/swappiness
   ```
3. `swappiness` 값을 적절한 새 값으로 변경한다. 예를 들어, `swappiness` 값을 80으로 변경하려면 다음 명령을 실행한다:
   ```
   sudo sysctl vm.swappiness=80
   ```
4. 변경 사항을 영구적으로 유지하려면, `/etc/sysctl.conf` 파일을 편집하여 `swappiness` 값을 설정한다.
   ```
   sudo nano /etc/sysctl.conf
   ```
   파일의 끝에 다음 줄을 추가하고 저장한다:
   ```
   vm.swappiness = 80
   ```
   이렇게 하면 `swappiness` 값이 시스템이 부팅될 때마다 설정된 값으로 유지된다.
5. 변경 사항을 적용하기 위해 다음 명령을 실행한다:
   ```
   sudo sysctl -p
   ```
   이 명령은 `/etc/sysctl.conf` 파일의 변경 사항을 적용한다.

`swappiness` 값을 높여서 운영 체제가 더 많은 데이터를 가상 메모리로 스왑하도록 설정하면, 가상 메모리의 활용이 증가할 수 있다. 그러나 이 방법은 가상 메모리 자체의 크기를 증가시키는 것은 아니며, 실제 메모리 부족 상황에서 가상 메모리를 활용하는 정책을 조정하는 것이다. 따라서 가상 메모리 용량 자체를 늘리려면 인스턴스 유형을 변경하거나 새로운 인스턴스를 생성해야 한다.(근데 돈 쓰고 싶지는 않기 때문에 그냥 앵간하면 가상 메모리 공간을 확보하도록 해보자ㅎㅎ)

참고 자료

[젠킨스, AWS EC2 프리티어(t2.micro) 에서 빌드하면 메모리 부족으로 서버가 터져버리는 현상 해결](https://ldgeao99-developer.tistory.com/600)

[프리티어(t2.micro)에서 Jenkins 용량 초과 문제](https://gksdudrb922.tistory.com/196)
