declare module "zengin-code" {
  interface Branch {
    code: string;
    name: string;
    hira: string;
    kana: string;
    roma: string;
  }
  interface Bank {
    code: string;
    name: string;
    kana: string;
    hira: string;
    roma: string;
    branches: {
      [code: string]: Branch
    }
  }
  interface ZenginCode {
    [code: string]: Bank
  }
  const _: ZenginCode
  export = _
}