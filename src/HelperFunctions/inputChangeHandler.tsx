export const inputChangeHandler = (e: any, setState: any) => {
  setState((prevState: any) => {
    return { ...prevState, [e?.target?.name]: e.target?.value };
  });
};
