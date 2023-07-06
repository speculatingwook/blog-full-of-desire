---
title: '[ Pintos ] project 1, Threads'
date: '2023-06-30'
tags: ['operating-system', 'side-project', 'pintos']
draft: false
summary: 카이스트 출신 개발자 사수분이 알려주신 PINT-OS, 작은 OS 구현 프로젝트
---

## Project1: Threads

In this assignment, we give you a minimally functional thread system. Your job is to extend the functionality of this system to gain a better understanding of synchronization problems. You will be working primarily in the `threads` directory for this assignment, with some work in the `devices` directory on the side. Compilation should be done in the `threads` directory. Before you read the description of this project, you should at least skim the material [Synchronization](/blog/operation-system/pintos/Synchronization).

음. 이 시스템의 기능을 확장하는게 제가 해야 할 일인 것 같네요. 이걸 해결하면서 동기화 문제에 대한 이해도가 높아진다고 합니다. `treads` 디렉토리에서 주로 작업하고, `device` 디렉토리에서 조금 일한다고 하네요. 컴파일은 `threads` 디렉토리에서 한다고 합니다.

이 문서를 읽기 전에, [먼저 Synchronization에 대해 슥 훑어보라고 하는데, 지금 보러 가겠습니다.](/blog/operation-system/pintos/appendix/Synchronization)

## Background

### understanding Threads

(읽고 이해했는데, 번역을 위해 gpt를 사용했습니다.)

먼저 초기 스레드 시스템의 코드를 읽고 이해해야 합니다. Pintos는 이미 스레드 생성과 스레드 완료, 스레드 간 전환을 위한 간단한 스케줄러 및 동기화 기본 요소(세마포어, 락, 조건 변수, 최적화 바)를 구현하고 있습니다.

이 코드 중 일부는 다소 미스터리하게 보일 수 있습니다. 아직 기본 시스템을 컴파일하고 실행하지 않았다면 소개에서 설명한 대로 지금 해야 합니다. 소스 코드의 일부를 읽어 어떤 일이 벌어지고 어떤 순서로 진행되는지 알 수 있습니다. 원한다면 거의 어디에서든지 `printf()`를 호출한 다음 다시 컴파일하고 실행하여 어떤 일이 일어나고 어떤 순서로 이루어지는지 확인할 수 있습니다. 또한 디버거에서 커널을 실행하고 흥미로운 위치에 브레이크포인트를 설정하고 코드와 데이터를 단계적으로 검토하는 등 여러 작업을 수행할 수 있습니다.

스레드가 생성되면 스케줄링할 새로운 컨텍스트를 생성합니다. 이 컨텍스트에서 실행할 함수를 `thread_create()`의 인수로 제공합니다. 스레드가 처음 스케줄되고 실행되면 해당 함수의 시작 부분에서 시작하여 해당 컨텍스트에서 실행됩니다. 함수가 반환되면 스레드가 종료됩니다. 따라서 각 스레드는 Pintos 내에서 실행되는 미니프로그램처럼 작동하며, `thread_create()`에 전달된 함수는 `main()` 역할을 합니다.

주어진 시간에 정확히 하나의 스레드가 실행되고 나머지 스레드는 비활성 상태가 됩니다. 스케줄러가 다음에 실행할 스레드를 결정합니다. (주어진 시간에 실행 준비가 된 스레드가 없으면 `idle()`에서 구현된 특수한 idle 스레드가 실행됩니다.) 동기화 기본 요소는 하나의 스레드가 다른 스레드가 어떤 작업을 수행할 때까지 대기해야 할 때 컨텍스트 전환을 강제할 수 있습니다.

컨텍스트 전환의 메커니즘은 `threads/thread.c`의 `thread_launch()`에 있습니다. (이해할 필요는 없습니다.) 컨텍스트를 전환하려는 스레드의 상태를 저장하고 복원합니다.

GDB 디버거를 사용하여 컨텍스트 전환을 천천히 추적하여 어떤 일이 발생하는지 확인할 수 있습니다(GDB 참조). 시작할 때 `schedule()`에 브레이크포인트를 설정할 수 있으며, 그 후 거기서 단계별로 진행할 수 있습니다. 각 스레드의 주소와 상태, 각 스레드에 대한 호출 스택의 절차를 추적해야 합니다. 하나의 스레드가 `do_iret()`의 `iret`을 실행하면, 다른 스레드가 실행되기 시작하는 것을 알 수 있습니다.

