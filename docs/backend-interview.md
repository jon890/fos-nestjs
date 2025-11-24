# NodeJS 백엔드 인터뷰 준비

## 1. Node.js 기본 개념

**1.** Node.js가 싱글 스레드임에도 많은 요청을 처리할 수 있는 이유는 무엇인가요?

- Node.js가 많은 요청을 처리할 수 있는 핵심 이유는 싱글 스레드 기반의 이벤트 루프 + 논블로킹 I/O 모델 덕분입니다.
- Node는 요청을 하나씩 직접 처리하는 방식이 아니라, 이벤트 루프에 요청을 등록하고, I/O가 필요한 작업은 libuv가 백그라운드에서 처리한 뒤 완료 이벤트만 다시 전달하는 구조로 동작합니다.
- 즉, 스레드가 I/O 작업을 기다리면서 블로킹되지 않고 계속해서 다음 요청을 받을 수 있기 때문에 많은 요청을 처리할 수 있습니다.
- 모던 웹 API의 대부분은 DB 조회나 외부 HTTP 요청처럼 I/O bound 작업 중심이므로 Node의 구조가 특히 잘 맞습니다.

**2.** 이벤트 루프(Event Loop)의 역할을 설명해주세요.

**3.** microtask와 macrotask의 차이는 무엇인가요?

**4.** libuv의 역할은 무엇인가요?

**5.** require()와 import의 차이는 무엇인가요?

**6.** Node.js에서 non-blocking I/O가 동작하는 방식은?

**7.** process.nextTick()과 Promise.then()의 우선순위는?

**8.** Node.js에서 스레드풀(Worker Pool)이 사용되는 상황은?

**9.** call stack, task queue, microtask queue의 관계를 설명해주세요.

**10.** Node.js가 CPU-bound 작업에 취약한 이유는?

---

## 2. 비동기 프로그래밍

**11.** callback hell이 생기는 근본적인 이유는 무엇인가요?

**12.** Promise가 pending → fulfilled 과정은 어떻게 동작하나요?

**13.** async/await이 내부적으로 어떻게 작동하나요?

**14.** await는 실제로 스레드를 멈추나요?

**15.** Promise.all과 Promise.allSettled의 차이는?

**16.** EventEmitter의 동작 원리를 설명해주세요.

**17.** setImmediate가 setTimeout(0)보다 먼저 실행되는 이유는?

**18.** stream에서 backpressure란 무엇인가요?

**19.** async iterator가 stream과 어떤 관계가 있나요?

**20.** throttle과 debounce의 차이는?

---

## 3. Node 내장 모듈

**21.** Buffer가 필요한 이유는 무엇인가요?

**22.** Stream의 장점은 무엇인가요?

**23.** fs.readFile이 아니라 Stream을 사용해야 하는 상황은?

**24.** crypto 모듈로 해싱할 때 salt가 필요한 이유는?

**25.** path.resolve와 path.join의 차이는?

**26.** process.env는 언제 로딩되나요?

**27.** events 모듈의 on과 once의 차이는?

**28.** child_process spawn과 exec의 차이점은?

**29.** worker_threads와 cluster의 차이는?

**30.** require.cache가 무엇인가요?

---

## 4. 모듈 시스템 / 번들러

**31.** ESM과 CommonJS의 가장 근본적인 차이는?

**32.** ESM과 CJS가 완벽히 호환되지 않는 이유는?

**33.** package.json의 "type": "module"이 의미하는 것은?

**34.** Node의 CJS 모듈 로딩 과정(require algorithm)은?

**35.** Webpack과 Vite의 근본적인 차이는?

**36.** tree-shaking이 가능한 이유는?

**37.** Node에서 esm-only 패키지를 CJS에서 사용하는 방법은?

**38.** bundler 없이도 Node에서 import alias를 사용할 수 있을까?

**39.** 인터프리터 방식과 번들 방식의 차이는?

**40.** Vite dev 서버가 빠른 이유는?

---

## 5. Express / NestJS

