import { useEffect, useRef, useState } from "react"

const useCurrentUserInfoHooks = ()=>{
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
 
return {
    show,
    setAnchor,
    anchor,
    headerProfileRef,
    setShow,
}
};

export default useCurrentUserInfoHooks