/**
 * Dashboard Analytics
 */

'use strict';

(function () {
  let cardColor, labelColor, borderColor, chartBgColor, bodyColor;

  cardColor = config.colors.cardColor;
  labelColor = config.colors.textMuted;
  borderColor = config.colors.borderColor;
  chartBgColor = config.colors.chartBgColor;
  bodyColor = config.colors.bodyColor;

  // Weekly Overview Line Chart
  // --------------------------------------------------------------------
  const weeklyOverviewChartEl = document.querySelector('#weeklyOverviewChart'),
    weeklyOverviewChartConfig = {
      chart: {
        type: 'bar',
        height: 200,
        offsetY: -9,
        offsetX: -16,
        parentHeightOffset: 0,
        toolbar: {
          show: false
        }
      },
      series: [
        {
          name: 'Sales',
          data: [32, 55, 45, 75, 55, 35, 70]
        }
      ],
      colors: [chartBgColor],
      plotOptions: {
        bar: {
          borderRadius: 8,
          columnWidth: '30%',
          endingShape: 'rounded',
          startingShape: 'rounded',
          colors: {
            ranges: [
              {
                from: 75,
                to: 80,
                color: config.colors.primary
              },
              {
                from: 0,
                to: 73,
                color: chartBgColor
              }
            ]
          }
        }
      },
      dataLabels: {
        enabled: false
      },
      legend: {
        show: false
      },
      grid: {
        strokeDashArray: 8,
        borderColor,
        padding: {
          bottom: -10
        }
      },
      xaxis: {
        axisTicks: { show: false },
        crosshairs: { opacity: 0 },
        axisBorder: { show: false },
        categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        tickPlacement: 'on',
        labels: {
          show: false
        },
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        }
      },
      yaxis: {
        min: 0,
        max: 90,
        show: true,
        tickAmount: 3,
        labels: {
          formatter: function (val) {
            return parseInt(val) + 'K';
          },
          style: {
            fontSize: '13px',
            fontFamily: 'Inter',
            colors: labelColor
          }
        }
      },
      states: {
        hover: {
          filter: {
            type: 'none'
          }
        },
        active: {
          filter: {
            type: 'none'
          }
        }
      },
      responsive: [
        {
          breakpoint: 1500,
          options: {
            plotOptions: {
              bar: {
                columnWidth: '40%'
              }
            }
          }
        },
        {
          breakpoint: 1200,
          options: {
            plotOptions: {
              bar: {
                columnWidth: '30%'
              }
            }
          }
        },
        {
          breakpoint: 815,
          options: {
            plotOptions: {
              bar: {
                borderRadius: 5
              }
            }
          }
        },
        {
          breakpoint: 768,
          options: {
            plotOptions: {
              bar: {
                borderRadius: 10,
                columnWidth: '20%'
              }
            }
          }
        },
        {
          breakpoint: 568,
          options: {
            plotOptions: {
              bar: {
                borderRadius: 8,
                columnWidth: '30%'
              }
            }
          }
        },
        {
          breakpoint: 410,
          options: {
            plotOptions: {
              bar: {
                columnWidth: '50%'
              }
            }
          }
        }
      ]
    };
  if (typeof weeklyOverviewChartEl !== undefined && weeklyOverviewChartEl !== null) {
    const weeklyOverviewChart = new ApexCharts(weeklyOverviewChartEl, weeklyOverviewChartConfig);
    weeklyOverviewChart.render();
  }

  // Total Profit line chart
  // --------------------------------------------------------------------
  const totalProfitLineChartEl = document.querySelector('#totalProfitLineChart'),
    totalProfitLineChartConfig = {
      chart: {
        height: 90,
        type: 'line',
        parentHeightOffset: 0,
        toolbar: {
          show: false
        }
      },
      grid: {
        borderColor: labelColor,
        strokeDashArray: 6,
        xaxis: {
          lines: {
            show: true
          }
        },
        yaxis: {
          lines: {
            show: false
          }
        },
        padding: {
          top: -15,
          left: -7,
          right: 9,
          bottom: -15
        }
      },
      colors: [config.colors.primary],
      stroke: {
        width: 3
      },
      series: [
        {
          data: [0, 20, 5, 30, 15, 45]
        }
      ],
      tooltip: {
        shared: false,
        intersect: true,
        x: {
          show: false
        }
      },
      xaxis: {
        labels: {
          show: false
        },
        axisTicks: {
          show: false
        },
        axisBorder: {
          show: false
        }
      },
      yaxis: {
        labels: {
          show: false
        }
      },
      tooltip: {
        enabled: false
      },
      markers: {
        size: 6,
        strokeWidth: 3,
        strokeColors: 'transparent',
        strokeWidth: 3,
        colors: ['transparent'],
        discrete: [
          {
            seriesIndex: 0,
            dataPointIndex: 5,
            fillColor: cardColor,
            strokeColor: config.colors.primary,
            size: 6,
            shape: 'circle'
          }
        ],
        hover: {
          size: 7
        }
      },
      responsive: [
        {
          breakpoint: 1350,
          options: {
            chart: {
              height: 80
            }
          }
        },
        {
          breakpoint: 1200,
          options: {
            chart: {
              height: 100
            }
          }
        },
        {
          breakpoint: 768,
          options: {
            chart: {
              height: 110
            }
          }
        }
      ]
    };
  if (typeof totalProfitLineChartEl !== undefined && totalProfitLineChartEl !== null) {
    const totalProfitLineChart = new ApexCharts(totalProfitLineChartEl, totalProfitLineChartConfig);
    totalProfitLineChart.render();
  }

  // Sessions Column Chart
  // --------------------------------------------------------------------
  const sessionsColumnChartEl = document.querySelector('#sessionsColumnChart'),
    sessionsColumnChartConfig = {
      chart: {
        height: 90,
        parentHeightOffset: 0,
        type: 'bar',
        toolbar: {
          show: false
        }
      },
      tooltip: {
        enabled: false
      },
      plotOptions: {
        bar: {
          barHeight: '100%',
          columnWidth: '20px',
          startingShape: 'rounded',
          endingShape: 'rounded',
          borderRadius: 4,
          colors: {
            ranges: [
              {
                from: 25,
                to: 32,
                color: config.colors.danger
              },
              {
                from: 60,
                to: 75,
                color: config.colors.primary
              },
              {
                from: 45,
                to: 50,
                color: config.colors.danger
              },
              {
                from: 35,
                to: 42,
                color: config.colors.primary
              }
            ],
            backgroundBarColors: [chartBgColor, chartBgColor, chartBgColor, chartBgColor, chartBgColor],
            backgroundBarRadius: 4
          }
        }
      },
      grid: {
        show: false,
        padding: {
          top: -10,
          left: -10,
          bottom: -15
        }
      },
      dataLabels: {
        enabled: false
      },
      legend: {
        show: false
      },
      xaxis: {
        labels: {
          show: false
        },
        axisTicks: {
          show: false
        },
        axisBorder: {
          show: false
        }
      },
      yaxis: {
        labels: {
          show: false
        }
      },
      series: [
        {
          data: [30, 70, 50, 40, 60]
        }
      ],
      responsive: [
        {
          breakpoint: 1350,
          options: {
            chart: {
              height: 80
            },
            plotOptions: {
              bar: {
                columnWidth: '40%'
              }
            }
          }
        },
        {
          breakpoint: 1200,
          options: {
            chart: {
              height: 100
            },
            plotOptions: {
              bar: {
                columnWidth: '20%'
              }
            }
          }
        },
        {
          breakpoint: 768,
          options: {
            chart: {
              height: 110
            },
            plotOptions: {
              bar: {
                columnWidth: '10%'
              }
            }
          }
        },
        {
          breakpoint: 480,
          options: {
            plotOptions: {
              bar: {
                columnWidth: '20%'
              }
            }
          }
        }
      ]
    };
  if (typeof sessionsColumnChartEl !== undefined && sessionsColumnChartEl !== null) {
    const sessionsColumnChart = new ApexCharts(sessionsColumnChartEl, sessionsColumnChartConfig);
    sessionsColumnChart.render();
  }
})();