**41.** NestJS의 DI(의존성 주입) 원리는 무엇인가요?

**42.** Provider, Module, Controller의 역할을 각각 설명해주세요.

**43.** Nest의 Pipe는 어떤 단계에서 동작하나요?

**44.** Guard와 Interceptor의 차이점은?

**45.** Nest Lifecycle Hook에서 onModuleInit은 언제 실행되나요?

**46.** Middleware vs Guard 차이는?

**47.** Exception Filter가 동작하는 순서를 설명해주세요.

**48.** Interceptor의 typical use-case 3개 말해보세요.

**49.** NestJS에서 Circular Dependency가 생기는 이유는?

**50.** CQRS 패턴은 언제 사용하는 게 좋나요?

---

## 6. 인증 & 보안

**51.** JWT Access Token과 Refresh Token의 차이점은?

**52.** bcrypt가 느린 이유는?

**53.** 세션 기반 인증과 토큰 기반 인증의 차이는?

**54.** CSRF 공격이 발생하는 이유는?

**55.** XSS 공격을 예방하는 방법은?

**56.** CORS는 왜 필요한가?

**57.** HTTPS 핸드셰이크 과정을 설명해주세요.

**58.** OAuth2 Authorization Code Flow는 어떻게 동작하나요?

**59.** SameSite 쿠키 옵션의 의미는?

**60.** SQL injection은 어떻게 막나요?

---

## 7. 데이터베이스 / ORM

**61.** ORM의 장점과 단점은?

**62.** 트랜잭션 격리 수준 4가지를 말해보세요.

**63.** N+1 문제는 어떤 상황에서 발생하나요?

**64.** DB Connection Pool이 필요한 이유는?

**65.** Prisma와 TypeORM의 차이는?

**66.** JOIN과 Subquery의 차이와 성능 차이를 설명해주세요.

**67.** 인덱스가 빠른 이유는?

**68.** COUNT(\*)가 느린 이유는?

**69.** Redis를 캐시로 사용할 때 주의해야 할 점은?

**70.** Optimistic Lock과 Pessimistic Lock의 차이는?

---

## 8. Redis

**71.** Redis가 싱글 스레드인데 왜 빠르죠?

**72.** Redis의 자료구조 5가지를 말해보세요.

**73.** sorted set이 랭킹 시스템에 적합한 이유는?

**74.** Redis Pub/Sub은 어떤 구조인가요?

**75.** pipeline과 transaction의 차이점은?

**76.** TTL과 eviction의 차이는?

**77.** Redis의 RDB와 AOF 차이점은?

**78.** 캐시 스탬피드란?

**79.** 캐시 미스(hit/miss)란?

**80.** 분산 락을 해결하는 Redis 방식은?

---

## 9. 아키텍처 / 서버 설계

**81.** MVC와 Layered Architecture의 차이는?

**82.** monolithic과 microservice의 장단점은?

**83.** API Gateway의 역할은?

**84.** Rate Limiting이 필요한 이유는?

**85.** 서버 성능 병목을 찾는 방법은?

**86.** CQRS의 장점은?

**87.** event-driven architecture는 언제 유리한가?

**88.** horizontal scaling vs vertical scaling 차이는?

**89.** Zero downtime 배포 방식 3가지 말해보세요.

**90.** 캐싱 전략(Write-through, Write-around, Write-back) 설명해보세요.

---

## 10. 테스트 / DevOps / 배포

**91.** 단위 테스트와 통합 테스트 차이는?

**92.** mocking이 필요한 이유는?

**93.** CI/CD란 무엇인가?

**94.** Docker 이미지 최적화 방법 3가지

**95.** Kubernetes의 주요 개념 5가지

**96.** 로드밸런서 역할은?

**97.** Canary 배포와 Blue-Green 배포 차이는?

**98.** observability 구성 요소 3가지

**99.** 로그 로테이션은 왜 필요한가?

**100.** 서버 장애 시 복구 절차를 설명해주세요.
