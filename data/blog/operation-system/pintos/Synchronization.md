---
title: Synchronization
date: '2023-06-30'
tags: ['operating-system', 'side-project']
draft: false
summary: PintOs appendix
---

_If sharing of resources between threads is not handled in a careful, controlled fasion, the result is usually a big mess. This is especially the case in operating system kernels, where faulty sharing can crash the entire machine. Pintos provides several synchronization primitives to help out._

만약, 두 쓰레드 간에 자원을 조절해서, 조심히 다루지 않는다면 난리가 난다고 합니다. 특히 운영체제의 kernals에서 잘못하면 전체 하드웨어를 망가트릴수도 있다고 하네요. 그래서 Pintos는 여러가지 Synchronization은 여러가지 primitive, 제약사항? 기초 사항들을 제공한다고 합니다.

## Disabling Interrupts

_The crudest way to do synchronization is to disable interrupts, that is, to temporarily prevent the CPU from responding to interrupts. If interrupts are off, no other thread will preempt the running thread, because thread preemption is driven by the timer interrupt. If interrupts are on, as they normally are, then the running thread may be preempted by another at any time, whether between two C statements or even within the execution of one._

synchronization에서 가장 조잡한 방식은 inturrupts를 하지 못하게 하는 거라고 합니다. 이건, 임시적으로 CPU를 inturrupts에 반응하는 것을 방지한다고 합니다. 만약 inturrupt를 꺼둔다면, 다른 쓰레드들은 지금 돌고 있는 쓰레드를 선점(preempt)하지 못한다고 합니다. thread preemption(쓰레드 선점)이 timer inturrupt 때문에 발생하기 때문이라고 하네요.

만약 inturrupt가 평상시대로 켜져있다면, 현재 돌고 있는 쓰레드가 언제든지 선점(preempted) 당할 수 있다고 합니다.

_Incidentally, this means that Pintos is a "preemptible kernel," that is, kernel threads can be preempted at any time. Traditional Unix systems are "nonpreemptible," that is, kernel threads can only be preempted at points where they explicitly call into the scheduler. (User programs can be preempted at any time in both models.) As you might imagine, preemptible kernels require more explicit synchronization._

그러니까, 이건 Pintos가 "preemptible kernal"이라는 것을 의미한다고 합니다. kernal threads가 언제든지 선점당할 수 있다는 이야기이죠. 전통적인 Unix 시스템들은 "nonpreemptible"입니다. 이건, kernal threads가 정확히 스케줄러에서 요청되는 부분에서만 선점이 가능하다는 얘깁니다.(유저 프로그램은 pontos, unix 두 모델에서 모두 선점가능합니다.)눈치챘을 수도 있지만, preemptive kernel들은 더 많은 정확한 synchronization을 필요로 한다고 합니다.

_You should have little need to set the interrupt state directly. Most of the time you should use the other synchronization primitives described in the following sections. The main reason to disable interrupts is to synchronize kernel threads with external interrupt handlers, which cannot sleep and thus cannot use most other forms of synchronization._

직접 인터럽트 상태를 설정할 필요는 거의 없어야 한다고 합니다. 개부분의 경우에는 다음 섹션에서 설명하는 다른 동기화 기본 요소를 사용해야 합니다. 인터럽트를 비활성화하는 주요 이유는 커널 스레드를 외부 인터럽트 핸들러와 동기화하는 것으로, 외부 인터럽트 핸들러는 대기할 수 없으므로 다른 동기화 형태를 사용할 수 없다고 합니다.

_Some external interrupts cannot be postponed, even by disabling interrupts. These interrupts, called non-maskable interrupts (NMIs), are supposed to be used only in emergencies, e.g. when the computer is on fire. Pintos does not handle non-maskable interrupts._

일부 외부 인터럽트는 인터럽트를 비활성화하여도 연기할 수 없습니다. 이러한 인터럽트는 비마스크 가능 인터럽트(Non-Maskable Interrupts, NMI)라고 불리며, 컴퓨터 화재와 같은 긴급한 상황에서만 사용됩니다. Pintos는 비마스크 가능 인터럽트를 처리하지 않습니다.

Types and functions for disabling and enabling interrupts are in `include/threads/interrupt.h.`

```C
enum intr_level;
```

One of INTR_OFF or INTR_ON, denoting that interrupts are disabled or enabled, resepectively.

```C
enum intr_level intr_get_level (void);
```

Returns the current interrupt state.

```C
enum intr_level intr_set_level (enum intr_level level);
```

Turns interrupts on or off according to level. Returns the previous interrupt state.

```C
enum intr_level intr_enable (void);
```

Turns interrupts on. Returns the previos interrupt state.

```C
enum intr_level intr_disable (void);
```

Turns interrupts off. Returns the previous interrupt state.

## Semaphores

