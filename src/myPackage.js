// @ts-check

/**
 * 프로젝트를 초기화한다.
 * @param {object} config
 * @param {boolean} config.debug
 * @param {string} config.url
 * @returns boolean
 */
export function init(config) {
  return true;
}

/**
 * 프로젝트를 종료한다.
 * @param {number} code
 * @returns number
 */
export function exit(code) {
  return code + 1;
}
