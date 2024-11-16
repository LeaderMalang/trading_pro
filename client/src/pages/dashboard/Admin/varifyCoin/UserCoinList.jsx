import { useEffect, useState } from "react";
import VerifyCoinModal from "./VerifyCoinModal";
import { toast } from "react-toastify";
import { GetAllDepositeCoin } from "../../../../redux/features/deposite/deposite.action";
import { useDispatch, useSelector } from "react-redux";

const UserCoinList = () => {
    const [open, setOpen] = useState(false);
    const [selectedRows, setSelectedRows] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage] = useState(10);

    const headings = [
        { key: "userId", value: "User ID" },
        { key: "firstName", value: "Firstname" },
        { key: "emailAddress", value: "Email" },
        { key: "currencyName", value: "Currency Name" },
        { key: "networkName", value: "Network Name" },
        { key: "amount", value: "Amount" },
        { key: "status", value: "Status" },
        { key: "date", value: "Date" },
    ];

    const users = [
        {
            userId: 1,
            firstName: "Cort",
            emailAddress: "ctosh0@github.com",
            currencyName: "BTC",
            networkName: "ERC-20",
            amount: "100",
            status: false,
            date: "2081-01-10",
        },
        {
            userId: 2,
            firstName: "Cort",
            emailAddress: "ctosh0@github.com",
            currencyName: "BTC",
            networkName: "ERC-20",
            amount: "100",
            status: false,
            date: "2081-01-10",
        },
        {
            userId: 3,
            firstName: "Cort",
            emailAddress: "ctosh0@github.com",
            currencyName: "BTC",
            networkName: "ERC-20",
            amount: "100",
            status: true,
            date: "2081-01-10",
        },
    ];

    const toggleColumn = (key) => {
        const columns = document.querySelectorAll(`.${key}`);
        columns.forEach((column) => {
            column.classList.toggle("hidden");
        });
    };

    const getRowDetail = (id) => {
        const rows = [...selectedRows];
        const index = rows.indexOf(id);
        if (index !== -1) {
            rows.splice(index, 1);
        } else {
            rows.push(id);
        }
        setSelectedRows(rows);
    };

    const selectAllCheckbox = (event) => {
        const columns = document.querySelectorAll(".rowCheckbox");
        const isChecked = event.target.checked;
        setSelectedRows(isChecked ? columns.map((column) => parseInt(column.name)) : []);
        columns.forEach((column) => {
            column.checked = isChecked;
        });
    };

    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = users.slice(indexOfFirstRow, indexOfLastRow);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const dispatch = useDispatch();
    useEffect(() => {
        async function fetch() {
            dispatch(GetAllDepositeCoin());
        }
        fetch();
    }, []);
    const { allDepositeCoin } = useSelector((state) => state.desposite);

    return (
        <div className="antialiased sans-serif ">
            <link
                rel="stylesheet"
                href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.16/dist/tailwind.min.css"
            />
            <div className="container mx-auto py-6 px-4">
                <h1 className="text-3xl py-4 border-b mb-10">User Coin List</h1>
                {selectedRows.length > 0 && (
                    <div className="bg-teal-200 fixed top-0 left-0 right-0 z-40 w-full shadow">
                        <div className="container mx-auto px-4 py-4">
                            <div className="flex md:items-center">
                                <div className="mr-4 flex-shrink-0">
                                    <svg
                                        className="h-8 w-8 text-teal-600"
                                        viewBox="0 0 20 20"
                                        fill="currentColor">
                                        <path
                                            fillRule="evenodd"
                                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </div>
                                <div className="text-teal-800 text-lg">
                                    {selectedRows.length} rows are selected
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                <div className="mb-4 flex justify-between items-center">
                    <div className="flex-1 pr-4">
                        <div className="relative md:w-1/3">
                            <input
                                type="search"
                                className="w-full pl-10 pr-4 py-2 rounded-lg shadow focus:outline-none focus:shadow-outline text-gray-600 font-medium"
                                placeholder="Search..."
                            />
                            <div className="absolute top-0 left-0 inline-flex items-center p-2">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-6 h-6 text-gray-400"
                                    viewBox="0 0 24 24"
                                    strokeWidth="2"
                                    stroke="currentColor"
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeLinejoin="round">
                                    <rect x="0" y="0" width="24" height="24" stroke="none"></rect>
                                    <circle cx="10" cy="10" r="7" />
                                    <line x1="21" y1="21" x2="15" y2="15" />
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div className="shadow rounded-lg flex">
                        {/* <div className="relative">
              <button
                onClick={() => setOpen(!open)}
                className="rounded-lg inline-flex items-center bg-white hover:text-blue-500 focus:outline-none focus:shadow-outline text-gray-500 font-semibold py-2 px-2 md:px-4"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 md:hidden"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="0" y="0" width="24" height="24" stroke="none"></rect>
                  <path d="M5.5 5h13a1 1 0 0 1 0.5 1.5L14 12L14 19L10 16L10 12L5 6.5a1 1 0 0 1 0.5 -1.5" />
                </svg>
                <span className="hidden md:block">Display</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 ml-1"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="0" y="0" width="24" height="24" stroke="none"></rect>
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
              {open && (
                <div className="z-40 absolute top-0 right-0 w-40 bg-white rounded-lg shadow-lg mt-12 -mr-1 block py-1 overflow-hidden">
                  {headings.map(
                    (heading) => (
                      console.log(heading.value),
                      (
                        <label
                          key={heading.key}
                          className="flex justify-start items-center text-truncate hover:bg-gray-100 px-4 py-2"
                        >
                          <div className="text-teal-600 mr-3">
                            <input
                              type="checkbox"
                              className="form-checkbox focus:outline-none focus:shadow-outline"
                              defaultChecked
                              onClick={() => toggleColumn(heading.key)}
                            />
                          </div>
                          <div className="select-none text-gray-700">
                            {heading.value}
                          </div>
                        </label>
                      )
                    )
                  )}
                </div>
              )}
            </div> */}
                    </div>
                </div>
                <div
                    className="overflow-x-auto bg-white rounded-lg shadow overflow-y-auto relative"
                    style={{ height: "405px" }}>
                    <table className="border-collapse table-auto w-full whitespace-no-wrap bg-white table-striped relative">
                        <thead>
                            <tr className="text-left">
                                <th className="py-2 px-3 sticky top-0 border-b border-gray-200 bg-gray-100">
                                    <label className="text-teal-500 inline-flex justify-between items-center hover:bg-gray-200 px-2 py-2 rounded-lg cursor-pointer">
                                        <input
                                            type="checkbox"
                                            className="form-checkbox focus:outline-none focus:shadow-outline"
                                            onClick={selectAllCheckbox}
                                        />
                                    </label>
                                </th>
                                {headings.map((heading) => (
                                    <th
                                        key={heading.key}
                                        className={`bg-gray-100 sticky top-0 border-b border-gray-200 px-6 py-2 text-gray-600 font-bold tracking-wider uppercase text-xs ${heading.key}`}>
                                        {heading.value}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {allDepositeCoin?.map((user) => (
                                <tr key={user._id}>
                                    <td className="border-dashed border-t border-gray-200 px-3">
                                        <label className="text-teal-500 inline-flex justify-between items-center hover:bg-gray-200 px-2 py-2 rounded-lg cursor-pointer">
                                            <input
                                                type="checkbox"
                                                className="form-checkbox rowCheckbox focus:outline-none focus:shadow-outline"
                                                name={user.userId}
                                                onClick={() => getRowDetail(user.userId)}
                                            />
                                        </label>
                                    </td>
                                    <td className="border-dashed border-t border-gray-200 userId">
                                        <span className="text-gray-700 px-6 py-3 flex items-center">
                                            {user._id.slice(0, 5)}
                                        </span>
                                    </td>
                                    <td className="border-dashed border-t border-gray-200 firstName">
                                        <span className="text-gray-700 px-6 py-3 flex items-center">
                                            {user.user_id.slice(0, 5)}
                                        </span>
                                    </td>
                                    <td className="border-dashed border-t border-gray-200 emailAddress">
                                        <span className="text-[blue]  font-medium px-6 py-3 flex items-center">
                                            {/* {user.emailAddress} */}
                                        </span>
                                    </td>
                                    <td className="border-dashed border-t border-gray-200 gender">
                                        <span className="text-gray-700 px-6 py-3 flex items-center">
                                            {user.currency_name}
                                        </span>
                                    </td>
                                    <td className="border-dashed border-t border-gray-200 phoneNumber">
                                        <span className="text-gray-700 px-6 py-3 flex items-center">
                                            {user.network_name}
                                        </span>
                                    </td>
                                    <td className="border-dashed   border-gray-200 phoneNumber">
                                        <span className="bg-[green] border  text-white font-bold text-center rounded-md  px-6 py-3   items-center">
                                            {user.recharge_amount}
                                        </span>
                                    </td>{" "}
                                    <td className="border-dashed border-t border-gray-200 phoneNumber">
                                        <VerifyCoinModal
                                            deposite_id={user._id}
                                            // is_recharge={user.recharge_network_id}
                                            user_id={user.user_id}
                                            btnname={
                                                <button
                                                    disabled={user.is_recharge}
                                                    className={` ${
                                                        user.is_recharge
                                                            ? "bg-[blue]  text-white rounded-md uppercase font-normal"
                                                            : " bg-[red] text-white rounded-md uppercase font-normal"
                                                    } cursor-pointer  p-2 flex items-center font-medium`}>
                                                    {user.is_recharge
                                                        ? "Verified"
                                                        : " Click to verifiy"}
                                                </button>
                                            }
                                        />
                                    </td>{" "}
                                    <td className="border-dashed border-t border-gray-200 phoneNumber">
                                        <span className="text-gray-700 px-6 py-3 flex items-center">
                                            {user.created_at}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="flex justify-center mt-4">
                    <nav aria-label="Page navigation">
                        <ul className="inline-flex -space-x-px">
                            {Array.from(
                                { length: Math.ceil(allDepositeCoin.length / rowsPerPage) },
                                (_, i) => i + 1
                            ).map((pageNumber) => (
                                <li key={pageNumber}>
                                    <button
                                        onClick={() => paginate(pageNumber)}
                                        className={`px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 ${
                                            currentPage === pageNumber
                                                ? "z-10 bg-blue-50 border-blue-300 text-blue-600 hover:bg-blue-100 hover:text-blue-700"
                                                : ""
                                        }`}>
                                        {pageNumber}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    );
};

export default UserCoinList;