세마포어는 음이 아닌 정수와 함께 원자적으로 조작하는 두 가지 연산자로 구성되어 있으며, 그것들은 다음과 같습니다.

- "Down" 또는 "P": 값이 양수가 될 때까지 기다린 다음, 값을 감소시킵니다.
- "Up" 또는 "V": 값을 증가시키고 (있으면 대기 중인 스레드 하나를 깨웁니다).

세마포어는 0으로 초기화되어 한 번 발생할 이벤트를 기다리는 데 사용할 수 있습니다. 예를 들어, 스레드 A가 스레드 B를 시작하고 B가 어떤 활동이 완료되었음을 알리기를 기다리려고 한다고 가정해 보겠습니다.

A는 0으로 초기화된 세마포어를 만들어 B에게 전달할 수 있고, 그런 다음 세마포어를 "다운"할 수 있습니다. B가 작업을 완료하면 세마포어를 "업"합니다. 이것은 A가 세마포어를 "다운"하거나 B가 "업"하는 것이 먼저인지와 관계없이 작동합니다.

에를 들어,

```c++
struct semaphore sema;

/* Thread A */
void threadA (void) {
    sema_down (&sema);
}

/* Thread B */
void threadB (void) {
    sema_up (&sema);
}

/* main function */
void main (void) {
    sema_init (&sema, 0);
    thread_create ("threadA", PRI_MIN, threadA, NULL);
    thread_create ("threadB", PRI_MIN, threadB, NULL);
}
```

위 코드에서는 threadA는 threadB가 sema_up()을 호출할 때까지 sema_down()에서 실행을 중지합니다. 코드 블록이 리소스를 사용하기 시작하기 전에 세마포어를 "다운"시키고 리소스 작업을 마친 후에는 "업"시킵니다.

이러한 경우 아래에 있는 lock이 더 적절할 수 있습니다. 세마포어는 1보다 큰 값으로 초기화할 수도 있습니다. 그렇지만 이들은 거의 사용되지 않습니다. 세마포어는 Edsger Dijkstra가 발명했으며 처음에는 THE 운영 체제에서 사용되었습니다. Pintos의 세마포어 유형 및 작업은 `include/threads/synch.h`에 선언되어 있습니다.

```C
struct semaphore;
```

Represents a semaphore.

```C
void sema_init(struct semaphore * sema, unsigned value);
```

initializes sema as a new semaphore with a given initial value.

```C
void sema_down(struct semaphore * sema);
```

Executes the "down" or "P" operation on sema, waiting for its value to become positive and then decrementing it by one.

```C
bool sema_try_down(struct semaphore * sema);
```

Tries to execute the "down" or "P" operation on sema, without waiting. Returns true if sema was successfully decremented, or false if it was already zero and thus could not be decremented without waiting.
Calling this function in a tight loop wastes CPU time, so use `sema_down()` or find a different approach instead.

```C
void sema_up(struct semaphore *sema);
```

Executes the "up" or "V" operation on sema, incrementing its value. If any threads are waiting on sema, wakes one of them up. Unlike most synchronization primitives, `sema_up()` may be called inside an external interrupt handler.

Semaphores are internally built out of disabling interrupt (see Disabling Interrupts) and thread blocking and unblocking (`thread_block()` and `thread_unblock()`). Each semaphore maintains a list of waiting threads, using the linked list implementation in `lib/kernel/list.c`.

## Locks

A lock is like a semaphore with an initial value of 1 (see Semaphores). A lock's equivalent of "up" is called "release", and the "down" operation is called "acquire".

Compared to a semaphore, a lock has one added restriction: only the trhead that acquires a lock, called the lock's "owner", is allowed to release it. If this restriction is a problem, it's a good sign that a semaphore should be used, instead of a lock.

Locks in Pintos are not "recursive," that is, it is an error for the thread currently holding a lock to try to acquire that lock. Lock types and functions are declared in `include/threads/synch.h`.

```C
struct lock;
```

Represents a lock.

```C
void lock_init(lock *lock);
```

initializes lock as a new lock. The lock is not initially owned by any thread.

```C
void lock_acquire(struct lcok *lock);
```

Acquires lock for the current thread, first waiting for any current owner to release it if necessary.

```C
bool lock_try_acquire(struct lock *lock);
```

Tries to acquire lock for use by the current thread, without waiting. Returns true if successful, false if the lock is already owned. Calling this function in a tight loop is a bad idea because it wastes CPU time, so use `lock_acquire()` instead.

```C
void lock_release(struct lock *lock);
```

Releases lock, which the current thread must own.

```C
bool lock_held_by_current_thread(const struct lock *lock);
```

Returns true if the running thread owns lock, false otherwise. There is no function to test whether an arbitrary thread owns a lock, because the answer could change before the caller could act on it.

## Monitors
