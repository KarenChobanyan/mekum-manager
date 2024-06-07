import { useGetWarehouseExitsQuery } from "../../../API/actionsApi"

const useStorageExits = (id:string)=>{
    const {data:exitsData} = useGetWarehouseExitsQuery({id:id,limit:10,offset:0});

    return {
        exitsData
    }
};

export default useStorageExits