// Initialize DataTables
$(function () {
  // Initialize all DataTables
  const tables = ['#ordersTable', '#usersTable', '#revenueTable'];
  tables.forEach(table => {
    $(table).DataTable({
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
              exportOptions: { columns: [0, 1, 2, 3, 4] },
              customize: function (win) {
                $(win.document.body).css('font-size', '10pt');
                $(win.document.body).find('table').addClass('compact').css('font-size', 'inherit');
              }
            },
            {
              extend: 'csv',
              text: '<i class="bx bx-file me-2" ></i>Csv',
              className: 'dropdown-item',
              exportOptions: { columns: [0, 1, 2, 3, 4] }
            },
            {
              extend: 'excel',
              text: '<i class="bx bxs-file me-2" ></i>Excel',
              className: 'dropdown-item',
              exportOptions: { columns: [0, 1, 2, 3, 4] }
            },
            {
              extend: 'pdf',
              text: '<i class="bx bxs-file-pdf me-2" ></i>Pdf',
              className: 'dropdown-item',
              exportOptions: { columns: [0, 1, 2, 3, 4] }
            }
          ]
        }
      ]
    });
  });
});

// Initialize Revenue Chart
const revenueChartEl = document.querySelector('#revenueChart');
if (revenueChartEl) {
  const revenueData = JSON.parse(document.getElementById('revenueData').textContent);
  const revenueChart = new ApexCharts(revenueChartEl, {
    series: [{
      name: 'Revenue',
      data: revenueData
    }],
    chart: {
      height: 400,
      type: 'area',
      toolbar: {
        show: false
      },
      zoom: {
        enabled: true
      },
      animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 800,
        animateGradually: {
          enabled: true,
          delay: 150
        },
        dynamicAnimation: {
          enabled: true,
          speed: 350
        }
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth',
      width: 3,
      lineCap: 'round'
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 0.8,
        opacityFrom: 0.7,
        opacityTo: 0.2,
        stops: [0, 90, 100],
        colorStops: [
          {
            offset: 0,
            color: '#696cff',
            opacity: 1
          },
          {
            offset: 100,
            color: '#696cff',
            opacity: 0.2
          }
        ]
      }
    },
    colors: ['#696cff'],
    xaxis: {
      categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      },
      labels: {
        style: {
          fontSize: '13px',
          colors: '#a3a4cc'
        }
      },
      tooltip: {
        enabled: false
      }
    },
    yaxis: {
      labels: {
        formatter: function (value) {
          return '$' + value.toLocaleString();
        },
        style: {
          fontSize: '13px',
          colors: '#a3a4cc'
        }
      },
      title: {
        text: 'Revenue ($)',
        style: {
          fontSize: '13px',
          color: '#a3a4cc'
        }
      }
    },
    grid: {
      borderColor: '#f5f5f5',
      padding: {
        top: -15,
        bottom: -10
      },
      xaxis: {
        lines: {
          show: true
        }
      },
      yaxis: {
        lines: {
          show: true
        }
      }
    },
    tooltip: {
      theme: 'dark',
      x: {
        format: 'dd MMM'
      },
      y: {
        formatter: function (value) {
          return '$' + value.toLocaleString();
        }
      },
      marker: {
        show: true
      }
    },
    markers: {
      size: 5,
      colors: ['#696cff'],
      strokeColors: '#fff',
      strokeWidth: 2,
      hover: {
        size: 7
      }
    },
    annotations: {
      points: [{
        x: revenueData.indexOf(Math.max(...revenueData)),
        y: Math.max(...revenueData),
        marker: {
          size: 6,
          fillColor: '#fff',
          strokeColor: '#696cff',
          radius: 2
        },
        label: {
          borderColor: '#696cff',
          offsetY: 0,
          style: {
            color: '#fff',
            background: '#696cff'
          },
          text: 'Peak'
        }
      }]
    }
  });
  revenueChart.render();
}

