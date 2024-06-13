export enum FundType {
    指数型基金 = 1,
    股票型基金 = 2,
    混合型基金 = 3,
    纯债型基金 = 4,
}

export interface FundDataType {
    _id: string;
    code: string;
    name: string;
    cost: number;
    worth: number;
    share: number;
}
