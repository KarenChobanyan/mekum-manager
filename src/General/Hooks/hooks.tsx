import { useLocation, useNavigate, useParams } from "react-router";
import { useTranslation } from "react-i18next";
import moment from "moment";
// import Cookies from 'js-cookie';
import { RootState, useAppDispatch, useAppSelector } from "../../Store/store";
import { IAutocompleteItem } from "../../Interfaces/componentTypes";

export const useGeneralHooks = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const accessToken = localStorage.getItem("mm_access_token");
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(
    (state: RootState) => state?.auth?.currentUser
  );

  const formatDate = (date: Date) => {
    return moment(date).format("DD.MM.YYYY");
  };
  const mobileScreen: boolean = window.innerWidth < 480;
  const mediumScreen: boolean = window.innerWidth < 680;
  const largeScreen: boolean = window.innerWidth > 920;

  return {
    t,
    i18n,
    params,
    location,
    accessToken,
    largeScreen,
    mobileScreen,
    mediumScreen,
    currentUser,
    dispatch,
    navigate,
    formatDate,
  };
};

export const useDirectoriesHooks = () => {
  const unitData: IAutocompleteItem[] = [
    { id: "1", title: "Տուփ" },
    { id: "2", title: "կգ" }
  ];
  const warehousesData: IAutocompleteItem[] = [
    { id: "1", title: "Պահեստ 1" },
    { id: "2", title: "Պահեստ 2" }
  ];
  const suppliersData: IAutocompleteItem[] = [
    { id: "1", title: "Մատակարար 1" },
    { id: "2", title: "Մատակարար 2" }
  ];

  const recipientData: IAutocompleteItem[] = [
    { id: "1", title: "Ստացող 1" },
    { id: "2", title: "Ստացող 2" }
  ];

  const buyersData: IAutocompleteItem[] = [
    { id: "1", title: "Գնորդ 1" },
    { id: "2", title: "Գնորդ 2" }
  ];

  return {
    unitData,
    warehousesData,
    suppliersData,
    recipientData,
    buyersData
  }
}
