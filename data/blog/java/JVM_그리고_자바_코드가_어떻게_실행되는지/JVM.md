---
title: 'JVM(Java virtual machine)'
date: '2023-04-22'
tags: ['JAVA']
draft: false
summary: '자바를 사용한다면 무조건 알아야 할 자바 환경'
---

## JVM이란?

자바 가상 머신 JVM(Java Virtual Machine)은 자바 프로그램 실행환경을 만들어 주는 소프트웨어이다. 자바 코드를 컴파일하여 .class 바이트 코드로 만들면 이 코드가 자바 가상 머신 환경에서 실행된다. JVM은 자바 실행 환경 JRE(Java Runtime Environment)에 포함되어 있다. 현재 사용하는 컴퓨터의 운영체제에 맞는 자바 실행환경 (JRE)가 설치되어 있다면 자바 가상 머신이 설치되어 있다는 뜻이다.

## Java는 플랫폼에 영향을 받지 않는다.

JVM을 사용하면 하나의 바이트 코드(.class)로 모든 플랫폼에서 동작하도록 할 수 있다.

- **.class 파일** : [바이트 코드(bytecode)](/blog/java/JVM_그리고_자바_코드가_어떻게_실행되는지/bytecode)와 같은 개념이며, 사람이 쓰는 자바 코드에서 컴퓨터가 읽는 기계어의 중간 단계이다.

예를 들어, test.java 라는 소스 코드를 작성했다고 하자. 이 자바 소스코드를 컴파일하게 되면 test.class 파일이 생성된다. 그리고 이렇게 생성된 바이트 코드는 각자의 플랫폼에 설치되어 있는 자바 가상 머신(JVM)이 운영체제에 맞는 실행 파일로 바꿔준다. 즉 Java에서는 각각의 플랫폼에 맞게 컴파일을 따로 해줄 필요가 없다. 하나의 바이트코드로 JVM이 설치되어 있는 모든 플랫폼에서 동작이 가능하다.

## Java는 플랫폼에 종속적이진 않지만, JVM은 플랫폼에 종속적이다.

이렇게 java는 컴파일된 바이트 코드가 있다면 어떤 JVM에서든 동작시킬 수 있어서 플랫폼에 의존적이지 않다. 하지만 JVM은 플랫폼에 의존적이다. 어떤 운영체제이냐에 따라 JVM이 맞춰줘야 하기 때문이다. 그래서 자바 프로그램을 실행하기 위해서는 반드시 JVM이 설치되어 있어야 한다.

## 자바 프로그램의 실행 과정과 JVM

<p align="center">
    <img width="648" alt="image" src="https://user-images.githubusercontent.com/105579811/233772138-1154bd99-2d6e-45db-bf36-cc306942689a.png"/>
</p>

자바로 .java 코드를 작성하고 powershell이나 terminal에 있는 자바 컴파일러인 javac에 컴파일 명령을 내리면 .class 파일이 만들어진다. 이후 이 바이트 코드는 클래스 로더를 통해 JVM Runtime Data Area로 로딩되고 로딩된 .class 바이트 코드를 실행할 컴퓨터에 깔린 JVM에 가져다주면 그 컴퓨터가 이 프로그램을 실행할 때 이 JVM이 그때 그때 기계어로 해석한다.]

## 바이트 코드를 읽는 방식

JVM은 바이트 코드를 명령어 단위로 읽어서 해석하는데, Interpreter 방식과 [JIT 컴파일 방식](/blog/java/JVM_그리고_자바_코드가_어떻게_실행되는지/JIT_Compiler) 두가지 방식을 혼합하여 사용한다. 먼저 Interpreter 방식은 바이트 코드를 한 줄씩 해석, 실행하는 방식이다. 초기 방식으로, 속도가 느리다는 단점이 있다.

이렇게 느린 속도를 보완하기 위해 나온 것이 JIT(Just In time) 컴파일 방식이다. 바이트코드를 JIT 컴파일러를 이용해 프로그램을 실제 실행하는 시점(바이트코드를 실행하는 시점)에 각 OS에 맞는 Native Code로 변환하여 실행 속도를 개선하였다. 하지만, 바이트 코드를 Native Code로 변환하는 데에도 비용이 소모되므로, JVM은 모든 코드를 JIT 컴파일러 방식으로 실행하지 않고, 인터프리터 방식을 사용하다가 일정 기준이 넘어가면 JIT 방식으로 명령어를 실행한다.

## 자바 가상 머신의 동작 방식

<p align="center">
    <img width="556" alt="image" src="https://user-images.githubusercontent.com/105579811/233773076-f49aba7b-2f90-4f22-a51d-b2cdca225dd3.png"/>
</p>

1. 자바로 개발된 프로그램을 실행하면 JVM은 OS오부터 메모리를 할당한다.
2. 자바 컴파일러(javac)가 자바 소스 코드(.java)를 자바 바이트 코드(.class)로 컴파일한다.
3. Class Loader를 통해 JVM Runtime Data Area로 로딩한다.
4. Runtime Data Area에 로딩된 .class 들은 Execution Engine을 통해 해석한다.
5. 해석된 바이트 코드는 Runtime Data Area의 각 영역에 배치되어 수행하며 이 과정에서 Execution Engine에 의해 GC의 작동과 스레드 동기화가 이루어진다.