// Initialize User Activity Chart
const userActivityChartEl = document.querySelector('#userActivityChart');
if (userActivityChartEl) {
  const userActivityData = JSON.parse(document.getElementById('userActivityData').textContent);
  const userActivityChart = new ApexCharts(userActivityChartEl, {
    series: [{
      name: 'Active Users',
      data: userActivityData
    }],
    chart: {
      height: 400,
      type: 'bar',
      toolbar: {
        show: false
      }
    },
    plotOptions: {
      bar: {
        borderRadius: 10,
        dataLabels: {
          position: 'top'
        }
      }
    },
    dataLabels: {
      enabled: true,
      formatter: function (val) {
        return val;
      },
      offsetY: -20,
      style: {
        fontSize: '12px',
        colors: ['#a3a4cc']
      }
    },
    colors: ['#71dd37'],
    xaxis: {
      categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      position: 'bottom',
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      },
      labels: {
        style: {
          fontSize: '13px',
          colors: '#a3a4cc'
        }
      }
    },
    yaxis: {
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      },
      labels: {
        show: false
      }
    },
    grid: {
      borderColor: '#f5f5f5',
      padding: {
        top: -15,
        bottom: -10
      }
    },
    tooltip: {
      theme: 'dark'
    }
  });
  userActivityChart.render();
}

