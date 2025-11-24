import { Controller, Get, HttpCode, Ip, Query, Req } from '@nestjs/common';
import type { Request } from 'express';

/**
 * 컨트롤러는 애플리케이션의 Request를 처리하는 목적을 갖는다.
 * 라우팅 메커니즘은 어떤 컨트롤러가 각 요청을 처리할지를 결정한다.
 */
@Controller('/test')
export class TestController {
  @Get('/number')
  numberWillTransformedJavascriptNumberType(): number {
    return 10;
  }

  @Get('/object')
  objectWillTransformedJson(): object {
    return {
      name: 'bifos',
      age: 20,
    };
  }

  // 방법 1: 특정 쿼리 파라미터만 가져오기 (가장 일반적)
  @Get('/query')
  findAll(@Query('name') name?: string): string {
    return name ?? 'No name';
  }

  // 방법 2: 모든 쿼리 파라미터를 객체로 가져오기
  @Get('/query-all')
  findAllAll(@Query() query: { name?: string; age?: string }): object {
    return {
      name: query?.name ?? 'No name',
      age: query?.age ?? 'No age',
    };
  }

  // 방법 3: @Req() 데코레이터 사용 (Express Request 객체 직접 사용)
  // Express의 request.query는 이미 파싱되어 있음
  @Get('/query-req')
  findAllWithReq(@Req() request: Request): object {
    return {
      name: request?.query?.name ?? 'No name',
      age: request?.query?.age ?? 'No age',
    };
  }

  @Get('/ip')
  findIp(@Ip() ip: string): string {
    return ip;
  }

  @Get('/status-code')
  @HttpCode(204)
  overrideStatusCode(): string {
    return 'No content';
  }
}
