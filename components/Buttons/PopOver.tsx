import { useState } from "react";

interface Props {
  btnTxt: string;
  btnClassNames?: string;
  title: string;
  line1?: string;
  line2?: string;
  line3?: string;
  line4?: string;
  line5?: string;
  line6?: string;
  line7?: string;
  isConfirmPop: boolean;
  value?: boolean;
  setState?: Function;
}

const PopOver = ({
  btnTxt,
  btnClassNames,
  title,
  line1,
  line2,
  line3,
  line4,
  line5,
  line6,
  line7,
  isConfirmPop,
  value,
  setState,
}: Props) => {
  const [show, setShow] = useState(false);
  const lines = [line1, line2, line3, line4, line5, line6, line7];
  return (
    <>
      <div className="flex gap-4 items-center">
        <button
          onClick={() => {
            setShow(true);
          }}
          className={`btn ${btnClassNames && btnClassNames}`}
        >
          {btnTxt}
        </button>
      </div>
      {show && (
        <article className="pop-over">
          <div className="buttons">
            <button
              onClick={() => {
                setShow(false);
              }}
              className={`btn btn-close`}
            >
              X
            </button>
            <p className="text-2xl text-center mt-8">{title}</p>
            {lines.map((line, index) => (
              <p key={index} className="text-sm mb-5">
                {line && line}
              </p>
            ))}
          </div>
          {isConfirmPop && (
            <div className="flex gap-4">
              <button
                className="btn btn-green"
                onClick={() => {
                  setState && setState(!value);
                }}
              >
                Continue
              </button>{" "}
              <button
                className="btn btn-red"
                onClick={() => {
                  setShow(false);
                }}
              >
                NO!
              </button>
            </div>
          )}
        </article>
      )}
    </>
  );
};

export default PopOver;