// Initialize Tooltips
const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl);
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
function updateStatus(url, id, status) {
  $.ajax({
    url: url,
    type: 'POST',
    data: {
      'status': status,
      'csrfmiddlewaretoken': $('input[name=csrfmiddlewaretoken]').val()
    },
    success: function(response) {
      if (response.status === 'success') {
        // Show success toast
        toastr.success('Status updated successfully');
        // Reload the page to reflect changes
        setTimeout(function() {
          window.location.reload();
        }, 1000);
      } else {
        toastr.error('Error updating status');
      }
    },
    error: function() {
      toastr.error('Error updating status');
    }
  });
}

// Delete Handlers
function deleteItem(url, id) {
  if (confirm('Are you sure you want to delete this item?')) {
    $.ajax({
      url: url,
      type: 'POST',
      data: {
        'csrfmiddlewaretoken': $('input[name=csrfmiddlewaretoken]').val()
      },
      success: function(response) {
        if (response.status === 'success') {
          toastr.success('Item deleted successfully');
          setTimeout(function() {
            window.location.reload();
          }, 1000);
        } else {
          toastr.error('Error deleting item');
        }
      },
      error: function() {
        toastr.error('Error deleting item');
      }
    });
  }
}

// Initialize Toastr
toastr.options = {
  closeButton: true,
  progressBar: true,
  positionClass: 'toast-top-right',
  timeOut: 3000
};

// Order Management Functions
let currentOrderId = null;

function showStatusOptions(orderId, currentStatus) {
  currentOrderId = orderId;
  const modal = new bootstrap.Modal(document.getElementById('statusOptionsModal'));
  
  // Remove active class from all options
  document.querySelectorAll('.status-option').forEach(option => {
    option.classList.remove('active');
    if (option.dataset.status === currentStatus.toLowerCase()) {
      option.classList.add('active');
    }
  });
  
  modal.show();
}

// Initialize status options
document.addEventListener('DOMContentLoaded', function() {
  const statusOptions = document.querySelectorAll('.status-option');
  statusOptions.forEach(option => {
    option.addEventListener('click', function() {
      const newStatus = this.dataset.status;
      updateOrderStatus(currentOrderId, newStatus);
    });
  });
});

