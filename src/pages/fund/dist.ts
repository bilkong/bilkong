import { FundType }  from './types'
import _ from 'lodash'

export const FundTypeMaps = {
    [FundType.指数型基金]: {
        label: FundType[1],
        color: ''
    },
    [FundType.股票型基金]: {
        label: FundType[2],
        color: ''
    },
    [FundType.混合型基金]: {
        label: FundType[3],
        color: ''
    },
    [FundType.纯债型基金]: {
        label: FundType[4],
        color: ''
    }
}


export const FundTypeList = _.map(FundTypeMaps, (value, key)=> ({label: value.label, value: +key}))