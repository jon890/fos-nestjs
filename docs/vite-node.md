# vite-node를 사용하는 이유?

## `Vite dev`

- Vite는 프론트엔드 개발용 번들러/개발 서버
- 주로 `.ts`와 같은 파일을 브라우저에서 바로 HMR로 돌릴 수 있도록 변환해주는 역할
- Node.js 서버 코드 (NestJS 같은)는 그냥 `vite` 명령으로 실행할 수 없음
  - 이유 : Vite dev 서버는 브라우저 타깃이 기본이고 Node용 실행 환경은 아니기 때문
  - NestJS 같은 서버 애플리케이션은 Node 환경에서 동작해야하고, ts 파일을 바로 실행하려면 Node가 ts를 이해할 수 있어야 함

## vite-node의 역할

- `vite-node`는 Node 환경에서 Vite의 트랜스파일/ESM 로딩 기능을 사용하도록 만들어주는 도구
  - Vite가 지원하는 ESM, TypeScript, Alias, HMR 같은 기능을 Node에서도 사용 가능
  - NestJS를 `ts-node` 대신 Vite 처럼 바로 실행 가능
