---
title: '[ JAVA ] Functional Interface(함수형 인터페이스)'
date: '2023-08-31'
tags: ['JAVA']
draft: false
summary: Java8 부터 지원하는 함수형 프로그래밍을 위한 인터페이스
---

## Functional Interface란?

함수형 인터페이스(Functional Interface)는 단 하나의 추상 메서드만을 가지고 있는 인터페이스를 말한다. 단 하나의 추상메서드를 가지고 있기 때문에 람다 표현식 또는 메서드 레퍼런스를 사용할 수 있다.

### 메서드 레퍼런스

메서드 레퍼런스(Method Reference)는 자바 8에서 도입된 기능으로, 메서드를 직접 참조하여 람다 표현식을 더욱 간결하게 표현할 수 있는 방법이다.메서드 레퍼런스는 특정한 메서드를 호출하는 람다 표현식의 축약된 표기법이라고 할 수 있다.
다음은 사용법이다.

#### `정적 메소드 참조(static method reference)`

- `클래명::정적메서드명` 형식으로 표현한다.
  예시

```java
Function<String, Integer> parser = Integer::parseInt;
```

#### `인스턴스 메서드 참조(Instance Method Reference)`

- `객체명::인스턴스메서드명` 형식으로 표현한다.
  예시

```java
List<String> names = Arrays.asList("Alice", "Bob", "Charlie");
names.forEach(System.out::println); // 인스턴스 메서드 참조
```

#### `한정적(바운드) 인스턴스 메서드 참조(Bound Instance Method Reference)`

- `객체명::인스턴스메서드명` 형식으로 표현되지만, 객체가 메서드를 호출하는 것이 아니라 메서드 참조를 수신하는 객체에 의해 호출된다.
  예시

```java
List<String> names = Arrays.asList("Alice", "Bob", "Charlie");
names.sort(String::compareToIgnoreCase); // 한정적 메서드 참조
```

#### `생성자 참조(Constructor Reference)`

- `클래스명::new` 형식으로 표현한다.

예시

```java
Supplier<List<String>> listSupplier = ArrayList::new; // 생성자 참조
```

## Functional Interface(함수형 인터페이스) 특징

- 단 하나의 추상 메서드: 함수형 인터페이스는 하나의 추상 메서드만을 가져야 한다. 이 메서드는 구현 없이 선언만 포함되어야 한다.

- 람다 표현식 활용: 함수형 인터페이스를 람다 표현식으로 구현할 수 있다. 이를 통해 익명 함수를 간단하게 작성할 수 있다.

- 메서드 레퍼런스 활용: 함수형 인터페이스에 대한 메서드 레퍼런스를 사용하여 이미 존재하는 메서드를 참조하고 호출할 수 있다.

- `@FunctionalInterface` 어노테이션: 해당 인터페이스가 함수형 인터페이스임을 나타내기 위해 @FunctionalInterface 어노테이션을 사용할 수 있다. 이 어노테이션이 붙은 인터페이스는 추상 메서드가 하나만 있어야 하며, 그렇지 않을 경우 컴파일 에러가 발생한다.

## Consumer Interface

Comsumer Interface는 자바의 함수형 인터페이스중 하나로, 입력값을 받아 어떠한 동작을 수행하고 결과를 반환하지 않는 함수를 표현하는 인터페이스이다.

즉, 주어진 입력값을 소비(Consume)하여 어떤 동작을 수행한다.

Consumer Interface는 함수형 프로그래밍의 장점도 있지만 자원 관리나 비동기 작업 처리와 같이 다양한 컨텍스트에서 사용될 수 있다. 자원을 열고 닫는 로직을 Consumer로 캡슐화하면 자원 누수를 방지하고 코드를 좀 더 안정적으로 만들 수 있다. 비동기 작업을 처리할 때 비동기 결과를 다루거나 오류를 처리할 때 Consumer를 사용하면 비동기 코드를 좀 더 직관적으로 처리할 수 있다.