**경고**: Pintos에서 각 스레드는 4KB 미만의 크기의 고정 크기 실행 스택이 할당되며, 커널은 스택 오버플로를 검출하지만 완벽하게는 할 수 없습니다.
비정적 지역 변수로서 대규모 데이터 구조를 선언하면, 예를 들어 `int buf[1000];`와 같은 심각한 문제를 초래할 수 있습니다. 스택 할당에 대한 대체 방안은 페이지 할당과 블록 할당입니다(메모리 할당 참조).

### Source Files

다음은 `threads`와 `include/threads` 디렉토리에 있는 파일들에 대한 간략한 개요입니다. 대부분의 코드를 수정할 필요는 없지만, 이 개요를 제공함으로써 어떤 코드를 살펴봐야 할지에 대한 시작점을 제공하고자 합니다.

#### `threads` codes

- `loader.S`, `loader.h`

  커널 로더입니다. PC BIOS가 메모리에 로드하고 디스크에서 커널을 찾아 메모리에 로드한 다음 `start.S`의 `bootstrap()`으로 이동하는 코드와 데이터로 구성된 512바이트입니다. 이 코드를 살펴보거나 수정할 필요는 없습니다. `start.S`는 메모리 보호를 위한 기본 설정을 수행하고 64비트 long 모드로 이동합니다. 로더와 달리 이 코드는 실제로 커널의 일부입니다.

- `kernel.lds.S`

  커널을 링크하는 데 사용되는 링커 스크립트입니다. 이 스크립트는 커널의 로드 주소를 설정하고 `start.S`가 커널 이미지의 시작 부근에 위치하도록 배열합니다. 다시 말씀드리지만, 여러분은 이 코드를 확인하거나 수정할 필요가 없습니다. 하지만 궁금하신 경우를 위해 적어놓았습니다.

- `init.c`, `init.h`

  커널 초기화는 `main()`을 포함하여 이루어집니다. 적어도 초기화되는 내용을 확인하기 위해 `main()`을 살펴보는 것이 좋습니다. 여기에 직접 초기화 코드를 추가하고자 할 수도 있습니다.

- `thread.c`, `thread.h`

  기본적인 스레드 지원이 제공됩니다. 이 파일들에서 많은 작업이 이루어질 것입니다. `thread.h` 파일은 `struct thread`를 정의하며, 이를 네 개의 프로젝트에서 모두 수정할 가능성이 높습니다. 자세한 내용은 "Threads"를 참조하십시오.

- `palloc.c`, `palloc.h`

  4kB 페이지의 배수로 시스템 메모리를 전달하는 페이지 할당자. 자세한 내용은 페이지 할당자를 참조하십시오.

- `malloc.c`, `malloc.h`

  커널 의 `malloc()` 및 `free()`에 대한 간단한 구현입니다 . 자세한 내용은 블록 할당자를 참조하십시오.

- `interrupt.c`, `interrupt.h`

  인터럽트를 켜고 끄는 기본 인터럽트 처리 및 기능.

- `intr-stubs.S`, `intr-stubs.h`

  저수준 인터럽트 처리를 위한 어셈블리 코드.

- `synch.S`, `synch.h`

  기본적인 동기화 기본 요소들이 제공됩니다: 세마포어(semaphores), 락(locks), 조건 변수(condition variables), 그리고 최적화 장벽(optimization barriers)입니다. 이 네 개의 프로젝트에서 동기화를 위해 이러한 요소들을 사용해야 합니다. 자세한 내용은 "Synchronization"을 참조하십시오.

- `mmu.c`, `mmu.h`

  x86-64 페이지 테이블 작업을 위한 함수입니다. lab1 다음에 이 파일을 자세히 살펴보겠습니다.

- `io.h`

  I/O 포트 액세스를 위한 함수들이 제공됩니다. 이는 주로 `device` 디렉토리의 소스 코드에서 사용되며, 직접 수정할 필요는 없을 것입니다.

- `vaddr.h`, `pte.h`

  가상 주소와 페이지 테이블 엔트리를 다루기 위한 함수와 매크로들이 제공됩니다. 이들은 프로젝트 3에서 더 중요해질 것입니다. 현재로서는 이들을 무시하셔도 됩니다.

- `flags.h`

  x86-64 플래그 레지스터의 몇 개 비트를 정의하는 매크로들이 있습니다. 아마도 흥미로울 만한 내용은 아닐 것입니다.

#### `devices` codes

기본 스레드 커널은 또한 devices 디렉토리에 다음과 같은 파일들을 포함합니다:

- `timer.c`, `timer.h`

  기본적으로 1초에 100번씩 틱하는 시스템 타이머가 있습니다. 이 프로젝트에서 이 코드를 수정하게 될 것입니다.

- `vga.c`, `vga.h`

  VGA 디스플레이 드라이버입니다. 화면에 텍스트를 출력하는 역할을 담당합니다. 이 코드를 확인할 필요는 없을 것입니다. `printf()` 함수가 VGA 디스플레이 드라이버를 호출해주기 때문에 별도로 이 코드를 호출할 필요는 거의 없을 것입니다.

- `serial.c`, `serial.h`

  시리얼 포트 드라이버입니다. 다시 말하지만, `printf()` 함수가 이 코드를 대신 호출하기 때문에 별도로 호출할 필요가 없습니다. 이 드라이버는 시리얼 입력을 처리하고, 입력 레이어로 전달합니다(아래 참조).

- `block.c`, `block.h`

  블록 장치에 대한 추상화 계층입니다. 이는 고정 크기 블록 배열로 구성된 임의 접근 및 디스크와 유사한 장치들을 나타냅니다. 기본적으로 Pintos는 IDE 디스크와 파티션 두 가지 유형의 블록 장치를 지원합니다. 그러나 프로젝트 2 이전에는 어떤 유형의 블록 장치도 실제로 사용되지 않을 것입니다.

- `ide.c`, `ide.h`

  최대 4개의 IDE 디스크에서 섹터를 읽고 쓰는 기능을 지원합니다.

- `partition.c`, `partition.h`

  디스크의 파티션 구조를 이해하여 단일 디스크를 여러 영역(파티션)으로 분할하여 독립적으로 사용할 수 있게 합니다.

- `kbd.c`, `kbd.h`

  키보드 드라이버입니다. 키 입력을 처리하고, 입력 레이어로 전달합니다(아래 참조).

- `input.c`, `input.h`

  입력 레이어입니다. 키보드나 시리얼 드라이버로 전달된 입력 문자들을 대기열에 저장합니다.

- `intq.c`, `intq.h`

  인터럽트 큐는 커널 스레드와 인터럽트 핸들러가 모두 접근하는 원형 큐를 관리하는 데 사용됩니다. 키보드와 시리얼 드라이버에서 사용됩니다.

- `rtc.c`, `rtc.h`

  실시간 클록 드라이버는 커널이 현재 날짜와 시간을 확인할 수 있도록 합니다. 기본적으로 이는 `thread/init.c`에서 난수 생성기의 초기 시드를 선택하는 데에만 사용됩니다.

- `speaker.c`, `speaker.h`

  PC 스피커에서 음조를 생성할 수 있는 드라이버입니다.

- `pit.c`, `pit.h`

  8254 Programmable Interrupt Timer를 구성하는 코드입니다. 이 코드는 `devices/timer.c`와 `devices/speaker.c`에서 모두 사용됩니다. 각 장치는 PIT의 출력 채널 중 하나를 사용하기 때문입니다.

#### `lib` codes

마지막으로, `lib` 및 `lib/kernel` 디렉토리에는 유용한 라이브러리 루틴이 포함되어 있습니다. (lib/user는 프로젝트 2에서부터 사용되는 사용자 프로그램에 사용되지만, 커널의 일부는 아닙니다.) 여기 몇 가지 추가 세부 정보가 있습니다:

- `ctype.h`, `inttypes.h`, `limits.h`, `stdarg.h`, `stdbool.h`, `stddef.h`, `stdint.h`, `stdio.c`, `stdio.h`, `stdlib.c`, `stdlib.h`, `string.c`, `string.h`

  표준 C 라이브러리의 일부분을 포함합니다.

- `debug.c`, `debug.h`

  디버깅을 돕기 위한 함수와 매크로들이 포함되어 있습니다. 자세한 내용은 "디버깅 도구(Debugging Tools)"를 참조하십시오.

- `random.c`, `random.h`

  의사 난수 생성기가 포함되어 있습니다. 실제로 난수 값의 순서는 Pintos의 실행마다 변하지 않을 것입니다.

- `round.h`

  반올림을 위한 매크로들이 포함되어 있습니다.

- `syscall-nr.h`

  시스템 호출 번호들이 포함되어 있습니다. 프로젝트 2 이전에는 사용되지 않습니다.

- `kernel/list.c`, `kernel/list.h`

  이중 연결 리스트 구현이 포함되어 있습니다. Pintos 코드 전반에 걸쳐 사용되며, 프로젝트 1에서 몇 군데에서 직접 사용하게 될 것입니다. 시작하기 전에 이 코드를 대략 훑어보는 것을 권장합니다(특히 헤더 파일의 주석 부분을 주목해주세요).