## JVM Architecture

<p align="center">
    <img width="1200" alt="image" src="https://github.com/speculatingwook/blog-full-of-desire/assets/105579811/c9668a5b-59fd-458a-936d-16729e82c101"/>
</p>

### [클래스 로더(Class Loaders)](/blog/java/JVM_그리고_자바_코드가_어떻게_실행되는지/클래스로더와_클래스로딩)

<p align="center">
    <img width="335" alt="image" src="https://user-images.githubusercontent.com/105579811/233773149-4fb5b3f6-38bc-4cc5-9b22-b505309900ec.png"/>
</p>

자바는 동적으로 클래스를 읽어오므로, 프로그램이 실행 중인 런타임에서야 모든 코드가 자바 가상 머신과 연결된다. 이렇게 동적으로 클래스를 로딩해주는 역할을 하는 것이 바로 클래스 로더(class loader)이다. 자바에서 소스를 작성하면 .java파일이 생성되고, .java 컴파일러가 컴파일하면 .class 파일이 생성되는데 클래스 로더는 .class 파일을 묶어서 JVM이 운영체제로부터 할당받은 메모리 영역인 Runtime Data Area로 적재한다.

- 클래스 로더는 런타임에 Java 클래스/인터페이스의 바이트코드를 동적으로 메모리에 로딩한다.

  - 한 번에 모든 클래스가 메모리에 로드되지 않고 필요할 때마다 로드된다.

- 로딩 작업은 크게 3가지로 분리된다.
  - Loading: JVM이 필요한 클래스 파일을 로드한다.
  - Linking: 로드된 클래스의 verify, prepare, resolve 작업을 수행한다.
  - Initializing: 클래스/정적 변수 등을 초기화한다.

### 실행 엔진(Execution Engine)

클래스 로더에 의해 JVM으로 로드 된 .class 파일(바이트 코드)들은 Runtime Data Areas의 Method Area에 배치되는데, 배치된 이후에 JVM은 Method Area의 바이트 코드를 실행 엔진(Execution Engine)에 제공하여, 정의된 내용대로 바이트 코드를 실행시킨다. 이때, 로드된 바이트코드를 실행하는 런타임 모듈이 실행 엔진(Execution Engine)이다. 실행 엔진은 바이트 코드를 명령어 단위로 읽어서 실행한다.

- JVM 메모리 영역에 있는 바이트 코드를 읽어 네이티브 코드로 변환하고 실행한다.
  - Interpreter
    - 메모리에 로드된 바이트코드를 한줄씩 해석/실행한다.
  - JIT(Just-In-Time) Compiler
    - 자주 호출되는 메서드(hot method)의 바이트코드를 네이티브 코드로 컴파일
    - JVM이 실행 메서드를 모니터, JIT 컴파일러의 프로파일러가 수집한 프로파일 정보를 기반으로 처리한다.
    - 중간 코드 생성 > 코드 최적화 > 네이티브 코드 생성
  - GC(Garbage Collector)
    - 메모리에서 사용하지 않는 개체를 식별해 삭제하는 프로세스(대표적으로 Heap 영역)
    - 데몬 스레드로 동작(명시적으로 호출해도 즉시 실행되지 않음)
- 필요한 경우 JNI를 통해 네이티브 메서드 라이브러리를 호출

### 가비지 컬렉터(Garbage Collector)

<p align="center">
    <img width="361" alt="image" src="https://user-images.githubusercontent.com/105579811/233773426-002ff458-34b8-414f-b81a-59146364a6af.png"/>
</p>

자바 가상 머신은 가비지 컬렉터(garbage collector)를 이용하여 더는 사용하지 않는 메모리를 자동으로 회수해 준다. 따라서 개발자가 따로 메모리를 관리하지 않아도 되므로, 더욱 손쉽게 프로그래밍을 할 수 있도록 도와준다. Heap 메모리 영역에서 생성된 객체들 중 참조되지 않은 객체들을 탐색 후 제거하는 역할을 하며 해당 역할을 하는 시간은 정확히 언제인지 알 수 없다. GC 역할을 수행하는 스레드를 제외한 나머지 모든 스레드들은 일시정지 상태가 된다.

## 런타임 데이터 영역(Runtime Data Areas)

<p align="center">
    <img width="818" alt="image" src="https://user-images.githubusercontent.com/105579811/233774112-acefbc0b-94f2-4c1f-95b2-9a73a82582dc.png"/>
</p>

런타임 데이터 영역은 JVM의 메모리 영역으로 자바 애플리케이션을 실행할 때 사용되는 데이터들을 적재하는 영역이다.

모든 스레드가 공유해서 사용(GC의 대상)

- 힙 영역(Heap Area)
- 메서드 영역(Method Area)

