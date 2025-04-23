import React, { useEffect, useState } from "react";
import Navbar from "../navbar/Navbar";
import "./CustomerManagement.css";
import axios from "axios";
import { Alert, Snackbar, Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const CustomerManagement = () => {
  // Load Customer Table
  const [customerList, setCustomerList] = useState([]);
  const loadCustomer = async () => {
    await axios
      .get("http://localhost:8080/api/v1/customer/getAll")
      .then((response) => {
        setCustomerList(response.data);
      });
  };
  useEffect(() => {
    loadCustomer();
  }, []);

  //Update Customer
  const [open, setOpen] = useState(false);
  const [updatingCustomer, setupdatingCustomer] = useState({});

  // Dynamically changing the input value in text filed
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setupdatingCustomer((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // edit button clicking function
  const handleEditCustomer = (customer) => {
    console.log(customer);
    setupdatingCustomer(customer);
    setOpen(true);
  };

  // Alert Component For Update
  const [updateResponse, setUpdateResponse] = useState("");
  const [alertUpdate, setalertUpdate] = useState(false);
  const handleUpdateClose = () => setalertUpdate(false);

  // Alert Component For Delete
  const [deleteResponse, setDeleteResponse] = useState("");
  const [alertDelete, setalertDelete] = useState(false);
  const handleDeleteClose = () => setalertDelete(false);

  //Calling the update API
  const handleUpdateSubmission = async () => {
    await axios
      .put("http://localhost:8080/api/v1/customer/update", updatingCustomer)
      .then((response) => {
        if (response.data === "Customer Update Success") {
          setalertUpdate(true);
          setUpdateResponse(response.data);
          loadCustomer();
        }
      });
  };

  // MUI Component Closing Function (closing an click the close icon) - Updating Customer
  const handleClose = () => {
    setOpen(false);
  };

  // Delete Customer
  const handleDeleteCustomer = async (customerId) => {
    await axios
      .delete(`http://localhost:8080/api/v1/customer/delete/${customerId}`)
      .then((response) => {
        if (response.data === "Customer Delete Success") {
          setalertDelete(true);
          setDeleteResponse(response.data);
          loadCustomer();
        }
      });
  };

  // Add Customer
  const [newCustomer, setnewCustomer] = useState({
    name: "",
    contactNumber: "",
    address: "",
  });

  // add customer alert component
  const [savedAlert, setSavedAlert] = useState(false);
  const [savedResponse, setSavedResponse] = useState("");
  const handleSavedClose = () => setSavedAlert(false);

  const handlenewCustomer = (e) => {
    setnewCustomer({
      ...newCustomer,
      [e.target.name]: e.target.value,
    });
  };

  // add customer API call
  const handleAddCustomer = async (event) => {
    event.preventDefault();

    await axios
      .post("http://localhost:8080/api/v1/customer/add", newCustomer)
      .then((response) => {
        if (response.data === "Customer Saved Success") {
          setSavedAlert(true);
          setSavedResponse(response.data);
          loadCustomer();
        }
      });
  };

  // search customer
  const [searchCustomer, setSearchCustomer] = useState("");
  const [filteredCustomers, setfilteredCustomers] = useState(customerList);

  useEffect(() => {
    if (searchCustomer.trim() === "") {
      setfilteredCustomers(customerList);
    } else {
      setfilteredCustomers(
        filteredCustomers.filter((customer) =>
          customer.name
            .toLowerCase()
            .includes(searchCustomer.toLowerCase())
        )
      );
    }
  }, [searchCustomer, customerList]);

  return (
    <div>
      <div className="customer-body">
        <header className="customer-header">
          <div className="customer-header-container">
            <div className="customer-logo-container">
              <div className="customer-logo-icon">
                <i className="customer-fas fa-burger">
                  MOS Burger Customer Management
                </i>
              </div>
              {/* <h3 className="customer-logo-text">MOS Burger Customer Management</h3> */}
            </div>
          </div>
        </header>
        <Navbar />

        <main className="customer-main-container">
          <div className="customer-content-card">
            <div className="customer-card-content">
              <div className="customer-section-header">
                <h2 className="customer-section-title">Customer Management</h2>
                <button className="customer-add-btn" id="addCustomerBtn">
                  <i className="customer-fas fa-plus"></i>
                  Add New Customer
                </button>
              </div>

              {/* <!-- Search --> */}
              <div className="customer-search-container">
                <div className="customer-search-input-wrapper">
                  <i className="customer-fas fa-search search-icon"></i>
                  <input
                    type="text"
                    className="customer-search-input"
                    id="customerSearch"
                    placeholder="Search customer by name, phone, or email..."
                    value={searchCustomer}
                    onChange={(e) => setSearchCustomer(e.target.value)}
                  />
                </div>
              </div>

              {/* <!-- Add/Edit Customer Form (Hidden by default) --> */}
              <div
                className="customer-form-container"
                id="customerFormContainer"
                /* style="display: none;" */
              >
                <div className="customer-form-header">
                  <h3 className="customer-form-title" id="formTitle">
                    Add New Customer
                  </h3>
                  <button className="customer-close-btn" id="closeFormBtn">
                    <i className="customer-fas fa-times"></i>
                  </button>
                </div>
                <div className="customer-form-content">
                  <div className="customer-form-grid">
                    <div className="customer-form-group">
                      <label className="customer-form-label">
                        Name <span className="customer-required">*</span>
                      </label>
                      <div className="customer-input-with-icon">
                        <i className="customer-fas fa-user input-icon"></i>
                        <input
                          type="text"
                          className="customer-form-input"
                          id="name"
                          placeholder="Full Name"
                          name="name"
                          onChange={handlenewCustomer}
                        />
                      </div>
                    </div>
                    <div className="customer-form-group">
                      <label className="customer-form-label">
                        Phone Number{" "}
                        <span className="customer-required">*</span>
                      </label>
                      <div className="customer-input-with-icon">
                        <i className="customer-fas fa-phone input-icon"></i>
                        <input
                          type="text"
                          className="customer-form-input"
                          id="contactNumber"
                          placeholder="Phone Number"
                          name="contactNumber"
                          onChange={handlenewCustomer}
                        />
                      </div>
                    </div>
                    <div className="customer-form-group">
                      <label className="customer-form-label">Address</label>
                      <div className="customer-input-with-icon">
                        <i className="customer-fas fa-map-marker-alt input-icon"></i>
                        <input
                          type="text"
                          className="customer-form-input"
                          id="address"
                          placeholder="Full Address"
                          name="address"
                          onChange={handlenewCustomer}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="customer-form-actions">
                    <button
                      className="customer-cancel-btn"
                      id="cancelBtn"
                      /* style="display: none;" */
                    >
                      Cancel
                    </button>
                    <button
                      className="customer-save-btn"
                      id="saveCustomerBtn"
                      onClick={handleAddCustomer}
                    >
                      Add Customer
                    </button>
                  </div>
                </div>
              </div>

              {/* <!-- Customers Table --> */}
              <div className="customer-table-container">
                <table className="customer-customers-table">
                  <thead>
                    <tr>
                      <th>Customer Name</th>
                      <th>Contact Information</th>
                      <th>Customer Address</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody id="customersTableBody">
                    {filteredCustomers.map((customer) => (
                      <tr key={customer.customerId}>
                        <td>{customer.name}</td>
                        <td>{customer.contactNumber}</td>
                        <td>{customer.address}</td>
                        <td>
                          <Stack direction="row" spacing={2}>
                            <Button
                              onClick={() => handleEditCustomer(customer)}
                              variant="contained"
                              startIcon={<EditIcon />}
                            ></Button>
                            <Button
                              onClick={() =>
                                handleDeleteCustomer(customer.customerId)
                              }
                              variant="contained"
                              color="error"
                              endIcon={<PersonRemoveIcon />}
                            ></Button>
                          </Stack>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {customerList.length === 0 && (
                  <div
                    className="customer-empty-state"
                    id="emptyState"
                    /* style="display: none;" */
                  >
                    <div className="customer-empty-icon">
                      <i className="customer-fas fa-users-slash"></i>
                    </div>
                    <h3 className="customer-empty-title">No customers found</h3>
                    <p className="customer-empty-description">
                      Get started by adding a new customer.
                    </p>
                    <button
                      className="customer-add-btn"
                      id="addCustomerEmptyBtn"
                    >
                      <i className="customer-fas fa-plus"></i>
                      Add New Customer
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>

        {/* Update Alert */}
        <Snackbar
          open={alertUpdate}
          autoHideDuration={3000}
          onClose={handleUpdateClose}
        >
          <Alert onClose={handleUpdateClose} severity="success">
            {updateResponse}
          </Alert>
        </Snackbar>

        {/* Delete Alert */}
        <Snackbar
          open={alertDelete}
          autoHideDuration={3000}
          onClose={handleDeleteClose}
        >
          <Alert onClose={handleDeleteClose} severity="success">
            {deleteResponse}
          </Alert>
        </Snackbar>

        {/* Save Alert */}
        <Snackbar
          open={savedAlert}
          autoHideDuration={3000}
          onClose={handleSavedClose}
        >
          <Alert onClose={handleSavedClose} severity="success">
            {savedResponse}
          </Alert>
        </Snackbar>

        {/* Delete Alert */}
        <Snackbar
          open={alertDelete}
          autoHideDuration={3000}
          onClose={handleDeleteClose}
        >
          <Alert onClose={handleDeleteClose} severity="success">
            {deleteResponse}
          </Alert>
        </Snackbar>

        {/* MUI Dialog */}
        <Dialog
          open={open}
          onClose={handleClose}
          slotProps={{
            paper: {
              component: "form",
              onSubmit: (event) => {
                event.preventDefault();
                const formData = new FormData(event.currentTarget);
                const formJson = Object.fromEntries(formData.entries());
                console.log(formJson);
                handleUpdateSubmission();
                handleClose();
              },
            },
          }}
        >
          {/* Updating Customer Details MUI Dialog */}
          <DialogTitle>Update Customer</DialogTitle>
          <DialogContent>
            <DialogContentText>Update the Customer Details</DialogContentText>
            <TextField
              autoFocus
              required
              margin="dense"
              id="customerId"
              name="customerId"
              label="Customer ID"
              type="text"
              fullWidth
              variant="standard"
              value={updatingCustomer.customerId}
            />
            <TextField
              autoFocus
              required
              margin="dense"
              id="name"
              name="name"
              label="Customer Name"
              type="text"
              fullWidth
              variant="standard"
              value={updatingCustomer.name}
              onChange={handleInputChange}
            />
            <TextField
              autoFocus
              required
              margin="dense"
              id="contactNumber"
              name="contactNumber"
              label="Contact Number"
              type="number"
              fullWidth
              variant="standard"
              value={updatingCustomer.contactNumber}
              onChange={handleInputChange}
            />
            <TextField
              autoFocus
              required
              margin="dense"
              id="address"
              name="address"
              label="Address"
              type="text"
              fullWidth
              variant="standard"
              value={updatingCustomer.address}
              onChange={handleInputChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Update</Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default CustomerManagement;
