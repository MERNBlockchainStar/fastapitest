export interface DataItem {
    id: number;
    [key: string]: any;
}

export interface DataContextValue {
    dataList: DataItem[];
    setDataList: React.Dispatch<React.SetStateAction<DataItem[]>>
}

export interface DataProviderProps {
    children: React.ReactNode;
}
