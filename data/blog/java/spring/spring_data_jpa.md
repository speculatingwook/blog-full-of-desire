---
title: 'Spring Data Jpa'
date: '2023-05-15'
tags: ['spring', 'jpa', 'database']
draft: true
summary: 스프링과 데이터베이스를 이어주는 중요한 라이브러리
---

## 공통 인터페이스 기능

스프링 데이터 JPA는 간단한 CRUD 기능을 공통으로 처리하는 JpaRepository 기능을 제공한다. 스프링 데이터 JPA를 사용하는 가장 단순한 방법은 이 인터페이스를 상속받는 방법이 있다.

```java
public interface MemberRepository extends JpaRepository<Member, Long> {

}
```

위 코드의 상속받은 `JpaRepository<Member, Long>` 부분을 보면 제네릭에 회원 엔티티와 회원 엔티티의 식별자 타입을 지정했다.

이런 방식으로 지정을 하게 되면 회원 레포지토리는 JpaRepository 인터페이스가 제공하는 다양한 기능을 사용할 수 있다.

<p align="center">
    <img width="443" alt="image" src="https://github.com/EarthDefenseCorps/earth-defense-corps-backend/assets/105579811/28a4d1fe-0124-40c2-a28b-5460b03f0abe"/>
</p>

JpaRepository 인터페이스의 계층구조이다.

윗부분에 스프링 데이터 모듈이 있고 그 안에 `Repository`, `CrudRepository`, `PagingAndSortRepository`가 있는데 이것은 스프링 데이터 프로젝트가 공통으로 사용하는 인터페이스다. 스프링 데이터 JPA가 제공하는 `JpaRepository` 인터페이스ㄴ는 여기에 추가로 JPA에 특화된 기능을 제공한다.

## `JpaRepository` 인터페이스를 상속받으면 사용할 수 있는 주요 메소드

- `T`: 엔티티
- `ID`: 식별자 타입
- `S`: 엔티티와 그 자식타입

- `save(S)`: 새로운 엔티티를 저장하고 이미 있는 엔티티는 수정한다.
- `delete(T)`: 엔티티 하나를 삭제한다. 내부에서 `EntityManager.remove()`를 호출한다.
- `findOne(ID)`: 엔티티 하나를 조회한다. 내부에서 `EntityManager.getReference()`를 호출한다.
- `getOne(ID)`: 엔티티를 프록시로 조회한다. 내부에서 `EntityManager.getReference()`를 호출한다.
- `findAll(...)`: 모든 엔티티를 조회한다. 정렬(sort)이나 페이징(paging) 조건을 파라미터로 제공할 수 있다.

`save(S)` 메소드는 엔티티에 식별자 값이 없으면(null 이면) 새로운 엔티티로 판단해서 `EntityManager.persist()`를 호출하고 식별자 값이 있으면 이미 있는 엔티티로 판단해서 `EntityManager.merge()`를 호출한다. 필요하다면 스프링 데이터 JPA의 기능을 확장해서 신규 엔티티 판단 전략을 변경할 수 있다.

## 쿼리 메소드 기능

쿼리 메소드 기능은 메소드 이름만으로 쿼리를 생성하는 기능이 있는데 인터페이스에 메소드만 선언하면 해당 메소드의 이름으로 적절한 JPQL 쿼리를 생성해서 실행한다.
대표적으로 크게 3가지가 있다.

- 메소드 이름으로 쿼리 생성
- 메소드 이름으로 JPA NamedQuery 호출
- @Query 어노테이션을 사용해서 리포지토리 인터페이스에 쿼리 직접 정의

### 메소드 이름으로 쿼리 생성

```java
public interface MemberRepository extends Repository<Member, Long> {
    List<member> findbyEmailAndName(String email, String name);
}
```

위 `findByEmailAndName(...)`을 실행하면 스프링 데이터 JPA는 메소드 이름을 분석해서 JPQL을 생성하고 실행한다. 실행된 JPQL은 다음과 같다.

```jpaql
select m from Member m where m.email = ?! and m.name = ?2
```

**_정해진 규칙에 따라서 메소드 이름을 지어야 하며_** 아래 표는 스프링 데이터 JPA 공식 문서가 제공하는 표이다.

| 키워드                      | 예                                                       | JQPL 예                                                          |
| --------------------------- | -------------------------------------------------------- | ---------------------------------------------------------------- |
| And                         | findByLastnameAndFirstname                               | ... where x.lastname = ?1 and x.firstname = ?2                   |
| Or                          | findByLastnameOrFirstname                                | ... where x.lastname 三 ?1 or x.firstname = ?2                   |
| Is, Equals                  | findByFirstname.findByFirstnameIs, findByFirstnameEquals | ... where x.firstname 三 1?                                      |
| Between                     | fi ndByStartDateBetween                                  | ... where x.startDate between 1? and ?2                          |
| LessThan                    | findByAgeLessThan                                        | ... where x.age〈 ?1                                             |
| LessThanEqual / GreaterThan | indByAgeLessThanEqual / findByAgeGreaterThan             | ... where x.age〈= ?1 / ... where x.age〉?1                      |
| GreaterThanEqual            | findByAgeGreaterThanEqual                                | ... where x.age >= ?1                                            |
| After                       | findByStartDateAfter                                     | ... where x.startDate〉?1                                        |
| Before                      | findByStartDateBefore                                    | ... where x.startDate〈 ?1                                       |
| IsNull                      | findByAgeIsNull                                          | ... where x.age is null                                          |
| IsNotNull,NotNull           | findByAge(ls)NotNull                                     | ... where x.age not null                                         |
| Like                        | findByFirstnameLike                                      | ... where x.firstname like ?1                                    |
| NotLike                     | findByFirstnameNotLike                                   | ...where x.firstname not like ?1                                 |
| StartingWith                | findByFirstnameStartingWith                              | ... where x.firstname like ?1 (parameter bound with appended %)  |
| EndingWith                  | findByFirstnameEndingWith                                | ... where x.firstname like ?1 (parameter bound with prepended %) |
| Containing                  | findByFirstnameContaining                                | ... where x.firstname like ?1 (parameter bound wrapped in %)     |
| OrderBy                     | findByAgeOrderByLastnameDesc                             | ... where x.age = ?1 order by x.lastname desc                    |
| Not                         | findByLastnameNot                                        | ••• where x.lastname〈〉?1                                       |
| In                          | findByAgeIn(Collection ages)                             | ... where x.age in ?1                                            |
| NotIn                       | findByAgeNotIn(Collection age)                           | ... where x.age not in ?1                                        |
| TRUE                        | findByActiveTrue()                                       | ... where x.active = true                                        |
| FALSE                       | findByActiveFalse()                                      | ...where x.active = false                                        |
| IgnoreCase                  | findByFirstnameIgnoreCase                                | ...where UPPER(x.firstname) = UPPER(?1)                          |

### JPA NamedQuery
