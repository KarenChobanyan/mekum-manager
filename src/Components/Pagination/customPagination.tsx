import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import styles from "./pagination.module.scss";

interface IProps {
  limit: number;
  offset: number;
  onChange: (_: any, offset: number) => void;
}

const CustomPagination: React.FC<IProps> = (props) => {
  const { limit, offset, onChange } = props;  

  return (
    <div className={styles["pagination-container"]}>
      <Stack spacing={2}>
        <Pagination
          count={limit}
          page={offset}
          showFirstButton
          showLastButton
          onChange={onChange}
        />
      </Stack>
    </div>
  );
};

export default CustomPagination;
