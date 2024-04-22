import { useCallback, useState } from 'react';

const useInput = (initValue) => {
  const [value, setValue] = useState(initValue);

  const handleOnChange = useCallback(
    (event) => {
      setValue(event?.target?.value);
    },
    [setValue]
  );

  return {
    value,
    setValue,
    handleOnChange,
  };
};

export default useInput;
