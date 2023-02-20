/**
 * 时间日期控件值 转换策略
 */
export enum DateParamTransformType {
  /**
   * 返回Date类型
   */
  DATE,

  /**
   * 返回时间戳
   */
  TIMESTAMP,

  /**
   * 返回字符串格式时间
   */
  STRING,

  /**
   * 范围选择时将转换为时间戳，并且用逗号分割，单个选择将直接转换为时间戳
   */
  SPLIT
}