스레드(Thread)마다 하나씩 생성

- 스택 영역(Stack Area)
- PC 레지스터(PC Register)
- 네이티브 메서드 스택(Native Method Stack)

### 메서드 영역(Method Area)

클래스 멤버 변수의 이름, 데이터 타입, 접근 제어자 정보와 같은 각종 필드 정보들과 메서드 정보, 데이터 Type 정보, Constant Pool, static 변수, final class 등이 생성되는 영역이다.

### 힙 영역(Heap Area)

1. new 키워드로 생성된 객체와 배열이 생성되는 영역이다.
2. 주기적으로 GC가 제거하는 영역이다.

<p align="center">
    <img width="625" alt="image" src="https://user-images.githubusercontent.com/105579811/233774323-376f76b6-422d-41e7-9286-dba65855591e.png"/>
</p>

Heap Area는 효율적인 GC를 위해 위와 같이 크게 3가지의 영역으로 나뉘게 된다.

Young Generation 영역은 자바 객체가 생성되자마자 저장되고, 생긴 지 얼마 안되는 객체가 저장되는 공간이다. Heap 영역에 객체가 생성되면 최초로 Eden 영역에 할당된다. 그리고 이 영역에 데이터가 어느 정도 쌓이게 되면 참조 정도에 따라 Servior의 빈 공간으로 이동되거나 회수된다.

Young Generation(Eden + Servior) 영역이 차게 되면 또 참조 정도에 따라 Old 영역으로 이동되게 되거나 회수된다. 이렇게 Young Generation과 Tenured Generation 에서의 GC를 Minor GC라고 한다. Old 영역에 할당된 메모리가 허용치를 넘게 되면, Old 영역에 있는 모든 객체들을 검사하여 참조되지 않은 객체들을 한꺼번에 삭제하는 GC가 실행된다. 시간이 오래 걸리는 작업이고 이 때 GC를 실행하는 쓰레드를 제외한 모든 스레드는 작업을 멈추게 된다. 이를 'stop-the-world'라고 한다. 그리고 이렇게 'Stop-the-world'가 발생하고 Old 영역의 메모리를 회수하는 GC를 Major GC라고 한다.

### 스택 영역(Stack Area)

지역변수, 파라미터, 리턴 값, 연산에 사용되는 임시 값 등이 생성되는 영역이다.

### PC 레지스터(PC Register)

Thread가 생성될 때마다 생성되는 영역으로 프로그램 카운터, 즉 현재 스레드가 실행되는 부분의 주소와 명령을 저장하고 있는 영역이다.

### JNI(Java Native Interface)

- JVM과 네이티브 라이브러리 사용을 위한 인터페이스이자 동시에 해당 역할을 수행한다.(일종의 프레임워크)
- 네이티브 메서드(네이티브 언더 C/C++ 등으로 작성) 호출, 데이터 전달과 메모리 관리 등을 수행한다.
- JNI를 통해 JVM 내 Java 코드는 네이티브 언어/라이브러리와 상호 운용될 수 있음
  - JNI는 Java VM에 의존적이지 않아 다른 부분에 영향을 주지 않고 JNI에 대해서 추가 가능하다.

### 네이티브 메서드 스택(Native Method Stack)

자바 프로그램에서 네이티브 메소드(네이티브 코드로 구현된 메소드)를 호출할 때 사용되는 메모리 영역이다.
네이티브 메소드는 일반적으로 C, C++ 등의 언어로 작성된 코드로, 자바 가상 머신(Java Virtual Machine, JVM)에서 직접 실행되는 것이 아니라 운영 체제의 네이티브 라이브러리를 통해 실행된다.
네이티브 메소드 호출은 자바 프로그램에서 Java Native Interface(JNI)를 사용하여 이루어진다.
네이티브 메소드 스택은 네이티브 메소드 호출에 필요한 매개변수, 지역 변수 및 호출 상태 정보를 저장하는 데 사용된다.

1. 자바 이외의 언어(C, C++, 어셈블리 등)로 작성된 네이티브 코드를 실행할 때 사용되는 메모리 영역으로 일반적인 C 스택을 사용한다.
2. 보통 C/C++ 등의 코드를 수행하기 위한 스택을 말하며(JNI) 자바 컴파일러에 의해 변환된 자바 바이트 코드를 읽고 해석하는 역할을 하는 것이 자바 인터프리터(interpreter)이다.

**_출처_**

- [자바 가상머신 총정리](https://coding-factory.tistory.com/827)

- [JVM 내부 구조 & 메모리 영역 총정리](https://inpa.tistory.com/entry/JAVA-%E2%98%95-JVM-%EB%82%B4%EB%B6%80-%EA%B5%AC%EC%A1%B0-%EB%A9%94%EB%AA%A8%EB%A6%AC-%EC%98%81%EC%97%AD-%EC%8B%AC%ED%99%94%ED%8E%B8)

- [the jvm architecture explained](https://dzone.com/articles/jvm-architecture-explained)
