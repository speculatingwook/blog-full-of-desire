---
title: '[Java] StringBuffer 클래스와 StringBuilder 클래스'
date: '2023-10-26'
tags: ['JAVA']
draft: true
summary: 자바의 정석과 구글링으로 정리하는 java.lang 패키지
---

## StringBuffer 클래스

`String` 클래스는 인스턴스를 생성할 때 지정된 문자열을 변경할 수 없지만 `StringBuffer` 클래스는 변경이 가능하다. 내부적으로 문자열 편집을 위한 버퍼(buffer)를 가지고 있다. 그리고 `StringBuffer` 인스턴스를 생성할 때 그 크기를 지정할 수 있다.

> 이 때, 편집할 문자열의 길이를 고려하여 버퍼의 길이를 충분히 잡아주는 것이 좋다. 편집중인 문자열이 버퍼의 길이를 넘어서게 되면 버퍼의 길이를 늘려주는 작업이 추가로 수행되어야하기 때문에 작업효율이 떨어진다.

`StringBuffer` 클래스를 쉽게 이해하려면 `String` 클래스를 빼먹을 수 없다. `StringBuffer` 클레스는 `String`와 같이 문자열을 저장하기 위한 char형 배열의 참조변수를 인스턴스변수로 선언해놓고 있다.

`StringBuffer` 인스턴스가 생성될 때, char형 배열이 생성되며 이 때 생성된 char형 배열을 인스턴스변수 value가 참조하게 된다.

```java
public final class StringBuffer implements java.io.Serializable{
    private char[] value;
        ...
}
```

### StringBuffer의 생성자

`StringBuffer` 클래스의 인스턴스를 생성할 때, 적절한 길이의 char형 배열이 생성되고, 이 배열은 문자열을 저장하고 편집하기 위한 공간(buffer)으로 사용된다.

`StringBuffer` 인스턴스를 생성할 때는 생성자 `StringBuffer(int length)`를 사용해서 `StringBuffer` 인스턴스에 저장될 문자열의 길이를 고려하여 충분히 여유있는 크기로 지정하는 것이 좋다.

`StringBuffer` 인스턴스를 생성할 때, 버퍼의 크기를 지정해주지 않으면 16개의 문자를 저장할 수 있는 크기의 버퍼를 생성한다.

```java
public StringBuffer(int length){
    value = new char[length];
    shared = false;
}

public StringBuffer(){
    this(16); // 버퍼의 크기를 지정해주지 않으면 버퍼의 크기는 16이 된다.
}

public StringBuffer(String str){
    this(str.length() + 16); // 지정한 문자열의 길이보다 16이 더 크게 버퍼를 생성한다.
    append(str);
}
```

`StringBuffer` 인스턴스로 문자열을 다루는 작업을 할 때, 버퍼의 크기가 작업하려는 문자열의 길이보다 작을 때는 내부적으로 버퍼의 크기를 증가시키는 작업이 수행된다.

배열의 길이는 변경될 수 없으므로 새로운 길이의 배열을 생성한 후에 이전 배열의 값을 복사해야 한다.

```java
// 새로운 길이 (newCapacity)의 배열을 생성한다.newCapacity는 정수값이다.
char newValue[] = new char[newCapacity];

// 배열 value의 내용을 배열 newValue로 복사한다.
System.arraycopy(value, 0, newValue, 0, count); // count는 문자열의 길이
value = newValue; // 새로 생성된 배열의 주소를 참조변수 value에 저장
```

### StringBuffer의 변경

String과 달리 StringBuffer는 내용을 변경할 수 있다.

<p align="center">
    <img width="389" alt="image" src="https://github.com/speculatingwook/blog-full-of-desire/assets/105579811/ab5a1505-063a-4c30-a8ac-000308bb8ea2"/>
</p>
이런 StringBuffer를 생성했다고 가정하자. 그리고 sb에 문자열 "123"을 추가하면

<p align="center">
    <img width="390" alt="image" src="https://github.com/speculatingwook/blog-full-of-desire/assets/105579811/7ad0d623-7e00-4cea-aeb5-0d816ad4e5c4"/>
</p>

`append()`는 반환타입이 StringBuffer인데 자신의 주소를 반환한다. 그래서 라해와 같은 문장이 수행되면, `sb`에 새로운 문자열이 추가되고 `sb` 자신의 주소를 반환하여 `sb2`에는 `sb`의 주소인 0x100이 저장된다.

<p align="center">
    <img width="463" alt="image" src="https://github.com/speculatingwook/blog-full-of-desire/assets/105579811/dddb7f2c-84fa-4253-b94f-b945210be72a"/>
</p>

`sb`와 `sb2`가 모두 같은 StringBuilder 인스턴스를 가리키고 있으므로 같은 내용이 출력된다. 그래서 하나의 StringBuffer 인스턴스에 대해 연속적으로 append()를 호출하는 것이 가능하다.

```java
StringBuffer sb = new StringBuffer("abc");

sb.append("123");
sb.append("zz");
// 아래처럼 가능하다.
sb.append("123").append("zz");
```

### StringBuffer의 비교

String 클래스에서는 equals 메서드를 오버라이딩해서 문자열의 내용을 비교하도록 구현되어 있지만, StringBuffer클래스는 equals 메서드를 오버라이딩하지 않아서 StringBuffer클래스의 equals 메서드를 사용해도 등가비교연산자(==)로 비교한 것과 같은 결과를 얻는다.

```java
StringBuffer sb = new StringBuffer("abc");
StringBuffer sb2 = new StringBuffer("abc");

System.out.println(sb == sb2);      // false
System.out.println(sb.equals(sb2)); // false
```

하지만 `toString()`은 오버라이딩되어 있어서 StringBuffer 인스턴스에 `toString()`을 호출하면, 담고 있는 문자열을 String으로 반환한다.

그래서 String 인스턴스를 얻은 다음 비교해야 한다.

```java
String s = sb.toString();
String s2 = sb2.toString();

System.out.println(s.equals(s2)); // true
```

### StringBuffer클래스의 생성자와 메서드

이건 그냥 필요할때 찾아보자 여기서 봐봤자 기억 못한다.

## StringBuilder?

`StringBuffer`는 멀티쓰레드에 안전(thread safe)하도록 동기화되어 있다. 그래서 동기화가 `StringBuffer`의 성능을 떨어트린다.

멀티쓰레드로 작성된 프로그램이 아닌 경우, `StringBuffer`의 동기화는 불필요하게 성능만 떨어틀리게 된다.

그래서 `StringBuffer`에서 쓰레드의 동기화만 뺀 `StringBuilder`가 새로 추가되었다. `StringBuilder`는 `StringBuffer`와 완전히 똑같은 기능으로 작성되어 있다.

> `StringBuffer`도 충분히 성능이 좋기 때문에 반드시 필요한 경우를 제외하고는 기존에 작성한 코드에서 `StringBuffer`를 `StringBuilder`로 굳이 바꿀 필요 없다.
