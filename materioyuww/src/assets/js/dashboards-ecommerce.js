'use strict';

(function () {
  // Initialize DataTable
  const productsTable = $('#productsTable').DataTable({
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
            exportOptions: { columns: [0, 2, 3, 4, 5, 6] },
            customize: function (win) {
              $(win.document.body).css('font-size', '10pt');
              $(win.document.body).find('table').addClass('compact').css('font-size', 'inherit');
            }
          },
          {
            extend: 'csv',
            text: '<i class="bx bx-file me-2" ></i>Csv',
            className: 'dropdown-item',
            exportOptions: { columns: [0, 2, 3, 4, 5, 6] }
          },
          {
            extend: 'excel',
            text: '<i class="bx bxs-file me-2" ></i>Excel',
            className: 'dropdown-item',
            exportOptions: { columns: [0, 2, 3, 4, 5, 6] }
          },
          {
            extend: 'pdf',
            text: '<i class="bx bxs-file-pdf me-2" ></i>Pdf',
            className: 'dropdown-item',
            exportOptions: { columns: [0, 2, 3, 4, 5, 6] }
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

  // Add Product
  $('#addProductForm').on('submit', function(e) {
    e.preventDefault();
    const formData = new FormData(this);
    
    $.ajax({
      url: '/ecommerce/products/add/',
      type: 'POST',
      data: formData,
      processData: false,
      contentType: false,
      success: function(response) {
        if (response.status === 'success') {
          // Close modal
          $('#addProductModal').modal('hide');
          
          // Show success message
          toastr.success('Product added successfully');
          
          // Reload table
          productsTable.ajax.reload();
          
          // Reset form
          $('#addProductForm')[0].reset();
          $('#addProductForm').removeClass('was-validated');
        } else {
          toastr.error(response.message || 'Error adding product');
        }
      },
      error: function() {
        toastr.error('Error adding product');
      }
    });
  });

  // View Product
  window.viewProduct = function(id) {
    $.ajax({
      url: `/ecommerce/products/${id}/`,
      type: 'GET',
      success: function(response) {
        if (response.status === 'success') {
          const product = response.data;
          
          // Populate view modal
          $('#viewImage').attr('src', product.image);
          $('#viewName').text(product.name);
          $('#viewCategory').text(product.category);
          $('#viewPrice').text('$' + product.price.toFixed(2));
          $('#viewStock').text(product.stock);
          $('#viewStatus').text(product.status);
          $('#viewDescription').text(product.description || 'No description available');
          
          // Show modal
          $('#viewProductModal').modal('show');
        } else {
          toastr.error('Error fetching product details');
        }
      },
      error: function() {
        toastr.error('Error fetching product details');
      }
    });
  };

  // Edit Product
  window.editProduct = function(id) {
    $.ajax({
      url: `/ecommerce/products/${id}/`,
      type: 'GET',
      success: function(response) {
        if (response.status === 'success') {
          const product = response.data;
          
          // Populate edit form
          $('#editProductId').val(product.id);
          $('#editName').val(product.name);
          $('#editCategory').val(product.category);
          $('#editPrice').val(product.price);
          $('#editStock').val(product.stock);
          $('#editStatus').val(product.status);
          $('#editDescription').val(product.description);
          
          // Show modal
          $('#editProductModal').modal('show');
        } else {
          toastr.error('Error fetching product details');
        }
      },
      error: function() {
        toastr.error('Error fetching product details');
      }
    });
  };

  // Update Product
  $('#editProductForm').on('submit', function(e) {
    e.preventDefault();
    const formData = new FormData(this);
    const id = $('#editProductId').val();
    
    $.ajax({
      url: `/ecommerce/products/${id}/update/`,
      type: 'POST',
      data: formData,
      processData: false,
      contentType: false,
      success: function(response) {
        if (response.status === 'success') {
          // Close modal
          $('#editProductModal').modal('hide');
          
          // Show success message
          toastr.success('Product updated successfully');
          
          // Reload table
          productsTable.ajax.reload();
          
          // Reset form
          $('#editProductForm')[0].reset();
          $('#editProductForm').removeClass('was-validated');
        } else {
          toastr.error(response.message || 'Error updating product');
        }
      },
      error: function() {
        toastr.error('Error updating product');
      }
    });
  });

  // Delete Product
  window.deleteProduct = function(id) {
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
          url: `/ecommerce/products/${id}/delete/`,
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
                text: 'Product has been deleted.',
                customClass: {
                  confirmButton: 'btn btn-success'
                }
              });
              
              // Reload table
              productsTable.ajax.reload();
            } else {
              toastr.error(response.message || 'Error deleting product');
            }
          },
          error: function() {
            toastr.error('Error deleting product');
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