- `kernel/bitmap.c`, `kernel/bitmap.h`

  비트맵 구현이 포함되어 있습니다. 이를 원하면 코드에서 사용할 수 있지만, 프로젝트 1에서는 아마도 이를 필요로 할 일이 없을 것입니다.

- `kernel/hash.c`, `kernel/hash.h`

  해시 테이블 구현이 포함되어 있습니다. 프로젝트 3에서 유용하게 사용될 것으로 예상됩니다.

- `kernel/console.c`, `kernel/console.h`, `kernel/stdio.h`

  `printf(`) 및 몇 가지 다른 함수를 구현합니다.

### Synchronization

적절한 동기화는 이 문제들의 해결에 중요한 부분입니다. 동기화 문제는 인터럽트를 비활성화하는 방식으로 쉽게 해결될 수 있습니다. 인터럽트가 비활성화된 동안에는 동시성이 없으므로 경쟁 조건이 발생할 가능성이 없습니다. 따라서 모든 동기화 문제를 이 방식으로 해결하려는 유혹을 느낄 수 있지만, 그렇게 하지 마세요. 대신 세마포어, 락, 조건 변수를 사용하여 대부분의 동기화 문제를 해결하세요. 어떤 상황에서 어떤 동기화 기본 요소를 사용해야 하는지에 대한 정보는 동기화에 대한 투어 섹션(참조: "Synchronization")이나 threads/synch.c 파일의 주석을 읽어보세요.

Pintos 프로젝트에서 인터럽트를 비활성화하는 것이 가장 적합한 문제 유형은 커널 스레드와 인터럽트 핸들러 간에 공유되는 데이터를 조정하는 것입니다. 인터럽트 핸들러는 슬립할 수 없으므로 락을 얻을 수 없습니다. 이는 커널 스레드와 인터럽트 핸들러 간에 공유되는 데이터를 커널 스레드 내에서 인터럽트를 비활성화하여 보호해야 함을 의미합니다.

이 프로젝트에서는 인터럽트 핸들러에서 약간의 스레드 상태에 접근해야 합니다. 알람 클럭에서는 타이머 인터럽트가 슬립 중인 스레드를 깨워야 합니다. 고급 스케줄러에서는 타이머 인터럽트가 몇 개의 전역 및 개별 스레드 변수에 액세스해야 합니다. 이러한 변수들을 커널 스레드에서 접근할 때는 인터럽트를 비활성화하여 타이머 인터럽트가 간섭하지 못하도록 해야 합니다.

인터럽트를 비활성화할 때는 가능한 한 최소한의 코드에 대해 수행해야 합니다. 그렇지 않으면 타이머 틱이나 입력 이벤트와 같은 중요한 것들을 잃을 수 있습니다. 인터럽트를 비활성화하면 인터럽트 처리 지연 시간이 증가하므로 너무 과도하게 사용하면 시스템이 느려질 수 있습니다.

`synch.c` 파일의 동기화 기본 요소 자체는 인터럽트를 비활성화하여 구현됩니다. 여기서 인터럽트가 비활성화된 상태에서 실행되어야 하는 코드 양을 늘릴 필요가 있을 수 있지만, 그래도 최소한으로 유지하려고 노력해야 합니다.

인터럽트를 비활성화하는 것은 디버깅에 유용할 수 있습니다. 특정 코드 영역이 인터럽트로 인해 중단되지 않도록 하려는 경우에 사용할 수 있습니다. 프로젝트를 제출하기 전에 디버깅 코드를 제거해야 합니다. (주석 처리만 하지 마세요. 그렇게 하면 코드를 읽기 어려울 수 있습니다.)

제출한 코드에는 바쁜 대기(busy waiting)가 없어야 합니다. `thread_yield()`를 호출하는 빠른 루프는 바쁜 대기의 한 형태입니다.

## Alarm Clock

**Reimplement `timer_sleep()`, defined in `devices/timer.c`**

Althouugh a working implemntation is provided, it busy waits, that is, it spins in a loop checking the current time and calling `thread_yield()` until enough time has gone by. Reimplement it to avoid busy waiting.

```C
void timer_sleep (int64_t ticks);
```

Suspends execution of the calling thread until time has advanced by at least x timer ticks. Unless the system is otherwise idle, the thread need not wake up after exactly x ticks. Just put it on the ready queue after they have waited for the right amount of time.
