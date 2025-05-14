import { FC, Fragment, memo, ReactNode } from "react";
import Loader from "./Loader";

interface Props {
  children: ReactNode;
  loading?: boolean;
}

const WrapperLoader: FC<Props> = ({ children, loading }) => {
  return (
    <Fragment>
      {loading ? (
        <div className="relative">
          <div className="relative z-0 pointer-events-none opacity-50">
            {children}
          </div>
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/40">
            <Loader />
          </div>
        </div>
      ) : (
        children
      )}
    </Fragment>
  );
};

export default memo(WrapperLoader);
