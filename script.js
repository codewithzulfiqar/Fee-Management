document.addEventListener('DOMContentLoaded', () => {
  // Login Logic
  const loginOverlay = document.getElementById('loginOverlay');
  const appContainer = document.getElementById('appContainer');
  const loginBtn = document.getElementById('loginBtn');
  const loginError = document.getElementById('loginError');
  const loginUsername = document.getElementById('loginUsername');
  const loginPassword = document.getElementById('loginPassword');

  // Check if already logged in during this session
  if (sessionStorage.getItem('isLoggedIn') === 'true') {
    loginOverlay.style.display = 'none';
    appContainer.style.display = 'flex';
  }

  const handleLogin = () => {
    if (loginUsername.value === 'akss' && loginPassword.value === 'az226') {
      sessionStorage.setItem('isLoggedIn', 'true');
      loginOverlay.style.display = 'none';
      appContainer.style.display = 'flex';
    } else {
      loginError.style.display = 'flex';
    }
  };

  loginBtn.addEventListener('click', handleLogin);
  loginPassword.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleLogin();
  });
  loginUsername.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleLogin();
  });

  // Input elements
  const inputs = {
    studentName: document.getElementById('studentName'),
    fatherName: document.getElementById('fatherName'),
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
    feeMonth: document.getElementById('outMonth1'),
    dueDate: document.getElementById('outDueDate1'),
    tuitionFee: document.getElementById('outTuition1'),
    admissionFee: document.getElementById('outAdmission1'),
    examFee: document.getElementById('outExam1'),
    fine: document.getElementById('outFine1'),
    total: document.getElementById('outTotal1'),
  };

  // Output elements (School Copy)
  const outputs2 = {
    studentName: document.getElementById('outStudentName2'),
    fatherName: document.getElementById('outFatherName2'),
    studentClass: document.getElementById('outClass2'),
    feeMonth: document.getElementById('outMonth2'),
    issueDate: document.getElementById('outIssueDate2'),
    tuitionFee: document.getElementById('outTuition2'),
    admissionFee: document.getElementById('outAdmission2'),
    examFee: document.getElementById('outExam2'),
    fine: document.getElementById('outFine2'),
    total: document.getElementById('outTotal2'),
    ref: document.getElementById('outRef'),
  };

  // Set default dates
  const today = new Date();
  inputs.issueDate.value = today.toISOString().split('T')[0];
  
  const due = new Date();
  due.setDate(due.getDate() + 10);
  inputs.dueDate.value = due.toISOString().split('T')[0];

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  
  // Set default month input value (YYYY-MM)
  const currentMonth = (today.getMonth() + 1).toString().padStart(2, '0');
  inputs.feeMonth.value = `${today.getFullYear()}-${currentMonth}`;

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

  // Format Month string from YYYY-MM
  const formatMonthString = (monthString) => {
    if (!monthString) return '';
    const [year, month] = monthString.split('-');
    return `${monthNames[parseInt(month) - 1]} ${year}`;
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
    outputs1.feeMonth.textContent = formatMonthString(inputs.feeMonth.value);
    outputs1.dueDate.textContent = formatDate(inputs.dueDate.value);
    
    outputs1.tuitionFee.textContent = formatCurrency(tuition);
    outputs1.admissionFee.textContent = formatCurrency(admission);
    outputs1.examFee.textContent = formatCurrency(exam);
    outputs1.fine.textContent = formatCurrency(fine);
    outputs1.total.textContent = `Rs. ${formatCurrency(total)}`;

    // Update School Copy
    outputs2.studentName.textContent = inputs.studentName.value;
    outputs2.fatherName.textContent = inputs.fatherName.value;
    outputs2.studentClass.textContent = inputs.studentClass.value;
    outputs2.feeMonth.textContent = formatMonthString(inputs.feeMonth.value);
    outputs2.issueDate.textContent = formatDate(inputs.issueDate.value);
    
    outputs2.tuitionFee.textContent = formatCurrency(tuition);
    outputs2.admissionFee.textContent = formatCurrency(admission);
    outputs2.examFee.textContent = formatCurrency(exam);
    outputs2.fine.textContent = formatCurrency(fine);
    outputs2.total.textContent = `Rs. ${formatCurrency(total)}`;
    
    // Generate random ref based on date
    const refDate = new Date().getFullYear();
    const randomNum = Math.floor(10000 + Math.random() * 90000);
    outputs2.ref.textContent = `${refDate}-${randomNum}`;
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
