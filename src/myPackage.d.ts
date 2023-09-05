//Config 인터페이스
interface Config {
  url: string;
}

//모듈 선언
declare module "myPackage" {
  /**
   * url 값을 넣으면 boolean 값 반환한다.
   */
  function init(config: Config): boolean;
  /**
   * 숫자를 넣으면 그 수에 1을 더하여 반환한다.
   */
  function exit(code: number): number;
}
