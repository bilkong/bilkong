import { createContext, useContext } from 'react';
import { makeAutoObservable } from 'mobx';
import { AntdTableResult } from 'ahooks/lib/useAntdTable/types';
import { FormInstance } from 'antd';
import { ActionType } from '@/types';
import { FundDataType } from './types';

class Store {
    constructor() {
        makeAutoObservable(this, void 0, {
            autoBind: true,
        });
    }

    _filterForm: (() => typeof this.filterForm) | null = null;
    setFilterForm = (data: typeof this.filterForm) => {
        this._filterForm = () => data;
    };
    get filterForm(): FormInstance | undefined {
        return this._filterForm?.();
    }

    _listFetcher: (() => typeof this.listFetcher) | undefined = void 0;

    setListFetcher = (data: typeof this.listFetcher) => {
        this._listFetcher = () => data;
    };

    get listFetcher(): AntdTableResult<any, any> | undefined {
        return this._listFetcher?.();
    }

    modalPayload: { type: ActionType; data: Partial<FundDataType> } | undefined = void 0;
    setModalPayload = (data?: { type: ActionType; data: Partial<FundDataType> }) => {
        this.modalPayload = data;
    };
}

export default Store;

const StoreCtx = createContext(new Store());

export const useStore = () => {
    return useContext(StoreCtx);
};
