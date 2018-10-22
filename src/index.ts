import * as zenginCode from 'zengin-code';

interface ZenginBase {
  code: string;
  name: string;
  kana: string;
  hira: string;
  roma: string;
}

interface Branch extends ZenginBase { }
interface Bank extends ZenginBase {
  branches: {
    [code: string]: Branch
  }
}
interface ZenginCode {
  [code: string]: Bank
}

class Util {
  static filter<T extends ZenginBase>(val: string, data: T[]): T[] {
    if (Policy.startWithNumber(val)) {
      return data.filter((bank) => {
        return new RegExp('^' + val).test(bank.code);
      });
    } else if (Policy.startWithAlphabet(val)) {
      return data.filter((bank) => {
        return new RegExp('^' + val).test(bank.roma);
      });
    } else if (Policy.startWithHiragana(val)) {
      return data.filter((bank) => {
        return new RegExp('^' + val).test(bank.hira) || new RegExp('^' + val).test(bank.name);
      });
    } else if (Policy.startWithKatakana(val)) {
      return data.filter((bank) => {
        return new RegExp('^' + val).test(bank.kana)|| new RegExp('^' + val).test(bank.name);
      });
    } else {
      return data.filter((bank) => {
        return new RegExp('^' + val).test(bank.name);
      });
    }
  }
}

class Policy {
  static startWithNumber(val: string): boolean {
    return /^\d/.test(val);
  }

  static startWithAlphabet(val: string): boolean {
    return /^\w/.test(val);
  }

  static startWithHiragana(val: string): boolean {
    return /^[ぁ-んー　]/.test(val);
  }

  static startWithKatakana(val: string) {
    return /^[ァ-ヶー　]/.test(val);
  }
}

class BranchManager {
  constructor(val: string) {
    this._value = val;
    this._data = [];
    this._origin = [];
  }

  private _value: string;
  private _data: Branch[];
  private _current: Branch | undefined;
  private _origin: Branch[];

  reset(bankCode: string | undefined = undefined) {
    this._value = '';
    this._current = undefined;
    if (bankCode) {
      this._updateOriginData(bankCode);
    } else {
      this._origin = [];
    }
  }

  get value(): string {
    return this._value;
  }

  set value(val: string) {
    this._value = val;
    this._updateData();
    this._setCurrent();
  }

  get data(): Branch[] {
    return this._data;
  }

  get originData() {
    return this._origin;
  }

  get current(): Branch | undefined {
    return this._current;
  }

  get valid() {
    return !!this.current;
  }

  private _updateOriginData(bankCode: string) {
    const val = zenginCode[bankCode];
    if (val) {
      this._origin = Object.values(val.branches);
    }
  }

  private _setCurrent() {
    this._current = this._data.find(branch => {
      return branch.name === this._value;
    });
  }

  private _updateData() {
    this._data = this._origin.length === 0 ? [] : Util.filter<Branch>(this._value, this._origin);
  }
}


class BankManager {
  constructor(value: string, branchName: string) {
    this._value = value;
    this._data = [];
    this._origin = Object.values(zenginCode);
    this._branchManager = new BranchManager(branchName);
  }

  private _value: string;
  private _data: Bank[];
  private _current: Bank | undefined;
  private _origin: Bank[];
  private _branchManager: BranchManager;

  get value() {
    return this._value;
  }

  set value(val: string) {
    this._value = val;
    this._updateData();
    this._setCurrent();
  }

  get data() {
    return this._data;
  }

  get originData() {
    return this._origin;
  }

  get branchManager(): BranchManager {
    return this._branchManager;
  }

  get current() {
    return this._current;
  }

  get valid() {
    return !!this.current;
  }

  get allValid() {
    return this.valid && this.branchManager.valid;
  }

  private _updateData() {
    this._data = this._value.length === 0 ? [] : Util.filter<Bank>(this._value, this._origin);
  }

  private _setCurrent() {
    this._current = this._data.find(bank => {
      return bank.name === this._value;
    });
    if (this._current) {
      this._branchManager.reset(this._current.code);
    } else {
      this._branchManager.reset();
    }
  }
}

export default {
  BankManager
};
