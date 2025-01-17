/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import {
  Alert,
} from "react-bootstrap";
import ContentLoader from "react-content-loader";
// import Select from "react-select";
// import axiosClient from "../../axiosClientOffline";
import Select from "react-select";
import axiosClientBuffer from "../../axiosClientOfflineBuffer";
// import axiosClientPython from "../../axiosClientPython";

export default function UserBufferDay() {
  const [users, setUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  
  useEffect(() => {
    fetchUser();
  }, []);
  const filteredPlans = [
  
    {
      value: "active",
      label: "active",
    },
    
  ];

  const fetchUser = async () => {
    try {
      const response = await axiosClientBuffer.post(`buffer_for_day`);
      console.log(response);
      setUser(response.data);
      // console.log(response.data);
      if (window.location.search.includes("update")) {
        setSuccessMessage("تم تحديث المستخدم بنجاح");
        window.history.replaceState(null, "", window.location.pathname);
      } else if (window.location.search.includes("added")) {
        setSuccessMessage("تم اضافة المستخدم بنجاح");
        window.history.replaceState(null, "", window.location.pathname);
      } else if (window.location.search.includes("Buy")) {
        setSuccessMessage("تم بيع العملة بنجاح");
        window.history.replaceState(null, "", window.location.pathname);
      } else if (window.location.search.includes("notfi")) {
        setSuccessMessage("تم ارسال الاشعار بنجاح");
        window.history.replaceState(null, "", window.location.pathname);
      }
    } catch (err) {
      console.log(err);
      if (err.message == "Network Error") {
        setErrorMessage(`الانترنت لا يعمل`);
      } else {
        setErrorMessage(`Error fetching User : ${err.message}`);
      }
    } finally {
      // User;
      setLoading(false);
    }
  };
  const fetchUserSelected = async (id) => {
    console.log(id);
    if (id == null) {
      fetchUser();
    } else {
      try {
        const response = await axiosClientBuffer.post(`buffer_for_day`, {
          active: id,
        });
        console.log(response);
        setUser(response.data);
        console.log(response.data);
        if (window.location.search.includes("update")) {
          setSuccessMessage("تم تحديث المستخدم بنجاح");
          window.history.replaceState(null, "", window.location.pathname);
        } else if (window.location.search.includes("added")) {
          setSuccessMessage("تم اضافة المستخدم بنجاح");
          window.history.replaceState(null, "", window.location.pathname);
        } else if (window.location.search.includes("Buy")) {
          setSuccessMessage("تم بيع العملة بنجاح");
          window.history.replaceState(null, "", window.location.pathname);
        } else if (window.location.search.includes("notfi")) {
          setSuccessMessage("تم ارسال الاشعار بنجاح");
          window.history.replaceState(null, "", window.location.pathname);
        }
      } catch (err) {
        console.log(err);
        if (err.message == "Network Error") {
          setErrorMessage(`الانترنت لا يعمل`);
        } else {
          setErrorMessage(`Error fetching User : ${err.message}`);
        }
      } finally {
        // User;
        setLoading(false);
      }
    }
  };
  const Loader = (props) => {
    const random = Math.random() * (1 - 0.7) + 0.7;
    return (
      <ContentLoader
        height={50}
        width={1060}
        speed={2}
        primarycolor="#333"
        secondarycolor="#999"
        {...props}
      >
        <rect x="10" y="13" rx="6" ry="6" width={120 * random} height="12" />
        <rect x="159" y="13" rx="6" ry="6" width={40 * random} height="12" />
        <rect x="250" y="13" rx="6" ry="6" width={40 * random} height="12" />
        <rect x="360" y="13" rx="6" ry="6" width={40 * random} height="12" />
        <rect x="430" y="13" rx="6" ry="6" width={60 * random} height="12" />
        <rect x="530" y="13" rx="6" ry="6" width={100 * random} height="12" />
        <rect x="650" y="13" rx="6" ry="6" width={100 * random} height="12" />

        <rect x="0" y="39" rx="6" ry="6" width="1090" height=".3" />
      </ContentLoader>
    );
  };

  return (
    <>

      {successMessage && (
        <Alert
          variant="success"
          onClose={() => setSuccessMessage("")}
          style={{ width: "max-content" }}
          dismissible
        >
          {successMessage}
        </Alert>
      )}

      {errorMessage && (
        <Alert
          variant="danger"
          onClose={() => setErrorMessage("")}
          style={{ width: "max-content" }}
          dismissible
        >
          {errorMessage}
        </Alert>
      )}

      {loading ? (
        <>
          {Array(10)
            .fill("")
            .map((e, i) => (
              <Loader key={i} style={{ opacity: Number(2 / i).toFixed(1) }} />
            ))}
        </>
      ) : (
        <>
          <div className="table-responsive min-h-[100vh]">
          <div className="d-flex flex-row justify-content-between mb-3 align-items-center">
              <div className="d-flex flex-row">
                <Select
                  options={filteredPlans}
                  className="my-react-select-container w-100 ml-2"
                  classNamePrefix="my-react-select"
                  isClearable
                  isSearchable
                  placeholder="Select plan"
                  onChange={(filteredPlans) => {
                    fetchUserSelected(
                      filteredPlans ? filteredPlans.value : null
                    );
                  }}
                />
              </div>
            </div>
            <table className="table table-borderless pr-2">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">buffer name</th>
                  <th scope="col">count_user</th>
                  <th scope="col">precantage</th>
                  <th scope="col">money_for_buffers</th>
                  <th scope="col">for_day</th>
                  <th scope="col">active</th>
                  {/* <th scope="col" style={{ textAlign: "center" }}>
                    الأوامر
                  </th> */}
                </tr>
              </thead>
              <tbody>
                {users && users.length > 0
                  ? users.map((user, index) => (
                      <tr key={index + 1}>
                        <th scope="row">{index + 1}</th>
                        <td>{user.buffer_id}</td>
                        <td>{user.count_user}</td>
                        <td>{user.precantage}</td>
                        <td>{user.money_for_buffers}</td>
                        <td style={{ textAlign: "center" }}>
                          {user.for_day ? user.for_day : "-"}
                        </td>
                        <td>{user.active == 1 ? <p className="text-green-500">Active</p> :<p className="text-red-500">Inactive</p>}</td>
                        {/* <td style={{ textAlign: "center" }}>
                          <DropdownButton
                            as={ButtonGroup}
                            title="أوامر"
                            id="dropdown-button-dark-example1"
                            menuVariant="dark"
                          >
                            {/* <>
                                <Dropdown.Item
                                  className="flex justify-center hover:text-sky-500"
                                  eventKey="1"
                                  onClick={() => handleShow(user)}
                                >
                                  Edit
                                </Dropdown.Item>
                                <Dropdown.Item
                                  className="flex justify-center hover:text-red-500"
                                  eventKey="2"
                                  onClick={() => handleConfirmDelete(user.id)}
                                >
                                  Delete
                                </Dropdown.Item>
                              </> */}

                            {/* <Dropdown.Item
                              eventKey="3"
                              className="flex justify-center hover:text-yellow-500"
                              onClick={() => handleShowDetails(user)}
                            >
                              تفاصيله
                            </Dropdown.Item>
                            <Dropdown.Item
                              eventKey="3"
                              className="flex justify-center hover:text-yellow-500"
                              onClick={() => handleShowDetailsWeb(user)}
                            >
                              تفاصيل المعاملات
                            </Dropdown.Item> */}
                            {/* {id != "682" ? (
                            <Dropdown.Item
                                  eventKey="5"
                                  className="flex justify-center hover:text-green-500"
                                  onClick={() => handleConfirmNotification(user)}
                                >
                                ارسال اشعار  
                                </Dropdown.Item>
                            ) : null} */}
                            {/* {state == "super_admin" && id != "682" ? (
                              <>
                                <Dropdown.Item
                                  eventKey="4"
                                  className="flex justify-center hover:text-green-500"
                                  onClick={() => handleConfirmPan(user)}
                                >
                                  ban
                                </Dropdown.Item>
                                <Dropdown.Item
                                  eventKey="5"
                                  className="flex justify-center hover:text-green-500"
                                  onClick={() => handleConfirmBot(user)}
                                >
                                  Create Bot
                                </Dropdown.Item>
                                
                              </>
                            ) : null} 
                          </DropdownButton>
                        </td> */}
                      </tr>
                    ))
                  : null}
              </tbody>
            </table>
          </div>
        </>
      )}
    </>
  );
}
