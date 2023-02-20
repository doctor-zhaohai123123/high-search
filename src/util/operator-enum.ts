/**
 * 条件 （只做定义，无任何相关逻辑操作）
 */
export enum OperationEnum {
  /**
   * 等于
   */
  EQ = 1,
  /**
   * 不等于
   */
  NE = 2,
  /**
   * 大于
   */
  GT = 3,
  /**
   * 小于
   */
  LT = 4,
  /**
   * 大于等于
   */
  GE = 5,
  /**
   * 小于等于
   */
  LE = 6,
  /**
   * 包含
   */
  IN = 7,
  /**
   * 不包含
   */
  NI = 8,
  /**
   * 介于
   */
  BE = 9,
  /**
   * 区间
   */
  RANGE = 10,
  /**
   * 为空
   */
  EMPTY = 11,
  /**
   * 不为空
   */
  NO_EMPTY = 12,
  /**
   * 包含全部
   */
  IN_ALL = 13,
  /**
   * 包含任意
   */
  IN_ANY = 14
}

/**
 * 输入控件显示模式
 */
export enum DisplayModelEnum {
  /**
   * 不显示输入控件
   */
  NONE = 0,

  /**
   * 显示单个输入控件
   */
  SIMPLE = 1,

  /**
   * 显示范围的输入控件
   */
  RANGE = 2
}

/**
 * 组件类型
 */
export enum WidgetTypeEnum {
  STRING = 'String',
  DATE_TIME = 'DateTime',
  DATE = 'Date',
  TIME = 'Time',
  NUMBER = 'Number',
  FLOAT = 'Float',
  SELECT = 'Select',
  SELECT_MULTIPLE = 'SelectMultiple',
  RADIO = 'Radio',
  TREE = 'Tree',
  CHECKBOX = 'Checkbox'
}

export enum ConnectEnum {
  AND = 0,
  OR = 1
}
