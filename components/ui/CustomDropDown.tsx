import React from 'react';
import DropDownPicker from 'react-native-dropdown-picker';

type CustomDropDownProps = {
  open: boolean;
  value: string | null;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setValue: React.Dispatch<React.SetStateAction<string | null>>;
  items: { label: string; value: string }[]; // ✅ เพิ่ม type ของ items
};

const CustomDropDown: React.FC<CustomDropDownProps> = ({ open, value, setOpen, setValue, items }) => {
  return (
    <DropDownPicker
      open={open}
      value={value}
      setOpen={setOpen}
      setValue={setValue}
      items={items} // ✅ 
      multiple={false}  
    />
  );
};

export default CustomDropDown;
