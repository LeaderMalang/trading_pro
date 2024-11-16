import { useEffect, useState } from "react";
import Select from "react-select";
import { Controller } from "react-hook-form";
import propTypes from "prop-types";


const CurrencySelect = ({control}) => {
  const [currencies, setCurrencies] = useState([]);


  const customStyles = {
    color: '#EAECEF',
    option: (provided) => ({
      ...provided,
      backgroundColor: "#444b5d",
      color: "#EAECEF",
      borderColor: '',
      padding: 10,
      '&:hover': {
      color: '#EAECEF',
        backgroundColor: '#444b5d',
      },
    }),
    control: (provided) => ({
      ...provided,
      borderColor: '#444b5d',
      backgroundColor: "#444b5d",
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
      borderColor: '',
    }),
    input: (provided) => ({
      ...provided,
      color: '#EAECEF', // Change the color of the search input text
    }),
    placeholder: (provided) => ({
      ...provided,
      color: '#5f636a', // Change the color of the placeholder text
    }),
    menu: (provided) => ({
      ...provided,
    }),
  };

  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const response = await fetch(
          `https://openexchangerates.org/api/currencies.json?app_id=YOUR_API_KEY`
        );
        const data = await response.json();
        const options = Object.keys(data).map((key) => ({
          value: key,
          label: `${data[key]} (${key})`,
        }));
        setCurrencies(options);
      } catch (error) {
        console.error("Error fetching currencies:", error);
      }
    };

    fetchCurrencies();
  }, []);

  return (

    <Controller control={control} name="currency" 
    render={({field}) => (
      <Select
      {...field}
      className="text-white text-xl border border-[#515768] bg-transparent rounded-md p-1  w-full placeholder:text-[#5f636a] focus:outline-none focus-visible:outline-none mt-4"
      options={currencies}
      onChange={(selectedOption) => field.onChange(selectedOption)}
      styles={customStyles}
      />
    )}
    />)
  }
  CurrencySelect.propTypes = {
    control: propTypes.any
  }

export default CurrencySelect;
