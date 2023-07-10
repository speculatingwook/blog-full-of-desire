---
title: '[ Pintos ] alarm-clock'
date: '2023-07-06'
tags: ['operating-system', 'side-project', 'pintos']
draft: false
summary: pintos project 1, threads-alarm-clock
---

## Alarm Clock

알람 시계(Alarm Clock)는 멀티스레드 프로그래밍에서 사용되는 개념입니다. 알람 시계는 특정 시간에 스레드를 깨우거나 일시 정지 상태에서 깨워주는 역할을 합니다.

일반적으로 알람 시계는 스레드의 슬립(sleep)이나 대기(wait) 상태에서 동작합니다. 스레드는 특정 작업을 수행하다가 일시적으로 대기 상태로 들어갈 수 있는데, 이때 알람 시계를 사용하여 특정 시간에 스레드를 깨울 수 있습니다.

알람 시계를 사용하기 위해서는 일정한 시간 간격으로 스레드를 깨우기 위한 시간 제한을 설정해야 합니다. 일반적으로 운영체제나 프로그래밍 언어에서 제공하는 시간 함수를 사용하여 시간을 측정하고, 이를 기반으로 알람 시계를 설정합니다.

스레드 간의 동기화를 위해 한 스레드가 특정 작업을 마치고 다른 스레드를 깨워야 할 때 알람 시계를 활용할 수 있습니다. 또한 정기적으로 반복되는 작업을 수행해야 할 때도 알람 시계를 사용하여 스레드를 깨울 수 있습니다.

### Reimplementing `timer_sleep()`, defined in `devices/timer.c`.

주어진 구현은 바쁜 대기(**busy waiting**)를 수행합니다. 즉, 현재 시간을 확인하고 `thread_yield()`를 호출하여 충분한 시간이 경과할 때까지 반복하는 방식입니다. 바쁜 대기를 피하기 위해 재구현해야 합니다.

```c
void timer_sleep (int64_t ticks);
```

호출한 스레드의 실행을 중단하고 시간이 최소한 x 타이머 틱만큼 진행될 때까지 대기합니다. 시스템이 다른 작업을 수행하지 않는 한, 스레드는 정확히 x 틱 후에 깨어나지 않아도 됩니다. 그저 올바른 시간만큼 대기한 후 준비 큐(ready queue)에 스레드를 넣어두세요.

`timer_sleep()` 함수는 실시간으로 작동하는 스레드에 유용합니다. 예를 들어, 1초마다 커서를 깜빡이는 작업에 사용될 수 있습니다. `timer_sleep()` 함수의 인수는 타이머 틱 단위로 표현되며, 밀리초나 다른 단위가 아닙니다. 1초에는 TIMER_FREQ 타이머 틱이 있으며, TIMER_FREQ는 `devices/timer.h`에 정의된 매크로입니다. 기본값은 100입니다. 많은 테스트가 실패할 수 있으므로 이 값을 변경하는 것을 권장하지 않습니다.

특정 시간(밀리초, 마이크로초, 나노초) 동안 대기하기 위한 별도의 함수인 `timer_msleep()`, `timer_usleep()`, `timer_nsleep()`도 있습니다. 이들은 필요할 때 자동으로 `timer_sleep()`를 호출합니다. 따라서 이들 함수를 수정할 필요는 없습니다. 알람 시계 구현은 이후 프로젝트에 필요하지 않지만, 프로젝트 4에서 유용할 수 있습니다.

## 음, 이해는 했는데, 이제 뭘 해야 하지?

