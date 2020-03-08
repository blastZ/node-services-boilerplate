export = class Validator {
  static testString(
    exp: any,
    inputConfig?: {
      allowEmpty?: boolean;
      maxLength?: number;
    }
  ) {
    const config = {
      allowEmpty: false,
      maxLength: 256,
      ...inputConfig
    };

    if (typeof exp !== 'string') return false;
    if (!config.allowEmpty && exp.trim() === '') return false;
    if (exp.length > config.maxLength) return false;

    return true;
  }

  static testNumber(exp: any) {
    return typeof exp === 'number';
  }

  static testBoolean(
    exp: any,
    inputConfig?: {
      allowNumber?: boolean;
    }
  ) {
    const config = {
      allowNumber: false,
      ...inputConfig
    };

    if (config.allowNumber) {
      if (exp === 0 || exp === 1) {
        return true;
      }
    }

    return typeof exp === 'boolean';
  }

  static testArray(exp: any, type: 'any' | 'number' = 'any') {
    if (!Array.isArray(exp)) return false;
    if (type === 'any') return true;

    let result = true;

    if (type === 'number') {
      for (let i = 0; i < exp.length; i++) {
        if (typeof exp[i] !== 'number') {
          result = false;
          break;
        }
      }
    }

    return result;
  }
};
