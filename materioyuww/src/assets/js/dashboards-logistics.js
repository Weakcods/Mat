'use strict';

// Initialize DataTables
$(function () {
  // Shipments Table
  const shipmentsTable = $('#shipmentsTable');
  if (shipmentsTable.length) {
    shipmentsTable.DataTable({
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
  }

  // Inventory Table
  const inventoryTable = $('#inventoryTable');
  if (inventoryTable.length) {
    inventoryTable.DataTable({
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
  }

  // Deliveries Table
  const deliveriesTable = $('#deliveriesTable');
  if (deliveriesTable.length) {
    deliveriesTable.DataTable({
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
  }
});

// Form Validation
(function () {
  'use strict';

  // Fetch all forms we want to apply validation to
  const forms = document.querySelectorAll('.needs-validation');

  // Loop over them and prevent submission
  Array.prototype.slice.call(forms).forEach(function (form) {
    form.addEventListener('submit', function (event) {
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      }
      form.classList.add('was-validated');
    }, false);
  });
})();

// Status Update Handlers
function updateShipmentStatus(shipmentId, status) {
  $.ajax({
    url: `/logistics/update-shipment-status/${shipmentId}/`,
    method: 'POST',
    data: {
      status: status,
      csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val()
    },
    success: function(response) {
      if (response.status === 'success') {
        // Show success toast
        toastr.success('Shipment status updated successfully');
        // Reload the page to reflect changes
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        toastr.error('Error updating shipment status');
      }
    },
    error: function() {
      toastr.error('Error updating shipment status');
    }
  });
}

function updateInventoryStatus(inventoryId, status) {
  $.ajax({
    url: `/logistics/update-inventory-status/${inventoryId}/`,
    method: 'POST',
    data: {
      status: status,
      csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val()
    },
    success: function(response) {
      if (response.status === 'success') {
        toastr.success('Inventory status updated successfully');
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        toastr.error('Error updating inventory status');
      }
    },
    error: function() {
      toastr.error('Error updating inventory status');
    }
  });
}

function updateDeliveryStatus(deliveryId, status) {
  $.ajax({
    url: `/logistics/update-delivery-status/${deliveryId}/`,
    method: 'POST',
    data: {
      status: status,
      csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val()
    },
    success: function(response) {
      if (response.status === 'success') {
        toastr.success('Delivery status updated successfully');
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        toastr.error('Error updating delivery status');
      }
    },
    error: function() {
      toastr.error('Error updating delivery status');
    }
  });
}

// Initialize tooltips
$(function () {
  $('[data-bs-toggle="tooltip"]').tooltip();
});

(function () {
  // Add Shipment
  $('#addShipmentForm').on('submit', function(e) {
    e.preventDefault();
    const formData = new FormData(this);
    
    $.ajax({
      url: '/logistics/shipments/add/',
      type: 'POST',
      data: formData,
      processData: false,
      contentType: false,
      success: function(response) {
        if (response.status === 'success') {
          // Close modal
          $('#addShipmentModal').modal('hide');
          
          // Show success message
          toastr.success('Shipment added successfully');
          
          // Reload table
          shipmentsTable.ajax.reload();
          
          // Reset form
          $('#addShipmentForm')[0].reset();
          $('#addShipmentForm').removeClass('was-validated');
        } else {
          toastr.error(response.message || 'Error adding shipment');
        }
      },
      error: function() {
        toastr.error('Error adding shipment');
      }
    });
  });

  // Add Inventory Item
  $('#addInventoryForm').on('submit', function(e) {
    e.preventDefault();
    const formData = new FormData(this);
    
    $.ajax({
      url: '/logistics/inventory/add/',
      type: 'POST',
      data: formData,
      processData: false,
      contentType: false,
      success: function(response) {
        if (response.status === 'success') {
          // Close modal
          $('#addInventoryModal').modal('hide');
          
          // Show success message
          toastr.success('Inventory item added successfully');
          
          // Reload table
          inventoryTable.ajax.reload();
          
          // Reset form
          $('#addInventoryForm')[0].reset();
          $('#addInventoryForm').removeClass('was-validated');
        } else {
          toastr.error(response.message || 'Error adding inventory item');
        }
      },
      error: function() {
        toastr.error('Error adding inventory item');
      }
    });
  });

  // Add Delivery Record
  $('#addDeliveryForm').on('submit', function(e) {
    e.preventDefault();
    const formData = new FormData(this);
    
    $.ajax({
      url: '/logistics/deliveries/add/',
      type: 'POST',
      data: formData,
      processData: false,
      contentType: false,
      success: function(response) {
        if (response.status === 'success') {
          // Close modal
          $('#addDeliveryModal').modal('hide');
          
          // Show success message
          toastr.success('Delivery record added successfully');
          
          // Reload table
          deliveriesTable.ajax.reload();
          
          // Reset form
          $('#addDeliveryForm')[0].reset();
          $('#addDeliveryForm').removeClass('was-validated');
        } else {
          toastr.error(response.message || 'Error adding delivery record');
        }
      },
      error: function() {
        toastr.error('Error adding delivery record');
      }
    });
  });

  // Delete Shipment
  window.deleteShipment = function(id) {
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
          url: `/logistics/shipments/${id}/delete/`,
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
                text: 'Shipment has been deleted.',
                customClass: {
                  confirmButton: 'btn btn-success'
                }
              });
              
              // Reload table
              shipmentsTable.ajax.reload();
            } else {
              toastr.error(response.message || 'Error deleting shipment');
            }
          },
          error: function() {
            toastr.error('Error deleting shipment');
          }
        });
      }
    });
  };

  // Delete Inventory Item
  window.deleteInventoryItem = function(id) {
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
          url: `/logistics/inventory/${id}/delete/`,
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
                text: 'Inventory item has been deleted.',
                customClass: {
                  confirmButton: 'btn btn-success'
                }
              });
              
              // Reload table
              inventoryTable.ajax.reload();
            } else {
              toastr.error(response.message || 'Error deleting inventory item');
            }
          },
          error: function() {
            toastr.error('Error deleting inventory item');
          }
        });
      }
    });
  };

  // Delete Delivery Record
  window.deleteDeliveryRecord = function(id) {
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
          url: `/logistics/deliveries/${id}/delete/`,
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
                text: 'Delivery record has been deleted.',
                customClass: {
                  confirmButton: 'btn btn-success'
                }
              });
              
              // Reload table
              deliveriesTable.ajax.reload();
            } else {
              toastr.error(response.message || 'Error deleting delivery record');
            }
          },
          error: function() {
            toastr.error('Error deleting delivery record');
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