일단, 구글링을 조금 해봤습니다. [좋은 블로그1](https://poalim.tistory.com/28), [좋은 블로그2](https://velog.io/@e_juhee/pintos-kaist-PROJECT1-Alarm-Clock-Sleep-Awake-%EB%B0%A9%EC%8B%9D%EC%9D%98-Alarm-Clock-%EA%B5%AC%ED%98%84%ED%95%98%EA%B8%B0) 가 있길래 조금씩 참고하면서 진행하려고 합니다.

## Busy Waiting

Busy waiting은 프로그램이나 스레드가 작업을 기다리는 동안 반복문을 실행하며 지속적으로 CPU를 사용하는 방식입니다. Busy waiting은 일반적으로 특정 조건이 충족될 때까지 계속해서 반복하여 확인하며, 조건이 충족되면 작업을 계속합니다.

Busy waiting은 기다리는 동안 CPU 시간을 지속적으로 소비하므로, 자원의 낭비와 성능 저하를 초래할 수 있습니다. 이는 다른 작업이 실행될 수 있는 기회를 제한하고, 전체 시스템의 처리량을 감소시킬 수 있습니다. 또한, Busy waiting은 무한 루프에 빠질 수 있으며, 이 경우 CPU 리소스를 지속적으로 소비하게 됩니다.

Busy waiting은 특정 작업이 완료되기를 기다리거나, 공유 자원에 대한 접근 가능 여부를 확인하는 등의 상황에서 사용될 수 있습니다. 예를 들어, 동기화 기법 중 하나인 스핀락(Spinlock)은 Busy waiting을 사용하여 공유 자원의 잠금 상태를 확인하고 대기하는 방식으로 동작합니다. 스핀락은 일시적인 대기 시간이 짧은 경우에 유용하며, 잠금이 해제될 때까지 지속적으로 반복하여 확인합니다.

하지만 Busy waiting은 대기 시간 동안 CPU를 계속해서 사용하므로, 대기 시간이 길거나 다른 작업에 우선순위를 주어야 하는 경우에는 비효율적일 수 있습니다. 이러한 경우에는 대기열(Queue)이나 블로킹 기법(Block) 등의 다른 동기화 기법을 사용하는 것이 더 적합할 수 있습니다. 대기열이나 블로킹 기법은 스레드를 일시 정지 상태로 만들고, 작업이 완료되거나 자원이 사용 가능해질 때까지 대기할 수 있도록 합니다.

따라서 Busy waiting은 상황에 따라 적절하게 사용되어야 합니다. 작업의 특성과 대기 시간의 길이, 시스템의 요구사항 등을 고려하여 적절한 동기화 기법을 선택하는 것이 중요합니다.

## Ready Queue

Ready Queue는 CPU 스케줄링에서 사용하는 개념으로, 프로세서의 실행을 기다리는 프로세스의 대기열을 나타냅니다. 컴퓨터 시스템에서 여러 프로세스가 동시에 실행되어야 할 때, CPU는 실행 가능한 프로세스중 하나를 선택하여 실행합니다. 이 선택은 일반적으로 스케줄러에 의해 관리되며, ready queue는 스케줄러가 프로세스를 선택하는 데 사용하는 중요한 자료 구조입니다.

Ready queue에는 실행가능한 모든 프로세스가 들어갑니다. 즉, 메모리에 로드되고 실행을 시작할 준비가 된 프로세스들이 ready queue에 대기하게 됩니다. 이 대기열은 일반적으로 FIFO 방식이지만, 다른 스케줄링 알고리즘에 따라 우선순위 또는 기타 요소에 따라 재정렬될 수도 있습니다.

스케줄러는 ready queue에서 어떤 프로세스를 선택하여 CPU에 할당할 지 결정합니다. 이 선택은 다양한 스케줄러 알고리즘에 의해 이루어질 수 있으며, 이 알고리즘은 프로세스의 우선순위, 실행 시간, 입출력 요구사항 등을 고려할 수 있습니다.

프로세스가 CPU를 할당받으면, 해당 프로세스는 실행 큐에서 ready queue에서 실행 상태로 전환됩니다. 실행이 완료되거나 중단되면, 해당 프로세스는 종료되거나 다른 상태로 전환될 수 있습니다.

## 기존의 코드

```c
void timer_sleep(int64_t ticks)
{
  int64_t start = timer_ticks();

  ASSERT (intr_get_level () == INTR_ON);
  while (timer_elapsed (start) < ticks)
    thread_yield ();
}
```

`timer_sleep()` 함수는 `ticks` 만큼의 시간이 지날 때까지 현재 스레드를 재운다. 현재 구현된 코드는 `ticks` 만큼의 시간이 지날 때까지 현재 스레드를 계속해서 `yield()` 시킨다. 하지만 CPU를 양보 받은 스레드도 아직 ticks에 도달하지 않은 경우, CPU를 양보받자마자 바로 다른 스레드에게 양보를 해야 한다.(즉, 불필요한 Contex switching이 많이 일어날 수 있다.)

따라서 아직 ticks에 도달하지 않은 스레드가 깨워지는 것이 큰 비효율을 발생시키고, 이것을 해결하는 것이 이번 과제의 목적이다.

> ## Tick?
>
> - tick은 일정 시간 간격으로 발생하는 시스템의 기본적인 시간 단위이다.
> - 시스템 타이머는 이러한 틱을 생성하며, 일반적으로 운영체제는 이러한 틱을 사용하여 시스템 상태를 유지하고 다양한 작업을 스케줄링한다.
>   - 예를 들어, 시스템 타이머가 100번의 틱을 초당 생성한다면, 운영체제는 1초를 100개의 틱으로 나누어 시스템 상태를 업데이트하고 작업을 스케줄링한다(10ms).이러한 방식으로 시스템이 일관된 방식으로 동작할 수 있도록 한다.
>
> ### 틱을 사용하는 이유
>
> > 1.  틱은 고정된 간격으로 발생, 운영체제가 특정 작업을 실행하기 위해 기다리는 시간을 정확히 계산할 수 있다.
> > 2.  시간 단위를 사용하는 경우, 시스템이 다른 작업을 수행하면서 시간이 흐를 때마다 시간을 업데이트해야 하기 때문에 부하가 커질 수 있다. 따라서, 틱 단위로 시간을 추적함으로써 시스템의 부하를 줄이고 일관성을 유지할 수 있다.
> >
> > - 틱을 업데이트하는 것도 일정한 부하를 발생시키지만, 이 부하는 대부분 무시할 수준이다. 틱은 하드웨어에서 매우 빠르게 처리될 수 있는 단위이기 때문이다.
> >
> >   3. 틱을 사용하여 CPU 사용률을 조절할 수 있다.
> >
> > - 틱의 간격을 더 작게 조정하면, 시스템은 더 자주 인터럽트를 처리하여 작업을 스케줄링할 수 있게 된다.
> > - 이는 우선순위가 높은 작업이 더 빠르게 실행될 수 있도록 하여 시스템의 반응성을 향상시키는 데 도움이 된다.

## Sleep-Awake 방식의 Alarm Clock 구현하기

### 변경 방안

`busy-waiting` 방식
스레드가 잠들면 모두 스케줄링 대기열인 ready_list에 추가하고 있어서, 아직 깰 시간이 되지 않은 스레드가 께워져서 대기하고 있게 된다.

`sleep-awake` 방식
잠든 스레드가 깰 시간(tick 도달 시간)까지는 ready_list에 추가하지 않고, 깰 시간(ticks)에 도달한 경우에만 ready_list에 추가하는 방식으로, 아직 ticks에 도달하지 않은 스레드가 깨지 않는다.

### 구현 방법

### sleep list 선언 & 초기화

`sleep_list`는 잠든 스레드들을 저장하는 리스트이다. `sleep_list`는 `list` 구조체를 사용하여 구현한다.

`sleep-awake` 방식을 구현하기 위해서는, 스레드가 잠들었을 때, 잠들어야 하는 시간을 저장해야 한다. 이를 위해 `thread` 구조체에 `int64_t ticks` 변수를 추가한다. 이 변수는 스레드가 잠들어야 하는 시간을 저장한다.

```c

/* thread.h */

static struct list sleep_list;

void thread_init(void)
{
    ...
    list_init(&sleep_list); // sleep_list 초기화
    ...
}

```

### thread 구조체에 필드 추가

````c
/* thread.h */
struct thread
{
    /* Owned by thread.c. */
    tid_t tid;                          /* Thread identifier. */
    enum thread_status status;          /* Thread state. */
    char name[16];                      /* Name (for debugging purposes). */
    int priority;                       /* Priority. */

    ** int64_t wakeup_ticks;                    /* ticks to wake up */
    ```
};
````

### thread_sleep 로직 변경

#### `timer_sleep`

- 기존 코드에 있는 thread_yield() 함수를 호출하면 잠든 스레드가 ready_list에 삽입된다.
- 잠든 스레드는 ready_list가 아닌 sleep_list에 삽입하는 thread_sleep() 함수를 호출한다.
  - thread_sleep() 함수는 아래에서 새로 선언한다.

```c
/* timer.c */

void timer_sleep(int64_t ticks)
{
    int64_t start = timer_ticks();

    ASSERT (intr_get_level() == INTR_ON);
    thread_sleep(start * ticks); // thread_sleep() 함수 호출
}
```

#### `thread_sleep`

```c
/* thread.h */
void thread_sleep(int64_t ticks);
```

```c
/* thread.c */
void thread_sleep(int64_t ticks)
{
    struct thread*curr;
    enum intr_level old_level;
    old_level = intr_disable();

    curr = thread_current();
    ASSERT(curr != idle_thread);

    curr->wakeup_ticks = ticks; // 스레드가 깨어나야 하는 시간 저장
    list_insert_ordered(&sleep_list, &curr->elem, cmp_priority, NULL); // sleep_list에 삽입
    thread_block(); // 현재 스레드 재우기

    intr_set_level(old_level); // 인터럽트 상태를 원래 상태로 변경

}
```

####

- 참고자료

[[Pintos-KAIST] Project 1 :: Alarm Clock (Sleep-Awake 방식의 Alarm Clock 구현하기)](https://velog.io/@e_juhee/pintos-kaist-PROJECT1-Alarm-Clock-Sleep-Awake-%EB%B0%A9%EC%8B%9D%EC%9D%98-Alarm-Clock-%EA%B5%AC%ED%98%84%ED%95%98%EA%B8%B0)
