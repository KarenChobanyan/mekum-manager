import { useLocation, useNavigate, useParams } from "react-router";
import { useTranslation } from "react-i18next";
import moment from "moment";
// import Cookies from 'js-cookie';
import { RootState, useAppDispatch, useAppSelector } from "../../Store/store";

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
