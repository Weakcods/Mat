'use strict';

(function () {
  // Initialize DataTable
  const customersTable = $('#customersTable').DataTable({
    responsive: true,
    order: [[0, 'desc']],
    dom: '<"row"<"col-sm-12 col-md-6"l><"col-sm-12 col-md-6 d-flex justify-content-center justify-content-md-end"f>>t<"row"<"col-sm-12 col-md-6"i><"col-sm-12 col-md-6"p>>',
    language: {
      sLengthMenu: '_MENU_',
      search: 'Search',
      searchPlaceholder: 'Search..'
    },
    buttons: [
      {
        extend: 'collection',
        className: 'btn btn-label-secondary dropdown-toggle me-2',
        text: '<i class="bx bx-export me-sm-1"></i> <span class="d-none d-sm-inline-block">Export</span>',
        buttons: [
          {
            extend: 'print',
            text: '<i class="bx bx-printer me-2" ></i>Print',
            className: 'dropdown-item',
            exportOptions: { columns: [0, 1, 2, 3, 4, 5] },
            customize: function (win) {
              $(win.document.body).css('font-size', '10pt');
              $(win.document.body).find('table').addClass('compact').css('font-size', 'inherit');
            }
          },
          {
            extend: 'csv',
            text: '<i class="bx bx-file me-2" ></i>Csv',
            className: 'dropdown-item',
            exportOptions: { columns: [0, 1, 2, 3, 4, 5] }
          },
          {
            extend: 'excel',
            text: '<i class="bx bxs-file me-2" ></i>Excel',
            className: 'dropdown-item',
            exportOptions: { columns: [0, 1, 2, 3, 4, 5] }
          },
          {
            extend: 'pdf',
            text: '<i class="bx bxs-file-pdf me-2" ></i>Pdf',
            className: 'dropdown-item',
            exportOptions: { columns: [0, 1, 2, 3, 4, 5] }
          }
        ]
      }
    ]
  });

  // Form Validation
  const forms = document.querySelectorAll('.needs-validation');
  Array.prototype.slice.call(forms).forEach(function (form) {
    form.addEventListener('submit', function (event) {
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      }
      form.classList.add('was-validated');
    }, false);
  });

  // Add Customer
  $('#addCustomerForm').on('submit', function(e) {
    e.preventDefault();
    const formData = new FormData(this);
    
    $.ajax({
      url: '/crm/customers/add/',
      type: 'POST',
      data: formData,
      processData: false,
      contentType: false,
      success: function(response) {
        if (response.status === 'success') {
          // Close modal
          $('#addCustomerModal').modal('hide');
          
          // Show success message
          toastr.success('Customer added successfully');
          
          // Reload table
          customersTable.ajax.reload();
          
          // Reset form
          $('#addCustomerForm')[0].reset();
          $('#addCustomerForm').removeClass('was-validated');
        } else {
          toastr.error(response.message || 'Error adding customer');
        }
      },
      error: function() {
        toastr.error('Error adding customer');
      }
    });
  });

  // View Customer
  window.viewCustomer = function(id) {
    $.ajax({
      url: `/crm/customers/${id}/`,
      type: 'GET',
      success: function(response) {
        if (response.status === 'success') {
          const customer = response.data;
          
          // Populate view modal
          $('#viewName').text(customer.name);
          $('#viewEmail').text(customer.email);
          $('#viewPhone').text(customer.phone);
          $('#viewStatus').text(customer.status);
          $('#viewNotes').text(customer.notes || 'No notes');
          $('#viewLastContact').text(new Date(customer.last_contact).toLocaleDateString());
          
          // Show modal
          $('#viewCustomerModal').modal('show');
        } else {
          toastr.error('Error fetching customer details');
        }
      },
      error: function() {
        toastr.error('Error fetching customer details');
      }
    });
  };

  // Edit Customer
  window.editCustomer = function(id) {
    $.ajax({
      url: `/crm/customers/${id}/`,
      type: 'GET',
      success: function(response) {
        if (response.status === 'success') {
          const customer = response.data;
          
          // Populate edit form
          $('#editCustomerId').val(customer.id);
          $('#editName').val(customer.name);
          $('#editEmail').val(customer.email);
          $('#editPhone').val(customer.phone);
          $('#editStatus').val(customer.status);
          $('#editNotes').val(customer.notes);
          
          // Show modal
          $('#editCustomerModal').modal('show');
        } else {
          toastr.error('Error fetching customer details');
        }
      },
      error: function() {
        toastr.error('Error fetching customer details');
      }
    });
  };

  // Update Customer
  $('#editCustomerForm').on('submit', function(e) {
    e.preventDefault();
    const formData = new FormData(this);
    const id = $('#editCustomerId').val();
    
    $.ajax({
      url: `/crm/customers/${id}/update/`,
      type: 'POST',
      data: formData,
      processData: false,
      contentType: false,
      success: function(response) {
        if (response.status === 'success') {
          // Close modal
          $('#editCustomerModal').modal('hide');
          
          // Show success message
          toastr.success('Customer updated successfully');
          
          // Reload table
          customersTable.ajax.reload();
          
          // Reset form
          $('#editCustomerForm')[0].reset();
          $('#editCustomerForm').removeClass('was-validated');
        } else {
          toastr.error(response.message || 'Error updating customer');
        }
      },
      error: function() {
        toastr.error('Error updating customer');
      }
    });
  });

  // Delete Customer
  window.deleteCustomer = function(id) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      customClass: {
        confirmButton: 'btn btn-danger me-3',
        cancelButton: 'btn btn-secondary'
      },
      buttonsStyling: false
    }).then((result) => {
      if (result.isConfirmed) {
        $.ajax({
          url: `/crm/customers/${id}/delete/`,
          type: 'POST',
          data: {
            'csrfmiddlewaretoken': $('input[name=csrfmiddlewaretoken]').val()
          },
          success: function(response) {
            if (response.status === 'success') {
              // Show success message
              Swal.fire({
                icon: 'success',
                title: 'Deleted!',
                text: 'Customer has been deleted.',
                customClass: {
                  confirmButton: 'btn btn-success'
                }
              });
              
              // Reload table
              customersTable.ajax.reload();
            } else {
              toastr.error(response.message || 'Error deleting customer');
            }
          },
          error: function() {
            toastr.error('Error deleting customer');
          }
        });
      }
    });
  };

  // Initialize Tooltips
  const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
  tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });

  // Initialize Toastr
  toastr.options = {
    closeButton: true,
    progressBar: true,
    positionClass: 'toast-top-right',
    timeOut: 3000
  };
})(); 