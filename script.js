document.addEventListener('DOMContentLoaded', () => {
  // Input elements
  const inputs = {
    studentName: document.getElementById('studentName'),
    fatherName: document.getElementById('fatherName'),
    serialNo: document.getElementById('serialNo'),
    studentClass: document.getElementById('studentClass'),
    feeMonth: document.getElementById('feeMonth'),
    tuitionFee: document.getElementById('tuitionFee'),
    admissionFee: document.getElementById('admissionFee'),
    examFee: document.getElementById('examFee'),
    fine: document.getElementById('fine'),
    issueDate: document.getElementById('issueDate'),
    dueDate: document.getElementById('dueDate'),
  };

  // Output elements (Student Copy)
  const outputs1 = {
    studentName: document.getElementById('outStudentName1'),
    fatherName: document.getElementById('outFatherName1'),
    studentClass: document.getElementById('outClass1'),
    serialNo: document.getElementById('outSerialNo1'),
    feeMonth: document.getElementById('outMonth1'),
    dueDate: document.getElementById('outDueDate1'),
    tuitionFee: document.getElementById('outTuition1'),
    admissionFee: document.getElementById('outAdmission1'),
    examFee: document.getElementById('outExam1'),
    fine: document.getElementById('outFine1'),
    total: document.getElementById('outTotal1'),
  };

  // Set default dates
  const today = new Date();
  inputs.issueDate.value = today.toISOString().split('T')[0];
  
  const due = new Date();
  due.setDate(due.getDate() + 10);
  inputs.dueDate.value = due.toISOString().split('T')[0];

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  inputs.feeMonth.value = `${monthNames[today.getMonth()]} ${today.getFullYear()}`;

  // Generate Auto Serial No
  const currentYear = today.getFullYear();
  const randomSerial = Math.floor(1000 + Math.random() * 9000);
  inputs.serialNo.value = `${currentYear}-${randomSerial}`;

  // Format currency
  const formatCurrency = (amount) => {
    return Number(amount).toLocaleString('en-PK', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  // Format Date
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const d = new Date(dateString);
    return `${d.getDate().toString().padStart(2, '0')}-${monthNames[d.getMonth()].substring(0, 3)}-${d.getFullYear().toString().substring(2)}`;
  };

  // Update Preview
  const updatePreview = () => {
    const tuition = Number(inputs.tuitionFee.value) || 0;
    const admission = Number(inputs.admissionFee.value) || 0;
    const exam = Number(inputs.examFee.value) || 0;
    const fine = Number(inputs.fine.value) || 0;
    const total = tuition + admission + exam + fine;

    // Update Student Copy
    outputs1.studentName.textContent = inputs.studentName.value;
    outputs1.fatherName.textContent = inputs.fatherName.value;
    outputs1.studentClass.textContent = inputs.studentClass.value;
    outputs1.serialNo.textContent = inputs.serialNo.value;
    outputs1.feeMonth.textContent = inputs.feeMonth.value;
    outputs1.dueDate.textContent = formatDate(inputs.dueDate.value);
    
    outputs1.tuitionFee.textContent = formatCurrency(tuition);
    outputs1.admissionFee.textContent = formatCurrency(admission);
    outputs1.examFee.textContent = formatCurrency(exam);
    outputs1.fine.textContent = formatCurrency(fine);
    outputs1.total.textContent = `Rs. ${formatCurrency(total)}`;
  };

  // Add event listeners to all inputs
  Object.values(inputs).forEach(input => {
    input.addEventListener('input', updatePreview);
  });

  // Initial update
  updatePreview();

  // Print functionality
  document.getElementById('printBtn').addEventListener('click', () => {
    window.print();
  });
});
