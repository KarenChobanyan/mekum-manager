import { useGetUsersQuery } from "../../../API/authApi";
import { ITableFormItemData, ITableHeader, TableCellContentTypes } from "../../../Interfaces/componentTypes";
import { t } from 'i18next'
import { GetUsersResponse } from "../../../Interfaces/responseTypes";
import styles from '../formTablestyles.module.scss';

const useUsersHooks = () => {
    const { data: usersData } = useGetUsersQuery();
    const getUserRole = (id: number) => {
        switch (id) {
            case 1:
                return t('Roles.Admin');
            case 2:
                return t('Roles.User');
            default:
                return "";
        }
    }
    const headerData: ITableHeader[] = [
        {
            title: `${t('Forms.Name')}`,
            contentType: TableCellContentTypes.TEXT
        },
        {
            title: `${t('Forms.Surname')}`,
            contentType: TableCellContentTypes.TEXT
        },
        {
            title: `${t('Roles.Role')}`,
            contentType: TableCellContentTypes.TEXT
        },
    ];
    const createBodyData = (data: GetUsersResponse): Array<ITableFormItemData[]> => {
        return data?.map((item) => {
            return [
                {
                    component:
                        <div className={styles.formItemTextBox}>
                            <div className={styles.formItemText}>{item.name}</div>
                        </div>,
                    contentType: TableCellContentTypes.TEXT
                },
                {
                    component:
                        <div className={styles.formItemTextBox}>
                            <div className={styles.formItemText}>{item.surname}</div>
                        </div>,
                    contentType: TableCellContentTypes.TEXT
                },
                {
                    component:
                        <div className={styles.formItemTextBox}>
                            <div className={styles.formItemText}>{getUserRole(item.role_id!)}</div>
                        </div>,
                    contentType: TableCellContentTypes.TEXT
                },
            ]
        })
    };

    const bodyData = createBodyData(usersData!);


    return {
        usersData,
        bodyData,
        headerData
    }
};

export default useUsersHooks