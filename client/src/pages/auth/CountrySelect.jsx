import { useEffect, useState } from "react";
import Select from "react-select";
import { Controller } from "react-hook-form";
import propTypes from "prop-types";

const CountrySelect = ({ control }) => {
  const [countries, setCountries] = useState([]);

  const customStyles = {
    color: '#EAECEF',
    option: (provided) => ({
      ...provided,
      backgroundColor: "#444b5d",
      color: "#EAECEF",
      padding: 10,
      '&:hover': {
        color: '#EAECEF',
        backgroundColor: '#444b5d',
      },
    }),
    control: (provided) => ({
      ...provided,
      borderColor: 'transparent',
      backgroundColor: "",
      boxShadow: 'none',
      color: '#EAECEF',
      '&:hover': {
        color: '#EAECEF',
        borderColor: '',
      },
    }),
    singleValue: (provided) => ({
      ...provided,
      color: '#EAECEF',
    }),
    input: (provided) => ({
      ...provided,
      color: '#EAECEF',
    }),
    placeholder: (provided) => ({
      ...provided,
      color: '#8f98a7',
      fontSize: "16px"
    }),
    menu: (provided) => ({
      ...provided,
    }),
  };

  useEffect(() => {
    fetch(
      "https://valid.layercode.workers.dev/list/countries?format=select&flags=true&value=code"
    )
      .then((response) => response.json())
      .then((data) => {
        setCountries(data.countries);
      });
  }, []);

  return (
    <Controller
      name="country"
      control={control}
      render={({ field }) => (
        <Select
          {...field}
          options={countries}
          styles={customStyles}
          placeholder="Select Country"
          className="text-white text-xl border border-white bg-transparent rounded-md p-1  w-full  focus:outline-none focus-visible:outline-none"
          onChange={(selectedOption) => field.onChange(selectedOption)}
          
        />
      )}
    />
  );
};


CountrySelect.propTypes = {
  control: propTypes.any
}
export default CountrySelect;
