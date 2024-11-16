const CoinLists = async () => {
  return (
    <section className=" flex justify-center my-5 ">
      <table className="  rounded-sm">
        <tr className="">
          <th className=" px-[5rem] text-white  opacity-30  text-start text-semibold">
            Coin
          </th>

          <th className=" px-[5rem] text-white  opacity-30  text-start text-semibold">
            Last Price
          </th>
          <th className=" px-[5rem] text-white  opacity-30  text-start text-semibold">
            Volume
          </th>
          <th className=" px-[5rem] text-white  opacity-30  text-start text-semibold">
            MCAP
          </th>
          <th className=" px-[5rem] text-white  opacity-30  text-start text-semibold">
            24 Chrgs
          </th>
          <th className="  px-2 text-white  opacity-30  text-start text-semibold">
            Action
          </th>
        </tr>
        <tr>
          <td className=" px-[5rem] text-white  opacity-90  text-start text-semibold">
            TON
          </td>
          <td className=" px-[5rem] text-white  opacity-90  text-start text-semibold">
            5.667
          </td>
          <td className=" px-[5rem] text-white  opacity-90  text-start text-semibold">
            5.667
          </td>
          <td className=" px-[5rem] text-white  opacity-90  text-start text-semibold">
            5.667
          </td>
          <td className=" px-[5rem] text-white  opacity-90  text-start text-semibold">
            -2.98%
          </td>
          <td className="   bg-green-400 p-2 rounded-md   text-[black]   text-bold cursor-pointer">
            Trade Now
          </td>
        </tr>
      </table>
    </section>
  );
};

export default CoinLists;
