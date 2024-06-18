import React from 'react';
import { useGetGoodBatchesQuery } from '../../API/direcroriesApi';
import { GetGoodBatchesResponse, IGoodBatch } from '../../Interfaces/responseTypes';
import { UseFormSetValue } from 'react-hook-form';

interface IProps {
    warehouseId?: string,
    materialValueId?: string,
    count?: string,
    discount?:string,
    setValue: UseFormSetValue<any>,
    index: number
}

const TotalExitsCounter: React.FC<IProps> = (props) => {
    const { warehouseId, materialValueId, count, index, setValue,discount } = props;
    const { data: goodBatchesData } = useGetGoodBatchesQuery({ warehouseId: warehouseId!, materialValueId: materialValueId! }, { skip: materialValueId === undefined && count === undefined });

    if (count && materialValueId) {
        const totalMoneyCounter = (count: string, data: GetGoodBatchesResponse,discount?:string) => {
            let total: number = 0
            let initCount = +count
            let exits:IGoodBatch[] | [] = [];
              data.forEach((item) => {
                if(item.quantity > 0){
                    if (initCount > item.quantity) {
                        initCount -= item.quantity
                        total = total + (item.quantity * item.price!)
                        const exitItem:IGoodBatch = {
                            materialValueId:item.materialValueId,
                            // money:item.price,
                            price:item.price,
                            wareEntryOPrId:item.wareEntryOPrId,
                            warehouseEntryOrderId:item.warehouseEntryOrderId,
                            quantity:item.quantity
                        }
                        exits = [...exits,exitItem]
                    } else if ((initCount < item.quantity || initCount === item.quantity) && initCount !== 0) {
                        const lastCount = initCount;
                        initCount = 0
                        total = total + (lastCount * item.price!)
                        const exitItem:IGoodBatch = {
                            materialValueId:item.materialValueId,
                            price:item.price,
                            wareEntryOPrId:item.wareEntryOPrId,
                            warehouseEntryOrderId:item.warehouseEntryOrderId,
                            quantity:lastCount
                        }
                        exits = [...exits,exitItem]
                    }
                }
            });
            setValue(`goods.${index}.exits`,exits)
            if(discount){
                total = (total - ((total * +discount) / 100))
            }
            return total

        };
        const totalMoney = totalMoneyCounter(count!, goodBatchesData!,discount)
        setValue(`goods.${index}.money`,String(totalMoney!))
        return (
            <div>
                {totalMoney!}
            </div>
        )
    } else {
        return (
            <div />
        )
    }


}

export default TotalExitsCounter
