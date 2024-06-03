import { useEffect, useRef, useState } from "react";
import { useGeneralHooks } from "../../General/Hooks/hooks";
import { ArmenianFlag, RussianFlag, UnitedStatesFlag } from "../../Assets/Icons";

const useLanguagesHooks = () => {
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (containerRef.current && !!containerRef.current.contains(event.target as Node) ) {
      setShow(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const languages = [
    {
      id: 0,
      icon: ArmenianFlag,
      code: "am",
    },
    {
      id: 1,
      icon: RussianFlag,
      code: "ru",
    },
    {
      id: 2,
      icon: UnitedStatesFlag,
      code: "en",
    },
  ];

  const [show, setShow] = useState<boolean>(false);
  const [activeLangSrc, setActiveLangSrc] = useState<string>(
    localStorage.getItem('currentLang') === "en"
      ? UnitedStatesFlag
      : localStorage.getItem('currentLang') === "ru"
        ? RussianFlag
        : ArmenianFlag
  );
  const checkableLanguages = languages.filter(
    (item) => item.icon !== activeLangSrc
  );

  const { i18n } = useGeneralHooks();

  const changeActiveLanguage = (active: string) => {
    i18n.changeLanguage(active);
    localStorage.setItem('currentLang', active)
  };

  return {
    show,
    anchor,
    containerRef,
    activeLangSrc,
    checkableLanguages,
    setShow,
    setAnchor,
    setActiveLangSrc,
    changeActiveLanguage,
  };
};

export default useLanguagesHooks;
