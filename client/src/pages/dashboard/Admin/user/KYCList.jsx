import { useEffect } from "react";
import {
  GetAllUser,
  GetAllUserKYCDocs,
  VerifyUserKYC,
} from "../../../../redux/features/auth/auth.action";
import { useDispatch, useSelector } from "react-redux";
import PageHeader from "../../../../components/ui/PageHeader";
const KYCList = ({ setShowImage, setImageSrc }) => {
  const { KYCDocs, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const headings = [
    { key: "SN", value: "SN" },
    { key: "User Name", value: "User Name`" },
    { key: "Type", value: "Type" },
    { key: "Front Image", value: "Front Image" },
    { key: "Back Image", value: "Back Image" },
    { key: "KYC Status", value: "KYC Status" },
    { key: "Verify At", value: "Verify At" },
    { key: "Action", value: "Action" },
  ];

  useEffect(() => {
    dispatch(GetAllUserKYCDocs());
    dispatch(GetAllUser());
  }, [dispatch]);

  const updateUserKYC = (id) => {
    dispatch(VerifyUserKYC({ user_id: id }));
  };

  function popUpImg(src) {
    setShowImage(true);
    setImageSrc(src);
  }

  return (
    <>
      <PageHeader header={"Users KYCs"} />
      <div className="overflow-x-auto bg-white rounded-lg shadow overflow-y-auto relative h-fit">
        <table className="border-collapse table-auto w-full whitespace-no-wrap bg-white table-striped relative">
          <thead>
            <tr className="text-left">
              {headings?.map((heading) => (
                <th
                  key={heading.key}
                  className={`bg-gray-100 sticky top-0 border-b border-gray-200 px-6 py-2 text-gray-600 font-bold tracking-wider uppercase text-xs ${heading.key}`}
                >
                  {heading.value}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {KYCDocs?.data?.map((kyc, i) => (
              <tr key={kyc._id}>
                <td className="bg-gray-100 sticky top-0 border-b border-gray-200 px-6 py-2 text-gray-600 font-bold tracking-wider uppercase text-xs">
                  {i + 1}
                </td>
                <td className="bg-gray-100 sticky top-0 border-b border-gray-200 px-6 py-2 text-gray-600 font-bold tracking-wider uppercase text-xs">
                  <p className="text-green-600 capitalize">
                    {user.map(
                      (ele) => ele._id === kyc.userId.toString() && ele.fullName
                    )}
                  </p>
                  <span className="opacity-50">{kyc.userId}</span>
                </td>
                <td className="bg-gray-100 sticky top-0 border-b border-gray-200 px-6 py-2 text-gray-600 font-bold tracking-wider uppercase text-xs">
                  {kyc.verification_type}
                </td>
                <td className="bg-gray-100 sticky top-0 border-b border-gray-200 px-6 py-2 text-gray-600 font-bold tracking-wider uppercase text-xs">
                  <img
                    src={kyc.front_img}
                    alt={kyc.front_img}
                    className="w-[100px] h-[100px] rounded-full cursor-pointer"
                    onClick={() => {
                      popUpImg(kyc.front_img);
                    }}
                  />
                </td>
                <td className="bg-gray-100 sticky top-0 border-b border-gray-200 px-6 py-2 text-gray-600 font-bold tracking-wider uppercase text-xs">
                  <img
                    src={kyc.back_img}
                    alt={kyc.back_img}
                    className="w-[100px] h-[100px] rounded-full cursor-pointer"
                    onClick={() => {
                      popUpImg(kyc.back_img);
                    }}
                  />
                </td>

                <td className="bg-gray-100 sticky top-0 border-b border-gray-200 px-6 py-2 text-gray-600 font-bold tracking-wider uppercase text-xs">
                  <p
                    className={` ${
                      kyc.isVerify
                        ? "m-1 bg-yellow-100 text-yellow-900 *: p-1 rounded-md px-2 "
                        : "m-1 bg-red-950 text-red-600 *: p-1 rounded-md px-2"
                    } p-1 py-3   text-center`}
                  >
                    {kyc.isVerify ? "Success" : "Pending"}
                  </p>
                </td>

                <td className="bg-gray-100 sticky top-0 border-b border-gray-200 px-6 py-2 text-gray-600 font-bold tracking-wider uppercase text-xs">
                  {kyc.created_at}
                </td>
                <td className="bg-gray-100 sticky top-0 border-b border-gray-200 px-6 py-2 text-gray-600 font-bold tracking-wider uppercase text-xs">
                  {kyc.isVerify ? (
                    <p className="text-green-500 cursor-not-allowed mt-3">
                      Approved
                    </p>
                  ) : (
                    <p
                      className="bg-blue-600 text-white p-2 rounded-md cursor-pointer"
                      onClick={() => updateUserKYC(kyc.userId)}
                    >
                      Approved Now
                    </p>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default KYCList;
