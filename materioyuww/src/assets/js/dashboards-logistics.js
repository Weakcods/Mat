'use strict';

// Initialize DataTables
$(function () {
  // Shipments Table
  const shipmentsTable = $('#shipmentsTable');
  if (shipmentsTable.length) {
    shipmentsTable.DataTable({
      responsive: true,
      order: [[5, 'desc']], // Sort by estimated delivery date
      columnDefs: [
        {
          targets: -1,
          orderable: false
        }
      ]
    });
  }

  // Inventory Table
  const inventoryTable = $('#inventoryTable');
  if (inventoryTable.length) {
    inventoryTable.DataTable({
      responsive: true,
      order: [[3, 'desc']], // Sort by quantity
      columnDefs: [
        {
          targets: -1,
          orderable: false
        }
      ]
    });
  }

  // Deliveries Table
  const deliveriesTable = $('#deliveriesTable');
  if (deliveriesTable.length) {
    deliveriesTable.DataTable({
      responsive: true,
      order: [[3, 'desc']], // Sort by date
      columnDefs: [
        {
          targets: -1,
          orderable: false
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