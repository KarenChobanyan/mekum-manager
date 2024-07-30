import { GetGoodBatchesResponse, IGoodBatch } from "../Interfaces/responseTypes";

export const countGoodExits = (data:GetGoodBatchesResponse, count: number) => {
    const setExites = () => {
        let initCount = count
        let exits: IGoodBatch[] | [] = [];
        data?.forEach((item) => {
          if (item.quantity > 0) {
            if (initCount > item.quantity) {
              initCount -= item.quantity
              const exitItem: IGoodBatch = {
                materialValueId: item.materialValueId,
                price: item.price,
                wareEntryOPrId: item.wareEntryOPrId,
                warehouseEntryOrderId: item.warehouseEntryOrderId,
                quantity: item.quantity
              }
              exits = [...exits, exitItem]
            } else if ((initCount < item.quantity || initCount === item.quantity) && initCount !== 0) {
              const lastCount = initCount;
              initCount = 0
              const exitItem: IGoodBatch = {
                materialValueId: item.materialValueId,
                price: item.price,
                wareEntryOPrId: item.wareEntryOPrId,
                warehouseEntryOrderId: item.warehouseEntryOrderId,
                quantity: lastCount
              }
              exits = [...exits, exitItem]
            }
          }
  
        })
        return exits
    };
  
    return setExites()
  };
  
  
  export const fetchData = (path:string,params: { [key: string]: string }) => {
  
  
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('mm_access_token');
        if (!token) {
          throw new Error('No bearer token found');
        }
  
        const queryString = Object.keys(params)
          .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(params[key]))
          .join('&');
  
        const response = await fetch(`${process.env.REACT_APP_API_KEY}/${path}?${queryString}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
  
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
  
        const responseData = await response.json();
        return responseData
      } catch (error) {
      }
    };
  
   return fetchData();
  };
  
  
  
  
  