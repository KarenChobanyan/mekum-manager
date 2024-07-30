import { useEffect, useRef, useState } from "react"
import { useGeneralHooks } from "../../General/Hooks/hooks";

const useCurrentUserInfoHooks = ()=>{
  const {largeScreen } = useGeneralHooks();
const [show,setShow] = useState<boolean>(false);
const [anchor, setAnchor] = useState<HTMLElement | null>(null);
  const headerProfileRef = useRef<HTMLDivElement | null>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (headerProfileRef.current && !headerProfileRef.current.contains(event.target as Node)) {
      setShow(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const setRenderName = (name: string, sureName: string) => {
    const renderName = `${name} ${sureName}`;
    const slisedName = renderName.slice(0.9)
    return largeScreen ? renderName
        :
        (
            renderName.length > 9
                ?
                `${slisedName}...`
                :
                renderName
        )
};
 
return {
    show,
    setAnchor,
    anchor,
    headerProfileRef,
    setShow,
    setRenderName
}
};

export default useCurrentUserInfoHooks