function updateOrderStatus(orderId, newStatus) {
  $.ajax({
    url: `/orders/${orderId}/update-status/`,
    type: 'POST',
    data: {
      'status': newStatus,
      'csrfmiddlewaretoken': $('input[name=csrfmiddlewaretoken]').val()
    },
    success: function(response) {
      if (response.status === 'success') {
        // Update the badge in the table
        const badge = document.querySelector(`[data-order-id="${orderId}"] .status-badge`);
        badge.className = `badge bg-label-${newStatus.toLowerCase()} status-badge`;
        badge.textContent = newStatus.charAt(0).toUpperCase() + newStatus.slice(1);
        
        // Close the modal
        bootstrap.Modal.getInstance(document.getElementById('statusOptionsModal')).hide();
        
        // Show success message
        toastr.success('Order status updated successfully');
      } else {
        toastr.error('Error updating order status');
      }
    },
    error: function() {
      toastr.error('Error updating order status');
    }
  });
}

// Edit Order Function
function editOrder(orderId) {
  // Fetch order details
  $.ajax({
    url: `/orders/${orderId}/`,
    type: 'GET',
    success: function(response) {
      if (response.status === 'success') {
        // Populate the edit modal with order details
        const order = response.data;
        $('#editOrderId').val(order.id);
        $('#editOrderNumber').val(order.order_number);
        $('#editCustomer').val(order.customer);
        $('#editAmount').val(order.amount);
        $('#editStatus').val(order.status);
        
        // Show the edit modal
        const editModal = new bootstrap.Modal(document.getElementById('editOrderModal'));
        editModal.show();
      } else {
        toastr.error('Error fetching order details');
      }
    },
    error: function() {
      toastr.error('Error fetching order details');
    }
  });
}

// Handle Edit Order Form Submission
$('#editOrderForm').on('submit', function(e) {
  e.preventDefault();
  const formData = new FormData(this);
  const orderId = $('#editOrderId').val();

  // Validate form data
  if (!formData.get('order_number') || !formData.get('customer') || !formData.get('amount')) {
    toastr.error('Please fill in all required fields');
    return;
  }

  // Show loading state
  const submitButton = $(this).find('button[type="submit"]');
  const originalText = submitButton.html();
  submitButton.html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Saving...');
  submitButton.prop('disabled', true);

  // Send update request
  $.ajax({
    url: `/orders/${orderId}/update/`,
    type: 'POST',
    data: formData,
    processData: false,
    contentType: false,
    success: function(response) {
      if (response.status === 'success') {
        // Close modal
        $('#editOrderModal').modal('hide');
        
        // Show success message
        toastr.success('Order updated successfully');
        
        // Update the row in the table
        const order = response.data;
        const row = $(`[data-order-id="${orderId}"]`);
        
        row.find('.order-number').text(order.order_number);
        row.find('.customer').text(order.customer);
        row.find('.amount').text('$' + parseFloat(order.amount).toFixed(2));
        row.find('.status-badge')
          .removeClass()
          .addClass(`badge bg-label-${order.status.toLowerCase()} status-badge`)
          .text(order.status);
        
        // Reset form
        $('#editOrderForm')[0].reset();
        $('#editOrderForm').removeClass('was-validated');
      } else {
        toastr.error(response.message || 'Error updating order');
      }
    },
    error: function(xhr) {
      if (xhr.responseJSON && xhr.responseJSON.message) {
        toastr.error(xhr.responseJSON.message);
      } else {
        toastr.error('Error updating order');
      }
    },
    complete: function() {
      // Reset button state
      submitButton.html(originalText);
      submitButton.prop('disabled', false);
    }
  });
});

function deleteOrder(orderId) {
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
        url: `/orders/${orderId}/delete/`,
        type: 'POST',
        data: {
          'csrfmiddlewaretoken': $('input[name=csrfmiddlewaretoken]').val()
        },
        success: function(response) {
          if (response.status === 'success') {
            // Remove the row from the table
            $(`[data-order-id="${orderId}"]`).fadeOut(300, function() {
              $(this).remove();
            });
            
            // Show success message
            Swal.fire({
              icon: 'success',
              title: 'Deleted!',
              text: 'Order has been deleted.',
              customClass: {
                confirmButton: 'btn btn-success'
              }
            });
          } else {
            toastr.error('Error deleting order');
          }
        },
        error: function() {
          toastr.error('Error deleting order');
        }
      });
    }
  });
}