추상 메서드의 시그니처

```java
void accept(T t);
```

Consumer 인터페이스를 사용하면 입력값을 받아서 다양한 동작을 수행할 수 있다.예를 들어, 어떤 값들을 출력하거나 변행할 때 사용할 수 있다.

코드 예시

```java
Consumer<String> printConsumer = value -> System.out.println(value);
printConsumer.accept("Hello, world!"); // 출력: Hello, world!
```

### 구현 소스 코드

```java
/*
 * Copyright (c) 2010, 2013, Oracle and/or its affiliates. All rights reserved.
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * This code is free software; you can redistribute it and/or modify it
 * under the terms of the GNU General Public License version 2 only, as
 * published by the Free Software Foundation.  Oracle designates this
 * particular file as subject to the "Classpath" exception as provided
 * by Oracle in the LICENSE file that accompanied this code.
 *
 * This code is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 * FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License
 * version 2 for more details (a copy is included in the LICENSE file that
 * accompanied this code).
 *
 * You should have received a copy of the GNU General Public License version
 * 2 along with this work; if not, write to the Free Software Foundation,
 * Inc., 51 Franklin St, Fifth Floor, Boston, MA 02110-1301 USA.
 *
 * Please contact Oracle, 500 Oracle Parkway, Redwood Shores, CA 94065 USA
 * or visit www.oracle.com if you need additional information or have any
 * questions.
 */
package java.util.function;

import java.util.Objects;

/**
 * Represents an operation that accepts a single input argument and returns no
 * result. Unlike most other functional interfaces, {@code Consumer} is expected
 * to operate via side-effects.
 *
 * <p>This is a <a href="package-summary.html">functional interface</a>
 * whose functional method is {@link #accept(Object)}.
 *
 * @param <T> the type of the input to the operation
 *
 * @since 1.8
 */
@FunctionalInterface
public interface Consumer<T> {

    /**
     * Performs this operation on the given argument.
     *
     * @param t the input argument
     */
    void accept(T t);

    /**
     * Returns a composed {@code Consumer} that performs, in sequence, this
     * operation followed by the {@code after} operation. If performing either
     * operation throws an exception, it is relayed to the caller of the
     * composed operation.  If performing this operation throws an exception,
     * the {@code after} operation will not be performed.
     *
     * @param after the operation to perform after this operation
     * @return a composed {@code Consumer} that performs in sequence this
     * operation followed by the {@code after} operation
     * @throws NullPointerException if {@code after} is null
     */
    default Consumer<T> andThen(Consumer<? super T> after) {
        Objects.requireNonNull(after);
        return (T t) -> { accept(t); after.accept(t); };
    }
}
```

## Runnable Interface

Runnable 인터페이스는 보통 스레드를 생성하고 실행하는 데 사용되는 인터페이스중 하나이다. Runnable 인터페이스는 스레드를 생성하는 데 사용되는 클래스나 람다 표현식과 함께 사용된다.

### 구현 소스 코드

```java
public interface Runnable {
    public abstract void run();
}
```

Runnable 인터페이스의 `run()` 메서드는 스레드가 실행될 때 호출되는 메서드이다. 따라서 `run()` 메서드 내부에 스레드가 수행해야 할 작업을 구현한다. 스레드를 시작하려면 Runnable 객체를 스레드로 감싸고, 이를 Thread 클래스의 인스턴스로 만들어야 한다.

- 예시 코드

```java
public class MyRunnable implements Runnable {
    @Override
    public void run() {
        // 스레드가 수행할 작업을 여기에 구현합니다.
        System.out.println("스레드가 실행 중입니다.");
    }
}

public class Main {
    public static void main(String[] args) {
        // Runnable 객체 생성
        Runnable myRunnable = new MyRunnable();

        // Runnable 객체를 이용하여 스레드 생성
        Thread thread = new Thread(myRunnable);

        // 스레드 시작
        thread.start();
    }
}
```
