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

  // Tabs Logic
  const tabPreview = document.getElementById('tabPreview');
  const tabRecords = document.getElementById('tabRecords');
  const viewPreview = document.getElementById('viewPreview');
  const viewRecords = document.getElementById('viewRecords');

  tabPreview.addEventListener('click', () => {
    tabPreview.classList.add('active');
    tabRecords.classList.remove('active');
    viewPreview.classList.add('active');
    viewRecords.classList.remove('active');
  });

  tabRecords.addEventListener('click', () => {
    tabRecords.classList.add('active');
    tabPreview.classList.remove('active');
    viewRecords.classList.add('active');
    viewPreview.classList.remove('active');
    renderRecords();
  });

  // Records Logic
  let editId = null;
  const saveRecordBtn = document.getElementById('saveRecordBtn');
  const recordsTbody = document.getElementById('recordsTbody');
  
  const loadRecords = () => JSON.parse(localStorage.getItem('feeRecords') || '[]');
  const saveRecords = (data) => localStorage.setItem('feeRecords', JSON.stringify(data));

  const filterMonth = document.getElementById('filterMonth');
  const filterClass = document.getElementById('filterClass');
  const filterName = document.getElementById('filterName');
  
  filterMonth.addEventListener('change', renderRecords);
  filterClass.addEventListener('input', renderRecords);
  filterName.addEventListener('input', renderRecords);

  function renderRecords() {
    const records = loadRecords();
    const fMonth = filterMonth.value;
    const fClass = filterClass.value.toLowerCase();
    const fName = filterName.value.toLowerCase();

    const filtered = records.filter(r => {
       let pass = true;
       if (fMonth && r.feeMonth !== fMonth) pass = false;
       if (fClass && !(r.studentClass || '').toLowerCase().includes(fClass)) pass = false;
       if (fName && !(r.studentName || '').toLowerCase().includes(fName)) pass = false;
       return pass;
    });

    recordsTbody.innerHTML = '';
    filtered.forEach(r => {
      const tuition = Number(r.tuitionFee) || 0;
      const admission = Number(r.admissionFee) || 0;
      const exam = Number(r.examFee) || 0;
      const fine = Number(r.fine) || 0;
      const total = tuition + admission + exam + fine;

      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td style="font-weight:600; color:var(--primary);">${r.studentName}</td>
        <td>${r.fatherName}</td>
        <td><span class="badge" style="background:#eff6ff; color:#3b82f6;">${r.studentClass}</span></td>
        <td style="white-space:nowrap;">${formatMonthString(r.feeMonth)}</td>
        <td style="white-space:nowrap; color:#64748b;">${formatDate(r.paymentDate || r.issueDate)}</td>
        <td>${formatCurrency(tuition)}</td>
        <td>${formatCurrency(admission)}</td>
        <td>${formatCurrency(exam)}</td>
        <td style="color:#ef4444;">${formatCurrency(fine)}</td>
        <td style="font-weight:800;">${formatCurrency(total)}</td>
        <td class="action-btns">
           <button class="btn-icon edit" onclick="editRecord(${r.id})" title="Edit">
             <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
           </button>
           <button class="btn-icon delete" onclick="deleteRecord(${r.id})" title="Delete">
             <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
           </button>
        </td>
      `;
      recordsTbody.appendChild(tr);
    });
  }

  saveRecordBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (!inputs.studentName.value) {
       alert("Student Name is required!");
       return;
    }
  
    const records = loadRecords();
    const newRecord = {
      studentName: inputs.studentName.value,
      fatherName: inputs.fatherName.value,
      studentClass: inputs.studentClass.value,
      feeMonth: inputs.feeMonth.value,
      tuitionFee: inputs.tuitionFee.value,
      admissionFee: inputs.admissionFee.value,
      examFee: inputs.examFee.value,
      fine: inputs.fine.value,
      issueDate: inputs.issueDate.value,
      dueDate: inputs.dueDate.value,
      paymentDate: new Date().toISOString().split('T')[0]
    };
    
    if (editId !== null) {
       const idx = records.findIndex(r => r.id === editId);
       if(idx !== -1) {
          records[idx] = { ...newRecord, id: editId };
       }
       editId = null;
       saveRecordBtn.textContent = 'Save Record';
       saveRecordBtn.style.background = '#10b981';
    } else {
       newRecord.id = Date.now();
       records.push(newRecord);
    }
    
    saveRecords(records);
    // Switch to records tab automatically
    tabRecords.click();
  });

  window.editRecord = (id) => {
    const records = loadRecords();
    const record = records.find(r => r.id === id);
    if(record) {
      inputs.studentName.value = record.studentName || '';
      inputs.fatherName.value = record.fatherName || '';
      inputs.studentClass.value = record.studentClass || '';
      inputs.feeMonth.value = record.feeMonth || '';
      inputs.tuitionFee.value = record.tuitionFee || 0;
      inputs.admissionFee.value = record.admissionFee || 0;
      inputs.examFee.value = record.examFee || 0;
      inputs.fine.value = record.fine || 0;
      inputs.issueDate.value = record.issueDate;
      inputs.dueDate.value = record.dueDate;
      updatePreview();
      
      editId = id;
      saveRecordBtn.textContent = 'Update Record';
      saveRecordBtn.style.background = '#3b82f6';
      tabPreview.click();
    }
  };

  window.deleteRecord = (id) => {
    if(confirm('Are you sure you want to delete this record?')) {
      const records = loadRecords();
      saveRecords(records.filter(r => r.id !== id));
      renderRecords();
    }
  };
});
