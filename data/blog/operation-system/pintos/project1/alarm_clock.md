---
title: '[ Pintos ] project 1, alarm-clock'
date: '2023-07-06'
tags: ['operating-system', 'side-project', 'pintos']
draft: false
summary: pintos project 1, threads-alarm-clock
---

## Alarm Clock

### Reimplementing `timer_sleep()`, defined in `devices/timer.c`.

주어진 구현은 바쁜 대기(**busy waiting**)를 수행합니다. 즉, 현재 시간을 확인하고 `thread_yield()`를 호출하여 충분한 시간이 경과할 때까지 반복하는 방식입니다. 바쁜 대기를 피하기 위해 재구현해야 합니다.

```c
void timer_sleep (int64_t ticks);
```

호출한 스레드의 실행을 중단하고 시간이 최소한 x 타이머 틱만큼 진행될 때까지 대기합니다. 시스템이 다른 작업을 수행하지 않는 한, 스레드는 정확히 x 틱 후에 깨어나지 않아도 됩니다. 그저 올바른 시간만큼 대기한 후 준비 큐(ready queue)에 스레드를 넣어두세요.

`timer_sleep()` 함수는 실시간으로 작동하는 스레드에 유용합니다. 예를 들어, 1초마다 커서를 깜빡이는 작업에 사용될 수 있습니다. `timer_sleep()` 함수의 인수는 타이머 틱 단위로 표현되며, 밀리초나 다른 단위가 아닙니다. 1초에는 TIMER_FREQ 타이머 틱이 있으며, TIMER_FREQ는 `devices/timer.h`에 정의된 매크로입니다. 기본값은 100입니다. 많은 테스트가 실패할 수 있으므로 이 값을 변경하는 것을 권장하지 않습니다.

특정 시간(밀리초, 마이크로초, 나노초) 동안 대기하기 위한 별도의 함수인 `timer_msleep()`, `timer_usleep()`, `timer_nsleep()`도 있습니다. 이들은 필요할 때 자동으로 `timer_sleep()`를 호출합니다. 따라서 이들 함수를 수정할 필요는 없습니다. 알람 시계 구현은 이후 프로젝트에 필요하지 않지만, 프로젝트 4에서 유용할 수 있습니다.
